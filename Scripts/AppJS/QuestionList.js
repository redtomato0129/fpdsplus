$(document).ready(() => {
    fetchQuestionList();  
  clearLocalStorage()
})
function clearLocalStorage() {
    localStorage.setItem('answerWidgetPage2Url', document.location.href);
    localStorage.removeItem("answerWidgetPage3Url");
    localStorage.removeItem("answerWidgetPage6Url");
    localStorage.removeItem("answerWidgetPage3Fields");
}

function OnGridSearchKeyUp(event) {
    var searchKeyword = event.currentTarget.value;
    if (searchKeyword.length > 2) {

        fetchQuestionList(searchKeyword);
    } else if (searchKeyword.length == 0) {
        fetchQuestionList("");
    }
}

function createPayload(searchText) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('category');
    const instance = window.location.origin.includes('dev') ? 'Dev' : 'Prod';
    let data = {};
    switch (myParam) {
        case 'agency':
            $("#categoryQuestion").html('<a href="">Agency Question List</a>')
            data = { agency: 1, contract: 0, opportunity: 0, vendor: 0, search_text: searchText, instance, hdr:0 }
            break;
        case 'contract':
            $("#categoryQuestion").html('<a href="">Contract Question List</a>')
            data = { agency: 0, contract: 1, opportunity: 0, vendor: 0, search_text: searchText, instance, hdr: document.location.pathname.indexOf('QuestionView')!=-1?0:1 }
            break;
        case 'opportunity':
            $("#categoryQuestion").html('<a href="">Opportunity Question List</a>')
            data = { agency: 0, contract: 0, opportunity: 1, vendor: 0, search_text: searchText, instance, hdr: 0 }
            break;
        case 'vendor':
            $("#categoryQuestion").html('<a href="">Vendor Question List</a>')
            data = { agency: 0, contract: 0, opportunity: 0, vendor: 1, search_text: searchText, instance, hdr: 0 }
            break;
        default:
            $("#categoryQuestion").html('<a href="">Agency</a>')
            data = { agency: 1, contract: 0, opportunity: 0, vendor: 0, search_text: searchText, instance, hdr: 0 }
            break;
    }
    return data;
}
function fetchQuestionList(searchText="") {
    $("#gridSearch").show()
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "POST",
        data: { ...createPayload(searchText) },
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/QuestionList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + ` <tr id="${a}"  onclick="routeToQuestionParamsPage(${records[a].question_id}, '${urlParams.get('category')}')" style="cursor: pointer"><td>${records[a].question_id}</td> <td>${records[a].question_name}</td> <td>${records[a].description}</td>
                  <!--  <td class="text-center">
                        <div class="d-flex  border-0">
                            <i class="fa-solid fa-eye mr-2"  style="color: #571C7A;" onclick="routeToQuestionParamsPage(${records[a].question_id}, '${urlParams.get('category') }')"></i>
                        </div>
                    </td> -->

                     </tr>`;
                }
                $("#questionlisttable").html(html)
               
            }
            else {
                $('#questionlisttable').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
            }
        },
        error: function (error) { }
    });

}


function routeToQuestionParamsPage(questionId,category) {
    document.location = `/AnswerWizard/QuestionParams?id=${questionId}&&category=${category}`;
}