$(document).ready(function () {
    GetSubscriptionHistoryData();


    $(document).on('click', '.Cancelclass', function () {

        var TransId = $(this).parent().parent().find("td:eq('0')").text();
        var SubscriptionId = $(this).parent().parent().find("td:eq('2')").text();
        var CancelUrl = $(this).parent().parent().find("td:eq('10')").attr('url');
        var url = "/Payment/UpdateSubscriptionStatus";
        var data = "{TransId:" + JSON.stringify(TransId) + ",SubscriptionId:" + JSON.stringify(SubscriptionId) + ",Url:" + JSON.stringify(CancelUrl) + "}";
        var result = AjaxPost(url, data);
        if (result.result > 0) {
            $("#isPlanSubscribed").val("False");
            GetSubscriptionHistoryData();
            swal("", "Subscription plan cancelled Successfully !", "success");

        } else {
            swal("", "Subscription plan not updated Successfully !", "error");
        }
    });

    //$(document).on('click', '.Suspendclass', function () {

    //    var TransId = $(this).parent().parent().find("td:eq('0')").text();
    //    var SubscriptionId = $(this).parent().parent().find("td:eq('2')").text();
    //    var SuspendUrl = $(this).parent().parent().find("td:eq('11')").attr('url');
    //    var url = "/Payment/UpdateSubscriptionStatus";
    //    var data = "{TransId:" + JSON.stringify(TransId) + ",SubscriptionId:" + JSON.stringify(SubscriptionId) + ",Url:" + JSON.stringify(SuspendUrl) + "}";
    //    var result = AjaxPost(url, data);
    //    if (result.result === 1) {
    //        GetSubscriptionHistoryData();

    //        swal("", "Subscription plan suspended Successfully !", "success");

    //    }
    //});
});

function GetSubscriptionHistoryData() {
    $('#subscriptionHistoryData').dataTable().fnDestroy();

    var url = "/SubscriptionHistory/GetSubscriptioHistory";
    var data = "{}";
    var result = AjaxPost(url, data);
    var len = result.SubData.length;
    var filldata = "";
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var SubscriptionId = result.SubData[i].SubscriptionId;
            var PlanId = result.SubData[i].PlanId;
            var PayerId = result.SubData[i].PayerId;
            var StartDate = result.SubData[i].StartDate.replaceAll('-', '/');
            var NextPaymentDate = result.SubData[i].NextPaymentDate.replaceAll('-', '/');
            var LastPaymentDate = result.SubData[i].LastPaymentDate.replaceAll('-', '/');
            var LastPaymentAmount = result.SubData[i].LastPaymentAmount;
            var Status = result.SubData[i].Status;
            var TransId = result.SubData[i].TransId;
            var CancelUrl = result.SubData[i].CancelUrl;
            var SuspendUrl = result.SubData[i].SuspendUrl;

            if (Status !== "" && Status === "CANCELLED") {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransId + '</td><td>' + (i + 1) + '</td><td>' + SubscriptionId + '</td><td style="font-family: "FontAwesome";">' + PlanId + '</td><td>' + PayerId + '</td><td style="font-family: "FontAwesome";">' + StartDate + '</td><td style="font-family: "FontAwesome";">' + NextPaymentDate + '</td><td style="font-family: "FontAwesome";">' + LastPaymentDate + '</td><td style="font-family: "FontAwesome";">' + LastPaymentAmount + '</td><td style="font-family: "FontAwesome";">' + Status + '</td><td url="' + CancelUrl + '"> <i class="far fa-window-close icons sb002" ></i></td > <td style="display:none" url="' + SuspendUrl + '"><i class="fas fa-ban icons sb002"></i></td></tr > ';
            } else {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransId + '</td><td>' + (i + 1) + '</td><td>' + SubscriptionId + '</td><td style="font-family: "FontAwesome";">' + PlanId + '</td><td>' + PayerId + '</td><td style="font-family: "FontAwesome";">' + StartDate + '</td><td style="font-family: "FontAwesome";">' + NextPaymentDate + '</td><td style="font-family: "FontAwesome";">' + LastPaymentDate + '</td><td style="font-family: "FontAwesome";">' + LastPaymentAmount + '</td><td style="font-family: "FontAwesome";">' + Status + '</td><td url="' + CancelUrl + '"> <i class="far fa-window-close icons Cancelclass sb002" ></i></td > <td style="display:none" url="' + SuspendUrl + '"><i class="fas fa-ban icons Suspendclass sb002"></i></td></tr > ';
            }

        }
        $('#subscriptionHistoryTable').html(filldata);
        if ($("#isPlanSubscribed").val() !== null && $("#isPlanSubscribed").val() === "False") {
            $('#subscriptionHistoryData').dataTable({
                dom: 'lfrBtip',
                buttons: [
                    {
                        text: 'Purchase Subscription',
                        action: function (e, dt, node, config) {
                            window.location.href = '/Payment/PaymentWithPaypal';
                        }
                    }
                ]
            });
        }
        else {
            $('#subscriptionHistoryData').dataTable();
        }
    }
}