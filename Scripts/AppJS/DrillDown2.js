$(document).ready(() => {
    $(".footer").hide();
    fetchWidgets()
   // $("#page2 a").attr("href", localStorage.getItem("answerWidgetPage2Url"));
    $("#page3 a").attr("href", localStorage.getItem("answerWidgetPage3Url"));
    localStorage.setItem('answerWidgetPage6Url', document.location.href);
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

function fetchWidgets() {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { question_id },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetQuestionWidgetsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                console.log("records: ", records)
                $("#heading").html(`<strong>${records[0].question_name}</strong>`)
                $("#sub_heading").html(`<strong>${records[0].description}</strong>`)                
                $("#description").html(`<strong>${records[0].widget_help_description}</strong>`)
                
                for (let a = 0; a < records.length; a++) {
                    if (question_id == 47 || question_id == 68) {
                        fetchResult47(records[a]);
                    }
                    else {
                        if (records[a].page_number === 6) {
                            records[a].wizard_widget_type_type === "table" ? getTableColumns(records[a]) : getDataByStorePorcedure(records[a])
                        }
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

function routeToFpds(category,transaction_id, award_id_piid, parent_award_id_piid) {
    //document.location = `/AnswerWizard/FpdsPage?transaction_id=${transaction_id}`;
    //console.log("url: ", `/AnswerWizard/FpdsPage?transaction_id=transaction_id&award_id_piid=award_id_piid&parent_award_id_piid=parent_award_id_piid`)
    document.location = `/AnswerWizard/FpdsPage?category=${category}&transaction_id=${transaction_id}&award_id_piid=${award_id_piid}&parent_award_id_piid=${parent_award_id_piid}`;
}

function paramRenderer(widgetData) {
    console.log("widgetData:", widgetData)

    const obj = { store_procedure: widgetData.store_procedure }
    const params = new URLSearchParams(window.location.search)
    //let html = `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr><tr><td><b>Y-Axis Bar</b></td><td> ${widgetData.y_axis_label}</td></tr><tr><td><b>Y-Axis Line</b></td><td>${widgetData.y_axis_line_label}</td></tr>`;
    let html = "";
    for (const param of params) {
    
        //if (param[0] != "question_id" && param[0] != "vendor_uei" && param[0] != "action_date_fiscal_year" && param[0] !="contract_year") {
        //console.log(param[0], param[1][0], param[1])
        if (param[1][0] =="{") {
            let object = JSON.parse(param[1]);
            if (object.label === 'Naics Family') {
                object.label = 'NAICS Family'
            }
            else if (object.label === 'Naics') {
                object.label = 'NAICS'
            }
            const value = `<td>${object.description ? object.label == 'NAICS' || object.label == 'NAICS Family' ? object.value + ' - ' + object.description : '' + object.description.split(', ').join("<br>") : object.value}</td >`

            html = html + `<tr><td><b>${object.label == 'Socio-Economic Designation' ? 'Socio-Economic' : object.label}</b ></td > ${value} </tr >`;
            param[0] = param[0].replace("+", '').trim()
            obj[param[0]] = object.value
        } else {
            obj[param[0]] = param[1]
        }

    }
    $("#paramRenderer").html(html);

    return obj;
}

function headerRenderer(columns) {
    const headerName = [];

    let headerHtml = "<tr>"
    for (let a = 0; a < columns.length; a++) {
        if (columns[a].data_grid) {
            if (columns[a].isLabel) {
                console.log(columns[a].header_name, " is not in datagrid")
            }
            else {
                //console.log("Header # ", a, ": ", columns[a].header_name)    
                headerHtml = headerHtml + `<th>${columns[a].header_name}</th>`
                headerName.push(columns[a])
            }
        }

        

    }
    headerHtml = headerHtml + "</tr>"
    //columnsData = headerName
    return headerHtml
}
let columnsData = [];
let paramsData;
function getDataByStorePorcedure(widgetData, columns = []) {
    $("#loader").show();
    paramsData = paramRenderer(widgetData);
    columnsData = columns
    var data = []
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    const vendor_uei = urlParams.get('vendor_uei')
    $.ajax({
        type: "POST",
        data: paramRenderer(widgetData),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExecuteStoreProcedureDataGrid",
        success: function (result) {
            $("#loader").hide();
            result = jQuery.parseJSON(result);
            console.log(result)
            if (result.records && result.records != 0) {
                const records = result.records;
                //console.log("All ", records)
                console.log("0 ", records[0].vendor_name)
               // console.log("1 ", records[25].vendor_name)
                $("#vendor_uei").html(`${records[0].recipient_uei}`)
                if (vendor_uei) {

                $("#vendor_name").html(`<strong>- <a href="/AnswerWizard/VendorPlus?vendor_uei=${records[0].recipient_uei}&&category=${category}">
                                        <u><span id="vendor">${records[0].vendor_name}</u></a></span>
                                        </strong>`)
                }
                if (question_id == 1 || question_id == 3 || question_id == 5 || question_id == 6 || question_id == 7 || question_id == 8
                    || question_id == 18 || question_id == 19 || question_id == 20 || question_id == 21 || question_id == 37
                    || question_id == 39 || question_id == 40 || question_id == 41 || question_id == 42 || question_id == 43
                    || question_id == 56 || question_id == 57 || question_id == 61 || question_id == 63) {
                    $("#agencyName").html(`Agency Name: <strong>${records[0].funding_agency_name}</strong>`)
                }
                if (columns.length != 0) {
                    console.log("total records: ", records[0].total_records)
                    if (records[0].total_records < 100) {
                        $("#total_records").html(`<i>${records[0].total_records} of ${records[0].total_records} records.</i>`)
                    } else {
                        $("#total_records").html(`<i>100 of ${records[0].total_records} records.</i>`)
                    }
                    
                    $("#tableHeaders").html(headerRenderer(columns))
                    for (let b = 0; b < records.length; b++) {
                        //console.log("new row ");
                        const obj = {};
                       // console.log("transaction id: ", records[b].wizard_agency_contract_total_id)

                       // let html = `<tr style ='cursor:pointer' onclick='routeToFpds("(${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}");'>`;
                        let html=''

                        if (records[b].transaction_id != 0) {
                            html = `<tr style ='cursor:pointer' onclick='routeToFpds("${category}","${records[b].transaction_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}");'>`;
                        }
                        else if (records[b].transaction_id == 0) {
                            html = `<tr style ='cursor:pointer' onclick='routeToFpds("${category}","${records[b].wizard_agency_contract_total_id}","${records[b].award_id_piid}","${records[b].parent_award_id_piid}");'>`;
                        }
                        
                        for (let a = 0; a < columns.length; a++) {
                            if (records[b].hasOwnProperty(columns[a].field)) {
                                
                                
                                obj[columns[a].field] = records[b][columns[a].field]
                                //console.log("Field # ",a , ": ", obj[columns[a].field])
                                let temp = records[b][columns[a].field];
                                if (columns[a].column_currency_field) {
                                    let budget=(temp).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    });
                                    if (columns[a].data_grid) {
                                        html = html + `<td>${budget}</td>`;
                                    }
                                    
                                    continue;
                                }
                                if (columns[a].data_grid) {
                                   // console.log(columns[a].field)
                                    if (columns[a].isLabel) {
                                        console.log(columns[a].field, " is not in datagrid")
                                    }
                                    else {
                                        html = html + `<td>${records[b][columns[a].field]}</td>`;
                                    }
                                    
                                }
                           }
                        }
                       
                        html = html+"</tr>"
                        data.push(obj)
                        $("#tableBody").append(html)
                       
                    }
                    
                }
               

            }
            else {
                console.log("No data")
                if (columns.length != 0) {

                    $("#tableHeaders").html(headerRenderer(columns))
                    $("#tableBody").html("<tr><td  style='text-align: center;'' colspan='19'>  No record. </td></tr>");
                }
            }
        },
        error: function (error) { }
    });
}

function getTableColumns(widgetData) {
    $.ajax({
        type: "POST",
        data: { widget_id: widgetData.widget_id },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/WizardWidgetColumnsList",
        success: function (result) {
            result = jQuery.parseJSON(result);

            if (result.records && result.records != 0) {
                const columns = result.records
                //console.log("columns: ", columns)
                getDataByStorePorcedure(widgetData, columns )

            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}

function fetchResult47(widgetData, columns = []) {
    $("#loader").show();
    $("#datagrid").hide();
    $("#datagrid47").show();
    paramsData = paramRenderer(widgetData);
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    columnsData = columns
    var data = []
    $.ajax({
        type: "POST",
        data: paramRenderer(widgetData),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExecuteStoreProcedureDataGrid",
        success: function (result) {
            $("#loader").hide();
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                console.log("records: ",records)
                for (let b = 0; b < records.length; b++) {
                    let temp = (records[b].base_and_all_options_total).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                    let formatted_date = records[b].action_date.split(' ')[0]
                    let html = '';
                    html = html + `<tr style ='cursor:pointer' onclick='routeToFpds("${category}","${records[b].transaction_id}","${records[b].contract_number}","${records[b].referenced_idv_id}");'>`;
                    html = html + `<td>${records[b].vendor_name}</td>`;
                    html = html + `<td>${records[b].referenced_idv_id}</td>`;
                    html = html + `<td>${records[b].contract_number}</td>`;
                    html = html + `<td>${records[b].idv_type}</td>`;
                    html = html + `<td>${records[b].award_type}</td>`;
                    html = html + `<td>${records[b].vendor_uei}</td>`;
                    html = html + `<td>${temp}</td>`;
                    html = html + `<td>${formatted_date}</td>`;
                    html = html + `<td>${records[b].transaction_id}</td>`;
                    html = html + `</tr>`
                    $("#tableBody47").append(html)
                }           
            }
            else {
                console.log("No data returned")
                $("#loader").hide();
                $("#tableBody47").html("<tr><td  style='text-align: center;'' colspan='12'>  No record. </td></tr>");
            }
        },
        error: function (error) { }
    });
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
    paramsData.display_type = 'Excel'

    $.ajax({
        type: "POST",
        data: {
            excelHeader: columnsData, excelBody: paramsData 
        },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExportToExcel",
        success: function (result) {
           
            result = jQuery.parseJSON(result);

            if (result.base64) {
                //Convert Base64 string to Byte Array.
                var bytes = Base64ToBytes(result.base64);

                //Convert Byte Array to BLOB.
                var blob = new Blob([bytes], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, "Output.xlsx");
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = $("<a />");
                    a.attr("download", "Output.xlsx");
                    a.attr("href", link);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);
                }
            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}