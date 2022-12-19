<?php
function throwError($msg, $code) {
    echo $msg;
    http_response_code($code);
    exit();
}
///////////////// ENTRY POINT ////////////////////////////

if ($_SERVER['REQUEST_METHOD'] !== 'POST') throwError("Metodo non valido", 405);

$vcc = $_POST['vcc'];
$i = $_POST['i'];
$color = $_POST['color'];

if (!(isset($vcc) && isset($i) && isset($color))) throwError("Richiesta non completa", 400);

///////////////// CALCOLO RESISTENZA /////////////////////
require_once 'colors.php'; // $leds array
$e12 = array(10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100);
$resistance = '';
$band1 = '';
$band2 = '';
$band3 = '';
$tol = '';

if (!array_key_exists($color, $leds)) throwError("Colore non valido", 400);

$vled = $leds[$color]['vgamma'];
if ($vcc - $vled <= 0) throwError("Tensione troppo bassa", 400);
$r = ($vcc - $vled) / $i;
$digitCount = floor(log10($r)-1);
$significantDigits = floor($r / pow(10, $digitCount));

// cerco il valore più vicino della serie E12
$min = 1000;
$minval = 0;
foreach ($e12 as $val) {
    $diff = abs($significantDigits - $val);
    if ($diff < $min) {
        $min = $diff;
        $minval = $val;
    }
}

$resistance = $minval * pow(10, $digitCount);
$significantDigits = floor($resistance / pow(10, $digitCount));

// CALCOLO BANDA 1
$band1 = floor($significantDigits / 10);

// CALCOLO BANDA 2
$band2 = $significantDigits % 10;

// CALCOLO MOLTIPLICATORE (BANDA 3)
$band3 = $resistance / $significantDigits;

// CALCOLO TOLLERANZA
$tol = 0.05;


// CONVERSIONE BANDE A COLORI
$band3idx = round(log10($band3));

if ($band1 == 10) {
    $band1 = 0;
    $band3idx+=1;
}

$band1 = $colorcodes[$band1];
$band2 = $colorcodes[$band2];
if (!array_key_exists($band3idx, $multipliercodes)) throwError("Resistenza non presente nella serie E12", 400);
$band3 = $multipliercodes[$band3idx];

$response = array(
    'resistance' => $resistance,
    'band1' => $band1,
    'band2' => $band2,
    'band3' => $band3,
    'tol' => $tol
);

header('Content-Type: application/json');
echo json_encode($response);
?>