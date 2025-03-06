var SocioArr = []
let socioFieldType
var OKSocioAside = [];
$(document).ready(function () {

    $(document).on('click', '.OpenMinContSizeAside', function () {
        $('#MysocioAside').modal('toggle');
        ListSocioAside();
    });


    $(document).on('click', '#Res_totalSocio_Aside', function () {
        $('.OpenMinContSizeAside').trigger('click');
    });

    $(document).on('click', '#OKSocioAside', function () {

        OKSocioAside = [];

            $('.clsSocioeconomicAside input:checked').each(function () {
                OKSocioAside.push({ value: this.value, text: this.id });
            });

        $('#MysocioAside').modal('hide');

        SocioCountAside();
    });


    $(document).on('click', '#CancelSocioAside', function () {

        //$('.clsSocioeconomicAside input:checked').removeAttr('checked');
        $('.SocioecAside').prop('checked', false);
        $('.SocioecAside').parent().parent().parent().css("background-color", "");

        $(OKSocioAside).each(function (index, element) {
            if (OKSocioAside[index]) {
                $('.clsSocioeconomicAside input:checkbox[value="' + OKSocioAside[index].value + '"]').prop('checked', true);
                $('.clsSocioeconomicAside input:checkbox[value="' + OKSocioAside[index].value + '"]').parent().parent().parent().css("background-color", "#e8cfff");
            }
           
        });

        $('#MysocioAside').modal('hide');

        SocioCountAside();
        /* if (document.URL.includes("QuestionParams")) {
             const aside = document.getElementById("scriptEleSetAside");
             aside.parentNode.removeChild(aside);
         }*/
    });

    $(document).on('change', '.SocioecAside', function () {

        if (this.checked) {
            if (socioFieldType == 'set-aside-2') {
                if ($('input.SocioecAside').filter(':checked').length > 1) {
                    $('input.SocioecAside:not(:checked)').attr('disabled', 'disabled');
                    $("#OKSocioAside").removeAttr('disabled');
                } 
                 // OKSocioAside.push({ value: this.value, text: this.id });
            } else if (socioFieldType == 'set-aside-1') {
                if ($('input.SocioecAside').filter(':checked').length == 1) {
                    $('input.SocioecAside:not(:checked)').attr('disabled', 'disabled');
                    $("#OKSocioAside").removeAttr('disabled');
                }
                // OKSocioAside.push({ value: this.value, text: this.id });
            }
            

            $(this).parent().parent().parent().css("background-color", "#e8cfff");
        }
        else {
          
            if (socioFieldType == 'set-aside-2') {
              //  OKSocioAside = OKSocioAside.filter((item) => item.text !== this.id);
                $('input.SocioecAside').removeAttr('disabled');
               
                $("#OKSocioAside").attr('disabled', 'true');
            }
            if (socioFieldType == 'set-aside-1') {
                //  OKSocioAside = OKSocioAside.filter((item) => item.text !== this.id);
                $('input.SocioecAside').removeAttr('disabled');

                $("#OKSocioAside").attr('disabled', 'true');
            }
            $(this).parent().parent().parent().css("background-color", "");
        }

        //ListSocioAside();

    });

    function ListSocioAside() {
        $(".SocioList").html("");
        for (i = 0; i < OKSocioAside.length; i++) {
            var value = OKSocioAside[i].value;
            var text = OKSocioAside[i].text;
            $(".SocioList").append($("<div style='width: fit-content;font-size: 11px;font-weight: 200;padding: 10px 6px 0px 6px;1px solid #e8e8e8;float: left;'><label style='font-weight: 400;' id=" + value + ">" + text + "</label><span style='margin-left: 6px;color: #ce0404;'><i class='fas fa-times'></i></span></div>"));
        }
    }

    function SocioCountAside() {

        if (OKSocioAside.length > 0) {
            $('.OpenMinContSizeAside').val(OKSocioAside[0].text);
            $("#Res_totalSocio_Aside").css("display", "block");
            $('#lblRes_SocioAside').text(OKSocioAside.length - 1);
        }
        else {
            $("#Res_totalSocio_Aside").css("display", "none");
            $('#lblRes_SocioAside').text("");
            $('.OpenMinContSizeAside').val('');
        }
    }
})

function GetSocioEconomicAside(type) {
    socioFieldType = type;
    const url = type == 'set-aside' ? "/ContractSearch/Get_SocioEconomic" : '/AnswerWizard/GetTypeOfSetAisde';
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url,
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                SocioArr.push(result);

                $('#tbl_SocioAside').show();

                var filldata = "";
                $('#tbl_SocioAside').dataTable().fnDestroy();
                const urlParams = new URLSearchParams(window.location.search);
                const question_id = urlParams.get('id');
                const bothFlag = question_id==6?true:false
                for (i = 0; i < result.length; i++) {
                    var text = result[i].abbreviation;
                    var value = result[i].abbreviation;
                    var descriprion = result[i].Business_type_description;

                    filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + descriprion + '</td><td>' + text + '</td><td><label class="container"><input id="' + descriprion + '" class="SocioecAside" type="checkbox" value="' + value + '"><span class="checkmark0"></span></label></td></tr>';
                }
               
                $('#tbody_Aside').html(filldata);
                $('#tbl_SocioAside').DataTable({
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

                if (typeof answerWidgetSocioCheck == 'function') {
                    
                    answerWidgetSocioAsideCheck();
                }
                if (typeof renderSetAsideForFixedUI == 'function') {

                    renderSetAsideForFixedUI();
                }
                if (type == "set-aside-2") {
                    $("#set-aside-modal-heading").html("Choose Two Contract Set-Asides")
                    $("#OKSocioAside").attr('disabled', 'true');
                    if ($('input.SocioecAside').filter(':checked').length > 1) {
                        $('input.SocioecAside:not(:checked)').attr('disabled', 'disabled');
                        $("#OKSocioAside").removeAttr('disabled');
                    }
                } else if (type == "set-aside-1") {
                    $("#set-aside-modal-heading").html("Choose One Contract Set-Aside")
                    $("#OKSocioAside").attr('disabled', 'true');
                    if ($('input.SocioecAside').filter(':checked').length == 1) {
                        $('input.SocioecAside:not(:checked)').attr('disabled', 'disabled');
                        $("#OKSocioAside").removeAttr('disabled');
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