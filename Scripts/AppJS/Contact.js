$(document).ready(function () {
    $('#btnContact').click(function () {
        var ContactDetails = {};
        ContactDetails.Contact_FirstName = $('#txtcontactfirstname').val();
        ContactDetails.Contact_LastName = $('#txtcontactlastname').val();
        ContactDetails.Contact_Email = $('#txtcontactemail').val();
        ContactDetails.Contact_BusineesName = $('#txtcontactbusinessname').val();
        ContactDetails.Contact_Message = $('#txtareacontactmessage').val();
        alert(ContactDetails);
        if (ContactDetails.Contact_FirstName != "" && ContactDetails.Contact_LastName != "" && ContactDetails.Contact_Email != "" && ContactDetails.Contact_BusineesName != "" && ContactDetails.Contact_Message != "") {
            var data = "{ContactDetails:" + JSON.stringify(ContactDetails) + "}";
            var url = "/Contact/SendContactMail";
            var result = AjaxPost(url, data);
            if (result = "success") {
                swal("", "Message sent successfully !");
                $('#txtcontactfirstname').val('');
                $('#txtcontactlastname').val("");
               $('#txtcontactemail').val('');
               $('#txtcontactbusinessname').val('');
               $('#txtareacontactmessage').val('');
            }
        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
        }
    });
});