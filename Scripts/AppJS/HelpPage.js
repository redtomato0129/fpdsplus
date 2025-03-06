$(document).ready(() => {
    if ($("#userDomain").text().trim() == 'rturner.net') {
        $('#noData').hide();
        fetchQuestionIds();
        fetchQuestionHelpPageData(1)
    } else {
        $("#helpPageContent").hide();
    }
})

function fetchQuestionIds() {
    $.ajax({
        type: "POST",
        data: {  },
        enctype: 'multipart/form-data',
        url: "/HelpPage/GetQuestionIds",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;

                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + `<option>${records[a].question_id} </option>`;
                }
                $("#questionId").html(html)

            }
            else {
                console.log("No data")
            }
        },
        error: function (error) { }
    });

}

function questionIdChange(selectObj) {
    // get the index of the selected option 
    var index = selectObj.selectedIndex;
    // get the value of the selected option 
    var questionId = selectObj.options[index].value;

    fetchQuestionHelpPageData(questionId)
    
}

function fetchQuestionHelpPageData(question_id) {
    $("#search_text").val('')
    $("#dashboard_text").val('')
    $("#drilldown_text").val('')
    $("#datagrid_text").val('')
    $.ajax({
        type: "POST",
        data: {  question_id },
        enctype: 'multipart/form-data',
        url: "/HelpPage/GetQuestionHelpPageData",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                for (let a = 0; a < records.length; a++) {
                    if (records[a].page_name === 'Search') {
                        $("#search_text").val(records[a].description)
                    }
                    if (records[a].page_name === 'Dashboard') {
                        $("#dashboard_text").val(records[a].description)
                    }
                    if (records[a].page_name === 'Drilldown') {
                        $("#drilldown_text").val(records[a].description)
                    }
                    if (records[a].page_name === 'Data Grid') {
                        $("#datagrid_text").val(records[a].description)
                    }
                }
               
            }
            else {
                $("#search_text").val('')
                $("#dashboard_text").val('')
                $("#drilldown_text").val('')
                $("#datagrid_text").val('')
            }
        },
        error: function (error) { }
    });  
}

function saveHelpData() {
    let question_id = $("#questionId").val()
    let search_description = $("#search_text").val()
    let dashboard_description = $("#dashboard_text").val()
    let drilldown_description = $("#drilldown_text").val()
    let datagrid_description = $("#datagrid_text").val()
    $.ajax({
        type: "POST",
        data: { question_id, search_description, dashboard_description, drilldown_description, datagrid_description },
        enctype: 'multipart/form-data',
        url: "/HelpPage/InsertQuestionHelpPageData",
        success: function (data) {
            result = jQuery.parseJSON(data);
            //if (result.records && result.records != 0) {

            //}
            //else {

            //}
            if (result.result == "Success") {
                alert("Data Saved")
                //swal({
                //    title: "Data Saved",
                //    text: "Help data is saved in database"
                //}).then(function () {
                //    window.location.reload();
                //});
            }
            else {
                alert("Data is not saved")
                //swal({
                //    title: "Data not saved",
                //    text: "Help data not saved in database.",
                //    type: "error"
                //}).then(function () {
                //    window.location.reload();
                //});
            }
        },
        error: function (error) { }
    });  
}
