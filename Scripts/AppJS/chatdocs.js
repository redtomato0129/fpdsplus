$(document).ready(function () {
    $("#send-btn").click(function () {
        $(".chat-container").append(`<div class="chat incoming">
            <div class="chat-content">
                <div class="chat-details">
                    <img src="/Content/assets/images/userIcon.jpg" alt="user-img">
                    <p>${$("#chat-input").val()}</p>
                </div>
            </div>
        </div>`)

        $("#send-btn").removeClass('material-symbols-rounded').empty();
        $("#send-btn").html(`<img src="/Content/assets/images/loaderButton.gif" style="
    width: 42px;
    height: 42px;
">`)
        const urlParams = new URLSearchParams(window.location.search);
        const notifyId = urlParams.get('id');
        let string = '';
        JSON.parse(notifyId).forEach((item,index) => {
            if (index == 0) {
                string = string + item
            } else {
                string=string+`,${item}`
            }
        })
        $.ajax({
            type: "POST",
            data: {
                query: $("#chat-input").val(),
                notifyId: string
            },
            enctype: 'multipart/form-data',
            url: "/opportunity/ChatBot",
            success: function (result) {
                result = jQuery.parseJSON(result);
                $(".chat-container").append(`<div class="chat outgoing" >
                    <div class="chat-content">
                        <div class="chat-details">
                            <img src="/Content/assets/images/gptLogo.jpg" alt="user-img">
                                <p>${result.answer}
${ result.source ? `<br><b>Source:</b>${result.source}`:'' }
</p>
                                
                </div>
                        </div>
                    </div>`)

                $("#send-btn").addClass('material-symbols-rounded').empty();
                $("#send-btn").html("send")
                $("#chat-input").val("");
            },
            error: function (error) { }
        });

    })

})
function closeOpportunityModal() {
    $("#opportunityDetails").modal("hide")
}
function showOpportunityModal() {
    $("#opportunityDetails").modal("show");
    const urlParams = new URLSearchParams(window.location.search);
    const noticeid = JSON.parse(urlParams.get('id'));
    $.ajax({
        type: "POST",
        data: {
            noticeid
        },
        enctype: 'multipart/form-data',
        url: "/opportunity/getOpportunityListByNoticeIds",
        success: function (data) {
            const result = JSON.parse(data);
            if (result.opportunityList && result.opportunityList != 0) {
                const records = result.opportunityList;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    html = html + ` <tr id="${a}"  style="cursor: pointer">
                            
                                <td>${records[a].Title}</td>
                                <td>${records[a].Department_IndAgency}</td>
                                <td>${records[a].SubTier}</td>
<td>${records[a].Type}</td>
<td>${records[a].PostedDate}</td>
                     </tr>`;
                }
                $("#opportunityListtable").html(html)

            }
            else {
                $('#opportunityListtable').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
            }

        },
        error: function (error) { }
    });
}