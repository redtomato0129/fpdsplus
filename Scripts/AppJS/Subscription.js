$(document).ready(function () {
    GetData();
    $('#btnSubscription').text('Save');

    $(document).on('click', '#btnSubscription', function () {


        var SubscriptionDetails = {};
        SubscriptionDetails.code = $('#txtSubscriptionCode').val();
        SubscriptionDetails.name = $('#txtSubscriptionName').val();
        SubscriptionDetails.value = $('#txtSubscriptionValue').val();
        SubscriptionDetails.active = $("input[name='active']:checked").val();
        SubscriptionDetails.TransID = $("#lblTransId").text();
        SubscriptionDetails.Description = $("#txtSubscriptionDesc").val();
        SubscriptionDetails.Position = $("#ddlposition option:selected").text();



        if (SubscriptionDetails.active == "Yes") {
            SubscriptionDetails.active = '1';
        }
        else {
            SubscriptionDetails.active = '0';
        }

        if (SubscriptionDetails.code != "") {

            if ($('#btnSubscription').text() == "Save") {
                var data = "{SubscriptionDetails:" + JSON.stringify(SubscriptionDetails) + "}";
                var url = "/Subscription/SaveSubscription";
            }
            else if ($('#btnSubscription').text() == "Update") {
                var data = "{SubscriptionDetails:" + JSON.stringify(SubscriptionDetails) + "}";
                var url = "/Subscription/UpdateSubscription";
            }


            var result = AjaxPost(url, data);
            if (result.result > 0) {

                if ($('#btnSubscription').text() === 'Update') {
                    swal("", "Subscription Updated Successfully !", "success");
                }
                else if ($('#btnSubscription').text() === 'Save') {
                    swal("", "Subscription Saved Successfully !", "success");
                }

                $('#txtSubscriptionCode').val('');
                $('#txtSubscriptionName').val('');
                $('#txtSubscriptionValue').val('');
                $("#txtSubscriptionDesc").text('');
                $("#ddlposition").text('');

                $('#btnSubscription').text('Save');

                $('.yes').prop('checked', false);
                $('.No').prop('checked', false);


                GetData();
            }
            else {
                swal("", "Saving Subscription Failed!", "error");
            }

        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
        }

    });

    $(document).on('click', '.Editclass', function () {


        var TransID = $(this).parent().parent().find("td:eq('0')").text();
        var Code = $(this).parent().parent().find("td:eq('2')").text();
        var Name = $(this).parent().parent().find("td:eq('3')").text();
        var Value = $(this).parent().parent().find("td:eq('4')").text();
        var Active = $(this).parent().parent().find("td:eq('7')").text();

        var Description = $(this).parent().parent().find("td:eq('5')").text();
        var Position = $(this).parent().parent().find("td:eq('6')").text();

        $('#txtSubscriptionCode').val(Code);
        $('#txtSubscriptionName').val(Name);
        $('#txtSubscriptionValue').val(Value);
        $('#lblTransId').text(TransID);
        $("#txtSubscriptionDesc").val(Description);
        $("#ddlposition option:selected").text(Position);

        if (Active == "True") {
            $('.yes').prop('checked', true);
        }
        else if (Active == "False") {
            $('.No').prop('checked', true);
        }
        $('#btnSubscription').text('Update');



    });

    $(document).on('click', '.Deleteclass', function () {

        //$('.Deleteclass').click(function () {
        var TransID = $(this).parent().parent().find("td:eq('0')").text();
        var url = "/Subscription/DeleteSubscription";
        var data = "{TransID:" + JSON.stringify(TransID) + "}";
        var result = AjaxPost(url, data);
        if (result.result === 1) {
            GetData();

            swal("", "Subscription Deleted Successfully !", "success");

        }
    });






});



function GetData() {
    $('#subscriptionData').dataTable().fnDestroy();

    var url = "/Subscription/GetSubscription";
    var data = "{}";
    var result = AjaxPost(url, data);
    var len = result.SubData.length;
    var filldata = "";
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var Code = result.SubData[i].Code;
            var Name = result.SubData[i].Name;
            var Value = result.SubData[i].Value;
            var Active = result.SubData[i].Active;
            var TransID = result.SubData[i].TransID;

            var Description = result.SubData[i].Description;
            var Position = result.SubData[i].Position;

            if (Active == "True") {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + Name + '</td><td style="font-family: "FontAwesome";">' + Value + '</td><td style="font-family: "FontAwesome";">' + Description + '</td><td style="font-family: "FontAwesome";">' + Position + '</td><td style="display:none">' + Active + '</td><td><i class="fa fa-check sb002" style="color: #60d425;"></i></td><td><i class="fa fa-edit icons Editclass sb002" ></i></td><td><i  class="fa fa-trash icons Deleteclass sb002"></i></td></tr>';
            }
            else if (Active == "False") {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + Name + '</td><td style="font-family: "FontAwesome";">' + Value + '</td><td style="font-family: "FontAwesome";">' + Description + '</td><td style="font-family: "FontAwesome";">' + Position + '</td><td style="display:none">' + Active + '</td><td><i class="fa fa-times sb002" style="color: #dc6c6c;"></i></td><td><i class="fa fa-edit icons Editclass sb002" ></i></td><td><i  class="fa fa-trash icons Deleteclass sb002"></i></td></tr>';
                //filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + Name + '</td><td style="font-family: "FontAwesome";">' + Value + '</td><td style="display:none">' + Active + '</td><td><td><i class="fa fa-times" style="color: #60d425;font-size: 22px;"></i></td><td><i class="fa fa-edit icons Editclass" style="font-size: 22px;" ></i></td><td><i  style="font-size: 22px;" class="fa fa-trash icons"></i></td></tr>';

            }

        }
        $('#searchreportTable').html(filldata);
        $('#subscriptionData').dataTable();
    }
}


//function clear() {
//    $('#txtSubscriptionCode').val("");
//    $('#txtSubscriptionName').val("");
//    $('#txtSubscriptionValue').val("");
//    $('input[name="active"]').prop('checked', false);
//}