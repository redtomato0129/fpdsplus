$(document).ready(function () {
    var cookievalue = document.cookie;
    var cookieUserCode = "";

    if (cookievalue != "") {
        var splitcookie = cookievalue.split('=');
        cookieUserCode = parseInt(splitcookie[1]);
    }
    else {
        cookieUserCode = "";
        window.location.href = origin + "/Login/login";
    }
});