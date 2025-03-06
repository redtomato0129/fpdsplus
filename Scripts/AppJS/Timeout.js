$(document).ready(function () {
    //const origin = window.location.origin;
    //window.location.origin.includes('fpdsplus') ? $("#fed").hide() : $("#fpds").hide();
    document.title = 'FPDSplus - ' + document.title
    //window.location.origin.includes('fpdsplus') ? '../../Content/assets/images/FedpipelineFPDSLogo.png' : '../../Content/assets/images/FedpipelineLogo.png')
    //document.title = window.location.origin.includes('fpdsplus') ? 'FPDSplus - ' + document.title : 'Fedpipeline - ' + document.title

    var IDLE_TIMEOUT = 600; //seconds
    var _localStorageKey = 'global_countdown_last_reset_timestamp';
    var _idleSecondsTimer = null;
    var _lastResetTimeStamp = (new Date()).getTime();
    var _localStorage = null;

    AttachEvent(document, 'click', ResetTime);
    AttachEvent(document, 'mousemove', ResetTime);
    AttachEvent(document, 'keypress', ResetTime);
    AttachEvent(window, 'load', ResetTime);

    try {
        _localStorage = window.localStorage;
    }
    catch (ex) {
    }

    _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

    function GetLastResetTimeStamp() {
        var lastResetTimeStamp = 0;
        if (_localStorage) {
            lastResetTimeStamp = parseInt(_localStorage[_localStorageKey], 10);
            if (isNaN(lastResetTimeStamp) || lastResetTimeStamp < 0)
                lastResetTimeStamp = (new Date()).getTime();
        } else {
            lastResetTimeStamp = _lastResetTimeStamp;
        }

        return lastResetTimeStamp;
    }

    function SetLastResetTimeStamp(timeStamp) {
        if (_localStorage) {
            _localStorage[_localStorageKey] = timeStamp;
        } else {
            _lastResetTimeStamp = timeStamp;
        }
    }

    function ResetTime() {
        SetLastResetTimeStamp((new Date()).getTime());
    }

    function AttachEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
            return true;
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
            return true;
        } else {
            //nothing to do, browser too old or non standard anyway
            return false;
        }
    }

    function WriteProgress(msg) {
        var oPanel = document.getElementById("SecondsUntilExpire");
        if (oPanel) {
            oPanel.innerHTML = msg;
        }
        else if (console) {
            //console.log(msg);
        }
    }

    function CheckIdleTime() {
        var currentTimeStamp = (new Date()).getTime();
        var lastResetTimeStamp = GetLastResetTimeStamp();
        var secondsDiff = Math.floor((currentTimeStamp - lastResetTimeStamp) / 1000);
        if (secondsDiff <= 0) {
            ResetTime();
            secondsDiff = 0;
        }
        WriteProgress((IDLE_TIMEOUT - secondsDiff) + "");
        if (secondsDiff >= IDLE_TIMEOUT) {
            window.clearInterval(_idleSecondsTimer);
            ResetTime();
            //swal("", "Your session is expired. Pls login again !", "info");
            // alert("Time expired!");
            var origin = window.location.origin;
            document.location.href = origin + "/Login/login";
        }
    }

    //$(document).on('click', '.swal2-confirm', function () {

    //    var origin = window.location.origin;
    //    document.location.href = origin + "/Login/login";

    //});


});


//(function () {
//    var waitTime = 30 * 60 * 1000;
//    var timeoutSession;
//    document.addEventListener('mousemove', function (e) {
//        clearTimeout(timeoutSession);
//        timeoutSession = setTimeout(function () {

//            swal("", "Session Expired !","Info");
//            var origin = window.location.origin;
//            console.log(origin + "/login/login");
//            window.location.href = origin + "/login/login";
//        }, 3000); //30min
//    }, true);
//})();