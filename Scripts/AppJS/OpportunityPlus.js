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
    const category = urlParams.get('category');
    const NoticeId = urlParams.get('NoticeId');
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { NoticeId },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/OpportunityPlusList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                paramRenderer(records[0])
            }
            else {
                console.log("Error in fetching data from DB.")
            }
        },
        error: function (error) { }
    });
    //$.ajax({
    //    type: "POST",
    //    data: { award_id_piid, parent_award_id_piid },
    //    enctype: 'multipart/form-data',
    //    url: "/AnswerWizard/ContractData",
    //    success: function (result) {
    //        result = jQuery.parseJSON(result);
    //        if (result.records && result.records != 0) {
    //            const records = result.records;
    //            contractRenderer(records)
    //        }
    //        else {
    //            console.log("Error in fetching data from DB for 2nd stored procedure.")
    //        }
    //    },
    //    error: function (error) { }
    //});
}

//function contractRenderer(widgetData) {
//    //console.log("Contract History: ", widgetData)
//    let html = `<thead>

//                        <tr>
//                            <th>Mod #</th>
                        
//                            <th>Date Signed</th>
                       
//                            <th>Base and All Options Value</th>
                        
//                            <th>Federal Action Obligation</th>
//                </tr></thead>
//                    <tbody> `;

//    for (let i=0; i < widgetData.length; i++) {
//        const data = widgetData[i]
//        html = html + `<tr><td><a onclick="rerouteToFpds(${data.contract_transaction_id})"><u>${data.contract_modification_number}</u></a></td><td>${data.contract_action_date}</td><td>${data.contract_base_and_all_options_value}</td><td>${data.contract_federal_action_obligation}</td></tr> `;
        
//    }
//    html = html + `</tbody>`;
//    $(".contract_history table").html(html);
//}

function paramRenderer(widgetData) {
    //console.log("Data: ", widgetData)

    for (const key in widgetData) {
        const data = widgetData[key]
        $(`#${key}`).text(data || "")
    }
    var linkElement = document.getElementById('flag_link');
    linkElement.href = widgetData.Link
}