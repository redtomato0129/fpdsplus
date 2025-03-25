$(document).ready(function () {
    fetchGovernmentContactsList()
});
function openViewGovtContactsModal(dealId) {
    let deal_id = Number(dealId)
    $.ajax({
        type: "POST",
        data: { deal_id },
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/GetDealGovernmentContactList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.length != 0) {
                var govtContactList = result;
                const date = new Date(govtContactList[0].deal_rfp_release_date);
                govtContactList[0].deal_rfp_release_date =
                    ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

                $("#dueDateGovtContact").html("&nbsp;&nbsp; | &nbsp;" + govtContactList[0].deal_rfp_release_date)
                $("#statusGovtContact").html("&nbsp;&nbsp; | &nbsp;" + govtContactList[0].deal_status)
                $("#titleGovtContact").html(govtContactList[0].deal_title)


                let fillData = '';
                for (var i = 0; i < govtContactList.length; i++) {
                    fillData = fillData + viewGovtContractRenderer(govtContactList[i])
                }
                $("#peopleListRender").html(fillData)
                $("#viewGovtContactsModal").modal('toggle');
                clickEventsPeople()
            }
            else {
                let fillData = `<div style = "display:flex; justify-content: center; align-items: center; font-size: 20px;">No data to display</div> `;
                $("#peopleListRender").html(fillData)
                $("#viewGovtContactsModal").modal('toggle');
            }
        },
        error: function (error) {
            let fillData = `<div style = "display:flex; justify-content: center; align-items: center; font-size: 20px;">Error</div> `;
            $("#peopleListRender").html(fillData)
            $("#viewGovtContactsModal").modal('toggle');
        }
    });
}

function openAttachGovtContactsModal(deal_id) {
    var url = "/CrmDeals/DealsById";
    var data = "{dealId:" + JSON.stringify(deal_id) + "}";
    //;
    var result = AjaxPost(url, data);
    const date = new Date(result.deal.Deal_RFP_Release_Date);
    result.deal.Deal_RFP_Release_Date =
        ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

    $("#dueDateAddGovernmentModal").html("&nbsp;&nbsp; | &nbsp;" + result.deal.Deal_RFP_Release_Date)
    $("#statusAddGovernmentModal").html("&nbsp;&nbsp; | &nbsp;" + result.deal.Deal_Status)
    $("#titleStatusAddGovernmentModal").html(result.deal.Deal_Title)
    $("#AddAttachDealGovt").val(deal_id)
    $('#attachGovtContactModal').modal('show');
}

function renderList(records) {
    $("#getGovernmentContacts").html()
    let html = "";
    let count = 1;
    for (let a = 0; a < records.length; a++) {
        //if (records[a].active == 1) {
        html = html + `<tr id='dt-${a}' object='${JSON.stringify(records[a]).replace(/'/g, "&apos;")}'">
                                            <td>${count}</td>
                                            <td>${records[a].name}</td>
                                            <td>${records[a].email_address}</td>
                                            <td>${records[a].funding_sub_agency_name}</td>
                                            <td>${records[a].funding_office_name}</td>
                                            <td><button class="btn dealbtn float-left  pr-4 pl-4" type="button" id="assignToDeal" onclick="assignToDeal(${records[a].government_contact_id})">Assign</button></td>
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
        data: { active: $("#searchActive").val() },
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

function onActiveChange() {
    fetchGovernmentContactsList()
}

function assignToDeal(government_contact_id) {
    const dealData = {
        deal_id: $("#AddAttachDealGovt").val(),
        govt_contact_id: government_contact_id,
    }
    $.ajax({
        type: "POST",
        data: dealData,
        enctype: 'multipart/form-data',
        url: "/CrmGovernmentContacts/GetDealGovernmentContact",
        success: function (response) {
            response = jQuery.parseJSON(response);
            if (response.length == 0) {
                $.ajax({
                    type: "POST",
                    data: dealData,
                    enctype: 'multipart/form-data',
                    url: "/CrmGovernmentContacts/AddDealGovernmentContact",
                    success: function (result) {
                        result = jQuery.parseJSON(result);
                        if (result.response == "Success") {
                            swal.fire({
                                title: "Success",
                                text: "Govt. Contact Assigned to Deal",
                                type: "success",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 3000,
                            })
                            closeGovtContactsModal();
                        }
                        else {
                            swal.fire({
                                title: "Failed",
                                text: "Govt. Contact Not Assigned",
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
            else {
                swal.fire({
                    title: "Failed",
                    text: "Govt. Contact already assigned to this deal",
                    type: "danger",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                closeGovtContactsModal();
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

function viewGovtContractRenderer(obj) {
    return ` 
<div class="comment__sec ">
    <div class="item-icon item-peopleIcon"></div>
    <div class="companyblock">
        <div class="main_header">
            <div class="nameblock">
                <div class="text">
                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 150px;">${obj.govt_contact_name}</h2>
                </div>
            </div>
            <div class="nameblock" style="float:right">
                <div class="text d-flex align-items-center">
                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 200px;">${obj.govt_contact_email}</h2>&nbsp; | &nbsp;
                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 120px;"> ${obj.govt_contact_phone}</h2>&nbsp; | &nbsp;
                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 100px;">${obj.govt_contact_address}</h2>
                </div>
            </div>
        </div>

        <div class="centerblock">
            ${obj.govt_contact_notes}
        </div>

        <hr>
        <div class="col-12">
            <div class="col-12 pd0">
                <div class="comentico">
                    <div class="text">
                        <h6>${obj.funding_agency_name}</h6>
                        <h6>${obj.funding_sub_agency_name}</h6>
                        <h6>${obj.funding_office_name}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
}

function closeGovtContactsModal() {
    $("#viewGovtContactsModal").modal('hide');
    $("#attachGovtContactModal").modal('hide');
}
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
function addContactModal() {
    $("#attachGovtContactModal").modal('hide')
    $("#AddAttachDealGovt").val()
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

function checkContactValidation(obj) {
    return obj.name && obj.email_address && obj.funding_agency_code && obj.funding_sub_agency_code ? true : false;
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
        data: contactData,
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
                openAttachGovtContactsModal($("#AddAttachDealGovt").val())
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