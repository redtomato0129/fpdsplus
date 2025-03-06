$(document).ready(function () {
    checkStatus();
    var cookievalue = document.cookie;
    var cookieUserCode = "";
    $("#loginHeading").html('Welcome to FDPSplus');
    $("#registerMessage").html(`<a class="btn btn-block btn-lg" style="background-color:#2ABD23;color:#fff" href="/Register/publicUser">Register for Free Access</a>`)
    let public_email = false;
    if (cookievalue != "") {
        var splitcookie = cookievalue.split('=');
        if (splitcookie[0] == "username") {
            cookieUserCode = parseInt(splitcookie[1]);

            var splemail = splitcookie[1].split('___');
            //$("#txtUserName").attr("disabled", "disabled");
            $("#txtUserName").prop('disabled', true);
            var email = window.atob(splemail[1]);
            $("#txtUserName").val(email);
            if (email.indexOf('-public@fedpipeline.com')!=-1) {
                $("#password_div").show()
            }
            cookieUserCode = splemail[0];
            $('#LoginUser').show();
            $('#AuthUser').hide();
        }
        else {
            cookieUserCode = "";
            $('.anotheracct').hide();
            $('#LoginUser').hide();
            $('#AuthUser').show();
        }
       
    }
    else {

        /////////
        cookieUserCode = "";
        $('.anotheracct').hide();
        $('#LoginUser').hide();
        $('#AuthUser').show();
    }



    $('#txtUserName').on('input', function () {
        let email_check = $(this).val();

        // Check if the email contains '-public@fedpipeline.com'
        if (email_check && email_check.includes('-public@fedpipeline.com')) {
            public_email = true
            $('#password_div').show(); // Show the password div
            $('#publicLoginTxt').show();
            $('#paidLoginTxt').hide();// Show the password div
        } else {
            public_email = false
            $('#password_div').hide(); // Hide the password div
            $('#paidLoginTxt').show();// Show the password div
            $('#publicLoginTxt').hide(); // Hide the password div
        }
    });


    $('#LoginUser').click(function () {
        // login();
        var LoginDetails = {};
        LoginDetails.useremail = $('#txtUserName').val();
        //alert(cookieUserCode);
        if (LoginDetails.useremail != "") {
            if (cookieUserCode != "") {
                checkCookieCode();
            }
            else {
                alert("check your email");
            }
        }
        else {
            alert("check");
        }
    });


    $('#AuthUser').click(function () {
        if (public_email === true) {
            publicAccountLogin();
        }
        else {
         login();
        }
    });


    //var input = document.getElementById("txtPassword");
    //input.addEventListener("keyup", function (event) {
    //    if (event.keyCode === 13) {
    //        event.preventDefault();
    //        login();
    //    }
    //});

    function publicAccountLogin() {

        var PublicAccountLoginDetails = {};

        PublicAccountLoginDetails.Public_Email = $('#txtUserName').val();
        PublicAccountLoginDetails.Public_Password = $('#txtPassword').val();

        var data = "{PublicAccountLoginDetails :" + JSON.stringify(PublicAccountLoginDetails) + "}";
        var url = "/Login/CheckPublicAccountLogin";
        var result = AjaxPost(url, data);
        if (result ==0) {
            swal("", "Invalid Email or Password", "error");
        }
        else {
            var info = result[1].Value + '___' + result[0].Value;
            setCookie("username", info);
            window.location.href = origin + "/AnswerWizard/Index";
        }
    }

    function login() {

        var LoginDetails = {};
     
        LoginDetails.useremail = $('#txtUserName').val();
        //LoginDetails.userpassword = $('#txtPassword').val();

        var data = "{LoginDetails :" + JSON.stringify(LoginDetails) + "}";
        var url = "/Login/CheckLogin";
        var result = AjaxPost(url, data);
        if (result == 1) {
            $('.Verification').show();
            $('#loginform').hide();
        }
        else {
            swal("", "Invalid Email ID", "error");

        }
    }

    function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (1.21e+6 * 1000));
        var expires = "expires=" + d.toGMTString();

        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        //alert(document.cookie);
    }

    function checkCookieCode() {
        var LoginDetails = {};
        LoginDetails.CookieCode = cookieUserCode;
        LoginDetails.useremail = $('#txtUserName').val();
        
        //LoginDetails.userpassword = $('#txtPassword').val();
        
        var data = "{LoginDetails :" + JSON.stringify(LoginDetails) + "}";
        var url = "/Login/checkCookieCode";
        var result = AjaxPost(url, data);
        if (result == 1) {
            window.location.href = origin + "/AnswerWizard/Index";
        }
        else {
            
            deleteCookie("username");
           // swal("", "User verification failed", "error");
            $('#LoginUser').hide();
          //  $('#AuthUser').show();
            login();
           // setTimeout(function () { window.location.href = origin; }, 5000);
        }
    }
});


function checkStatus() {
    $.ajax({
        type: "POST",
        data: {},
        enctype: 'multipart/form-data',
        url: "/Login/GetMaintenanceStatus",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let status = records[0].enable_maintenance;

                if (status == 1) {
                    $('.modal').modal('show');
                    $('#modal_text').html(`<strong>${records[0].message}</strong>`);
                }
            }
            else {
                console.log("No data")
            }
        },
        error: function (error) { }
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(document).on('click', '#go', function () {
    $('#loginform').show();

    $('#LoginUser').show();
    $('#AuthUser').hide();
    $('.Verification').hide();
});

$(document).on('click', '.anotheracct', function () {

    $('.anotheracct').hide();
    
    $('#LoginUser').hide();
    $('#AuthUser').show();
    $("#txtUserName").prop('disabled', false);

    $('#txtUserName').val('');

}); 