$(document).ready(() => {
    
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

let widgetDataForExcel;
function fetchWidgets(showAll) {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    if (question_id == 44) {
        $('#showAll').show();
    }
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
                //console.log("records: ", records)
                $("#heading").html(`<strong>${records[0].question_name}</strong>`)
                $("#sub_heading").html(`<strong>${records[0].description}</strong>`)                
                $("#description").html(`<strong>${records[0].widget_help_description}</strong>`)
                for (let a = 0; a < records.length; a++) {
                    if (records[a].page_number === 7) {
                        widgetDataForExcel = records[a];
                        getDataByStorePorcedure(records[a],showAll)
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

function routeToOpportunityPlus(category, NoticeId) {
    document.location = `/AnswerWizard/OpportunityPlus?category=${category}&NoticeId=${NoticeId}`;
}

function paramRenderer(widgetData, isExcel) {
    console.log("widgetData:", widgetData)
    const obj = { store_procedure: widgetData.store_procedure }
    const params = new URLSearchParams(window.location.search)
    let html = "";
    for (const param of params) {
            if (param[1][0] =="{") {
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

function getDataByStorePorcedure(widgetData, showAll, columns = []) {
    $("#tableBody").html("");
    $("#loader").show();
    columnsData = columns
    var data = []
    if (showAll) {
        widgetData.display_type = "All"
    }
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    $.ajax({
        type: "POST",
        data: paramRenderer(widgetData,false),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/OpportunityDataGridPage",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                $("#loader").hide();
                //console.log(records)
                $("#opportunityType").html(`Opportunity Type: <strong>${records[0].opportunity_type}</strong>`)
                $("#agencyName").html(`Agency Name: <strong>${records[0].agency_name}</strong>`)
                if (showAll) {
                    if (records[0].max_record_count < records[0].total_records) {
                        $("#total_records").html(`<i>${records[0].total_records} of ${records[0].total_records} records.</i>`)
                    } else if (records[0].total_records < records[0].max_record_count) {
                        $("#total_records").html(`<i>${records[0].max_record_count} of ${records[0].max_record_count} records.</i>`)
                    }
                }
                else {
                    if (records[0].total_records < 100) {
                        $("#total_records").html(`<i>${records[0].total_records} of ${records[0].total_records} records.</i>`)
                    } else {
                        $("#total_records").html(`<i>100 of ${records[0].total_records} records.</i>`)
                    }
                }
                    for (let b = 0; b < records.length; b++) {
                        const obj = {};
                        let html = `<tr style ='cursor:pointer;' onclick='routeToOpportunityPlus("${category}","${records[b].NoticeId}");'>`;
                        if (question_id == 44) {
                            html = html + `<td style="width:20%;">${records[b].Solicitation_Number}</td>`;
                            html = html + `<td>${records[b].title}</td>`;
                            html = html + `<td>${records[b].office_name}</td>`;
                            html = html + `<td>${records[b].PostedDate}</td>`;
                            html = html + `<td>${records[b].naicss_code}</td>`;                                       
                            html = html + `<td>${records[b].product_or_service_code}</td>`;
                        } else if (question_id == 50 || question_id == 51) {
                            $("#tableHeaders44").hide();
                            $("#opportunityType").hide();
                            $("#tableHeaders50").show();
                            html = html + `<td style="width:20%;">${records[b].Solicitation_Number}</td>`;
                            html = html + `<td>${records[b].title}</td>`;
                            html = html + `<td>${records[b].opportunity_type}</td>`;
                            html = html + `<td>${records[b].PostedDate}</td>`;
                            html = html + `<td>${records[b].naicss_code}</td>`;
                            html = html + `<td>${records[b].product_or_service_code}</td>`;
                        }
                        html = html + "</tr>"
                        data.push(obj)
                        $("#tableBody").append(html)
                       
                    }
            }
            else {
                console.log("No Data")
                $("#loader").hide();
                $("#tableBody").html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
                
            }
        },
        error: function (error) {
            console.log("Error")
        }
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
    //paramsData.display_type = 'Excel'

    $.ajax({
        type: "POST",
        data: paramRenderer(widgetDataForExcel, true),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/OpportunityDataGridPage",
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