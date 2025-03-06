$(document).ready(async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const uei = urlParams.get('UEI');
    let option = urlParams.get('option');
    option = option.toUpperCase().replace("_", " ");
    $("#uei").html(`Unique Entity ID: <strong>${uei}</strong>`)
    $("#option").html(`DataGrid: <strong>${option}</strong>`)

    $.ajax({
        type: "POST",
        data: { uei },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorInformation",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                console.log(records)
                $("#vendor").html(`Vendor Name: <strong><a href="/AnswerWizard/VendorPlus?vendor_uei=${uei}&&category=contract"><u>${records[0].vendor_name_uei}</u></strong>`)
            }
            else {
                console.log("Vendor not returned")
            }
        },
        error: function (error) { }
    });
    fetchData();
})

function fetchData(d) {
    const urlParams = new URLSearchParams(window.location.search);
    const option = urlParams.get('option');
    const UEI = urlParams.get('UEI');

    if (option == 'CPARS') {
        $.ajax({
            type: "POST",
            data: { UEI },
            enctype: 'multipart/form-data',
            url: "/AnswerWizard/HdrUEIplusPageGrid1",
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result.records && result.records != 0) {
                    const records = result.records;
                    //console.log(records)
                    $("#loader").hide();
                    for (let b = 0; b < records.length; b++) {
                        let html = '';
                        html = html + `<tr>`;
                        html = html + `<td>${records[b].CONTRACT_NUMBER}</td>`;
                        html = html + `<td>${records[b].CONTRACT_ORDER_NUMBER}</td>`;
                        html = html + `<td>${records[b].AGENCY_NAME}</td>`;
                        html = html + `<td>${records[b].QUALITY_RATING}</td>`;
                        html = html + `<td>${records[b].SCHEDULE_RATING}</td>`;
                        html = html + `<td>${records[b].COST_CONTROL_RATING}</td>`;
                        html = html + `<td>${records[b].MANAGEMENT_RATING}</td>`;
                        html = html + `<td>${records[b].SMALL_BUSINESS_RATING}</td>`;
                        html = html + `<td>${records[b].REGULATORY_COMPLIANCE_RATING}</td>`;
                        html = html + `<td>${records[b].ASSESSING_OFFICIAL_RECOMMEND}</td>`;
                        html = html + `<td>${records[b].ASSESSING_OFFICIAL_SIGNED_DATE}</td>`;
                        html = html + "</tr>"
                        $("#tableBody").append(html)
                    }
                }
                else {
                    console.log("No data returned")
                    $("#loader").hide();
                    $("#tableBody").html("<tr><td  style='text-align: center;'' colspan='12'>  No record. </td></tr>");
                }
            },
            error: function (error) { }
        });
    }

    else {
        $("#cparsTable").hide()
        $("#idiqTable").show()
        $.ajax({
            type: "POST",
            data: { UEI: UEI, drilldown_type: option },
            enctype: 'multipart/form-data',
            url: "/AnswerWizard/HdrDrilldownDataGrid",
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result.records && result.records != 0) {
                    const records = result.records;
                    console.log(records)
                    $("#tableBody").html("");
                    $("#loader").hide();
                    for (let b = 0; b < records.length; b++) {
                        let temp1 = (records[b].base_and_all_options_value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        });
                        let temp2 = (records[b].federal_action_obligation).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        });
                        let formatted_date = records[b].updated_at.split(' ')[0]
                        let html = '';
                        html = html + `<tr style ='cursor:pointer;' id='dt-${b}' object='${JSON.stringify(records[b])}'>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].parent_award_id_piid}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].award_id_piid}</td>`;
                        html = html + `<td>${records[b].modification_number}</td>`;
                        html = html + `<td>${records[b].funding_sub_agency_name}</td>`;
                        html = html + `<td>${records[b].funding_office_name}</td>`;
                        html = html + `<td>${records[b].naics_code}</td>`;
                        html = html + `<td>${records[b].product_or_service_code}</td>`;
                        html = html + `<td>${records[b].period_of_performance_start_date}</td>`;
                        html = html + `<td>${records[b].period_of_performance_potential_end_date}</td>`;
                        html = html + `<td>${records[b].year_expire}</td>`;
                        html = html + `<td>${temp1}</td>`;
                        html = html + `<td>${temp2}</td>`;
                        html = html + `<td id="i_status_${records[b].recipient_uei}">${records[b].idiq_status}</td>`;
                        html = html + `<td id="i_action_${records[b].recipient_uei}">${records[b].action_to_take}</td>`;
                        html = html + `<td id="i_notes_${records[b].recipient_uei}">${records[b].notes}</td>`;
                        html = html + `<td>${formatted_date}</td>`;
                        if (!records[b].parent_award_id_piid) {
                            html = html + `<td><button class="btn border-0" onclick=showEditModal(${b})><i class="fas fa-edit"></i></button></td>`;
                        }
                        else {
                            html = html + `<td></td>`;
                        }
                        html = html + "</tr>"
                        $("#tableBody").append(html)
                    }
                }
                else {
                    console.log("No data returned")
                    $("#loader").hide();
                    $("#tableBody").html("<tr><td  style='text-align: center;'' colspan='18'>  No record. </td></tr>");
                }
            },
            error: function (error) { }
        });
    }
}

function showEditModal(id) {
    const object = JSON.parse($(`#dt-${id}`).attr("object"))
    $('#editModalCenter').modal('toggle');
    $('#edit-uei').val(object.recipient_uei)
    $('#edit-contract').val(object.award_id_piid)
    $("#edit-status").val('Select')
    $("#edit-action").val('Select')
    object.idiq_status ? $("#edit-status").val(object.idiq_status) : null
    object.action_to_take ? $("#edit-action").val(object.action_to_take) : null
    $('#edit-notes').val(object.notes)
}

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

function save_changes() {
    let initial_status = $(`#i_status_${$('#edit-uei').val()}`).text();
    let initial_action = $(`#i_action_${$('#edit-uei').val()}`).text();
    let initial_notes = $(`#i_notes_${$('#edit-uei').val()}`).text();
    console.log("initial_status: ", initial_status)
    console.log("initial_action: ", initial_action)
    console.log("initial_notes: ", initial_notes)

    let new_status = $('#edit-status').find(":selected").text();
    if (new_status == 'Select') {
        new_status = "";
    }
    console.log("new_status: ", new_status)

    let new_action = $('#edit-action').find(":selected").text();
    if (new_action == 'Select') {
        new_action = "";
    }
    console.log("new_action: ", new_action)

    let new_notes = $('#edit-notes').val();
    console.log("new_notes: ", new_notes)

    let contract = $('#edit-contract').val();
    console.log("contract: ", contract)

    let uei = $('#edit-uei').val();
    console.log("uei: ", uei)

    let datenow = new Date();
    let new_date = getFormattedDate(datenow);
    console.log("new_date: ", new_date)

    if (new_status == initial_status && new_action == initial_action && new_notes == initial_notes) {
        $('#editModalCenter').modal('toggle');
    }
    else {
        $.ajax({
            type: "POST",
            data: { UEI: uei, notes: new_notes, idiq_Status: new_status, contract_number: contract, action_to_take: new_action, updated_at: new_date },
            enctype: 'multipart/form-data',
            url: "/HDR/UpdateHDR_NotesStatusIDIQ",
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result == 'success') {
                    $('#editModalCenter').modal('toggle');
                    swal.fire({
                        title: "",
                        text: "Notes Updated!",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    fetchData();
                }
                else {
                    $('#editModalCenter').modal('toggle');
                    swal.fire({
                        title: "",
                        text: "Something went wrong",
                        type: "error",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    console.log("Cannot update notes")
                }
            },
            error: function (error) {
                console.log("Error")
            }
        });

    }
}

function routeToCPARSFpds(category, transaction_id, award_id_piid, parent_award_id_piid, UEI) {
    document.location = `/AnswerWizard/FpdsCPARSPage?category=${category}&transaction_id=${transaction_id}&award_id_piid=${award_id_piid}&parent_award_id_piid=${parent_award_id_piid}&UEI=${UEI}`;
}

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    //var s = atob(base64.split(".")[1]);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};

function exportToCsv() {
    const urlParams = new URLSearchParams(window.location.search);
    const uei = urlParams.get('UEI');
    let option = urlParams.get('option');
    let sp;
    if (option == 'CPARS') {
        sp = "Wizard_Question_HDR_CPARS_UEI_DataGrid"
    }
    else {
        sp = "Wizard_Question_HDR_IDIQ_DrillDown"
    }
    $.ajax({
        type: "POST",
        data: { sp: sp, isExcel: true, UEI: uei, drilldown_type: option },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/HdrDrilldownExcel",
        success: function (result) {

            result = jQuery.parseJSON(result);
            if (result.records) {
                downloadCSV(result.records)
            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}

function downloadCSV(filename) {

    $.ajax({
        type: "GET",
        url: "/AnswerWizard/DownloadFile?filename=" + filename,
        enctype: 'multipart/form-data',
        success: function (r) {
            //Convert Base64 string to Byte Array.
            var bytes = Base64ToBytes(r);

            //Convert Byte Array to BLOB.
            var blob = new Blob([bytes], { type: "application/octetstream" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = $("<a />");
                a.attr("download", filename);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }
        }
    });
}