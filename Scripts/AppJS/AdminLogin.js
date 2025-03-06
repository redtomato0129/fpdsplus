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
        LoginDetails.useremail = $('#txtUserName').val();
        LoginDetails.userpassword = $('#txtPassword').val();

        var data = "{LoginDetails :" + JSON.stringify(LoginDetails) + "}";
        var url = "/AdminLogin/CheckAdminLogin";
        var result = AjaxPost(url, data);
        if (result.User_Email != "") {
            var origin = window.location.origin;
            window.location.href = origin + "/Admin/admin";
            //bootbox.alert("you have logged in successfully !");

        }
        else {
            var origin = window.location.origin;
            window.location.href = origin + "/AdminLogin/Index";
        }
    }


});