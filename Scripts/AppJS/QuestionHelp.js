$(document).ready(() => {
    fetchQuestionHelpData();  
})
function getPageName() {
    const url = window.location.href;
    let temp1 = url.split('/')
    let temp2 = temp1[4].split('?')
    let name = temp2[0]
    let pageName = "";
    switch (name) {
        case 'QuestionParams':
            pageName = 'Search';
            break;
        case 'QuestionDashboard':
            pageName = 'Dashboard';
            break;
        case 'DrillDown1':
            pageName = 'Drilldown';
            break;
        case 'DrillDown2':
            pageName = 'Data Grid';
            break;
        case 'FpdsPage':
            pageName = 'Fpds';
            break;
        case 'VendorPlus':
            pageName = 'Vendor';
            break;
        case 'OpportunityDataGrid':
            pageName = 'Opportunity Grid';
            break;
        case 'OpportunityPlus':
            pageName = 'Opportunity Plus';
            break;
        default:
            break;
    }
    return pageName;
}
function fetchQuestionHelpData() {
    const urlParams = new URLSearchParams(window.location.search);
    const page_name = getPageName();
    let question_id = urlParams.get('question_id');
    if (page_name == 'Search') {
        question_id = urlParams.get('id');
    }
    if (!question_id) {
        question_id = 0;
    }
    console.log("question_id: ", question_id)
    console.log("page_name: ", page_name)
    $.ajax({
        type: "POST",
        data: {  question_id, page_name },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetQuestionHelp",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
              
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + `${records[a].question_id == 0?`<p>${records[a].page_name} Page</p>`:
                 `<p>Question ${records[a].question_id} - ${records[a].page_name} Page</p>`} `;
                }
                $("#questionHelpTitle").html(html)
                html = "";
                for (let b = 0; b < records.length; b++) {
                    html = html + `<p>${records[b].description}</p>`;
                }
                $("#questionHelpDescription").html(html)
            }
            else {
                console.log("No data")
            }
        },
        error: function (error) { }
    });

}
