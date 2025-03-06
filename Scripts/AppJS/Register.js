                                    
$(document).ready(function () {
    $('.auth-wrapper').addClass('register');
    $('.auth-box').hide();
    $('#freeTrials').click(function () {
        document.location = '/Register/publicUser';
    })
    $('#purchaseBtn').click(function () {
        $('.auth-box').show();
        $('.plan-sec').hide();
    })
    $('#RegisterUser').click(function () {

        var RegisterDetails = {};

        RegisterDetails.User_FirstName = $('#txtregfirstname').val();
        RegisterDetails.User_LastName = $('#txtreglastname').val();
        RegisterDetails.User_Email = $('#txtregemail').val();
        //if (!$('#txtregphoneno').val().match('[0-9]{10}')) {
        //    alert("Please put 10 digit mobile number");
        //    return;
        //}
        RegisterDetails.User_PhoneNo = $('#txtregphoneno').val();
        RegisterDetails.User_Company = $('#txtregcompany').val();
        RegisterDetails.User_Address = $('#txtregstreet').val();
        RegisterDetails.User_City = $('#txtregcity').val();
        RegisterDetails.User_State = $('#txtregstate').val();
        RegisterDetails.User_Pincode = $('#txtregzip').val();
        if (RegisterDetails.User_FirstName != "" && RegisterDetails.User_LastName != "" && RegisterDetails.User_Email != "" && RegisterDetails.User_PhoneNo != "" && RegisterDetails.User_Company != "") {
            var data = "{RegisterDetails:" + JSON.stringify(RegisterDetails) + "}";
            var url = "/Register/UserRegister";
            var result = AjaxPost(url, data);
            if (result == "success") {
                //alert(' Please check your email and verify your account ');
                $('.Verification').show();
                $('.Register').hide();
                $('.plan-sec').hide();
                $('.auth-wrapper').removeClass('register');
           
                //$('#errregemail').hide();
            }
            else if (result == "fail") {
                swal({
                    title: "",
                    text: "The email address you have entered is already registered. Please try another",
                    type: "error"
                }).then(function () {
                        window.location.reload();
                });
                //$('#errregemail').show();
             
            }
            else {
                swal(result);
            }
        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
            //$('#errregmandatory').show();
        }

    });

    $('#go').click(function () {
          var origin = window.location.origin;
    window.location.href = origin;
    });
    
  

});
