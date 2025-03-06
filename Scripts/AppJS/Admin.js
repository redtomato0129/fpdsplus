$(document).ready(function () {



    var input = document.getElementById("txtAdminPassword");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            login();
        }
    });
    $('#LoginAdmin').click(function () {

        Adminlogin();
    });


    function Adminlogin() {
        var LoginDetails = {};
        LoginDetails.useremail = $('#txtAdminName').val();
        LoginDetails.userpassword = $('#txtAdminPassword').val();

        var data = "{LoginDetails :" + JSON.stringify(LoginDetails) + "}";
        var url = "/Admin/CheckAdminLogin";
        var result = AjaxPost(url, data);
        if (result.User_Email != "") {
            var origin = window.location.origin;
            window.location.href = origin + "/Subscription/Index";
            //bootbox.alert("you have logged in successfully !");

        }
        else {
            swal("", "Invalid Username or Password", "error");
        }
    }


});