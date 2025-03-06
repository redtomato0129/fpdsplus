$(document).ready(() => {
    fetchWidgets();
    //$("#page2 a").attr("href", localStorage.getItem("answerWidgetPage2Url"));
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


//function rerouteToFpds(new_transaction_id) {
//    const urlParams = new URLSearchParams(window.location.search);
//    const award_id = urlParams.get('award_id_piid');
//    const parent_award_id = urlParams.get('parent_award_id_piid');
//    const category = urlParams.get('category');
//    document.location = `/AnswerWizard/FpdsPage?category=${category}&&transaction_id=${new_transaction_id}&award_id_piid=${award_id}&parent_award_id_piid=${parent_award_id}`;
//}

function fetchWidgets() {
    const urlParams = new URLSearchParams(window.location.search);
    const transaction_id = urlParams.get('transaction_id');
    const award_id_piid = urlParams.get('award_id_piid');
    const parent_award_id_piid = urlParams.get('parent_award_id_piid');
    const UEI = urlParams.get('UEI');
    const category = urlParams.get('category');
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { UEI },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/FpdsCparsData",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                paramRenderer(records[0])
                //console.log("----",records)
                CparsRenderer(records[0])
            }
            else {
                console.log("Error in fetching data from DB for 1st stored procedure.")
            }
        },
        error: function (error) { }
    });
    $.ajax({
        type: "POST",
        data: { transaction_id },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/QuestionFdpsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                paramRenderer(records[0])
            }
            else {
                console.log("Error in fetching data from DB for 2nd stored procedure.")
            }
        },
        error: function (error) { }
    });
    $.ajax({
        type: "POST",
        data: { award_id_piid, parent_award_id_piid },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ContractData",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                contractRenderer(records)
            }
            else {
                console.log("Error in fetching data from DB for 3rd stored procedure.")
            }
        },
        error: function (error) { }
    });
   
}

function contractRenderer(widgetData) {
    //console.log("Contract History: ", widgetData)
    let html = `<thead>

                        <tr>
                            <th>Mod #</th>
                        
                            <th>Date Signed</th>
                       
                            <th>Base and All Options Value</th>
                        
                            <th>Federal Action Obligation</th>
                </tr></thead>
                    <tbody> `;

    for (let i=0; i < widgetData.length; i++) {
        const data = widgetData[i]
        html = html + `<tr><td><a onclick="rerouteToFpds(${data.contract_transaction_id})"><u>${data.contract_modification_number}</u></a></td><td>${data.contract_action_date}</td><td>${data.contract_base_and_all_options_value}</td><td>${data.contract_federal_action_obligation}</td></tr> `;
        
    }
    html = html + `</tbody>`;
    $(".contract_history table").html(html);
}

function rerouteToFpds(new_transaction_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const award_id = urlParams.get('award_id_piid');
    const parent_award_id = urlParams.get('parent_award_id_piid');
    const UEI = urlParams.get('UEI');
    document.location = `/AnswerWizard/FpdsCPARSPage?category=contract&transaction_id=${new_transaction_id}&award_id_piid=${award_id}&parent_award_id_piid=${parent_award_id}&UEI=${UEI}`;
}

function paramRenderer(widgetData) {
    
    for (const key in widgetData) {
        const data = widgetData[key]
        //if (key == 'idv_type_code' || key == 'idv_type') {           
        //    $(`#${key}`).text(data || "")
        //}
        //else {
        //    $(`#${key}`).text(data || "N/A")
        //}
        $(`#${key}`).text(data || "")
    }
    if (widgetData.usaspending_permalink) {

    var linkElement = document.getElementById('flag_link');
    linkElement.href = widgetData.usaspending_permalink
    }
}

function CparsRenderer(widgetData) {
    //console.log("CparsRenderer: ", widgetData)
    let html = `<thead>
                        <tr>
							<th></th>
							<th style = "text-align: center;">Exceptional</th>
							<th style = "text-align: center;">Very Good</th>
							<th style = "text-align: center;">Satisfactory</th>
							<th style = "text-align: center;">Marginal</th>
							<th style = "text-align: center;">Unsatisfactory</th>
							<th style = "text-align: center;">N/A</th>
						</tr>

                </thead>
                <tbody class="cpars_body"> `;

    //for (let i = 0; i < widgetData.length; i++) {
        const data = widgetData
        console.log("CparsRenderer: ", data)
    html = html + `<tr><th>Quality</th><td style = "text-align: center;">${data.Quality_Rating_Exceptional}</td><td style = "text-align: center;">${data.Quality_Rating_VeryGood}</td><td style = "text-align: center;">${data.Quality_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Quality_Rating_Marginal}</td><td style = "text-align: center;">${data.Quality_Rating_UNSat}</td><td style = "text-align: center;">${data.Quality_Rating_NA}</td></tr>
                   <tr><th>Schedule</th><td style = "text-align: center;">${data.Schedule_Rating_Exceptional}</td><td style = "text-align: center;">${data.Schedule_Rating_VeryGood}</td><td style = "text-align: center;">${data.Schedule_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Schedule_Rating_Marginal}</td><td style = "text-align: center;">${data.Schedule_Rating_UNSat}</td><td style = "text-align: center;">${data.Schedule_Rating_NA}</td></tr>
                   <tr><th>Cost Control</th><td style = "text-align: center;">${data.Cost_Control_Rating_Exceptional}</td><td style = "text-align: center;">${data.Cost_Control_Rating_VeryGood}</td><td style = "text-align: center;">${data.Cost_Control_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Cost_Control_Rating_Marginal}</td><td style = "text-align: center;">${data.Cost_Control_Rating_UNSat}</td><td style = "text-align: center;">${data.Cost_Control_Rating_NA}</td></tr>
                   <tr><th>Management</th><td style = "text-align: center;">${data.Management_Rating_Exceptional}</td><td style = "text-align: center;">${data.Management_Rating_VeryGood}</td><td style = "text-align: center;">${data.Management_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Management_Rating_Marginal}</td><td style = "text-align: center;">${data.Management_Rating_UNSat}</td><td style = "text-align: center;">${data.Management_Rating_NA}</td></tr>
                   <tr><th>Small Business</th><td style = "text-align: center;">${data.Small_Business_Rating_Exceptional}</td><td style = "text-align: center;">${data.Small_Business_Rating_VeryGood}</td><td style = "text-align: center;">${data.Small_Business_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Small_Business_Rating_Marginal}</td><td style = "text-align: center;">${data.Small_Business_Rating_UNSat}</td><td style = "text-align: center;">${data.Small_Business_Rating_NA}</td></tr>
                   <tr><th>Regulatory Compliance</th><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_Exceptional}</td><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_VeryGood}</td><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_Satisfactory}</td><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_Marginal}</td><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_UNSat}</td><td style = "text-align: center;">${data.Regulatory_Compliance_Rating_NA}</td></tr>
                   `;

    //}
    html = html + `</tbody>`;
    $(".cparsData table").html(html);
}