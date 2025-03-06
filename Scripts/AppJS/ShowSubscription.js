$(document).ready(function () {
    GetSubscription();
});

function GetSubscription() {




    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/ShowSubscription/GetSubscription",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.SubData.length > 0) {


                for (var i = 0; i < result.SubData.length; i++) {

                    if (result.SubData[i].Position == '1') {
                        $('#id_SubscriptionPosition1').show();
                        $('#plan_SubscriptionName1').text(result.SubData[i].Name);
                        $('.SubscriptionCode_1').text(result.SubData[i].Code);
                        $('.SubscriptionActive').text(result.SubData[i].Active);
                        $('#SubscriptionValuePos1').text(result.SubData[i].Value);
                        $('#SubscriptionDesc1').text(result.SubData[i].Description);
                        $('.Amount_1').text(result.SubData[i].Value);
                    }
                    if (result.SubData[i].Position == '2') {
                        $('#id_SubscriptionPosition2').show();
                        $('#plan_SubscriptionName2').text(result.SubData[i].Name);
                        $('.SubscriptionCode_2').text(result.SubData[i].Code);
                        $('.SubscriptionActive').text(result.SubData[i].Active);
                        $('#SubscriptionValuePos2').text(result.SubData[i].Value);
                        $('#SubscriptionDesc2').text(result.SubData[i].Description);
                        $('.Amount_2').text(result.SubData[i].Value);
                    }
                    if (result.SubData[i].Position == '3') {
                        $('#id_SubscriptionPosition3').show();
                        $('#plan_SubscriptionName3').text(result.SubData[i].Name);
                        $('.SubscriptionCode_3').text(result.SubData[i].Code);
                        $('.SubscriptionActive').text(result.SubData[i].Active);
                        $('#SubscriptionValuePos3').text(result.SubData[i].Value);
                        $('#SubscriptionDesc3').text(result.SubData[i].Description);
                        $('.Amount_3').text(result.SubData[i].Value);
                    }

                }
            }
            else {
                swal("", "No Data Found !");
            }



        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

$('body').on('hidden.bs.modal', '#PayPopup', function () {
    $("#paypal-button-container").remove();
});

$(document).on('click', '.buyplan', function () {

    //console.log($('.buyplan').parent().prop('Code'));
    var classname = this.id;


    var spl = classname.split('_');
    var SubCode = $('.' + classname).text();
    var Subamount = $('.Amount_' + spl[1]).text();



    var PaymentDetails = {}
    $('.cs12').append('<div style="margin-top: 148px;" id="paypal-button-container"></div>');


    $('#txtPlan').text(SubCode);
    $('#PayPopup').modal('toggle');
    $('#PlanAmount').text(Subamount);

    paypal.Buttons({
        style: {
            shape: 'pill'
        },
        createOrder: function (data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: Subamount
                    }
                }]
            });
        },
        //onApprove: function(data) {
        //    return fetch('/my-server/get-paypal-transaction', {
        //        headers: {
        //            'content-type': 'application/json'
        //        },
        //        body: JSON.stringify({
        //            orderID: data.orderID
        //        })
        //    }).then(function(res) {
        //        return res.json();
        //    }).then(function(details) {
        //        alert('Transaction approved by ' + details.payer_given_name);

        //    },
        onApprove: function (data, actions) {


            // This function captures the funds from the transaction.
            return actions.order.capture().then(function (details) {
                // This function shows a transaction success message to your buyer.
                var myJSON = JSON.stringify(details);
                //alert('Transaction completed by ' + details.payer.name.given_name);

                PaymentDetails.id = details.id;
                PaymentDetails.PayerName = details.payer.name.given_name;
                PaymentDetails.PayerEmail = details.payer.email_address;
                PaymentDetails.status = details.purchase_units[0].payments.captures[0].status;
                PaymentDetails.PaymentID = details.purchase_units[0].payments.captures[0].id;
                PaymentDetails.OrderID = data.orderID;
                PaymentDetails.payerID = data.payerID
                PaymentDetails.amount = details.purchase_units[0].amount.value;

                paymentdetails(PaymentDetails);


                $('#OrderID').text(PaymentDetails.OrderID);


            });
        },
        onError: function (err) {
            // For example, redirect to a specific error page
            //window.location.href = "/your-error-page-here";

            PaymentDetails.id = details.id;
            PaymentDetails.PayerName = details.payer.name.given_name;
            PaymentDetails.PayerEmail = details.payer.email_address;
            PaymentDetails.status = details.purchase_units[0].payments.captures[0].status;
            PaymentDetails.PaymentID = details.purchase_units[0].payments.captures[0].id;
            PaymentDetails.OrderID = data.orderID;
            PaymentDetails.payerID = data.payerID;
            PaymentDetails.amount = details.purchase_units[0].amount.value;

            paymentdetails(PaymentDetails);
            $('#FailedPop').modal('toggle');
            $('#OrderID').text(PaymentDetails.OrderID);


        },
        onCancel: function (data) {
            // Show a cancel page, or return to cart

        }

    }).render('#paypal-button-container');
});


function paymentdetails(PaymentDetailsarr) {

    var data = "{paymentdetails:" + JSON.stringify(PaymentDetailsarr) + "}";
    var url = "/Payment/SavePaymentDetails";
    var result = AjaxPost(url, data);
    if (result == "1") {
        $('#SuccessPop').modal('toggle');

    }
    else {
    }
    $('#PayPopup').modal('toggle');
}

$('body').on('hidden.bs.modal', '#SuccessPop', function () {
    location.reload();
});





