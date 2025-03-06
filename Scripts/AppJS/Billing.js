


$(document).ready(function () {
    billingdetails();

});


function billingdetails() {

    
    var url = "/Billing/Billing_Datas";
    var data = "{}";
    var result = AjaxPost(url, data);
    var len = result.length;
    var filldata = "";
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var Amount = result[i].Amount;
            var orderID = result[i].OrderID;
            var PaiedDate = result[i].PaiedDate;
            filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + Amount + '</td><td style="letter-spacing: 1px;font-family: "FontAwesome";">' + orderID + '</td><td style="letter-spacing: 1px;font-family: "FontAwesome";">' + PaiedDate + '</td></tr>';

        }
        $('#bodybilling').html(filldata);
        $('#BillingDatatable').dataTable();
    }
}