Popup.init();

// Carico i colori dei LED
$(document).ready(function () {
    $.getJSON("./backend/getLedColors.php", function (data) {
        $("#3").empty();
        $.each(data, function (key, value) {
            $("#3").append($("<option></option>").attr("value", key).text(value.display));
        });
    }
    );
});


function onSubmit(vcc, i, color) {
    console.debug("onSubmit:", vcc, i, color);
    
    if (vcc == "" || i == "") {
        return Popup.throwError("Inserisci tutti i valori");
    }
    else if (isNaN(vcc) || isNaN(i)) {
        return Popup.throwError("Inserisci valori numerici");
    }
    else if (vcc < 0 || i < 0) {
        return Popup.throwError("Inserisci valori positivi");
    }
    else if (i < 0.005 || i > 0.02) {
        return Popup.throwError("Corrente non compresa tra 5 e 20 mA");
    }

    $.ajax({
        url: "./backend/calcResistance.php",
        type: "POST",
        data: {
            vcc: vcc,
            i: i,
            color: color
        },
        success: function (data) {
            console.debug("onSubmit success:", data);
            $(".res_band1").removeClass().addClass("res_band1");
            $(".res_band2").removeClass().addClass("res_band2");
            $(".res_band3").removeClass().addClass("res_band3");

            $(".res_band1").addClass(data.band1);
            $(".res_band2").addClass(data.band2);
            $(".res_band3").addClass(data.band3);
            $(".res_tol").addClass("gold");

            $(".resistorValue").text(data.resistance);
            $(".resistorTitle").removeClass("invisible");
        },
        error: function (data) {
            let errorMessage = data?.responseText;
            if (errorMessage) Popup.throwError(errorMessage);
            else Popup.throwError("Errore durante il calcolo");
        }
    });
}
