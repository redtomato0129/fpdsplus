$(document).ready(function () {
  
    fetchRecentDeals();
    fetchRecentActivityList();
    fecthRecentPeopleList();
    fetchRecentNewsList();


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

function fetchRecentActivityList() {

    const payload = "{'count': 5}";
    const url = "/CrmDashboard/RecentActivitiesList";
    const result = AjaxPost(url, payload);
    const data = result.records;
    ;
    const len = data.length;
    let filldata = "";
    if (len > 0) {
        ;
        for (let i = 0; i < len; i++) {
            let Activity_ID = data[i].Activity_ID;
            const Activity_name = data[i].Activity_name;
            const Created_Date = formatDate(data[i].created_datetime);
            const Description = data[i].Description;
            const Type = data[i].Type;
            const Title = data[i].title;
            const User_ID = data[i].User_ID;
            const Deal_ID = data[i].Deal_ID;
            filldata = filldata +
                `<tr style="cursor:pointer" onclick="routeToDeals(${Deal_ID},${Activity_ID},'${ data[i].mode }' )">` +
                '</td > ' +
                '<td style="white-space: nowrap;"> ' + Title + '</td > ' +
               /* '<td style="font-family: ;white-space: break-spaces;" > ' + Created_Date + '</td>' +*/
                '<td  style="font-family: " FontAwesome";" > ' + Type + '</td > ' +
                '<td style="font-family:  ;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 270px;"> ' + Description + '</td>' +
               /* '<td style = "white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 270px;" > ' + Type + '</td>'+*/


            '</tr>'
        }
        $('#activityList').html(filldata);

    }
    else {
        $('#activityList').html("<tr><td style='text-align: center;'' colspan='5'>  No records.  </td></tr>");

    }
}
function routeToDeals(id,assetId,mode) {
   
    window.open(assetId && mode ? `/CrmDeals/Index?activity=${id}&&assetId=${assetId}&&mode=${mode}` :
        `/CrmDeals/Index?activity=${id}`, "_blank")
}

function routeToDealsFromActivity(id) {
    window.open('/CrmDeals/Index?activity=' + id, "_blank")
}

function routeToPeople(id) {
    window.open('/CrmPeople/Index?organizationId=' + id, "_blank")
}

function routeToNews(id) {
    window.open('/News/index?dealId=' + id, "_blank")
}
function fecthRecentPeopleList() {
    const payload = "{'count': 5}";
    const url = "/CrmDashboard/GetRecentOrganizationList";
    let result = AjaxPost(url, payload);
    if (result && result.records.length > 0) {
        var len = result.records.length;
        let filldata = "";
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                filldata = filldata + organizationListRenderer(result.records[i])
            }
            $("#organizationList").html(filldata)
        } else {
            $('#organizationList').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
        }
    } else {
        $('#organizationList').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
    }
}

function organizationListRenderer(data) {
     /*<td>${data.city}</td>
                            <td>${data.state}</td>*/
    return `
  <tr onclick="routeToPeople(${data.organization_id})">                      <td>${data.name}</td>
                            <td>${data.phone}</td>
                            <td>${data.email_address}</td>
                           
                        </tr>`
}


function fetchRecentNewsList() {
    $('#newsList').html("")
    const payload =  "{'count':5}";
    const url =  "/News/GetRecentNews";

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url,
        data: payload,
        dataType: "json",
        async: false,
        success: function (result) {

            let filldata = "";
            if (result.length > 0) {

                const NewsList = result;
                const len = NewsList.length;
                for (var i = 0; i < len; i++) {

                    const created_datetime = result[i].created_datetime;
                    const note = result[i].note;
                    const User_Email = result[i].User_Email;
                    filldata = filldata +
                        innerHtmlNewsList(result[i])
                }


                $('#newsList').html(filldata);
                clickEvents()
            }
            else {



            }



        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });

}

function innerHtmlNewsList(item) {

    if (item.rfp_release_date) {
        const date = new Date(item.rfp_release_date);
        item.rfp_release_date =
            ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

    }



    const title = item.title ? `  <h2  style="cursor:pointer" onclick="routeToNews(${item.deal_id})">${item.title}</h2> ` : '';
    const dealStatus = item.status ? ` &nbsp;&nbsp; | &nbsp; <h2> ${item.status}</h2>` : '';
    item.rfp_release_date = item.rfp_release_date ? `&nbsp;&nbsp; | &nbsp;   <h2> ${item.rfp_release_date}</h2>` : '';
    return `
                    <div class="companyblock" style="margin-top:20px !important">
                        <div class="main_header">
                            <div class="nameblock">
                                
                                <div class="text">
                                    <h2>${item.firstName} ${item.lastName}</h2>
                                    <h4>${item.created_datetime}</h4>
                                </div>
                            </div>
 <div class="nameblock" style ="float:right">

                                        <div class="text d-flex align-items-center" >
                                          ${title}
                                          ${dealStatus}
                                          ${item.rfp_release_date}  
                                        </div>
                                    </div>
                                      

                        </div>
                        <div class="centerblock">
                            ${item.news_post}
                        </div>
                        <hr>
                        <div class="likeblock">
                           
                            <div class="text-right toggle" id="total_comments_${item.news_id}" comments-count="${item.total_comments}"> ${item.total_comments} Comments</div>
                        </div>
                        <hr>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-9 pd0">
                                
                            <div class="comentico">
                                <img src="/Content/assets/images/icon-comment.png" width="18" height="17">
                                <div class="text">
                                    <h4><button class="btn comnt-load" id="comment_button_${item.news_id}"  news_id="${item.news_id}">Comments</button></h4>
                                    </div>
                            </div>
                            ${item.total_attachments ? ` <div class="comentico">
                                <img src="/Content/assets/images/clip.png" width="17" height="18">
                                <div class="text">
                                <h4><button class="btn attachment-load"  id="attachment_button_${item.news_id}"  news_id="${item.news_id}">View attachment</button></h4>
                            </div>` : `<div class="comentico"></div>`}
                           
                            </div>
                                </div>
                                
                            </div>
                                <div class="col-12">
                          <div class="wrapper" id="wrapper_${item.news_id}" style="display:block">
                        ${item.total_comments > 1 ? `<div class="more-comments" > <span onclick="fetchAllComments(${item.news_id})" id="more-${item.news_id}">View more comments</span> </div >` : ''}
                         ${item.total_comments >= 1 ?
            `<div class="comment__list">
                                <div class="main_header">
                                    <div class="nameblock">
                                        <div class="text">
                                            <h2>${item.comments[0].firstName} ${item.comments[0].lastName}</h2>
                                            <h4>${item.comments[0].created_datetime}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="centerblock">
                                    <p>${item.comments[0].comment}</p>
                                </div>
                            </div>
                            <div class="reply-link"> <span id="reply_comment_${item.comments[0].comment_id}" onclick="onCommentReplyClick(${item.comments[0].comment_id} )">Reply</span> </div>
                           
                                ${replyRenderer(item.comments[0].reply)}
                                `
            : ''}
          ${item.total_comments >= 1 ? `<div id="reply_section_${item.comments[0].comment_id}" style="display:none">
                            <textarea name="reply-section" id="user-reply_${item.comments[0].comment_id}" class="comments_textarea" placeholder="Write a reply" 
                                    onkeyup="replyTextArea(${item.comments[0].comment_id}, event)" cols="30" rows="1" commentsId="${item.comments[0].comment_id}"></textarea>
                                <div class="buttons my-2 text-right"> <button class="btn comnt" id="reply_save_button_${item.comments[0].comment_id}" onclick="addReply(${item.comments[0].comment_id},${item.comments[0].news_id})" disabled="true">Save </button> </div>
                            </div>` : ''}
                            <div id="comment_section_${item.news_id}">
                                <textarea name="comment-section" id="user-comments_${item.news_id}" class="comments_textarea" placeholder="Write a comment" onkeyup="commentTextArea(${item.news_id}, event)" cols="30" rows="1" newsId="${item.news_id}"></textarea>
                                <div class="buttons my-2 text-right"> <button class="btn comnt" id="comment_save_button_${item.news_id}" onclick="addComment(${item.news_id})" disabled="true">Save </button> </div>
                            </div>

                        </div>
                        <div class="attachments-show" id="attachment_${item.news_id}">

                        </div>
                    </div>
                        </div>
                    </div>
                `
}

function clickEvents() {
    $(".comnt-load").click(function () {
        const id = $(this).attr("news_id");
        $("#wrapper_" + id).toggle();
        $("#attachment_" + id).hide();
        fetchComments(id);
    });
    $(".attachment-load").click(function () {

        /*  if ($(".attachments-show").is(":visible") && !$(".wrapper").is(":visible")) {
              $(".attachments-show").hide();
          } else {
              $(".attachments-show").show();
          }*/
        const id = $(this).attr("news_id");
        $("#attachment_" + id).toggle();
        $("#wrapper_" + id).hide();
        fetchDocuments(id);

    });
}

function replyTextArea(id, event) {
    if (event.currentTarget.value) {
        $("#reply_save_button_" + id).prop("disabled", false)
        $("#reply_save_button_" + id).attr("disabled", false)
    } else {
        $("#reply_save_button_" + id).prop("disabled", true)
        $("#reply_save_button_" + id).attr("disabled", true)
    }

}

function fetchAllComments(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/News/GetComments",
        data: "{'newsId': " + parseInt(id) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            commentsRenderer(result, id)



        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });
}

function fetchComments(id) {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/News/GetRecentComments",
        data: "{'newsId': " + parseInt(id) + "}",
        dataType: "json",
        async: false,
        success: function (result) {

            commentsRenderer(result, id)


        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });
}

function commentsRenderer(result, id) {
    var filldata = "";

    if (result.length > 0) {

        var NewsList = result;

        var len = NewsList.length;
        if (NewsList[0].total_comment) {
            const viewMore = NewsList[0].total_comment > 1 ? `<div class="more-comments" id="more-${id}"> <span onclick="fetchAllComments(${id})">View more comments</span> </div>` : '';
            filldata = filldata + viewMore
        }

        for (var i = 0; i < len; i++) {
            filldata = filldata + `<div class="comment__list">
                                <div class="main_header">
                                    <div class="nameblock"> 
                                        <div class="text">
                                            <h2>${NewsList[i].firstName} ${NewsList[i].lastName}</h2>
                                            <h4>${NewsList[i].created_datetime}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="centerblock">
                                    <p>${NewsList[i].comment}</p>
                                </div>
                            </div> 
                             <div class="reply-link"> <span id="reply_comment_${NewsList[i].comment_id}" onclick="onCommentReplyClick(${NewsList[i].comment_id})">Reply</span> </div>
                                ${replyRenderer(NewsList[i].reply)}
                            <div id="reply_section_${NewsList[i].comment_id}" style="display:none">
                                <textarea name="reply-section" id="user-reply_${NewsList[i].comment_id}" class="comments_textarea" placeholder="Write a reply" 
                                        onkeyup="replyTextArea(${NewsList[i].comment_id}, event)" cols="30" rows="1" commentsId="${NewsList[i].comment_id}"></textarea>
                                    <div class="buttons my-2 text-right"> <button class="btn comnt" id="reply_save_button_${NewsList[i].comment_id}" onclick="addReply(${NewsList[i].comment_id}, ${NewsList[i].news_id})" disabled="true">Save </button> </div>
                            </div>
`
        }




        filldata = filldata + `<textarea name="comment-section" id="user-comments_${id}" class="comments_textarea" placeholder="Write a comment" onkeyup="commentTextArea(${id}, event)" cols="30" rows="1" newsId="${id}"></textarea>
                            <div class="buttons my-2 text-right"> <button class="btn comnt" id="comment_save_button_${id}" onclick="addComment(${id})" disabled="true">Save </button> </div>`;


        $("#wrapper_" + id).html(filldata)
    }
}

function replyRenderer(obj) {
    let fillData = "";
    for (let i = 0; i < obj.length; i++) {
        fillData = fillData + `<div class="comment__list nested_comnt_list">
                          <div class="main_header">
                              <div class="nameblock"> 
                                  <div class="text">
                                      <h2>${obj[i].firstName} ${obj[i].lastName}</h2>
                                      <h4>${obj[i].created_datetime}</h4>
                                  </div>
                              </div>
                          </div>
                          <div class="centerblock">
                              <p>${obj[i].reply}</p>
                          </div>
                      </div> 
                      <div class="reply-link"> <span id="reply_comment_${obj[i].comment_id}" onclick="onCommentReplyClick(${obj[i].comment_id})">Reply</span> </div>`
    }
    return fillData
}

function onCommentReplyClick(commentId) {

    $(`#reply_section_${commentId}`).show()


}

function addReply(id, newsId) {
    const AddReply = {
        "comment_id": id,
        "reply": $(`#user-reply_${id}`).val(),
    };

    var data = "{reply:" + JSON.stringify(AddReply) + "}";
    var url = "/News/AddCommentReply";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {

        swal.fire({
            title: "Reply",
            text: "Reply added",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
       
        if ($(`#more-${newsId}`).length) {
            fetchComments(newsId)
        }
        else {
            fetchAllComments(newsId);
        }
        //$('#errregemail').hide();
    }
    else {
        swal.fire({
            title: "Reply",
            text: "Something went wrong",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }

}

function fetchDocuments(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/News/GetDocuments",
        data: "{'newsId': " + parseInt(id) + "}",
        dataType: "json",
        async: false,
        success: function (result) {

            var filldata = "";
            if (result.length > 0) {

                var NewsList = result;
                var len = NewsList.length;
                for (var i = 0; i < len; i++) {
                    filldata = filldata + `
        
            <div class="row">
                <div class="col-10 history-tl-container pl-0" style="margin:0 !important;">
                   
                    <ul id="files" class="tl"  style="margin:0 !important;">
                        <li class="tl-item" style="padding-bottom: 0px !important;">
                            <div class="iconFile"></div>
<div class="item-title getfile">${result[i].file_name}</div><div class="item-detail">${result[i].document_datetime}&nbsp;&nbsp;&nbsp;
${result[i].email}
</div>
<div class="item-title box4"> ${result[i].note}</div>
</li>
</ul>

                </div>
                   <div class="col-2 bottom-footer main_content">
<span class="right-footer-btn-sec  buttons ">
<a id="downloadAddedFile"  class="btn btn-success" role="button" style="float:right" onclick="downloadAddedFile('${result[i].file_name}')" >Download</a>
</span>
                    </div>

                </div>

            </div>`
                }

                $("#attachment_" + id).html(filldata)

            }
            else {



            }



        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });


}

function commentTextArea(id, event) {
    if (event.currentTarget.value) {
        $("#comment_save_button_" + id).prop("disabled", false)
        $("#comment_save_button_" + id).attr("disabled", false)
    } else {
        $("#comment_save_button_" + id).prop("disabled", true)
        $("#comment_save_button_" + id).attr("disabled", true)
    }

}

function fetchRecentDeals() {
    const url = "/CrmDashboard/DealsList";
    const payload = "{'count': 5}";
    const result = AjaxPost(url, payload);
    const len = result.records.length;

    let filldata = "";
    if (len > 0) {
        const data = result.records;
        for (let i = 0; i < len; i++) {
            const Deal_ID = data[i].Deal_ID;
            /* const Created_Date = formatDate(data[i].created_datetime);*/ // new Date(data[i].created_datetime).toLocaleDateString("en-US") ;
            const title = data[i].Deal_Title;
            const SolicitationNumber = data[i].Deal_SolicitationNumber;
            const sam_gov_link = data[i].Deal_sam_gov_link;
            const description = data[i].Description;
            const status = data[i].Deal_Status;
            const rfp_release_date = formatDate(data[i].Deal_RFP_Release_Date); //new Date(data[i].Deal_RFP_Release_Date).toLocaleDateString("en-US") ;
            const stage = data[i].Deal_Stage;
            const funding_agency_code = data[i].Deal_Funding_Agency_code;
            const funding_agency_name = data[i].Deal_Funding_Agency_Name;
            const funding_sub_agency_code = data[i].Deal_funding_sub_agency_code;
            const funding_sub_agency_name = data[i].Deal_funding_sub_agency_name;
            const awarding_agency_code = data[i].Deal_awarding_agency_code;
            const awarding_agency_name = data[i].Deal_awarding_agency_code;
            const award_type = data[i].Deal_Award_Type;
            const set_aside = data[i].Deal_Set_Aside;
            const set_aside_description = data[i].set_aside_description;
            const naics = data[i].Deal_naics_code;

            const naics_description = data[i].Deal_naics_code;
            const psc_code = data[i].Deal_PSC_code;
            const psc_description = data[i].Deal_PSC_Description;
            const incumbent_name = data[i].Deal_Incumbent_Name;
            const incumbent_uei = data[i].incumbent_uei;
            //const potential_award_amount = new String(data[i].Deal_Potential_Award_Amount).toLocaleString('en-US', { maximumFractionDigits: 2 });
          
            const expiration_date = formatDate(data[i].Deal_Expiration_Date); //new Date(data[i].Deal_Expiration_Date).toLocaleDateString("en-US");
            const govwin_id = data[i].Deal_Govwin_ID;

            const govwin_link = data[i].Deal_govwin_link;
            const priority = data[i].Deal_Priority;
            const user_id = data[i].user_id;

            const user_domain = data[i].user_domain;


            let color = '';
            if (stage == "Identify") {
                color = '#add8e6';
            } else if (stage == "Qualify") {
                color = '#c74747';
            } else if (stage == "Pursued") {
                color = 'blueviolet';
            } else if (stage == "Capture") {
                color = 'orange';
            } else if (stage == "Bid") {
                color = '#f984ef';
            }

            filldata = filldata +
                '<tr id="' + Deal_ID + '" onclick="routeToDeals(' + Deal_ID +')">' +
                '<td style="font-family: ;white-space: break-spaces;"> ' + title + '</td > ' +
                '<td style="font-family: " FontAwesome";" > ' +  status + '</td>' +
                '<td  style="font-family: " FontAwesome";" > ' + priority + '</td > ' +
               
                '<td style="font-family: " FontAwesome";"  > ' + stage + '</td>' +
                '<td style="none: " FontAwesome";" > ' + rfp_release_date + '</td>' +
               
            '</tr > '
        }
        $('#dealsList').html(filldata);
      

    }
    else {
        $('#dealsList').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");

    }
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

function downloadAddedFile(filename) {

    $.ajax({
        type: "GET",
        url: "/News/DownloadFile?filename=" + filename,
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

function formatDate(d) {
    if (d) {
        let date = new Date(d);

        const day = date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        return (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear().toString().substr(-2);
    }
    return "";
}

function addComment(id) {
    const AddComment = {
        "news_id": id,
        "comment": $(`#user-comments_${id}`).val(),
    };

    var data = "{comment:" + JSON.stringify(AddComment) + "}";
    var url = "/News/AddComment";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
        const totalComments = parseInt($(`#total_comments_${id}`).attr("comments-count")) + 1;
        $(`#total_comments_${id}`).html(`${totalComments} Comments`);
        swal.fire({
            title: "Comment",
            text: "Comment added",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        fetchComments(id);
        //$('#errregemail').hide();
    }
    else {
        swal.fire({
            title: "Comment",
            text: "Something went wrong",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }

}