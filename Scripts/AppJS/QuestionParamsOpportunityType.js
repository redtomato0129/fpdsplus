var OpportunityArr = []
var OKOpportunityType = [];
$(document).ready(function () {

    $(document).on('click', '.OpenMinOpportunityType', function () {
        $('#opportunityModal').modal('show');
        ListOpportunity();
    });


    $(document).on('click', '#lblOpporttunityType_2', function () {
        $('.OpenMinOpportunityType').trigger('click');
    });

    $(document).on('click', '#OkOpportunityType', function () {

        OKOpportunityType = [];

        $('.clsOpportunityClass input:checked').each(function () {
            OKOpportunityType.push({ value: this.value, text: this.id });
        });

        $('#opportunityModal').modal('hide');

        CountOpportunityType();
    });


    $(document).on('click', '#CancelOpportunityType', function () {

        //$('.clsOpportunityClass input:checked').removeAttr('checked');
        $('.Opportunity_Checkbox').prop('checked', false);
        $('.Opportunity_Checkbox').parent().parent().parent().css("background-color", "");

        $(OKOpportunityType).each(function (index, element) {
            if (OKOpportunityType[index]) {
                $('.clsOpportunityClass input:checkbox[value="' + OKOpportunityType[index].value + '"]').prop('checked', true);
                $('.clsOpportunityClass input:checkbox[value="' + OKOpportunityType[index].value + '"]').parent().parent().parent().css("background-color", "#e8cfff");
            }

        });

        $('#opportunityModal').modal('hide');

        CountOpportunityType();
       
    });

    $(document).on('change', '.Opportunity_Checkbox', function () {

        if (this.checked) {
            
              

            $(this).parent().parent().parent().css("background-color", "#e8cfff");
        }
        else {
           
            $(this).parent().parent().parent().css("background-color", "");
        }

      

    });

    function ListOpportunity() {
        $(".SocioList").html("");
        for (i = 0; i < OKOpportunityType.length; i++) {
            var value = OKOpportunityType[i].value;
            var text = OKOpportunityType[i].text;
            $(".SocioList").append($("<div style='width: fit-content;font-size: 11px;font-weight: 200;padding: 10px 6px 0px 6px;1px solid #e8e8e8;float: left;'><label style='font-weight: 400;' id=" + value + ">" + text + "</label><span style='margin-left: 6px;color: #ce0404;'><i class='fas fa-times'></i></span></div>"));
        }
    }

    function CountOpportunityType() {

        if (OKOpportunityType.length > 0) {
            $('.OpenMinOpportunityType').val(OKOpportunityType[0].text);
            $("#lblOpporttunityType_2").css("display", "block");
            $('#lblRes_OpportunityType').text(OKOpportunityType.length - 1);
        }
        else {
            $("#lblOpporttunityType_2").css("display", "none");
            $('#lblRes_OpportunityType').text("");
            $('.OpenMinOpportunityType').val('');
        }
    }
})

function GetOpportunityType() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: '/AnswerWizard/GetOpportunityType',
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result && result.records.length > 0) {

                OpportunityArr.push(result.records);

                $('#tbl_OpportunityType').show();

                var filldata = "";
                $('#tbl_OpportunityType').dataTable().fnDestroy();
                const urlParams = new URLSearchParams(window.location.search);
                const question_id = urlParams.get('id');
                const bothFlag = question_id == 6 ? true : false
                for (i = 0; i < result.records.length; i++) {
                    var description = result.records[i].opportunity_type;

                    filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + description + '</td><td><label class="container"><input id="' + description + '" class="Opportunity_Checkbox" type="checkbox" value="' + description + '"><span class="checkmark0"></span></label></td></tr>';
                }

                $('#tbody_OpportunityType').html(filldata);
                $('#tbl_OpportunityType').DataTable({
                    //scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    bInfo: false,
                    dom: 'lBfrtip'
                        +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-5'i><'col-sm-7'p>>",

                    buttons: [
                    ],
                    //lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    //columnDefs: [
                    //    { className: 'text-center', targets: [0, 2, 3, 4] },

                    //],
                    language: {
                        search: "Search within Grid",
                        //searchPlaceholder: "Search within Grid"
                    }
                });
                
                if (typeof answerWidgetOpportunityTypeCheck == 'function') {

                    answerWidgetOpportunityTypeCheck();
                }
               /* if (typeof answerWidgetSocioCheck == 'function') {

                    answerWidgetSocioAsideCheck();
                }
                if (typeof renderSetAsideForFixedUI == 'function') {

                    renderSetAsideForFixedUI();
                }*/
             
               
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