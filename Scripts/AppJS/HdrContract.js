$(document).ready(function () {
   // fetchContractList();
    contractAutoSearch()
    var timer = null;
   /* $('#txt3_contract').keyup(()=> {
        clearTimeout(timer);
        $('.OpenContract3Popup').disableAutoFill();
        timer = setTimeout(fetchContractList, 1000)
    });*/
    $('#txt3_contract').on('keyup paste', () => {
        clearTimeout(timer);
        $('.OpenContract3Popup').disableAutoFill();
        timer = setTimeout(fetchContractList, 1000)
    });
    $(document).on("click", ".OpenContract3Popup", function (e) {
        e.preventDefault();

        setTimeout(() => {
            $("#txt3_contract").focus();
        }, 1000);
    });

   

    $(document).on("click", "#btndeptrowclear3_contract", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('#txt3_contract').val('');
            $('#lblcontract_3').text('');
        }, 1000);
    });

    
});

function fetchContractList() {
    if ($("#txt3_contract").data('autocomplete')) {
        $("#txt3_contract").autocomplete("destroy");
        $("#txt3_contract").removeData('autocomplete');
    }
    $('.OpenContract3Popup').disableAutoFill();
    contractAutoSearch()
}

function contractAutoSearch() {
    $("#txt3_contract").autocomplete({
        delay: 100,
        source: function (request, response) {
            $.ajax({
                url: "/AnswerWizard/ContractSearchEZ",
                enctype: 'multipart/form-data',
                data: {
                    contract_number: request.term
                },
                success: function (resp) {
                    const data = JSON.parse(resp)
                    data.records.length == 0 ? response([]) : response($.map(data.records, function (item) {

                        return {
                            label: item.contract_search,
                            value: item.contract_search,
                            data: JSON.stringify({
                                award_id_piid: item.award_id_piid,
                                transaction_id: item.transaction_id,
                                parent_award_id_piid: item.parent_award_id_piid
                            }),

                        };
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $('#txt3_contract').val(ui.item.label);
            $('#lblcontract_3').text(ui.item.data);
            $("#selectContractButton").prop('disabled', false)
            //gets the select value from autocomplete
        }
    });
}