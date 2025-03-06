$(document).ready(function () {
   // fetchContractList();
    var timer = null;
    $('#txt2_contract').keyup(function () {
        clearTimeout(timer);
        $('.OpenContract2Popup').disableAutoFill();
        timer = setTimeout(fetchContractList, 1000)
    });
    $(document).on("click", ".OpenContract2Popup", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $("#txt2_contract").focus();
        }, 1000);
    });

   

    $(document).on("click", "#btndeptrowclear2_contract", function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('#txt2_contract').val('');
            $('#lblcontract_2').text('');
        }, 1000);
    });

    
});

function fetchContractList() {
    $('.OpenContract2Popup').disableAutoFill();
    $("#txt2_contract").autocomplete({
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
            $('#txt2_contract').val(ui.item.label);
            $('#lblcontract_2').text(ui.item.data);
            $("#selectContractButton").prop('disabled', false)
            //gets the select value from autocomplete
        }
    });

}

function onSelectContract() {
    const data = JSON.parse($('#lblcontract_2').text())
    window.location.href = `/AnswerWizard/FpdsPage?category=agency&transaction_id=${data.transaction_id}&award_id_piid=${data.award_id_piid}&parent_award_id_piid=${data.parent_award_id_piid}`
}