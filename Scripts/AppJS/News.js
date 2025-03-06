var selectedDeal = "";
var editor = "";

$(document).ready(function () {
   
    ClassicEditor
        .create(document.querySelector('#editfull'))
        .then(res => {
            console.log(res);
            editor = res;
        })
        .catch(error => {
            console.error(error);
        });


    $('#attachDeal').click(function () {
        $('#dealsModal').modal('toggle');
    });
    $('#attachFileButton').click(function () {
        $('#filesModal').modal('toggle');
    });
    $("#txtDescFile").keyup(function (event) {
        event.currentTarget.value ? $("#saveFileButton").attr("disabled", false) : $("#saveFileButton").attr("disabled", true)
       
    });

    $('#submitPost').click(function () {
        submitPost();
    });
    $('#saveFileButton').click(function () {
        $('#filesModal').modal('toggle');
    });
    $("#FileUpload1").change(function (event) {
        var fileUpload = $("#FileUpload1").get(0);
        var file = fileUpload.files[0];
        //const objectURL = URL.createObjectURL(file);
        if (file) {
            $("#preivewText").css('display', 'block')
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {

                const link = document.getElementById('downloadFile');
                link.download = file.name;
                link.setAttribute('href', reader.result)
            };
        } else {
            $("#preivewText").css('display', 'none')
        }


    })
   
    


    /* $('#closeDealModal').click(function () {
        
         $('#dealsModal').modal('close');
     });*/

    /* $('#dealsInput').click(function () {
         getDealsList();
     });*/



    $("#dealsInput").autocomplete({
        source: function (request, response) {
            const dataArray = [];
            var url = "/CrmDeals/DealsListTitle";
            const pageNo = 1;
            var data = "{'pageNo': '" + pageNo + "','keyword': '" + request.term + "'}";
            var result = AjaxPost(url, data);
            var data = result.records;

            var len = data.length;
            if (len > 0) {
                console.log(data)
                $.each(data, function (i, item) {
                    dataArray.push({ label: item.Deal_Title, value: JSON.stringify(item) })
                });
                response(dataArray);
            }
        },
        minLength: 3,
        select: function (event, ui) {
            const value = JSON.parse(ui.item.value)
            $('#dealsInput').val(value.Deal_Title);
            ui.item.value = value.Deal_Title
            selectedDeal = value;
            $('#selectDealButton').prop("disabled", false)

        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const checkDealId = urlParams.get('dealId');
    if (checkDealId) {
        fetchDealById(checkDealId);
        fetchNewsList(checkDealId);
        $('#attachDeal').hide();
    } else {
        fetchNewsList();
    }
});


function fetchDealById(checkDealId) {
   const url = "/CrmDeals/DealsById";

    const data = "{'dealId': '" + checkDealId + "'}";
    var result = AjaxPost(url, data);
    var response = result.deal

    if (response) {
        selectedDeal = response;
        onSelectDeal()
    }
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
                <div class="col-6 history-tl-container pl-0" style="margin:0 !important;">
                   
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
                   <div class="col-6 bottom-footer main_content">
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
function fetchComments(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/News/GetRecentComments",
        data: "{'newsId': " + parseInt(id) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            commentsRenderer(result,id)
          


        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });
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



    }

    filldata = filldata + `<textarea name="comment-section" id="user-comments_${id}" class="comments_textarea" placeholder="Write a comment" onkeyup="commentTextArea(${id}, event)" cols="30" rows="1" newsId="${id}"></textarea>
                            <div class="buttons my-2 text-right"> <button class="btn comnt" id="comment_save_button_${id}" onclick="addComment(${id})" disabled="true">Save </button> </div>`;


    $("#wrapper_" + id).html(filldata)
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

function commentTextArea(id, event) {
    if (event.currentTarget.value) {
        $("#comment_save_button_" + id).prop("disabled", false)
        $("#comment_save_button_" + id).attr("disabled", false)
    } else {
        $("#comment_save_button_" + id).prop("disabled", true)
        $("#comment_save_button_" + id).attr("disabled", true)
    }

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

function submitPost() {
    const AddNotes = {
        "section_type": " ",
        "news_post": editor.getData(),
        "created_datetime": "!",
        "deal_id": selectedDeal.Deal_ID,
        "people_id": null,
        "activity_id": null
    };

    var data = "{News:" + JSON.stringify(AddNotes) + "}";
    var url = "/News/NewsAdd";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
        editor.setData('');
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.get('dealId') ?"": $("#dealsListHidden").hide()
        urlParams.get('dealId') ? fetchNewsList(urlParams.get('dealId')) : fetchNewsList() 
            swal.fire({
                title: "News",
                text: "News added",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        

        //$('#errregemail').hide();
    }
    else {
        swal.fire({
            title: "News",
            text: "Something went wrong",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }
}

function documentUpload(event) {
    const target = event.target
    if (target.files && target.files[0]) {
        const file = target.files[0];
        var sizeInMb = file.size / 1024;
        var sizeLimit = 1024 * 50;
        if (sizeInMb < sizeLimit) {
            // Here you can ask your users to load correct file

        } else {
            target.value = ''
            swal.fire({
                title: "News",
                text: "Max Size Limit is 50mb",
                type: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }

}
function addDocuments(newsId) {
    const uploadDocumentFormdata = new FormData();
    if (window.FormData !== undefined) {
        var note = $('#txtDescFile').val()

        var fileUpload = $("#FileUpload1").get(0);
        var file = fileUpload.files[0];
        var n = file.name.lastIndexOf(".");
        const name = `${file.name.substring(0, n)}_${Date.now()}${file.name.substring(n)}`;

        const myNewFile = new File([file], name, { type: file.type });
        uploadDocumentFormdata.append('file', myNewFile);
            uploadDocumentFormdata.append('news_id', newsId);
            uploadDocumentFormdata.append('note', note);

            $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                cache: false,
                data: uploadDocumentFormdata,
                enctype: 'multipart/form-data',
                url: "/News/AddDocument",
                success: function (result) {
                    result = jQuery.parseJSON(result);
                    if (result.response == "Success") {
                        $("#preivewText").hide();
                       /* swal({
                            title: "File",
                            text: "File added",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 3000,
                        });*/
                        $("#FileUpload1").val('');
                        $('#txtDescFile').val('');
                        fetchNewsList();
                    }
                    else if (result.response == "Failed") {
                      
                        swal
                            (
                                {
                                    title: "File",
                                    text: "File added Failed",
                                    type: "error",
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    timer: 3000,
                                }
                            );

                    }
                },
                error: function (error) { }

            });
    }
}
function fetchNewsList(id = "") {
    $('#newsList').html("")
    const payload = id ? "{'dealId': " + parseInt(id) + "}" : "{'count':5}";
    const url = id ? "/News/GetNewsByDealId" : "/News/GetRecentNews";
       
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url,
        data: payload ,
        dataType: "json",
        async: false,
        success: function (result) {
          
            var filldata = "";
            if (result.length > 0) {
                
                var NewsList = result;
                var len = NewsList.length;
                const isFileUpload = $("#FileUpload1").get(0).files;
               
                if ( isFileUpload.length) {
                  
                    addDocuments(NewsList[0].news_id);
                } 
                for (var i = 0; i < len; i++) {

                    
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
  


    const title = item.title ? `  <h2 onclick="fetchNewsList(${item.deal_id})" style="cursor:pointer">${item.title}</h2> ` : '';
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
                            </div>  </div>` : ''}

                           
                            <div class="likebtn">
                                <img src="/Content/assets/images/new-like.png" width="25">
                                <div class="text">
                                    <h4>564</h4>
                                </div>
                            </div>
                            <div class="text-right toggle"  id="total_comments_${item.news_id}" comments-count="${item.total_comments}"> ${item.total_comments} Comments</div>
                        </div>
                        <hr>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-9 pd0">
                                  <!-- <div class="comentico">
                                    <img src="icon-like.png" width="18" height="18">    <div class="text">
                                    <h4><a href="">Like</a></h4>
                                </div>
                            </div> -->
                            
                                </div>
                                
                            </div>
                                <div class="col-12">
                        <div class="wrapper" id="wrapper_${item.news_id}" style="display:block">
                        ${item.total_comments > 1 ? `<div class="more-comments" > <span onclick="fetchAllComments(${item.news_id})" id="more-${item.news_id}">View more comments</span> </div >` : ''}
                         ${ item.total_comments >= 1 ?
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
          ${ item.total_comments >= 1 ?  `<div id="reply_section_${item.comments[0].comment_id}" style="display:none">
                            <textarea name="reply-section" id="user-reply_${item.comments[0].comment_id}" class="comments_textarea" placeholder="Write a reply" 
                                    onkeyup="replyTextArea(${item.comments[0].comment_id}, event)" cols="30" rows="1" commentsId="${item.comments[0].comment_id}"></textarea>
                                <div class="buttons my-2 text-right"> <button class="btn comnt" id="reply_save_button_${item.comments[0].comment_id}" onclick="addReply(${item.comments[0].comment_id},${item.comments[0].news_id})" disabled="true">Save </button> </div>
                            </div>` :''}
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

function replyTextArea(id, event) {
    if (event.currentTarget.value) {
        $("#reply_save_button_" + id).prop("disabled", false)
        $("#reply_save_button_" + id).attr("disabled", false)
    } else {
        $("#reply_save_button_" + id).prop("disabled", true)
        $("#reply_save_button_" + id).attr("disabled", true)
    }

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

function closeDealModal() {
    $('#dealsModal').modal('hide');
}

function closeFileModal() {
    $('#filesModal').modal('hide');
}


function onSelectDeal() {
    $('#dealsModal').modal('hide');


    var Deal_ID = selectedDeal.Deal_ID;
    /* var Created_Date = formatDate(selectedDeal.created_datetime);*/ // new Date(selectedDeal.created_datetime).toLocaleDateString("en-US") ;
    var title = selectedDeal.Deal_Title;
    var SolicitationNumber = selectedDeal.Deal_SolicitationNumber;
    var sam_gov_link = selectedDeal.Deal_sam_gov_link;
    var description = selectedDeal.Description;
    var status = selectedDeal.Deal_Status;
    var rfp_release_date = formatDate(selectedDeal.Deal_RFP_Release_Date); //new Date(selectedDeal.Deal_RFP_Release_Date).toLocaleDateString("en-US") ;
    var stage = selectedDeal.Deal_Stage;
    var funding_agency_code = selectedDeal.Deal_Funding_Agency_code;
    var funding_agency_name = selectedDeal.Deal_Funding_Agency_Name;
    var funding_sub_agency_code = selectedDeal.Deal_funding_sub_agency_code;
    var funding_sub_agency_name = selectedDeal.Deal_funding_sub_agency_name;
    var awarding_agency_code = selectedDeal.Deal_awarding_agency_code;
    var awarding_agency_name = selectedDeal.Deal_awarding_agency_code;
    var award_type = selectedDeal.Deal_Award_Type;
    var set_aside = selectedDeal.Deal_Set_Aside;
    var set_aside_description = selectedDeal.set_aside_description;
    var naics = selectedDeal.Deal_naics_code;

    var naics_description = selectedDeal.Deal_naics_code;
    var psc_code = selectedDeal.Deal_PSC_code;
    var psc_description = selectedDeal.Deal_PSC_Description;
    var incumbent_name = selectedDeal.Deal_Incumbent_Name;
    var incumbent_uei = selectedDeal.incumbent_uei;
    //var potential_award_amount = new String(selectedDeal.Deal_Potential_Award_Amount).toLocaleString('en-US', { maximumFractionDigits: 2 });
    var potential_award_amount = numberWithCommas(selectedDeal.Deal_Potential_Award_Amount);
    //var expiration_date = formatDate(selectedDeal.Deal_Expiration_Date); //new Date(selectedDeal.Deal_Expiration_Date).toLocaleDateString("en-US");
    var govwin_id = selectedDeal.Deal_Govwin_ID;

    var govwin_link = selectedDeal.Deal_govwin_link;
    var priority = selectedDeal.Deal_Priority;
    var user_id = selectedDeal.user_id;

    var user_domain = selectedDeal.user_domain;


    let color = getColor(stage);

    const filldata =
        '<tr >' +
        /*  '<td style="background-color: ' + color + '">' +*/

        '<a class="fas fa-edit text-centre" target="_blank" href="/CrmDeals/AddDeal?dealId=' + Deal_ID + '" > ' +
        '</a>' +

        '</td > ' +
        /*  '<td> ' + Deal_ID + '</td > ' +*/
        /*'<td> ' + Created_Date + '</td > ' +*/
        '<td style="font-family: ;white-space: break-spaces;"> ' + title + '</td > ' +
        /*'<td style="font-family: " FontAwesome";" > ' + description + '</td>' +*/
        '<td style="font-family: " FontAwesome";" > ' + rfp_release_date + '</td>' +
        '<td  style="font-family: " FontAwesome";" > ' + status + '</td > ' +
        /*'<td style="font-family: " FontAwesome";" > ' + stage + '</td > ' +*/
        '<td style="font-family: ;white-space: break-spaces;"> ' + funding_sub_agency_name + '</td>' +
        /*'<td  style = "font-family: "FontAwesome";" > ' + award_type + '</td>' +*/
        '<td style = "font-family: " FontAwesome";" > ' + set_aside + '</td>' +
        '<td style="font-family: " FontAwesome";" > ' + naics + '</td>' +
        '<td style="font-family: " FontAwesome";" > ' + psc_code + '</td>' +
        '<td style="font-family: ;white-space: break-spaces;"> ' + incumbent_name + '</td>' +
        '<td align="right" style="font-family: " FontAwesome";" > ' + '$' + potential_award_amount.toLocaleString('en') + '</td>' +
       /* '<td style="font-family: " FontAwesome";"  > ' + expiration_date + '</td>' +*/
        /* '<td style="none: " FontAwesome";" > ' + SolicitationNumber + '</td>' +*/

        '<td style="none: " FontAwesome";" > ' + priority + '</td>'
    '</tr > '
    $('#deallisttable').html(filldata);
    $("#dealsListHidden").show();
    $("#submitPost").attr("disabled", false)
    $("#submitPost").prop("disabled", false)
    fetchNewsList(Deal_ID)
}

function getColor(stage) {
    if (stage == "Identify") {
        return '#add8e6';
    } else if (stage == "Qualify") {
        return '#c74747';
    } else if (stage == "Pursued") {
        return 'blueviolet';
    } else if (stage == "Capture") {
        return 'orange';
    } else if (stage == "Bid") {
        return '#f984ef';
    }
    return '';
}

function numberWithCommas(x) {
    var parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function formatDate(d) {
    if (d) {
        let date = new Date(d);

        const day = date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        return (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear().toString().substr(-2);
    }
    return "";
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
