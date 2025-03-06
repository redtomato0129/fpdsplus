$(document).ready(function () {
    
   
    function timeListRenderer() {
        const timeList = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
            "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
        let html = "";
        for (let i = 0; i < timeList.length; i++) {
            html = html + ` <option value="${timeList[i]}">${timeList[i]}</option>`;
        }
        $("#timeList").html(html)
    }
    timeListRenderer()

    function daysListRenderer() {
        const daysList = [{ name: "Mon", value: "Monday" }, { name: "Tue", value: "Tuesday" }, { name: "Wed", value: "Wednesday" }, { name: "Thu", value: "Thursday" }
            , { name: "Fri", value: "Friday" }, { name: "Sat", value: "Saturday" }, { name: "Sun", value: "Sunday" }        ];
        let html = "";
        for (let i = 0; i < daysList.length; i++) {
            html = html + ` <option value="${daysList[i].value}">${daysList[i].name}</option>`;
        }
        $("#everyWeekList").html(html)
        $("#otherWeekList").html(html)
    }
    daysListRenderer();
    getEmailNotification();
});

function copyToClipboard() {
    var tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    swal.fire({
        title: "",
        text: "URL copied to clipboard!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}

function getEmailNotification() {
    $.ajax({
        type: "POST",
        data: { },
        enctype: 'multipart/form-data',
        url: "/EmailNotification/GetEmailNotificationByUserId",
        success: function (result) {
            result = jQuery.parseJSON(result); 
            if (result.emailNotification ) {
                const data = result.emailNotification;
                if (!data.Email_Notification_Id) {
                    $("#enableNotification").prop('checked', false);
                } else {
                    $("#enableNotification").prop('checked', data.Status);
                    
                    $("input[name=customRadio][value=" + data.Frequency_type + "]").attr('checked', 'checked');
                    
                    $("#emailNotificationId").val(data.Email_Notification_Id);
                    switch (data.Frequency_type) {
                        case 'Daily':
                            $("#timeList").val(data.Frequency_option);
                            break;
                        case 'Every-week':
                           $("#everyWeekList").val(data.Frequency_option);
                            break;
                        case 'Every-other-week':
                            $("#otherWeekList").val(data.Frequency_option);
                            break;
                        case 'Monthly':
                           console.log("monthly")
                            break;
                        default:
                            console.log("monthly")
                            break;
                    }
                }
            }

        },
        error: function (error) { }

    });
}

function errorMessage(title, text) {
    swal.fire({
        title,
        text,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}

function saveEmailNotification() {
    const radioValue = $("input[name=customRadio]:checked").val();
    if (!radioValue) {
        errorMessage("Email Notification", "Please fill Mandotory field")
        return;
    }
    const data = {};
    switch (radioValue) {
        case 'Daily':
            data.Frequency_type = radioValue;
            data.Frequency_option = $("#timeList").val();
            if (!data.Frequency_option) {
                errorMessage("Email Notification", "Please fill Mandotory field")
                return;
            }
            break;
        case 'Every-week':
            data.Frequency_type = radioValue;
            data.Frequency_option = $("#everyWeekList").val();
            if (!data.Frequency_option) {
                errorMessage("Email Notification", "Please fill Mandotory field")
                return;
            }
            break;
        case 'Every-other-week':
            data.Frequency_type = radioValue;
            data.Frequency_option = $("#otherWeekList").val();
            if (!data.Frequency_option) {
                errorMessage("Email Notification", "Please fill Mandotory field")
                return;
            }
            break;
        case 'Monthly':
            data.Frequency_type = radioValue;
            data.Frequency_option = "";
            break;
        default: 
            data.Frequency_type = radioValue;
            data.Frequency_option = $("#timeList").val();
            break;
    }
    data.Status = $("#enableNotification").is(":checked") ? 1 : 0;
    data.Email_Notification_Id = $("#emailNotificationId").val() ? $("#emailNotificationId").val() : 0;
    
    $.ajax({
        type: "POST",
        data,
        enctype: 'multipart/form-data',
        url: "/EmailNotification/EmailNotificationAdd",
        success: function (result) {

            result = jQuery.parseJSON(result);

            if (result.response =="Success") {
             
                swal.fire({
                    title: "Email Notifiaction",
                    text: "Updated",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
            }

        },
        error: function (error) { }

    });

}