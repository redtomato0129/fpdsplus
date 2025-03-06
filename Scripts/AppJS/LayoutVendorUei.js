$(document).ready(function () {
    fetchVendorUeiList();
   
    $(document).on("click", ".OpenVendor2Popup", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $("#txt2_vendor").focus();
        }, 1000);
    });

   

    $(document).on("click", "#btndeptrowclear2_vendor", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('#txt2_vendor').val('');
            $('#lblvendor_2').text('');
        }, 1000);
    });

    
});

function fetchVendorUeiList() {
    $('.OpenVendor2Popup').disableAutoFill();
    $("#txt2_vendor").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/AnswerWizard/GetVendorList",
                enctype: 'multipart/form-data',
                data: {
                    search_text: request.term
                },
                success: function (resp) {
                    const data = JSON.parse(resp)
                    

                    data.records.length == 0 ? response([]) : response($.map(data.records, function (item) {

                        return {
                            label: item.vendor_name_uei,
                            value: item.vendor_name_uei
                        };
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $('#txt2_vendor').val(ui.item.label); 
            const splitArr = ui.item.value.split('-');
            $('#lblvendor_2').text(splitArr[splitArr.length-1].trim());
            $("#selectVendorButton").prop('disabled',false)
            //gets the select value from autocomplete
        }
    });
   /* $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetVendorList",
        data: {search_text :''},
        success: function (result) {
            if (result.length > 0) {
                DeptCombo.push(result);
                AwAgencyCombo.push(result);
            }
            else {
                swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });*/
}