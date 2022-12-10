function onError(err) {
    console.log(err);
    $('.popup').addClass('open');
    setTimeout(() => {
        $('.popup').removeClass('open');
    }, 1500);
}

function onSubmit(vcc, i, color) {
    console.log(vcc, i, color);
    //check if vcc and i are numbers
    onError("Error");
}
