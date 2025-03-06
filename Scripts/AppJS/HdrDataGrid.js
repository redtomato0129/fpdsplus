$(document).ready(() => {
    // onchange="OnGridSearchKeyUp(event);"
    fetchWidgets()
    // $("#page2 a").attr("href", localStorage.getItem("answerWidgetPage2Url"));
    $("#page3 a").attr("href", localStorage.getItem("answerWidgetPage3Url"));
    localStorage.setItem('answerWidgetPage6Url', document.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    if (question_id == 65) {
        $("#gridSearch").show()
        $(".has-search").html(``);
        $("#acha").css("width", "100%")
        $("#gridSearch").css("width","100%")
        $("#gridSearch").html(
            `<div class="row ml-0">
                <div class="col-sm-2 p-0">
                    <div class="form-group has-search">
                        <input type="text" class="form-control" id="uei_field" placeholder="Enter Vendor/UEI">
                    </div>
                </div>
                <div class="col-sm-2 p-0">
                    <div class="form-group has-search">
                        <input type="text" class="form-control" id="office_field" placeholder="Enter Office Location">
                    </div>
                </div>
                <div class="col-sm-4 p-0">
                    <div class="form-group has-search" style="text-align: center;">
                        <label for="message-text" class="col-form-label">Registration Expiration Date Range:</label>
                        <div class="input-group mb-3">
                        <input type="date" class="form-control dateFilters" id="startDate_field" placeholder="Enter Start Date">
                        <input type="date" class="form-control dateFilters" id="endDate_field" placeholder="Enter End Date">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 p-0">
                    <div class="form-group has-search">
                        <label for="message-text" class="col-form-label" style="padding-left: 15px;">JV:</label>
                        <div class="input-group mb-3">
			            <select class="JV" id="selectJV">
				            <option>All</option>
				            <option>Yes</option>
				            <option>No</option>
			            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 pl-4">
                    <div class="form-group has-search">
                        <button type="button" class="btn save" id="filterRecords" style="background-color: #571c7a; color: white" onclick="searchFilter()">Search</button>
                        <button type="button" class="btn save" style="background-color: #571c7a; color: white" onclick="clearFilter()">Clear</button>
                    </div>
                </div>
            </div>
        `);
    }
    
    if (question_id == 67) {
        $("#clickDescription65").hide();
        $("#clickDescription67").show();
        const html = `
            <div class="col-md-4">
		        <label class="lbl_S001">Contract Order Number</label>
		        <div class="input-group mb-3">
			        <input type="text" class="DIS_002 form-control txtvendor" id="val_award"/>
			        <label id="lblcontract_3" style="display:none;" class="lblvendor lblclr"></label>
		        </div>
	        </div>

	        <div class="col-md-4">
		        <label class="lbl_S001">Contract Number</label>
		        <div class="input-group mb-3">
			        <input type="text" class="DIS_002 form-control txtvendor" id="val_parent"/>
			        <label id="lblcontract_2" style="display:none;" class="lblvendor lblclr"></label>
		        </div>
	        </div>

            <div class="col-md-2">
                <label for="message-text">Include Task Orders:</label>
                <div class="input-group mb-3">
                    <select class="DIS_002 form-control txtvendor" id="ito">
			            <option>No</option>
			            <option>Yes</option>
		            </select>
                </div>
            </div>
            <div class="col-md-2 text-center mt-4">
                <button type="button" class="btn waves-effect B_s002" id="searchHdrContract" onclick="searchHdr()"> <i class="ti-search"></i> Search</button>
             </div>`
        $("#datagrid_67").html(html)
        if (!$("#scriptEleContract").length) {
            let scriptEleContract = document.createElement("script");
            scriptEleContract.id = "scriptEleContract";
            scriptEleContract.setAttribute("src", "/Scripts/AppJS/HdrContract.js");
            document.body.appendChild(scriptEleContract);
            scriptEleContract.onload = function () {

            }

        }
    }
})

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

function searchHdr() {
    //let data = JSON.parse($("#lblcontract_3").text())
    let award_id = $("#val_award").val();
    let parent_id = $("#val_parent").val();
    let task_order = $('#ito').find(":selected").text()
    fetchWidgets(award_id, parent_id, task_order);
}

function OnGridSearchKeyUp(event) {

    const start_date = $('#startDate_field').val() ? `${parseInt(new Date($('#startDate_field').val()).getMonth() + 1)}/${new Date($('#startDate_field').val()).getDay()}/${new Date($('#startDate_field').val()).getFullYear()}` : '';
    const end_date = $('#endDate_field').val() ? `${parseInt(new Date($('#endDate_field').val()).getMonth() + 1)}/${new Date($('#endDate_field').val()).getDay()}/${new Date($('#endDate_field').val()).getFullYear()}` : '';
    const object = {
        uei: $("#uei_field").val(),
        start_date,
        end_date,
        jv: $('#selectJV').find(":selected").text()
    }

    getDataByStorePorcedure(widgetDataForExcel, '', '', '', object.uei, object.start_date, object.end_date, object.jv)
}

let widgetDataForExcel;
function fetchWidgets(award_id, parent_id, task_order, searchKeyword) {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');

    //const category = urlParams.get('category')
    //$("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { question_id },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetQuestionWidgetsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                //console.log("records: ", records)
                $("#heading").html(`<strong>${records[0].question_name}</strong>`)
                $("#sub_heading").html(`<strong>${records[0].description}</strong>`)
                $("#description").html(`<strong>${records[0].widget_help_description}</strong>`)
                for (let a = 0; a < records.length; a++) {
                    if (records[a].page_number === 8) {
                        widgetDataForExcel = records[a];
                        getDataByStorePorcedure(records[a], award_id, parent_id, task_order, searchKeyword)
                        break;
                    }
                }
            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}

function routeToCPARSFpds(category, transaction_id, award_id_piid, parent_award_id_piid, UEI) {
    document.location = `/AnswerWizard/FpdsCPARSPage?category=${category}&transaction_id=${transaction_id}&award_id_piid=${award_id_piid}&parent_award_id_piid=${parent_award_id_piid}&UEI=${UEI}`;
}

function routeToUEIplus(category, UEI) {
    document.location = `/AnswerWizard/HdrUEIplus?category=${category}&UEI=${UEI}`;
}

function routeToDrilldown(option, UEI) {
    document.location = `/AnswerWizard/HdrDrilldown?option=${option}&UEI=${UEI}`;
}

function paramRenderer(widgetData, isExcel) {
    //console.log("widgetData:", widgetData)
    const obj = { store_procedure: widgetData.store_procedure }
    const params = new URLSearchParams(window.location.search)
    let html = "";
    for (const param of params) {
        if (param[1][0] == "{") {
            let object = JSON.parse(param[1]);
            html = html + `<tr><td><b>${object.label}</b ></td > ${object.value} </tr >`;
            param[0] = param[0].replace("+", '').trim()
            obj[param[0]] = object.value
        } else {
            obj[param[0]] = param[1]
        }

    }
    $("#paramRenderer").html(html);
    obj.isExcel = isExcel;
    return obj;
}

let columnsData = [];
var ajax;
function getDataByStorePorcedure(widgetData, award_id = '', parent_id = '', task_order, searchKeyword = '', uei = '', startDate = '', endDate = '', selectJV = '', office = '') {
    $("#tableBody").html("");
    $("#loader").show();
    //columnsData = columns
    let award_id_piid = award_id;
    var data = []
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    //const hdr_type = urlParams.get('hdr');
    //const category = urlParams.get('category')
    let payload;
    if (question_id == 65) {
        payload = { search_text: uei, start_date: startDate, end_date: endDate, jv: selectJV, office_location: office, ...paramRenderer(widgetData, false) }
    }
    else {
        if (award_id) {
            payload = { award_id_piid: award_id, parent_award_id_piid: parent_id, includeTaskOrders: task_order, search_text: searchKeyword, ...paramRenderer(widgetData, false) }
        }
        else if (parent_id) {
            payload = { award_id_piid: award_id, parent_award_id_piid: parent_id, includeTaskOrders: task_order, search_text: searchKeyword, ...paramRenderer(widgetData, false) }
        }
        else {
            payload = { includeTaskOrders: task_order, search_text: searchKeyword, ...paramRenderer(widgetData, false) }
        }
    }
    //debugger;
    //const payload = award_id ? { award_id_piid: award_id, parent_award_id_piid: parent_id, search_text: searchKeyword, ...paramRenderer(widgetData, false) } : { search_text: searchKeyword, ...paramRenderer(widgetData, false) }
    if (ajax) {
        ajax.abort();
    }
    ajax = $.ajax({
        type: "POST",
        data: payload,
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/HDRDataGridPage",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                $("#loader").hide();
                $("#tableBody").html("");
                console.log("----------",records)
                for (let b = 0; b < records.length; b++) {
                    const obj = {};
                    let html = '';
                    if (question_id == 65) {
                        $("#datagrid_67").hide();
                        $("#unique_id").hide();
                        $("#tableHeaders67").hide();
                        $("#tableHeaders65").show();
                        $("#filterButton").show();
                        //records[b].updated_at
                        //let formatted_date = getFormattedDate(records[b].updated_at);
                        let formatted_date = records[b].updated_at.split(' ')[0]
                        html = html + `<tr class="gridRow" style ='cursor:pointer;' id='dt-${b}' object='${JSON.stringify(records[b])}'>`;
                        html = html + `<td onclick='routeToUEIplus("contract","${records[b].UEI}");'><u>${records[b].vendor_name}</u></td>`;
                        html = html + `<td style="color: #56c950;"><strong>${records[b].JV}</strong></td>`;
                        html = html + `<td onclick='routeToUEIplus("contract","${records[b].UEI}");'><u>${records[b].UEI}</u></td>`;
                        html = html + `<td onclick='routeToDrilldown("CPARS","${records[b].UEI}");'><u>${records[b].CPARS}</u></td>`;
                        html = html + `<td onclick='routeToDrilldown("idiq_active","${records[b].UEI}");' style="color: #56c950;"><strong><u>${records[b].idiq_active}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("idiq_expired","${records[b].UEI}");' style="color: #56c950;"><strong><u>${records[b].idiq_expired}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("idiq_total","${records[b].UEI}");' style="color: #56c950;"><strong><u>${records[b].idiq_total}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("single_idiq","${records[b].UEI}");' style="color: #56c950;"><strong><u>${records[b].single_idiq}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("Multiple_IDIQ","${records[b].UEI}");' style="color: #56c950;"><strong><u>${records[b].Multiple_IDIQ}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("TO_Active","${records[b].UEI}");' style="color: #7f569a;"><strong><u>${records[b].TO_Active}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("TO_Expired","${records[b].UEI}");' style="color: #7f569a;"><strong><u>${records[b].TO_Expired}</u></strong></td>`;
                        html = html + `<td onclick='routeToDrilldown("TO_Total","${records[b].UEI}");' style="color: #7f569a;"><strong><u>${records[b].TO_Total}</u></strong></td>`;
                        html = html + `<td>${records[b].immediate_owner_name}</td>`;
                        html = html + `<td>${records[b].highest_level_owner}</td>`;
                        html = html + `<td>${records[b].reg_expire_date}</td>`;
                        html = html + `<td>${records[b].cage}</td>`;
                        html = html + `<td>${records[b].tax_id_number}</td>`;
                        html = html + `<td>${records[b].office_location}</td>`;
                        html = html + `<td id="i_status_${records[b].UEI}">${records[b].status}</td>`;
                        html = html + `<td id="i_action_${records[b].UEI}">${records[b].action}</td>`;
                        html = html + `<td id="i_notes_${records[b].UEI}">${records[b].notes}</td>`;
                        html = html + `<td>${formatted_date}</td>`;
                        html = html + `<td><button class="btn border-0" onclick=showEditModal(${b})><i class="fas fa-edit"></i></button></td>`;

                    }
                    else if (question_id == 67) {
                       
                        //$("#vendor_name").html(`<strong>- <a href="/AnswerWizard/VendorPlus?vendor_uei=${records[0].recipient_uei}&&category=contract">
                        //                <u><span id="vendor_name">${records[0].vendor_name}</u></a></span>
                        //                </strong>`)

                        let temp1 = (records[b].base_and_all_options_value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        });
                        let temp2 = (records[b].federal_action_obligation).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        });
                        let formatted_date = records[b].updated_at.split(' ')[0]
                        html = html + `<tr class="gridRow" style ='cursor:pointer;' id='dt-${b}' object='${JSON.stringify(records[b])}'>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].award_id_piid}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].parent_award_id_piid}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].modification_number}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].funding_sub_agency_name}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].funding_office_name}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].naics_code}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].product_or_service_code}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].period_of_performance_start_date}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].period_of_performance_potential_end_date}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${records[b].year_expire}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${temp1}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${temp2}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");' id="i_status_${records[b].recipient_uei}">${records[b].idiq_status}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");' id="i_action_${records[b].recipient_uei}">${records[b].action_to_take}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");' id="i_notes_${records[b].recipient_uei}">${records[b].notes}</td>`;
                        html = html + `<td onclick='routeToCPARSFpds("contract","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}","${records[b].recipient_uei}");'>${formatted_date}</td>`;
                        html = html + `<td><button class="btn border-0" onclick=showEditModalContracts(${b})><i class="fas fa-edit"></i></button></td>`;
                        //if (!records[b].parent_award_id_piid) {
                        //    html = html + `<td><button class="btn border-0" onclick=showEditModal(${b})><i class="fas fa-edit"></i></button></td>`;
                        //}
                        //else {
                        //    html = html + `<td></td>`;
                        //}
                        //html = html + "</tr>"
                    }

                    html = html + "</tr>"
                    data.push(obj)
                    $("#tableBody").append(html)
                }
            }
            else {
                console.log("No Data")
                $("#loader").hide();
                $("#tableBody").html("<tr><td  style='text-align: center;'' colspan='20'>  No record. </td></tr>");
            }
        },
        error: function (error) {
            console.log("Error")
        }
    });

}

function searchFilter() {
    //$('#openModal').modal('toggle');
    let uei = $('#uei_field').val()
    let startDate = $('#startDate_field').val()
    let endDate = $('#endDate_field').val()
    let selectJV = $('#selectJV').find(":selected").text();
    let office = $('#office_field').val()
    console.log(uei)
    console.log(startDate)
    console.log(endDate)
    console.log(selectJV)
    console.log(office)
    //test.getDay() + '/' + parseInt(test.getMonth() + 1) + '/' + test.getFullYear()
    //$('#filterModalCenter').modal('toggle');
    getDataByStorePorcedure(widgetDataForExcel, '', '', '', '', uei, startDate, endDate, selectJV, office)
};

function clearFilter() {
    let uei = $('#uei_field').val('');
    let office = $('#office_field').val('');
    let startDate = $('#startDate_field').val('');
    let endDate = $('#endDate_field').val('');
    let selectJV = $('#selectJV').prop('selectedIndex', 0);
    console.log(uei)
    console.log(startDate)
    console.log(endDate)
    console.log(selectJV)
    console.log(office)
    getDataByStorePorcedure(widgetDataForExcel, '', '', '', '', '', '', '', 'All','')
};

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

function showEditModal(id) {
    const object = JSON.parse($(`#dt-${id}`).attr("object"))
    $('#editModalCenter').modal('toggle');
    $('#edit-uei').val(object.UEI)
    $("#edit-status").val('Select')
    $("#edit-action").val('Select')
    object.status ? $("#edit-status").val(object.status) : null
    object.action ? $("#edit-action").val(object.action) : null
    $('#edit-notes').val(object.notes)
}

function showEditModalContracts(id) {
    const object = JSON.parse($(`#dt-${id}`).attr("object"))
    $('#editContractModalCenter').modal('toggle');
    $('#edit-uei-c').val(object.recipient_uei)
    $('#edit-contract-c').val(object.award_id_piid)
    $("#edit-status-c").val('Select')
    $("#edit-action-c").val('Select')
    object.idiq_status ? $("#edit-status-c").val(object.idiq_status) : null
    object.action_to_take ? $("#edit-action-c").val(object.action_to_take) : null
    $('#edit-notes-c').val(object.notes)
}

function save_changes() {
    let initial_status = $(`#i_status_${$('#edit-uei').val() }`).text();
    let initial_action = $(`#i_action_${$('#edit-uei').val() }`).text();
    let initial_notes = $(`#i_notes_${$('#edit-uei').val() }`).text();
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
            data: { UEI: uei, notes: new_notes, UEI_Status: new_status, action_to_take: new_action, updated_at: new_date },
            enctype: 'multipart/form-data',
            url: "/HDR/UpdateUEI_notes",
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
                    fetchWidgets();
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

function save_changes_contract() {
    let initial_status = $(`#i_status_${$('#edit-uei-c').val()}`).text();
    let initial_action = $(`#i_action_${$('#edit-uei-c').val()}`).text();
    let initial_notes = $(`#i_notes_${$('#edit-uei-c').val()}`).text();
    console.log("initial_status: ", initial_status)
    console.log("initial_action: ", initial_action)
    console.log("initial_notes: ", initial_notes)

    let new_status = $('#edit-status-c').find(":selected").text();
    if (new_status == 'Select') {
        new_status = "";
    }
    console.log("new_status: ", new_status)

    let new_action = $('#edit-action-c').find(":selected").text();
    if (new_action == 'Select') {
        new_action = "";
    }
    console.log("new_action: ", new_action)

    let new_notes = $('#edit-notes-c').val();
    console.log("new_notes: ", new_notes)

    let contract = $('#edit-contract-c').val();
    console.log("contract: ", contract)

    let uei = $('#edit-uei-c').val();
    console.log("uei: ", uei)

    let datenow = new Date();
    let new_date = getFormattedDate(datenow);
    console.log("new_date: ", new_date)

    if (new_status == initial_status && new_action == initial_action && new_notes == initial_notes) {
        $('#editContractModalCenter').modal('toggle');
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
                    $('#editContractModalCenter').modal('toggle');
                    swal.fire({
                        title: "",
                        text: "Notes Updated!",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    fetchWidgets();
                }
                else {
                    $('#editContractModalCenter').modal('toggle');
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
    //paramsData.display_type = 'Excel'

    $.ajax({
        type: "POST",
        data: paramRenderer(widgetDataForExcel, true),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/HdrDataGridPage",
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

//function downloadCSV(filename) {

//    $.ajax({
//        type: "GET",
//        url: "/AnswerWizard/DownloadFile?filename=" + filename,
//        enctype: 'multipart/form-data',
//        success: function (r) {
//            //Convert Base64 string to Byte Array.
//            var bytes = Base64ToBytes(r);

//            //Convert Byte Array to BLOB.
//            var blob = new Blob([bytes], { type: "application/octetstream" });

//            //Check the Browser type and download the File.
//            var isIE = false || !!document.documentMode;
//            if (isIE) {
//                window.navigator.msSaveBlob(blob, filename);
//            } else {
//                var url = window.URL || window.webkitURL;
//                link = url.createObjectURL(blob);
//                var a = $("<a />");
//                a.attr("download", filename);
//                a.attr("href", link);
//                $("body").append(a);
//                a[0].click();
//                $("body").remove(a);
//            }
//        }
//    });
//}

//function Base64ToBytes(base64) {
//    var s = window.atob(base64);
//    //var s = atob(base64.split(".")[1]);
//    var bytes = new Uint8Array(s.length);
//    for (var i = 0; i < s.length; i++) {
//        bytes[i] = s.charCodeAt(i);
//    }
//    return bytes;
//};

//function exportToCsv() {
//    //paramsData.display_type = 'Excel'

//    debugger;
//    $.ajax({
//        type: "GET",
//        url: "/AnswerWizard/DownloadFile?filename=" + filename,
//        enctype: 'multipart/form-data',
//        success: function (result) {

//            result = jQuery.parseJSON(result);

//            if (result.base64) {
//                //Convert Base64 string to Byte Array.
//                var bytes = Base64ToBytes(result.base64);

//                //Convert Byte Array to BLOB.
//                var blob = new Blob([bytes], { type: "application/octetstream" });

//                //Check the Browser type and download the File.
//                var isIE = false || !!document.documentMode;
//                if (isIE) {
//                    window.navigator.msSaveBlob(blob, "Output.xlsx");
//                } else {
//                    var url = window.URL || window.webkitURL;
//                    link = url.createObjectURL(blob);
//                    var a = $("<a />");
//                    a.attr("download", "Output.xlsx");
//                    a.attr("href", link);
//                    $("body").append(a);
//                    a[0].click();
//                    $("body").remove(a);
//                }
//            }
//            else {
//                console.log("Error")
//            }
//        },
//        error: function (error) { }
//    });
//}