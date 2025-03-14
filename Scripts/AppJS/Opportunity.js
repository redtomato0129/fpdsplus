var DeptCombo = [];
var Agencycombo = [];
var NaicsCode = [];
var NaicsCode_R = [];
var NaicsCode_1st = [];

var Businesssize = "";
var DepartmentCode = [];
var Departmentcode_R = [];
var DepartmentAgencycode_1st = [];


var AgencyCode = [];
var AgencyCode_R = [];
var getval = [];
var getSocioText = [];
var NAICS_mode = "";
var PSC_mode = "";
var userinfo = "";
var origin = window.location.origin;
var Type = ""
var PSC = [];
var PSC_R = [];
var PSC_1st = [];
var NaicsType = "Code";
var Agencycombolength = "";
var NaicsDesc = [];
var DepartmentDescription = [];
var AgencyDescription = [];
var AgencyDesc = [];
var PSCDesc = [];
var BaseType = [];
var CancelPSC = [];
var Mode = "";

// naics code //
var max = 100;
var cnt = 2;

// naics Family //
var maxFam = 100;
var cntFam = 2;

// PSC  //
var maxpsc = 3847;
var cntpsc = 2;

// DPT/Agrncy //
var cntdept = 2;
var cntagency = 2;
var MC_AutoBindData = 0;
let MarketContext_DepartmentBind = [];
let MarketContext_NaicsCode = [];
let MarketContext_PSC = [];

var OKSocio = [];

var searchParameters = {};

function copyToClipboard() {
    //var tempInput = document.createElement('input');
    //tempInput.value = window.location.href;
    //document.body.appendChild(tempInput);
    //tempInput.select();
    //tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    //document.execCommand('copy');
    //document.body.removeChild(tempInput);

    //swal.fire({
    //    title: "",
    //    text: "URL copied to clipboard!",
    //    type: "success",
    //    showCancelButton: false,
    //    showConfirmButton: false,
    //    timer: 3000,
    //})
    $('#btnOpportunity').trigger('click', { isCopyClipBoard: true });


    swal.fire({
        title: "",
        text: "URL copied to clipboard!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}

$(document).ready(function () {
    set_Helpicon();
    GetUserInfo();
    getDept();
    Type = 'Type1';


    $('.OS_heading').hide();
    $('.OpenDeptPopup').disableAutoFill();

    jQuery('#txtposteddatestart').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    jQuery('#txtposteddateend').datepicker({
        autoclose: true,
        todayHighlight: true
    });


    //jQuery('#txtposteddatestart').datepicker({
    //    autoclose: true,
    //    todayHighlight: true
    //});
    //jQuery('#txtposteddateend').datepicker({
    //    autoclose: true,
    //    todayHighlight: true
    //});
    //var date = new Date();
    //var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

    //$('#txtposteddatestart').datepicker('setDate', today);

    //$('#txtposteddateend').datepicker('setDate', new Date());

    // ========================== string query params =========================//

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var deptname = getParameterByName("Dept");
    dept = getParameterByName("DeptCode");
    var Agency = getParameterByName("Agency");
    AgencyCode = getParameterByName("AgencyCode");
    Naics = getParameterByName("Naics");
    PDS = getParameterByName("PDS");
    PDE = getParameterByName("PDE");
    SAC = getParameterByName("SAC");
    BaseType = getParameterByName("BaseType");
    SetAside = getParameterByName("SetAside");
    PSC = getParameterByName("PSC");
    Mode = getParameterByName("Mode");

    var len = Naics.length;

    $('#AlertMsg').text('');


    if (dept != "") {
        $(".TypeTwo").trigger("click");
        Type = 'Type2';
        $('.OpenDeptPopup').val(deptname);
        $('#txtagency_1').val(Agency);

        $('#txtdept_2').val(deptname);
        $('#lbldept_2').text(dept);
        $('#txtagency_2').val(Agency);
        $('#lblagency_2').text(AgencyCode);
        if (len == 6) {

            $('#txtnaicscode_1').val(Naics);
            $('#txtnaicscode_2').val(Naics);
            GetNaics(Naics);

        }
        else {

            $('#txtnaicsfamcode_1').val(Naics);
            $('#txtnaicsfamcode_2').val(Naics);
            GetNaicsFamily(Naics);
        }
        if (PDS != "" && PDE != "") {
            $('#txtposteddatestart').val(PDS);
            $('#txtposteddateend').val(PDE);

        }
        else {
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

            $('#txtposteddatestart').datepicker('setDate', today);

            $('#txtposteddateend').datepicker('setDate', new Date());
        }

        setTimeout(function () {
            $("#btnOpportunity").trigger("click");

        }, 1000);


    }

    if (BaseType != "") {
        $(".TypeTwo").trigger("click");
        Type = 'Type2';
        $('#txtbasetype').val(BaseType);
        if (len == 6) {

            $('#txtnaicscode_1').val(Naics);
            $('#txtnaicscode_2').val(Naics);
            GetNaics(Naics);

        }
        else {

            $('#txtnaicsfamcode_1').val(Naics);
            $('#txtnaicsfamcode_2').val(Naics);
            GetNaicsFamily(Naics);
        }
        if (PDS != "" && PDE != "") {
            $('#txtposteddatestart').val(PDS);
            $('#txtposteddateend').val(PDE);

        }
        else {
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('data');
            let paramData;
            if (myParam) {
                paramData = JSON.parse(myParam);
            }
            $('#txtposteddatestart').datepicker('setDate',today);

            $('#txtposteddateend').datepicker('setDate',new Date());
        }

        setTimeout(function () {
            $("#btnOpportunity").trigger("click");

        }, 1000);



    }

    if (SAC != "") {
        $(".TypeTwo").trigger("click");
        Type = 'Type2';


        if (len == 6) {

            $('#txtnaicscode_1').val(Naics);
            $('#txtnaicscode_2').val(Naics);
            GetNaics(Naics);

        }
        else {

            $('#txtnaicsfamcode_1').val(Naics);
            $('#txtnaicsfamcode_2').val(Naics);
            GetNaicsFamily(Naics);
        }
        if (PDS != "" && PDE != "") {
            $('#txtposteddatestart').val(PDS);
            $('#txtposteddateend').val(PDE);

        }
        else {
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

            $('#txtposteddatestart').datepicker('setDate', today);

            $('#txtposteddateend').datepicker('setDate', new Date());
        }

        setTimeout(function () {
            var SBspl = SAC.split(',');
            $(SBspl).each(function (index, element) {
                $('.clsSocioeconomic input:checkbox[value="' + SBspl[index] + '"]').prop('checked', true);

            });


            $('.clsSocioeconomic input:checked').each(function () {
                var text = $(this).attr('id');
                $('.OpenMinContSize').val(text);
                var html = '<label class="lbl_S001" calss="selectcheck" title="' + text + '">' + text + '</label>';
                $('.multiSel').append(html);

            });
            //$('.clsSocioeconomic input:checkbox[value="' + SAC + '"]').prop('checked', true);
            $("#btnOpportunity").trigger("click");

        }, 1000);


    }

    if (Mode != "") {
        $(".TypeTwo").trigger("click");
        Type = 'Type2';
        if (Naics != "") {
            if (len == 6) {

                $('#txtnaicscode_1').val(Naics);
                $('#txtnaicscode_2').val(Naics);
                GetNaics(Naics);

            }
            else {

                $('#txtnaicsfamcode_1').val(Naics);
                $('#txtnaicsfamcode_2').val(Naics);
                GetNaicsFamily(Naics);
            }
        }
        else {
            $('#txtpsccode_1').val(PSC);
            $('#txtpsccode_2').val(PSC);
            getpsc(PSC);
        }
        if (PDS != "" && PDE != "") {
            $('#txtposteddatestart').val(PDS);
            $('#txtposteddateend').val(PDE);

        }
        else {
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

            $('#txtposteddatestart').datepicker('setDate', today);

            $('#txtposteddateend').datepicker('setDate', new Date());
        }

        setTimeout(function () {
            $("#btnOpportunity").trigger("click");

        }, 1000);
    }


    if (dept == "" && BaseType == "" && SAC == "" && Mode == "") {
        GetMasterData();
    }

    function GetMasterData() {


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/GetMarketContextMasterID",
            data: "{}",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        MasterID = result[i].TransId;
                        var MarketContext_Name = result[i].MarketContext_Name;

                        var getMasrkertContext = GetMarketContextUseage(MasterID);
                        if (getMasrkertContext != "") {
                            LoadData(MasterID);
                        }
                    }
                }
            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }

    function GetMarketContextUseage(MasterID) {
        var Result = "";
        let MarketContext = {}
        MarketContext.MasterID = MasterID;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/GetMarketContextUseage",
            data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result[0].Active == "True") {
                    Result = result[0].Active;
                }
                else {
                    Result = "";
                }
            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });

        return Result;

    }

    function LoadData(MasterID) {
        var filldata_Naics = '';
        var filldata_PSC = '';
        var filldata_Department_Agency = '';


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/GetMarketContext",
            data: "{'MasterID': '" + MasterID + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                const urlParams = new URLSearchParams(window.location.search);
                const myParam = urlParams.get('data');
                let paramData;
                if (myParam) {
                    paramData = JSON.parse(myParam);
                }
                if (result.length > 0) {
                    MC_AutoBindData = 1;
                    $(".TypeTwo").trigger("click");
                    $(':radio[value="ALL"]').prop('checked', true);
                    Businesssize = "ALL";

                    for (var i = 0; i < result.length; i++) {

                        if (result[i].Type == "Naics" || result[i].Type == "NaicsFamily") {

                            // ####### Naics Arr ####### //
                            MarketContext_NaicsCode.push({ Description: result[i].Description, Code: result[i].Code });

                        }
                        else if (result[i].Type == "PSC") {

                            // ####### PSC Arr ####### //
                            MarketContext_PSC.push({ Description: result[i].Description, Code: result[i].Code });

                        }
                        else if (result[i].Type == "Department_Agency") {

                            var Code = result[i].Code.split('/');
                            var Description = result[i].Description.split('/');

                            var DeptDesc = paramData ? paramData.SearchOpportunity.department_name : Description[0];
                            var AgencyDesc = paramData ? paramData.SearchOpportunity.agency_name : Description[1];

                            var DeptCode = paramData ? paramData.SearchOpportunity.department_code : Code[0];
                            var AgencyCode = paramData ? paramData.SearchOpportunity.agency_code : Code[1];

                            // ####### Dept/Agency Arr ####### //
                            MarketContext_DepartmentBind.push({ DeptDesc: DeptDesc, DeptCode: DeptCode, AgencyDesc: AgencyDesc, AgencyCode: AgencyCode });
                        }
                    }


                    if (paramData && paramData.SearchOpportunity.NAICS) {
                        MarketContext_NaicsCode = [];
                        paramData.SearchOpportunity.NAICS.split(',').forEach((item, index) => {
                            MarketContext_NaicsCode.push({
                                Description: paramData.SearchOpportunity.naics_name.split(',')[index],
                                Code: item
                            })
                        });

                    }
                    // ################## Bind MarketContext Data ################## //

                    // ============================================ NaicsCode ========================================= //
                    if (MarketContext_NaicsCode.length > 0) {
                        if (MarketContext_NaicsCode[0].Code.length == 4) {

                            NAICS_mode = "NaicsFamCode";
                            NaicsType = "Code";
                            $('.btn-toggle_Naics').trigger('click');

                            $('#txtnaicsfamcode_1').val(MarketContext_NaicsCode[0].Code);
                            $('#txtnaicsfamdesc_1').val(MarketContext_NaicsCode[0].Description);

                            $('#txtnaicsfamcode_2').val(MarketContext_NaicsCode[0].Code);
                            $('#txtnaicsfamdesc_2').val(MarketContext_NaicsCode[0].Description);


                            for (var i = 1; i < MarketContext_NaicsCode.length; i++) {
                                addnaicsfamily();
                                var NaicsCodeCount = cnt++;
                                NaicsCodeCount = (NaicsCodeCount + 1);

                                $('#txtnaicsfamcode_' + NaicsCodeCount).val(MarketContext_NaicsCode[i].Code);
                                $('#txtnaicsfamdesc_' + NaicsCodeCount).val(MarketContext_NaicsCode[i].Description);

                            }

                            CloseNaicsFamilyPopup();
                        }
                        else if (MarketContext_NaicsCode[0].Code.length == 6) {

                            NAICS_mode = "NaicsCode";
                            //NaicsType = "Family";
                            //$('.btn-toggle_Naics').trigger('click');

                            $('#txtnaicscode_1').val(MarketContext_NaicsCode[0].Code);
                            $('#txtnaicsdesc_1').val(MarketContext_NaicsCode[0].Description);

                            $('#txtnaicscode_2').val(MarketContext_NaicsCode[0].Code);
                            $('#txtnaicsdesc_2').val(MarketContext_NaicsCode[0].Description);

                            for (var i = 1; i < MarketContext_NaicsCode.length; i++) {
                                addnaicscode();
                                var NaicsFamilyCodeCount = cntFam++;
                                NaicsFamilyCodeCount = (NaicsFamilyCodeCount + 1);
                                $('#txtnaicscode_' + NaicsFamilyCodeCount).val(MarketContext_NaicsCode[i].Code);
                                $('#txtnaicsdesc_' + NaicsFamilyCodeCount).val(MarketContext_NaicsCode[i].Description);
                            }

                            closeNaicsCodePopup();
                        }
                    }
                    // ============================================ NaicsCode ========================================= //





                    if (MarketContext_PSC.length > 0) {
                        if (MarketContext_PSC[0].Code != "") {
                            $('#txtpsccode_1').val(MarketContext_PSC[0].Code);
                            $('#txtpscdesc_1').val(MarketContext_PSC[0].Description);

                            $('#txtpsccode_2').val(MarketContext_PSC[0].Code);
                            $('#txtpscdesc_2').val(MarketContext_PSC[0].Description);


                            for (var i = 1; i < MarketContext_PSC.length; i++) {

                                //$('.add-textboxpsc').trigger('click');
                                addpsc();
                                //var PSCCodeCount = cntpsc++;
                                //PSCCodeCount = (PSCCodeCount + 1);

                                $('#txtpsccode_' + cntpsc).val(MarketContext_PSC[i].Code);
                                $('#txtpscdesc_' + cntpsc).val(MarketContext_PSC[i].Description);

                            }

                            ClosePSCPopup();
                        }
                    }

                    // ============================================ Dept/Agecny ============================================ //
                    if (MarketContext_DepartmentBind.length > 0) {
                        $('#txtdept_2').val(MarketContext_DepartmentBind[0].DeptDesc);
                        $('#DepartmentDDL').val(MarketContext_DepartmentBind[0].DeptDesc);

                        $('#lbldept_2').text(MarketContext_DepartmentBind[0].DeptCode);

                        $('#txtagency_2').val(MarketContext_DepartmentBind[0].AgencyDesc);
                        $('#AgencyDDL').val(MarketContext_DepartmentBind[0].AgencyDesc);


                        $('#lblagency_2').text(MarketContext_DepartmentBind[0].AgencyCode);

                        for (var i = 1; i < MarketContext_DepartmentBind.length; i++) {
                            adddepartment();
                            addagency();

                            var DeptCount = cntdept;
                            var AgencyCount = cntagency;
                            cntdept++;
                            cntagency++;
                            $('#txtdept_' + DeptCount).val(MarketContext_DepartmentBind[i].DeptDesc);
                            $('#lbldept_' + DeptCount).text(MarketContext_DepartmentBind[i].DeptCode);

                            $('#txtagency_' + AgencyCount).val(MarketContext_DepartmentBind[i].AgencyDesc);
                            $('#lblagency_' + AgencyCount).text(MarketContext_DepartmentBind[i].AgencyCode);
                        }
                    }
                    CloseDeptAgencyPopup();
                    // ============================================ Dept/Agecny ============================================ //

                    Type = 'Type2'; // Assign Type as Type2 to search as AdvanceSearch

                    // ################## Bind MarketContext Data ################## //
                }
                if (paramData) {
                    $("#txtbasetype").val(paramData.SearchOpportunity.BaseType);
                }
                


            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }
    // ========================== string query params =========================//


    var table = $('#opportunityreportData').DataTable();

    table
        .clear()
        .draw();
    $('#opportunityreportData').parents('div.dataTables_wrapper').first().hide();


    $('[data-toggle="tooltip"]').tooltip({

        'placement': 'left'

    });
    $('[data-toggle="popover"]').popover({
        'placement': 'bottom'
    });
    $('#popoverOption').popover({ trigger: "hover" });

    GetSocioEconomic();

    getBasyType();

    $(".dropdown dt div").on('click', function () {
        $(".dropdown dd ul").slideToggle('fast');
        $('.SearchFields').css({ 'margin-top': '80px' });
    });

    $(".dropdown dd ul li div").on('click', function () {
        $(".dropdown dd ul").hide();
        $('.SearchFields').css({ 'margin-top': '40px' });
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt div span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });


    $('.mutliSelect input[type="checkbox"]').on('click', function () {
        var id = $(this).val();
        var index = getval.indexOf(id);

        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
            title = $(this).val() + ",";


        if ($(this).is(':checked')) {


            var html = '<label class="lbl_S001" calss="selectcheck" title="' + title + '">' + title + '</label>';
            $('.multiSel').append(html);
            getval.push(id);
            $(".hida").hide();

        } else {
            $('label[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            getval.splice(index, 1);

        }
    });

    //=============================== Add NaicsFamily New fieds ==========================================//

    $(document).on('click', '#txtnaicsfamcode_1', function () {

        $('.add-textboxfammodal').trigger('click');

    });

    $(document).on("click", ".add-textboxfammodal", function (e) {

        $('#NaicsfamilyModal').modal('show');
        NaicsCode_R = [];
        NaicsCode_R = NaicsCode.slice();
        setTimeout(function () {
            $("#txtnaicsfamcode_2").focus();
        }, 1000);

    });

    $(document).on("click", ".add-textboxfam", function (e) {
        var Naics = $("#txtnaicsfamcode_2").val();

        if (Naics != "") {
            addnaicsfamily();
        }
        else {
            swal("", "Please enter at least one Naics family field !", "Info");
        }
    });

    $(document).on('click', '#btnnaicsfamrowclear_1', function () {
        $('.add-textboxfammodal').trigger('click');

    });







    //=============================== Add NaicsFamily New fieds ==========================================//

    //=============================== Remove NaicsFamily New fieds ==========================================//
    $(document).on("click", ".remove-textboxfam", function () {
        //e.preventDefault();
        var getId = (this.id);

        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);


        //var removeItem = $('#txtnaicsfamcode_' + id).val();
        //NaicsCode = jQuery.grep(NaicsCode, function (value) {
        //    return value != removeItem;
        //});

        $('#txtnaicsfamcode_' + id).val("");
        $('#txtnaicsfamdesc_' + id).val("");
        $(".naicsFam_" + id).remove();
        //cntFam--;

    });
    //=============================== Remove NaicsFamily New fieds ==========================================//

    //=============================== Add NaicsCode New fieds ==========================================//

    $(document).on('click', '#txtnaicscode_1', function () {

        // $('.add-textboxcodemodal').trigger('click');
        $('#NaicsCodeModal').modal('show');
        NaicsCode_R = [];
        NaicsCode_R = NaicsCode.slice();
        setTimeout(function () {
            $("#txtnaicscode_2").focus();
        }, 1000);
    });

    $(document).on("click", ".add-textboxcodemodal", function (e) {

        $('#NaicsCodeModal').modal('show');
        NaicsCode_R = [];
        NaicsCode_R = NaicsCode.slice();
        setTimeout(function () {
            $("#txtnaicscode_2").focus();
        }, 1000);
    });
    $(document).on("click", ".add-textboxcode", function (e) {

        var Naics = $("#txtnaicscode_2").val();

        if (Naics != "") {
            addnaicscode();
        }
        else {
            swal("", "Please enter at least one Naics Code field !", "info");
        }

    });
    $(document).on('click', '#btnnaicsfourrowclear_1', function () {
        $('.add-textboxcodemodal').trigger('click');

    });









    //=============================== Add NaicsCode New fieds ==========================================//

    //=============================== Remove NaicsCode New fieds ==========================================//
    $(document).on("click", ".remove-textboxnaicsfour", function () {
        //e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        //var removeItem = $('#txtnaicscode_' + id).val();
        //NaicsCode = jQuery.grep(NaicsCode, function (value) {
        //    return value != removeItem;
        //});

        $('#txtnaicscode_' + id).val("");
        $('#txtnaicsdesc_' + id).val("");
        //$(this).parents(".naics").remove();
        $('.naics_' + id).remove();
        //cnt--;





    });
    //=============================== Remove NaicsCode New fieds ==========================================//

    //=============================== Add ProductServiceCode New fieds ==========================================//


    $(document).on('click', '#txtpsccode_1', function () {

        // $('.add-textboxmodalpsc').trigger('click');
        PSC_R = [];
        PSC_R = PSC.slice();
        setTimeout(function () {
            $("#txtpsccode_2").focus();
        }, 1000);


        $('#PscModal').modal('show');
    });

    $(document).on("click", ".add-textboxmodalpsc", function (e) {
        // $('#PscModal').modal('show');
        PSC_R = [];
        PSC_R = PSC.slice();
        setTimeout(function () {
            $("#txtpsccode_2").focus();
        }, 1000);


        $('#PscModal').modal('show');


    });


    $(document).on("click", ".add-textboxpsc", function () {

        var Psc = $("#txtpsccode_2").val();

        if (Psc != "") {
            addpsc();
        }
        else {
            swal("", "Please enter at least one Product or Service Code !", "info");
        }

    });
    $(document).on('click', '#btnpscrowclear_1', function () {

        $('#txtpsccode_2').val("");
        $('#txtpscdesc_2').val("");
        $('.add-textboxmodalpsc').trigger('click');

    });







    //$(".add-textboxpsc").on("click", function (e) {

    //});
    //===============================  Add ProductServiceCode New fieds ==========================================//

    //=============================== Remove ProductServiceCode New fieds ==========================================//

    $(document).on("click", ".remove-textboxpsc", function () {
        //e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        //var removeItem = $('#txtpsccode_' + id).val();
        //NaicsCode = jQuery.grep(NaicsCode, function (value) {
        //    return value != removeItem;
        //});

        $('#txtpsccode_' + id).val("");
        $('#txtpscdesc_' + id).val("");
        //$(this).parents(".naics").remove();
        $('.psc_' + id).remove();
        //cnt--;





    });

    //=============================== Remove ProductServiceCode New fieds ==========================================//


    //=============================== Add Department New fieds ==========================================//




    $(".add-textboxdept").on("click", function (e) {
        var dept = $("#txtdept_2").val();

        if (dept != "") {
            e.preventDefault();

            adddepartment();


            addagency();

        }
        else {

            swal("", "Please enter at least one Funding Agency !", "info");


        }

    });


    //===============================  Add Department New fieds ==========================================//


    //=============================== Remove Department New fieds ==========================================//
    $(document).on("click", ".remove-textboxdept", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var removeItem = $('#txtdept_' + id).val();
        DepartmentCode = jQuery.grep(DepartmentCode, function (value) {
            return value != removeItem;
        });

        $('#txtdept_' + id).val("");

        $(".dept_" + id).remove();
        $(".agency_" + id).remove();


        //cntdept--;

    });
    //=============================== Remove Department New fieds ==========================================//

    //=============================== Remove Agency New fieds ==========================================//
    $(document).on("click", ".remove-textboxagency", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var removeItem = $('#txtagency_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });

        $('#txtagency_' + id).val("");

        $(this).parents(".agency").remove();
        cntagency--;





    });
    //=============================== Remove Agency New fieds ==========================================//

    //=============================== Add Agency New fieds ==========================================//


    $(".add-textboxagency").on("click", function (e) {
        var agency = $("#txtagency_2").val();
        var lblagency = $(".lblagency").text();
        if (agency != "") {

            e.preventDefault();

            addagency();
            AgencyCode = [];
            AgencyCode.push(lblagency);

        }
        else {

            swal("", "Please enter at least one Agency field !");

            //alert("Ps add Atleast one department");
        }

    });








    //===============================  Add Agency New fieds ==========================================//


    //=============================== modal popup Departement and agency close start ==========================================//

    $(document).on('click', '#btnmdclose', function () {

        CloseDeptAgencyPopup();
        $('#myModal').modal('toggle');
    });

    function CloseDeptAgencyPopup() {

        //============= Remove blank rows =========//
        var len = "";
        $(".DeptMainrows").get().forEach(function (entry, index, array) {
            // Here, array.length is the total number of items
            var i = index;
            var e = entry.id;
            var spl = e.split('_');

            var Deptdesc = $('#txtdept_' + spl[1]).val();
            if (Deptdesc == "" || Deptdesc == undefined) {
                $('.dept_' + spl[1]).remove();
                $('.agency_' + spl[1]).remove();
            }

            len = array.length;
            if (len == (i + 1)) {
                if ($('#txtdept_2').val() == "") {

                    $('#txtdept_2').val($('#txtdept_' + spl[1]).val());
                    $('#lbldept_2').text($('#lbldept_' + spl[1]).text());
                    $('#txtagency_2').val($('#txtagency_' + spl[1]).val());
                    $('#lblagency_2').text($('#lblagency_' + spl[1]).text());

                    $('.dept_' + spl[1]).remove();
                    $('.agency_' + spl[1]).remove();

                }
            }
        });
        //============= Remove blank rows =========//
        DepartmentCode = [];
        AgencyCode = [];
        //============= Count Agency =========//
        $(".lblagency").each(function () {

            var agency = $(this).text();
            AgencyCode.push(agency);
            AgencyCode = AgencyCode.filter(item => item);
            AgencyCode = AgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            $('#txtagency_1').val(AgencyCode[0]);

        });
        //============= Count Agency =========//

        //============= Count Departmrnt =========//
        $(".lbldept").each(function () {
            var deptcheck = $('#txtdept_2').val();

            var dept = $(this).text();
            DepartmentCode.push(dept);
            DepartmentCode = DepartmentCode.filter(item => item);
            DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

            if (deptcheck != "") {
                if (DepartmentCode.length > 1) {
                    $('#lbltotaldept').show();
                    $('#lbltotaladdedrowdept').text((DepartmentCode.length - 1));


                }
                else {
                    $('#lbltotaldept').hide();
                    $('#lbltotaladdedrowdept').text('');
                }
            }
            $('#txtdept_1').val(DepartmentCode[0]);

        });
        //============= Count Departmrnt =========//



        if (AgencyCode.length > 0) {
            if (AgencyCode.length == DepartmentCode.length) {

            }
            else {
                swal("", "Please fix the following <br/>1.  Choose an agency on all rows <br/>OR<br/>  2.  Leave all agencies choices empty.", "info");
                return false;
            }
        }




        $('#lbltotaldept').click(function () {
            $('#myModal').modal('show');
            setTimeout(function () {
                $("#txtdept_2").focus();
                Departmentcode_R = [];
                Departmentcode_R = DepartmentCode.slice();

                AgencyCode_R = [];
                AgencyCode_R = AgencyCode.slice();
            }, 1000);
        });

        // Bind Data to Search fields //
        $('#txtdept_1').val($('#txtdept_2').val());
        $('#txtagency_1').val($('#txtagency_2').val());
        //$("#txtagency_1").prop('disabled', true);
    }





    //=============================== modal popup Departement and agency close end ==========================================//

    //=============================== modal popup Psc close start ==========================================//




    $(document).on("click", "#lbltotalpsc", function (e) {
        PSC_R = [];
        PSC_R = PSC.slice();
        $('#PscModal').modal('show');

    });




    //=============================== modal popup Psc close end ==========================================//




    //=============================== modal popup Naics Family close start ==========================================//

    $(document).on("click", "#btnmdnaicsfamilyclose", function (e) {
        CloseNaicsFamilyPopup();
        $('#NaicsfamilyModal').modal('toggle');
    });

    function CloseNaicsFamilyPopup() {
        NaicsCode = [];

        //============= Remove blank rows =========//
        var len = "";
        $(".NaicsFamRow").get().forEach(function (entry, index, array) {
            // Here, array.length is the total number of items
            var i = index;
            var e = entry.id;
            var spl = e.split('_');

            var N_FamCode = $('#txtnaicsfamcode_' + spl[1]).val();
            if (N_FamCode == "" || N_FamCode == undefined) {
                $('.naicsFam_' + spl[1]).remove();
            }

            len = array.length;
            if (len == (i + 1)) {
                if ($('#txtnaicsfamcode_2').val() == "") {
                    $('#txtnaicsfamcode_2').val($('#txtnaicsfamcode_' + spl[1]).val());
                    $('#txtnaicsfamdesc_2').val($('#txtnaicsfamdesc_' + spl[1]).val());
                    $('.naicsFam_' + spl[1]).remove();
                }
            }
        });

        NaicsCode = [];
        $(".NaicsFamCode").each(function () {

            var naicsfamilycheck = $('#txtnaicsfamcode_2').val();
            var naicsfam = $(this).val();
            NaicsCode.push(naicsfam);
            NaicsCode = NaicsCode.filter(item => item);
            NaicsCode = NaicsCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            if (naicsfamilycheck != "") {
                if (NaicsCode.length > 1) {
                    $('#lbltotalnaicsfamily').show();
                    $('#lbltotaladdedrownaicsfamily').text((NaicsCode.length - 1));
                }
                else {
                    $('#lbltotalnaicsfamily').hide();
                }
            }
            NaicsCode_R = NaicsCode.slice();
        });



        $('#txtnaicsfamcode_1').val($('#txtnaicsfamcode_2').val());
        $('#txtnaicsfamdesc_1').val($('#txtnaicsfamdesc_2').val());
    }


    $(document).on("click", "#lbltotalnaicsfamily", function (e) {
        NaicsCode_R = [];
        NaicsCode_R = NaicsCode.slice();
        $('#NaicsfamilyModal').modal('show');

    });

    //=============================== modal popup Naics Family close end ==========================================//

    //=============================== modal popup Naics Code close start ==========================================//
    $(document).on("click", "#btnmdnaicscodeclose", function (e) {

        closeNaicsCodePopup();
        $('#NaicsCodeModal').modal('toggle');
    });

    function closeNaicsCodePopup() {

        NaicsCode = [];

        //============= Remove blank rows =========//
        var len = "";
        $(".NaicsCodeRow").get().forEach(function (entry, index, array) {
            // Here, array.length is the total number of items
            var i = index;
            var e = entry.id;
            var spl = e.split('_');

            var N_Code = $('#txtnaicscode_' + spl[1]).val();
            if (N_Code == "" || N_Code == undefined) {
                $('.naics_' + spl[1]).remove();
            }

            len = array.length;
            if (len == (i + 1)) {
                if ($('#txtnaicscode_2').val() == "") {

                    $('#txtnaicscode_2').val($('#txtnaicscode_' + spl[1]).val());
                    $('#txtnaicsdesc_2').val($('#txtnaicsdesc_' + spl[1]).val());


                    $('.naics_' + spl[1]).remove();

                }
            }
        });

        setTimeout(function () {

            $(".NaicsCode").each(function () {

                var naicscodecheck = $('#txtnaicscode_2').val();
                var naicscode = $(this).val();
                NaicsCode.push(naicscode);
                NaicsCode = NaicsCode.filter(item => item);
                NaicsCode = NaicsCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                if (naicscodecheck != "") {
                    if (NaicsCode.length > 1) {
                        $('#lbltotalnaics').show();
                        $('#lbltotaladdedrownaics').text((NaicsCode.length - 1));
                    }
                    else {
                        $('#lbltotalnaics').hide();
                    }
                }

                NaicsCode_R = NaicsCode.slice();
            });

            $('#txtnaicscode_1').val($('#txtnaicscode_2').val());
            $('#txtnaicsdesc_1').val($('#txtnaicsdesc_2').val());


        }, 200);

        //============= Remove blank rows =========//
    }

    $(document).on("click", "#lbltotalnaics", function (e) {
        NaicsCode_R = [];
        NaicsCode_R = NaicsCode.slice();
        $('#NaicsCodeModal').modal('show');
    });
    //=============================== modal popup Naics Code close end ==========================================//



    //=============================== NAICS Family code ========================================//
    $(document).on('keyup', '.NaicsFamCode', function () {

        var NFC = this.id;

        var spl = NFC.split('_')

        var NAICSFamCode = $('#' + NFC).val();
        if (NAICSFamCode.length == '4') {
            $('#AlertMsg').text('');
            $('.Apploader').show();

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetNAICSFam",
                data: "{'Code': '" + NAICSFamCode + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        $('#txtnaicsfamdesc_' + spl[1]).val(result[0]);
                        //$(".dis_able1").attr('disabled', 'disabled');
                        NAICS_mode = "NaicsFamCode";

                        //NaicsCode.push(NAICSFamCode);
                        $('.Apploader').hide();
                    }
                    else {
                        $(".NaicsFamCode").blur();
                        swal("", "No Data Found !", "info");
                    }

                    $('.Apploader').hide();

                },
                error: function ajaxError(err) {
                    swal("", err);
                    $('.Apploader').hide();
                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Family Code should be exactly 4 Digits ! ***');
        }

    });
    //=============================== NAICS Family code ==========================================//


    //=============================== NAICS  code ==========================================//
    $(document).on('keyup', '.NaicsCode', function (e) {

        var NFC = this.id;

        var spl = NFC.split('_')

        var NaicsCodeval = $('#' + NFC).val();
        if (NaicsCodeval.length == '6') {
            $('#AlertMsg').text('');
            $('.Apploader').show();

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetNAICSFam",
                data: "{'Code': '" + NaicsCodeval + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        $('#txtnaicsdesc_' + spl[1]).val(result[0]);
                        //$(".dis_able0").attr('disabled', 'disabled');

                        //NaicsCode.push(NaicsCodeval);
                        $(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {

                        $(".NaicsCode").blur();

                        swal("", "No Data Found !", "info");



                    }

                    $('.Apploader').hide();

                },
                error: function ajaxError(err) {
                    swal("", err);
                    $('.Apploader').hide();
                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }

    });

    //$(document).keyup(function (e) {
    //    if (e.keyCode === 13) {

    //        $('.swal2-confirm').trigger("click");
    //    }   
    //});
    //=============================== NAICS code ==========================================//


    //=============================== Psc  code ==========================================//
    $(document).on('keyup', '.PSCode', function () {

        var PSC = this.id;

        var spl = PSC.split('_');

        var PSCCodeval = $('#' + PSC).val();

        $('#AlertMsg').text('');
        $('.Apploader').show();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Opportunity/GetPSC",
            data: "{'Code': '" + PSCCodeval + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#txtpscdesc_' + spl[1]).val(result[0]);

                    PSC_mode = "PSCCode";
                    //console.log(PSCCode);

                }
                else {
                    $(".PSCode").blur();
                    swal("", "No Data Found !", "info");
                }

                $('.Apploader').hide();

            },
            error: function ajaxError(err) {
                swal("", err);
                $('.Apploader').hide();
            }
        });
    });
    //=============================== Load Department  ==========================================//    
    //=============================== PSC code ==========================================//



    //===============================DEaprtMent Popup//=============================== //
    $(document).on("click", ".OpenDeptPopup", function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
        setTimeout(function () {
            $("#txtdept_2").focus();
            Departmentcode_R = [];
            Departmentcode_R = DepartmentCode.slice();

            AgencyCode_R = [];
            AgencyCode_R = AgencyCode.slice();
        }, 1000);


    });
    //===============================DEaprtMent Popup//=============================== //


    //===============================agency Popup//=============================== //
    $(document).on("click", ".OpenAgencyPopup", function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
        setTimeout(function () {
            $("#txtdept_2").focus();
            Departmentcode_R = [];
            Departmentcode_R = DepartmentCode.slice();

            AgencyCode_R = [];
            AgencyCode_R = AgencyCode.slice();
        }, 1000);


    });

    //===============================agency Popup//=============================== //

    //=============================== Load Department  ==========================================//
    $(document).on('focus', '.txtdept', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        $(".txtdept").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtdept").autocomplete({
            source: DeptCombo[0],
            select: function (event, ui) {

                $('#txtdept_' + id).val(ui.item.value);
                //lbldept_1
                //$('#lbldept_1').text(ui.item.id);
                $('#lbldept_' + id).text(ui.item.id);
                //alert($("#lbldept_1").text());
                DepartmentCode = ui.item.id;//gets the select value from autocomplete
                //alert($(this).parent().find('label').text());
                getAgency(DepartmentCode);
            }
        });



    });
    //=============================== Load Department  ==========================================//

    //=============================== Load Agency  ==========================================//
    $(document).on('focus', '.txtagency', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var GetDEptCpde = $('#lbldept_' + id).text();
        getAgency(GetDEptCpde);

        $(".txtagency").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtagency").autocomplete({
            minLength: 0,
            source: Agencycombo[0],
            select: function (event, ui) {
                $('#txtagency_' + id).val(ui.item.value);
                $('#lblagency_' + id).text(ui.item.id);
                //$(".txtagency").val(ui.item.value);
                AgencyCode = ui.item.id;//gets the select value from autocomplete

            }
        });

    });
    //=============================== Load Agency  ==========================================//



    //=============================== Clear Function ==========================================//
    $('#btnClear').click(function () {
        cleartable()
        clear();
    });


    //=============================== Clear Function ==========================================//

    $('#btnrowclear').click(function () {

        $("#SearchName").val("");
        $("#SearchDuns").val("");
        $("#SearchCage").val("");
        $('#SearchName').prop("disabled", false);
        $('#SearchDuns').prop("disabled", false);
        $('#SearchCage').prop("disabled", false);

    });




    $(document).on('click', '.btnnaicsfamilyrowclear', function () {
        var naicsfamily = this.id;
        var spl = naicsfamily.split('_');
        if (spl[1] == 2) {
            NaicsCode_1st = [];
            NaicsCode_1st.push({ Code: $('#txtnaicsfamcode_' + spl[1]).val(), Desc: $('#txtnaicsfamdesc_' + spl[1]).val() });
        }
        $('#txtnaicsfamcode_' + spl[1]).val("");
        $('#txtnaicsfamdesc_' + spl[1]).val("");
        //NaicsCode = [];
    });

    $(document).on('click', '.btnnaicscoderowclear', function () {
        var naicscode = this.id;

        var spl = naicscode.split('_');

        if (spl[1] == 2) {
            NaicsCode_1st = [];
            NaicsCode_1st.push({ Code: $('#txtnaicscode_' + spl[1]).val(), Desc: $('#txtnaicsdesc_' + spl[1]).val() });
        }
        $('#txtnaicscode_' + spl[1]).val("");
        $('#txtnaicsdesc_' + spl[1]).val("");
        //NaicsCode = [];
        //console.log(NaicsCode);

    });





    $(document).on('click', '.btndeptrowclear', function () {
        var dept = this.id;
        var spl = dept.split('_');

        if (spl[1] == '2') {
            DepartmentAgencycode_1st = [];
            DepartmentAgencycode_1st.push({ DeptCode: $('#lbldept_' + spl[1]).text(), DeptDesc: $('#txtdept_' + spl[1]).val(), AgencyCode: $('#lblagency_' + spl[1]).text(), AgencyDesc: $('#txtagency_' + spl[1]).val() });
        }

        $('#txtdept_' + spl[1]).val("");
        $('#txtagency_' + spl[1]).val("");
        $('#lbldept_' + spl[1]).text("");
        $('#lblagency_' + spl[1]).text("");

    });

    $(document).on('click', '.btnpscrowclear', function () {

        var psc = this.id;
        var spl = psc.split('_');

        if (spl[1] == 2) {
            PSC_1st = [];
            PSC_1st.push({ Code: $('#txtpsccode_' + spl[1]).val(), Desc: $('#txtpscdesc_' + spl[1]).val() });
        }

        $('#txtpsccode_' + spl[1]).val("");
        $('#txtpscdesc_' + spl[1]).val("");
        //PSC = [];

    });

    $(document).on('click', '#btnkeywordrowclear', function () {

        $("#txtkeyword").val("");


    });

    //$(document).on('click', '#btnagencyrowclear', function () {
    //$("#txtagency_2").val("");
    //$("#lblagency_2").text("");
    //});

    $(document).on('click', '.btnclearagency', function () {
        var id = $(this).attr('id');
        var spl = id.split('_');
        $('#txtagency_' + spl[1]).val("");
        $('#lblagency_' + spl[1]).text("");
    });



    //=============================== All Over Opportunity ==========================================//
    $(document).on('click', '#btnOpportunity', function (event, copyClipBoard) {



        //alert("hi");
        if (typeof copyClipBoard == "undefined" || copyClipBoard.data) {
            $('.Apploader').show();
        }
        let OpportunityData = {}
        NaicsCode = [];
        DepartmentCode = [];
        AgencyCode = [];
        PSC = [];
        DepartmentDescription = [];
        AgencyDescription = [];
        PSCDesc = [];
        NaicsDesc = [];
        getval = [];
        if (NAICS_mode == "NaicsFamCode") {

            $(".NaicsFamCode").each(function () {


                var naicsfam = $(this).val();
                NaicsCode.push(naicsfam);

            });

            $(".txtnaicsFamdesc").each(function () {
                var naicscdesc = $(this).val();
                NaicsDesc.push(naicscdesc);
                NaicsDesc = NaicsDesc.filter(item => item);
                NaicsDesc = NaicsDesc.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

            });
        }
        else if (NAICS_mode == "NaicsCode") {
            $(".NaicsCode ").each(function () {


                var naicscode = $(this).val();
                NaicsCode.push(naicscode);

            });
            $(".txtnaicsdesc").each(function () {
                var naicscdesc = $(this).val();
                NaicsDesc.push(naicscdesc);
                NaicsDesc = NaicsDesc.filter(item => item);
                NaicsDesc = NaicsDesc.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

            });
        }

        NaicsCode = NaicsCode.filter(item => item);

        var NAICS = NaicsCode.join();


        var naics_family = "";

        if ($('#txtnaicsfamcode_1').val() != "") {
            naics_family = '1';
        }
        else if ($('#txtnaicscode_1').val() != "") {
            naics_family = '0';
        }

        $(".lbldept").each(function () {
            var dept = $(this).text();

            DepartmentCode.push(dept);
        });

        if (DepartmentCode.length > 0) {
            DepartmentCode = DepartmentCode.filter(item => item);
            DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var department_group_code = DepartmentCode.join();
            DepartmentCode = department_group_code;
        }


        // ====================== GetDepartment Description ========================//
        $(".txtdept").each(function () {
            var dept = $(this).val();
            if (dept != "") {
                DepartmentDescription.push(dept);
            }

        });
        if (DepartmentDescription.length > 0) {
            DepartmentDescription = DepartmentDescription.filter(item => item);
            DepartmentDescription = DepartmentDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

            //var department_group_code = DepartmentDescription.join();
            //console.log("DepartmentDescription", department_group_code);
            //DepartmentDescription = department_group_code;
        }
        // ====================== GetDepartment Description ========================//

        $(".lblagency").each(function () {
            var agency = $(this).text();

            AgencyCode.push(agency);
        });

        if (AgencyCode.length > 0) {
            AgencyCode = AgencyCode.filter(item => item);
            AgencyCode = AgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var agency_group_code = AgencyCode.join();
            AgencyCode = agency_group_code;
            // alert(AgencyCode);
        }

        // ====================== GetAgency Description========================//
        $(".txtagency").each(function () {
            var agency = $(this).val();

            if (agency != "") {
                AgencyDescription.push(agency);
            }
        });
        if (AgencyDescription.length > 0) {
            AgencyDescription = AgencyDescription.filter(item => item);
            AgencyDescription = AgencyDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            //var agency_group_code = AgencyDescription.join();
            //console.log("AgencyDescription",agency_group_code);
            //AgencyDescription = agency_group_code;
            // alert(AgencyDescription);
        }
        // ====================== GetAgency Description========================//


        if (PSC_mode == "PSCCode") {

            $(".PSCode").each(function () {

                var psc = $(this).val();
                PSC.push(psc);

            });
        }

        PSC = PSC.filter(item => item);

        var psc = PSC.join();
        // ====================== GetPsc Description========================//
        $(".txtpsc").each(function () {
            var psc = $(this).val();

            if (psc != "") {
                PSCDesc.push(psc);
            }
        });
        if (PSCDesc.length > 0) {
            PSCDesc = PSCDesc.filter(item => item);
            PSCDesc = PSCDesc.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

        }
        // ====================== GetPsc Description========================//


        $('.clsSocioeconomic input:checked').each(function () {
            getval.push(this.value);

        });
        var business_type_code_list = "";
        if (getval != null) {
            business_type_code_list = getval.join();

        }

        if ($('.txtagency').val() == "") {
            agency_group_code = "";
        }

        if ($('.txtdept').val() == "") {
            department_group_code = "";
        }

        var PosteDateStart = $('#txtposteddatestart').val();
        var PosteDateEnd = $('#txtposteddateend').val();
        var keyword_list = $('#txtkeyword').val();
        var BaseType = $('#txtbasetype').val();
        var SolicitationNumber = $('#txtsolicitationnumber').val();

        OpportunityData.Solicitation_Number = SolicitationNumber;
        OpportunityData.PosteDateStart = PosteDateStart,
        OpportunityData.PosteDateEnd = PosteDateEnd,
        OpportunityData.PSC = psc,
        OpportunityData.NAICS = NAICS,
        OpportunityData.department_group_code = department_group_code,
        OpportunityData.agency_group_code = agency_group_code,
        OpportunityData.keyword_list = keyword_list,
        OpportunityData.naics_family = naics_family,
        OpportunityData.business_type_code_list = business_type_code_list,
        OpportunityData.BaseType = BaseType



        if (business_type_code_list == "") {
            OpportunityData.business_type_code_list = "";
        }


        //======VAlidation for Advanced search======//
        if (OpportunityData.Solicitation_Number == "" && Type == "Type2") {

            if (OpportunityData.PosteDateStart != "" && OpportunityData.PosteDateEnd != "") {
                opportunityData(copyClipBoard);
            }
            else {
                //alert("fill all fields");
                swal("", "Please fill in all required(*) fields");
                cleartable();
                $('.Apploader').hide();
            }
        }


            //======VAlidation for Simple search======//
        else {
            if (OpportunityData.Solicitation_Number != "" && Type == "Type1") {
                opportunityData(copyClipBoard);
            }
            else {
                swal("", "Please fill in all required(*) fields");
                cleartable();
                $('.Apploader').hide();

            }

        }






        function opportunityData(copyClipBoard) {
         
            if (typeof copyClipBoard != 'undefined' && copyClipBoard.isCopyClipBoard) {
                OpportunityData.department_name = $("#txtdept_2").val();
                OpportunityData.agency_name = $("#txtagency_2").val();
                OpportunityData.office_name = $("#txtoffice_2").val();
                OpportunityData.naics_name = "";
                let customIndexNaics = 0;
                OpportunityData.NAICS.split(',').forEach((item, index) => {
                    customIndexNaics = index == 0 ? 2 : customIndexNaics + 1
                    OpportunityData.naics_name = OpportunityData.naics_name + `${index != 0 ? ',' : ''}`
                        + $(`#txtnaicsdesc_${customIndexNaics}`).val();
                })
                const queryParams = JSON.stringify({ SearchOpportunity: OpportunityData })
                var tempInput = document.createElement('input');
                tempInput.value = `${window.location.href.split('?')[0]}?data=${encodeURIComponent(queryParams)}`;
                document.body.appendChild(tempInput);
                tempInput.select();
                tempInput.setSelectionRange(0, 99999); /* For mobile devices */
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                return;
            }
            if (typeof copyClipBoard != 'undefined' && copyClipBoard.data) {
                //  copyClipBoard.data.SimpleSearch = JSON.parse(copyClipBoard.data.SimpleSearch);
                $("#txtposteddatestart").val(paramData.SearchOpportunity.PosteDateStart);
                $("#txtposteddateend").val(paramData.SearchOpportunity.PosteDateEnd);
                OpportunityData = copyClipBoard.data.SearchOpportunity;

            }
            var data = "{SearchOpportunity:" + JSON.stringify(OpportunityData) + "}";
            var url = "/Opportunity/SearchOpportunity";
            var result = AjaxPost(url, data);
            if (result.Error == "") {
                OpportunityData = {}
                //alert(result.GetInitialData.length);
                if (result.GetInitialData.length > 0) {
                    // clear();
                    bindsearchdata();
                    $('.SearchFields').hide();
                    NaicsCode = [];
                    DepartmentCode = [];
                    AgencyCode = [];
                    PSC = [];
                    getval = [];
                    OpportunityData = {};

                    $('#opportunityreportData').show();
                    var filldata = "";
                    $('#opportunityreportData').dataTable().fnDestroy();


                    for (var i = 0; i < result.GetInitialData.length; i++) {

                        var Title = result.GetInitialData[i].Title;
                        var Department_IndAgency = result.GetInitialData[i].Department_IndAgency;
                        var SubTier = result.GetInitialData[i].SubTier;
                        var Solicitation_Number = result.GetInitialData[i].Solicitation_Number;
                        var Type = result.GetInitialData[i].Type;
                        var BaseType = result.GetInitialData[i].BaseType;
                        var SetASideCode = result.GetInitialData[i].SetASideCode;
                        var SetASide = result.GetInitialData[i].Setaside;
                        var PostedDate = result.GetInitialData[i].PostedDate;
                        var department_code = result.GetInitialData[i].department_code;
                        var agency_code = result.GetInitialData[i].agency_code;
                        var naice_code = result.GetInitialData[i].NaicsCode;
                        var ClassificationCode = result.GetInitialData[i].ClassificationCode;

                        const style = result.GetInitialData[i].Processed == "True" ? ' lightgreen' : 'inherit'
                        filldata = filldata + '<tr><td class="throw"><input type="checkbox" onchange="handleCheckboxChange(event)" class="opportunityCheckbox" noticeId="' + result.GetInitialData[i].NoticeId + '"/></td><td class="throw" style="background:' + style +' " >' + (i + 1) + '</td><td  class="OP001 Solicitation_Number thsolicitation" id=' + Solicitation_Number + '>' + Solicitation_Number + '</td><td class="thtitle">' + Title + '</td><td class="GoDeptSearch thdept" id=' + department_code + '>' + Department_IndAgency + '</td><td class="GoAgencySearch thagency" id=' + agency_code + '>' + SubTier + '</td><td class="GoBaseTypeSearch">' + BaseType + '</td><td class="GoSetAsideSearch">' + SetASide + '</td><td class="thdeptnaics">' + naice_code + '</td><td class="thdeptPSC">' + ClassificationCode + '</td><td class="thposdt">' + PostedDate + '</td><td class="thdeptcode">' + department_code + '</td><td class="thsacode">' + SetASideCode + '</td></tr>';
                    }
                 
                    $('#opportunityreportTable').html(filldata);
                    $('.Apploader').hide();
                    //$('#opportunityreportData').dataTable();
                    $('#opportunityreportData').DataTable({

                        dom: 'lBfrtip' +
                            "<'row'<'col-sm-12'tr>>" +
                            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                        buttons: [
                            {
                                text: 'Chat with Docs',
                                className: "buttons-html5 btn btn-purple text-white mr-1",
                                action: function (e, dt, node, config) {
                                    chatWithDocs();
                                }
                            },
                            {
                                text: 'Daily Email',
                                className: "buttons-excel buttons-html5 btn btn-cyan text-white mr-1",
                                action: function (e, dt, node, config) {
                                    FillOpportunityPopup();
                                }
                            },
                              {
                                  extend: 'excel',
                                  title: null,
                                  exportOptions: {
                                      columns: [0, 1, 2, 3, 4, 5, 6, 7]
                                  }
                            }
                             
                        ],
                        //initComplete: function() {


                        //    $('.buttons-excel').html(' <img class="Co_011" id="ExcelContract" src="/Content/assets/images/excel.png" />')

                        //},
                        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

                        language: {
                            search: "Search within Grid",
                            //searchPlaceholder: "Search within Grid"
                        },

                    });
                    $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-cyan text-white mr-1');


                }
                else {

                    swal("", "Your search did not produce any results, please modify your search"); var table = $('#opportunityreportData').DataTable();

                    cleartable();

                }
            }
            else if (result == "TimedOut") {
                swal("", "Timed Out !", "error");

                window.location.href = origin;


            }
            else {
                swal("", result.Error, "error");
                cleartable();
            }
            OpportunityData = {}
        }

      
       /* $(".opportunityCheckbox").change(function () {
           
        });*/

        function bindsearchdata() {


            if ($('#txtsolicitationnumber').val() == "") {
                $('#OS_Posteddatestart').text($('#txtposteddatestart').val());
                $('#OS_Posteddatend').text($('#txtposteddateend').val());
                $('#OS_BaseType').text($('#txtbasetype').val());



                if (NAICS_mode == "NaicsFamCode") {


                    if (NaicsDesc.length > 1) {
                        $('#OS_lbltotalnaicsfamily').show();
                        $('#OS_lbltotaladdedrownaicsfamily').text(NaicsDesc.length - 1);

                    }
                    else {
                        $('#OS_lbltotalnaicsfamily').hide();
                    }
                    $('.OS_Naicscode').hide();
                    $('.OS_NaicsFamily').show();
                    if (NaicsDesc[0] != "" && NaicsDesc[0] != undefined) {
                        $('#OS_NaicsFamily').text(NaicsDesc[0] + '   (' + NaicsCode[0] + ')');
                    }
                    else {
                        $('#OS_NaicsFamily').text('');
                    }
                }


                else {
                    if (NaicsDesc.length > 1) {
                        $('#OS_lbltotalnaics').show();
                        $('#OS_lbltotaladdedrownaics').text(NaicsDesc.length - 1);

                    }
                    else {
                        $('#OS_lbltotalnaics').hide();
                    }
                    $('.OS_Naicscode').show();
                    $('.OS_NaicsFamily').hide();

                    if (NaicsDesc[0] != "" && NaicsDesc[0] != undefined) {
                        $('#OS_Naicscode').text(NaicsDesc[0] + '   (' + NaicsCode[0] + ')');
                    }
                    else {
                        $('#OS_Naicscode').text('');
                    }
                }






                if (DepartmentDescription.length > 1) {
                    $('#OS_lbltotaldept').show();
                    $('#OS_lbltotaladdedrowdept').text(DepartmentDescription.length - 1);

                }
                else {
                    $('#OS_lbltotaldept').hide();
                }
                $('#OS_Dept').text($('#txtdept_1').val());

                if (AgencyDescription.length > 1) {
                    $('#OS_lbltotalagency').show();
                    $('#OS_lbltotaladdedrowagency').text(AgencyDescription.length - 1);

                }
                else {
                    $('#OS_lbltotalagency').hide();
                }
                $('#OS_Agency').text($('#txtagency_1').val());

                if (PSCDesc.length > 1) {
                    $('#OS_lbltotalpsc').show();
                    $('#OS_lbltotaladdedrowpsc').text(PSCDesc.length - 1);

                }
                else {
                    $('#OS_lbltotalpsc').hide();
                }
                if (PSCDesc[0] != "" && PSCDesc[0] != undefined) {
                    $('#OS_Psc').text(PSCDesc[0] + '   (' + PSC[0] + ')');
                }
                else {
                    $('#OS_Psc').text('');
                }
                // $('#OS_Psc').text(PSCDesc[0]);

                $('#OS_Keyword').text($('#txtkeyword').val());
                getval.push(this.value);
                $('#OS_Setasidecode').text(getval);
                $('#AdvancedSearch').hide();
                $('.OpportunityAdvancedSearchResults').slideDown("slow");

            }
            else {
                $('#OS_Solicitationnumber').text($('#txtsolicitationnumber').val());
                $('#Simplesearch').hide();
                $('.OpportunitySimpleSearchSearchResults').slideDown("slow");
            }

            $('#IDshowResult').hide();
            $('#IDshowfields').show();

        }


    });
    //=============================== All Over Opportunity ==========================================//
    const urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get('data');
    let paramData = null;
    if (myParam) {
        paramData = JSON.parse(myParam);
        $('#btnOpportunity').trigger('click', { data: paramData });
    }

});



//===============================Show More on Result of Naics bind start//=============================== //
$(document).on('click', '#OS_lbltotalnaics', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#NaicsCodeModal').modal('show');
    }, 200);
});
//===============================Show More on Result of Naics bind end//=============================== //


//===============================Show More on Result of NaicsFamily bind start//=============================== //
$(document).on('click', '#OS_lbltotalnaicsfamily', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#NaicsfamilyModal').modal('show');
    }, 200);
});
//===============================Show More on Result of NaicsFamily bind end//=============================== //

//===============================Show More on Result of PSC bind start//=============================== //
$(document).on('click', '#OS_lbltotalpsc', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#PscModal').modal('show');
    }, 200);
});
//===============================Show More on Result of PSC bind end//=============================== //


// //===============================Show More on Result of dept/Agency //=============================== //
$(document).on('click', '#OS_lbltotaldept', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
        //alert('');
    }, 200);
});

$(document).on('click', '#OS_lbltotalagency', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
        //alert('');
    }, 200);
});
//===============================Show More on Result of dept/Agency //=============================== //







$(document).on('click', '#IDshowfields', function () {

    if ($('#txtsolicitationnumber').val() == "") {
        // if advanced search //
        //Hide div //
        $(".OpportunityAdvancedSearchResults").hide();
        $('.SearchFields').show();
        $('#AdvancedSearch').slideDown("slow");

    }
    else {
        // if simple search //
        //Hide div //
        $(".OpportunitySimpleSearchSearchResults").hide();
        $('.SearchFields').show();
        $('#Simplesearch').slideDown("slow");

    }
    $('#IDshowResult').show();
    $('#IDshowfields').hide();



});


$(document).on('click', '#IDshowResult', function () {

    if ($('#txtsolicitationnumber').val() == "") {
        // if advanced search //
        //Hide div //
        $('#AdvancedSearch').hide();
        $(".OpportunityAdvancedSearchResults").slideDown("slow");

    }
    else {
        // if simple search //
        //Hide div //
        $('#Simplesearch').hide();
        $(".OpportunitySimpleSearchSearchResults").slideDown("slow");

    }
    $('#IDshowfields').show();
    $('#IDshowResult').hide();
    $('.SearchFields').hide();

});



//=============================== Add NaicsCode New fieds ==========================================//
function addnaicscode() {

    if (cnt < max) {
        cnt++;



        var filldata = '<div class="naics_' + cnt + ' row NaicsCodeRow" id="IDnaics_' + cnt + '">' +

                        '<div class="col-md-3 s004">' +

                                '<div class="input-group mb-3" style="width:108%">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text btnnaicscoderowclear" id="btnnaicsfourrowclear_' + cnt + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
                                    '</div>' +
                                    '<input style="font-size: 13px;" type="text" id="txtnaicscode_' + cnt + '" class="DIS_002 form-control NaicsCode dis_able1" name="textbox" />' +
                                    '<div class="input-group-append">' +
                                    '<span class="input-group-text s001">' +
                                        '<i class="ti-info-alt infoIcon s002 NC" data-toggle="tooltip" ></i>' +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                         '</div>' +

                         '<div class="col-md-9">' +
                            '<div class="row">' +
                                '<div class="col-md-11">' +

                                        '<div class="input-group mb-3">' +
                                            '<input disabled type="text" id="txtnaicsdesc_' + cnt + '" class="form-control txtnaicsdesc" name="textbox" style="margin-bottom: 4px;" />' +
                                            '<div class="input-group-append">' +
                                                '<span class="input-group-text s001">' +
                                                    '<i class="ti-info-alt infoIcon s002 NCD" data-toggle="tooltip"></i>' +
                                                '</span>' +
                                            '</div>' +
                                        '</div>' +
                               ' </div>' +

                         '<div class="col-md-1">' +
                            '<button type="button" id="btnremovenaicsfour_' + cnt + '" class="s022 btn btn-danger btn-sm dis_able1 B_s004 remove-textboxnaicsfour" data-toggle="tooltip" title="Click here to Remove selected row">' +
                                '<i class="ti-minus"></i>' +
                            '</button>' +
                         '</div>' +
                       '</div>' +
                     '</div>' +
                   '</div>'

        $(".naicsincr").append(filldata);
    }
}
//=============================== Add NaicsCode New fieds ==========================================//

//=============================== Add NaicsFamily New fieds ==========================================//
function addnaicsfamily() {
    if (cntFam < maxFam) {
        cntFam++;


        var fillData = '<div class="naicsFam_' + cntFam + ' row NaicsFamRow" id="NaicsFamilyRow_' + cntFam + '">' +

                           '<div class="col-md-3 dis_able0 s004">' +
                                    '<div class="input-group mb-3">' +
                                        '<div class="input-group-prepend">' +
                                            '<span class="input-group-text btnnaicsfamilyrowclear" id="btnnaicsfamrowclear_' + cntFam + '" data-toggle="tooltip" title="Click to clear the data in this row">' +
                                                '<i class="ti-close"></i>' +
                                            '</span>' +
                                        '</div>' +
                                        '<input style="font-size: 13px;" type="text" id="txtnaicsfamcode_' + cntFam + '" class="DIS_002 form-control NaicsFamCode dis_able0" name="textbox" />' +
                                        '<div class="input-group-append">' +
                                            '<span class="input-group-text s001">' +
                                                '<i class="ti-info-alt infoIcon s002 NFC" data-toggle="tooltip"></i>' +
                                            '</span>' +
                                        '</div>' +
                                   '</div>' +
                                 '</div>' +

                               '<div class="col-md-9">' +
                                    '<div class="row">' +
                                        '<div class="col-md-11">' +
                                           '<div class="input-group mb-3">' +
                                                '<input disabled type="text" id="txtnaicsfamdesc_' + cntFam + '" class="form-control txtnaicsFamdesc" name="textbox" style="margin-bottom: 4px;" />' +
                                                '<div class="input-group-append">' +
                                                    '<span class="input-group-text s001">' +
                                                        '<i class="ti-info-alt infoIcon s002 NFD" data-toggle="tooltip"></i>' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>' +
                                         '</div>' +
                                                '<div class="col-md-1">' +
                                                    '<button id= "btnremovenaicssix_' + cntFam + '"  type="button" class="s022 btn btn-danger  btn-sm remove-textboxfam B_s004" data-toggle="tooltip" title="Click here to Remove selected row">' +
                                                        '<i class="ti-minus"></i>' +
                                                    '</button>' +
                                                '</div>' +
                                            '</div>' +
                                    '</div>' +
                               '</div>';

        $(".naicsincrFam").append(fillData);

    }
    set_Helpicon();
}
//=============================== Add NaicsFamily New fieds ==========================================//


//=============================== Add PSC New fieds ==========================================//


function addpsc() {

    if (cntpsc < maxpsc) {
        cntpsc++;


        var filldata = '<div class="psc_' + cntpsc + ' row col-md-12 PSCRow" id="IDpsc_' + cntpsc + '">' +

                        '<div class="col-md-3 s004">' +

                                '<div class="input-group mb-3">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text btnpscrowclear" id="btnpscrowclear_' + cntpsc + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
                                    '</div>' +
                                    '<input style="font-size: 13px;text-transform: uppercase;" type="text" id="txtpsccode_' + cntpsc + '" class="DIS_002 form-control PSCode dis_able1" name="textbox" />' +
                                    '<div class="input-group-append">' +
                                    '<span class="input-group-text s001">' +
                                        '<i class="ti-info-alt infoIcon s002 PSCC" data-toggle="tooltip"></i>' +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                         '</div>' +

                         '<div class="col-md-9">' +
                            '<div class="row">' +
                                '<div class="col-md-11">' +

                                        '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtpscdesc_' + cntpsc + '" class="form-control txtpsc" name="textbox" style="margin-bottom: 4px;text-transform:uppercase;" />' +
                                            '<div class="input-group-append">' +
                                                '<span class="input-group-text s001">' +
                                                    '<i class="ti-info-alt infoIcon s002 PSCD" data-toggle="tooltip"></i>' +
                                                '</span>' +
                                            '</div>' +
                                        '</div>' +
                               ' </div>' +

                         '<div class="col-md-1">' +
                            '<button type="button" id="btnremovepsc_' + cntpsc + '" class="s022 btn btn-danger btn-sm dis_able1 B_s004 remove-textboxpsc" data-toggle="tooltip" title="Click here to Remove selected row">' +
                                '<i class="ti-minus"></i>' +
                            '</button>' +
                         '</div>' +
                       '</div>' +
                     '</div>' +
                   '</div>'

        $(".pscincr").append(filldata);
        //$(document).on('keyup paste', '#txtpscdesc_'+cntpsc, function () {
        //    $("#txtpscdesc_"+cntpsc).val(($("#txtpscdesc_"+cntpsc).val()));
        //});
    }
    set_Helpicon();
}
//=============================== Add PSC New fieds ==========================================//


function GetSocioEconomic() {
    $('.Apploader').show();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Opportunity/Get_SocioEconomic",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                //$("#SBusiness").html("");
                ////$("#SBusiness").append($("<option value=''>~ Select ~</option>"));
                //for (i = 0; i < result.length; i++) {
                //    var text = result[i].abbreviation;
                //    var value = result[i].SetASideCode;
                //    $("#SBusiness").append($("<li><input id='" + value + "' class='Socioec' type='checkbox' value=" + value + " style='height:12px;cursor:pointer'><label class='lbl_S001' style='font-size:11px;'>  &nbsp;" + value + "</label></li>"));
                //}


                $('#tbl_Socio').show();

                var filldata = "";
                $('#tbl_Socio').dataTable().fnDestroy();


                for (i = 0; i < result.length; i++) {
                    var descriprion = result[i].abbreviation;
                    var value = result[i].SetASideCode;

                    filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + descriprion + '</td><td>' + value + '</td><td><label class="container"><input id="' + descriprion + '" class="Socioec" type="checkbox" value="' + value + '"><span class="checkmark0"></span></label></td></tr>';
                }
                $('#tbody_Socio').html(filldata);
                $('#tbl_Socio').DataTable({
                    //scrollY: 300,

                    scrollCollapse: true,
                    paging: false,
                    bInfo : false,
                    dom: 'lBfrtip'
                        +
                        "<'row'<'col-sm-12'tr>>",// +
                        //"<'row'<'col-sm-5'i><'col-sm-7'p>>",

                    buttons: [
                        //{
                        //extend: 'excel',
                        //title: null,
                        //exportOptions: {
                        //    columns: [0, 1, 2, 4]
                        //}
                    //}

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
                const urlParams = new URLSearchParams(window.location.search)
                const myParam = urlParams.get('data');
                let paramData;
                if (myParam) {
                    paramData = JSON.parse(myParam);
                    if (paramData.SearchOpportunity.business_type_code_list) {
                        const codeList = paramData.SearchOpportunity.business_type_code_list.split(',')
                        $('#tbody_Socio input').each(function () {
                            for (let a = 0; a < codeList.length; a++) {
                                if (codeList[a] && codeList[a].indexOf(this.value) != -1) {
                                    this.checked = true;
                                }
                            }
                        });
                        $("#OKSocio").click();
                    }
                }

            }
            else {
                swal("", "No Data Found !");

            }
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}

function getDept() {


    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetDepartmentList",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                DeptCombo.push(result);
            }
            else {
                swal("", "No Data Found !");
            }
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}

function getAgency(DepartmentCode) {
    Agencycombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetAgencyList",
        data: "{'Agencycode': '" + DepartmentCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                //AgencyCode = result[0].funding_agency_code;
                Agencycombo.push(result);

                //$('#AgencyList').text(result[0].funding_agency_code);
                //$('#AgencyList').val(result[0].funding_agency_name);
            }
            else {
                //swal("", "No Data Found !");
            }
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}

function getpsc(PSC) {
    var PSCCodeval = PSC;

    $('#AlertMsg').text('');
    $('.Apploader').show();

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Opportunity/GetPSC",
        data: "{'Code': '" + PSCCodeval + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                $('#txtpscdesc_1').val(result[0]);
                $('#txtpscdesc_2').val(result[0]);

                PSC_mode = "PSCCode";
                //console.log(PSCCode);

            }
            else {
                swal("", "No Data Found !");
            }

            $('.Apploader').hide();

        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });

}

function clear() {
    if (Type == "Type1") {
        $("#txtsolicitationnumber").val('');
        var table = $('#opportunityreportData').DataTable();
        table
            .clear()
            .draw();
    }
    if (Type == "Type2") {
        if (NaicsType === "Code") {
            $(".naicsincr1").css("display", "block");
            $(".naicsincrFam1").css("display", "none");
        }
        if (NaicsType === "Family") {
            $(".naicsincr1").css("display", "none");
            $(".naicsincrFam1").css("display", "block");
        }
    
    $('input[type="text"').prop("disabled", false);
    $('input[name="businessize"]').prop('checked', false);
    $(".form-control").val("");
    Array.length = 0;
    $(".remove-textboxfam").trigger("click");
    $(".remove-textboxnaicsfour").trigger("click");
    $(".remove-textboxpsc").trigger("click");
    $(".remove-textboxdept").trigger("click");
    $(".remove-textboxagency").trigger("click");
    $('#lbltotalpsc').hide();
    $('.selectpicker').val("");
    NaicsCode = [];
    $('.multiSel').text("");
    var table = $('#opportunityreportData').DataTable();
    table
        .clear()
        .draw();
    $('#opportunityreportData').parents('div.dataTables_wrapper').first().hide();
    $('.OpportunityAdvancedSearchResults').hide();
    $('.OpportunitySimpleSearchSearchResults').hide();
    $('#IDshowResult').hide();
    $('#IDshowfields').hide();
    $('.SearchFields').show();
    getval = [];
}

}

function cleartable() {
    var table = $('#opportunityreportData').DataTable();

    table
        .clear()
        .draw();
    $('#opportunityreportData').parents('div.dataTables_wrapper').first().hide();


}



// ========= naics toggle ========//

$(document).on('click', '.btn-toggle_Naics', function () {

    if (NaicsType == "Code") {
        NaicsType = "Family";

        $(".naicsincr1").css("display", "none");
        $(".naicsincrFam1").css("display", "block");
        $('.dis_able1').val("");
        $(".remove-textboxfam").trigger("click");
        $(".remove-textboxnaicsfour").trigger("click");
        $('#lbltotalnaics').hide();
    }
    else if (NaicsType == "Family") {
        NaicsType = "Code";

        $(".naicsincrFam1").css("display", "none");
        $(".naicsincr1").css("display", "block");
        $('.dis_able0').val("");
        $(".remove-textboxfam").trigger("click");
        $(".remove-textboxnaicsfour").trigger("click");
        $('#lbltotalnaicsfamily').hide("");
    }

});

// ******Hyperlink soliciation number and redirect to new tab****** //

$(document).on('click', '.Solicitation_Number', function () {

    var SolicitationNo = this.id;
    var test = window.btoa(SolicitationNo);
    window.open(window.location.origin + '/OppSolicitation/Index?SONO=' + test, '_blank');

});


// =========redirect to new tab on Department click ========//

$(document).on('click', '.GoDeptSearch', function () {

    var DeptCode = this.id;
    var dept = $(this).parent().find("td:eq('3')").text();
    var Naics = $(this).parent().find("td:eq('7')").text();
    var PDS = $('#txtposteddatestart').val();
    var PDE = $('#txtposteddateend').val();
    var SAC = $(this).parent().find("td:eq('11')").text();
    if (PDS != "" && PDE != "") {
        $('#txtposteddatestart').val(PDS);
        $('#txtposteddateend').val(PDE);

    }
    else {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

        $('#txtposteddatestart').datepicker('setDate', today);

        $('#txtposteddateend').datepicker('setDate', new Date());
        PDS = $('#txtposteddatestart').val();
        PDE = $('#txtposteddateend').val();
    }
    //var BaseType = $(this).parent().find("td:eq('5')").text();

    //if (PDS == "" && PDE == "") {
    //    var date = new Date();
    //    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    //    PDS = today;
    //    PDE = date;
    //    $('#txtposteddatestart').datepicker('setDate', today);

    //    $('#txtposteddateend').datepicker('setDate', new Date());

    //}

    window.open(window.location.origin + '/OpportunitySearch/Index?Dept=' + dept + '&DeptCode=' + DeptCode + '&Naics=' + Naics + '&PDS=' + PDS + '&PDE=' + PDE, '_blank');

});


// =========redirect to new tab on Agency click ========//

$(document).on('click', '.GoAgencySearch', function () {
    var AgencyCode = this.id;
    var DeptCode = $(this).parent().find("td:eq('10')").text();
    var Dept = $(this).parent().find("td:eq('3')").text();
    var Agency = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('7')").text();
    var PDS = $('#txtposteddatestart').val();
    var PDE = $('#txtposteddateend').val();
    //var BaseType = $(this).parent().find("td:eq('5')").text();
    if (PDS != "" && PDE != "") {
        $('#txtposteddatestart').val(PDS);
        $('#txtposteddateend').val(PDE);

    }
    else {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

        $('#txtposteddatestart').datepicker('setDate', today);

        $('#txtposteddateend').datepicker('setDate', new Date());
        PDS = $('#txtposteddatestart').val();
        PDE = $('#txtposteddateend').val();
    }

    window.open(window.location.origin + '/OpportunitySearch/Index?Dept=' + Dept + '&AgencyCode=' + AgencyCode + '&DeptCode=' + DeptCode + '&Agency=' + Agency + '&Naics=' + Naics + '&PDS=' + PDS + '&PDE=' + PDE, '_blank');
    //window.open(window.location.origin + '/Opportunity/Index?Dept=' + Dept + '&AgencyCode=' + AgencyCode + '&Agency=' + Agency + '&pscode=' + pscode + '&Naics=' + Naics + '&Keyword=' + Keyword, '_blank');

});

function GetNaics(Naics) {
    var NaicsCodeval = Naics;
    if (NaicsCodeval.length == '6') {
        $('#AlertMsg').text('');


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NaicsCodeval + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#txtnaicsdesc_1').val(result[0]);
                    $('#txtnaicsdesc_2').val(result[0]);
                    //$(".dis_able0").attr('disabled', 'disabled');

                    ////NaicsCode.push(NaicsCodeval);
                    //$(".dis_able0").children().attr('disabled', 'disabled');
                    NAICS_mode = "NaicsCode";
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
    else {
        $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
    }
}
function GetNaicsFamily(Naics) {
    var NAICSFamCode = Naics;
    if (NAICSFamCode.length == '4') {
        $('#AlertMsg').text('');


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NAICSFamCode + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#txtnaicsfamdesc_1').val(result[0]);
                    $('#txtnaicsfamdesc_2').val(result[0]);
                    //$(".dis_able1").attr('disabled', 'disabled');
                    NAICS_mode = "NaicsFamCode";

                    //NaicsCode.push(NAICSFamCode);

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
    else {
        $('#AlertMsg').text('*** The NAICS Family Code should be exactly 4 Digits ! ***');
    }


}
function GetUserInfo() {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/CheckUser",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.length > 0) {
                if (result == "False") {

                    userinfo = result;
                    //$('#FY').val("");
                    $(".startYear_1").prop('disabled', true);
                    $(".EndYear_1").prop('disabled', true);
                    $(".startYear_2").prop('disabled', true);
                    $(".EndYear_2").prop('disabled', true);
                    //$('#FYCheck').hide();
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

function getBasyType() {


    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Opportunity/GetBaseType",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                BaseType = [];
                BaseType.push(result);

                var BaseType = BaseType[0]
                $(".clstxtbasetype").addClass('ui-autocomplete-loading');
                $('#txtbasetype').autocomplete({
                    source: BaseType,
                    minLength: 0,
                    scroll: true
                }).focus(function () {
                    $(this).autocomplete("search", "");
                });
            }
            else {
                swal("", "No Data Found !");
            }
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}



//=============================== Load BaseType Start ==========================================//


//$(document).on('focus', '.clstxtbasetype', function () {


//    $(".clstxtbasetype").addClass('ui-autocomplete-loading');


//});

//=============================== Load BaseType End  ==========================================//
//=============================== Clear BaseType Start  ==========================================//
$(document).on('click', '#btnbasetyperowclear', function () {

    $("#txtbasetype").val("");


});
//=============================== Clear BaseType End  ==========================================//

$(document).on('click', '.btn-toggle', function () {

    $(this).find('.btn').toggleClass('active');

    if ($(this).find('.Type1').length > 0) {
        $(this).find('.btn').toggleClass('Type1');
    }
    if ($(this).find('.Type2').length > 0) {
        $(this).find('.btn').toggleClass('Type2');
    }

    $(this).find('.btn').toggleClass('btn-default');

});

$(document).on('click', '.TypeOne', function () {
    cleartable();
    $(this).removeClass("Com_005");
    $(this).addClass("Com_006");
    $('.TypeTwo').removeClass("Com_006");
    $('.TypeTwo').addClass("Com_005");
    $("#txtsolicitationnumber").val('');
    Type = 'Type1'; //To consolidate the search [FY, AwardAmont]
    $('#Simplesearch').show();
    $('#AdvancedSearch').hide();
    $(".OpportunityAdvancedSearchResults").hide();
    $('#IDshowfields').hide();
    $("#IDshowResult").hide();
    $('.SearchFields').show();
    if (MC_AutoBindData == 1) {
       
        
    }
    else {
        clear();
        $('.lbldept').text('');
        $('.txtdept').val('');
        $('.txtagency').val('');
        $('.lblagency').text('');
    }
   
});

$(document).on('click', '.TypeTwo', function () {

    if (NaicsType === "Code") {
        $(".naicsincr1").css("display", "block");
        $(".naicsincrFam1").css("display", "none");
    }
    if (NaicsType === "Family") {
        $(".naicsincr1").css("display", "none");
        $(".naicsincrFam1").css("display", "block");
    }

    $(this).removeClass("Com_005");
    $(this).addClass("Com_006");
    $('.TypeOne').removeClass("Com_006");
    $('.TypeOne').addClass("Com_005");
    $("#txtsolicitationnumber").val('');
    $(".OpportunitySimpleSearchSearchResults").hide();
    $(".OpportunityAdvancedSearchResults").hide();

    Type = 'Type2';//To consolidate the search [FY, AwardAmont]
    $('#Simplesearch').hide();
    $('#AdvancedSearch').show();
    if (MC_AutoBindData == 1) {
        //$(".OpportunityAdvancedSearchResults").show();
        $('#IDshowfields').hide();
        $("#IDshowResult").hide();
        $('.SearchFields').show();
    }
    else {
        clear();
        $('.lbldept').text('');
        $('.txtdept').val('');
        $('.txtagency').val('');
        $('.lblagency').text('');
    }
    


    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

    $('#txtposteddatestart').datepicker('setDate', today);

    $('#txtposteddateend').datepicker('setDate', new Date());
    
    //$(".naicsincrFam1").css("display", "none");
    //$(".naicsincr1").css("display", "block");
    cleartable();
});

$(document).on('click', '#btnrowsolicitationnoclear', function () {
    $("#txtsolicitationnumber").val("");
});



// =========redirect to new tab on BasyType click ========//

$(document).on('click', '.GoBaseTypeSearch', function () {


    var Naics = $(this).parent().find("td:eq('7')").text();
    var PDS = $('#txtposteddatestart').val();
    var PDE = $('#txtposteddateend').val();
    var BaseType = $(this).parent().find("td:eq('5')").text();
    if (PDS != "" && PDE != "") {
        $('#txtposteddatestart').val(PDS);
        $('#txtposteddateend').val(PDE);

    }
    else {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

        $('#txtposteddatestart').datepicker('setDate', today);

        $('#txtposteddateend').datepicker('setDate', new Date());
        PDS = $('#txtposteddatestart').val();
        PDE = $('#txtposteddateend').val();
    }
    window.open(window.location.origin + '/OpportunitySearch/Index?Naics=' + Naics + '&PDS=' + PDS + '&PDE=' + PDE + '&BaseType=' + BaseType, '_blank');

});


// =========redirect to new tab on BasyType click ========//

// =========redirect to new tab on SetAside click ========//

$(document).on('click', '.GoSetAsideSearch', function () {


    var Naics = $(this).parent().find("td:eq('7')").text();
    var PDS = $('#txtposteddatestart').val();
    var PDE = $('#txtposteddateend').val();
    var SAC = $(this).parent().find("td:eq('11')").text();
    if (PDS != "" && PDE != "") {
        $('#txtposteddatestart').val(PDS);
        $('#txtposteddateend').val(PDE);

    }
    else {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

        $('#txtposteddatestart').datepicker('setDate', today);

        $('#txtposteddateend').datepicker('setDate', new Date());
        PDS = $('#txtposteddatestart').val();
        PDE = $('#txtposteddateend').val();
    }
    window.open(window.location.origin + '/OpportunitySearch/Index?Naics=' + Naics + '&PDS=' + PDS + '&PDE=' + PDE + '&SAC=' + SAC, '_blank');

});




// #################### Naics Code popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnNaicsCodeCancel', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".NaicsCode").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var n = NaicsCode_R.includes($('#txtnaicscode_' + spl[1]).val());
        if (n != true) {
            //console.log($("yes", '#txtnaicscode_' + spl[1]).val())

            $('#txtnaicscode_' + spl[1]).val("");
            $('#txtnaicsdesc_' + spl[1]).val("");

            $('#IDnaics_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#txtnaicscode_' + spl[1]).val())
        }
    });
    //============= Remove blank rows =========//
    //console.log('==NaicsCode==', NaicsCode_R);
    $(".NaicsCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Naics = $(this).val();

        var n = NaicsCode_R.includes(Naics);
        if (n == true) {
            const index = NaicsCode_R.indexOf(Naics);
            if (index > -1) {
                NaicsCode_R.splice(index, 1);
            }
            //console.log("yes", Naics);
        }
        else {
            //console.log("No", Naics);
        }

    });


    $(NaicsCode_R).each(function (i) { // To add again the removed "ok" values

        if (NaicsCode_1st.length > 0) {
            if (NaicsCode_R[i] == NaicsCode_1st[0].Code) {
                $('#txtnaicscode_2').val(NaicsCode_1st[0].Code);// to add a value in text box
                $('#txtnaicsdesc_2').val(NaicsCode_1st[0].Desc);
            }
            else {
                addnaicscode(); // to add a new text box for ****** Naics Code ******

                var getcount = cnt;
                $('#txtnaicscode_' + getcount).val(NaicsCode_R[i]);// to add a value in text box

                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: "/Search/GetNAICSFam",
                    data: "{'Code': '" + NaicsCode_R[i] + "'}",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (result.length > 0) {
                            //console.log(result)
                            $('#txtnaicsdesc_' + getcount).val(result[0]);
                        }
                    },
                    error: function ajaxError(err) {
                    }
                });
            }
        }
        else {
            addnaicscode(); // to add a new text box for ****** Naics Code ******

            var getcount = cnt;
            $('#txtnaicscode_' + getcount).val(NaicsCode_R[i]);// to add a value in text box

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetNAICSFam",
                data: "{'Code': '" + NaicsCode_R[i] + "'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.length > 0) {
                        $('#txtnaicsdesc_' + getcount).val(result[0]);
                    }
                },
                error: function ajaxError(err) {
                }
            });
        }


    });

    $('#NaicsCodeModal').modal('toggle');


});
// #################### Naics Code popup data Remove/Add Cancel ################### //


// #################### Naics Family popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnNaicsfamilyCancel', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".NaicsFamCode").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var n = NaicsCode_R.includes($('#txtnaicsfamcode_' + spl[1]).val());
        if (n != true) {
            //console.log($("yes", '#txtnaicscode_' + spl[1]).val())

            $('#txtnaicsfamcode_' + spl[1]).val("");
            $('#txtnaicsfamdesc_' + spl[1]).val("");

            $('#NaicsFamilyRow_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#txtnaicscode_' + spl[1]).val())
        }
    });
    //============= Remove blank rows =========//
    //console.log('==NaicsCode==', NaicsCode_R);
    $(".NaicsFamCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Naics = $(this).val();

        var n = NaicsCode_R.includes(Naics);
        if (n == true) {
            const index = NaicsCode_R.indexOf(Naics);
            if (index > -1) {
                NaicsCode_R.splice(index, 1);
            }
            //console.log("yes", Naics);
        }
        else {
            //console.log("No", Naics);
        }

    });


    $(NaicsCode_R).each(function (i) { // To add again the removed "ok" values


        if (NaicsCode_1st.length > 0) {
            if (NaicsCode_R[i] == NaicsCode_1st[0].Code) {
                $('#txtnaicsfamcode_2').val(NaicsCode_1st[0].Code);// to add a value in text box
                $('#txtnaicsfamdesc_2').val(NaicsCode_1st[0].Desc);
            }
            else {
                addnaicsfamily(); // to add a new text box for ****** Naics Code ******

                var getcount = cntFam;
                $('#txtnaicsfamcode_' + getcount).val(NaicsCode_R[i]);// to add a value in text box

                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: "/Search/GetNAICSFam",
                    data: "{'Code': '" + NaicsCode_R[i] + "'}",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (result.length > 0) {
                            $('#txtnaicsfamdesc_' + getcount).val(result[0]);
                        }
                    },
                    error: function ajaxError(err) {
                    }
                });
            }
        }
        else {
            addnaicsfamily(); // to add a new text box for ****** Naics Code ******

            var getcount = cntFam;
            $('#txtnaicsfamcode_' + getcount).val(NaicsCode_R[i]);// to add a value in text box

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetNAICSFam",
                data: "{'Code': '" + NaicsCode_R[i] + "'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.length > 0) {
                        $('#txtnaicsfamdesc_' + getcount).val(result[0]);
                    }
                },
                error: function ajaxError(err) {
                }
            });
        }
    });

    $('#NaicsfamilyModal').modal('toggle');
    NaicsCode_1st = [];

});
// #################### Naics Family popup data Remove/Add Cancel ################### //




//===================== Dept / Agency [cancel] ===================//

$(document).on('click', '#btnmdcancel', function () {
    //============= Remove blank rows =========//
    var len = "";
    $(".DeptMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        if ($('#lblagency_' + spl[1]).text() == "") {
            $('#txtdept_' + spl[1]).val("");
            $('#lbldept_' + spl[1]).text("");
            $('#txtagency_' + spl[1]).val("");
            $('#lblagency_' + spl[1]).text("");
        }
        var n = Departmentcode_R.includes($('#lbldept_' + spl[1]).text());
        if (n != true) {
            //$('#txtdept_' + spl[1]).val("");
            //$('#lbldept_' + spl[1]).text("");
            //$('#txtagency_' + spl[1]).val("");
            //$('#lblagency_' + spl[1]).text("");
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
        }
        else {
        }
    });
    //============= Remove blank rows =========//

    $(".lbldept").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var dept = $(this).text();

        var n = Departmentcode_R.includes(dept);
        if (n == true) {
            const index = Departmentcode_R.indexOf(dept);
            if (index > -1) {
                Departmentcode_R.splice(index, 1);
            }
        }
        else {
        }

    });
    $(".lblagency").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Agency = $(this).text();

        var n = AgencyCode_R.includes(Agency);
        if (n == true) {
            const index = AgencyCode_R.indexOf(Agency);
            if (index > -1) {
                AgencyCode_R.splice(index, 1);
            }
        }
        else {
        }

    });

    $(Departmentcode_R).each(function (i) { // To add again the removed "ok" values

        var result = DeptCombo[0].filter(obj => {
            return obj.id === Departmentcode_R[i];
        });

        if (DepartmentAgencycode_1st.length > 0) {
            if (Departmentcode_R[i] == DepartmentAgencycode_1st[0].DeptCode) {

                $('#txtdept_2').val(DepartmentAgencycode_1st[0].DeptDesc);// to add a value in text box
                $('#lbldept_2').text(DepartmentAgencycode_1st[0].DeptCode);// to add a value in text box
                $('#txtagency_2').val(DepartmentAgencycode_1st[0].AgencyDesc);// to add a value in text box
                $('#lblagency_2').text(DepartmentAgencycode_1st[0].AgencyCode);// to add a value in text box

            }
            else {
                adddepartment(); // to add a new text box for ****** DEPARTMENT ******
                var getcount = cntdept;
                $('#txtdept_' + getcount).val(result[0].value);// to add a value in text box
                $('#lbldept_' + getcount).text(Departmentcode_R[i]);// to add a value in text box


                addagency();
                if (AgencyCode_R.length > 0) {
                    getAgency(Departmentcode_R[i]);

                    var Agencyresult = Agencycombo[0].filter(obj => {
                        return obj.id === AgencyCode_R[i];
                    });


                    // to add a new text box for ****** AGENCY ******
                    var A_getcount = cntagency;
                    $('#txtagency_' + A_getcount).val(Agencyresult[0].value);// to add a value in text box
                    $('#lblagency_' + A_getcount).text(AgencyCode_R[i]);// to add a value in text box

                    //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
                }
            }
        }
        else {
            adddepartment(); // to add a new text box for ****** DEPARTMENT ******
            var getcount = cntdept;
            $('#txtdept_' + getcount).val(result[0].value);// to add a value in text box
            $('#lbldept_' + getcount).text(Departmentcode_R[i]);// to add a value in text box


            addagency();
            if (AgencyCode_R.length > 0) {
                getAgency(Departmentcode_R[i]);

                var Agencyresult = Agencycombo[0].filter(obj => {
                    return obj.id === AgencyCode_R[i];
                });


                // to add a new text box for ****** AGENCY ******
                var A_getcount = cntagency;
                $('#txtagency_' + A_getcount).val(Agencyresult[0].value);// to add a value in text box
                $('#lblagency_' + A_getcount).text(AgencyCode_R[i]);// to add a value in text box

                //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
            }
        }


    });

    $('#myModal').modal('toggle');
});

function adddepartment() {

    //console.log(DeptCombo[0].length);

    var maxdept = DeptCombo[0].length;


    if (cntdept < maxdept) {
        cntdept++;


        var filldata = '<div class="dept_' + cntdept + ' row col-md-12 dept DeptMainrows" id="DeptRow_' + cntdept + '">' +

                        '<div class="col-md-11 s004">' +

                                '<div class="input-group mb-3">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text btndeptrowclear" id="btndeptrowclear_' + cntdept + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
                                    '</div>' +
                                    '<input style="font-size: 13px;" type="text" id="txtdept_' + cntdept + '" class="DIS_002 form-control  txtdept dis_able1" name="textbox" /><label id="lbldept_' + cntdept + '" style="display:none;" class="lbldept"></label>' +
                                    '<div class="input-group-append">' +
                                    '<span class="input-group-text s001">' +
                                        '<i class="ti-info-alt infoIcon s002 DEPT" data-toggle="tooltip"></i>' +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                         '</div>' +

                         '<div class="col-md-1">' +
                            '<div class="row">' +
                                '<div class="col-md-12">' +
                                '<button type="button" id="btnremovedept_' + cntdept + '" class="s022 btn btn-danger btn-sm dis_able1 B_s004 remove-textboxdept" data-toggle="tooltip" title="Click here to Remove selected row" style="margin-left:auto !important">' +
                                '<i class="ti-minus"></i>' +
                            '</button>' +



                               ' </div>' +
                       '</div>' +
                     '</div>' +
                   '</div>'

        $(".deptincr").append(filldata);

    } //$(".add-textboxagency").trigger("click");
    set_Helpicon();
}

function addagency() {
    var maxagency = DeptCombo[0].length;


    if (cntagency < maxagency) {
        cntagency++;


        var filldata = '<div class="agency_' + cntagency + ' row col-md-12 agency">' +

                        '<div class="col-md-12 s004">' +

                                '<div class="input-group mb-3">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text btnclearagency" id="btnagencyrowclear_' + cntagency + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
                                    '</div>' +
                                    '<input style="font-size: 13px;" type="text" id="txtagency_' + cntagency + '" class="DIS_002 form-control txtagency dis_able1" name="textbox" /><label id="lblagency_' + cntagency + '" style="display:none;" class="lblagency"></label>' +
                                    '<div class="input-group-append">' +
                                    '<span class="input-group-text s001">' +
                                        '<i class="ti-info-alt infoIcon s002 AGCY" data-toggle="tooltip"></i>' +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                         '</div>' +

                         '<div class="col-md-1" style="display:none">' +
                            '<div class="row">' +
                                '<div class="col-md-12">' +
                                '<button type="button" id="btnremoveagency_' + cntagency + '" class="s022 btn btn-danger btn-sm dis_able1 B_s004 remove-textboxagency" data-toggle="tooltip" title="Click here to Remove selected row" style="margin-left:auto !important">' +
                                '<i class="ti-minus"></i>' +
                            '</button>' +



                               ' </div>' +
                       '</div>' +
                     '</div>' +
                   '</div>'

        $(".agencyincr").append(filldata);
    }
    set_Helpicon();
}


// #################### Naics Code popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnmdpsccancel', function () {
    ClosePSCPopup();
    //============= Remove blank rows =========//
    var len = "";
    $(".PSCRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var n = PSC_R.includes($('#txtpsccode_' + spl[1]).val());
        if (n != true) {
            //console.log($("yes", '#txtnaicscode_' + spl[1]).val())

            $('#txtpsccode_' + spl[1]).val("");
            $('#txtpscdesc_' + spl[1]).val("");

            $('#IDpsc_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#txtnaicscode_' + spl[1]).val())
        }
    });
    //============= Remove blank rows =========//
    //console.log('==NaicsCode==', NaicsCode_R);
    $(".PSCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var PSC = $(this).val();

        var n = PSC_R.includes(PSC);
        if (n == true) {
            const index = PSC_R.indexOf(PSC);
            if (index > -1) {
                PSC_R.splice(index, 1);
            }
            //console.log("yes", Naics);
        }
        else {
            //console.log("No", Naics);
        }

    });
   
    //console.log(PSC_R);

    $(PSC_R).each(function (i) { // To add again the removed "ok" values

        if (PSC_1st.length > 0) {
            if (PSC_R[i] == PSC_1st[0].Code) {
                $('#txtpsccode_2').val(PSC_1st[0].Code);// to add a value in text box
                $('#txtpscdesc_2').val(PSC_1st[0].Desc);
            }
            else {
                addpsc(); // to add a new text box for ****** Naics Code ******

                var getcount = cntpsc;
                $('#txtpsccode_' + getcount).val(PSC_R[i]);// to add a value in text box

                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: "/Opportunity/GetPSC",
                    data: "{'Code': '" + PSC_R[i] + "'}",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (result.length > 0) {
                            $('#txtpscdesc_' + getcount).val(result[0]);
                        }
                    },
                    error: function ajaxError(err) {
                    }
                });
            }
        } else {
            addpsc(); // to add a new text box for ****** Naics Code ******

            var getcount = cntpsc;
            $('#txtpsccode_' + getcount).val(PSC_R[i]);// to add a value in text box

            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Opportunity/GetPSC",
                data: "{'Code': '" + PSC_R[i] + "'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.length > 0) {
                        $('#txtpscdesc_' + getcount).val(result[0]);
                    }
                },
                error: function ajaxError(err) {
                }
            });
        }

    });
    //$(".btnpscrowclear_1").trigger("click");
    //$(".btnpscrowclear").trigger("click");
    $('#PscModal').modal('toggle');


});
// #################### Naics Code popup data Remove/Add Cancel ################### //


$(document).on("click", "#btnmdpscclose", function (e) {
    ClosePSCPopup();
    //============= Remove blank rows =========//
    $('#PscModal').modal('toggle');
});

function ClosePSCPopup() {


    PSC = [];

    //============= Remove blank rows =========//
    var len = "";
    $(".PSCRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var PS_Code = $('#txtpsccode_' + spl[1]).val();
        if (PS_Code == "" || PS_Code == undefined) {
            $('.psc_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtpsccode_2').val() == "") {

                $('#txtpsccode_2').val($('#txtpsccode_' + spl[1]).val());
                $('#txtpscdesc_2').val($('#txtpscdesc_' + spl[1]).val());


                $('.psc_' + spl[1]).remove();

            }
        }
    });

    setTimeout(function () {

        $(".PSCode").each(function () {

            var pscodecheck = $('#txtpscdesc_2').val();
            var pscode = $(this).val();
            PSC.push(pscode);
            PSC = PSC.filter(item => item);
            PSC = PSC.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            if (pscodecheck != "") {
                if (PSC.length > 1) {
                    $('#lbltotalpsc').show();
                    $('#lbltotaladdedrowpsc').text((PSC.length - 1));
                }
                else {
                    $('#lbltotalpsc').hide();
                }
            }
            PSC_R = PSC.slice();
        });

        $('#txtpsccode_1').val($('#txtpsccode_2').val());
        $('#txtpscdesc_1').val($('#txtpscdesc_2').val());


    }, 200);

}



// #################### Socioeconomic popup #################### //


$(document).on('click', '.OpenMinContSize', function () {
    $('#Mysocio').modal('toggle');
    ListSocio();
});



$(document).on('click', '#Res_totalSocio', function () {
    $('.OpenMinContSize').trigger('click');
});

$(document).on('click', '#OKSocio', function () {
    OKSocio = [];
    $('#tbl_Socio input:checked').each(function (index, element) {
        OKSocio.push({ value: this.value, text: this.id });
    });
    if (OKSocio.length < 1) {
        $(".OpenMinContSize").val('');
    }
    //console.log("getsoc", OKSocio);
    $('#Mysocio').modal('hide');

    SocioCount();
});


$(document).on('click', '#CancelSocio', function () {

    //$('.clsSocioeconomic input:checked').removeAttr('checked');
    $('.Socioec').prop('checked', false);
    $('.Socioec').parent().parent().parent().css("background-color", "");

    $(OKSocio).each(function (index, element) {

        $('.clsSocioeconomic input:checkbox[value="' + OKSocio[index].value + '"]').prop('checked', true);
        $('.clsSocioeconomic input:checkbox[value="' + OKSocio[index].value + '"]').parent().parent().parent().css("background-color", "#e8cfff");
    });

    $('#Mysocio').modal('toggle');

    SocioCount();
});

$(document).on('change', '.Socioec', function () {

    if (this.checked) {
        //OKSocio.push({ value: this.value, text: this.id });

        $(this).parent().parent().parent().css("background-color", "#e8cfff");
    }
    else {
        //OKSocio = OKSocio.filter((item) => item.text !== this.id);
        $(this).parent().parent().parent().css("background-color", "");
    }

    //ListSocio();

});

function ListSocio() {


    $(".SocioList").html("");
    for (i = 0; i < OKSocio.length; i++) {
        var value = OKSocio[i].value;
        var text = OKSocio[i].text;
        $(".SocioList").append($("<div style='width: fit-content;font-size: 11px;font-weight: 200;padding: 10px 6px 0px 6px;1px solid #e8e8e8;float: left;'><label style='font-weight: 400;' id=" + value + ">" + text + "</label><span style='margin-left: 6px;color: #ce0404;'><i class='fas fa-times'></i></span></div>"));
    }
}

function SocioCount() {
    $('.OpenMinContSize').val(OKSocio[0].text);

    if (OKSocio.length == 0) {
        $("#Res_totalSocio").css("display", "block");
        $('#lblRes_Socio').text(OKSocio.length - 1);
    }
    else {
        $("#Res_totalSocio").css("display", "none");
        $('#lblRes_Socio').text("");
    }
}
// #################### Socioeconomic popup #################### //
// Daily Email Popup//
$(document).on('click', '#btnOkDailyEmail', function () {
    // save data of popup to database
    searchParameters.daily_report_name = $("#daily_report_name").val();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Opportunity/SaveOpportunityEmail",
        data: "{parameters:" + JSON.stringify(searchParameters) + "}",
        dataType: "json",
        async: true,

        success: function (response) {

            $('#DailyEmail').modal('toggle');
            swal("", "Request submitted successfully. <br/> Emails are sent daily by 08:00 EST.", "success");

        },
        error: function ajaxError(err) {

            swal("", err);
        }
    });
});

$(document).on('click', '#btnCancelDailyEmail', function () {
    $('#DailyEmail').modal('toggle');
});

function chatWithDocs() {
    if (notifyArray.length==0) {
        swal("", "please choose opportunity", "warning");
        return
    }
    window.open(
        `/Opportunity/Chat?id=${JSON.stringify(notifyArray)}`, "_blank");
   // document.location = `/Opportunity/Chat?id=${JSON.stringify(notifyArray)}`;
}

function FillOpportunityPopup() {
    var filldata = "";
    var report_name_section = '<div class="col-md-6 title2"><label>Title of Daily Report: </label>' +
        '<div class="input-group mb-3">' +
        '<input type="text" class="DIS_002 form-control col-md-12" id="daily_report_name" name="daily_report_name" />' +
        '<div class="input-group-append">' +
        '<span class="input-group-text s001">' +
        '</span>' +
        '</div></div>' +
        '<label class="form-control-static pull-left lbl_S001">This title will appear in the header of your daily report. Choose a title that describes this query and will be recognizable.</label></div>';

    searchParameters = {};
   
    if (Type === 'Type1') {

        if ($("#txtsolicitationnumber").val() !== "" && $("#txtsolicitationnumber").val() !== null) {

            searchParameters.solicitation_number = $("#txtsolicitationnumber").val();
            filldata = filldata + '<ul>' +
                '<li><label>Solicitation Number : ' + searchParameters.solicitation_number + '</label></li>' +
                '</ul>' + report_name_section;
            $('#selectOpportunitySearchData').html(filldata);
            $('#DailyEmail').modal('toggle');
        }
        else {
            swal("", "please choose any search parameter", "warning");
        }
    }
    else {
        NaicsCode = [];
        DepartmentCode = [];
        AgencyCode = [];
        PSC = [];
        DepartmentDescription = [];
        AgencyDescription = [];
        PSCDesc = [];
        NaicsDesc = [];
        getval = [];
        getSocioText = [];
        if (NAICS_mode == "NaicsFamCode") {

            $(".NaicsFamCode").each(function () {


                var naicsfam = $(this).val();
                NaicsCode.push(naicsfam);

            });

            $(".txtnaicsFamdesc").each(function () {
                var naicscdesc = $(this).val();
                NaicsDesc.push(naicscdesc);
                NaicsDesc = NaicsDesc.filter(item => item);
                NaicsDesc = NaicsDesc.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

            });
        }
        else if (NAICS_mode == "NaicsCode") {
            $(".NaicsCode ").each(function () {


                var naicscode = $(this).val();
                NaicsCode.push(naicscode);

            });
            $(".txtnaicsdesc").each(function () {
                var naicscdesc = $(this).val();
                NaicsDesc.push(naicscdesc);
                NaicsDesc = NaicsDesc.filter(item => item);
                NaicsDesc = NaicsDesc.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

            });
        }
        NaicsDesc = NaicsDesc.join();
        NaicsCode = NaicsCode.filter(item => item);

        var NAICS = NaicsCode.join();


        var naics_family = "";

        if ($('#txtnaicsfamcode_1').val() != "") {
            naics_family = '1';
        }
        else if ($('#txtnaicscode_1').val() != "") {
            naics_family = '0';
        }

        $(".lbldept").each(function () {
            var dept = $(this).text();

            DepartmentCode.push(dept);
        });

        if (DepartmentCode.length > 0) {
            DepartmentCode = DepartmentCode.filter(item => item);
            DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var department_group_code = DepartmentCode.join();
            DepartmentCode = department_group_code;
        }


        // ====================== GetDepartment Description ========================//
        $(".txtdept").each(function () {
            var dept = $(this).val();
            if (dept != "") {
                DepartmentDescription.push(dept);
            }

        });
        if (DepartmentDescription.length > 0) {
            DepartmentDescription = DepartmentDescription.filter(item => item);
            DepartmentDescription = DepartmentDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

            var department_group_code = DepartmentDescription.join();
            //console.log("DepartmentDescription", department_group_code);
            DepartmentDescription = department_group_code;
        }
        // ====================== GetDepartment Description ========================//

        $(".lblagency").each(function () {
            var agency = $(this).text();

            AgencyCode.push(agency);
        });

        if (AgencyCode.length > 0) {
            AgencyCode = AgencyCode.filter(item => item);
            AgencyCode = AgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var agency_group_code = AgencyCode.join();
            AgencyCode = agency_group_code;
            // alert(AgencyCode);
        }

        // ====================== GetAgency Description========================//
        $(".txtagency").each(function () {
            var agency = $(this).val();

            if (agency != "") {
                AgencyDescription.push(agency);
            }
        });
        if (AgencyDescription.length > 0) {
            AgencyDescription = AgencyDescription.filter(item => item);
            AgencyDescription = AgencyDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var agency_group_code = AgencyDescription.join();
            //console.log("AgencyDescription",agency_group_code);
            AgencyDescription = agency_group_code;
            // alert(AgencyDescription);
        }
        // ====================== GetAgency Description========================//


        if (PSC_mode == "PSCCode") {

            $(".PSCode").each(function () {

                var psc = $(this).val();
                PSC.push(psc);

            });
        }

        PSC = PSC.filter(item => item);

        var psc = PSC.join();
        // ====================== GetPsc Description========================//
        $(".txtpsc").each(function () {
            var psc = $(this).val();

            if (psc != "") {
                PSCDesc.push(psc);
            }
        });
        if (PSCDesc.length > 0) {
            PSCDesc = PSCDesc.filter(item => item);
            PSCDesc = PSCDesc.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var PSCDesc = PSCDesc.join();
        }
        // ====================== GetPsc Description========================//


        $('.clsSocioeconomic input:checked').each(function () {
            getval.push(this.value);

        });
        $('.clsSocioeconomic input:checked').each(function () {
            getSocioText.push(this.id);

        });
        var business_type_code_list = "";
        if (getval != null) {
            business_type_code_list = getval.join();

        }
        var socio_text_list = "";
        if (getSocioText != null) {
            socio_text_list = getSocioText.join();

        }

        if ($('.txtagency').val() == "") {
            agency_group_code = "";
        }

        if ($('.txtdept').val() == "") {
            department_group_code = "";
        }


        if (NAICS.length == 0) {
            swal("", "Please select a NAICS Code or Family to use the Daily Email feature", "warning");
        }
        else
        {
            //var PosteDateStart = $('#txtposteddatestart').val();
            //var PosteDateEnd = $('#txtposteddateend').val();
            var keyword_list = $('#txtkeyword').val();
            var BaseType = $('#txtbasetype').val();
            //var SolicitationNumber = $('#txtsolicitationnumber').val();

            //searchParameters.Solicitation_Number = SolicitationNumber.length > 0 ? SolicitationNumber : 'NA';
            //OpportunityData.PosteDateStart = PosteDateStart,
            //OpportunityData.PosteDateEnd = PosteDateEnd,
            //searchParameters.naics_family = naics_family.length > 0 ? naics_family : 'NA';

            searchParameters.naics_code = NAICS.length > 0 ? NAICS : 'None Chosen';
            searchParameters.naics_description = NaicsDesc.length > 0 ? NaicsDesc : 'None Chosen';
            searchParameters.service_code = psc.length > 0 ? psc : 'None Chosen';
            searchParameters.service_description = PSCDesc.length > 0 ? PSCDesc : 'None Chosen';
            var display_funding_agency = department_group_code.length > 0 ? DepartmentDescription : 'None Chosen';
            var display_funding_subagency = agency_group_code.length > 0 ? AgencyDescription : 'None Chosen';
            searchParameters.funding_agency = DepartmentCode.length > 0 ? DepartmentCode : 'None Chosen';
            searchParameters.funding_sub_agency = AgencyCode.length > 0 ? AgencyCode : 'None Chosen';
            searchParameters.funding_agency_name = DepartmentDescription.length > 0 ? DepartmentDescription : 'None Chosen';
            searchParameters.funding_sub_agency_name = AgencyDescription.length > 0 ? AgencyDescription : 'None Chosen';

            searchParameters.keyword = keyword_list.length > 0 ? keyword_list : 'None Chosen';
            searchParameters.socio_economic_designation = business_type_code_list.length > 0 ? business_type_code_list : 'None Chosen';
            searchParameters.socio_economic_designation_name = socio_text_list.length > 0 ? socio_text_list : 'None Chosen';
            searchParameters.BaseType = BaseType.length > 0 ? BaseType : 'None Chosen';



            // ====================== GetNaicsType ========================//
            var naics_family = false;
            if ($('#txtnaicsfamcode_1').val() != "") {
                naics_family = true;
            }
            else if ($('#txtnaicscode_1').val() != "") {
                naics_family = false;
            }

            var display_dynamic_popup = [];


            if (searchParameters.naics_code != "None Chosen") {
                if (searchParameters.naics_code.length > 4) {
                    display_dynamic_popup.push('<td><label> NAICS Code: </label></td><td><label>' + searchParameters.naics_code + '</label ></td>');
                }
                else {
                    display_dynamic_popup.push('<td><label> NAICS Family Code: </label></td><td><label>' + searchParameters.naics_code + '</label ></td>');
                }

            }

            if (searchParameters.naics_description != "None Chosen") {
                display_dynamic_popup.push('<td><label> NAICS Description: </label></td><td><label>' + searchParameters.naics_description + '</label ></td>');
            }

            if (searchParameters.service_code != "None Chosen") {
                display_dynamic_popup.push('<td><label> PSC Code: </label></td><td><label>' + searchParameters.service_code + '</label></td>');
            }

            if (searchParameters.service_description != "None Chosen") {
                display_dynamic_popup.push('<td><label> PSC Description: </td><td><label> ' + searchParameters.service_description + '</label></td>');
            }

            if (searchParameters.funding_agency != "None Chosen") {
                display_dynamic_popup.push('<td><label> Funding Agency: </label></td><td><label>' + display_funding_agency + '</label></td>');
            }

            if (searchParameters.funding_sub_agency != "None Chosen") {
                display_dynamic_popup.push('<td><label> Funding Sub Agency: </td><td><label> ' + display_funding_subagency + '</label></td>');
            }

            if (searchParameters.keyword != "None Chosen") {
                display_dynamic_popup.push('<td><label> Keyword: </label></td><td><label>' + searchParameters.keyword + '</label></td> ');
            }

            if (searchParameters.socio_economic_designation != "None Chosen") {
                display_dynamic_popup.push('<td><label> Socio-Economic Designation(s): </label></td><td><label>' + socio_text_list + '</label ></td>');
            }

            if (searchParameters.BaseType != "None Chosen") {
                display_dynamic_popup.push('<td><label> Base Type: </td><td><label>' + searchParameters.BaseType + '</label></td>');
            }

            var displayTd = "<tr>";
            for (var i = 0; i < display_dynamic_popup.length; i++) {
                if (i % 2 == 0) {
                    displayTd += '</tr><tr>';
                }
                displayTd += display_dynamic_popup[i];

            }
            displayTd += '</tr>';
            if (displayTd === "<tr></tr>") {
                swal("", "No search parameter given for daily email.", "warning");
            } else {
                filldata = filldata + '<table width="100%" border="2px">' + displayTd + '</table>' + report_name_section;


                $('#selectOpportunitySearchData').html(filldata);
                $('#DailyEmail').modal('show');
            }
        }
    }

}
const notifyArray = []
function handleCheckboxChange(event) {

    console.log(event.target.getAttribute("noticeid"))
    if (event.currentTarget.checked) {
        notifyArray.push(event.target.getAttribute("noticeid"))
        event.target.classList.add("selectedOpportunity")
    } else {
        const index = notifyArray.indexOf(event.target.getAttribute("noticeid"));
        if (index > -1) {
            notifyArray.splice(index, 1); // 2nd parameter means remove one item only
            event.target.classList.remove("selectedOpportunity")
        }
     }
}  