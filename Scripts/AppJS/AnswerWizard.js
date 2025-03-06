function routeTo(value) {
    document.location = `/AnswerWizard/QuestionView?category=${value}`;
}

$(document).ready(function(){
    var height = $(window).height() + 127;
    var width= $(window).width() + 17;
    if (width == 1280 && height == 600) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '60px', 'width': '80px', 'font-size': '11px' });
    }
    else if (width == 1280 && height == 720) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '120px', 'width': '120px', 'font-size': '16px' });
    }
    else if (width == 1280 && height == 768) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '150px', 'width': '150px', 'font-size': '18px' });
    }
    else if (width == 1280 && height == 800) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '170px', 'width': '170px', 'font-size': '20px' });
    }
    else if ((width == 1280 || width == 1297) && height == 960) {
        console.log("width == 1280 && height == 960")
        $('#agency, #contract, #opport, #vendor').css({ 'height': '240px', 'width': '240px', 'font-size': '22px' });
    }
    else if ((width == 1280 || width == 1297) && height == 1024) {
        console.log("width == 1280 && height == 1024")
        $('#agency, #contract, #opport, #vendor').css({ 'height': '260px', 'width': '260px', 'font-size': '24px' });
    }
    else if (width == 1360 && height == 768) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '150px', 'width': '150px', 'font-size': '18px' });
    }
    else if (width == 1366 && height == 768) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '150px', 'width': '150px', 'font-size': '18px' });
    }
    else if (width == 1400 && height == 1050) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '280px', 'width': '280px', 'font-size': '22px' });
    }
    else if (width == 1440 && height == 900) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '215px', 'width': '215px', 'font-size': '20px' });
    }
    else if (width == 1600 && height == 900) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '215px', 'width': '215px', 'font-size': '20px' });
    }
    else if (width == 1680 && height == 1050) {
        $('#agency, #contract, #opport, #vendor').css({ 'height': '280px', 'width': '280px', 'font-size': '22px' });
    }
});