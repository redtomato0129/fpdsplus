$(document).ready(function () {
    ;


    $("#routeActivityAddButton").click(function () {
        document.location = "/CrmDeals/Index";
    });
    if (window.location.href.indexOf('CrmActivities/Index') != -1) {
        $("#gridSearch").show();
    }


    GetActivities("", 1);


});

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

function routeToDeals(id, assetId,mode) {
    window.open(`/CrmDeals/Index?activity=${id}&&assetId=${assetId}&&mode=${mode}`, "_blank")
}

function GetActivities(searchtext, pageNo) {
     $('#pagingUL').twbsPagination('destroy');
    if (pageNo == undefined) {
        pageNo = 1;
    }
    var userid = parseInt(document.getElementById("userId").innerHTML, 10);

    var data = "{'userid': '" + userid + "','pageNo': '" + pageNo + "','keyword': '" + searchtext + "'}";
    var url = "/CrmActivities/ActivitiesList";
    var result = AjaxPost(url, data);
    var data = result.records;
    ;
    var len = data.length;
    var filldata = "";
    if (len > 0) {
        ;
        for (var i = 0; i < len; i++) {
            var Activity_ID = data[i].Activity_ID;
            /*var Created_Date = formatDate(data[i].created_datetime);*/ // new Date(data[i].created_datetime).toLocaleDateString("en-US") ;
            var Activity_name = data[i].Activity_name;
            var Created_Date = formatDateActivity(data[i].created_datetime);
            var Description = data[i].Description;
            var Type = data[i].Type;
            var Title = data[i].title;
            var User_ID = data[i].User_ID;
            var Deal_ID = data[i].Deal_ID;


            filldata = filldata +
                `<tr style="cursor:pointer" onclick="routeToDeals(${Deal_ID},${Activity_ID},'${data[i].mode}' )">` +
                '</td > ' +

                '<td> ' + Title + '</td > ' +

                '<td style="font-family: ;white-space: break-spaces;" > ' + Created_Date + '</td>' +

                '<td  style="font-family: " FontAwesome";" > ' + Activity_name + '</td > ' +

                '<td style="font-family:  ;white-space: break-spaces;"> ' + Description + '</td>' +



                '<td style = "font-family: " FontAwesome";" > ' + Type + '</td>'


            '</tr>'
        }
        $('#activitylisttable').html(filldata);

        GeneratePaging(searchtext, result.pagesCount, pageNo);

    }
    else {
        $('#activitylisttable').html("<tr><td style='text-align: center;'' colspan='5'>  No records.  </td></tr>");

    }

  
    function GeneratePaging(searchKeyword, pagesCount, currentPage) {
        $('#pagingUL').twbsPagination({
            totalPages: pagesCount,
            startPage: currentPage ,
            visiblePages: 10,
            initiateStartPageClick: false,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page) {
                //fetch content and render here
                GetActivities(searchKeyword, page)
            }
        });
        /*var html = "";
        if (currentPage == 1) {
            html += '<li class="page-item disabled"> <a class="page-link" href="#" tabindex="-1"> Previous</a> </li > ';
        }
        else {
            html += '<li class="page-item"  onclick=GetActivities("' + searchKeyword + '",' + (currentPage - 1) + ')> <a class="page-link" href = "#" tabindex = "-1"> Previous</a> </li> ';
        }

        for (var i = 0; i < pagesCount; i++) {
            var pageNo = i + 1;
            if (currentPage == pageNo) {
                html += ' <li class="page-item active"><a class="page-link" href="#">' + pageNo + '</a></li>'
            }
            else {
                html += ' <li onclick=GetActivities("' + searchKeyword + '",' + pageNo + ') class="page-item"><a class="page-link" href="#">' + pageNo + '</a></li>'
            }

        }

        if (currentPage == pagesCount) {
            html += '<li class="page-item disabled" > <a class="page-link" href = "#" > Next</a ></li> ';
        }
        else {
            html += '<li class="page-item" onclick=GetActivities("' + searchKeyword + '"",' + (currentPage + 1) + ')> <a class="page-link" href = "#" > Next</a ></li>';
        }

        $("#pagingUL").html(html)*/
    }
}

function formatDateActivity(d) {
    if (d) {
        let date = new Date(d);

        const day = date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        return (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear().toString().substr(-2);
    }
    return "";
}



//$('#menu-button').click(function (e) {
//    e.stopPropagation();
//    $('#hide-menu').toggleClass('show-menu');
//});

function OnGridSearchKeyUp(event) {
   /* if (event.keyCode === 13) {
        var searchKeyword = event.currentTarget.value;
        GetActivities(searchKeyword, 1);
    }*/
    var searchKeyword = event.currentTarget.value;
    if (searchKeyword.length > 2) {

        GetActivities(searchKeyword, 1);
    } else if (searchKeyword.length == 0) {
        GetActivities("", 1);
    }
}



