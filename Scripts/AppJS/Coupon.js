$(document).ready(function () {

    $('#btncoupon').text('Save');
    GetData();


    $(document).on('click', '#btncoupon', function () {

        alert("hi");
        var CouponDetails = {};
        CouponDetails.code = $('#txtCouponCode').val();
        CouponDetails.CodeDescription = $('#txtCouponcodedescription').val();
        CouponDetails.PercentageDiscount = $('#txtPercentagediscount').val();
        CouponDetails.Expirationdate = $('#txtExpirationdate').val();
        CouponDetails.active = $("input[name='active']:checked").val();
        CouponDetails.TransID = $("#lblTransId").text();
        if (CouponDetails.active == "Yes") {
            CouponDetails.active = '1';
        }
        else {
            CouponDetails.active = '0';
        }

        if (CouponDetails.code != "") {

            if ($('#btncoupon').text() == "Save") {
                var data = "{CouponDetails:" + JSON.stringify(CouponDetails) + "}";
                var url = "/Coupon/SaveCoupon";
            }
            else if ($('#btncoupon').text() == "Update") {
                var data = "{CouponDetails:" + JSON.stringify(CouponDetails) + "}";
                var url = "/Coupon/UpdateCoupon";
            }


            var result = AjaxPost(url, data);
            if (result.result > 0) {


                if ($('#btncoupon').text() == 'Update') {
                    swal("", "Coupon details Updated Successfully !", "success");
                }
                else if ($('#btncoupon').text() == 'Save') {
                    swal("", "Coupon details Saved Successfully !", "success");
                }

                $('#btncoupon').text('Save');

                $('.Yes').prop('checked', false);
                $('.No').prop('checked', false);

                $('#txtCouponCode').val('');
                $('#txtCouponcodedescription').val('');
                $('#txtPercentagediscount').val('');
                $('#txtExpirationdate').val('');
                $('#lblTransId').text('');

                GetData();

            }
            else {
                swal("", "Saving Coupon Failed!", "error");
            }

        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
        }

    });
    $(document).on('click', '.Editclass', function () {

        var TransID = $(this).parent().parent().find("td:eq('0')").text();
        var Code = $(this).parent().parent().find("td:eq('2')").text();
        var CodeDescription = $(this).parent().parent().find("td:eq('3')").text();
        var PercentageDiscount = $(this).parent().parent().find("td:eq('4')").text();
        var ExpirationDate = $(this).parent().parent().find("td:eq('5')").text();
        var Active = $(this).parent().parent().find("td:eq('6')").text();




        $('#txtCouponCode').val(Code);
        $('#txtCouponcodedescription').val(CodeDescription);
        $('#txtPercentagediscount').val(PercentageDiscount);
        $('#txtExpirationdate').val(ExpirationDate);
        $('#lblTransId').text(TransID);


        if (Active == "True") {
            $('.Yes').prop('checked', true);
        }
        else if (Active == "False") {
            $('.No').prop('checked', true);
        }
        $('#btncoupon').text('Update');



    });


    $('.Deleteclass').click(function () {
        var TransID = $(this).parent().parent().find("td:eq('0')").text();
        var url = "/Coupon/DeleteCoupon";
        var data = "{TransID:" + JSON.stringify(TransID) + "}";
        var result = AjaxPost(url, data);
        if (result.result == 1) {
            swal("", "Coupon Deleted Successfully !", "success");

        }
    });

    $("#txtExpirationdate").datepicker({
        language: 'en',
        onSelect: function (dat) {

            var d = new Date(dat.split("/").reverse().join("-"));
            var dd = ("0" + d.getDate()).slice(-2);
            var mm = ("0" + (d.getMonth() + 1)).slice(-2);
            var yy = d.getFullYear();
            var convertedDate = dd + "-" + mm + "-" + yy;

            var sid = convertedDate.split('-');
            var result = sid[1] + "-" + sid[0] + "-" + sid[2];
            $("#txtExpirationdate").text(result);

            var LMonth = $('#txt_LTNoticePeriod').val();
            if (LMonth != "" && dat != "") {
                calculateVacatedate(LMonth, result);
            }
            else {
                $('#txt_LTVacatDate').val('');
            }
            $('#txtExpirationdate').trigger('blur');
        }
    });



});




function GetData() {
    $('#couponData').dataTable().fnDestroy();

    var url = "/Coupon/GetCoupon";
    var data = "{}";
    var result = AjaxPost(url, data);
    var len = result.CouponData.length;
    var filldata = "";
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var Code = result.CouponData[i].Code;
            var CodeDescription = result.CouponData[i].CodeDescription;
            var PercentageDiscount = result.CouponData[i].PercentageDiscount;
            var ExpirationDate = result.CouponData[i].ExpirationDate;
            var Active = result.CouponData[i].Active;
            var TransID = result.CouponData[i].TransID;

            if (Active == "True") {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + CodeDescription + '</td><td style="font-family: "FontAwesome";">' + PercentageDiscount + '</td><td style="font-family: "FontAwesome";">' + ExpirationDate + '</td><td style="display:none">' + Active + '</td><td><i class="fa fa-check sb002" style="color: #60d425;"></i></td><td><i class="fa fa-edit icons Editclass sb002" style=""></i></td><td><i style="" class="fa fa-trash icons Deleteclass sb002"></i></td></tr>';
            }
            else if (Active == "False") {
                filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + CodeDescription + '</td><td style="font-family: "FontAwesome";">' + PercentageDiscount + '</td><td style="font-family: "FontAwesome";">' + ExpirationDate + '</td><td style="display:none">' + Active + '</td><td><i class="fa fa-times sb002" style="color: #dc6c6c;"></i></td><td><i class="fa fa-edit icons Editclass sb002" style=""></i></td><td><i style="" class="fa fa-trash icons Deleteclass sb002"></i></td></tr>';
                //filldata = filldata + '<tr><td  style="display:none" class="TransID">' + TransID + '</td><td>' + (i + 1) + '</td><td>' + Code + '</td><td style="font-family: "FontAwesome";">' + Name + '</td><td style="font-family: "FontAwesome";">' + Value + '</td><td style="display:none">' + Active + '</td><td><td><i class="fa fa-times" style="color: #60d425;"></i></td><td><i class="fa fa-edit icons Editclass" style="" ></i></td><td><i  style="" class="fa fa-trash icons"></i></td></tr>';

            }

        }
        $('#couponreportTable').html(filldata);
        $('#couponData').dataTable();
    }
}