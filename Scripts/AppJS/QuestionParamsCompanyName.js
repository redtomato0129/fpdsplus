$(document).ready(function () {
    fetchCompanyNameList();
    $(document).on("click", ".OpenCompanyPopup", function (e) {
        e.preventDefault();
       
        setTimeout(function () {
            $("#txt_company").focus();
        }, 1000);
    });

    $(document).on("click", "#btndeptrowclear_company", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('#txt_company').val('');
            $('#lblcompany_2').text('');
        }, 1000);
    });

    
});

function fetchCompanyNameList() {
    $('.OpenCompanyPopup').disableAutoFill();
    $("#txt_company").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/AnswerWizard/GetCompanyName",
                enctype: 'multipart/form-data',
                data: {
                    company_name: request.term
                },
                success: function (resp) {
                    const data = JSON.parse(resp)
                    

                    data.records.length == 0 ? response([]) : response($.map(data.records, function (item) {

                        return {
                            label: item.operating_company,
                            value: item.operating_company,
                            company: item.uei
                        };
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
           
            $('.txt_company').val(ui.item.label); 

           // const value = ui.item.value.split('-');
            //$('.lblcompany_2').text(value[value.length-1].trim());

            $('#lblcompany_2').text(ui.item.company);
            //gets the select value from autocomplete
        }
    });
}