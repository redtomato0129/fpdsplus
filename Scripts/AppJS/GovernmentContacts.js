$(document).ready(function () {
   
    fetchGovernmentContactsList();
});
function agencyHtml(htmlId) {
    if (!$("#scriptEleSocio").length) {
        let scriptEleSocio = document.createElement("script");
        scriptEleSocio.id = "scriptEleSocio";
        scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
        document.body.appendChild(scriptEleSocio);
        scriptEleSocio.onload = function () {

        }
    }
        const subAgency = `
                        <div class="col-md-4 mb-2 pr-2">
                           <label for="basic-url">Sub Agency</label><span style="color:red">*</span></label>
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
                           <label for="basic-url">Agency</label><span style="color:red">*</span></label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear" id="btndeptrowclear_2"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtdept" id="txtdept_2"     />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr"></label>
                           </div>
                        </div>
                     

						   ${subAgency}
							${fundingOffice}

							`;
    $(htmlId).html(html);
       // $("#editAgency").html(html);
    
}

function onInputChange() {
    const name = $("#searchName").val().toLowerCase();
    const agency = $("#searchSubAgency").val().toLowerCase();
    if (name || agency) {
        const data = listData.filter(item => {
           
            if (name && agency) {
                return item.name.toLowerCase().includes(name) == true && item.funding_sub_agency_name.toLowerCase().includes(agency)
            } else if (name) {
                return item.name.toLowerCase().includes(name) == true
            } else if (agency) {
                return item.funding_sub_agency_name.toLowerCase().includes(agency.toLowerCase())
            }
           
        })
        renderList(data)
    } else {
        renderList(listData)
    }
}

function renderList(records) {
    $("#getGovernmentContacts").html()
    let html = "";
    let count = 1;
    for (let a = 0; a < records.length; a++) {
        //if (records[a].active == 1) {
        html = html + `<tr id='dt-${a}' object='${JSON.stringify(records[a]).replace(/'/g, "&apos;")}' onclick="editContactModal(${a})">
                                            <td>${count}</td>
                                            <td>${records[a].name}</td>
                                            <td>${records[a].email_address}</td>
                                            <td style="white-space: break-spaces;">${records[a].funding_sub_agency_name}</td>
                                            <td style="white-space: break-spaces;">${records[a].funding_office_name}</td>
                                        </tr>`;
        //}
        //else {
        //    continue;
        //}
        count++;
    }
    $("#getGovernmentContacts").html(html)
}
let listData = [];
function fetchGovernmentContactsList() {
    $.ajax({
        type: "POST",
        data: { active: $("#searchActive").val()},
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/GetGovernmentContactsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.length != 0) {
                const records = result;
                listData = records;
                renderList(records)

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
    agencyHtml("#agencyHtml")
    $("#addContactModal").modal('show')
    $("#contactName").val('');
    $("#contactPhone").val('');
    $("#contactEmail").val('');
    $("#contactAddress").val('');
    $("#contactCity").val('');
    $("#contactState").val('');
    $("#contactZip").val('');
    $("#contactNotes").val('');
    $("#txtdept_2").val('');
    $("#txtagency_2").val('');
    $("#txtoffice_2").val('');
}

function editContactModal(id) {
    agencyHtml("#editAgency")
    const object = JSON.parse($(`#dt-${id}`).attr("object"))
    $("#editContactModal").modal('show')
    $('#government_contact_id').val(object.government_contact_id)
    $('#editName').val(object.name)
    $('#editTitle').val(object.title)
    $('#editPhone').val(object.phone)
    $('#editEmail').val(object.email_address)
    $('#editAddress').val(object.address)
    $('#editCity').val(object.city)
    $('#editState').val(object.state)
    $('#editZip').val(object.zip_code)
    $('#editNotes').val(object.notes)
    $('#txtdept_2').val(object.funding_agency_name)
    $('#lbldept_2').text(object.funding_agency_code)
    $('#txtagency_2').val(object.funding_sub_agency_name)
    $('#lblagency_2').text(object.funding_sub_agency_code)
    $('#txtoffice_2').val(object.funding_office_name)
    $('#lbloffice_2').text(object.funding_office_code)
    $('#editActive').val(object.active)
}

function closeContactModal(id) {
    $(`#${id}`).modal('hide');
    $("#agencyHtml").html('')
    $("#editAgency").html('')    
    $("#contactName").val('');
    $("#contactPhone").val('');
    $("#contactEmail").val('');
    $("#contactAddress").val('');
    $("#contactCity").val('');
    $("#contactState").val('');
    $("#contactZip").val('');
    $("#contactNotes").val('');
    $("#txtdept_2").val('');
    $("#txtagency_2").val('');
    $("#txtoffice_2").val('');
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
        notes: $("#contactNotes").val(),
        funding_agency_name: $("#txtdept_2").val(),
        funding_agency_code: $("#lbldept_2").text(),
        funding_sub_agency_name: $("#txtagency_2").val(),
        funding_sub_agency_code: $("#lblagency_2").text(),
        funding_office_name: $("#txtoffice_2").val(),
        funding_office_code: $("#lbloffice_2").text(),
        active: 1
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
                closeContactModal('addContactModal');
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

function updateData() {
    const contactData = {
        government_contact_id: $("#government_contact_id").val(),
        name: $("#editName").val(),
        title: $("#editTitle").val(),
        phone: $("#editPhone").val(),
        email_address: $("#editEmail").val(),
        address: $("#editAddress").val(),
        city: $("#editCity").val(),
        state: $("#editState").val(),
        zip_code: $("#editZip").val(),
        notes: $("#editNotes").val(),
        funding_agency_name: $("#txtdept_2").val(),
        funding_agency_code: $("#lbldept_2").text(),
        funding_sub_agency_name: $("#txtagency_2").val(),
        funding_sub_agency_code: $("#lblagency_2").text(),
        funding_office_name: $("#txtoffice_2").val(),
        funding_office_code: $("#lbloffice_2").text(),
        active: $("#editActive").val(),
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
        data: contactData,
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/AddGovernmentContact",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.response == "Success") {
                swal.fire({
                    title: "Success",
                    text: "Contact Updated Successfully",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                closeContactModal('editContactModal');
                fetchGovernmentContactsList();
            }
            else {
                swal.fire({
                    title: "Failed",
                    text: "Contact Not Updated",
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
    return obj.name && obj.email_address && obj.funding_agency_code && obj.funding_sub_agency_code ? true : false;
}

function onActiveChange() {
    fetchGovernmentContactsList()
}