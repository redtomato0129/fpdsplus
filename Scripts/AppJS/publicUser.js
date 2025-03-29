let isEmailValidated = false;                                   
$(document).ready(function () {
    // $('.auth-wrapper').addClass('register');
    $("#txtpublicemail").keyup(function (e) {
        const email = e.target.value;
        if (!email) {
            return
        }
        if (validateEmail(email)) {
            $.ajax({
                type: "POST",
                data: { Email: email.split("@")[1] },
                enctype: 'multipart/form-data',
                url: "/Register/CheckDomainException",
                success: function (result) {
                    result = jQuery.parseJSON(result);
                    if (result.length != 0) {
                        $("#emailValidationMessage").html(`<b>You cannot register with this domain</b>`)
                    } else {
                        $("#emailValidationMessage").html('')
                        isEmailValidated=true
                    }

                },
                error: function (error) {
                    debugger
                }
            });
        } else {
            $("#emailValidationMessage").html(`<b>Email format is not correct</b>`) 
        }
    });

    $('#RegisterPublicUser').click(function () {

        var RegisterPublicUserDetails = {};
        RegisterPublicUserDetails.FirstName = $('#txtpublicfirstname').val();
        RegisterPublicUserDetails.LastName = $('#txtpubliclastname').val();
        RegisterPublicUserDetails.Phone = $('#txtpublicphone').val();
        RegisterPublicUserDetails.Email = $('#txtpublicemail').val();
        RegisterPublicUserDetails.Company = $('#txtpubliccompany').val();
        if (!isEmailValidated) {
            swal("", "Email format is not correct", "warning");
        }

        if (RegisterPublicUserDetails.FirstName != "" &&
            RegisterPublicUserDetails.LastName != "" &&
            RegisterPublicUserDetails.Email != "" &&
            RegisterPublicUserDetails.Company != "" &&
            RegisterPublicUserDetails.Phone != "") {
            var data = "{RegisterPublicUserDetails:" + JSON.stringify(RegisterPublicUserDetails) + "}";
            var url = "/Register/PublicUserRegister";
            var result = AjaxPost(url, data);
            if (result == "no-user-found") {
                //new user created
                $('.RegisterPublicUser').hide();
                $('.logoFreeTrial').hide();
                $('.Verification').show();
            }
            else if (result == "user-expired") {
                // user updated
                swal("Trial extended", "Check your email ", "success").then(function () {
                    window.location.reload();
                });
               
              
            }
            else if (result == "user-is-valid") {
                // user is valid 

                swal(
                     "user has already registered"
       
                   
                ).then(function () {
                    window.location.reload();
                });
            }
        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
            //$('#errregmandatory').show();
        }

    });

    $('#goBack').click(function () {
          var origin = window.location.origin;
    window.location.href = origin;
    });
    
  

});

function validateEmail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};