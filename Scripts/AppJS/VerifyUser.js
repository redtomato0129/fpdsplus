$(document).ready(function () {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var useremail = getParameterByName("PM1");
    var OTP = getParameterByName("PM2");
    var Mode = getParameterByName("PM3");
    var DecodeOTP = atob(OTP);
    if (Mode == '1') {
        $('.Apploader').show();
        $('.auth-box').css('display', 'none');
        $('#txtvercode').val(DecodeOTP);
        setTimeout(function () { $('#VerifyUser').trigger('click'); }, 100);
    }

    $('#chkRememberMe').prop('checked', true);

    function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (1.21e+6 * 1000));
        var expires = "expires=" + d.toGMTString();

        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        //alert(document.cookie);
    }
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function checkCookie() {
        var VerificationDetails = {};
        VerificationDetails.User_verificationcode = $('#txtvercode').val();
        VerificationDetails.User_Email = useremail;
        if (VerificationDetails.User_verificationcode != "" && VerificationDetails.User_verificationcode != null) {
            var data = "{VerificationDetails:" + JSON.stringify(VerificationDetails) + "}";
            var url = "/VerifyUSer/Userverification";
            var result = AjaxPost(url, data);
            
            if (result.LoginResult === "0") {
                if (result.subsciptionPlan.Subscriptions.length > 0) {
                    var planDiv = "";
                    for (var i = 0; i < result.subsciptionPlan.Subscriptions.length; i++) {


                        if (i === 0) {
                            planDiv += '<div class="col-md-4">' +
                                '<div class="subscribe-plan-sec">' +
                                '<div class="plan-name">' +
                                '<h2>' + result.subsciptionPlan.Subscriptions[i].Name + '</h2>' +
                                '</div>' +
                                '<div class="price-user-package-sec">' +
                                '<p class="user-limit">' + result.subsciptionPlan.Subscriptions[i].Description + '</p>' +
                                '<h1>$' + result.subsciptionPlan.Subscriptions[i].Value + ' / Month</h1>' +
                                '<h3>Billed Monthly</h3>' +
                                '</div>' +
                                '<p class="subscribe-description">' +
                                '*Analyze data in  excel with unlimited* exports' +
                                '</p>' +
                                '<button class="btn btn-purchase redirectopaypal" value="' + result.subsciptionPlan.Subscriptions[i].PlanID + '">' +
                                'Purchase</button>' +
                                '</div>' +
                                '</div>';

                        }
                        if (i === 1) {
                            planDiv += '<div class="col-md-4">' +
                                '<div class="subscribe-plan-sec">' +
                                '<div class="plan-name">' +
                                '<h2>' + result.subsciptionPlan.Subscriptions[i].Name + '</h2>' +
                                '</div>' +
                                '<div class="price-user-package-sec">' +
                                '<p class="user-limit">' + result.subsciptionPlan.Subscriptions[i].Description + '</p>' +
                                '<h1>$' + result.subsciptionPlan.Subscriptions[i].Value + ' / Year</h1>' +
                                '<h3>Billed Annually</h3>' +
                                '</div>' +
                                '<p class="subscribe-description">' +
                                '*Analyze data in  excel with unlimited* exports' +
                                '</p>' +
                                '<button class="btn btn-purchase redirectopaypal" value="' + result.subsciptionPlan.Subscriptions[i].PlanID + '">' +
                                'Purchase</button>' +
                                '</div>' +
                                '</div>';
                        }
                        if (i === 2) {
                            planDiv += '<div class="col-md-4">' +
                                '<div class="subscribe-plan-sec">' +
                                '<div class="plan-name">' +
                                '<h2>' + result.subsciptionPlan.Subscriptions[i].Name + '</h2>' +
                                '</div>' +
                                '<div class="price-user-package-sec">' +
                                '<p class="user-limit">' + result.subsciptionPlan.Subscriptions[i].Description + '</p>' +
                                '<h1>$' + result.subsciptionPlan.Subscriptions[i].Value + ' / Year</h1>' +
                                '<h3>Billed Annually</h3>' +
                                '</div>' +
                                '<p class="subscribe-description">' +
                                '*Analyze data in  excel with unlimited* exports' +
                                '</p>' +
                                '<button class="btn btn-purchase redirectopaypal" value="' + result.subsciptionPlan.Subscriptions[i].PlanID + '">' +
                                'Purchase</button>' +
                                '</div>' +
                                '</div>';
                        }

                    }
                    $("#subscriptionplans").append(planDiv);
                    //########################## Set cookie ##########################//
                    if ($('input#chkRememberMe').is(':checked')) {
                        var info = VerificationDetails.User_verificationcode + '___' + VerificationDetails.User_Email;
                        setCookie("username", info);
                    }
                    $("#paymentsection").show();
                    $(".auth-box").hide();
                    //setTimeout(function () { window.location.href = origin + "/Dashboard/Index"; }, 200);
                    //########################## Set cookie ##########################//
                }
            }
            else if (result.LoginResult === "1") {
                if ($('input#chkRememberMe').is(':checked')) {
                    var info = VerificationDetails.User_verificationcode + '___' + VerificationDetails.User_Email;
                    setCookie("username", info);
                }
                setTimeout(function () {
                    const urlParams = new URLSearchParams(window.location.search);
                    let appUrl =  decodeURIComponent(urlParams.get('url'));
                    if (urlParams.get('url')) {
                        appUrl = atob(appUrl)
                        window.location.href = origin + appUrl;
                    } else {
                        window.location.href = origin.includes('fpdsplus') ? origin + "/AnswerWizard/Index" : origin + "/Dashboard/Index";
                    }
                   
                }, 200);
            }
            else {
                swal({
                    title: "",
                    text: "Invalid Verification Code !",
                    type: "error"
                }).then(function () {
                    swal.close();
                });
            }
        }
        else {
            swal("", "Pls enter your verication code", "info");
        }
    }

    $(document).on('click', '#VerifyUser', function () {

        checkCookie();

    });

});

$(document).on('click', '.redirectopaypal', function () {
    //alert($(this).val());
    var origin = window.location.origin;
    window.location.href = origin + "/Payment/RedirectToPaypalSubscribe?planId="+$(this).val();
});
function redirectToPaypal(planId) {
   
    //'
   
}
