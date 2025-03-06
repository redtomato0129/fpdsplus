$(document).ready(function () {



    var data = "{}";
    var url = "/User/CheckUser";
    var result = AjaxPost(url, data);
    if (result.length > 0) {
        $('#username').text(result[0].User_FirstName);
        $('#txtregfirstname').val(result[0].User_FirstName);
        $('#txtreglastname').val(result[0].User_LastName);
        $('#txtregemail').val(result[0].User_Email);
        $('#txtregphoneno').val(result[0].User_PhoneNo);
        $('#txtregcompany').val(result[0].User_Company);
        $('#txtregstreet').val(result[0].User_Address);
        $('#txtregcity').val(result[0].User_City);
        $('#txtregstate').val(result[0].User_State);
        $('#txtregzip').val(result[0].User_Pincode);
        $('#registrationDate').text(result[0].CreatedDate);

    }



    //$('#txtverpassword').change(function () {
    //    var pswd = $(this).val();

    //    //validate the length
    //    if (pswd.length >= 8 && pswd.match(/[A-z]/) && pswd.match(/[A-Z]/) && pswd.match(/\d/) && pswd.match(/[^a-zA-Z0-9\-\/]/)) {
    //        $('#errverpassword').hide();
    //    } else {
    //        $('#errverpassword').show();
    //    }


    //});

    //$('#txtCnfmpassword').keyup(function () {
    //    var pswd = $(this).val();

    //    //validate the length
    //    if (pswd.length >= 8 && pswd.match(/[A-z]/) && pswd.match(/[A-Z]/) && pswd.match(/\d/) && pswd.match(/[^a-zA-Z0-9\-\/]/)) {
    //        $('#errverpassword').hide();
    //    } else {
    //        $('#errverpassword').show();
    //    }


    //});


    $(document).on('click', '.change', function () {
        var validate = true;
        var firstname = $('#txtregfirstname').val();
        var lastname = $('#txtreglastname').val();
        var email = $('#txtregemail').val();
        var phone = $('#txtregphoneno').val();
        var company = $('#txtregcompany').val();
        var street = $('#txtregstreet').val();
        var city = $('#txtregcity').val();
        var state = $('#txtregstate').val();
        var zip = $('#txtregzip').val();

        if (firstname.length > 0) {
            if (lastname.length > 0) {
                if (email.length > 0) {
                    if (company.length > 0) {
                      
                        var data = {
                            User_FirstName: firstname,
                            User_LastName: lastname,
                            User_Email: email,
                            User_PhoneNo: phone,
                            User_Company: company,
                            User_Address: street,
                            User_City: city,
                            User_State: state,
                            User_Pincode: zip,
                        };
                       
                        var url = "/User/SaveUserProfile";
                        var result = AjaxPost(url, JSON.stringify(data));
                        if (result > 0) {
                            swal("", "Profile and contact details saved.", "success");
                        }
                        else if (result == -1) {
                            swal("", "The email address you have entered is already registered. Please try another.", "error");
                        }
                        else {
                            swal("", "Profile details not saved!", "error");
                        }
                    }
                    else {
                        validate = false;
                    }
                }
                else {
                    validate = false;
                }
            }
            else {
                validate = false;
            }
        }
        else {
            validate = false;
        }

        if (validate == false) {
            swal("", "All (*) fields are mandatory", "error");
        }

        //var oldpassword = $('#oldpassword').val();
        //var newpassword = $('#txtverpassword').val();
        //var Confirmpassword = $('#txtCnfmpassword').val();

        //if (newpassword == Confirmpassword) {
        //    var data = "{oldpassword:'" + oldpassword + "', newpassword:'" + Confirmpassword + "'}";
        //    var url = "/User/checkpassword";
        //    var result = AjaxPost(url, data);
        //    if (result > 0) {
        //        swal("", "Password changed successfully !", "success");

        //        $('#oldpassword').val('');
        //        $('#txtverpassword').val('');
        //        $('#txtCnfmpassword').val('');
        //    }
        //    else {
        //        swal("", "Old password not matched !", "error");

        //    }
        //}
        //else {
        //    swal("", "Confirm Password Not Matched !", "error");

        //}


       
    });
});