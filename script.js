function openPopup(message) {
    $('.popup').addClass('open');
    $('.popup').find('.popuptext').text(message);
}

function closePopup() {
    $('.popup').removeClass('open');
}

function onError(errorMessage) {
    console.warn(errorMessage);

    openPopup(errorMessage);
    // setTimeout(closePopup, 1500);
}

function onSubmit(vcc, i, color) {
    console.log(vcc, i, color);
    //check if vcc and i are numbers
    onError("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
}
