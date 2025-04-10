var selectedPeople = "";
var isCheckModeClicked = false;
$(document).ready(function () {

    $("#peopleSearchInput").autocomplete({
        source: function (request, response) {
            const dataArray = [];
            var url = "/CrmPeople/SearchPeople";
            const pageNo = 1;
            var data = "{'keyword': '" + request.term + "'}";
            var result = AjaxPost(url, data);
            var data = result;

            var len = data.length;
            if (len > 0) {
                console.log(data)
                $.each(data, function (i, item) {
                    dataArray.push({ label: item.contact_name, value: JSON.stringify(item) })
                });
                response(dataArray);
            }
        },
        minLength: 3,
        select: function (event, ui) {
            const value = JSON.parse(ui.item.value)
            $('#peopleSearchInput').val(value.peopl_id);
            ui.item.value = value.contact_name
            selectedPeople = value;
            $('#selectDealButton').prop("disabled", false)

        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
    $(".popper").one('mousemove', function () {
        var messageId = this.id;
        console.log(messageId);
        $("#" + messageId).popover({
            placement: 'bottom',
            container: 'body',
            trigger: 'hover',
            html: true,
            content: function () {
                return $('.popper-content-1').html();
            }
        }).popover('show');
    });

  
    $('#deallisttable').on('click', 'td.dt-control', function (evt) {
  

        var openedActivities = $(this).hasClass("shown");

        openNotes();
        var dealId = $(this).attr("dealid");
        /*    $(".container").load("AddActivities.html");*/

        $('.activities').remove();
        /*$('#Divactivity').children().addClass('activities');*/

        var html = '<tr dealId=' + dealId + ' class ="activities"><td colspan = 20><div>' + $('#Divactivity').html() + '</div></td></tr>';

        if (openedActivities) {
            $('.Apploader').show();
            $(this).removeClass("shown");
            $(this).closest('tr').siblings().show();
            $('.Apploader').hide();

  
        }
        else {
            $('.Apploader').show();

            $(this).addClass("shown");
            $(this).closest('tr').siblings().hide();
            $(this).closest('tr').after(html);
            $(".recent-heading-title-notes").show();
            $(".recent-heading-title-email").hide();
            $(".recent-heading-title-file").hide();
            $(".recent-heading-title-call").hide();
            BindActivitiesControlsCall();
            BindActivitiesControlsNotes();
            BindActivitiesControlsEmail();
            BindActivitiesControlsDocument();
            BindFilePreview();

            LoadRecentNotes(dealId);
            LoadRecentCalls(dealId);
            LoadRecentEmail(dealId);
            LoadRecentDocument(dealId);
            $('.Apploader').hide();



        }
    

    });

    GetDeals();
    $('.auth-wrapper').addClass('deals');
    if (window.location.href.indexOf('CrmDeals/Index') != -1 || window.location.href.indexOf('CrmCommercialDeal/Index') != -1) {
        $("#gridSearch").show();
    }

    $('#AddDeal').click(function () {
        var AddDeals = {};
        AddDeals = {
            Deal_Title: $('#txtdealtitle').val(),
            Deal_Status: $('#DDdealsstatus option:selected').text(),
            Deal_Funding_Agency_code: $('# ').val(),
            Deal_Funding_Agency_Name: $('#txtDealFundingAgencyCode').val(),
            Deal_naics_code: $('#txtDealNAICS').val(),
            Deal_naics_description: $('#txtDealNAICSDescription').val(),
            Deal_Incumbent_UEI: $('#txtDealIncumbentUEI').val(),
            Deal_Incumbent_Name: $('#txtDealIncumbentName').val(),
            Deal_Govwin_ID: $('#txtDealGovwinID').val(),
            Deal_govwin_link: $('#txtDealGovwinLink').val(),
            Deal_SolicitationNumber: $('#txtDealSolicitationNumber').val(),
            Deal_Stage: $('#DDdealsstage').val(),
            Deal_Awarding_Agency_code: $('#txtDealAwardingAgencycode option:selected').text(),
            Deal_Awarding_Agency_name: $('#txtDealAwardingAgencycode').val(),
            Deal_funding_sub_agency_code: $('#txtDealFundingSubAgencyCode').val(),
            Deal_funding_sub_agency_name: $('#txtDealFundingSubAgencyCode').val(),
            Deal_Award_Type: $('#DDAwardType').val(),
            Deal_PSC_code: $('#txtDealPSC').val(),
            Deal_PSC_Description: $('#txtDealPSCDescription').val(),
            Deal_Potential_Award_Amount: $('#txtDealPotentialAwardAmount').val(),
            Deal_Priority: $('#txtDealPriority').val(),
            Deal_SamGov_Link: $('#txtDealSamGovLink').val(),
            Deal_RFP_Release_Date: $('#txtDealDueDate').val(),
            DDAwardType: $('#DDAwardType option:selected').text(),
            Deal_Set_Aside: $('#DDSetAside option:selected').text(),
            Deal_Set_Aside_Description: $('#txSetAsideDescription').val(),
            Deal_Expiration_Date: $('#dateexpiry').val(),
            user_id: $('#userid').val(),
            user_domain: $('#user_domain').val(),

            Description: $('#txtDescription').val(),
        }

        if (AddDeals.Deal_Title != "") {
            var data = "{AddDeals:" + JSON.stringify(AddDeals) + "}";
            var url = "/CrmDeals/DealsAdd";

            var result = AjaxPost(url, data);
            if (result.response == "Success") {
                //alert(' Please check your email and verify your account ');
                $('.Verification').show();
                $('.Register').hide();
                $('.plan-sec').hide();
                $('.auth-wrapper').removeClass('register');
                swal.fire({
                    title: "Deal",
                    text: "Deal added",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                //$('#errregemail').hide();
            }
            else if (result.response == "fail") {
                swal.fire({
                    title: "Deal",
                    text: "The Deal you have entered is already registered. Please try another",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                //$('#errregemail').show();

            }
            else {
                swal.fire(result);
            }
        }
        else {
            swal.fire("", "Title (*) field is mandatory", "warning");
            //$('#errregmandatory').show();
        }

    });

    $('#go').click(function () {
        var origin = window.location.origin;
        window.location.href = origin;
    });

    $("#routeDealButton").click(function () {
        document.location = "/CrmDeals/AddDeal";
    });
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

function BindActivitiesControlsCall() {
    $('#AddCall').click(function () {
        ;
        var dealId = $(".activities").attr("dealId");
        var AddCall = {
            Date: $('#datePickertxt').val(),
            Organization: $('#txtOrganization').val(),
            Contact: $('#txtContact').val(),
            CallDescription: $('#txtCallDescription').val(),
            Deal_ID: dealId,
            Activity_call_ID: $("#callsId").val() ? $("#callsId").val() : ''
        }
        if (AddCall.Date !== "" && AddCall.Organization !== "" && AddCall.Contact !== "" && AddCall.CallDescription !== "") {
            var data = "{Call:" + JSON.stringify(AddCall) + "}";
            var url = "/CrmActivities/CallsAdd";
            var result = AjaxPost(url, data);
            if (result.response == "Success") {
                //alert(' Please check your email and verify your account ');
                swal.fire({
                    title: "Activity",
                    text: "Call saved",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                $("#txtOrganization").val('');
                $('#txtContact').val('');
                $('#txtCallDescription').val('');
                $('#datePickertxt').val('');
                $("#callsId").val('')
                LoadRecentCalls(dealId);

            }
            else if (result.response == "fail") {
                swal.fire({
                    title: "Activity",
                    text: "Failed adding Calls",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
               

            }

            else {
                swal.fire(result);
            }
        }
        else {
            swal.fire({
                type: 'error',
                title: 'Activity',
                buttons: true,
                text: "All fields are mandatory to fill",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        }
        activityClickEvents()
        // commented by Awais
   /*     $('.box').click(function () {
            debugger
            var currentNameNote = $("#txtNotes").val();
            $("#txtNotes").val(currentNameNote + $(this).text());
        });

        $('.box2').click(function () {
            var currentNameCall = $("#txtCallDescription").val();
            $("#txtCallDescription").val(currentNameCall + $(this).text());
        });
        $('.box3').click(function () {
            ;
            var currentNameEmail = $("#txtEmailDescription").val();
            $("#txtEmailDescription").val(currentNameEmail + $(this).text());
        });
        $('.box4').click(function () {
            ;
            var currentNameFile = $("#txtDescFile").val();
            $("#txtDescFile").val(currentNameFile + $(this).text());
        });*/

    });



}
function BindActivitiesControlsNotes() {

    $('#AddNotes').click(function () {
        ;
        var dealId = $(".activities").attr("dealId");
        var AddNotes = {
            NoteDescription: $('#txtNotes').val(),
            Deal_ID: dealId,
            activity_note_id: $("#notesId").val() ? $("#notesId").val() : ''
        }
        if (AddNotes.NoteDescription !== "") {
            var data = "{Notes:" + JSON.stringify(AddNotes) + "}";
            var url = "/CrmActivities/NotesAdd";
            var result = AjaxPost(url, data);
            if (result.response == "Success") {
                //alert(' Please check your email and verify your account ');
                swal.fire({
                    title: "Activity",
                    text: "Notes saved",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                $('#notesId').val('');
                $('#txtNotes').val('');
                LoadRecentNotes(dealId);

            }
            else if (result.response == "fail") {
                swal.fire({
                    title: "Activity",
                    text: "The Notes you have entered does not registered. Please try another",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                //$('#errregemail').show();

            }
            else {
                swal.fire(result);
            }
        }
        else {
            swal.fire({
                type: 'error',
                title: 'Activity',
                buttons: true,
                text: "Notes Cannot be Empty",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })

        }
        activityClickEvents()
        // commented by Awais
      /*  $('.box').click(function () {
          
            var currentNameNote = $("#txtNotes").val();
            $("#txtNotes").val(currentNameNote + $(this).text());
        });

        $('.box2').click(function () {
            var currentNameCall = $("#txtCallDescription").val();
            $("#txtCallDescription").val(currentNameCall + $(this).text());
        });
        $('.box3').click(function () {
            ;
            var currentNameEmail = $("#txtEmailDescription").val();
            $("#txtEmailDescription").val(currentNameEmail + $(this).text());
        });
        $('.box4').click(function () {
            ;
            var currentNameFile = $("#txtDescFile").val();
            $("#txtDescFile").val(currentNameFile + $(this).text());
        });*/

    });

}

function BindActivitiesControlsEmail() {

    $('#AddEmail').click(function () {
        ;
        var dealId = $(".activities").attr("dealId");
        var AddEmail = {
            contact_emailed: $('#txtNameEmail').val(),
            body: $('#txtEmailDescription').val(),
            email_address: $('#txtEMailAddress').val(),
            activity_email_id: $("#emailsId").val() ? $("#emailsId").val() : '',
            email_datetime: $('#email_datetime').val(),

            subject: $('#txtSubjectEmail').val(),


            Deal_ID: dealId
        }
        if (AddEmail.contact_emailed !== "" && AddEmail.body !== "" && AddEmail.email_address !== "" && AddEmail.email_datetime !== "" && AddEmail.subject !== "" ) {
            var data = "{Email:" + JSON.stringify(AddEmail) + "}";
            var url = "/CrmActivities/EmailAdd";
            var result = AjaxPost(url, data);
            if (result.response == "Success") {
                //alert(' Please check your email and verify your account ');
                swal.fire({
                    title: "Activity",
                    text: "Email saved",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                $("#emailsId").val('');
                $('#txtNameEmail').val('');
                $('#txtEMailAddress').val('');
                $('#txtSubjectEmail').val('');
                $('#txtEmailDescription').val('');
                $('#email_datetime').val('')
                LoadRecentEmail(dealId);
            }
            else if (result.response == "fail") {
                swal.fire({
                    title: "Activity",
                    text: "Failed to add Email",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })


            }
            else {
                swal.fire(result);
            }
        }
        else {
            swal.fire({
                type: 'error',
                title: 'Activity',
                buttons: true,
                text: "All fields are mandatory to fill",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        }
        activityClickEvents()
        // Commented by Awais
      /*  $('.box').click(function () {
          
            var currentNameNote = $("#txtNotes").val();
            $("#txtNotes").val(currentNameNote + $(this).text());
        });

        $('.box2').click(function () {
            var currentNameCall = $("#txtCallDescription").val();
            $("#txtCallDescription").val(currentNameCall + $(this).text());
        });
        $('.box3').click(function () {
            ;
            var currentNameEmail = $("#txtEmailDescription").val();
            $("#txtEmailDescription").val(currentNameEmail + $(this).text());
        });
        $('.box4').click(function () {
            ;
            var currentNameFile = $("#txtDescFile").val();
            $("#txtDescFile").val(currentNameFile + $(this).text());
        });*/

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
                title: "Actvity",
                text: "Max Size Limit is 50mb",
                type: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }
   
}


function BindActivitiesControlsDocument() {
    $('#btnUpload').click(function () {
        var dealId = $(".activities").attr("dealId");
        ;
        // Checking whether FormData is available in browser  
        var data = new FormData();
        if (window.FormData !== undefined) {
            var note = $('#txtDescFile').val()

            if (!$("#documentsId").val()) {
                var fileUpload = $("#FileUpload1").get(0);
                var file = fileUpload.files[0];
                if (!file || !note) {
                    swal.fire({
                        title: "Activity",
                        text: "All fields are mandatory",
                        type: "error",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    return
                }
                var n = file.name.lastIndexOf(".");
                const name = `${file.name.substring(0, n)}_${Date.now()}${file.name.substring(n)}`;

                const myNewFile = new File([file], name, { type: file.type });
                data.append('file', myNewFile);
            }
            
            data.append('Deal_ID', dealId);
            data.append('note', note);
            if ($("#documentsId").val()) {
                data.append('activity_document_id', $("#documentsId").val());
            }
           

            $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                cache: false,
                data: data,
                enctype: 'multipart/form-data',
                url: !$("#documentsId").val() ? "/CrmActivities/ProcessRequest" : "/CrmActivities/ProcessRequestUpdate",
                success: function (result)
                {
                        activityClickEvents()
                    result = jQuery.parseJSON(result);
                    if (result.response == "Success")
                    {
                           
                        swal.fire({
                            title: "Activity",
                            text: "File saved",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        $("#FileUpload1").val('');
                        $('#txtDescFile').val('');
                        $("#preivewText").css('display', 'none')
                        LoadRecentDocument(dealId);
                    }
                    else if (result.response == "Failed")
                    {
                           
                        swal.fire
                        (
                            {
                            title: "Activity",
                            text: "File added Failed",
                            type: "error",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 3000,
                            }
                        );
                          
                    }
                },
                error: function (error) {  }

            });
            
      
          

            // Looping over all files and add it to FormData object  


        }
        activityClickEvents()
        // commented by Awais
        /*$('.box').click(function () {
           
            var currentNameNote = $("#txtNotes").val();
            $("#txtNotes").val(currentNameNote + $(this).text());
        });

        $('.box2').click(function () {
            var currentNameCall = $("#txtCallDescription").val();
            $("#txtCallDescription").val(currentNameCall + $(this).text());
        });
        $('.box3').click(function () {
            ;
            var currentNameEmail = $("#txtEmailDescription").val();
            $("#txtEmailDescription").val(currentNameEmail + $(this).text());
        });
        $('.box4').click(function () {
            ;
            var currentNameFile = $("#txtDescFile").val();
            $("#txtDescFile").val(currentNameFile + $(this).text());
        });*/

    }

    );
}

function BindFilePreview() {
    ;
    $('#btnUploadPreview').click(function () {

        DownloadFile();
    });
}

function DownloadFile(filename) {
    $.ajax({
        type: "GET",
        url: "/CrmActivities/DownloadFile?filename=" + filename,
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
};
function Base64ToBytes(base64) {
    var s = window.atob(base64);
    //var s = atob(base64.split(".")[1]);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};


var RecentNotesList;
function LoadRecentNotes(dealId) {
    $('#notes').html("");
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmActivities/GetRecentNotes",
        data: "{'dealId': '" + dealId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            ;
            var filldata = "";
            if (result.length > 0) {
                ;
                 RecentNotesList = result;
                var len = RecentNotesList.length;
                for (var i = 0; i < len; i++) {

                    var created_datetime = result[i].created_datetime;
                    var note = result[i].note;
                    var User_Email = result[i].User_Email;


                    filldata = filldata +
                        '<li class="tl-item box" id="note_' + result[i].activity_note_id + '" note="' + result[i].activity_note_id +'" style="white-space: inherit !important"><div class="iconNotes"></div> <div class="msg_content"><div class="item-detail">' + created_datetime + '&nbsp' + '&nbsp' + '&nbsp' + User_Email + '</div>' +
                        '<div id="noteclick" class="item-title msg_content " style="white-space: break-spaces;">' + note + '</div>'
                    '</div>'
                    '</li>'


                }


                $('#notes').html(filldata);
                checkMode()
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


function checkMode() {
    if (isCheckModeClicked) {
        return
    }
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const assetId = urlParams.get('assetId');
    if (mode == 'Note') {
        //document.getElementById("btnNotes").click();
        $(document).ready(function () {
            $(`#note_${assetId}`).click()
            isCheckModeClicked =true
        })
      
    }
    else if (mode == 'Call') {
        document.getElementById("btnCalls").click()
        $(document).ready(function () {
            $(`#call_${assetId}`).click()
            isCheckModeClicked = true
        })
    }
    else if (mode == 'Email') {
        document.getElementById("btnEmails").click()
        $(document).ready(function () {
            $(`#email_${assetId}`).click()
            isCheckModeClicked = true
        })
    }
    else if (mode == 'Document') {
        document.getElementById("btnDocuments").click()
        $(document).ready(function () {
            $(`#document_${assetId}`).click()
            isCheckModeClicked = true
        })
    }
}

var RecentCallsList;

function LoadRecentCalls(dealId) {
    
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmActivities/GetRecentCalls",
        data: "{'dealId': '" + dealId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            ;
            var filldata = "";
            if (result.length > 0) {
                ;
                RecentCallsList = result;
                if (result.length > 0) {
                    var len = RecentCallsList.length;
                    for (var i = 0; i < len; i++) {

                        var Organization_called = result[i].organization_called;
                        var Call_date = result[i].call_date;
                        var User_Email = result[i].User_Email;
                        var note = result[i].note;
                        var callId = result[i].activity_call_id;
                        filldata = filldata + '<li class="tl-item box2"  id="call_' + callId +'" call="'+callId+'"  style="white-space: inherit !important"> <div class="ico"></div> <div class="item-detail"> Organization:' + '&nbsp' + Organization_called + '</div> ' +
                            '<div class="item-title ">' + Call_date + '&nbsp' + ' &nbsp' + ' &nbsp' + User_Email + '</div>' +
                            '<div class="item-title " style="white-space: break-spaces;">' + note + '</div>'
                        '</li>'


                        //filldata = filldata +
                        //    '<li class="tl-item" <div class=" item-detail">' + created_datetime + '&nbsp' + '&nbsp' + '&nbsp' + User_Email + '</div>' +
                        //    '<div class="item-title msg_content">' + note + '</div>'
                        //'</div>'
                        //'</li>'

                    }


                    $('#calls').html(filldata);
                    checkMode()
                }
                else {
                    /*swal("", "No record Found !", "success");*/

                }



            }
        },
        error: function ajaxError(err) {
            swal.fire("", err);

        }
    });
}

var RecentEmailList;
function LoadRecentEmail(dealId) {
    
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmActivities/GetRecentEmail",
        data: "{'dealId': '" + dealId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var filldata = "";
            if (result.length > 0) {
                ;
                RecentEmailList = result;
                if (result.length > 0) {
                    var len = RecentEmailList.length;
                    for (var i = 0; i < len; i++) {

                        var email_datetime = result[i].email_datetime;
                        var contact_emailed = result[i].contact_emailed;
                        var User_Email = result[i].User_Email;
                        var body = result[i].body;
                        var subject = result[i].subject;
                        var id = result[i].activity_email_id;

                        filldata = filldata + '<li class="tl-item box3" style="white-space: inherit !important" id="email_' + id +'" email="'+id+'"><div class="iconEmail"></div> <div class="msg_content"><div class="item-title">' + subject + '</div>' +
                            '<div class="item-detail">' + email_datetime + '&nbsp' + '&nbsp' + '&nbsp' + User_Email + '</div>' +
                            '<div class="item-title " style="white-space: break-spaces;">' + body + '</div>'
                        '</div>'
                        '</li>'


                    }
                    $('#emails').html(filldata);
                    checkMode()
                }
                else {
                    /*swal("", "No record Found !", "success");*/

                }



            }
        },
        error: function ajaxError(err) {
            swal.fire("", err);

        }
    });
}

var RecentDocumentList = [];
function LoadRecentDocument(dealId) {
    RecentDocumentList = []
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmActivities/GetRecentDocument",
        data: "{'dealId': '" + dealId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var filldata = "";
            if (result.length > 0) {
                ;
                 RecentDocumentList = result;
                if (result.length > 0) {
                    var len = RecentDocumentList.length;
                    for (var i = 0; i < len; i++) {

                        var document_datetime = result[i].document_datetime;
                        var note = result[i].note;
                        var file_name = result[i].file_name;
                        var User_Email = result[i].User_Email;
                        var fielId = result[i].activity_document_id;


                        filldata = filldata + '<li class="tl-item box4" id="document_' + fielId + '" document="' + fielId + '" ><div class="iconFile"></div> <div class="item-title getfile" style="display: inline"><a href="#">' + file_name + '</a></div>' +
                            '<div class="item-detail">' + document_datetime + '&nbsp' + '&nbsp' + '&nbsp' + User_Email + '</div>' +
                            '<div class="item-title " >' + note + '</div>'

                        '</li>'


                    }
                    $('#files').html(filldata);
                    checkMode()
                }

            }
            else {
                /*swal("", "No record Found !", "success");*/

            }

            activityClickEvents();

        },
        error: function ajaxError(err) {
            swal.fire("", err);

        }
    });
}

function activityClickEvents() {

    $("#addNoteButton").click(function () {
        $("#txtNotes").val("");
        $("#notesId").val("");
        $("#AddNotes").prop('disabled', false)
        $("#addNoteButton").css('visibility', 'hidden')
        $("#txtNotes").attr("disabled", false);

    })
    $("#addCallButton").click(function () {
        $("#datePickertxt").val("").attr("disabled", false);
        $("#txtOrganization").val("").attr("disabled", false);
        $("#txtOrganization").val("").attr("disabled", false);
        $("#txtContact").val("").attr("disabled", false);
        $("#txtCallDescription").val("").attr("disabled", false);
        $("#AddCall").prop('disabled', false)
        $("#callsId").val("");
        $("#addCallButton").css('visibility', 'hidden')

    })

    $("#AddEmailButton").click(function () {
        $("#emailsId").val("");
        $("#email_datetime").val("").attr("disabled", false);
        $("#txtNameEmail").val("").attr("disabled", false);
        $("#txtEMailAddress").val("").attr("disabled", false);
        $("#txtSubjectEmail").val("").attr("disabled", false);
        $("#txtEmailDescription").val("").attr("disabled", false);
        $("#AddEmail").prop('disabled', false)
        $("#AddEmailButton").css('visibility', 'hidden')

    })

    $("#btnUploadButton").click(function () {
        $("#txtDescFile").val("");
        $(".error_file_size").show();
        $("#txtDescFile").val("").attr("disabled", false);
        $("#btnUpload").prop('disabled', false)
        $("#btnUploadButton").css('visibility', 'hidden')
        $("#FileUpload1").val('').attr("disabled", false);
        const file = document.getElementById('FileUpload1');
        let changeEvent = new Event('change');
        file.dispatchEvent(changeEvent);
        $("#fileInput").show();
        $("#showDownloadLink").hide();

    })

    $('.box').click(function () {
     
        let noteObject = "";
        for (let a in RecentNotesList) {
            const id =parseInt($(`#${this.id}`).attr('note'))
         
            if (RecentNotesList[a].activity_note_id === id) {
                noteObject = RecentNotesList[a];
                break;
            }
        }
       
        $("#txtNotes").val("" + noteObject.note);
        $("#notesId").val(noteObject.activity_note_id)
      //  $("#txtNotes").attr("disabled", true);

       // $("#AddNotes").prop('disabled', true)
        $("#addNoteButton").css('visibility', 'visible')
    });

    $('.box2').click(function () {
        let callObject = '';
        for (let a in RecentCallsList) {
            const id =  parseInt($(`#${this.id}`).attr('call'))
            if (RecentCallsList[a].activity_call_id === id) {
                callObject = RecentCallsList[a];
                break;
            }
        }
        $("#callsId").val(callObject.activity_call_id)
        $("#txtOrganization").val(callObject.organization_called).attr("disabled", false);
        $("#txtContact").val(callObject.organization_contact).attr("disabled", false);
        $("#txtCallDescription").val(callObject.note).attr("disabled", false);
        var callDate = new Date(callObject.call_date);
        $("#datePickertxt").val(callDate.toISOString().substr(0, 10)).attr("disabled", false);
        $("#AddCall").prop('disabled', false);
        $("#addCallButton").css('visibility', 'visible')
    });
    $('.box3').click(function () {

        let emailObject = '';
        for (let a in RecentEmailList) {
            const id = parseInt($(`#${this.id}`).attr('email'))
            if (RecentEmailList[a].activity_email_id === id) {
                emailObject = RecentEmailList[a];
                break;
            }
        }
        var emailDate = new Date(emailObject.email_datetime);
        $("#email_datetime").val(emailDate.toISOString().substr(0, 10)).attr("disabled", false);;
        $("#emailsId").val(emailObject.activity_email_id)
        $("#txtEmailDescription").val(emailObject.body).attr("disabled", false);
        $("#txtNameEmail").val(emailObject.contact_emailed).attr("disabled", false);
        $("#txtEMailAddress").val(emailObject.email_address).attr("disabled", false);
        $("#txtSubjectEmail").val(emailObject.subject).attr("disabled", false);
        $("#AddEmail").prop('disabled', false)
        $("#AddEmailButton").css('visibility', 'visible')
    });
    $('.box4').click(function () {

        let fileObject = '';
        for (let a in RecentDocumentList) {
            const id = parseInt($(`#${this.id}`).attr('document'))
            if (RecentDocumentList[a].activity_document_id === id) {
                fileObject = RecentDocumentList[a];
                break;
            }
        }
        
        $("#documentsId").val(fileObject.activity_document_id)
        $(".error_file_size").hide();
     
        $("#txtDescFile").val(fileObject.note).attr("disabled", false);
        $("#FileUpload1").val('');
        const file = document.getElementById('FileUpload1');
        let changeEvent = new Event('change');
        file.dispatchEvent(changeEvent);
        $("#btnUpload").prop('disabled', false);
        $("#btnUploadButton").css('visibility', 'visible')
        $("#fileInput").hide();
        $("#showDownloadLink").show();
        $("#showDownloadLink a").attr("onclick", "DownloadFile('" + fileObject.file_name + "')");


    });

    $('.getfile').click(function (event) {
        ;
        $("#filenametxt").text('');
        event.preventDefault();
        var text = jQuery(this).text();
        DownloadFile(text);
        /* var currentNameFileValue = $("#filenametxt").val();*/
        $("#filenametxt").append(text + $(this).val());

        /*  currentNameFileValue = $();*/
    });
}

function datePickertxtShow() {

    $("#datePickertxt").datepicker();
    $("#datePickertxt").datepicker("show");


}

function DealsList() {
    $('#deal-data-table').dataTable().fnDestroy();
    const dealType = window.location.href.indexOf('CrmDeals/Index') != -1 ? 'Federal' : 'Commercial'
    var data = { dealType };
    var url = "/CrmDeals/DealsList";

    var result = AjaxPost(url, data);

    if (result == "success") {
        //alert(' Please check your email and verify your account ');
        $('.Verification').show();
        $('.Register').hide();
        $('.plan-sec').hide();
        $('.auth-wrapper').removeClass('register');

        //$('#errregemail').hide();
    }
    else if (result == "fail") {
        swal.fire({
            title: "",
            text: "The Deal you have entered is already registered. Please try another",
            type: "error"
        }).then(function () {
            window.location.reload();
        });
        //$('#errregemail').show();

    }
    else {
        swal.fire(result);
    }
}

function GetDeals(searchtext, pageNo) {
    ;
    if (pageNo == undefined) {
        pageNo = 1;
    }
    if (searchtext == undefined) {
        searchtext = "";
    }
    var dealId = $(this).attr("dealid");

    function numberWithCommas(x) {
        var parts = x.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    var url = "";
    var data = "";
    const urlParams = new URLSearchParams(window.location.search);
    const checkDealId = urlParams.get('activity');
    if (checkDealId) {
        url = "/CrmDeals/DealsById";

        data = "{'dealId': '" + checkDealId + "'}";
       
    } else {
        url = "/CrmDeals/DealsList";
        const dealType = window.location.href.indexOf('CrmDeals/Index') != -1 ? 'Federal' : 'Commercial'
        data = "{'pageNo': '" + pageNo + "','keyword': '" + searchtext + "','dealType':'" + dealType +"'}";
    }
   
    var result = AjaxPost(url, data);
    var data = checkDealId? [result.deal]: result.records;

    var len = data.length;
    var filldata = "";
    if (len > 0) {

        for (var i = 0; i < len; i++) {
            var Deal_ID = data[i].Deal_ID;
            /* var Created_Date = formatDate(data[i].created_datetime);*/ // new Date(data[i].created_datetime).toLocaleDateString("en-US") ;
            var title = data[i].Deal_Title;
            var SolicitationNumber = data[i].Deal_SolicitationNumber;
            var sam_gov_link = data[i].Deal_sam_gov_link;
            var description = data[i].Description;
            var status = data[i].Deal_Status;
            var rfp_release_date = formatDate(data[i].Deal_RFP_Release_Date); //new Date(data[i].Deal_RFP_Release_Date).toLocaleDateString("en-US") ;
            var stage = data[i].Deal_Stage;
            var funding_agency_code = data[i].Deal_Funding_Agency_code;
            var funding_agency_name = data[i].Deal_Funding_Agency_Name;
            var funding_sub_agency_code = data[i].Deal_funding_sub_agency_code;
            var funding_sub_agency_name = data[i].Deal_funding_sub_agency_name;
            var awarding_agency_code = data[i].Deal_awarding_agency_code;
            var awarding_agency_name = data[i].Deal_awarding_agency_code;
            var award_type = data[i].Deal_Award_Type;
            var set_aside = data[i].Deal_Set_Aside;
            var set_aside_description = data[i].set_aside_description;
            var naics = data[i].Deal_naics_code;

            var naics_description = data[i].Deal_naics_code;
            var psc_code = data[i].Deal_PSC_code;
            var psc_description = data[i].Deal_PSC_Description;
            var incumbent_name = data[i].Deal_Incumbent_Name;
            var incumbent_uei = data[i].incumbent_uei;
            //var potential_award_amount = new String(data[i].Deal_Potential_Award_Amount).toLocaleString('en-US', { maximumFractionDigits: 2 });
            var potential_award_amount = numberWithCommas(data[i].Deal_Potential_Award_Amount);
            var expiration_date = formatDate(data[i].Deal_Expiration_Date); //new Date(data[i].Deal_Expiration_Date).toLocaleDateString("en-US");
            var govwin_id = data[i].Deal_Govwin_ID;

            var govwin_link = data[i].Deal_govwin_link;
            var priority = data[i].Deal_Priority;
            var user_id = data[i].user_id;

            var user_domain = data[i].user_domain;
            var deal_type = data[i].deal_type;
            var organization_id = data[i].organization_id;


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
            // <!-- style="background-color: ' + color + '"-->

            if (deal_type == 'Federal') {

                filldata = filldata +
                    '<tr style="text-align:center;" id="' + Deal_ID + '">' +
                    '<td >' +

                    '<a class="fas fa-edit text-centre" target="_blank" href="/CrmDeals/AddDeal?dealId=' + Deal_ID + '" > ' +
                    '</a>' +

                    '</td > ' +
                    //'<td> ' + Deal_ID + '</td > ' +
                    /*'<td> ' + Created_Date + '</td > ' +*/
                    '<td style="font-family: ;white-space: break-spaces;"> ' + title + '</td > ' +
                    /*'<td style="font-family: " FontAwesome";" > ' + description + '</td>' +*/
                    '<td style="font-family: " FontAwesome";" >' + rfp_release_date + '</td>' +
                    '<td  style="font-family: " FontAwesome";">' + status + '</td > ' +
                    '<td style="font-family: " FontAwesome";">' + stage + '</td > ' +
                    '<td style="none: " FontAwesome";"> ' + priority + '</td>' +
                    '<td style="font-family: ;white-space: break-spaces;">' + funding_sub_agency_name + '</td>' +
                    /*'<td  style = "font-family: "FontAwesome";" > ' + award_type + '</td>' +*/
                    '<td style = "font-family: " FontAwesome";"> ' + set_aside + '</td>' +
                    '<td style="font-family: " FontAwesome";"> ' + naics + '</td>' +
                    '<td style="font-family: " FontAwesome";"> ' + psc_code + '</td>' +
                    '<td style="font-family: ;white-space: break-spaces;">' + incumbent_name + '</td>' +
                    '<td align="right" style="font-family: " FontAwesome";"> ' + ` ${potential_award_amount ? "$" + potential_award_amount.toLocaleString('en') : ''}` + '</td>' +
                    /* '<td style="font-family: " FontAwesome";"  > ' + expiration_date + '</td>' +*/
                    /* '<td style="none: " FontAwesome";" > ' + SolicitationNumber + '</td>' +*/


                    '<td class="text-center" style="justify-items: anchor-center;"><div class="d-flex  border-0"> <i class="fa-solid fa-eye mr-2"  onclick="openAttchViewPeopleModal(`' + Deal_ID + '`)" style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="openAttchPeopleModal(`' + Deal_ID + '`,`' + title + '`,`' + status + '`,`' + rfp_release_date + '`)" ></i></div></td>' +
                    '<td class="text-center" style="justify-items: anchor-center;"><div class="d-flex  border-0"> <i class="fa-solid fa-eye mr-2"  onclick="openViewGovtContactsModal(`' + Deal_ID + '`)" style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="openAttachGovtContactsModal(`' + Deal_ID + '`)" ></i></div></td>' +
                    '<td dealId=' + Deal_ID + ' class="dt-control" style="justify-items: anchor-center;"><div class="d-flex border-0" style="margin-right: 11px;"><i class="fa-solid fa-eye mr-2"  style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"></i></div></td>' +
                    '<td style="justify-items: anchor-center;"> <div class="d-flex  border-0"><i class="fa-solid fa-eye  mr-2" style="color: #571C7A;" onclick="openNewsModal(' + Deal_ID + ')"></i><i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="routeToNews(' + Deal_ID + ')"></i></div></td>';
                /*'<td style = "display:none"><i style="" class="fa fa-trash icons Deleteclass sb002" onclick="deletedeal(' + Deal_ID + ')"></i></td>'*/

                '</tr > '
            }
            else {
                filldata = filldata +
                    '<tr style="text-align:center" id="' + Deal_ID + '">' +
                    '<td >' + '<a class="fas fa-edit text-centre" target="_blank" href="/CrmDeals/AddDeal?dealId=' + Deal_ID + '" > ' + '</a>' + '</td > ' +
                    '<td style="font-family: ;white-space: break-spaces;"> ' + title + '</td > ' +
                    '<td style="font-family: " FontAwesome";" >' + rfp_release_date + '</td>' +
                    '<td  style="font-family: " FontAwesome";">' + status + '</td > ' +
                    '<td style="font-family: " FontAwesome";">' + stage + '</td > ' +
                    '<td style="none: " FontAwesome";"> ' + priority + '</td>' +
                    '<td style="none: " FontAwesome";"> ' + organization_id + '</td>' +
                    '<td class="text-center" style="justify-items: anchor-center;"><div class="d-flex  border-0"> <i class="fa-solid fa-eye mr-2"  onclick="openAttchViewPeopleModal(`' + Deal_ID + '`)" style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="openAttchPeopleModal(`' + Deal_ID + '`,`' + title + '`,`' + status + '`,`' + rfp_release_date + '`)" ></i></div></td>' +
                    '<td class="text-center" style="justify-items: anchor-center;"><div class="d-flex  border-0"> <i class="fa-solid fa-eye mr-2"  onclick="openViewGovtContactsModal(`' + Deal_ID + '`)" style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="openAttachGovtContactsModal(`' + Deal_ID + '`)" ></i></div></td>' +
                    '<td dealId=' + Deal_ID + ' class="dt-control" style="justify-items: anchor-center;"><div class="d-flex border-0" style="margin-right: 11px;"><i class="fa-solid fa-eye mr-2"  style="color: #571C7A;"></i> <i class="fa-solid fa-circle-plus" style="color: #08A742;"></i></div></td>' +
                    '<td  style="justify-items: anchor-center;"> <div class="d-flex  border-0"><i class="fa-solid fa-eye  mr-2" style="color: #571C7A;" onclick="openNewsModal(' + Deal_ID + ')"></i><i class="fa-solid fa-circle-plus" style="color: #08A742;"  onclick="routeToNews(' + Deal_ID + ')"></i></div></td>';
                '</tr > '
            }

        }
        $('#deallisttable').html(filldata);
        GeneratePaging(searchtext, result.pagesCount, pageNo);
       
      
       
    }
    else {
        $('#deallisttable').html("<tr><td  style='text-align: center;'' colspan='16'>  No record. </td></tr>");

    }

    const callback = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const checkDealId = urlParams.get('activity');
      
        if (checkDealId) {
            const element = $("#" + checkDealId);
            $("#" + checkDealId + " td.dt-control").click();
            observer.disconnect(); 
           
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, { subtree: true, childList: true });
  
    function GeneratePaging(searchKeyword, pagesCount, currentPage) {

        var html = "";
        if (currentPage == 1) {
            html += '<li class="page-item disabled"> <a class="page-link" href="#" tabindex="-1"> Previous</a> </li > ';
        }
        else {
            html += '<li class="page-item"  onclick=GetDeals("' + searchKeyword + '",' + (currentPage - 1) + ')> <a class="page-link" href = "#" tabindex = "-1"> Previous</a> </li> ';
        }

        for (var i = 0; i < pagesCount; i++) {
            var pageNo = i + 1;
            if (currentPage == pageNo) {
                html += ' <li class="page-item active"><a class="page-link" href="#">' + pageNo + '</a></li>'
            }
            else {
                html += ' <li onclick=GetDeals("' + searchKeyword + '",' + pageNo + ') class="page-item"><a class="page-link" href="#">' + pageNo + '</a></li>'
            }

        }

        if (currentPage == pagesCount) {
            html += '<li class="page-item disabled" > <a class="page-link" href = "#" > Next</a ></li> ';
        }
        else {
            html += '<li class="page-item" onclick=GetDeals("' + searchKeyword + '"",' + (currentPage + 1) + ')> <a class="page-link" href = "#" > Next</a ></li>';
        }



        $("#pagingUL").html(html);

       

    }
}

function formatDate(d) {
    if (d) {
        let date = new Date(d);

        const day = date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        return (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear().toString().substr(-2);
    }
    return "";
}

function deletedeal(id) {
    var url = "/CrmDeals/DeleteDeal/" + id;
    var data = "{}";
    var result = AjaxPost(url, data);
    if (result.result == 1) {
        swal.fire("", "Deal Deleted Successfully !", "success");




    }
}



$('#deallisttable').on('click', 'div.msg_content', function (evt) {

    
});
function OnGridSearchKeyUp(event) {
    var searchKeyword = event.currentTarget.value;
    if (searchKeyword.length > 2) {
       
        GetDeals(searchKeyword, 1);
    } else if (searchKeyword.length == 0) {
        GetDeals("", 1);
    }
}

function routeToNews(id) {
    window.open('/News/index?dealId=' + id, "_blank")
}

function openNewsModal(id) {
   
   
   
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/News/GetNewsByDealId",
        data: "{'dealId': " + parseInt(id) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            $('#viewNewsModal').modal('toggle'); 
            var filldata = "";
            if (result.length > 0) {
                const email = document.getElementById('email').innerHTML
                var NewsList = result;
              
                if (NewsList[0].rfp_release_date) {
                    const date = new Date(NewsList[0].rfp_release_date);
                    NewsList[0].rfp_release_date =
                        ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

                } else {
                    NewsList[0].rfp_release_date = ""
                }
               
                $("#dueDateNews").html(NewsList[0].rfp_release_date ? "&nbsp;&nbsp; | &nbsp;" + NewsList[0].rfp_release_date : '')
                $("#statusNews").html(NewsList[0].status ? "&nbsp;&nbsp; | &nbsp;"+NewsList[0].status: '')
                $("#titleStatus").html(NewsList[0].title ? NewsList[0].title: '' )

                var len = NewsList.length;
                for (var i = 0; i < len; i++) {
                    filldata = filldata + renderNews(NewsList[i])
                }
                $("#newsListRender").html(filldata)
                clickEvents()
            }
            else {
                $('#viewNewsModal').modal('toggle'); 
                $("#newsListRender").html(`<div style="    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 20px;
">No News has been added for this deal</div> `)

            }



        },
        //error: function ajaxError(err) {
        //    ;
        //    swal("", err);

        //}
    });

}


function renderNews(item) {
    const firstName = document.getElementById("firstName").innerHTML;
    return `<div class="col-12">
                                <div class="comment__sec ">
                                    <div class="item-icon"></div>
                                    <div class="companyblock">
                                        <div class="main_header">
                                            <div class="nameblock">
                                                
                                                <div class="text">
                                                    <h2>${item.firstName} ${item.lastName}</h2>
                                                    <h4>${item.created_datetime}</h4>
                                                </div>
                                            </div>
 <div class="nameblock">
                                
                                        <div class="text d-flex align-items-center" style ="float:right ;display:none !important;">
                                            <h2>${item.title}</h2>&nbsp;&nbsp; | &nbsp;
                                            <h2> ${item.status}</h2>&nbsp;&nbsp; | &nbsp;
                                            <h2> ${item.rfp_release_date}</h2>
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
                                    <h4><button class="btn comnt-load" id="comment_button_${item.news_id}" news_id="${item.news_id}">Comments</button></h4>
                                    </div>
                            </div>
                             ${item.total_attachments ? ` <div class="comentico">
                                <img src="/Content/assets/images/clip.png" width="17" height="18">
                                <div class="text">
                                <h4><button class="btn attachment-load" id="attachment_button_${item.news_id}" news_id="${item.news_id}">View attachment</button></h4>
                            </div></div>` : ` `}

                            
                                           
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
                        <div class="wrapper" id="wrapper_${item.news_id}" style="display: block;">
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
                        </div>
                        <div class="attachments-show" id="attachment_${item.news_id}">

                        </div>
                    </div>
                        </div>
                                    </div>
                                </div>
                            </div>`
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

function onCommentReplyClick(commentId) {

    $(`#reply_section_${commentId}`).show()


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
                const email = document.getElementById('email').innerHTML
                var NewsList = result;
                var len = NewsList.length;
                for (var i = 0; i < len; i++) {
                    filldata = filldata + `
        
            <div class="row">
                <div class="col-9 history-tl-container" style="margin:0 !important;">
                   
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
                <div class="col-3 text-right">
                    <button class="btn dealbtn" id="downloadAddedFile" onclick="downloadAddedFile('${result[i].file_name}')">Download</button>
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


function closeNewsModal() {
    $("#newsListRender").html('');
    $("#dueDateNews").html('')
    $("#statusNews").html('')
    $("#titleStatus").html('')
    $('#viewNewsModal').modal('hide');
}


