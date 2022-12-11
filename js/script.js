Popup.init();

function onSubmit(vcc, i, color) {
    console.debug("onSubmit:", vcc, i, color);
    //check if vcc and i are valid numbers, do not allow empty variables, error in italian
    if (vcc == "" || i == "") {
        return Popup.throwError("Inserisci tutti i valori");
    }
    else if (isNaN(vcc) || isNaN(i)) {
        return Popup.throwError("Inserisci valori numerici");
    }
    else if (vcc < 0 || i < 0) {
        return Popup.throwError("Inserisci valori positivi");
    }

    $(".res_band1").addClass("violet");
    $(".res_band2").addClass("green");
    $(".res_band3").addClass("grey");
    $(".res_tol").addClass("gold");
}
