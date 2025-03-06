$(document).ready(() => {
    $("#gridSearch").show();
   fetchSearchHistory();  
})

function OnGridSearchKeyUp(event) {
    var searchKeyword = event.currentTarget.value;
    if (searchKeyword.length > 2) {

        fetchSearchHistory(searchKeyword);
    } else if (searchKeyword.length == 0) {
        fetchSearchHistory("");
    }
}

function fetchSearchHistory(search_text) {
    //$("#gridSearch").show()

    $.ajax({
        type: "POST",
        data: { search_text },
        enctype: 'multipart/form-data',
        url: "/QuestionSearchHistory/DisplaySearchHistory",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                console.log(records)
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + ` <tr id="${a}"  onclick="routeToQuestionParamsPage(${records[a].question_id}, '${records[a].category}',${records[a].question_search_result_id})" style="cursor: pointer">
                  <td>${records[a].question_id}</td> <td>${records[a].search_name}</td> <td>${records[a].question_name}</td> <td>${records[a].category}</td>
                   <td>${records[a].date_modified}</td>
                  
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

function DisplaySearchHistory() {
  //  const urlParams = new URLSearchParams(window.location.search);
    
}

function routeToQuestionParamsPage(questionId, category,historyId) {
    document.location = `/AnswerWizard/QuestionParams?id=${questionId}&&category=${category}&&searchHistory=${historyId}`;
}