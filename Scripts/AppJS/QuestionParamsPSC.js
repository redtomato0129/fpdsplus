$(document).ready(function () {
    
    fetchPscList();
    $(document).on("click", ".OpenVendorPopup", function (e) {
        e.preventDefault();
       
        setTimeout(function () {
            $("#txt_vendor").focus();
        }, 1000);
    });

    $(document).on("click", "#btndeptrowclear_vendor", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('#txt_vendor').val('');
            $('#lblvendor_2').text('');
        }, 1000);
    });

    
});

function fetchPscList() {
    $('.OpenPscPopup').disableAutoFill();
    $("#txt_Psc").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/TaxonomyPSC/GetPSCList",
                enctype: 'multipart/form-data',
                data: {
                    search_text: request.term
                },
                success: function (result) {
                    result = jQuery.parseJSON(result);
                    const records = result.records;
                    if (records.length > 0) {
                        $("#txt_Psc_Desc").val(records[0].product_or_service_code_description)
                    }
                    else {
                        console.log("No Data Found !");
                    }
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $('#txt_vendor').val(ui.item.label); 
            const value = ui.item.value.split('-');
            $('#lblvendor_2').text(value[value.length-1].trim());
            //gets the select value from autocomplete
        }
    });
}