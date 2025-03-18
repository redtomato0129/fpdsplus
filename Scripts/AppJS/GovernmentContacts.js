$(document).ready(function () {
    if (!$("#scriptEleSocio").length) {
        let scriptEleSocio = document.createElement("script");
        scriptEleSocio.id = "scriptEleSocio";
        scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
        document.body.appendChild(scriptEleSocio);
        scriptEleSocio.onload = function () {
          
        }
        const subAgency = `
                        <div class="col-md-4 mb-2 pr-2">
                           <label for="basic-url">Sub Agency</label>
							<!-- <span style="color:red;">*</span>-->
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenAgencyPopup " id="btnagencyrowclear" data-toggle="tooltip" 
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtagency" id="txtagency_2"  />
								<label id="lblagency_2" style="display:none;" class="lblagency lblclr"></label>
                           </div>
                        </div>
                     `
       const fundingOffice = `
                        <div class="col-md-4 mb-2 pr-2">
                           <label for="basic-url">Office Name</label>
							 <!-- <span style="color:red;">*</span>-->
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenOffcPopup" data-toggle="tooltip" id="btnofficerowclear"
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtoffice" id="txtoffice_2" />
							  <label id="lbloffice_2" style="display:none;" class="lbloffice lblclr"></label>
                           </div>
                        </div>
					`
        const html = ` 
					
                        <div class="col-md-4 mb-2 pr-2" >
                           <label for="basic-url">Agency</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtdept" id="txtdept_2"     />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr"></label>
                           </div>
                        </div>
                     

						   ${subAgency}
							${fundingOffice}

							`;
        $("#agencyHtml").html(html);
    }
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
    $("#addContactModal").modal('show')
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
            if (result.length != 0) {
                const records = result;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + `<tr>
                                            <td>${a + 1}</td>
                                            <td>${records[a].name}</td>
                                            <td>${records[a].phone}</td>
                                            <td>${records[a].email_address}</td>
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
        title: $("#contactTitle").val(),
        phone: $("#contactPhone").val(),
        email_address: $("#contactEmail").val(),
        address: $("#contactAddress").val(),
        city: $("#contactCity").val(),
        state: $("#contactState").val(),
        zip_code: $("#contactZip").val(),
        notes: $("#inputNotes").val(),
        funding_agency_name: $("#txtdept_2").val(),
        funding_agency_code: $("#lbldept_2").text(),
        funding_sub_agency_name: $("#txtagency_2").val(),
        funding_sub_agency_code: $("#lblagency_2").text(),
        funding_office_name: $("#txtoffice_2").val(),
        funding_office_code: $("#lbloffice_2").text()
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
        data: contactData ,
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/AddGovernmentContact",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.response == "Success") {
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