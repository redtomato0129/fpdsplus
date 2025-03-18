$(document).ready(function () {
    fetchGovernmentContactsList();
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

function addContactModal() {
    $("#addContactModal").modal('toggle')
    $("#contactName").val('');
    $("#contactPhone").val('');
    $("#contactEmail").val('');
    $("#contactAddress").val('');
    $("#contactCity").val('');
    $("#contactState").val('');
    $("#contactZip").val('');
    $("#contactNotes").val('');

}

function closeContactModal() {
    $("#addContactModal").modal('hide');
    $("#contactName").val('');
    $("#contactPhone").val('');
    $("#contactEmail").val('');
    $("#contactAddress").val('');
    $("#contactCity").val('');
    $("#contactState").val('');
    $("#contactZip").val('');
    $("#contactNotes").val('');
}

function fetchGovernmentContactsList() {
    $.ajax({
        type: "POST",
        data: {},
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/GetGovernmentContactsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + `<tr>
                                            <td>${a + 1}</td>
                                            <td>${records[a].name}</td>
                                            <td>${records[a].phone}</td>
                                            <td>${records[a].email}</td>
                                            <td>${records[a].funding_agency_name}</td>
                                            <td>${records[a].funding_sub_agency_name}</td>
                                            <td>${records[a].funding_office_name}</td>
                                        </tr>`;
                }
                $("#getGovernmentContacts").html(html)

            }
            else {
                $('#getGovernmentContacts').html("<tr><td  style='text-align: center;'' colspan='7'>No Record</td></tr>");
            }
        },
        error: function (error) {
            $('#getGovernmentContacts').html("<tr><td  style='text-align: center;'' colspan='7'>Error</td></tr>");
        }
    });
}

function saveData() {
    const contactData = {
        name: $("#contactName").val(),
        phone: $("#contactPhone").val(),
        email: $("#contactEmail").val(),
        address: $("#contactAddress").val(),
        city: $("#contactCity").val(),
        state: $("#contactState").val(),
        zip_code: $("#contactZip").val(),
        notes: $("#contactNotes").val(),
    }
    if (!checkContactValidation(contactData)) {
        Swal.fire({
            icon: 'error',
            title: '',
            buttons: true,
            html: "Please fill in all required <span class='text-danger'>*</span> fields.",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    }   
    $.ajax({
        type: "POST",
        data: { contactData },
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/AddGovernmentContact",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result == "Success") {
                swal.fire({
                    title: "Success",
                    text: "Contact Added Successfully",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                closeContactModal();
                fetchGovernmentContactsList();
            }
            else {
                swal.fire({
                    title: "Failed",
                    text: "Contact Not Added",
                    type: "danger",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
            }
        }, error: function (error) {
            swal.fire({
                title: "Error",
                text: error,
                type: "danger",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        }
    });
}

function checkContactValidation(obj) {
    //&& obj.city && obj.state && obj.address && obj.zip_code
    return obj.name && obj.email_address ? true : false;
}