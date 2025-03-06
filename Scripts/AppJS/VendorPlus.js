$(document).ready(() => {
    fetchDetails();
    fetchObligations();
    fetchNAICS();
    fetchSocioEconomic();
    fetchContractInventory();
   // $("#page2 a").attr("href", localStorage.getItem("answerWidgetPage2Url"));
    $("#page3 a").attr("href", localStorage.getItem("answerWidgetPage3Url"));
    $("#page4 a").attr("href", localStorage.getItem("answerWidgetPage6Url"));
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

function routeToContractInventory() {
    window.location.href = `/AnswerWizard/ContractInventory?vendor_uei=${vendorUei()}`
}

function vendorUei() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('vendor_uei');

}

function getCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');

}

function fetchDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category')
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    //debugger;
    $.ajax({
        type: "POST",
        data: { vendor_uei: vendorUei() },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusDetails",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                $("#vendor_name").html(`<strong>${records[0].LEGAL_BUSINESS_NAME}</strong>`)
                paramRenderer(records[0])
            }
            else {
                console.log("Error in fetching data from DB.")
            }
        },
        error: function (error) { }
    });
}

function fetchSocioEconomic() {
    $.ajax({
        type: "POST",
        data: { vendor_uei: vendorUei() },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusSocioEconomic",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
               // paramRenderer(records[0])
               let html=''
                for (let i = 0; i < records.length; i++) {
                    const data = records[i]
                    //console.log("NAICS data: ", data)
                    html = html + `<tr><td id="${data.socio_economic_designation}">${data.socio_economic_designation}</td></tr> `;
                }
                $("#socioRenderer").html(html)
            }
            else {
                console.log("Error in fetching data from DB.")
            }
        },
        error: function (error) { }
    });
}

function fetchNAICS() {
    $.ajax({
        type: "POST",
        data: { vendor_uei: vendorUei() },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusNAICS",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                naicsRenderer(records)
            }
            else {
                console.log("Error in fetching data from DB.")
            }
        },
        error: function (error) { }
    });
}

function fetchObligations() {
    $.ajax({
        type: "POST",
        data: { vendor_uei: vendorUei() },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusObligations",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                obligationsRenderer(records)
            }
            else {
                console.log("Error in fetching data from DB.")
            }
        },
        error: function (error) { }
    });
}

function fetchContractInventory() {
    $.ajax({
        type: "POST",
        data: { vendor_uei: vendorUei(), isExcel: false },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusContractInventoy",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                //console.log(records)
                if (records[0].total_records < 100) {
                    $("#total_records").html(`<i>${records[0].total_records} of ${records[0].total_records} records.</i>`)
                } else {
                    $("#total_records").html(`<i>100 of ${records[0].total_records} records.</i>`)
                }
                contractInventoryRenderer(records);         
            }
            else {
                $("#contractBody").html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
            }
        },
        error: function (error) { }
    });
}

function exportToCsv() {
    $.ajax({
        type: "POST",
        data: {
            vendor_uei: vendorUei(), isExcel: true
        },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/VendorPlusContractInventoy",
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

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    //var s = atob(base64.split(".")[1]);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};

function paramRenderer(widgetData) {
    for (const key in widgetData) {
        const data = widgetData[key]
        if (key == 'EXPIRATION_DATE' || key == 'INITIAL_REGISTRATION_DATE' || key == 'BUsiness_Start_date') {
            let dateString = data;
            let formattedDateString;
            if (dateString.includes("-")) {
                let date = new Date(dateString);
                formattedDateString = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).format(date);
                formattedDateString = formattedDateString.replace(/^0+(?=\d)/, '');
                //formattedDateString = month + '/' + day + '/' + year;
            }
            else {

                var year = parseInt(dateString.substring(0, 4));
                var month = parseInt(dateString.substring(4, 6));
                var day = parseInt(dateString.substring(6, 8));

                formattedDateString = month + "/" + day + "/" + year;
            }
            //     mm/dd/yy
            // Creating a new Date object using the extracted values
            //var dateObject = new Date(year, month, day);

            //// Getting month, day, and year components from the date object
            //var formattedMonth = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it's zero-based
            //var formattedDay = dateObject.getDate().toString().padStart(2, '0');
            //var formattedYear = dateObject.getFullYear().toString().slice(-2); // Getting last two digits of the year

            //// Formatting the date string as MM/DD/YY
            //var formattedDateString = formattedMonth + "/" + formattedDay + "/" + formattedYear;

            console.log(dateString);
            console.log(formattedDateString);
            $(`#${key}`).html(`${formattedDateString}`)
        }
        else {
            key == 'CORPORATE_URL' ? $(`#${key}`).html(`<a href="${data.includes('http://') ||
                data.includes('https://') ? data : 'http://' + data}" target="_blank">${data}</a>` || "") : $(`#${key}`).text(data || "")
        }
    }
}

function naicsRenderer(widgetData) {
    //console.log("NAICS Table: ", widgetData)
    let html = `<thead>

                        <tr>
                            <th style="width: 100px;">NAICS</th>
                        
                            <th style="width: 600px;">Description</th>
                       
                            <th style="width: 100px;">Small</th>
                        
                </tr></thead>
                    <tbody> `;
/*    Object.entries(widgetData).forEach(([key, value]) => {
        html = html + `<tr><td>${value}</td><td>${value}</td><td>${value}</td></tr> `;
    });*/

    //for (let [key, value] of Object.entries(widgetData)) {
    //   console.log("--",key, value);
    //   // const data = widgetData[value];
    //   // console.log("NAICS data: ", data);
    //   // html = html + `<tr><td>${data.NAICS}</td><td>${data.description}</td><td>${data.Small_For_NAICS}</td></tr> `;
    //}
    for (let i = 0; i < widgetData.length; i++) {
        const data = widgetData[i]
        //console.log("NAICS data: ", data)
        html = html + `<tr><td>${data.NAICS}</td><td>${data.description}</td><td>${data.Small_For_NAICS}</td></tr> `;

    }
    html = html + `</tbody>`;
    $(".naics_table").html(html);
}

function obligationsRenderer(widgetData) {
    //console.log("Obligations Table: ", widgetData)
    let html = `<thead>

                        <tr>
                            <th style="width: 70px;">Fiscal Year</th>
                        
                            <th style="width: 150px; text-align:end;">Action Obligations</th>

                            <th></th>
                                               
                </tr></thead>
                    <tbody> `;

    for (let i = 0; i < widgetData.length; i++) {
        const data = widgetData[i]
        let obligations = (data.action_obligation_total).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        html = html + `<tr><td>${data.fiscal_year}</td><td style="text-align:end;">${obligations}</td><td></td</tr>`;
    }
    html = html + `</tbody>`;
    $(".obligations_table").html(html);
}

function contractInventoryRenderer(contractData) {
    let html = '';
    for (let i = 0; i < contractData.length; i++) {
        const data = contractData[i]

        let temp1 = data.base_and_all_options_value;
        let temp2 = data.federal_action_obligation;
        
        let budget1 = (temp1).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        let budget2 = (temp2).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
                 
        //console.log("data: ", data)
        html = html + `<tr onclick='routeToFpds("${getCategory()}","${data.transaction_id}","${data.award_id_piid}","${data.parent_award_id_piid}");'>
                        <td>${data.award_id_piid}</td>
                        <td>${data.parent_award_id_piid}</td>
                        <td>${data.modification_number}</td>
                        <td>${data.funding_agency_name}</td>
                        <td>${data.funding_sub_agency_name}</td>
                        <td>${data.funding_office_name}</td>
                        <td>${data.naics_code}</td>
                        <td>${data.naics_description}</td>
                        <td>${data.product_or_service_code}</td>
                        <td>${data.product_or_service_code_description}</td>
                        <td>${data.type_of_set_aside}</td>
                        <td>${data.Year_Expire}</td>
                        <td>${budget1}</td>
                        <td>${budget2}</td>
                       </tr> `;
    }
    $("#contractBody").html(html);
}

function routeToFpds(category, transaction_id, award_id_piid, parent_award_id_piid) {
    document.location = `/AnswerWizard/FpdsPage?category=${category}&transaction_id=${transaction_id}&award_id_piid=${award_id_piid}&parent_award_id_piid=${parent_award_id_piid}`;
}