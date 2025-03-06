$('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d'
});

$(document).ready(function () {
    $("#gridSearch input").attr("placeholder", "Start Typing to Search");
    $("#gridSearch").show();
    fetchCmiNews(new Date().toLocaleDateString("en-US"), new Date().toLocaleDateString("en-US"));
    fetchWebsiteList();
    document.getElementById("txtToDate").valueAsDate = new Date();
    document.getElementById("txtFromDate").valueAsDate = new Date();
});

function fetchWebsiteList() {
    $.ajax({
        type: "POST",
        data: { },
        enctype: 'multipart/form-data',
        url: "/CmiNews/CmiWebsiteList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + ` <option value='${records[a].website_url}' selectedid="0">${records[a].website_name}</option>`
                }
                $("#website1").html(html)
                $("#website2").html(html)
                $("#website3").html(html)

            }
            else {
             
            }
           
        },
        error: function (error) {
            /*$('#website1').multiselect(multiSelectConfiguration());
            $('#website2').multiselect(multiSelectConfiguration());
            $('#website3').multiselect(multiSelectConfiguration());*/
        }
    });
  
}

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

function customFilter() {
    const  fromDate = $("#txtToDate").val();
    const toDate = $("#txtFromDate").val();

    if (toDate && fromDate) {
        $("#gridSearch input").val("")
        fetchCmiNews(toDate, fromDate)
    } else {
        swal.fire({
            title: "CMI",
            text: "From Date and To Date are required",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
    }
}

function fetchCmiNews(startDate, endDate,searchText="") {
    $.ajax({
        type: "POST",
        data: { startDate, endDate, searchText },
        enctype: 'multipart/form-data',
        url: "/CmiNews/CmiList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {   
                $("#pills-home").html("")
                const data = result.records;
                    processData(data);
            }
            else {
                $("#pills-home").html(`<p class='text-center'>No CMI news is available yet!</p>`);
            }
        },
        error: function (error) { }
    });
}

function processData(data) {
    let html = ""
    for (let i = 0; i < data.length; i++)  {
        html = html+`<div class="comment__sec ">
                            <div class="item-icon item-peopleIcon"></div>
                            <div class="companyblock">
                                <div class="main_header">
                                    <div class="nameblock">

                                        <div class="text">
                                            <h2> <a href="${data[i].detail_page}" target="_blank"> ${data[i].title}</a></h2>

                                        </div>
                                    </div>
                                </div>                            
                                <ul class="cmi__details d-flex align-items-center">
                                    <li class="cmi__datetime">
                                       ${data[i].scraping_date_time}
                                    </li>
                                    <li class="cmi__source">
                                        <strong>Source: </strong>
                                        <span>${data[i].source_website}</span>
                                    </li>
                                </ul>
                                <div class="cmi__descp">
                                    <p>
                                       ${data[i].description}
                                    </p>
                                </div>
                            </div>

                            <hr>
                        </div>`
    }
   
    $("#pills-home").html(html);
}

function filterData(type) {
    switch (type) {
        case 'current':
           
            document.getElementById("txtToDate").valueAsDate = new Date();
            document.getElementById("txtFromDate").valueAsDate = new Date();
            fetchCmiNews(new Date().toLocaleDateString("en-US"), new Date().toLocaleDateString("en-US"));
            break;
        case 'week':
            document.getElementById("txtToDate").valueAsDate = new Date();
                document.getElementById("txtFromDate").valueAsDate =  getLastDays(7);
            
            fetchCmiNews(getLastDays(7).toLocaleDateString("en-US"), new Date().toLocaleDateString("en-US"));
            break;
        case 'month':
            document.getElementById("txtToDate").valueAsDate =  new Date();
            document.getElementById("txtFromDate").valueAsDate = getLastDays(30);
            fetchCmiNews(getLastDays(30).toLocaleDateString("en-US"), new Date().toLocaleDateString("en-US"));
            break;
        default:
            document.getElementById("txtToDate").valueAsDate = new Date();
            document.getElementById("txtFromDate").valueAsDate = new Date();
            fetchCmiNews(new Date().toLocaleDateString("en-US"), new Date().toLocaleDateString("en-US"));
            break;
    }

}

function getLastDays(day) {
    const today = new Date();
    const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
    return last;
}

function OnGridSearchKeyUp(event) {
    
    if (event.target.value.length >= 3) {
        searchRequest( event.target.value)
    } else {
        searchRequest( "")
    }
   
}

function searchRequest(value) {
    fetchCmiNews($("#txtFromDate").val(), $("#txtToDate").val(), value);
}

var group1Data = [];
var group2Data = [];
var group3Data = [];
var deleted1Data = [];
var deleted2Data = [];
var deleted3Data = [];

function openSearchFilter() {
    $("#website1").multiselect('destroy')
    $("#website2").multiselect('destroy')
    $("#website3").multiselect('destroy')
    group1Data = [];
    group2Data = [];
    group3Data = [];
    deleted1Data = [];
    deleted2Data = [];
    deleted3Data = [];
    $.ajax({
        type: "POST",
        data: {  },
        enctype: 'multipart/form-data',
        url: "/CmiNews/CmiClientList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const data = result.records;
                let searchPhrase1Value = ""
                let searchPhrase2Value = ""
                let searchPhrase3Value = ""
                let searchPhrase11Value = ""
                let searchPhrase22Value = ""
                let searchPhrase33Value = ""
                data.forEach((val) => {
                    if (val.group_id == 1) {
                        if (!searchPhrase1Value) {
                            searchPhrase1Value = val.search_phrase
                            searchPhrase11Value = val.search_phrase_2
                        }                     
                        $(`#website1 option[value="${val.search_url}"]`).prop("selected", "selected");
                        $(`#website1 option[value="${val.search_url}"]`).attr("selectedid", val.cmi_client_news_id);
                        group1Data.push(val);
                    }
                    if (val.group_id == 2) {
                        if (!searchPhrase2Value) {
                            searchPhrase2Value = val.search_phrase
                            searchPhrase22Value = val.search_phrase_2
                        }
                        $(`#website2 option[value="${val.search_url}"]`).prop("selected", "selected");
                        $(`#website2 option[value="${val.search_url}"]`).attr("selectedid", val.cmi_client_news_id);
                        group2Data.push(val);
                    }
                    if (val.group_id == 3) {
                        if (!searchPhrase3Value) {
                            searchPhrase3Value = val.search_phrase
                            searchPhrase33Value = val.search_phrase_2
                        }
                        $(`#website3 option[value="${val.search_url}"]`).prop("selected", "selected");
                        $(`#website3 option[value="${val.search_url}"]`).attr("selectedid", val.cmi_client_news_id);
                        group3Data.push(val);
                    }
                })
                $("#searchPhrase1").val(searchPhrase1Value)
                $("#searchPhrase2").val(searchPhrase2Value)
                $("#searchPhrase3").val(searchPhrase3Value)
                $("#searchPhrase11").val(searchPhrase11Value)
                $("#searchPhrase22").val(searchPhrase22Value)
                $("#searchPhrase33").val(searchPhrase33Value)

                $('#website1').multiselect(multiSelectConfiguration());
                $('#website2').multiselect(multiSelectConfiguration());
                $('#website3').multiselect(multiSelectConfiguration());
                $(".multiselect-selected-text").click()
            } else {
                $('#website1').multiselect(multiSelectConfiguration());
                $('#website2').multiselect(multiSelectConfiguration());
                $('#website3').multiselect(multiSelectConfiguration());
                $(".multiselect-selected-text").click()
                $("#searchPhrase1").val("")
                $("#searchPhrase2").val("")
                $("#searchPhrase3").val("")
                $("#searchPhrase11").val("")
                $("#searchPhrase22").val("")
                $("#searchPhrase33").val("")

              /*  $("#website1").multiselect('refresh')
                $("#website2").multiselect('refresh')
                $("#website3").multiselect('refresh')*/
            }
          
            $("#openFilterModal").modal('show')
        },
        error: function (error) {
            $("#openFilterModal").modal('show')
}
    });
   
    
}

const multiSelectConfiguration=()=> {
    return {
        includeSelectAllOption: true,
        allSelectedText: 'All',
        buttonWidth: '100%',
        enableFiltering: true,
        buttonText: function (options, select) {
            if (options.length == 0) {
                return 'Select Groups';
            }
            else {
                var selected = '';
                options.each(function () {
                    selected += $(this).text() + ', ';
                });
                return selected.substr(0, selected.length - 2);
            }
        },
        onChange: function (element, checked) {
            if (!checked) {
              
                if (element[0].parentNode.id === "website1") {
                    deleted1Data.push(element[0].value)
                }
                if (element[0].parentNode.id === "website2") {
                    deleted2Data.push(element[0].value)
                }
                if (element[0].parentNode.id === "website3") {
                    deleted3Data.push(element[0].value)
                }
            } else {
                if (deleted1Data.indexOf(element[0].value) > -1) {
                    deleted1Data.splice(deleted1Data.indexOf(element[0].value), 1);
                }
                if (deleted2Data.indexOf(element[0].value) > -1) {
                    deleted2Data.splice(deleted2Data.indexOf(element[0].value), 1);
                }
                if (deleted3Data.indexOf(element[0].value) > -1) {
                    deleted3Data.splice(deleted3Data.indexOf(element[0].value), 1);
                }
            }
        },
        onSelectAll: function (element,a) {
           
            if (deleted1Data.indexOf(element[0].value) > -1) {
              
                element.forEach(item => {
                    deleted1Data.splice(deleted1Data.indexOf(item[0].value), 1);
                })
            }
            if (deleted2Data.indexOf(element[0].value) > -1) {
                element.forEach(item => {
                    deleted2Data.splice(deleted2Data.indexOf(item[0].value), 1);
                })
               
            }
            if (deleted3Data.indexOf(element[0].value) > -1) {
                element.forEach(item => {
                    deleted3Data.splice(deleted3Data.indexOf(item[0].value), 1);
                })
               
            }
        },
        onDeselectAll: function (element, a) {
            if (element[0][0].parentNode.id === "website1") {
                element.forEach(item => {
                    deleted1Data.push(item[0].value)
                })
            }
            if (element[0][0].parentNode.id === "website2") {
                element.forEach(item => {
                    deleted2Data.push(item[0].value)
                })
            }
            if (element[0][0].parentNode.id === "website3") {
                element.forEach(item => {
                    deleted3Data.push(item[0].value)
                })
            }
        },
    }
}

function closeSearchFilter() {
    $("#openFilterModal").modal('hide')
}

function saveFilters() {
    const website1 = $(`#website1 option:selected`);
    const website2 = $(`#website2 option:selected`);
    const website3 = $(`#website3 option:selected`);
    let selected1 = [];
    let selected2 = [];
    let selected3 = [];
    if (website1.length != 0) {
        const searchPhrase = $("#searchPhrase1").val()
        const searchPhraseB = $("#searchPhrase11").val()
        $(website1).each(function (index, item) {
            //const url = JSON.parse($(this).val());
            const news_link = `https://www.bing.com/search?q=site:${$(this).val()}+${searchPhrase}&filters=ex1:"ez1"`
            selected1.push({ search_url: $(this).val(), search_phrase: searchPhrase, search_phrase_2: searchPhraseB, news_link, group_id: 1, cmi_client_news_id : item.attributes["selectedid"].nodeValue });
        });
    }

    if (website2.length != 0) {
        const searchPhrase = $("#searchPhrase2").val()
        const searchPhraseB = $("#searchPhrase22").val()
        $(website2).each(function (index, item) {
           // const url = JSON.parse($(this).val());
            const news_link = `https://www.bing.com/search?q=site:${$(this).val()}+${searchPhrase}&filters=ex1:"ez1"`
            selected2.push({ search_url: $(this).val(), search_phrase: searchPhrase, search_phrase_2: searchPhraseB, news_link, group_id: 2, cmi_client_news_id: item.attributes["selectedid"].nodeValue });
        });
    }


    if (website3.length != 0) {
        const searchPhrase = $("#searchPhrase3").val()
        const searchPhraseB = $("#searchPhrase33").val()
        $(website3).each(function (index, item) {
           // const url = JSON.parse($(this).val());
            const news_link = `https://www.bing.com/search?q=site:${$(this).val()}+${searchPhrase}&filters=ex1:"ez1"`
            selected3.push({ search_url: $(this).val(), search_phrase: searchPhrase, search_phrase_2: searchPhraseB, news_link, group_id: 3, cmi_client_news_id: item.attributes["selectedid"].nodeValue });
        });
    }
    const finalData = [...selected1, ...selected2, ...selected3]
    if (finalData.length != 0) {
        checkDeletedData();

        var data = "{client:" + JSON.stringify(finalData) + "}";
        var url = "/CmiNews/CmiClientAdd";
        var result = AjaxPost(url, data);
        if (result.response == "Success") {
            $("#openFilterModal").modal('hide')
            swal.fire({
                title: "News Aggregation",
                text: "Saved",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        }
    } else {
        $("#openFilterModal").modal('hide')
        swal.fire({
            title: "News Aggregation",
            text: "Saved",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
    }
   
}

function checkDeletedData() {
    const finalResult= [];
    if (deleted1Data.length != 0) {
        deleted1Data.forEach(item => {
            finalResult.push({ group_id: 1, search_url: item })
        })
    }
    if (deleted2Data.length != 0) {
        deleted2Data.forEach(item => {
            finalResult.push({ group_id: 2, search_url: item  })
        })
    }
    if (deleted3Data.length != 0) {
        deleted3Data.forEach(item => {
            finalResult.push({ group_id: 3, search_url: item   })
        })
    }

    if (finalResult.length == 0) {
        return;
    }
   
    var data = "{client:" + JSON.stringify(finalResult) + "}";
    var url = "/CmiNews/CmiClientDelete";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
       
    }

}
