var DeptCombo = [];
var Agencycombo = [];
var OfficeCombo = [];
var SolicitationCombo = [];
var AwAgencyCombo = [];
var AwSubAgencyCombo = [];
var AwOfficeCombo = [];
var NaicsCode = [];
var NaicsCode_R = [];
var NaicsCode_1st = [];

var socioeconimcVal = [];
var SocioArr = [];
var Businesssize = "";
var DepartmentCode = [];
var Departmentcode_R = [];
var DepartmentAgencycode_1st = [];
var AwardingAgencyCode = [];
var AwardingAgencycode_R = [];
var AwAgencySubAgencycode_1st = [];

var AgencyCode = [];
var AgencyCode_R = [];
var OfficeCode = [];
var OfficeCode_R = [];
var AwSubAgencyCode = [];
var AwSubAgencyCode_R = [];
var AwOfficeCode = [];
var AwOfficeCode_R = [];
var getval = [];
var get_TExt = [];
var show_get_TExt = "";
var NAICS_mode = "";
var userinfo = ""
var origin = window.location.origin;
var Type = ""
var NaicsType = "Code";
var AgencyDescription = [];
var DepartmentDescription = [];
var NaicsCodeDescription = [];
var OfficeDescription = [];
var AwAgencyDescription = [];
var AwSubAgencyDescription = [];
var AwOfficeDescription = [];

var DefaultStartDate = '2017';
var DefaultEndDate = '2022';
var FY = DefaultStartDate;
var FY_End = DefaultEndDate;
//PAram datas //

var dept = "";
var solicitation = "";
var awagency = "";

var OKSocioAside = [];

var searchParameters = {};

var BindDepartmentCode = "";
var BindAgencyCode = "";
var BindAgencyDesc = "";
var BindOfficeCode = "";
var BindOfficeDesc = "";

var BindAwAgencyCode = "";
var BindAwSubAgencyCode = "";
var BindAwSubAgencyDesc = "";
var BindAwOfficeCode = "";
var BindAwOfficeDesc = "";

var SolicitationCode = [];
var SolicitationCode_R = [];
var SolicitationDescription = [];
var Solicitationcode_1st = [];

var max = 6;
var cnt = 2;
var cntdept = 2;
var cntagency = 2;
var cntSolicitation = 2;
var maxSolicitation = 6;
var cntoffice = 2;
var cntawagency = 2;
var cntawsubagency = 2;
var cntawoffice = 2;

var maxFam = 6;
var cntFam = 2;
var MinContractSize = 0;

var MC_AutoBindData = 0;

var MarketContext_Department_Bind = [];
var MarketContext_Naics_Code = [];
var MarketContext_AwardingAgency_Bind = [];

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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
    $('#btnSearch').trigger('click', { isCopyClipBoard: true });


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
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('data');
    let paramData;
    if (myParam) {
        paramData = JSON.parse(myParam);
        MinContractSize = paramData.SimpleSearch.base_and_all_options_value
        DefaultStartDate = paramData.SimpleSearch.FY;
        DefaultEndDate = paramData.SimpleSearch.FY_End;
    }
    set_Helpicon();
    GetUserInfo();
    getSolicitationProcedure();
    getDept();

    GetSocioEconomicAside();

    Type = 'Type1';

    

    dept = getParameterByName("Dept");
    var Naics = getParameterByName("Naics");
    BindDepartmentCode = getParameterByName("DeptCode");
    Businesssize = getParameterByName("Businesssize");
    BindAgencyDesc = getParameterByName("Agency");
    solicitation = getParameterByName("SProc");
    solicitationCode = getParameterByName("SProcCode");
    BindOfficeDesc = getParameterByName("OffcDesc");
    awagency = getParameterByName("AwAgency");
    BindAwAgencyCode = getParameterByName("AwAgencyCode");
    BindAwSubAgencyDesc = getParameterByName("AwSubAgency");
    BindAwSubAgencyCode = getParameterByName("AwSubAgencyCode");
    BindAwOfficeDesc = getParameterByName("AwOffice");
    BindAwOfficeCode = getParameterByName("AwOfficeCode");
    var FYStart = getParameterByName("FYStart");
    if (FYStart == "" || FYStart == "undefined") {
        FYStart == DefaultStartDate;
    }
    FY = FYStart;
    var FYEnd = getParameterByName("FYEnd");
    if (FYEnd == "" || FYEnd == "undefined") {
        FYEnd == DefaultEndDate;
    }

    var keywordText = getParameterByName("Keyword");
    if (keywordText !== "") {
        $("#txtkeyword").val(keywordText);
    }
    FY_End = FYEnd;
    var MinimumContractSize = getParameterByName("MinimumContractSize");
    BindAgencyCode = getParameterByName("AgencyCode");
    BindOfficeCode = getParameterByName("FOfficeCode");
    len = Naics.length;

    if (dept != "") {

        $(".TypeTwo").trigger("click");
        $('.OpenDeptPopup').val(dept);
        $('#AgencyDDL').val(BindAgencyDesc);
        $('#FundingOfficeDDL').val(BindOfficeDesc);
        $('.startYear_2').val(FYStart);

        if (FYEnd == "" || FYEnd == "undefined") {
            $('.EndYear_2').val(FYEnd);
        } else {
            $('.EndYear_2').val(FY_End);
        }
        $('.OpenAwAgencyPopup').val(awagency);
        $('#AwSubAgencyDDL').val(BindAwSubAgencyDesc);
        $('#AwOfficeDDL').val(BindAwOfficeDesc);

        if (solicitation !== "" && solicitation !== undefined) {
            $('#SolicitationDDL').val(solicitationCode);
            $('#txtsolicitation_2').val(solicitation);
            $('#lblsolicitation_2').text(solicitationCode);
        }

        if (MinimumContractSize == "") {
            $(".MinContractSize_2").val(MinContractSize);
        }
        else {
            $(".MinContractSize_2").val(MinimumContractSize);
        }
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
        $(':radio[value="' + Businesssize + '"]').prop('checked', true);

        if (Businesssize == "-") {
            //$('.clsSocioeconomicAside').show();
            $('.OpenMinContSizeAside').prop('disabled', false);
            var SB_VAlues = getParameterByName("SBValues");
            var SBspl = SB_VAlues.split(',');
            $(SBspl).each(function (index, element) {
                $('.clsSocioeconomicAside input:checkbox[value="' + SBspl[index] + '"]').prop('checked', true);

            });
            $('.clsSocioeconomicAside input:checked').each(function () {
                var text = $(this).attr('id');
                var html = '<label class="lbl_S001" calss="selectcheck" title="' + text + '">' + text + '</label>';
                $('.multiSel').append(html);
            });

        }
        setTimeout(function () {
            $("#btnSearch").trigger("click");
        }, 500);
    }

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



    if (dept != "") {

        $('#txtdept_2').val(dept);
        $('#lbldept_2').text(BindDepartmentCode);
        $('#txtagency_2').val(BindAgencyDesc);
        $('#lblagency_2').text(BindAgencyCode);
        $('#txtoffice_2').val(BindOfficeDesc);
        $('#lbloffice_2').text(BindOfficeCode);
        Type = 'Type2';
    }

    if (awagency !== "") {
        $('#txtawagency_2').val(awagency);
        $('#lblawagency_2').text(BindAwAgencyCode);
        $('#txtawsubagency_2').val(BindAwSubAgencyDesc);
        $('#lblawsubagency_2').text(BindAwSubAgencyCode);
        $('#txtawoffice_2').val(BindAwOfficeDesc);
        $('#lblawoffice_2').text(BindAwOfficeCode);
    }


    if (dept == "") {
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
                            MC_AutoBindData = 1;
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
                if (result[0].Active === "True") {
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
                    $(':radio[value="ALL"]').prop('checked', true);
                    //
                    var businessSize = getParameterByName("Businesssize");
                    if (businessSize == "") {
                        Businesssize = "ALL";
                    } else {
                        Businesssize = businessSize;
                    }
                    for (var i = 0; i < result.length; i++) {

                        if (result[i].Type == "Naics" || result[i].Type == "NaicsFamily") {

                            //filldata_Naics = filldata_Naics + "<div class='mc_004 row' id=" + result[i].MarketContextID + ">" +
                            //                "<div class='col-lg-11'>" +
                            //                    "<label class='mc_005'>" + result[i].Description + " (<span>" + result[i].Code + "</span>)</label>" +
                            //                "</div>" +
                            //                "<div class='col-lg-1'>" +
                            //                    "<i class='ti-close MC_RemoveNaics' id=" + result[i].Code + " data-toggle='tooltip' title='' data-original-title='Remove this NAICS CODE from market context'></i>" +
                            //                "</div>" +
                            //            "</div>";


                            MarketContext_Naics_Code.push({ Description: result[i].Description, Code: result[i].Code });

                        }
                        else if (result[i].Type == "PSC") {

                            filldata_PSC = filldata_PSC + "<div class='mc_004 row' id=" + result[i].MarketContextID + ">" +
                                "<div class='col-lg-11'>" +
                                "<label class='mc_005'>" + result[i].Description + " (<span>" + result[i].Code + "</span>)</label>" +
                                "</div>" +
                                "<div class='col-lg-1'>" +
                                "<i class='ti-close MC_RemovePSC' id=" + result[i].Code + " data-toggle='tooltip' title='' data-original-title='Remove this PSC from market context'></i>" +
                                "</div>" +
                                "</div>";
                        }
                        else if (result[i].Type == "Department_Agency") {

                            var Code = result[i].Code.split('/');
                            var Description = result[i].Description.split('/');

                            var DeptDesc = paramData ? paramData.SimpleSearch.department_name : Description[0];
                            var AgencyDesc = paramData ? paramData.SimpleSearch.agency_name : Description[1];
                            var OfficeDesc = paramData ? paramData.SimpleSearch.office_name : Description[2];

                            var DeptCode = paramData ? paramData.SimpleSearch.department_code : Code[0];
                            var AgencyCode = paramData ? paramData.SimpleSearch.agency_code : Code[1];
                            var OfficeCode = paramData ? paramData.SimpleSearch.funding_office_code : Code[2];

                            MarketContext_Department_Bind.push({ DeptDesc: DeptDesc, DeptCode: DeptCode, AgencyDesc: AgencyDesc, AgencyCode: AgencyCode, OfficeDesc: OfficeDesc, OfficeCode: OfficeCode });
                        }
                        else if (result[i].Type == "Awarding_Agency_SubAgency") {

                            var ACode = result[i].Code.split('/');
                            var ADescription = result[i].Description.split('/');

                            var AAgencyDesc = ADescription[0];
                            var ASubAgencyDesc = ADescription[1];
                            var AOfficeDesc = ADescription[2];

                            var AAgencyCode = ACode[0];
                            var ASubAgencyCode = ACode[1];
                            var AOfficeCode = ACode[2];

                            MarketContext_AwardingAgency_Bind.push({ AAgencyDesc: AAgencyDesc, AAgencyCode: AAgencyCode, ASubAgencyDesc: ASubAgencyDesc, ASubAgencyCode: ASubAgencyCode, AOfficeDesc: AOfficeDesc, AOfficeCode: AOfficeCode });
                        }
                    }

                    if (paramData && paramData.SimpleSearch.NAICS) {
                        MarketContext_NaicsCode = [];
                        paramData.SimpleSearch.NAICS.split(',').forEach((item, index) => {
                            MarketContext_NaicsCode.push({
                                Description: paramData.SimpleSearch.naics_name.split(',')[index],
                                Code: item
                            })
                        });

                    }
                    // ################## Bind MarketContext Data ################## //





                    // ====================== NaicsCode =================== //

                    if (MarketContext_Naics_Code[0].Code.length == 4) {

                        NAICS_mode = "NaicsFamCode";
                        NaicsType = "Code";
                        $('.btn-toggle_Naics').trigger('click');

                        $('#txtnaicsfamcode_1').val(MarketContext_Naics_Code[0].Code);
                        $('#txtnaicsfamdesc_1').val(MarketContext_Naics_Code[0].Description);

                        $('#txtnaicsfamcode_2').val(MarketContext_Naics_Code[0].Code);
                        $('#txtnaicsfamdesc_2').val(MarketContext_Naics_Code[0].Description);


                        for (var i = 1; i < MarketContext_Naics_Code.length; i++) {
                            addnaicsfamily();
                            var NaicsCodeCount = cnt++;
                            NaicsCodeCount = (NaicsCodeCount + 1);

                            $('#txtnaicsfamcode_' + NaicsCodeCount).val(MarketContext_Naics_Code[i].Code);
                            $('#txtnaicsfamdesc_' + NaicsCodeCount).val(MarketContext_Naics_Code[i].Description);

                        }

                        removeNaicsFamilyEmpty();
                        NaicsFamPopup();
                    }
                    else if (MarketContext_Naics_Code[0].Code.length == 6) {

                        NAICS_mode = "NaicsCode";
                        //NaicsType = "Family";
                        //$('.btn-toggle_Naics').trigger('click');

                        $('#txtnaicscode_1').val(MarketContext_Naics_Code[0].Code);
                        $('#txtnaicsdesc_1').val(MarketContext_Naics_Code[0].Description);

                        $('#txtnaicscode_2').val(MarketContext_Naics_Code[0].Code);
                        $('#txtnaicsdesc_2').val(MarketContext_Naics_Code[0].Description);

                        for (var i = 1; i < MarketContext_Naics_Code.length; i++) {
                            addnaicscode();
                            var NaicsFamilyCodeCount = cntFam++;
                            NaicsFamilyCodeCount = (NaicsFamilyCodeCount + 1);
                            $('#txtnaicscode_' + NaicsFamilyCodeCount).val(MarketContext_Naics_Code[i].Code);
                            $('#txtnaicsdesc_' + NaicsFamilyCodeCount).val(MarketContext_Naics_Code[i].Description);
                        }

                        removeBlkRow();
                        clearNaicsPopup();
                    }
                    // ====================== Dept/Agecny =================== //
                    $('#txtdept_2').val(MarketContext_Department_Bind[0].DeptDesc);
                    $('#DepartmentDDL').val(MarketContext_Department_Bind[0].DeptDesc);

                    $('#lbldept_2').text(MarketContext_Department_Bind[0].DeptCode);

                    $('#txtagency_2').val(MarketContext_Department_Bind[0].AgencyDesc);
                    $('#AgencyDDL').val(MarketContext_Department_Bind[0].AgencyDesc);


                    $('#lblagency_2').text(MarketContext_Department_Bind[0].AgencyCode);

                    $('#txtoffice_2').val(MarketContext_Department_Bind[0].OfficeDesc);
                    $('#FundingOfficeDDL').val(MarketContext_Department_Bind[0].OfficeDesc);


                    $('#lbloffice_2').text(MarketContext_Department_Bind[0].OfficeCode);

                    for (var i = 1; i < MarketContext_Department_Bind.length; i++) {
                        adddepartment();
                        addagency();
                        addoffice();

                        var DeptCount = cntdept++;
                        var AgencyCount = cntagency++;
                        var OfficeCount = cntoffice++;

                        $('#txtdept_' + DeptCount).val(MarketContext_Department_Bind[i].DeptDesc);
                        $('#lbldept_' + DeptCount).text(MarketContext_Department_Bind[i].DeptCode);

                        $('#txtagency_' + AgencyCount).val(MarketContext_Department_Bind[i].AgencyDesc);
                        $('#lblagency_' + AgencyCount).text(MarketContext_Department_Bind[i].AgencyCode);

                        $('#txtoffice_' + OfficeCount).val(MarketContext_Department_Bind[i].OfficeDesc);
                        $('#lbloffice_' + OfficeCount).text(MarketContext_Department_Bind[i].OfficeCode);
                    }

                    CloseDeptAgencyPopup();
                    // ====================== Dept/Agecny =================== //

                    // ====================== Awarding Agecny/ Sub Agency =================== //
                    if (MarketContext_AwardingAgency_Bind.length > 0) {
                        $('#txtawagency_2').val(MarketContext_AwardingAgency_Bind[0].AAgencyDesc);
                        $('#AwAgencyDDL').val(MarketContext_AwardingAgency_Bind[0].AAgencyDesc);

                        $('#lblawagency_2').text(MarketContext_AwardingAgency_Bind[0].AAgencyCode);

                        $('#txtawsubagency_2').val(MarketContext_AwardingAgency_Bind[0].ASubAgencyDesc);
                        $('#AwSubAgencyDDL').val(MarketContext_AwardingAgency_Bind[0].ASubAgencyDesc);


                        $('#lblawsubagency_2').text(MarketContext_AwardingAgency_Bind[0].ASubAgencyCode);

                        $('#txtawoffice_2').val(MarketContext_AwardingAgency_Bind[0].AOfficeDesc);
                        $('#AwOfficeDDL').val(MarketContext_AwardingAgency_Bind[0].AOfficeDesc);


                        $('#lblawoffice_2').text(MarketContext_AwardingAgency_Bind[0].AOfficeCode);
                    }

                    for (var i = 1; i < MarketContext_AwardingAgency_Bind.length; i++) {
                        addawagency();
                        addawsubagency();
                        addawoffice();

                        var AAgencyCount = cntawagency++;
                        var SubAgencyCount = cntawsubagency++;
                        var AOfficeCount = cntawoffice++;

                        $('#txtawagency_' + AAgencyCount).val(MarketContext_AwardingAgency_Bind[i].AAgencyDesc);
                        $('#lblawagency_' + AAgencyCount).text(MarketContext_AwardingAgency_Bind[i].AAgencyCode);

                        $('#txtawsubagency_' + SubAgencyCount).val(MarketContext_AwardingAgency_Bind[i].ASubAgencyDesc);
                        $('#lblawsubagency_' + SubAgencyCount).text(MarketContext_AwardingAgency_Bind[i].ASubAgencyCode);

                        $('#txtawoffice_' + AOfficeCount).val(MarketContext_AwardingAgency_Bind[i].AOfficeDesc);
                        $('#lblawoffice_' + AOfficeCount).text(MarketContext_AwardingAgency_Bind[i].AOfficeCode);
                    }

                    CloseAwardingAgencyPopup();
                    // ====================== Awarding Agency/Sub Agency =================== //

                    Type = 'Type2';

                    $(".TypeTwo").trigger("click");
                    // ====================== NaicsCode =================== //


                    // ################## Bind MarketContext Data ################## //
                }


            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }


    // ========================== string query params =========================//

    var table = $('#SimpleContractSearch').DataTable();

    table
        .clear()
        .draw();
    $('#SimpleContractSearch').parents('div.dataTables_wrapper').first().hide();
    $('[data-toggle="tooltip"]').tooltip({

        'placement': 'left'

    });
    $('[data-toggle="popover"]').popover({
        'placement': 'bottom'
    });

    $('#popoverOption').popover({ trigger: "hover" });

    $('.startYear_1').val(DefaultStartDate);
    FY = getParameterByName("FYStart");
    if (FYStart == "" || FYStart == "undefined") {
        $('.startYear_2').val(DefaultStartDate);
    }
    else {
        $('.startYear_2').val(FYStart);
    }
    $('.EndYear_1').val(DefaultEndDate);

    //$('.startYear_2').val(DefaultStartDate);

    var FYEnd = getParameterByName("FYEnd");
    if (FYEnd == "" || FYEnd == "undefined") {
        $('.EndYear_2').val(DefaultEndDate);
    }
    else {
        $('.EndYear_2').val(FYEnd);
    }

    var MinimumContractySize = getParameterByName("MinimumContractSize");
    if (MinimumContractySize == "") {
        $('.MinContractSize_2').val(MinContractSize);
    } else {
        $('.MinContractSize_2').val(MinimumContractySize);
    }

    if (Businesssize == "-") {
        //$('.clsSocioeconomicAside').show();
        $('.OpenMinContSizeAside').prop('disabled', false);
        var SB_VAlues = getParameterByName("SBValues");
        var SBspl = SB_VAlues.split(',');
        $(SBspl).each(function (index, element) {
            $('.clsSocioeconomicAside input:checkbox[value="' + SBspl[index] + '"]').prop('checked', true);

        });
        $('.clsSocioeconomicAside input:checked').each(function () {
            var text = $(this).attr('id');
            var html = '<label class="lbl_S001" calss="selectcheck" title="' + text + '">' + text + '</label>';
            $('.multiSel').append(html);
        });

    }

    var keywordText = getParameterByName("Keyword");
    if (keywordText !== "") {
        $("#txtkeyword").val(keywordText);
    }
    //getAgency();
    //getAwardValue();

    //========================================= Go to contractor Details =============================//
    //$('#SimpleContractSearch tbody').on('click', 'tr', function () {


    //    $('#ShowSearch').hide();
    //    $('#ShowcontractDetail').show();
    //    $('#cont').show();
    //    $('html, body').animate({ scrollTop: '0px' }, 0);

    //    var DUNS_Value = $(this).find("#GetDuns").html();

    //    NaicsCode = [];


    //    if (NAICS_mode == "NaicsFamCode") {
    //        var code_1 = $('#txtnaicsfamcode_1').val();
    //        var code_2 = $('#txtnaicsfamcode_2').val();
    //        var code_3 = $('#txtnaicsfamcode_3').val();
    //    }
    //    else if (NAICS_mode == "NaicsCode") {
    //        var code_1 = $('#txtnaicscode_1').val();
    //        var code_2 = $('#txtnaicscode_2').val();
    //        var code_3 = $('#txtnaicscode_3').val();
    //    }


    //    if (code_1 != undefined) {
    //        NaicsCode.push(code_1);
    //    }
    //    if (code_2 != undefined) {
    //        NaicsCode.push(code_2);
    //    }
    //    if (code_3 != undefined) {
    //        NaicsCode.push(code_3);
    //    }
    //    console.log(NaicsCode);



    //    let ContractData = {}

    //    var NAICS = NaicsCode.join();
    //    var naics_family = "";
    //    if ($('#txtnaicsfamcode_1').val() != "") {
    //        naics_family = '1';
    //    }
    //    else if ($('#txtnaicscode_1').val() != "") {
    //        naics_family = '0';
    //    }

    //    var business_size = Businesssize;
    //    var DUNS = DUNS_Value;
    //    var department_code = DepartmentCode;
    //    var agency_code = AgencyCode;

    //    //$('.clsSocioeconomicAside input:checked').each(function () {
    //    //    socioeconimcVal.push(this.name);
    //    //});
    //    $('.clsSocioeconomicAside input:checked').each(function () {
    //        getval.push(this.value);
    //    });
    //    var business_type_code_list = "";
    //    console.log(getval);
    //    if (getval != null) {
    //        business_type_code_list = getval.join();
    //    }


    //    if (Type == 'Type1') {

    //        var startYear = $('.startYear_2').val();
    //        var EndYear = $('.EndYear_2').val();

    //        if (startYear == "" && EndYear != "") { $('#FY_1').val(EndYear); }
    //        if (EndYear == "" && startYear != "") { $('#FY_1').val(startYear); }
    //        if (EndYear != "" && startYear != "") { $('#FY_1').val(startYear + '/' + EndYear); }

    //        console.log($('#FY_1').val());


    //        if (userinfo == "False") {
    //            var FY = "";
    //        }
    //        else {
    //            var FY = $('#FY_1').val();
    //        }

    //        var base_and_all_options_value = $(".MinContractSize_1 option:selected").text();
    //    }

    //    else if (Type == 'Type2') {

    //        var startYear = $('.startYear_2').val();
    //        var EndYear = $('.EndYear_2').val();

    //        if (startYear == "" && EndYear != "") { $('#FY_2').val(EndYear); }
    //        if (EndYear == "" && startYear != "") { $('#FY_2').val(startYear); }
    //        if (EndYear != "" && startYear != "") { $('#FY_2').val(startYear + '/' + EndYear); }

    //        console.log($('#FY_2').val());


    //        if (userinfo == "False") {
    //            var FY = "";
    //        }
    //        else {
    //            var FY = $('#FY_2').val();
    //        }

    //        var base_and_all_options_value = $(".MinContractSize_2 option:selected").text();
    //    }

    //    if ($('#AgencyDDL').val() == "") {
    //        agency_code = "";
    //    }
    //    if ($('#DepartmentDDL').val() == "") {
    //        department_code = "";
    //    }
    //    ContractData.NAICS = NAICS,
    //        ContractData.naics_family = naics_family,
    //        ContractData.business_type_code_list = business_type_code_list,
    //        ContractData.business_size = business_size,
    //        ContractData.DUNS = DUNS,
    //        ContractData.department_code = department_code,
    //        ContractData.agency_code = agency_code,
    //        ContractData.FY = FY,
    //        ContractData.base_and_all_options_value = base_and_all_options_value



    //    console.log(JSON.stringify(ContractData));
    //    $("#myModal").modal("show");
    //    if (DUNS_Value != "") {
    //        var data = "{ContractorDetails:" + JSON.stringify(ContractData) + "}";
    //        var url = "/Search/GetContractorDetails";
    //        var result = AjaxPost(url, data);
    //        console.log(result)


    //        if (result.Error == "") {

    //            if (result.EntityByDUNS.length > 0) {


    //                $('#LEGAL_BUSINESS_NAME').text(result.EntityByDUNS[0].LEGAL_BUSINESS_NAME);
    //                $('#DUNS').text(result.EntityByDUNS[0].DUNS);
    //                $('#CAGE_CODE').text(result.EntityByDUNS[0].CAGE_CODE);

    //                $('#contact_first_name_1').text(result.EntityByDUNS[0].contact_first_name_1);
    //                $('#contact_last_name_1').text(result.EntityByDUNS[0].contact_last_name_1);
    //                $('#contact_phone_1').text(result.EntityByDUNS[0].contact_phone_1);

    //                $('#contact_email_1').text(result.EntityByDUNS[0].contact_email_1);

    //                $('#contact_first_name_2').text(result.EntityByDUNS[0].contact_first_name_2);
    //                $('#contact_last_name_2').text(result.EntityByDUNS[0].contact_last_name_2);
    //                $('#contact_phone_2').text(result.EntityByDUNS[0].contact_phone_2);
    //                $('#contact_email_2').text(result.EntityByDUNS[0].contact_email_2);

    //                $('#contact_first_name_3').text(result.EntityByDUNS[0].contact_first_name_3);
    //                $('#contact_last_name_3').text(result.EntityByDUNS[0].contact_last_name_3);
    //                $('#contact_phone_3').text(result.EntityByDUNS[0].contact_phone_3);
    //                $('#contact_email_3').text(result.EntityByDUNS[0].contact_email_3);

    //                $('#contact_first_name_4').text(result.EntityByDUNS[0].contact_first_name_4);
    //                $('#contact_last_name_4').text(result.EntityByDUNS[0].contact_last_name_4);
    //                $('#contact_phone_4').text(result.EntityByDUNS[0].contact_phone_4);
    //                $('#contact_email_4').text(result.EntityByDUNS[0].contact_email_4);

    //                //$('#address_line1').text(result.EntityByDUNS[0].address_line1);
    //                $('#address_line1').text([result.EntityByDUNS[0].address_line1, result.EntityByDUNS[0].address_line2].filter(Boolean).join(", "));
    //                $('#city').text([result.EntityByDUNS[0].city, result.EntityByDUNS[0].state, result.EntityByDUNS[0].zip_code, result.EntityByDUNS[0].zip_code_4].filter(Boolean).join(", "));
    //                //$('#address_line2').text(result.EntityByDUNS[0].address_line2);
    //                //$('#city').text(result.EntityByDUNS[0].city);
    //                //$('#zip_code').text(result.EntityByDUNS[0].zip_code);
    //                //$('#zip_code_4').text(result.EntityByDUNS[0].zip_code_4);
    //                //$('#state').text(result.EntityByDUNS[0].state);
    //                $('.lblphoneno').text(function (i, text) {
    //                    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //                });

    //                if (result.GetContractorData.length > 0) {

    //                    var filldata = "";
    //                    $('#ContractorGrid_tbl').dataTable().fnDestroy();


    //                    for (var i = 0; i < result.GetContractorData.length; i++) {

    //                        var department_name = result.GetContractorData[i].department_name;
    //                        var agency_name = result.GetContractorData[i].agency_name;
    //                        var contract_type = result.GetContractorData[i].contract_type;
    //                        var Contract_number = result.GetContractorData[i].Contract_number;
    //                        var FY_awarded = result.GetContractorData[i].FY_awarded;
    //                        var NAICSvalue = result.GetContractorData[i].NAICS;
    //                        var PSC = result.GetContractorData[i].PSC;
    //                        //var Link = result.GetContractorData[i].Link;
    //                        var Referenced_idv_id = result.GetContractorData[i].Referenced_idv_id;



    //                        var total_contract_values = parseFloat(result.GetContractorData[i].total_contract_values).toFixed(2);
    //                        //var total_contract_values = result.GetContractorData[i].total_contract_values;
    //                        //page = page.concat(spanishTerms[i] + '<br>');   

    //                        total_contract_values = CommaFormatted(total_contract_values);

    //                        filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td>' + department_name + '</td><td>' + agency_name + '</td><td>' + contract_type + '</td><td class="GoContact" id=' + Contract_number + '>' + Contract_number + '</td><td>' + Referenced_idv_id + '</td><td>' + FY_awarded + '</td><td>' + NAICSvalue + '</td><td>' + PSC + '</td><td class="money">' + total_contract_values + '</td></tr>');
    //                    }

    //                    //$('.money').mask("#,##0.00", { reverse: true });
    //                    $('#ContractorGrid_tbody').html(filldata);
    //                    $('#ContractorGrid_tbl').DataTable({

    //                        dom: 'Bfrtip' +
    //                            "<'row'<'col-sm-12'tr>>" +
    //                            "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    //                        buttons: [
    //                            'excel'
    //                        ],
    //                        columnDefs: [
    //                            { className: 'text-center', targets: [0, 5, 6, 7] },
    //                            { className: 'text-right', targets: [8] }

    //                        ],
    //                        language: {
    //                            search: "Search within Grid",
    //                            //searchPlaceholder: "Search within Grid"
    //                        }



    //                    });
    //                    $('#ContractorGrid_tbl').closest('#ContractorGrid_tbody').css('max-height', '500px');
    //                    $('#ContractorGrid_tbl').DataTable().draw();
    //                }


    //                if (SocioArr.length > 0) {

    //                    var FillSocio = "";


    //                    var len = (SocioArr[0].length / 2);

    //                    //for (var i = 0; i < SocioArr[0].length; i++) {



    //                    //    var abbreviation = SocioArr[0][i].abbreviation;
    //                    //    var business_type_code = SocioArr[0][i].business_type_code;
    //                    //    //if (i <= len) {
    //                    //    FillSocio = FillSocio + "<div class='sociocont'><label style='width: 100%;' class='with-square-checkbox'><input  disabled id=" + business_type_code + " type='checkbox' value=" + business_type_code + "><span class='s017'>" + abbreviation + "</span></label></div>";
    //                    //    //}
    //                    //    //else if (i != len) {
    //                    //    //FillSocio = FillSocio + '<div class="sociocont"><div class="sociochk"><input type="checkbox" id="' + business_type_code + '"/></div><div class="sociolbl"><label>' + abbreviation + '</label></div></div>';
    //                    //    //}

    //                    //    //if (i <= len) {
    //                    //    //    FillSocio = FillSocio + '<div style="float: left;"><div  class="col-md-8"><label>' + abbreviation + '</label></div><div class="col-md-4"><input type="checkbox" id="' + business_type_code + '"/></div></div>';
    //                    //    //}
    //                    //    //else if (i != len) {
    //                    //    //    FillSocio = FillSocio + '<div class="col-md-6"><div  class="col-md-8"><label>' + abbreviation + '</label></div><div class="col-md-4"><input type="checkbox" id="' + business_type_code + '"/></div></div>';
    //                    //    //}
    //                    //}
    //                    //$('#LoadSocio').html(FillSocio);


    //                    //if (result.getsocio.length > 0) {

    //                    //    for (var i = 0; i < result.getsocio.length; i++) {

    //                    //        var business_type_code = SocioArr[0][i].business_type_code;
    //                    //        $("#" + business_type_code).prop('checked', true);

    //                    //    }

    //                    //}


    //                    if (result.getsocio.length > 0) {

    //                        for (var i = 0; i < result.getsocio.length; i++) {

    //                            var abbreviation = result.getsocio[i].abbreviation;
    //                            var business_type_code = result.getsocio[i].business_type_code;
    //                            $("#" + business_type_code).prop('checked', true);

    //                            FillSocio = FillSocio + "<div class='sociocont'><label style='width: 100%;' class='with-square-checkbox'><input  disabled id=" + business_type_code + " type='checkbox' value=" + business_type_code + "><span class='s017'>" + abbreviation + "</span></label></div>";
    //                        }
    //                    }
    //                    else {
    //                        FillSocio = FillSocio + "<div class='sociocont' style='width:100%'><h6 style='color: #bbbbbb;text-align:center;font-size: 12px;'>Their is no Socio-Economic Credentials chosen for this contractor !</h6></div>";
    //                    }

    //                    $('#LoadSocio').html(FillSocio);
    //                }

    //                if (result.S_Business.length > 0) {

    //                    var S_B = "";

    //                    for (var i = 0; i < result.S_Business.length; i++) {


    //                        var NAICS_SB = result.S_Business[i].NAICS;
    //                        var size_standard_dollars = result.S_Business[i].size_standard_dollars;
    //                        var size_standard_employees = result.S_Business[i].size_standard_employees;
    //                        var prefix = result.S_Business[i].prefix;
    //                        var suffix = result.S_Business[i].suffix;
    //                        var SBI = result.S_Business[i].SBI;

    //                        if (suffix == " employees") {
    //                            S_B = S_B.concat('<div class="row"><div class="col-md-4"><label style="font-size:12px;font-weight:300;">' + NAICS_SB + '</label></div ><div class="col-md-6"><label  style="font-size:12px;font-weight:300;">' + size_standard_employees + '' + suffix + '</label></div><div class="col-md-2" style="text-align: center;"><label  style="font-size:12px;font-weight:300;">' + SBI + '</label></div></div>');
    //                        }
    //                        else if (suffix == " million") {
    //                            S_B = S_B.concat('<div class="row"><div class="col-md-4"><label style="font-size:12px;font-weight:300;">' + NAICS_SB + '</label></div ><div class="col-md-6"><label  style="font-size:12px;font-weight:300;">' + prefix + '' + size_standard_dollars + '' + suffix + '</label></div><div class="col-md-2" style="text-align: center;"><label  style="font-size:12px;font-weight:300;">' + SBI + '</label></div></div>');
    //                        }
    //                    }
    //                    $('#LoadsmallBusiness').html(S_B);
    //                }

    //                $("#myModal").modal("show");
    //            }

    //        }
    //        else {
    //            swal("", result.Error);
    //        }
    //    }
    //    else {
    //        swal("", "DUNS Value cannot be Empty !");

    //    }

    //});
    //========================================= Go to contractor Details =============================//

    //=============================== Add NaicsCode New fieds ==========================================//



    $('#lbltotalnaicsfamily').click(function () {
        $('#NaicsfamilyModal').modal('show');

    });

    //=============================== modal popup Naics Family close end ==========================================//

    function FundingSet() {
        cntdept = 2;
        cntagency = 2;
        cntoffice = 2;
        Departmentcode_R = [];
        Departmentcode_R = DepartmentCode.slice();
        if (Departmentcode_R.length > 1) {
            cntdept = Departmentcode_R.length + 1;
            cntagency = cntdept;
            cntoffice = cntdept;
        }
    }

    function SetAwardingAgency() {
        cntawagency = 2;
        cntawsubagency = 2;
        cntawoffice = 2;
        AwardingAgencycode_R = [];
        AwardingAgencycode_R = AwardingAgencyCode.slice();
        if (AwardingAgencycode_R.length > 1) {
            cntawagency = AwardingAgencycode_R.length + 1;
            cntawsubagency = cntawagency;
            cntawoffice = cntawagency;
        }
    }
    //=============================== NAICS code ==========================================//

    //===============================DEaprtMent(Funding Agency) Popup//=============================== //
    $(document).on("click", ".OpenDeptPopup", function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
        setTimeout(function () {
            $("#txtdept_2").focus();
            FundingSet();
            
            //console.log(Departmentcode_R)
        }, 1000);

    });
    //===============================DEaprtMent(Funding Agency) Popup//=============================== //

    //===============================Awarding Agency Popup//=============================== //
    $(document).on("click", ".OpenAwAgencyPopup", function (e) {
        e.preventDefault();
        $('#awardingAgencyModal').modal('show');
        setTimeout(function () {
            $("#txtawagency_2").focus();
            AwardingAgencycode_R = [];
            AwardingAgencycode_R = AwardingAgencyCode.slice();
            SetAwardingAgency();
            //console.log(Departmentcode_R)
        }, 1000);

    });
    //===============================Awarding Agency Popup//=============================== //


    //===============================Solicitation Popup//=============================== //
    $(document).on("click", ".OpenSolicitationPopup", function (e) {
        e.preventDefault();
        $('#solicitationModal').modal('show');
        setTimeout(function () {
            $("#txtsolicitation_2").focus();
            SolicitationCode_R = [];
            SolicitationCode_R = SolicitationCode.slice();
            if (SolicitationCode_R.length > 1) {
                cntSolicitation = SolicitationCode_R.length + 1;
            }
            else {
                cntSolicitation = 2;
            }
            //console.log(SolicitationCode_R);
        }, 1000);

    });
    //===============================Solicitation Popup//=============================== //

    //===============================Agency Popup//=============================== //
    $(document).on("click", ".OpenAgencyPopup", function (e) {

        e.preventDefault();
        $('#myModal').modal('show');
        setTimeout(function () {
            $("#txtdept_2").focus();
            AgencyCode_R = [];
            AgencyCode_R = AgencyCode.slice();
            FundingSet();
        }, 1000);

    });
    //===============================Agency Popup//=============================== //

    //===============================Funding Office Popup//=============================== //
    $(document).on("click", ".OpenOffcPopup", function (e) {

        e.preventDefault();
        $('#myModal').modal('show');
        setTimeout(function () {
            $("#txtdept_2").focus();
            AgencyCode_R = [];
            AgencyCode_R = AgencyCode.slice();
            OfficeCode_R = [];
            OfficeCode_R = OfficeCode.slice();
            FundingSet();
        }, 1000);

    });
    //===============================Funding Office Popup//=============================== //

    //===============================Awarding Agency Popup//=============================== //
    $(document).on("click", ".OpenAwSubAgencyPopup", function (e) {

        e.preventDefault();
        $('#awardingAgencyModal').modal('show');
        setTimeout(function () {
            $("#txtawagency_2").focus();
            AwardingAgencycode_R = [];
            AwardingAgencycode_R = AwardingAgencyCode.slice();
            AwSubAgencyCode_R = [];
            AwSubAgencyCode_R = AwSubAgencyCode.slice();
            SetAwardingAgency();
        }, 1000);

    });
    //===============================Awarding Agency Popup//=============================== //

    //===============================Awarding Office Popup//=============================== //
    $(document).on("click", ".OpenAwOfficePopup", function (e) {

        e.preventDefault();
        $('#awardingAgencyModal').modal('show');
        setTimeout(function () {
            $("#txtawagency_2").focus();
            AwardingAgencycode_R = [];
            AwardingAgencycode_R = AwardingAgencyCode.slice();
            AwSubAgencyCode_R = [];
            AwSubAgencyCode_R = AwSubAgencyCode.slice();
            AwOfficeCode_R = [];
            AwOfficeCode_R = AwOfficeCode.slice();
            SetAwardingAgency();
        }, 1000);

    });
    //===============================Awarding Office Popup//=============================== //

    //=============================== Load Department(Funding Agency)  ==========================================//
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
                var depcod = ui.item.id;//gets the select value from autocomplete
                //alert($(this).parent().find('label').text());
                getAgency(depcod);
            }
        });
        


    });
    //=============================== Load Department(Funding Agency)  ==========================================//

    //=============================== Load Agency(Funding Sub Agency)  ==========================================//
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
                getFundingOffice(AgencyCode);
            }
        });

    });
    //=============================== Load Agency(Funding Sub Agency) ==========================================//

    //=============================== Load Funding Office  ==========================================//
    $(document).on('focus', '.txtoffice', function () {
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var GetAgencyCpde = $('#lblagency_' + id).text();
        getFundingOffice(GetAgencyCpde);

        //console.log(OfficeCombo);
        $(".txtoffice").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtoffice").autocomplete({
            minLength: 0,
            source: OfficeCombo[0],
            select: function (event, ui) {
                $('#txtoffice_' + id).val(ui.item.value);
                $('#lbloffice_' + id).text(ui.item.id);
                //$(".txtagency").val(ui.item.value);
                OfficeCode = ui.item.id;//gets the select value from autocomplete
            }
        });

    });
    //=============================== Load Funding Office  ==========================================//

    //=============================== Load Awarding Agency  ==========================================//
    $(document).on('focus', '.txtawagency', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        $(".txtawagency").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtawagency").autocomplete({
            source: AwAgencyCombo[0],
            select: function (event, ui) {

                $('#txtawagency_' + id).val(ui.item.value);
                //lbldept_1
                //$('#lbldept_1').text(ui.item.id);
                $('#lblawagency_' + id).text(ui.item.id);
                //alert($("#lbldept_1").text());
                var agencycod = ui.item.id;//gets the select value from autocomplete
                //alert($(this).parent().find('label').text());
                getAwSubAgency(agencycod);
            }
        });



    });
    //=============================== Load Awarding Agency  ==========================================//

    //=============================== Load Awarding Sub Agency  ==========================================//
    $(document).on('focus', '.txtawsubagency', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var GetAwAgencyCpde = $('#lblawagency_' + id).text();
        getAwSubAgency(GetAwAgencyCpde);

        //console.log(AwSubAgencyCombo);
        $(".txtawsubagency").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtawsubagency").autocomplete({
            minLength: 0,
            source: AwSubAgencyCombo[0],
            select: function (event, ui) {
                $('#txtawsubagency_' + id).val(ui.item.value);
                $('#lblawsubagency_' + id).text(ui.item.id);
                //$(".txtagency").val(ui.item.value);
                AwSubAgencyCode = ui.item.id;//gets the select value from autocomplete
                getAwardingOffice(AwSubAgencyCode);
            }
        });

    });
    //=============================== Load Awarding Sub Agency  ==========================================//

    //=============================== Load Awarding Office  ==========================================//
    $(document).on('focus', '.txtawoffice', function () {
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var GetSubAgencyCpde = $('#lblawsubagency_' + id).text();
        getAwardingOffice(GetSubAgencyCpde);

        //console.log(OfficeCombo);
        $(".txtawoffice").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtawoffice").autocomplete({
            minLength: 0,
            source: AwOfficeCombo[0],
            select: function (event, ui) {
                $('#txtawoffice_' + id).val(ui.item.value);
                $('#lblawoffice_' + id).text(ui.item.id);
                //$(".txtagency").val(ui.item.value);
                AwOfficeCode = ui.item.id;//gets the select value from autocomplete
            }
        });

    });
    //=============================== Load Awarding Office  ==========================================//

    //=============================== Load Solicitation  ==========================================//
    $(document).on('focus', '.txtsolicitation', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        $(".txtsolicitation").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtsolicitation").autocomplete({
            source: SolicitationCombo[0],
            select: function (event, ui) {
                $('#txtsolicitation_' + id).val(ui.item.value);
                $('#lblsolicitation_' + id).text(ui.item.id);
                var solicitationcod = ui.item.id;//gets the select value from autocomplete
                //alert($(this).parent().find('label').text());
                getAgency(solicitationcod);
            }
        });



    });

    $(".add-textboxsolicitation").on("click", function (e) {
        var solicitation = $("#txtsolicitation_2").val();

        if (solicitation !== "") {
            e.preventDefault();

            addSolicitation();
        }
        else {

            swal("", "Please enter at least one solicitation procedure field !", "info");
        }

    });

    //=============================== Load Solicitation  ==========================================//

    //=============================== Add new Funding Agency  ==========================================//
    $(".add-textboxdept").on("click", function (e) {
        var dept = $("#txtdept_2").val();

        if (dept != "") {
            e.preventDefault();

            adddepartment();
            //DepartmentCode = [];
            //DepartmentCode.push(lbldept);

            addagency();
            //AgencyCode = [];
            //AgencyCode.push(lblagency);

            addoffice();
            // Agencycombolength = Agencycombo[0].length;
            // $('#agencylength').text(Agencycombolength);
        }
        else {

            swal("", "Please enter at least one Funding agency !", "info");

            //alert("Ps add Atleast one department");
        }

    });

    //=============================== Add new Awarding Agency field  ==========================================//
    $(".add-textboxawagency").on("click", function (e) {
        var awagency = $("#txtawagency_2").val();

        if (awagency !== "") {
            e.preventDefault();

            addawagency();

            addawsubagency();

            addawoffice();
        }
        else {

            swal("", "Please enter at least one awarding agency field !", "info");
        }

    });


    //=============================== Add NaicsCode New fieds ==========================================//

    //=============================== Remove NaicsCode New fieds ==========================================//
    $(document).on("click", ".remove-textboxfam", function (e) {
        e.preventDefault();
        var getId = (this.id);

        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntFam = cntFam - 1;
        //var removeItem = $('#txtnaicsfamcode_' + id).val();
        //NaicsCode = jQuery.grep(NaicsCode, function (value) {
        //    return value != removeItem;
        //});

        $('#txtnaicsfamcode_' + id).val("");
        $('#txtnaicsfamdesc_' + id).val("");
        //$(this).parents(".naicsFam").remove();
        $(".naicsFam_" + id).remove();
       

    });
    //=============================== Remove NaicsCode New fieds ==========================================//

    //=============================== Remove NaicsFamCode New fieds ==========================================//
    $(document).on("click", ".remove-textboxnaicsfour", function (e) {
        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cnt = cnt - 1;
        //var removeItem = $('#txtnaicscode_' + id).val();
        //NaicsCode = jQuery.grep(NaicsCode, function (value) {
        //    return value != removeItem;
        //});
        $('#txtnaicscode_' + id).val("");
        $('#txtnaicsdesc_' + id).val("");
        $('.naics_' + id).remove();
        //$(this).parents(".naics").remove();
        //cnt--;





    });
    //=============================== Remove NaicsFamCode New fieds ==========================================//

    //=============================== Add NaicsFamCode New fieds ==========================================//



    //===============================  Add Department New fieds ==========================================//


    //=============================== Remove Department New fieds ==========================================//
    $(document).on("click", ".remove-textboxdept", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntdept = cntdept - 1;
        cntagency = cntagency - 1;
        cntoffice = cntoffice - 1;
        var removeItem = $('#txtdept_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });


        $(".dept_" + id).remove();
        $(".agency_" + id).remove();
        $(".office_" + id).remove();

        //cntdept--;
        //cntagency--;

        //alert(cntdept);
    });
    //=============================== Remove Department New fieds ==========================================//

    //=============================== Remove Agency New fieds ==============================================//
    $(document).on("click", ".remove-textboxagency", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntdept = cntdept - 1;
        cntagency = cntagency - 1;
        cntoffice = cntoffice - 1;
        var removeItem = $('#txtagency_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });

        $('#txtagency_' + id).val("");
        $('#txtoffice_' + id).val("");

        $(this).parents(".agency").remove();
        $(this).parents(".office").remove();
        cntagency--;
        cntoffice--;





    });
    //=============================== Remove Agency New fieds ==========================================//

    //=============================== Remove Funding Office New fieds ==============================================//
    $(document).on("click", ".remove-textboxoffice", function (e) {

        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntdept = cntdept - 1;
        cntagency = cntagency - 1;
        cntoffice = cntoffice - 1;
        var removeItem = $('#txtoffice_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });

        $('#txtoffice_' + id).val("");

        $(this).parents(".office").remove();
        cntoffice--;
    });
    //=============================== Remove Funding Office New fieds ==========================================//

    //=============================== Remove Awarding Agency New fieds ==========================================//
    $(document).on("click", ".remove-textboxawagency", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntawagency = cntawagency - 1;
        var removeItem = $('#txtawagency_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });
        cntawoffice = cntawoffice - 1;

        $(".awagency_" + id).remove();
        cntawsubagency = cntawsubagency - 1;
        $(".awsubagency_" + id).remove();
        $(".awoffice_" + id).remove();
    });
    //=============================== Remove Awarding Agency New fieds ==========================================//

    //=============================== Remove Awarding Sub Agency New fieds ==============================================//
    $(document).on("click", ".remove-textboxawsubagency", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var removeItem = $('#txtawsubagency_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });

        $('#txtawsubagency_' + id).val("");
        $('#txtawoffice_' + id).val("");

        $(this).parents(".awsubagency").remove();
        $(this).parents(".awoffice").remove();
        cntawagency--;
        cntawoffice--;
    });
    //=============================== Remove Awarding Sub Agency New fieds ==========================================//

    //=============================== Remove Awarding Office New fieds ==============================================//
    $(document).on("click", ".remove-textboxawoffice", function (e) {

        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);

        var removeItem = $('#txtawoffice_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });

        $('#txtawoffice_' + id).val("");

        $(this).parents(".awoffice").remove();
        cntawoffice--;
    });
    //=============================== Remove Awarding Office New fieds ==========================================//

    //=============================== Remove Solicitation New fields ==========================================//
    $(document).on("click", ".remove-textboxsolicitation", function (e) {


        e.preventDefault();
        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        cntSolicitation = cntSolicitation - 1;
        var removeItem = $('#txtsolicitation_' + id).val();
        NaicsCode = jQuery.grep(NaicsCode, function (value) {
            return value != removeItem;
        });


        $(".solicitation_" + id).remove();
    });
    //=============================== Remove Solicitation New fieds ==========================================//


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

    //=============================== Add Funding Office New fieds ==========================================//
    $(".add-textboxoffice").on("click", function (e) {
        var office = $("#txtoffice_2").val();
        var lbloffice = $(".lbloffice").text();
        if (office !== "") {

            e.preventDefault();

            addoffice();
            OfficeCode = [];
            OfficeCode.push(lbloffice);

        }
        else {

            swal("", "Please enter at least one funding office field !");

            //alert("Ps add Atleast one department");
        }

    });

    //=============================== Add Awarding Agency New fieds ==========================================//


    $(".add-textboxawsubagency").on("click", function (e) {
        var awsubagency = $("#txtawsubagency_2").val();
        var lblawsubagency = $(".lblawsubagency").text();
        if (awsubagency != "") {

            e.preventDefault();

            addawardingsubagency();
            AwSubAgencyCode = [];
            AwSubAgencyCode.push(lblawsubagency);

        }
        else {
            swal("", "Please enter at least one Agency field !");
        }

    });

    //=============================== Add Awarding Office New fieds ==========================================//
    $(".add-textboxawoffice").on("click", function (e) {
        var awoffice = $("#txtawoffice_2").val();
        var lblawoffice = $(".lblawoffice").text();
        if (awoffice !== "") {

            e.preventDefault();

            addawardingoffice();
            AwOfficeCode = [];
            AwOfficeCode.push(lblawoffice);

        }
        else {

            swal("", "Please enter at least one funding office field !");
        }

    });


    //=============================== modal popup Naics Code close start ==========================================//


    //$('#lbltotalnaics').click(function () {
    //    $('#NaicsCodeModal_cont').modal('show');

    //});
    $(document).on("click", "#lbltotalnaics", function (e) {

        //NaicsCode_R = [];
        //NaicsCode_R = NaicsCode.slice();
        //console.log("slice ============", NaicsCode_R);

        //$('#NaicsCodeModal').modal('show');
        $('.add-textbox').trigger('click');

    });
    //=============================== Add NaicsFamCode New fieds ==========================================//



    //=============================== NAICS Family code ========================================//
    $(document).on('keyup', '.NaicsFamCode', function () {

        var NFC = this.id;

        var spl = NFC.split('_')

        var NAICSFamCode = $('#' + NFC).val();
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
                        $('#txtnaicsfamdesc_' + spl[1]).val(result[0]);
                        //$(".dis_able1").attr('disabled', 'disabled');
                        NAICS_mode = "NaicsFamCode";

                        //NaicsCode.push(NAICSFamCode);

                    }
                    else {
                        $(".NaicsFamCode").blur();
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

    });
    //=============================== NAICS Family code ==========================================//


    //=============================== NAICS  code ==========================================//
    $(document).on('keyup', '.NaicsCode', function () {

        var NFC = this.id;

        var spl = NFC.split('_')

        var NaicsCodeval = $('#' + NFC).val();
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
                        $('#txtnaicsdesc_' + spl[1]).val(result[0]);
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        $(".NaicsCode").blur();
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

    });
    //=============================== NAICS code ==========================================//

    //=============================== Business Size ==========================================//
    $(".dropdown dt div").on('click', function () {
        $(".dropdown dd ul").slideToggle('fast');
    });

    $(".dropdown dd ul li div").on('click', function () {
        $(".dropdown dd ul").hide();
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt div span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });


    $('.mutliSelect input[type="checkbox"]').on('click', function () {

        var gettext = $(this).attr('id');
        var id = $(this).val();

        var index = getval.indexOf(id);
        var ind = get_TExt.indexOf(gettext);

        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
            title = gettext + ",";


        if ($(this).is(':checked')) {


            var html = '<label class="lbl_S001" calss="selectcheck" title="' + title + '">' + title + '</label>';
            $('.multiSel').append(html);
            get_TExt.push(gettext);
            getval.push(id);

            $(".hida").hide();

        } else {
            $('label[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            getval.splice(index, 1);
            get_TExt.splice(ind, 1);

        }

        //gettext = gettext.filter(item => item);
        //gettext = gettext.filter(function (elem, index, self) {
        //    return index === self.indexOf(elem);
        //});
    });

    $('.radiocheck').click(function () {
        Businesssize = $('input[name="businessize"]:checked').val();
        if (Businesssize === "-") {
            //$('.clsSocioeconomicAside').show();
            $('.OpenMinContSizeAside').prop('disabled', false);
        }
        else {
            OKSocioAside = [];
            $(".SocioecAside").prop('checked', false);
            $('.OpenMinContSizeAside').val('');
            $('.OpenMinContSizeAside').prop('disabled', true);
            $("#Res_totalSocio_Aside").css("display", "none");
            $('#lblRes_Socio').text("");

            //$('.clsSocioeconomicAside').hide();
        }
    });
    //=============================== Business Size ==========================================//

    //=============================== Clear Function ==========================================//
    $('#btnClear').click(function () {
        clear();
    });


    //=============================== Clear Function ==========================================//

    //=============================== Load Department  ==========================================//
    //$(document).on('focus', '#DepartmentDDL', function () {

    //    $("#DepartmentDDL").addClass('ui-autocomplete-loading');

    //    //Complaints Auto Complete
    //    $("#DepartmentDDL").autocomplete({
    //        source: DeptCombo[0],
    //        select: function (event, ui) {

    //            $("#DepartmentDDL").val(ui.item.value);
    //            DepartmentCode = ui.item.id;//gets the select value from autocomplete
    //            getAgency(DepartmentCode);
    //        }
    //    });



    //});
    //=============================== Load Department  ==========================================//


    //=============================== Load Agency  ==========================================//
    $(document).on('focus', '#AgencyDDL', function () {

        $("#AgencyDDL").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#AgencyDDL").autocomplete({
            minLength: 0,
            source: Agencycombo[0],
            select: function (event, ui) {

                $("#AgencyDDL").val(ui.item.value);
                AgencyCode = ui.item.id;//gets the select value from autocomplete
                getFundingOffice(AgencyCode);

            }
        });

    });
    //=============================== Load Agency  ==========================================//

    //=============================== Load Funding Office  ==========================================//
    $(document).on('focus', '#FundingOfficeDDL', function () {

        //console.log(Agencycombo);
        $("#FundingOfficeDDL").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#FundingOfficeDDL").autocomplete({
            minLength: 0,
            source: OfficeCombo[0],
            select: function (event, ui) {

                $("#FundingOfficeDDL").val(ui.item.value);
                OfficeCode = ui.item.id;//gets the select value from autocomplete

            }
        });

    });
    //=============================== Load Funding Office  ==========================================//

    //=============================== Load Awarding Sub Agency  ==========================================//
    $(document).on('focus', '#AwSubAgencyDDL', function () {

        //console.log(Agencycombo);
        $("#AwSubAgencyDDL").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#AwSubAgencyDDL").autocomplete({
            minLength: 0,
            source: AwSubAgencyCombo[0],
            select: function (event, ui) {

                $("#AwSubAgencyDDL").val(ui.item.value);
                AwSubAgencyCode = ui.item.id;//gets the select value from autocomplete
                getAwardingOffice(AwSubAgencyCode);
            }
        });

    });
    //=============================== Load Awarding Sub Agency  ==========================================//

    //=============================== Load Awarding Office  ==========================================//
    $(document).on('focus', '#AwOfficeDDL', function () {

        //console.log(Agencycombo);
        $("#AwOfficeDDL").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#AwOfficeDDL").autocomplete({
            minLength: 0,
            source: AwOfficeCombo[0],
            select: function (event, ui) {

                $("#AwOfficeDDL").val(ui.item.value);
                AwOfficeCode = ui.item.id;//gets the select value from autocomplete

            }
        });

    });
    //=============================== Load Awarding Office  ==========================================//

    $(document).on('click', '#btnrowclear', function () {
        $("#ContractNumber").val("");
    });



    $('#btndeprowclear').click(function () {
        $("#DepartmentDDL").val("");
        $("#AgencyDDL").val("");
        $("#FundingOfficeDDL").val("");
    });

    $('#btnAgencyclear').click(function () {
        //$("#AgencyDDL").val("");
    });

    $('#btnsolicitationrowclear').click(function () {
        $("#SolicitationDDL").val("");
    });

    
   
    if (myParam) {
        paramData = JSON.parse(myParam);
        $('#btnSearch').trigger('click', { data: paramData });
    }
});

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

    $(this).removeClass("Com_005");
    $(this).addClass("Com_006");
    $('.TypeTwo').removeClass("Com_006");
    $('.TypeTwo').addClass("Com_005");

    Type = 'Type1'; //To consolidate the search [FY, AwardAmont]
    $('.startYear_2').val(DefaultStartDate);
    $('.EndYear_2').val(DefaultEndDate);
    $('#Simplesearch').show();
    $('#AdvancedSearch').hide();
    //clear();

    $('.ADVSearchResults').hide();
    $('.SIMSearchResults').hide();
    $('#IDshowResult').hide();
    $('#IDshowfields').hide();
    $('.SearchFields').show();

    $('.lblclr').text("");
    cleartable();
   
});
$(document).on('click', '.TypeTwo', function () {

    cleartable();

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

    Type = 'Type2';//To consolidate the search [FY, AwardAmont]
    $('#Simplesearch').hide();
    $('#AdvancedSearch').show();
    if (MC_AutoBindData == 0) {
        clear();
    }
    $(".SIMSearchResults").hide();
    $(".SearchFields").show();
    $("#ContractNumber").val("");
    //$(".naicsincrFam1").css("display", "none");
    //$(".naicsincr1").css("display", "block");

    var businessSize = getParameterByName("Businesssize");
    if (businessSize == "") {
        $(':radio[value="ALL"]').prop('checked', true);
        Businesssize = $('input[name=businessize]:checked').val();
    } else {
        Businesssize = businessSize;
    }
    // ################## Bind MarketContext Data ################## //

    if (MC_AutoBindData == 1) {


        // ====================== Dept/Agecny =================== //

        // ====================== NaicsCode =================== //
        if (MarketContext_Naics_Code.length > 0) {
            if (MarketContext_Naics_Code[0].Code.length == 4) {


                NAICS_mode = "NaicsFamCode";

                NaicsType = "Family";

                $(".naicsincr1").css("display", "none");
                $(".naicsincrFam1").css("display", "block");
                $('.dis_able1').val("");
                $(".remove-textboxfam").trigger("click");
                $(".remove-textboxnaicsfour").trigger("click");

                //NaicsType = "Code";
                //$('.btn-toggle_Naics').trigger('click');
                $(".btn-toggle_Naics").addClass('active');

                $('#txtnaicsfamcode_1').val(MarketContext_Naics_Code[0].Code);
                $('#txtnaicsfamdesc_1').val(MarketContext_Naics_Code[0].Description);

                $('#txtnaicsfamcode_2').val(MarketContext_Naics_Code[0].Code);
                $('#txtnaicsfamdesc_2').val(MarketContext_Naics_Code[0].Description);


                for (var i = 1; i < MarketContext_Naics_Code.length; i++) {
                    addnaicsfamily();
                    var NaicsCodeCount = cnt++;
                    NaicsCodeCount = (NaicsCodeCount + 1);
                    $('#txtnaicsfamcode_' + NaicsCodeCount).val(MarketContext_Naics_Code[i].Code);
                    $('#txtnaicsfamdesc_' + NaicsCodeCount).val(MarketContext_Naics_Code[i].Description);

                }

            }

            else if (MarketContext_Naics_Code[0].Code.length == 6) {

                NAICS_mode = "NaicsCode";
                //NaicsType = "Code";
                //$('.btn-toggle_Naics').trigger('click');

                $('#txtnaicscode_1').val(MarketContext_Naics_Code[0].Code);
                $('#txtnaicsdesc_1').val(MarketContext_Naics_Code[0].Description);

                $('#txtnaicscode_2').val(MarketContext_Naics_Code[0].Code);
                $('#txtnaicsdesc_2').val(MarketContext_Naics_Code[0].Description);

                for (var i = 1; i < MarketContext_Naics_Code.length; i++) {
                    var Count = 0;
                    addnaicscode();
                    Count = (cntFam + 1);

                    $('#txtnaicscode_' + Count).val(MarketContext_Naics_Code[i].Code);
                    $('#txtnaicsdesc_' + Count).val(MarketContext_Naics_Code[i].Description);
                }

            }
        }
        // ====================== Dept/Agecny =================== //
        $('#txtdept_2').val(MarketContext_Department_Bind[0].DeptDesc);
        $('#DepartmentDDL').val(MarketContext_Department_Bind[0].DeptDesc);

        $('#lbldept_2').text(MarketContext_Department_Bind[0].DeptCode);

        $('#txtagency_2').val(MarketContext_Department_Bind[0].AgencyDesc);
        $('#AgencyDDL').val(MarketContext_Department_Bind[0].AgencyDesc);


        $('#lblagency_2').text(MarketContext_Department_Bind[0].AgencyCode);

        $('#txtoffice_2').val(MarketContext_Department_Bind[0].OfficeDesc);
        $('#FundingOfficeDDL').val(MarketContext_Department_Bind[0].OfficeDesc);


        $('#lbloffice_2').text(MarketContext_Department_Bind[0].OfficeCode);

        for (var i = 1; i < MarketContext_Department_Bind.length; i++) {
            adddepartment();
            addagency();
            addoffice();

            var DeptCount = cntdept++;
            var AgencyCount = cntagency++;
            var OfficeCount = cntoffice++;

            $('#txtdept_' + DeptCount).val(MarketContext_Department_Bind[i].DeptDesc);
            $('#lbldept_' + DeptCount).text(MarketContext_Department_Bind[i].DeptCode);

            $('#txtagency_' + AgencyCount).val(MarketContext_Department_Bind[i].AgencyDesc);
            $('#lblagency_' + AgencyCount).text(MarketContext_Department_Bind[i].AgencyCode);

            $('#txtoffice_' + OfficeCount).val(MarketContext_Department_Bind[i].OfficeDesc);
            $('#lbloffice_' + OfficeCount).text(MarketContext_Department_Bind[i].OfficeCode);
        }

        CloseDeptAgencyPopup();
        // ====================== Dept/Agecny =================== //

        // ====================== Awarding Agecny/ Sub Agency =================== //
        if (MarketContext_AwardingAgency_Bind.length > 0) {
            $('#txtawagency_2').val(MarketContext_AwardingAgency_Bind[0].AAgencyDesc);
            $('#AwAgencyDDL').val(MarketContext_AwardingAgency_Bind[0].AAgencyDesc);

            $('#lblawagency_2').text(MarketContext_AwardingAgency_Bind[0].AAgencyCode);

            $('#txtawsubagency_2').val(MarketContext_AwardingAgency_Bind[0].ASubAgencyDesc);
            $('#AwSubAgencyDDL').val(MarketContext_AwardingAgency_Bind[0].ASubAgencyDesc);


            $('#lblawsubagency_2').text(MarketContext_AwardingAgency_Bind[0].ASubAgencyCode);

            $('#txtawoffice_2').val(MarketContext_AwardingAgency_Bind[0].AOfficeDesc);
            $('#AwOfficeDDL').val(MarketContext_AwardingAgency_Bind[0].AOfficeDesc);


            $('#lblawoffice_2').text(MarketContext_AwardingAgency_Bind[0].AOfficeCode);
        }
        for (var i = 1; i < MarketContext_AwardingAgency_Bind.length; i++) {
            //console.log(MarketContext_AwardingAgency_Bind[i])
            addawagency();
            addawsubagency();
            addawoffice();

            var AAgencyCount = cntawagency++;
            var SubAgencyCount = cntawsubagency++;
            var AOfficeCount = cntawoffice++;

            $('#txtawagency_' + AAgencyCount).val(MarketContext_AwardingAgency_Bind[i].AAgencyDesc);
            $('#lblawagency_' + AAgencyCount).text(MarketContext_AwardingAgency_Bind[i].AAgencyCode);

            $('#txtawsubagency_' + SubAgencyCount).val(MarketContext_AwardingAgency_Bind[i].ASubAgencyDesc);
            $('#lblawsubagency_' + SubAgencyCount).text(MarketContext_AwardingAgency_Bind[i].ASubAgencyCode);

            $('#txtawoffice_' + AOfficeCount).val(MarketContext_AwardingAgency_Bind[i].AOfficeDesc);
            $('#lblawoffice_' + AOfficeCount).text(MarketContext_AwardingAgency_Bind[i].AOfficeCode);
        }

        // ====================== Awarding Agency/Sub Agency =================== //

        Type = 'Type2';


        // ====================== NaicsCode =================== //
        //$(':radio[value="ALL"]').prop('checked', true);

    }
    // ################## Bind MarketContext Data ################## //

 
});


//=============================== All Over Search ==========================================//
$(document).on('click', '#btnSearch', function (event, copyClipBoard) {

    if (typeof copyClipBoard == "undefined" || copyClipBoard.data) {
        $('.Apploader').show();
    }

    let SearchData = {}
    NaicsCode = [];
    getval = [];
    get_TExt = [];
    show_get_TExt = "";
    SearchData = {};
    DepartmentCode = [];
    AgencyCode = [];
    NaicsCodeDescription = [];
    AgencyDescription = [];
    OfficeCode = [];
    OfficeDescription = [];
    DepartmentDescription = [];
    SolicitationCode = [];
    SolicitationDescription = [];
    AwardingAgencyCode = [];
    AwAgencyDescription = [];
    AwSubAgencyCode = [];
    AwSubAgencyDescription = [];
    AwOfficeCode = [];
    AwOfficeDescription = [];

    AgencyCodeWithoutFilter = [];
    DepartmentCodeWithoutFilter = [];
    AwardingAgencyCodeWithoutFilter = [];
    AwardingSubAgencyCodeWithoutFilter = [];
    ////////////----- NAICS CODE ----------///////////////////

    if (NAICS_mode == "NaicsFamCode") {

        $(".NaicsFamCode").each(function () {
            var naicsfam = $(this).val();
            NaicsCode.push(naicsfam);

        });
        $(".lblnaicsFamdesc").each(function () {
            var naicscdesc = $(this).val();
            NaicsCodeDescription.push(naicscdesc);
            NaicsCodeDescription = NaicsCodeDescription.filter(item => item);
            NaicsCodeDescription = NaicsCodeDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

        });
    }
    else if (NAICS_mode == "NaicsCode") {
        $(".NaicsCode ").each(function () {
            var naicscode = $(this).val();
            NaicsCode.push(naicscode);

        });
        $(".lblnaicsdesc").each(function () {
            var naicscdesc = $(this).val();
            NaicsCodeDescription.push(naicscdesc);
            NaicsCodeDescription = NaicsCodeDescription.filter(item => item);
            NaicsCodeDescription = NaicsCodeDescription.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

        });


    }

    NaicsCode = NaicsCode.filter(item => item);

    var NAICS = NaicsCode.join();


    // ====================== GetDepartment ========================//
    $(".lbldept").each(function () {
        var dept = $(this).text();
        if (dept != "") {
            DepartmentCode.push(dept);
        }
    });

    if (DepartmentCode.length > 0) {       
        DepartmentCode = DepartmentCode.filter(item => item);
        DepartmentCodeWithoutFilter = DepartmentCode.slice();
        DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var department_group_code = DepartmentCode.join();
        DepartmentCode = department_group_code;
    }
    // ====================== GetDepartment ========================//

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


    // ====================== GetAgency ========================//
    $(".lblagency").each(function () {
        var agency = $(this).text();

        if (agency != "") {
            AgencyCode.push(agency);
        }
    });
    if (AgencyCode.length > 0) {        
        AgencyCode = AgencyCode.filter(item => item);
        AgencyCodeWithoutFilter = AgencyCode.slice();
        AgencyCode = AgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var agency_group_code = AgencyCode.join();
        AgencyCode = agency_group_code;
        // alert(AgencyCode);
    }
    // ====================== GetAgency ========================//

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

    // ====================== GetFundingOffice ========================//
    $(".lbloffice").each(function () {
        var office = $(this).text();

        if (office != "") {
            OfficeCode.push(office);
            //console.log(agency);
            //console.log(AgencyCode);
        }
    });
    if (OfficeCode.length > 0) {
        OfficeCode = OfficeCode.filter(item => item);
        OfficeCode = OfficeCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        //console.log(AgencyCode);
        var office_group_code = OfficeCode.join();
        //console.log(agency_group_code);
        OfficeCode = office_group_code;
        // alert(AgencyCode);
    }
    // ====================== GetFundingOffice ========================//

    // ====================== GetFundingOffice Description========================//
    $(".txtoffice").each(function () {
        var office = $(this).val();

        if (office != "") {
            OfficeDescription.push(office);
            //console.log(office);
            //console.log(OfficeDescription);
        }
    });
    if (OfficeDescription.length > 0) {
        OfficeDescription = OfficeDescription.filter(item => item);
        OfficeDescription = OfficeDescription.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        //console.log("OfficeDescription", OfficeDescription);
    }
    // ====================== GetFundingOffice Description========================//

    // ====================== GetAwardingAgency ========================//
    $(".lblawagency").each(function () {
        var awagency = $(this).text();
        if (awagency !== "") {
            AwardingAgencyCode.push(awagency);
            //console.log(awagency);
        }

    });

    if (AwardingAgencyCode.length > 0) {        
        AwardingAgencyCode = AwardingAgencyCode.filter(item => item);
        AwardingAgencyCodeWithoutFilter = AwardingAgencyCode.slice();
        AwardingAgencyCode = AwardingAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var awarding_agency_group_code = AwardingAgencyCode.join();
        AwardingAgencyCode = awarding_agency_group_code;
    }
    // ====================== GetAwardingAgency ========================//

    // ====================== GetAwardingAgency Description ========================//
    $(".txtawagency").each(function () {
        var awagency = $(this).val();
        if (awagency !== "") {
            AwAgencyDescription.push(awagency);
            //console.log(awagency);
        }

    });

    if (AwAgencyDescription.length > 0) {
        AwAgencyDescription = AwAgencyDescription.filter(item => item);
        AwAgencyDescription = AwAgencyDescription.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        //console.log("AwAgencyDescription", AwAgencyDescription);

        //var department_group_code = DepartmentDescription.join();
        //console.log("DepartmentDescription", department_group_code);
        //DepartmentDescription = department_group_code;
    }
    // ====================== GetAwardingAgency Description ========================//


    // ====================== GetSubAgency ========================//
    $(".lblawsubagency").each(function () {
        var subagency = $(this).text();

        if (subagency != "") {
            AwSubAgencyCode.push(subagency);
            //console.log(subagency);
            //console.log(AgencyCode);
        }
    });
    if (AwSubAgencyCode.length > 0) {        
        AwSubAgencyCode = AwSubAgencyCode.filter(item => item);
        AwardingSubAgencyCodeWithoutFilter = AwSubAgencyCode.slice();
        AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        //console.log(AgencyCode);
        var sub_agency_group_code = AwSubAgencyCode.join();
        //console.log(agency_group_code);
        AwSubAgencyCode = sub_agency_group_code;
        // alert(AgencyCode);
    }
    // ====================== GetSubAgency ========================//

    // ====================== GetSubAgency Description========================//
    $(".txtawsubagency").each(function () {
        var awsubagency = $(this).val();

        if (awsubagency != "") {
            AwSubAgencyDescription.push(awsubagency);
            //console.log(agency);
            //console.log(AgencyDescription);
        }
    });
    if (AwSubAgencyDescription.length > 0) {
        AwSubAgencyDescription = AwSubAgencyDescription.filter(item => item);
        AwSubAgencyDescription = AwSubAgencyDescription.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
    }
    // ====================== GetAgency Description========================//

    // ====================== GetAwardingOffice ========================//
    $(".lblawoffice").each(function () {
        var awoffice = $(this).text();

        if (awoffice != "") {
            AwOfficeCode.push(awoffice);
            //console.log(agency);
            //console.log(AgencyCode);
        }
    });
    if (AwOfficeCode.length > 0) {
        AwOfficeCode = AwOfficeCode.filter(item => item);
        AwOfficeCode = AwOfficeCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var awarding_office_group_code = AwOfficeCode.join();
        AwOfficeCode = awarding_office_group_code;
    }
    // ====================== GetAwardingOffice ========================//

    // ====================== GetAwardingOffice Description========================//
    $(".txtawoffice").each(function () {
        var awoffice = $(this).val();

        if (awoffice != "") {
            AwOfficeDescription.push(awoffice);
        }
    });
    if (AwOfficeDescription.length > 0) {
        AwOfficeDescription = AwOfficeDescription.filter(item => item);
        AwOfficeDescription = AwOfficeDescription.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
    }
    // ====================== GetAwardingOffice Description========================//

    // ====================== GetSolicitation ========================//
    $(".lblsolicitation").each(function () {
        var solicitation = $(this).text();
        if (solicitation !== "") {
            SolicitationCode.push(solicitation);
        }

    });

    if (SolicitationCode.length > 0) {
        SolicitationCode = SolicitationCode.filter(item => item);
        SolicitationCode = SolicitationCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var solicitation_group_code = SolicitationCode.join();
        SolicitationCode = solicitation_group_code;
    }
    // ====================== GetSolicitation ========================//

    // ====================== GetSolicitation Description ========================//
    $(".txtsolicitation").each(function () {
        var solicitation = $(this).val();
        if (solicitation !== "") {
            SolicitationDescription.push(solicitation);
        }

    });

    if (SolicitationDescription.length > 0) {
        SolicitationDescription = SolicitationDescription.filter(item => item);
        SolicitationDescription = SolicitationDescription.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
    }
    // ====================== GetSolicitation Description ========================//

    // ====================== GetNaicsType ========================//
    var naics_family = "";
    if ($('#txtnaicsfamcode_1').val() != "") {
        naics_family = '1';
    }
    else if ($('#txtnaicscode_1').val() != "") {
        naics_family = '0';
    }
    // ====================== GetNaicsType ========================//


    var business_size = Businesssize;
    var department_code = DepartmentCode;
    var agency_code = AgencyCode;
    var solicitation_code = SolicitationCode;
    var funding_office_code = OfficeCode;
    var awarding_agency_code = AwardingAgencyCode;
    var awarding_sub_agency_code = AwSubAgencyCode;
    var awarding_office_code = AwOfficeCode;
    var ContractNumber = $('#ContractNumber').val();
    var keyword_list = $('#txtkeyword').val();

    $('.clsSocioeconomicAside input:checked').each(function () {
        getval.push(this.value);
        get_TExt.push($(this).attr('id'))
    });
    var business_type_code_list = "";
    if (getval != null && getval.length > 0) {
        business_type_code_list = getval.join();
        show_get_TExt = get_TExt.join();
    }
    else {
        show_get_TExt = $('input[name=businessize]:checked').val();
    }

  

    var base_and_all_options_value = $(".MinContractSize_2").val();
    //if ($('#AgencyDDL').val() == "") {
    //    agency_code = "";
    //}

    //if ($('#DepartmentDDL').val() == "") {
    //    department_code = "";
    //}

    //Simple Search//
    if (Type == 'Type1') {


        business_size = "ALL"
    }
    //Advanced Search//
    else if (Type == 'Type2') {
        var startYear = $('.startYear_2').val();
        var EndYear = $('.EndYear_2').val();


        if (userinfo == "False") {
            var FY = DefaultStartDate; var FY_End = DefaultEndDate;
        }
        else {
            FY = startYear; FY_End = EndYear;
        }


    }



    SearchData.NAICS = NAICS,
    SearchData.ContractNumber = ContractNumber,
    SearchData.agency_code = agency_code,
    SearchData.naics_family = naics_family,
    SearchData.business_type_code_list = business_type_code_list,
    SearchData.business_size = business_size,
    SearchData.department_code = department_code,
    SearchData.FY = FY,
    SearchData.FY_End = FY_End,
    SearchData.base_and_all_options_value = base_and_all_options_value,
    SearchData.solicitation_code = solicitation_code,
    SearchData.funding_office_code = funding_office_code,
    SearchData.awarding_agency_code = awarding_agency_code,
    SearchData.awarding_sub_agency_code = awarding_sub_agency_code,
    SearchData.awarding_office_code = awarding_office_code,
    SearchData.award_description = keyword_list

    if (business_type_code_list == "") {
        SearchData.business_type_code_list = "";
    }

    if (business_size == "NO") {
        SearchData.type_of_set_aside = business_size;
    }
    else {
        SearchData.type_of_set_aside = business_type_code_list;
    }
    //console.log(SearchData);

    //======VAlidation for Advanced search======//
    if (SearchData.ContractNumber == "") {
       
        if ((SearchData.NAICS != "" || SearchData.naics_family != "") &&
            (SearchData.department_code.length != 0 && SearchData.agency_code.length != 0 && (DepartmentCodeWithoutFilter.length == AgencyCodeWithoutFilter.length))
            && (SearchData.awarding_agency_code.length != 0 && SearchData.awarding_sub_agency_code.length != 0 && (AwardingAgencyCodeWithoutFilter.length == AwardingSubAgencyCodeWithoutFilter.length))
            && SearchData.base_and_all_options_value != "" && SearchData.business_size) {
            setTimeout(function () {
                searchData(copyClipBoard);            
                $('.hideawardesc').show();
            }, 10);
        }
        
        else if ((SearchData.NAICS === "" || SearchData.naics_family === "") || SearchData.base_and_all_options_value === "" || !SearchData.business_size) {
            swal("", "Please fill in all required(*) fields", "error");
            cleartable();
            $('.Apploader').hide();
        }
        else if (SearchData.department_code.length === 0 && SearchData.awarding_agency_code.length === 0) {
            swal("", "Please choose at least one funding agency and funding sub agency OR one awarding agency and awarding sub agency", "warning");
            cleartable();
            $('.Apploader').hide();
        }
        else if ((show_get_TExt === "-" || Businesssize === "-") && !(OKSocioAside.length > 0)) {
            swal("", "Please choose contract set-aside", "error");
            cleartable();
            $('.Apploader').hide();
        }
        else if (DepartmentCodeWithoutFilter.length > 0 || AwardingAgencyCodeWithoutFilter.length > 0) {

            //Validation first chaeck funding agency senario and after that awrading agency senario
            if (DepartmentCodeWithoutFilter.length > 0) {
                if (AgencyCodeWithoutFilter.length > 0) {
                    var count = 0;
                    var IsCodeValid = true;
                    $('.txtagency').each(function () {
                        var id = $(this).attr('id');
                        var index = id.split('_')[1];
                        count++;
                        if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                            if (index > -1) {
                                AgencyCodeWithoutFilter.splice(index, 1);
                            }
                            swal("", "Please enter funding sub agency in row " + count, "warning");
                            IsCodeValid = false;
                            return false;
                        }
                    });
                    if (IsCodeValid == true) {
                        if (AwardingAgencyCodeWithoutFilter.length > 0) {
                            if (AwardingSubAgencyCodeWithoutFilter.length > 0) {
                                var count = 0;
                                var IsCodeValid = true;
                                $('.txtawsubagency').each(function () {
                                    var id = $(this).attr('id');
                                    var index = id.split('_')[1];
                                    count++;
                                    if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                                        if (index > -1) {
                                            AwardingSubAgencyCodeWithoutFilter.splice(index, 1);
                                        }
                                        swal("", "Please enter awarding sub agency in row " + count, "warning");
                                        IsCodeValid = false;
                                        return false;
                                    }
                                });
                                if (IsCodeValid == true) {
                                    setTimeout(function () {
                                        searchData(copyClipBoard);                                      
                                        $('.hideawardesc').show();
                                    }, 10);
                                }
                                else {
                                    $('.Apploader').hide();
                                    return false;
                                }
                            }
                            else {
                                swal("", "Please choose an awarding sub agency ", "warning");
                                cleartable();
                                $('.Apploader').hide();
                            }
                        }
                        else {
                            setTimeout(function () {
                                searchData(copyClipBoard);                                
                                $('.hideawardesc').show();
                            }, 10);
                        }
                    }
                    else {
                        $('.Apploader').hide();
                        return false;
                    }
                }
                else {
                    swal("", "Please choose a funding sub agency ", "warning");
                    cleartable();
                    $('.Apploader').hide();
                }
            }

            //Validation first chaeck awrading agency senario and after that funding agency senario
            if (AwardingAgencyCodeWithoutFilter.length > 0) {
                if (AwardingSubAgencyCodeWithoutFilter.length > 0) {
                    var count = 0;
                    var IsCodeValid = true;
                    $('.txtawsubagency').each(function () {
                        var id = $(this).attr('id');
                        var index = id.split('_')[1];
                        count++;
                        if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                            if (index > -1) {
                                AwardingSubAgencyCodeWithoutFilter.splice(index, 1);
                            }
                            swal("", "Please enter awarding sub agency in row " + count, "warning");
                            IsCodeValid = false;
                            return false;
                        }
                    });
                    if (IsCodeValid == true) {
                        if (DepartmentCodeWithoutFilter.length > 0) {
                            if (AgencyCodeWithoutFilter.length > 0) {
                                var count = 0;
                                var IsCodeValid = true;
                                $('.txtagency').each(function () {
                                    var id = $(this).attr('id');
                                    var index = id.split('_')[1];
                                    count++;
                                    if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                                        if (index > -1) {
                                            AgencyCodeWithoutFilter.splice(index, 1);
                                        }
                                        swal("", "Please enter funding sub agency in row " + count, "warning");
                                        IsCodeValid = false;
                                        return false;
                                    }
                                });
                                if (IsCodeValid == true) {
                                    setTimeout(function () {
                                        searchData();                                        
                                        $('.hideawardesc').show();
                                    }, 10);
                                }
                                else {
                                    $('.Apploader').hide();
                                    return false;
                                }
                            }
                            else {
                                swal("", "Please choose a funding sub agency ", "warning");
                                cleartable();
                                $('.Apploader').hide();
                            }
                        }
                        else {
                            setTimeout(function () {
                                searchData();                                
                                $('.hideawardesc').show();
                            }, 10);
                        }

                    }
                    else {
                        $('.Apploader').hide();
                        return false;
                    }
                    //}                    
                }
                else {
                    swal("", "Please choose an awarding sub agency ", "warning");
                    cleartable();
                    $('.Apploader').hide();
                }
            }

        }
       
        else {
            swal("", "Please fill in all required(*) fields", "error");
            cleartable();
            $('.Apploader').hide();
        }
        //swal("", "Work In Progress", "info");
    }
    //======VAlidation for Simple search======//
    else {
        if (SearchData.ContractNumber != "") {
            setTimeout(function () {
                searchData(copyClipBoard);               
                $('.hideawardesc').hide();
            }, 10);
        }
        else {
            swal("", "Please fill in all required(*) fields");
            cleartable();
            $('.Apploader').hide();

        }

    }

    function searchData(copyClipBoard) {
        var ExcelRow = [];
        //console.log('[webTeaming_getInitialSearchResults]', NAICS, naics_family, business_type_code_list, '500000', business_size, department_code, agency_code, '2017', solicitation_code, funding_office_code);

       
        if (typeof copyClipBoard != 'undefined' && copyClipBoard.isCopyClipBoard) {
            SearchData.department_name = $("#txtdept_2").val();
            SearchData.agency_name = $("#txtagency_2").val();
            SearchData.office_name = $("#txtoffice_2").val();
            SearchData.naics_name = "";
            let customIndexNaics = 0;
            SearchData.NAICS.split(',').forEach((item, index) => {
                customIndexNaics = index == 0 ? 2 : customIndexNaics + 1
                SearchData.naics_name = SearchData.naics_name + `${index != 0 ? ',' : ''}`
                    + $(`#txtnaicsdesc_${customIndexNaics}`).val();
            })
            const queryParams = JSON.stringify({ SimpleSearch: SearchData })
            var tempInput = document.createElement('input');
            tempInput.value = `${window.location.href}?data=${encodeURIComponent(queryParams)}`;
            document.body.appendChild(tempInput);
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); /* For mobile devices */
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            return;
        }
        var data = "{SimpleSearch:" + JSON.stringify(SearchData) + "}";
        if (typeof copyClipBoard != 'undefined' && copyClipBoard.data) {
            //  copyClipBoard.data.SimpleSearch = JSON.parse(copyClipBoard.data.SimpleSearch);
            $(`.radiocheck[value='${copyClipBoard.data.SimpleSearch.business_size}']`).click()
            data = "{SimpleSearch:" + JSON.stringify(copyClipBoard.data.SimpleSearch) + "}";

        }
        var excelData = {};
        excelData = SearchData;
        var url = "/ContractSearch/GetContractInfo";
        var result = AjaxPost(url, data);
        if (result.Error == "") {
            if (SearchData.ContractNumber == "") {
                ExcelRow = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12];
            }
            else {
                ExcelRow = [0, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12];
            }
            //console.log(result.GetSimpleSearchData);
            SearchData = {}
            if (result.GetSimpleSearchData.length > 0) {
                bindsearchdata();
                $('.SearchFields').hide();
                NaicsCode = [];

                show_get_TExt = "";
                $('#SimpleContractSearch').show();

                var filldata = "";
                $('#SimpleContractSearch').dataTable().fnDestroy();


                for (var i = 0; i < result.GetSimpleSearchData.length; i++) {

                    var award_id = result.GetSimpleSearchData[i].award_id;
                    var referenced_idv_id = result.GetSimpleSearchData[i].referenced_idv_id;
                    var transaction_id = result.GetSimpleSearchData[i].transaction_id;
                    var modification_number = result.GetSimpleSearchData[i].modification_number;
                    var base_and_all_options_value = parseFloat((result.GetSimpleSearchData[i].base_and_all_options_value)).toFixed(2);
                    base_and_all_options_value = CommaFormatted(base_and_all_options_value);

                    var FY = result.GetSimpleSearchData[i].FY;
                    var department_code = result.GetSimpleSearchData[i].department_code;
                    var department_name = result.GetSimpleSearchData[i].department_name;
                    var agency_code = result.GetSimpleSearchData[i].agency_code;
                    var agency_name = result.GetSimpleSearchData[i].agency_name;
                    var uei = result.GetSimpleSearchData[i].uei;
                    var NAICS = result.GetSimpleSearchData[i].NAICS;
                    var PSC = result.GetSimpleSearchData[i].PSC;
                    var PSC_Description = result.GetSimpleSearchData[i].PSC_Description;
                    var type_of_set_aside = result.GetSimpleSearchData[i].type_of_set_aside;
                    var usaspending_permalink = result.GetSimpleSearchData[i].usaspending_permalink;
                    var legal_business_name = result.GetSimpleSearchData[i].legal_business_name;
                    var award_description = result.GetSimpleSearchData[i].award_description;
                    var cageCodePrimary = result.GetSimpleSearchData[i].cageCodePrimary;
                    var type_of_contract_pricing = result.GetSimpleSearchData[i].type_of_contract_pricing;
                    var solicitation_code = result.GetSimpleSearchData[i].solicitation_code;
                    var solicitation_name = result.GetSimpleSearchData[i].solicitation_name;
                    var funding_office_code = result.GetSimpleSearchData[i].funding_office_code;
                    var funding_office_name = result.GetSimpleSearchData[i].funding_office_name;
                    var awarding_agency_code = result.GetSimpleSearchData[i].awarding_agency_code;
                    var awarding_agency_name = result.GetSimpleSearchData[i].awarding_agency_name;
                    var awarding_sub_agency_code = result.GetSimpleSearchData[i].awarding_sub_agency_code;
                    var awarding_sub_agency_name = result.GetSimpleSearchData[i].awarding_subagency_name;
                    var awarding_office_code = result.GetSimpleSearchData[i].awarding_office_code;
                    var awarding_office_name = result.GetSimpleSearchData[i].awarding_office_name;

                    var ContractNumber = "";
                    if (modification_number === "" || modification_number === null) {
                        ContractNumber = award_id;
                    } else {
                        ContractNumber = award_id + '(' + modification_number + ')';
                    }
                    var usa = "USA Spending";

                    filldata = filldata + '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td class="hideawardesc GoVendor">' + legal_business_name + '</td>' +
                        '<td class="GoContact" referenced_idv_id="' + referenced_idv_id+'" transaction_id="' + transaction_id + '" id=' + award_id + '>' + ContractNumber + '</td>' +
                        '<td class="GoReference" id=' + referenced_idv_id + '>' + referenced_idv_id + '</td>' +


                        '<td class="GoFundingAgency hide" id="' + department_code + '">' + department_name + '</td>' +
                        '<td class="GoFundingSubAgency hide" id="' + agency_code + '">' + agency_name + '</td>' +
                        '<td class="GoFundingOffice" id="' + funding_office_code + '">' + funding_office_name + '</td>' +
                        '<td class="GoAwardingAgency" id="' + awarding_agency_code + '">' + awarding_agency_name + '</td>' +
                        '<td class="GoAwardingSubAgency" id="' + awarding_sub_agency_code + '">' + awarding_sub_agency_name + '</td>' +
                        '<td class="GoAwardingOffice" id="' + awarding_office_code + '">' + awarding_office_name + '</td>' +
                        '<td class="GoSolicitationSearch" id="' + solicitation_code + '">' + solicitation_name + '</td>' +
                        '<td  class="hide" id="GetDuns">' + uei + '</td>' +
                        '<td>' + type_of_contract_pricing + '</td>' +
                        '<td>' + NAICS + '</td>' +
                        '<td>' + PSC + '</td>' +
                        '<td class="Com_003">$' + base_and_all_options_value + '</td>' +
                        '<td>' + FY + '</td>' +
                        '<td>' + type_of_set_aside + '</td>' +
                        '<td class="hide">' + department_code + '</td>' +
                        '<td class="hide">' + agency_code + '</td>' +
                        '<td class="hide">' + funding_office_code + '</td>' +
                        '<td class="hide">' + awarding_agency_code + '</td>' +
                        '<td class="hide">' + awarding_sub_agency_code + '</td>' +
                        '<td class="hide">' + awarding_office_code + '</td>' +
                        '<td class="hideawardesc">' + award_description + '</td>' +
                        '<td class="hide">' + cageCodePrimary + '</td>' +
                        '<td class="hide">' + solicitation_code + '</td>' +

                        '</tr>';
                }
                $('#tbodyContractSimpleSearch').html(filldata);
                $('#SimpleContractSearch').DataTable({
                    
                    dom: 'lBfrtip' +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-5'i><'col-sm-7'p>>",

                    buttons: [
                        {
                            text: '',
                            className: 'excelIcon',
                            action: function (e, dt, node, config) {
                                FillExcelPopup();

                                //e.preventDefault();
                                //swal({
                                //    title: "FedPipline Excel Generation",
                                //    text: "Due to the feature rich excel sheet that will be provided to you, the creation of this sheet may take from 1 - 5 minutes to generate.  The excel file will include helpful tools (such as PIVOT tables) to use as you analyze your market, would you like to continue?  You may minimize the browser while the file generates.",
                                //    type: "warning",
                                //    confirmButtonClass: "btn-success",
                                //    confirmButtonText: "Yes",
                                //    cancelButtonText: "No",
                                //    showCancelButton: true,
                                //    closeOnConfirm: false,
                                //    closeOnCancel: true
                                //}).then((isConfirm) => {
                                //    if (isConfirm) {
                                //        $.ajax({
                                //            type: "POST",
                                //            contentType: "application/json;charset=utf-8",
                                //            url: "/ContractSearch/GenerateExcel",
                                //            data: "{ContractSearch:" + JSON.stringify(excelData) + "}",
                                //            dataType: "json",
                                //            async: true,
                                //            beforeSend: function () {
                                //                $('.Downloadloader').show();
                                //            },
                                //            success: function (response) {
                                //                $('.Downloadloader').hide();
                                //                if (response.error === "") {
                                //                    if (response.filePath === "") {
                                //                        swal("", "Your search did not produce any results, please modify your search");
                                //                    }
                                //                    else {
                                //                        var bytes = Base64ToBytes(response.filePath);
                                //                        var blob = new Blob([bytes], { type: "application/octet-stream" });

                                //                        var isIE = false || !!document.documentMode;
                                //                        if (isIE) {
                                //                            window.navigator.msSaveBlob(blob, response.fileName);
                                //                        } else {
                                //                            var downloadurl = window.URL || window.webkitURL;
                                //                            link = downloadurl.createObjectURL(blob);
                                //                            var a = $("<a />");
                                //                            a.attr("download", response.fileName);
                                //                            a.attr("href", response.filePath);
                                //                            $("#tbodyContractSimpleSearch").append(a);
                                //                            a[0].click();
                                //                            $("#tbodyContractSimpleSearch").remove(a);
                                //                        }
                                //                        swal("", "File Downloaded Successfully");
                                //                    }
                                //                }
                                //                else {
                                //                    swal("", response.error, "error");
                                //                }
                                //            },
                                //            error: function ajaxError(err) {
                                //                $('.Downloadloader').hide();
                                //                swal("", err);
                                //            }
                                //        });
                                //    }
                                //}).catch(swal.noop);

                            }
                        }
                    ],
                    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    columnDefs: [
                        { className: 'text-center', targets: [0, 2, 3, 4] },

                    ],
                    language: {
                        search: "Search within Grid",
                        //searchPlaceholder: "Search within Grid"
                    }
                }).on('draw', function () {
                    if (ContractNumber !== "") {
                        if (Type === "Type1") {
                            $('.hideawardesc').hide()
                        }
                    }
                }).on('page.dt', function () {
                    if (ContractNumber !== "") {
                    if (Type === "Type1") {
                        $('.hideawardesc').hide()
                        }
                    }
                });
                $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-cyan text-white mr-1');


            }
            else {

                swal("", "Your search did not produce any results, please modify your search"); var table = $('#SimpleContractSearch').DataTable();

                cleartable();
                $('.Apploader').hide();

            }
        }
        else if (result == "TimedOut") {
            swal("", "Timed Out !", "error");

            window.location.href = origin;
        }
        else {
            swal("", result.Error, "error");
            $('.Apploader').hide();

            cleartable();
        }
        SearchData = {}
    }



    function bindsearchdata() {

        if ($('#ContractNumber').val() == "") {
            // if advanced search //

            if ($('#txtnaicscode_1').val() == "") {

                var FamDesc = "";
                var FamCode = "";

                if ($('#txtnaicsfamdesc_1').val() != "") {
                    FamDesc = $('#txtnaicsfamdesc_1').val();
                    FamCode = $('#txtnaicsfamcode_1').val();
                }

                $('#HD_NaicsFamily').text(FamDesc + '   (' + FamCode + ')');

                if (NaicsCodeDescription.length > 1) {
                    $('#Res_totalNaicsFam').show();
                    $('#lblRes_NaicsFam').text(NaicsCodeDescription.length - 1);
                }

                //naics fam result 
                $('.HD_Naicscode').hide();
                $('.HD_NaicsFamily').show();

            }
            else {

                var Desc = "";
                var Code = "";

                if ($('#txtnaicsdesc_1').val() != "") {
                    Desc = $('#txtnaicsdesc_1').val();
                    Code = $('#txtnaicscode_1').val();
                }

                $('#HD_Naicscode').text(Desc + '   (' + Code + ')');

                if (NaicsCodeDescription.length > 1) {
                    $('#Res_totalNaicsCode').show();
                    $('#lblRes_NaicsCode').text(NaicsCodeDescription.length - 1);
                }

                $('.HD_Naicscode').show();
                $('.HD_NaicsFamily').hide();
            }

            if (DepartmentDescription.length > 1) {
                $('#Res_totalDept').show();
                $('#lblRes_Dept').text(DepartmentDescription.length - 1);

            } else {
                $('#Res_totalDept').hide();
                $('#lblRes_Dept').text("");
            }

            if (AgencyDescription.length > 1) {
                $('#Res_totalAgency').show();
                $('#lblRes_Agency').text(AgencyDescription.length - 1);

            }
            else {
                $('#Res_totalAgency').hide();
                $('#lblRes_Agency').text('');
            }

            if (OfficeDescription.length > 1) {
                $('#Res_totalOffice').show();
                $('#lblRes_Office').text(OfficeDescription.length - 1);

            }
            else {
                $('#Res_totalOffice').hide();
                $('#lblRes_Office').text('');
            }

            if (AwAgencyDescription.length > 1) {
                $('#Res_totalAwAgency').show();
                $('#lblRes_AwAgency').text(AwAgencyDescription.length - 1);

            } else {
                $('#Res_totalAwAgency').hide();
                $('#lblRes_AwAgency').text("");
            }

            if (AwSubAgencyDescription.length > 1) {
                $('#Res_totalAwSubAgency').show();
                $('#lblRes_AwSubAgency').text(AwSubAgencyDescription.length - 1);

            }
            else {
                $('#Res_totalAwSubAgency').hide();
                $('#lblRes_AwSubAgency').text('');
            }

            if (AwOfficeDescription.length > 1) {
                $('#Res_totalAwOffice').show();
                $('#lblRes_AwOffice').text(AwOfficeDescription.length - 1);

            }
            else {
                $('#Res_totalAwOffice').hide();
                $('#lblRes_AwOffice').text('');
            }

            if (SolicitationDescription.length > 1) {
                $('#Res_totalSolicitation').show();
                $('#lblRes_Solicitation').text(SolicitationDescription.length - 1);

            } else {
                $('#Res_totalSolicitation').hide();
                $('#lblRes_Solicitation').text("");
            }

            $('#HD_Solicitation').text($('#SolicitationDDL').val());
            $('#HD_Dept').text($('#DepartmentDDL').val());
            $('#HD_Agency').text($('#AgencyDDL').val());
            $('#HD_Office').text($('#FundingOfficeDDL').val());
            $('#HD_AwAgency').text($('#AwAgencyDDL').val());
            $('#HD_AwSubAgency').text($('#AwSubAgencyDDL').val());
            $('#HD_AwOffice').text($('#AwOfficeDDL').val());
            $('#HD_Business').text(Businesssize);
            $('#HD_FY').text($('.startYear_2').val() + '/' + $('.EndYear_2').val());
            $('#HD_MinContract').text($(".MinContractSize_2").val());
            $('#HD_Socio').text(show_get_TExt);
            $('#HD_Keyword').text($('#txtkeyword').val());

            //Hide div //
            $('#AdvancedSearch').hide();
            $('.ADVSearchResults').slideDown("slow");



        }
        else {
            // if simple search //
            $('#HDS_vendorname').text($('#ContractNumber').val());
            $('#HDS_duns').text($('#SearchDuns').val());
            $('#HDS_cage').text($('#SearchCage').val());
            $('#HDS_fy').text($('.startYear_1').val() + '/' + $('.EndYear_1').val());
            $('#HDS_mincontract').text($(".MinContractSize_1").val());
            //Hide div //
            $('#Simplesearch').hide();
            $('.SIMSearchResults').slideDown("slow");


        }

        $('#IDshowResult').hide();
        $('#IDshowfields').show();

    }


});
//=============================== All Over Search ==========================================//

$(document).on('click', '#btnOkExcel', function () {
    searchParameters.report_notes = $("#report_notes").val().length > 0 ? $("#report_notes").val() : 'NA';
    // searchParameters save to excel report table
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/ContractSearch/SaveSearchParameters",
        data: "{parameters:" + JSON.stringify(searchParameters) + "}",
        dataType: "json",
        async: true,
       
        success: function (response) {
          
            $('#ContractSearchExcel').modal('toggle');
            swal("", "Request submitted successfully", "success");
          
        },
        error: function ajaxError(err) {
           
            swal("", err);
        }
    });
});

$(document).on('click', '#btnCancelExcel', function () {
    $('#ContractSearchExcel').modal('toggle');
});

function FillExcelPopup() {
    var filldata = "";
    searchParameters = {};
    var report_notes_section = '<div class="col-md-6 title2"><label>Questions/Comments/Notes: </label>' +
        '<div class="input-group mb-3">' +
        '<textarea cols="5" rows="5" class="DIS_002 form-control" id="report_notes" name="report_notes" />' +
        '<div class="input-group-append">' +
        '<span class="input-group-text s001">' +
        '</span>' +
        '</div></div></div>';
    if (Type === 'Type1') {

        if ($("#ContractNumber").val() !== "" && $("#ContractNumber").val() !== null) {
            
            searchParameters.psc_code_list = $("#ContractNumber").val();
            filldata = filldata + '<ul>' +
                '<li><label>Contract Number : ' + searchParameters.psc_code_list + '</label></li>' +
                '</ul>'+report_notes_section;
            $('#selectContractSearchData').html(filldata);
            $('#ContractSearchExcel').modal('show');
        }
        else {
            swal("", "please choose any search parameter", "warning");
        }
    }
    else {
       
            NaicsCode = [];
            getval = [];
            get_TExt = [];
            show_get_TExt = "";
            SearchData = {};
            DepartmentCode = [];
            AgencyCode = [];
            NaicsCodeDescription = [];
            AgencyDescription = [];
            OfficeCode = [];
            OfficeDescription = [];
            DepartmentDescription = [];
            SolicitationCode = [];
            SolicitationDescription = [];
            AwardingAgencyCode = [];
            AwAgencyDescription = [];
            AwSubAgencyCode = [];
            AwSubAgencyDescription = [];
            AwOfficeCode = [];
            AwOfficeDescription = [];

            if (NAICS_mode == "NaicsFamCode") {

                $(".NaicsFamCode").each(function () {
                    var naicsfam = $(this).val();
                    NaicsCode.push(naicsfam);

                });
                $(".lblnaicsFamdesc").each(function () {
                    var naicscdesc = $(this).val();
                    NaicsCodeDescription.push(naicscdesc);
                    NaicsCodeDescription = NaicsCodeDescription.filter(item => item);
                    NaicsCodeDescription = NaicsCodeDescription.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });

                });
            }
            else if (NAICS_mode == "NaicsCode") {
                $(".NaicsCode ").each(function () {
                    var naicscode = $(this).val();
                    NaicsCode.push(naicscode);

                });
                $(".lblnaicsdesc").each(function () {
                    var naicscdesc = $(this).val();
                    NaicsCodeDescription.push(naicscdesc);
                    NaicsCodeDescription = NaicsCodeDescription.filter(item => item);
                    NaicsCodeDescription = NaicsCodeDescription.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });

                });


            }

            NaicsCode = NaicsCode.filter(item => item);

            var NAICS = NaicsCode.join();
            // ====================== GetDepartment ========================//
            $(".lbldept").each(function () {
                var dept = $(this).text();
                if (dept != "") {
                    DepartmentCode.push(dept);
                }
            });

            if (DepartmentCode.length > 0) {
                DepartmentCode = DepartmentCode.filter(item => item);
                DepartmentCodeWithoutFilter = DepartmentCode.slice();
                DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var department_group_code = DepartmentCode.join();
                DepartmentCode = department_group_code;
            }
            // ====================== GetDepartment ========================//
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

            }
            // ====================== GetDepartment Description ========================//
            // ====================== GetAgency ========================//
            $(".lblagency").each(function () {
                var agency = $(this).text();

                if (agency != "") {
                    AgencyCode.push(agency);
                }
            });
            if (AgencyCode.length > 0) {
                AgencyCode = AgencyCode.filter(item => item);
                AgencyCodeWithoutFilter = AgencyCode.slice();
                AgencyCode = AgencyCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var agency_group_code = AgencyCode.join();
                AgencyCode = agency_group_code;
                // alert(AgencyCode);
            }
            // ====================== GetAgency ========================//

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
            }
            // ====================== GetAgency Description========================//

            // ====================== GetFundingOffice ========================//
            $(".lbloffice").each(function () {
                var office = $(this).text();

                if (office != "") {
                    OfficeCode.push(office);
                }
            });
            if (OfficeCode.length > 0) {
                OfficeCode = OfficeCode.filter(item => item);
                OfficeCode = OfficeCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var office_group_code = OfficeCode.join();
                OfficeCode = office_group_code;
            }
            // ====================== GetFundingOffice ========================//

            // ====================== GetFundingOffice Description========================//
            $(".txtoffice").each(function () {
                var office = $(this).val();

                if (office != "") {
                    OfficeDescription.push(office);
                }
            });
            if (OfficeDescription.length > 0) {
                OfficeDescription = OfficeDescription.filter(item => item);
                OfficeDescription = OfficeDescription.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
            }
            // ====================== GetFundingOffice Description========================//

            // ====================== GetAwardingAgency ========================//
            $(".lblawagency").each(function () {
                var awagency = $(this).text();
                if (awagency !== "") {
                    AwardingAgencyCode.push(awagency);
                }

            });

            if (AwardingAgencyCode.length > 0) {
                AwardingAgencyCode = AwardingAgencyCode.filter(item => item);
                AwardingAgencyCodeWithoutFilter = AwardingAgencyCode.slice();
                AwardingAgencyCode = AwardingAgencyCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var awarding_agency_group_code = AwardingAgencyCode.join();
                AwardingAgencyCode = awarding_agency_group_code;
            }
            // ====================== GetAwardingAgency ========================//

            // ====================== GetAwardingAgency Description ========================//
            $(".txtawagency").each(function () {
                var awagency = $(this).val();
                if (awagency !== "") {
                    AwAgencyDescription.push(awagency);
                }

            });

            if (AwAgencyDescription.length > 0) {
                AwAgencyDescription = AwAgencyDescription.filter(item => item);
                AwAgencyDescription = AwAgencyDescription.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

            }
            // ====================== GetAwardingAgency Description ========================//


            // ====================== GetSubAgency ========================//
            $(".lblawsubagency").each(function () {
                var subagency = $(this).text();

                if (subagency != "") {
                    AwSubAgencyCode.push(subagency);
                }
            });
            if (AwSubAgencyCode.length > 0) {
                AwSubAgencyCode = AwSubAgencyCode.filter(item => item);
                AwardingSubAgencyCodeWithoutFilter = AwSubAgencyCode.slice();
                AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var sub_agency_group_code = AwSubAgencyCode.join();
                AwSubAgencyCode = sub_agency_group_code;
            }
            // ====================== GetSubAgency ========================//

            // ====================== GetSubAgency Description========================//
            $(".txtawsubagency").each(function () {
                var awsubagency = $(this).val();

                if (awsubagency != "") {
                    AwSubAgencyDescription.push(awsubagency);
                }
            });
            if (AwSubAgencyDescription.length > 0) {
                AwSubAgencyDescription = AwSubAgencyDescription.filter(item => item);
                AwSubAgencyDescription = AwSubAgencyDescription.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
            }
            // ====================== GetAgency Description========================//

            // ====================== GetAwardingOffice ========================//
            $(".lblawoffice").each(function () {
                var awoffice = $(this).text();

                if (awoffice != "") {
                    AwOfficeCode.push(awoffice);
                }
            });
            if (AwOfficeCode.length > 0) {
                AwOfficeCode = AwOfficeCode.filter(item => item);
                AwOfficeCode = AwOfficeCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var awarding_office_group_code = AwOfficeCode.join();
                AwOfficeCode = awarding_office_group_code;
            }
            // ====================== GetAwardingOffice ========================//

            // ====================== GetAwardingOffice Description========================//
            $(".txtawoffice").each(function () {
                var awoffice = $(this).val();

                if (awoffice != "") {
                    AwOfficeDescription.push(awoffice);
                }
            });
            if (AwOfficeDescription.length > 0) {
                AwOfficeDescription = AwOfficeDescription.filter(item => item);
                AwOfficeDescription = AwOfficeDescription.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
            }
            // ====================== GetAwardingOffice Description========================//

            // ====================== GetSolicitation ========================//
            $(".lblsolicitation").each(function () {
                var solicitation = $(this).text();
                if (solicitation !== "") {
                    SolicitationCode.push(solicitation);
                }

            });

            if (SolicitationCode.length > 0) {
                SolicitationCode = SolicitationCode.filter(item => item);
                SolicitationCode = SolicitationCode.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                var solicitation_group_code = SolicitationCode.join();
                SolicitationCode = solicitation_group_code;
            }
            // ====================== GetSolicitation ========================//

            // ====================== GetSolicitation Description ========================//
            $(".txtsolicitation").each(function () {
                var solicitation = $(this).val();
                if (solicitation !== "") {
                    SolicitationDescription.push(solicitation);
                }

            });

            if (SolicitationDescription.length > 0) {
                SolicitationDescription = SolicitationDescription.filter(item => item);
                SolicitationDescription = SolicitationDescription.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
            }
            // ====================== GetSolicitation Description ========================//

            // ====================== GetNaicsType ========================//
            var naics_family = false;
            if ($('#txtnaicsfamcode_1').val() != "") {
                naics_family = true;
            }
            else if ($('#txtnaicscode_1').val() != "") {
                naics_family = false;
            }

        if (NAICS.length > 0 && $(".startYear_2").val().length > 0
            && $(".EndYear_2").val().length > 0 && $(".MinContractSize_2").val().length > 0 && $(".DIS_002").is(":checked")) {
     
            searchParameters.naics_family = naics_family;
            searchParameters.naics_code_list = NAICS;
            searchParameters.naics_description = NaicsCodeDescription;
            searchParameters.FY_start = $(".startYear_2").val();
            searchParameters.FY_end = $(".EndYear_2").val();
            searchParameters.minimum_contract_size = $(".MinContractSize_2").val()
            searchParameters.business_size = $('input[name=businessize]:checked').val()
            searchParameters.solicitation_procedure_code = $("#SolicitationDDL").val().length > 0 ? SolicitationCode : 'NA';
            searchParameters.funding_agency_code_list = $("#DepartmentDDL").val().length > 0 ? DepartmentCode : 'NA';
            searchParameters.funding_sub_agency_code_list = $("#AgencyDDL").val().length > 0 ? AgencyCode : 'NA';
            searchParameters.funding_office_list = $("#FundingOfficeDDL").val().length > 0 ? OfficeDescription : 'NA';
            searchParameters.awarding_agency_code_list = $("#AwAgencyDDL").val().length > 0 ? AwardingAgencyCode : 'NA';
            searchParameters.awarding_sub_agency_code_list = $("#AwSubAgencyDDL").val().length > 0 ? AwSubAgencyCode : 'NA';
            searchParameters.awarding_office_list = $("#AwOfficeDDL").val().length > 0 ? AwOfficeCode : 'NA';
            searchParameters.keywords = $("#txtkeyword").val().length > 0 ? $("#txtkeyword").val() : 'NA';
            var display_socio_economic_list = "";
            var display_socio_economic_text = "";
            if (OKSocioAside.length > 0) {
                for (var i = 0; i < OKSocioAside.length; i++) {
                    if (OKSocioAside.length == 1) {
                        display_socio_economic_list = OKSocioAside[i].value;
                        display_socio_economic_text = OKSocioAside[i].text;
                    }
                    if (OKSocioAside.length > 1) {
                        if (i == OKSocioAside.length - 1) {
                            display_socio_economic_list += OKSocioAside[i].value;
                            display_socio_economic_text += OKSocioAside[i].text;
                        } else {
                            display_socio_economic_list += OKSocioAside[i].value + ',';
                            display_socio_economic_text += OKSocioAside[i].text + ',';
                        }
                    }
                }
            }
            searchParameters.socio_economic_list = display_socio_economic_list.length > 0 ? display_socio_economic_list : 'NA';

            var awAgencyDescription = AwAgencyDescription.length > 0 ? AwAgencyDescription : 'NA';
            var awSubAgencyDescription = AwSubAgencyDescription.length > 0 ? AwAgencyDescription : 'NA';
            var awOfficeDescription = AwOfficeDescription.length > 0 ? AwOfficeDescription : 'NA';
            searchParameters.psc_code_list = 'NA';
            
            var display_dynamic_popup = [];

            if (searchParameters.funding_office_list != "NA") {
                display_dynamic_popup.push('<td><label>Funding Office: </label></td><td><label>' + searchParameters.funding_office_list + '</label></td> ');
            }

            if (awAgencyDescription != "NA") {
                display_dynamic_popup.push('<td><label>Awarding Agency: </label></td><td><label>' + awAgencyDescription + '</label ></td>');
            }

            if (awSubAgencyDescription != "NA") {
                display_dynamic_popup.push('<td><label>Awarding Sub Agency: </label></td><td><label>' + awSubAgencyDescription + '</label ></td>');
            }

            if (awOfficeDescription != "NA") {
                display_dynamic_popup.push('<td><label>Awarding Office: </label></td><td><label>' + awOfficeDescription + '</label></td>');
            }

            if (searchParameters.solicitation_procedure_code != "NA") {
                display_dynamic_popup.push('<td><label>Solicitation Procedure: </td><td><label> ' + SolicitationDescription + '</label></td>');
            }

            if (searchParameters.keywords != "NA") {
                display_dynamic_popup.push('<td><label>Keyword (Searches through award description): </td><td><label>' + searchParameters.keywords + '</label></td>');
            }
           
            if (searchParameters.socio_economic_list != "NA") {
                display_dynamic_popup.push('<td><label>Contract set a side: </td><td><label> ' + display_socio_economic_text + '</label></td>');
            }

            var display_business_size = '';
            if (searchParameters.business_size != "-") {
                display_business_size = '<td><label>Business Size: </td><td><label> ' + searchParameters.business_size + '</label></td>';
            }
            else {
                display_business_size = '<td><label>Business Size: </td><td><label> Specific set-aside</label></td>';
            }
          

            var displayTd = "<tr>";
            for (var i = 0; i < display_dynamic_popup.length; i++) {
                if (i % 3 == 0) {
                    displayTd += '</tr><tr>';
                }
                displayTd += display_dynamic_popup[i];

            }
            displayTd += '</tr>';

            var display_naics_code = "";
            if (searchParameters.naics_code_list.length > 4) {
                display_naics_code = '<td><label> NAICS Code: </label></td><td><label>' + searchParameters.naics_code_list + '</label ></td>';
            }
            else {
                display_naics_code = '<td><label> NAICS Family Code: </label></td><td><label>' + searchParameters.naics_code_list + '</label ></td>';
            }

            filldata = filldata + '<table width="100%" border="2px">' +
              
                '<tr>' + display_naics_code +
                '<td><label>Funding Agency: </label></td><td><label>' + DepartmentDescription + '</label></td>'  +
                '<td><label>Funding Sub Agency: </label></td><td><label>' + AgencyDescription + '</label></td>' +
                '</tr>' + 
                '<tr>' +
                '<td><label>FY Range (Start / End): </label></td><td><label>' + searchParameters.FY_start + '-' + searchParameters.FY_end + '</label></td>' +
                '<td><label>Minimum Contract Size: </td><td><label>' + searchParameters.minimum_contract_size + '</label></td>' + display_business_size +
                '</tr>' + displayTd + 
                '</table>' + report_notes_section;
           
            //searchParameters.psc_code_list = keywords;

            $('#selectContractSearchData').html(filldata);
            $('#ContractSearchExcel').modal('show');
        }
        else {
            swal("", "please choose any search parameter", "warning");
        }
    }

}


// //===============================Show More on Result of Funding Agency/Awarding Agency/Solicitation //=============================== //
$(document).on('click', '#Res_totalDept', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
    }, 200);
});

$(document).on('click', '#Res_totalAgency', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
    }, 200);
});

$(document).on('click', '#Res_totalOffice', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
    }, 200);
});

$(document).on('click', '#Res_totalAwAgency', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#awardingAgencyModal').modal('show');
    }, 200);
});

$(document).on('click', '#btnCancelExcel', function () {
    
    $('#ContractSearchExcel').modal('hide');

});

$(document).on('click', '#Res_totalAwSubAgency', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#awardingAgencyModal').modal('show');
    }, 200);
});

$(document).on('click', '#Res_totalAwOffice', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#awardingAgencyModal').modal('show');
    }, 200);
});

$(document).on('click', '#Res_totalSolicitation', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#solicitationModal').modal('show');
    }, 200);
});
//===============================Show More on Result of dept/Agency/Solicitation //=============================== //
// //===============================Show More on Result of NaicsCode/NaicsFam //=============================== //
$(document).on('click', '#Res_totalNaicsCode', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        //$('#NaicsCodeModal').modal('show');
        $("#lbltotalnaics").trigger('click');

    }, 200);
});
$(document).on('click', '#Res_totalNaicsFam', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#NaicsfamilyModal').modal('show');

    }, 200);
});
//===============================Show More on Result of NaicsCode/NaicsFam //=============================== //


$(document).on('click', '#IDshowfields', function () {

    if ($('#ContractNumber').val() == "") {
        // if advanced search //
        //Hide div //
        $(".ADVSearchResults").hide();
        $('.SearchFields').show();
        $('#AdvancedSearch').slideDown("slow");

    }
    else {
        // if simple search //
        //Hide div //
        $(".SIMSearchResults").hide();
        $('.SearchFields').show();
        $('#Simplesearch').slideDown("slow");

    }
    $('#IDshowResult').show();
    $('#IDshowfields').hide();


});


$(document).on('click', '#IDshowResult', function () {

    if ($('#ContractNumber').val() == "") {
        // if advanced search //
        //Hide div //
        $('#AdvancedSearch').hide();
        $(".ADVSearchResults").slideDown("slow");

    }
    else {
        // if simple search //
        //Hide div //
        $('#Simplesearch').hide();
        $(".SIMSearchResults").slideDown("slow");

    }
    $('#IDshowfields').show();
    $('#IDshowResult').hide();
    $('.SearchFields').hide();
});
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
                AwAgencyCombo.push(result);
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

function getSolicitationProcedure() {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetSolicitationProcedureList",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                SolicitationCombo.push(result);
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

//Funding Sub Agency
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

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

//Awarding Sub Agency
function getAwSubAgency(AwardingAgencyCode) {
    AwSubAgencyCombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetAgencyList",
        data: "{'Agencycode': '" + AwardingAgencyCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                AwSubAgencyCombo.push(result);
            }
            else {
                //swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function getFundingOffice(FundingAgencyCode) {
    OfficeCombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetOfficeList",
        data: "{'Agencycode': '" + FundingAgencyCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                OfficeCombo.push(result);
            }
            else {
                //swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function getAwardingOffice(AwardingAgencyCode) {
    AwOfficeCombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetOfficeList",
        data: "{'Agencycode': '" + AwardingAgencyCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                AwOfficeCombo.push(result);
            }
            else {
                //swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function GetSocioEconomicAside() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/ContractSearch/Get_SocioEconomic",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                SocioArr.push(result);

                //$("#SBusiness").html("");
                ////$("#SBusiness").append($("<option value=''>~ Select ~</option>"));
                //for (i = 0; i < result.length; i++) {
                //    var text = result[i].abbreviation;
                //    var value = result[i].business_type_code;
                //    $("#SBusiness").append($("<label class='with-square-checkbox'><input class='SocioecAside' type='checkbox' value=" + value + "><span class='s008'>" + text + "</span></label>"));
                //}
                //$("#SBusiness").html("");
                ////$("#SBusiness").append($("<option value=''> Select </option>"));
                //for (i = 0; i < result.length; i++) {
                //    var text = result[i].abbreviation;
                //    var value = result[i].business_type_code;
                //    $("#SBusiness").append($("<li><input id='" + text + "'  class='SocioecAside' type='checkbox' value=" + value + " style='height:12px;cursor: pointer;'><label class='lbl_S001 SBtext' style='font-size: 11px'> &nbsp;" + text + "</label></li>"));
                //}


                $('#tbl_SocioAside').show();

                var filldata = "";
                $('#tbl_SocioAside').dataTable().fnDestroy();


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
                    if (paramData.SimpleSearch.type_of_set_aside) {
                        const codeList = paramData.SimpleSearch.type_of_set_aside.split(',')
                        $('#tbl_SocioAside input').each(function () {
                            for (let a = 0; a < codeList.length; a++) {
                                if (codeList[a] && codeList[a].indexOf(this.value) != -1) {
                                    this.checked = true;
                                }
                            }
                        });
                        $("#OKSocioAside").click();
                    }
                }
                if (typeof answerWidgetSocioCheck == 'function') {
                    answerWidgetSocioAsideCheck();
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

//function getAwardValue() {


//    $.ajax({
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        url: "/Search/GetAwardValue",
//        data: "{}",
//        dataType: "json",
//        async: false,
//        success: function (result) {

//            if (result.length > 0) {

//                // Defined for Name/Duns/Cage
//                $(".MinContractSize_1").html("");
//                $(".MinContractSize_1").append($("<option value='0'>0</option>"));
//                // Defined for NaicsCode/NaicsCodeFam
//                $(".MinContractSize_2").html("");
//                $(".MinContractSize_2").append($("<option value='0'>0</option>"));

//                //$(".MinContractSize").append($("<option value=''>~ Select ~</option>"));
//                for (i = 0; i < result.length; i++) {
//                    var text0 = result[i].award_value;
//                    var value = result[i].award_value_id;
//                    //value = parseFloat(text0).toFixed(2)
//                    value = Math.trunc(value);
//                    // Defined for Name/Duns/Cage
//                    $(".MinContractSize_1").append($("<option value=" + value + ">" + text0 + "</option>"));
//                    $(".MinContractSize_1 > [value=" + 1 + "]").attr("selected", "true");
//                    // Defined for NaicsCode/NaicsCodeFam
//                    $(".MinContractSize_2").append($("<option value=" + value + ">" + text0 + "</option>"));
//                    $(".MinContractSize_2 > [value=" + 1 + "]").attr("selected", "true");
//                }
//            }
//            else {
//                swal("", "No Data Found !");

//            }

//        },
//        error: function ajaxError(err) {
//            swal("", err);

//        }
//    });
//}

function GetUserInfo() {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/CheckUser",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != "") {
                if (result == "False") {

                    userinfo = result;

                    //$('#FY').val("");
                    $(".startYear_1").prop('disabled', true);
                    $(".EndYear_1").prop('disabled', true);
                    $(".startYear_2").prop('disabled', true);
                    $(".EndYear_2").prop('disabled', true);

                    $(".startYear_1").val('2014');
                    $(".EndYear_1").val('2015');
                    $(".startYear_2").val('2014');
                    $(".EndYear_2").val('2015');

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

function clear() {

    
        if (Type == "Type2") {
            if (NaicsType === "Code") {
                $(".naicsincr1").css("display", "block");
                $(".naicsincrFam1").css("display", "none");
            }
            if (NaicsType === "Family") {
                $(".naicsincr1").css("display", "none");
                $(".naicsincrFam1").css("display", "block");
            }
        }
        $('input[type="text"').prop("disabled", false);
        $('input[name="businessize"]').prop('checked', false);
        $(".form-control").val("");

        Array.length = 0;
        $(".remove-textboxfam").trigger("click");
        $(".remove-textboxnaicsfour").trigger("click");
        $('.selectpicker').val("");
        NaicsCode = [];
        $('input:checkbox').removeAttr('checked');
        getval = [];
        get_TExt = [];
        //$('#SimpleContractSearch').dataTable().fnDestroy();
        var table = $('#SimpleContractSearch').DataTable();
        table
            .clear()
            .draw();
        $('#SimpleContractSearch').parents('div.dataTables_wrapper').first().hide();

        $('.OpenMinContSizeAside').prop('disabled', true);

        //$('.clsSocioeconomic').hide();
        $('.ADVSearchResults').hide();
        $('.SIMSearchResults').hide();
        $('#IDshowResult').hide();
        $('#IDshowfields').hide();
        $('.SearchFields').show();

        OKSocioAside = [];
        $(".SocioecAside").prop('checked', false);
        $('.OpenMinContSizeAside').val('');
        $('.OpenMinContSizeAside').prop('disabled', true);
        $("#Res_totalSocio_Aside").css("display", "none");
        $('#lblRes_Socio').text("");

        DepartmentCodeWithoutFilter = [];
        AgencyCodeWithoutFilter = [];
        AwardingAgencyCodeWithoutFilter = [];
        AwardingSubAgencyCodeWithoutFilter = [];

        $('#lbltotalnaics').hide();
        $('#lbltotaladdedrownaics').text("");
        $('#lbltotalsolicitation').hide();
        $('#lbltotaladdedrowsolicitation').text("");
        $('#lbltotaldept').hide();
        $('#lbltotaladdedrowdept').text("");
        $('#lbltotalawagency').hide();
        $('#lbltotaladdedrowawagency').text("");
        $('#Res_totalSocio_Aside').hide("");
        $('#lblRes_Socio').text("");

        $('.lblclr').text("");
        $(".DeptMainrows").get().forEach(function (entry, index, array) {
            var i = index;
            var e = entry.id;
            var spl = e.split('_');
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
            $('.office_' + spl[1]).remove();
        });

        $(".AwAgencyMainrows").get().forEach(function (entry, index, array) {
            // Here, array.length is the total number of items
            var i = index;
            var e = entry.id;
            var spl = e.split('_');
            $(".awagency_" + spl[1]).remove();
            $(".awsubagency_" + spl[1]).remove();
            $(".awoffice_" + spl[1]).remove();
        });

        $(".SolicitationMainrows").get().forEach(function (entry, index, array) {
            var i = index;
            var e = entry.id;
            var spl = e.split('_');
            $(".solicitation_" + spl[1]).remove();
        });
    
   
}

function cleartable() {
    var table = $('#SimpleContractSearch').DataTable();

    table
        .clear()
        .draw();
    $('#SimpleContractSearch').parents('div.dataTables_wrapper').first().hide();

    //$('.clsSocioeconomic').hide();
}


$(document).on('click', '#sear', function () {
    $('#ShowSearch').show();
    $('#ShowcontractDetail').hide();
    $('#cont').hide();

});


function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
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
    $('#lbltotalnaics').text("");


});
$(document).on('click', '.USASpending', function () {

    var USA_Link = this.id;

    window.open(USA_Link, '_blank');
});


//========================= Rediredct to other details on Contract / Referance IDV / Agency /Dept/ Funding Office =============================//

// =========redirect to new tab on contract number click ========//
$(document).on('click', '.GoContact', function () {

    var ContractNo = this.id;
    const transactionId = this.getAttribute('transaction_id')
    const parentAwardIdPiid = this.getAttribute('referenced_idv_id')
   
    var test = window.btoa(ContractNo);

    var CG = $(this).parent().find("td:eq('25')").text();
    var contractPricing = $(this).parent().find("td:eq('26')").text();
    const CP = window.btoa(contractPricing);
    var DU = $(this).parent().find("td:eq('11')").text();
    DU = window.btoa(DU);
    const encodedData = window.btoa(CG);
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();
    //window.location.origin + '/Contract/Index?CTNO=' + test + '&PG=Contract Search&CG=' + encodedData + '&CP=' + CP + '&DU=' + DU + '&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode
    window.open(window.location.origin + `/ContractSearch/FpdsSearch?transaction_id=${transactionId}&award_id_piid=${ContractNo}&parent_award_id_piid=${parentAwardIdPiid}&CTNO=${test}&PG=Contract Search&CG=${encodedData}&CP=${CP}&DU=${DU}&DeptCode=${DeptCode}&AgencyCode=${AgencyCode}`, '_blank');

});

// =========redirect to new tab on IDV number click ========//
$(document).on('click', '.GoReference', function () {

    var IDV = this.id;
    var encodedIDV = window.btoa(IDV);

    var CG = $(this).parent().find("td:eq('25')").text();
    const encodedData = window.btoa(CG);

    var DU = $(this).parent().find("td:eq('11')").text();
    DU = window.btoa(DU);

    window.open(window.location.origin + '/Contract/Index?IDVNO=' + encodedIDV + '&PG=Contract Search&CG=' + encodedData + '&DU=' + DU, '_blank');

});

// =========redirect to new tab on Funding Agency click ========//
$(document).on('click', '.GoFundingAgency', function () {
  
    var SBval = '';
    var SBTExt = '';
    var Dept = $(this).parent().find("td:eq('4')").text();
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();


    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();

    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on Funding Sub Agency click ========//
$(document).on('click', '.GoFundingSubAgency', function () {
    var SBval = "";
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();

    var Dept = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();
    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on Funding Office click ========//
$(document).on('click', '.GoFundingOffice', function () {
    var SBval = "";
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();
    var FundingOfficeCode = $(this).parent().find("td:eq('20')").text();

    var Dept = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();
    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();

    var BindOfficeDesc = $(this).parent().find("td:eq('6')").text();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&FOfficeCode=' + FundingOfficeCode + '&OffcDesc=' + BindOfficeDesc + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on Awarding Agency click ========//
$(document).on('click', '.GoAwardingAgency', function () {
    var SBval = "";
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();
    var FundingOfficeCode = $(this).parent().find("td:eq('20')").text();
    var AwardingAgencyCode = $(this).parent().find("td:eq('21')").text();
    var AwardingSubAgencyCode = $(this).parent().find("td:eq('22')").text();

    var Dept = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();
    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();

    
    var BindOfficeDesc = $(this).parent().find("td:eq('6')").text();

    var awagency = $(this).parent().find("td:eq('7')").text();
    var awSubAgency = $(this).parent().find("td:eq('8')").text();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&FOfficeCode=' + FundingOfficeCode + '&AwAgencyCode=' + AwardingAgencyCode + '&AwSubAgencyCode=' + AwardingSubAgencyCode + '&AwSubAgency=' + awSubAgency + '&AwAgency=' + awagency + '&OffcDesc=' + BindOfficeDesc + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on Awarding Sub Agency click ========//
$(document).on('click', '.GoAwardingSubAgency', function () {
   
    var SBval = "";
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('22')").text();
    var FundingOfficeCode = $(this).parent().find("td:eq('20')").text();
    var AwardingAgencyCode = $(this).parent().find("td:eq('21')").text();
    var AwardingSubAgencyCode = $(this).parent().find("td:eq('22')").text();

    var Dept = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();
    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();

    var BindOfficeDesc = $(this).parent().find("td:eq('6')").text();

    var awagency = $(this).parent().find("td:eq('7')").text();
    var awSubAgency = $(this).parent().find("td:eq('8')").text();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&FOfficeCode=' + FundingOfficeCode + '&AwAgencyCode=' + AwardingAgencyCode + '&AwSubAgencyCode=' + AwardingSubAgencyCode + '&AwSubAgency=' + awSubAgency + '&AwAgency=' + awagency + '&OffcDesc=' + BindOfficeDesc + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on Awarding Office click ========//
$(document).on('click', '.GoAwardingOffice', function () {
    var SBval = "";
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();
    var FundingOfficeCode = $(this).parent().find("td:eq('20')").text();
    var AwardingAgencyCode = $(this).parent().find("td:eq('21')").text();
    var AwardingSubAgencyCode = $(this).parent().find("td:eq('22')").text();
    var AwardingOfficeCode = $(this).parent().find("td:eq('23')").text();

    var Dept = $(this).parent().find("td:eq('4')").text();
    var Naics = $(this).parent().find("td:eq('13')").text();
    var solicitationProc = $(this).parent().find("td:eq('10')").text();
    var solicitationProcCode = $(this).parent().find("td:eq('27')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "-") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('5')").text();
    var FYStart = $('.startYear_2').val();
    var FYEnd = $('.EndYear_2').val();
    var MinimumContractSize = $(".MinContractSize_2").val();

  
    var BindOfficeDesc = $(this).parent().find("td:eq('6')").text();

    var awagency = $(this).parent().find("td:eq('7')").text();
    var awSubAgency = $(this).parent().find("td:eq('8')").text();
    var awOffice = $(this).parent().find("td:eq('9')").text();
    var keywordText = $("#txtkeyword").val();

    window.open(window.location.origin + '/ContractSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&FOfficeCode=' + FundingOfficeCode + '&AwAgencyCode=' + AwardingAgencyCode + '&AwSubAgencyCode=' + AwardingSubAgencyCode + '&AwOfficeCode=' + AwardingOfficeCode + '&OffcDesc=' + BindOfficeDesc + '&AwSubAgency=' + awSubAgency + '&AwAgency=' + awagency + '&AwOffice=' + awOffice + '&Agency=' + Agency + '&Dept=' + Dept + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval + '&SProc=' + solicitationProc + '&SProcCode=' + solicitationProcCode + '&Keyword=' + keywordText, '_blank');

});

// =========redirect to new tab on VendorName click ========//

$(document).on('click', '.GoVendor', function () {

    var vendorname = jQuery(this).text();

    var CG = $(this).parent().find("td:eq('25')").text();
    const encodedData = window.btoa(CG);


    window.open(window.location.origin + '/VendorSearch/Index?vendorname=' + vendorname + "&CG=" + encodedData, '_blank');

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
});

$(document).on('click', '.btndeptrowclear', function () {

    var dept = this.id;
    var spl = dept.split('_');
    if (spl[1] == '2') {
        DepartmentAgencycode_1st = [];
        DepartmentAgencycode_1st.push({ DeptCode: $('#lbldept_' + spl[1]).text(), DeptDesc: $('#txtdept_' + spl[1]).val(), AgencyCode: $('#lblagency_' + spl[1]).text(), AgencyDesc: $('#txtagency_' + spl[1]).val(), OfficeCode: $('#lbloffice_' + spl[1]).text(), OfficeDesc: $('#txtoffice_' + spl[1]).val() });
    }


    $('#txtdept_' + spl[1]).val("");
    $('#txtagency_' + spl[1]).val("");
    $('#lbldept_' + spl[1]).text("");
    $('#lblagency_' + spl[1]).text("");
    $('#txtoffice_' + spl[1]).val("");
    $('#lbloffice_' + spl[1]).text("");
});

$(document).on('click', '.btnawagencyrowclear', function () {

    var awagency = this.id;
    var spl = awagency.split('_');
    if (spl[1] == '2') {
        AwAgencySubAgencycode_1st = [];
        AwAgencySubAgencycode_1st.push({ AgencyCode: $('#lblawagency_' + spl[1]).text(), AgencyDesc: $('#txtawagency_' + spl[1]).val(), SubAgencyCode: $('#lblawsubagency_' + spl[1]).text(), SubAgencyDesc: $('#txtawsubagency_' + spl[1]).val(), OfficeCode: $('#lblawoffice_' + spl[1]).text(), OfficeDesc: $('#txtawoffice_' + spl[1]).val() });
    }


    $('#txtawagency_' + spl[1]).val("");
    $('#txtawsubagency_' + spl[1]).val("");
    $('#lblawagency_' + spl[1]).text("");
    $('#lblawsubagency_' + spl[1]).text("");
    $('#txtawoffice_' + spl[1]).val("");
    $('#lblawoffice_' + spl[1]).text("");
});

$(document).on('click', '.btnpscrowclear', function () {
    var psc = this.id;
    var spl = psc.split('_');
    $('#txtpsccode_' + spl[1]).val("");
    $('#txtpscdesc_' + spl[1]).val("");
});

$(document).on('click', '#btnkeywordrowclear', function () {
    $("#txtkeyword").val("");
});

$(document).on('click', '#btnagencyrowclear', function () {
    $("#txtagency_2").val("");
    $("#lblagency_2").text("");
    $('#txtoffice_2').val("");
    $('#lbloffice_2').text("");
});

$(document).on('click', '#btnofficerowclear', function () {
    $('#txtoffice_2').val("");
    $('#lbloffice_2').text("");
});

$(document).on('click', '.btnclearagency', function () {
    var id = $(this).attr('id');
    var spl = id.split('_');
    $('#txtagency_' + spl[1]).val("");
    $('#lblagency_' + spl[1]).text("");
});

$(document).on('click', '.btnclearoffice', function () {
    var id = $(this).attr('id');
    var spl = id.split('_');
    $('#txtoffice_' + spl[1]).val("");
    $('#lbloffice_' + spl[1]).text("");
});

$(document).on('click', '#btnawsubagencyrowclear', function () {
    $("#txtawsubagency_2").val("");
    $("#lblawsubagency_2").text("");
    $('#txtawoffice_2').val("");
    $('#lblawoffice_2').text("");
});

$(document).on('click', '#btnawofficerowclear', function () {
    $('#txtawoffice_2').val("");
    $('#lblawoffice_2').text("");
});

$(document).on('click', '.btnclearawsubagency', function () {
    var id = $(this).attr('id');
    var spl = id.split('_');
    $('#txtawsubagency_' + spl[1]).val("");
    $('#txtawsubagency_' + spl[1]).text("");
});

$(document).on('click', '.btnclearawoffice', function () {
    var id = $(this).attr('id');
    var spl = id.split('_');
    $('#txtawoffice_' + spl[1]).val("");
    $('#lblawoffice_' + spl[1]).text("");
});


$(document).on('click', '.btnsolicitationrowclear', function () {

    var solicitation = this.id;
    var spl = solicitation.split('_');
    if (spl[1] === '2') {
        Solicitationcode_1st = [];
        Solicitationcode_1st.push({ SolicitationCode: $('#lblsolicitation_' + spl[1]).text(), SolicitationDesc: $('#txtsolicitation_' + spl[1]).val() });
    }

    $('#txtsolicitation_' + spl[1]).val("");
    $('#lblsolicitation_' + spl[1]).text("");
});



//=============================== modal popup Departement and agency close start ===============================//
$(document).on('click', '#btnmdclose', function () {


    CloseDeptAgencyPopup();
    $('#myModal').modal('toggle');

    AgencyCode_R = []; // copy AgencyCode array into AgencyCode_R
    AgencyCode_R = AgencyCode.slice();
    OfficeCode = [];
    OfficeCode_R = OfficeCode.slice(); // copy OfficeCode array into OfficeCode_R
});

function CloseDeptAgencyPopup() {
   
    //============= Remove blank rows =========//
    var len = "";
    $(".DeptMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var DeptDesc = $('#txtdept_' + spl[1]).val();
        if (DeptDesc == "" || DeptDesc == undefined) {
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
            $('.office_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtdept_2').val() == "") {

                $('#txtdept_2').val($('#txtdept_' + spl[1]).val());
                $('#lbldept_2').text($('#lbldept_' + spl[1]).text());
                $('#txtagency_2').val($('#txtagency_' + spl[1]).val());
                $('#lblagency_2').text($('#lblagency_' + spl[1]).text());
                $('#txtoffice_2').val($('#txtoffice_' + spl[1]).val());
                $('#lbloffice_2').text($('#lbloffice_' + spl[1]).text());

                $('.dept_' + spl[1]).remove();
                $('.agency_' + spl[1]).remove();
                $('.office_' + spl[1]).remove();

            }
        }
    });
    //============= Remove blank rows =========//
    DepartmentCode = [];
    AgencyCode = [];
    OfficeCode = [];
    AgencyCodewithoutFilter = [];
    DepartmentCodewithoutFilter = [];

    //============= Count Agency =========//
    $(".lblagency").each(function () {

        var agency = $(this).text();
        AgencyCode.push(agency);
        AgencyCode = AgencyCode.filter(item => item);
        AgencyCodewithoutFilter = AgencyCode.slice();
        AgencyCode = AgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        $('#AgencyDDL').val(AgencyCode[0]);

    });
    //============= Count Agency =========//

    //============= Count Office =========//
    $(".lbloffice").each(function () {

        var office = $(this).text();
        OfficeCode.push(office);
        OfficeCode = OfficeCode.filter(item => item);
        OfficeCode = OfficeCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        $('#FundingOfficeDDL').val(OfficeCode[0]);

    });
    //============= Count Office =========//

    //============= Count Departmrnt =========//
    $(".lbldept").each(function () {
        var deptcheck = $('#txtdept_2').val();

        var dept = $(this).text();
        DepartmentCode.push(dept);
        DepartmentCode = DepartmentCode.filter(item => item);
        DepartmentCodewithoutFilter = DepartmentCode.slice();
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

        $('#DepartmentDDL').val(DepartmentCode[0]);

    });
    //============= Count Departmrnt =========//

    // Bind Data to Search fields //
    $('#DepartmentDDL').val($('#txtdept_2').val());
    $('#AgencyDDL').val($('#txtagency_2').val());
    $('#FundingOfficeDDL').val($('#txtoffice_2').val());
    $("#AgencyDDL").prop('disabled', false);
    $("#FundingOfficeDDL").prop('disabled', false);
    //$('#HD_Dept').text($('#txtdept_2').val());

    if (DepartmentCode.length > 0) {
        if ($("#txtdept_2").val() !== "" && $("#txtdept_2").val() !== null && $("#txtdept_2").val() !== undefined) {
            if ($("#txtagency_2").val() === "" || $("#txtagency_2").val() === null || $("#txtagency_2").val() === undefined) {
                swal("", "Please choose a funding subagency", "info");
                return false;
            }
        }
    }

    if (AgencyCodewithoutFilter.length > 0) {
        if (AgencyCodewithoutFilter.length === DepartmentCodewithoutFilter.length) {
            var count = 0;
            $('.txtagency').each(function () {
                var id = $(this).attr('id');
                var index = id.split('_')[1];
                count++;
                if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                    if (index > -1) {
                        AgencyCodewithoutFilter.splice(index, 1);
                    }
                    swal("", "Please enter funding sub agency in row " + count, "warning");
                    return false;
                }
            });
        }
        else {
            //swal("", "Please fix the following <br/>1.  Choose an sub agency on all rows <br/>OR<br/>  2.  Leave all subagencies choices empty.", "info");
            swal("", "Please enter funding sub agency in all rows", "warning");
            return false;
        }
    }


    if (OfficeCode.length > 0) {
        if ($("#txtoffice_2").val() !== "" && $("#txtoffice_2").val() !== undefined) {

        }
        else {
            swal("", "Please fix the following <br/>1.  Choose office in first row <br/>OR<br/>  2.  Leave all office choices empty.", "info");
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
            OfficeCode_R = [];
            OfficeCode_R = OfficeCode.slice();
        }, 1000);

    });   
}

//=============================== modal popup Departement, Funding Office and agency close end ==========================================//

//=============================== modal popup Awarding agency, office and sub agency close start ===============================//
$(document).on('click', '#btnamdclose', function () {


    CloseAwardingAgencyPopup();
    $('#awardingAgencyModal').modal('toggle');

    AwSubAgencyCode = []; // copy AgencyCode array into AgencyCode_R
    AwSubAgencyCode_R = AwSubAgencyCode.slice();
    AwOfficeCode = [];
    AwOfficeCode_R = AwOfficeCode.slice(); // copy OfficeCode array into OfficeCode_R
});

function CloseAwardingAgencyPopup() {
    //============= Remove blank rows =========//
    var len = "";
    $(".AwAgencyMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var AwAgencyDesc = $('#txtawagency_' + spl[1]).val();
        if (AwAgencyDesc == "" || AwAgencyDesc == undefined) {
            $(".awagency_" + spl[1]).remove();
            $(".awsubagency_" + spl[1]).remove();
            $(".awoffice_" + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtawagency_2').val() == "") {

                $('#txtawagency_2').val($('#txtawagency_' + spl[1]).val());
                $('#lblawagency_2').text($('#lblawagency_' + spl[1]).text());
                $('#txtawsubagency_2').val($('#txtawsubagency_' + spl[1]).val());
                $('#lblawsubagency_2').text($('#lblawsubagency_' + spl[1]).text());
                $('#txtawoffice_2').val($('#txtawoffice_' + spl[1]).val());
                $('#lblawoffice').text($('#lblawoffice' + spl[1]).text());

                $(".awagency_" + id).remove();
                $(".awsubagency_" + id).remove();
                $(".awoffice_" + id).remove();

            }
        }
    });
    //============= Remove blank rows =========//
    AwardingAgencyCode = [];
    AwSubAgencyCode = [];
    AwOfficeCode = [];
    AwardingSubAgencyCodewithoutFilter = [];
    AwardingAgencyCodewithoutFilter = [];

    //============= Count Awarding Sub Agency =========//
    $(".lblawsubagency").each(function () {

        var subagency = $(this).text();
        AwSubAgencyCode.push(subagency);
        AwSubAgencyCode = AwSubAgencyCode.filter(item => item);
        AwardingSubAgencyCodewithoutFilter = AwSubAgencyCode.slice();
        AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        $('#AwSubAgencyDDL').val(AwSubAgencyCode[0]);

    });
    //============= Count Awarding Sub Agency =========//

    //============= Count Awarding Office =========//
    $(".lblawoffice").each(function () {

        var awoffice = $(this).text();
        AwOfficeCode.push(awoffice);
        AwOfficeCode = AwOfficeCode.filter(item => item);
        AwOfficeCode = AwOfficeCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        $('#AwOfficeDDL').val(AwOfficeCode[0]);

    });
    //============= Count Awarding Office =========//

    //============= Count Awarding Agency =========//
    $(".lblawagency").each(function () {
        var awagencycheck = $('#txtawagency_2').val();

        var awagency = $(this).text();
        AwardingAgencyCode.push(awagency);
        AwardingAgencyCode = AwardingAgencyCode.filter(item => item);
        AwardingAgencyCodewithoutFilter = AwardingAgencyCode.slice();
        AwardingAgencyCode = AwardingAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        if (awagencycheck !== "") {
            if (AwardingAgencyCode.length > 1) {
                $('#lbltotalawagency').show();
                $('#lbltotaladdedrowawagency').text((AwardingAgencyCode.length - 1));
            }
            else {
                $('#lbltotalawagency').hide();
                $('#lbltotaladdedrowawagency').text('');
            }
        }

        $('#AwAgencyDDL').val(AwardingAgencyCode[0]);

    });
    //============= Count Awarding Agency =========//

    // Bind Data to Search fields //
    $('#AwAgencyDDL').val($('#txtawagency_2').val());
    $('#AwSubAgencyDDL').val($('#txtawsubagency_2').val());
    $('#AwOfficeDDL').val($('#txtawoffice_2').val());
    $("#AwSubAgencyDDL").prop('disabled', false);
    $("#AwOfficeDDL").prop('disabled', false);

    if (AwardingAgencyCode.length > 0) {
        if ($("#txtawagency_2").val() !== "" && $("#txtawagency_2").val() !== null && $("#txtawagency_2").val() !== undefined) {
            if ($("#txtawsubagency_2").val() === "" || $("#txtawsubagency_2").val() === null || $("#txtawsubagency_2").val() === undefined) {
                swal("", "Please choose an awarding subagency", "info");
                return false;
            }
        }
    }

    if (AwardingSubAgencyCodewithoutFilter.length > 0) {
        if (AwardingSubAgencyCodewithoutFilter.length === AwardingAgencyCodewithoutFilter.length) {
            var count = 0;
            $('.txtawsubagency').each(function () {
                var id = $(this).attr('id');
                var index = id.split('_')[1];
                count++;
                if ($("#" + id).val() === "" || $("#" + id).val() === undefined) {
                    if (index > -1) {
                        AwardingSubAgencyCodewithoutFilter.splice(index, 1);
                    }
                    swal("", "Please enter awarding sub agency in row " + count, "warning");
                    return false;
                }
            });

        }
        else {
            //swal("", "Please fix the following <br/>1.  Choose an agency on all rows <br/>OR<br/>  2.  Leave all agencies choices empty.", "info");
            swal("", "Please enter awarding sub agency in all rows", "warning");
            return false;
        }
    }
    


    if (AwOfficeCode.length > 0) {
        if ($("#txtawoffice_2").val() !== "" && $("#txtawoffice_2").val() !== undefined) {

        }
        else {
            swal("", "Please fix the following <br/>1.  Choose office in first row <br/>OR<br/>  2.  Leave all office choices empty.", "info");
            return false;
        }
    }


    $('#lbltotalawagency').click(function () {
        $('#awardingAgencyModal').modal('show');
        setTimeout(function () {
            $("#txtawagency_2").focus();
            AwardingAgencycode_R = [];
            AwardingAgencycode_R = AwardingAgencyCode.slice();
            AwSubAgencyCode_R = [];
            AwSubAgencyCode_R = AwSubAgencyCode.slice();
            AwOfficeCode_R = [];
            AwOfficeCode_R = AwOfficeCode.slice();
        }, 1000);

    });
    
}

//=============================== modal popup Departement, Funding Office and agency close end ==========================================//

//=============================== modal popup Solicitation close start ===============================//
$(document).on('click', '#OKSolicitation', function () {
    CloseSolicitationPopup();
    $('#solicitationModal').modal('toggle');
});

function CloseSolicitationPopup() {
    //============= Remove blank rows =========//
    var len = "";
    $(".SolicitationMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var SolicitationDesc = $('#txtsolicitation_' + spl[1]).val();
        if (SolicitationDesc === "" || SolicitationDesc === undefined) {
            $('.solicitation_' + spl[1]).remove();
        }

        len = array.length;
        if (len === (i + 1)) {
            if ($('#txtsolicitation_2').val() === "") {

                $('#txtsolicitation_2').val($('#txtsolicitation_' + spl[1]).val());
                $('#lblsolicitation_2').text($('#lblsolicitation_' + spl[1]).text());

                $('.solicitation_' + spl[1]).remove();

            }
        }
    });
    //============= Remove blank rows =========//
    SolicitationCode = [];

    //============= Count Solicitation =========//
    $(".lblsolicitation").each(function () {
        var solicitationcheck = $('#txtsolicitation_2').val();

        var solicitation = $(this).text();
        SolicitationCode.push(solicitation);
        SolicitationCode = SolicitationCode.filter(item => item);
        SolicitationCode = SolicitationCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        if (solicitationcheck !== "") {
            if (SolicitationCode.length > 1) {
                $('#lbltotalsolicitation').show();
                $('#lbltotaladdedrowsolicitation').text((SolicitationCode.length - 1));
            }
            else {
                $('#lbltotalsolicitation').hide();
                $('#lbltotaladdedrowsolicitation').text('');
            }
        }

        $('#SolicitationDDL').val(SolicitationCode[0]);

    });
    //============= Count Solicitation =========//


    $('#lbltotalsolicitation').click(function () {
        $('#solicitationModal').modal('show');
        setTimeout(function () {
            $("#txtsolicitation_2").focus();
            SolicitationCode_R = [];
            SolicitationCode_R = SolicitationCode.slice();
        }, 1000);

    });

    // Bind Data to Search fields //
    $('#SolicitationDDL').val($('#txtsolicitation_2').val());
}

//=============================== modal popup Solicitation end ==========================================//

// ************************************************************ New Naics code Popup 01032021 ************************************************************8 //
$(document).on('click', '.add-textbox', function (e) {
    e.preventDefault();

    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();
    if (NaicsCode_R.length > 1) {
        cnt = NaicsCode_R.length + 1;
    }
    else {
        cnt = 2;
    }
    $('#NaicsCodeModal_cont').modal('show');
    setTimeout(function () {
        $("#txtnaicscode_2").focus();
    }, 1000);
});

$(document).on('click', '#txtnaicscode_1', function () {
    $('.add-textbox').trigger('click');
});

$(document).on("click", ".add-textboxcodemodal", function () {

    $('#NaicsCodeModal').modal('show');
    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();
   

    setTimeout(function () {
        $("#txtnaicscode_2").focus();
    }, 1000);
});

$(document).on('click', '.add-textboxcode', function (e) {

    var Naics = $("#txtnaicscode_2").val();
    if (Naics != "") {
        e.preventDefault();
        addnaicscode();
    }
    else {
        swal("", "Please enter at least one Naics Code field !");
    }
});

//================= naice code popup close function =================//
$(document).on('click', '#btnmdnaicscodeclose', function () {
    removeBlkRow();
    clearNaicsPopup();
    $('#NaicsCodeModal_cont').modal('toggle');
});
function removeBlkRow() {
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
}
function clearNaicsPopup() {
    NaicsCode = [];

    $(".NaicsCode ").each(function () {

        var naicscodecheck = $('#txtnaicscode_2').val();
        var naicscode = $(this).val();

        if (naicscode != "") {
            NaicsCode.push(naicscode);
        }
        NaicsCode = NaicsCode.filter(item => item);
        NaicsCode = NaicsCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        if (naicscodecheck != "") {
            if (NaicsCode.length > 1) {
                $('#lbltotalnaics').show();
                $('#lbltotaladdedrownaics').text((NaicsCode.length - 1));
                //alert($('#lbltotaladdedrownaics').text());
            }
            else {
                $('#lbltotalnaics').hide();
            }
        }
        else {
            $('#lbltotalnaics').hide();
        }


    });
    $('#txtnaicscode_1').val($('#txtnaicscode_2').val());
    $('#txtnaicsdesc_1').val($('#txtnaicsdesc_2').val());

}
//================= naice code popup close function =================//


// ============== Dynamic addition of naics code ====================//

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
            '<i class="ti-info-alt infoIcon s002 NC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-9">' +
            '<div class="row">' +
            '<div class="col-md-11">' +

            '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtnaicsdesc_' + cnt + '" class="form-control lblnaicsdesc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NCD" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            ' </div>' +

            '<div class="col-md-1">' +
            '<button type="button" id="btnremovenaicsfour_' + cnt + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxnaicsfour" data-toggle="tooltip" title="Click here to add another row (Max 3 rows)">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".naicsincr").append(filldata);
    }
}
// ============= Dynamic addition of naics code ====================//

// ************************************************************ New Naics code Popup 01032021 ************************************************************8 //

// ************************************************************ New Naics Family Popup 01032021 ************************************************************8 //
$(document).on('click', '#txtnaicsfamcode_1', function (e) {
    $(".add-textboxfammodal").trigger('click');
});

$(document).on('click', '.add-textboxfammodal', function (e) {

    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();
    if (NaicsCode_R.length > 1) {
        cntFam = NaicsCode_R.length + 1;
    }
    else {
        cntFam = 2;
    }
    $('#NaicsfamilyModal').modal('show');
    setTimeout(function () {
        $("#txtnaicsfamcode_2").focus();
    }, 1000);
});

$(document).on('click', '.add-textboxfam', function (e) {

    var Naics = $("#txtnaicsfamcode_2").val();
    if (Naics != "") {
        e.preventDefault();
        addnaicsfamily();
    }
    else {
        swal("", "Please enter at least one Naics family field !");
    }
});

$(document).on('click', '#btnmdnaicsfamilyclose', function (e) {

    removeNaicsFamilyEmpty();
    NaicsFamPopup();
    $('#NaicsfamilyModal').modal('toggle');
});

function NaicsFamPopup() {
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

        $('#txtnaicsfamcode_1').val($('#txtnaicsfamcode_2').val());
        $('#txtnaicsfamdesc_1').val($('#txtnaicsfamdesc_2').val());


    });
}
function removeNaicsFamilyEmpty() {
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

}

function addnaicsfamily() {

    if (cntFam < maxFam) {
        cntFam++;

        var fillData = '<div class="naicsFam_' + cntFam + ' row NaicsFamRow" id="NaicsFamilyRow_' + cntFam + '">' +

            '<div class="col-md-3 dis_able0 s004">' +
            '<div class="input-group mb-3" style="width: 108%;">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnnaicsfamilyrowclear" id="btnnaicsfamrowclear_' + cntFam + '" data-toggle="tooltip" title="Click to clear the data in this row">' +
            '<i class="ti-close"></i>' +
            '</span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtnaicsfamcode_' + cntFam + '" class="DIS_002 form-control NaicsFamCode dis_able0 lblnaicsFamdesc" name="textbox" />' +
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
            '<input disabled type="text" id="txtnaicsfamdesc_' + cntFam + '" class="form-control" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NFD" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button id= "btnremovenaicssix_' + cntFam + '"  type="button" class="s022 btn   btn-sm remove-textboxfam B_s004" data-toggle="tooltip" title="Click here to add another row (Max 3 rows)">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $(".naicsincrFam").append(fillData);

    }
    set_Helpicon();
}
// ************************************************************ New Naics Family Popup 01032021 ************************************************************8 //






//===================== Dept / Agency / Funding Office [cancel] ===================//

$(document).on('click', '#btnmdcancel', function () {
   
    AgencyCodewithoutFilter = [];
    DepartmentCodewithoutFilter = [];
   
    var n = AgencyCode_R.includes($('#lblagency_2').text());
        if (n != true) {
            $('#txtagency_2').val("");
            $('#lblagency_2').text("");
            $('#txtoffice_2').val("");
            $('#lbloffice_2').text("");
    }
  
    //============= Remove blank rows =========//
    var len = "";
    $(".DeptMainrows").get().forEach(function (entry, index, array) {
       
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');
       
        if ($('#lblagency_' + spl[1]).text() == "") {
          //  $('#txtdept_' + spl[1]).val("");
          //  $('#lbldept_' + spl[1]).text("");
            $('#txtagency_' + spl[1]).val("");
            $('#lblagency_' + spl[1]).text("");
            $('#txtoffice_' + spl[1]).val("");
            $('#lbloffice_' + spl[1]).text("");
        }

        var m = AgencyCode_R.includes($('#lblagency_' + spl[1]).text());
        if (m != true || $('#lblagency_2').text() == $('#lblagency_' + spl[1]).text()) {
            $('#txtagency_' + spl[1]).val("");
            $('#lblagency_' + spl[1]).text("");
            $('#txtoffice_' + spl[1]).val("");
            $('#lbloffice_' + spl[1]).text("");
        }
        var n = Departmentcode_R.includes($('#lbldept_' + spl[1]).text());
        if (n != true) {
            $('#txtdept_' + spl[1]).val("");
            $('#lbldept_' + spl[1]).text("");
            $('#txtagency_' + spl[1]).val("");
            $('#lblagency_' + spl[1]).text("");
            $('#txtoffice_' + spl[1]).val("");
            $('#lbloffice_' + spl[1]).text("");
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
            $('.office_' + spl[1]).remove();
        }
        else {
        }       
    });
    //============= Remove blank rows =========//


    var de = $.isArray(Departmentcode_R);
    var Ag = $.isArray(AgencyCode_R);
    var fundingOffice = $.isArray(OfficeCode_R);

    if (de == true) { } else {
        Departmentcode_R = Departmentcode_R.split(',');
    }
    if (Ag == true) { } else {
        AgencyCode_R = AgencyCode_R.split(',');
    }

    if (fundingOffice == true) { } else {
        OfficeCode_R = OfficeCode_R.split(',');
    }   

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

    $(".lbloffice").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Office = $(this).text();

        var n = OfficeCode_R.includes(Office);
        if (n == true) {
            const index = OfficeCode_R.indexOf(Office);
            if (index > -1) {
                OfficeCode_R.splice(index, 1);
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
                $('#txtoffice_2').val(DepartmentAgencycode_1st[0].OfficeDesc);// to add a value in text box
                $('#lbloffice_2').text(DepartmentAgencycode_1st[0].OfficeCode);// to add a value in text box
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

                }

                addoffice();
                if (OfficeCode_R.length > 0) {
                    getFundingOffice(AgencyCode_R[i]);

                    var Officeresult = OfficeCombo[0].filter(obj => {
                        return obj.id === OfficeCode_R[i];
                    });


                    // to add a new text box for ****** OFFICE ******
                    var O_getcount = cntoffice;
                    $('#txtagency_' + O_getcount).val(Officeresult[0].value);// to add a value in text box
                    $('#lblagency_' + O_getcount).text(OfficeCode_R[i]);// to add a value in text box

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

            }

            addoffice();
            if (OfficeCode_R.length > 0) {
                getFundingOffice(AgencyCode_R[i]);

                var Officeresult = OfficeCombo[0].filter(obj => {
                    return obj.id === OfficeCode_R[i];
                });


                // to add a new text box for ****** OFFICE ******
                var O_getcount = cntoffice;
                $('#txtagency_' + O_getcount).val(Officeresult[0].value);// to add a value in text box
                $('#lblagency_' + O_getcount).text(OfficeCode_R[i]);// to add a value in text box

            }
        }





    });


    //Get Again DepartmentCode_R array 
    DepartmentCode = [];
    $(".lbldept").each(function () {
        var dept = $(this).text();
        if (dept != "") {
            DepartmentCode.push(dept);
        }
    });

    if (DepartmentCode.length > 0) {
        DepartmentCode = DepartmentCode.filter(item => item);       
        DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var department_group_code = DepartmentCode.join();
        DepartmentCode = department_group_code;
        Departmentcode_R = [];
        Departmentcode_R = DepartmentCode.slice();
    }

     //Get Again AgencyCode_R array
    AgencyCode = [];
    $(".lblagency").each(function () {
        var agency = $(this).text();

        if (agency != "") {
            AgencyCode.push(agency);
        }
    });
    if (AgencyCode.length > 0) {
        AgencyCode = AgencyCode.filter(item => item);       
        AgencyCode = AgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var agency_group_code = AgencyCode.join();
        AgencyCode = agency_group_code;
        AgencyCode_R = [];
        AgencyCode_R = AgencyCode.slice();
    }


    $('#myModal').modal('toggle');
});


function adddepartment() {

    var maxdept = 6;

    if (cntdept < maxdept) {
        cntdept++;
        // alert(cntdept);
        var filldata = '<div class="dept_' + cntdept + ' row col-md-12 DeptMainrows" id="DeptRow_' + cntdept + '">' +

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
            '<button type="button" id="btnremovedept_' + cntdept + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxdept" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
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

    var maxagency = 6;
    if (cntagency < maxagency) {
        cntagency++;

        var fill = '<div class="agency row col-md-12 ">' +
            '<div class="col-md-3 s004" style="max-width: 19%;">' +
            '<input style="margin-bottom: 4px;" type = "text" id = "txtagency_' + cntagency + '" class= "form-control NaicsCode" name = "textbox" />' +
            '</div>' +
            '<div class="col-md-1" style="width: 0%;"></div>' +
            '<div class= "col-md-7 s004" style="margin-left: -2px;width:59%;">' +
            '<input disabled style="margin-bottom: 4px;" type = "text" id=txtpscdesc_' + cntagency + ' class= "form-control " name = "textbox"/>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button type="button" id= "btnremovepsc_' + cntagency + '" class="btn  remove-textboxnaicsfour" data-toggle="tooltip"  title="Click here to delete row"  style="margin-left: 32px;">' +
            '<i style="margin-left: 1px;font-size: 12px;font-weight: 200;"  class="ti-minus"></i>' +
            '</button>' +
            '</div>' +
            '</div>'

        var filldata = '<div class="agency_' + cntagency + ' row col-md-12 ">' +

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
            '<button type="button" id="btnremoveagency_' + cntagency + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxagency" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".agencyincr").append(filldata);
    }
    set_Helpicon();

}

function addoffice() {

    var maxoffice = 6;
    if (cntoffice < maxoffice) {
        cntoffice++;

        var fill = '<div class="office row col-md-12 ">' +
            '<div class="col-md-3 s004" style="max-width: 19%;">' +
            '<input style="margin-bottom: 4px;" type = "text" id = "txtoffice_' + cntoffice + '" class= "form-control NaicsCode" name = "textbox" />' +
            '</div>' +
            '<div class="col-md-1" style="width: 0%;"></div>' +
            '<div class= "col-md-7 s004" style="margin-left: -2px;width:59%;">' +
            '<input disabled style="margin-bottom: 4px;" type = "text" id=txtpscdesc_' + cntoffice + ' class= "form-control " name = "textbox"/>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button type="button" id= "btnremovepsc_' + cntoffice + '" class="btn  remove-textboxnaicsfour" data-toggle="tooltip"  title="Click here to delete row"  style="margin-left: 32px;">' +
            '<i style="margin-left: 1px;font-size: 12px;font-weight: 200;"  class="ti-minus"></i>' +
            '</button>' +
            '</div>' +
            '</div>'

        var filldata = '<div class="office_' + cntoffice + ' row col-md-12 ">' +

            '<div class="col-md-12 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnclearoffice" id="btnofficerowclear_' + cntoffice + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtoffice_' + cntoffice + '" class="DIS_002 form-control txtoffice dis_able1" name="textbox" /><label id="lbloffice_' + cntoffice + '" style="display:none;" class="lbloffice"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 FOFFC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1" style="display:none">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremoveoffice_' + cntoffice + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxoffice" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".officeincr").append(filldata);
    }
    set_Helpicon();

}

//===================== Awarding Agency / Awarding Sub Agency / Awarding Office [cancel] ===================//

$(document).on('click', '#btnamdcancel', function () {
    AwardingSubAgencyCodewithoutFilter = [];
    AwardingAgencyCodewithoutFilter = [];
    //============= Remove blank rows =========//
    var n = AwSubAgencyCode_R.includes($('#lblawsubagency_2').text());
    if (n != true) {
        $('#txtawsubagency_2').val("");
        $('#lblawsubagency_2').text("");
        $('#txtawoffice_2').val("");
        $('#lblawoffice_2').text("");
    }
  
    var len = "";
    $(".AwAgencyMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        if ($('#lblawsubagency_' + spl[1]).text() === "") {
           // $('#txtawagency_' + spl[1]).val("");
            //$('#lblawagency_' + spl[1]).text("");
            $('#txtawsubagency_' + spl[1]).val("");
            $('#lblawsubagency_' + spl[1]).text("");
            $('#txtawoffice_' + spl[1]).val("");
            $('#lblawoffice_' + spl[1]).text("");
        }

        var m = AwSubAgencyCode_R.includes($('#lblawsubagency_' + spl[1]).text());
        if (m != true || $('#lblawsubagency_2').text() == $('#lblawsubagency_' + spl[1]).text()) {
            $('#txtawsubagency_' + spl[1]).val("");
            $('#lblawsubagency_' + spl[1]).text("");
            $('#txtawoffice_' + spl[1]).val("");
            $('#lblawoffice_' + spl[1]).text("");
        }

        var n = AwardingAgencycode_R.includes($('#lblawagency_' + spl[1]).text());
        if (n != true) {
            $('#txtawagency_' + spl[1]).val("");
            $('#lblawagency_' + spl[1]).text("");
            $('#txtawsubagency_' + spl[1]).val("");
            $('#lblawsubagency_' + spl[1]).text("");
            $('#txtawoffice_' + spl[1]).val("");
            $('#lblawoffice_' + spl[1]).text("");
            $(".awagency_" + spl[1]).remove();
            $(".awsubagency_" + spl[1]).remove();
            $(".awoffice_" + spl[1]).remove();
        }
        else {
        }       
    });
    //============= Remove blank rows =========//


    var de = $.isArray(AwardingAgencycode_R);
    var Ag = $.isArray(AwSubAgencyCode_R);
    var awardingOffice = $.isArray(AwOfficeCode_R);

    if (de == true) { } else {
        AwardingAgencycode_R = AwardingAgencycode_R.split(',');
    }
    if (Ag == true) { } else {
        AwSubAgencyCode_R = AwSubAgencyCode_R.split(',');
    }

    if (awardingOffice == true) { } else {
        AwOfficeCode_R = AwOfficeCode_R.split(',');
    }

    $(".lblawagency").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var awagency = $(this).text();

        var n = AwardingAgencycode_R.includes(awagency);
        if (n === true) {
            const index = AwardingAgencycode_R.indexOf(awagency);
            if (index > -1) {
                AwardingAgencycode_R.splice(index, 1);
            }
        }
        else {
        }

    });
    $(".lblawsubagency").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var AwSubAgency = $(this).text();

        var n = AwSubAgencyCode_R.includes(AwSubAgency);
        if (n == true) {
            const index = AwSubAgencyCode_R.indexOf(AwSubAgency);
            if (index > -1) {
                AwSubAgencyCode_R.splice(index, 1);
            }
        }
        else {
        }

    });

    $(".lblawoffice").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var AwOffice = $(this).text();

        var n = AwOfficeCode_R.includes(AwOffice);
        if (n == true) {
            const index = AwOfficeCode_R.indexOf(AwOffice);
            if (index > -1) {
                AwOfficeCode_R.splice(index, 1);
            }
        }
        else {
        }

    });

    $(AwardingAgencycode_R).each(function (i) { // To add again the removed "ok" values

        var result = AwAgencyCombo[0].filter(obj => {
            return obj.id === AwardingAgencycode_R[i];
        });

        if (AwAgencySubAgencycode_1st.length > 0) {
            if (AwardingAgencycode_R[i] === AwAgencySubAgencycode_1st[0].AgencyCode) {

                $('#txtawagency_2').val(AwAgencySubAgencycode_1st[0].AgencyDesc);// to add a value in text box
                $('#lblawagency_2').text(AwAgencySubAgencycode_1st[0].AgencyCode);// to add a value in text box
                $('#txtawsubagency_2').val(AwAgencySubAgencycode_1st[0].SubAgencyDesc);// to add a value in text box
                $('#lblawsubagency_2').text(AwAgencySubAgencycode_1st[0].SubAgencyCode);// to add a value in text box
                $('#txtawoffice_2').val(AwAgencySubAgencycode_1st[0].OfficeDesc);// to add a value in text box
                $('#lblawoffice_2').text(AwAgencySubAgencycode_1st[0].OfficeCode);// to add a value in text box
            }
            else {
                addawagency();
                var getcount = cntawagency;
                $('#txtawagency_' + getcount).val(result[0].value);// to add a value in text box
                $('#lblawagency_' + getcount).text(AwardingAgencycode_R[i]);// to add a value in text box

                addawsubagency();

                if (AwardingAgencycode_R.length > 0) {
                    getAwSubAgency(AwardingAgencycode_R[i]);

                    var SubAgencyresult = AwSubAgencyCombo[0].filter(obj => {
                        return obj.id === AwSubAgencyCode_R[i];
                    });


                    // to add a new text box for ******SUB AGENCY ******
                    var A_getcount = cntawsubagency;
                    $('#txtawagency_' + A_getcount).val(SubAgencyresult[0].value);// to add a value in text box
                    $('#lblawagency_' + A_getcount).text(AwSubAgencyCode_R[i]);// to add a value in text box

                }

                addawoffice();
                if (AwOfficeCode_R.length > 0) {
                    getAwardingOffice(AwOfficeCode_R[i]);

                    var AwOfficeresult = AwOfficeCombo[0].filter(obj => {
                        return obj.id === AwOfficeCode_R[i];
                    });


                    // to add a new text box for ****** OFFICE ******
                    var O_getcount = cntawoffice;
                    $('#txtawoffice_' + O_getcount).val(AwOfficeresult[0].value);// to add a value in text box
                    $('#lblawoffice_' + O_getcount).text(AwOfficeCode_R[i]);// to add a value in text box

                }
            }
        }
        else {
            addawagency(); // to add a new text box for ****** Agency ******
            var getcount = cntawagency;
            $('#txtawagency_' + getcount).val(result[0].value);// to add a value in text box
            $('#lblawagency_' + getcount).text(AwardingAgencycode_R[i]);// to add a value in text box


            addawsubagency();
            if (AwSubAgencyCode_R.length > 0) {
                getAwSubAgency(AwSubAgencyCode_R[i]);

                var AwSubAgencyresult = AwSubAgencyCombo[0].filter(obj => {
                    return obj.id === AwSubAgencyCode_R[i];
                });


                // to add a new text box for ****** AGENCY ******
                var A_getcount = cntawsubagency;
                $('#txtawsubagency_' + A_getcount).val(AwSubAgencyresult[0].value);// to add a value in text box
                $('#lblawsubagency_' + A_getcount).text(AwSubAgencyCode_R[i]);// to add a value in text box

            }

            addawoffice();
            if (AwOfficeCode_R.length > 0) {
                getAwardingOffice(AwSubAgencyCode_R[i]);

                var AwOfficeresult = AwOfficeCombo[0].filter(obj => {
                    return obj.id === AwOfficeCombo[i];
                });


                // to add a new text box for ****** OFFICE ******
                var O_getcount = cntawoffice;
                $('#txtawoffice_' + O_getcount).val(AwOfficeresult[0].value);// to add a value in text box
                $('#lblawoffice_' + O_getcount).text(AwOfficeCode_R[i]);// to add a value in text box

            }
        }





    });

    AwardingAgencyCode = [];
    $(".lblawagency").each(function () {
        var awagency = $(this).text();
        if (awagency !== "") {
            AwardingAgencyCode.push(awagency);
        }

    });

    if (AwardingAgencyCode.length > 0) {
        AwardingAgencyCode = AwardingAgencyCode.filter(item => item);       
        AwardingAgencyCode = AwardingAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var awarding_agency_group_code = AwardingAgencyCode.join();
        AwardingAgencyCode = awarding_agency_group_code;
    }

    AwSubAgencyCode = [];
    $(".lblawsubagency").each(function () {
        var subagency = $(this).text();

        if (subagency != "") {
            AwSubAgencyCode.push(subagency);
        }
    });
    if (AwSubAgencyCode.length > 0) {
        AwSubAgencyCode = AwSubAgencyCode.filter(item => item);       
        AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        var sub_agency_group_code = AwSubAgencyCode.join();
        AwSubAgencyCode = sub_agency_group_code;
        // alert(AgencyCode);
    }

    $('#awardingAgencyModal').modal('toggle');
});

function addawagency() {

    var maxawagency = 6;

    if (cntawagency < maxawagency) {
        cntawagency++;
        var filldata = '<div class="awagency_' + cntawagency + ' row col-md-12 AwAgencyMainrows" id="AwAgencyRow_' + cntawagency + '">' +

            '<div class="col-md-11 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnawagencyrowclear" id="btnawagencyrowclear_' + cntawagency + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtawagency_' + cntawagency + '" class="DIS_002 form-control  txtawagency dis_able1" name="textbox" /><label id="lblawagency_' + cntawagency + '" style="display:none;" class="lblawagency"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 AWAGCY" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremoveawagency_' + cntawagency + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxawagency" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +

            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".awagencyincr").append(filldata);

    } //$(".add-textboxagency").trigger("click");
    set_Helpicon();
}

function addawsubagency() {

    var maxsubagency = 6;
    if (cntawsubagency < maxsubagency) {
        cntawsubagency++;

        var fill = '<div class="awsubagency row col-md-12 ">' +
            '<div class="col-md-3 s004" style="max-width: 19%;">' +
            '<input style="margin-bottom: 4px;" type = "text" id = "txtawsubagency_' + cntawsubagency + '" class= "form-control NaicsCode" name = "textbox" />' +
            '</div>' +
            '<div class="col-md-1" style="width: 0%;"></div>' +
            '<div class= "col-md-7 s004" style="margin-left: -2px;width:59%;">' +
            '<input disabled style="margin-bottom: 4px;" type = "text" id=txtpscdesc_' + cntawsubagency + ' class= "form-control " name = "textbox"/>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button type="button" id= "btnremovepsc_' + cntawsubagency + '" class="btn  remove-textboxnaicsfour" data-toggle="tooltip"  title="Click here to delete row"  style="margin-left: 32px;">' +
            '<i style="margin-left: 1px;font-size: 12px;font-weight: 200;"  class="ti-minus"></i>' +
            '</button>' +
            '</div>' +
            '</div>'

        var filldata = '<div class="awsubagency_' + cntawsubagency + ' row col-md-12 ">' +

            '<div class="col-md-12 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnclearawsubagency" id="btnawsubagencyrowclear_' + cntawsubagency + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtawsubagency_' + cntawsubagency + '" class="DIS_002 form-control txtawsubagency dis_able1" name="textbox" /><label id="lblawsubagency_' + cntawsubagency + '" style="display:none;" class="lblawsubagency"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 AWSAGCY" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1" style="display:none">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremoveawsubagency_' + cntawsubagency + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxawsubagency" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".awsubagencyincr").append(filldata);
    }
    set_Helpicon();

}

function addawoffice() {

    var maxawoffice = 6;
    if (cntawoffice < maxawoffice) {
        cntawoffice++;

        var fill = '<div class="awoffice row col-md-12 ">' +
            '<div class="col-md-3 s004" style="max-width: 19%;">' +
            '<input style="margin-bottom: 4px;" type = "text" id = "txtawoffice_' + cntawoffice + '" class= "form-control NaicsCode" name = "textbox" />' +
            '</div>' +
            '<div class="col-md-1" style="width: 0%;"></div>' +
            '<div class= "col-md-7 s004" style="margin-left: -2px;width:59%;">' +
            '<input disabled style="margin-bottom: 4px;" type = "text" id=txtpscdesc_' + cntawoffice + ' class= "form-control " name = "textbox"/>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button type="button" id= "btnremovepsc_' + cntawoffice + '" class="btn  remove-textboxnaicsfour" data-toggle="tooltip"  title="Click here to delete row"  style="margin-left: 32px;">' +
            '<i style="margin-left: 1px;font-size: 12px;font-weight: 200;"  class="ti-minus"></i>' +
            '</button>' +
            '</div>' +
            '</div>'

        var filldata = '<div class="awoffice_' + cntawoffice + ' row col-md-12 ">' +

            '<div class="col-md-12 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnclearawoffice" id="btnawofficerowclear_' + cntawoffice + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtawoffice_' + cntawoffice + '" class="DIS_002 form-control txtawoffice dis_able1" name="textbox" /><label id="lblawoffice_' + cntawoffice + '" style="display:none;" class="lblawoffice"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 AWOFFC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1" style="display:none">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremoveawoffice_' + cntawoffice + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxawoffice" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".awofficeincr").append(filldata);
    }
    set_Helpicon();

}

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

            $('#txtnaicscode_' + spl[1]).val("");
            $('#txtnaicsdesc_' + spl[1]).val("");

            $('#IDnaics_' + spl[1]).remove();
        }
        else {
        }
    });
    //============= Remove blank rows =========//
    $(".NaicsCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Naics = $(this).val();

        var n = NaicsCode_R.includes(Naics);
        if (n == true) {
            const index = NaicsCode_R.indexOf(Naics);
            if (index > -1) {
                NaicsCode_R.splice(index, 1);
            }
        }
        else {
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

    $('#NaicsCodeModal_cont').modal('toggle');
    NaicsCode_1st = [];

});
// #################### Naics Code popup data Remove/Add Cancel ################### //

// #################### Naics Family popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnNaicsFamilCancel', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".NaicsFamRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var n = NaicsCode_R.includes($('#txtnaicsfamcode_' + spl[1]).val());
        if (n != true) {

            $('#txtnaicsfamcode_' + spl[1]).val("");
            $('#txtnaicsfamdesc_' + spl[1]).val("");

            $('#NaicsFamilyRow_' + spl[1]).remove();
        }
        else {
        }
    });
    //============= Remove blank rows =========//
    $(".NaicsFamCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Naics = $(this).val();

        var n = NaicsCode_R.includes(Naics);
        if (n == true) {
            const index = NaicsCode_R.indexOf(Naics);
            if (index > -1) {
                NaicsCode_R.splice(index, 1);
            }
        }
        else {
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



// ################### SocioEconimic ################### //

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

        $('.clsSocioeconomicAside input:checkbox[value="' + OKSocioAside[index].value + '"]').prop('checked', true);
        $('.clsSocioeconomicAside input:checkbox[value="' + OKSocioAside[index].value + '"]').parent().parent().parent().css("background-color", "#e8cfff");
    });

    $('#MysocioAside').modal('toggle');

    SocioCountAside();
   /* if (document.URL.includes("QuestionParams")) {
        const aside = document.getElementById("scriptEleSetAside");
        aside.parentNode.removeChild(aside);
    }*/
});

$(document).on('change', '.SocioecAside', function () {

    if (this.checked) {
        //OKSocioAside.push({ value: this.value, text: this.id });

        $(this).parent().parent().parent().css("background-color", "#e8cfff");
    }
    else {
        //OKSocioAside = OKSocioAside.filter((item) => item.text !== this.id);
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
// ################### SocioEconimic ################### //

// ################### Solicitation Procedure ########### //

//===================== Solicitation Procedure Close Popup ===================//

$(document).on('click', '#CancelSolicitation', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".SolicitationMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        if ($('#lblsolicitation_' + spl[1]).text() === "") {
            $('#txtsolicitation_' + spl[1]).val("");
            $('#lblsolicitation_' + spl[1]).text("");
        }

        var n = SolicitationCode_R.includes($('#lblsolicitation_' + spl[1]).text());
        if (n != true) {
            $('#txtsolicitation_' + spl[1]).val("");
            $('#lblsolicitation_' + spl[1]).text("");
            $('.solicitation_' + spl[1]).remove();
        }
        else {
        }
    });
    //============= Remove blank rows =========//


    var sp = $.isArray(SolicitationCode_R);

    if (sp == true) { } else {
        SolicitationCode_R = SolicitationCode_R.split(',');
    }

    $(".lblsolicitation").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var solicitation = $(this).text();

        var n = SolicitationCode_R.includes(solicitation);
        if (n == true) {
            const index = SolicitationCode_R.indexOf(solicitation);
            if (index > -1) {
                SolicitationCode_R.splice(index, 1);
            }
        }
        else {
        }

    });

    $(SolicitationCode_R).each(function (i) { // To add again the removed "ok" values

        var result = SolicitationCombo[0].filter(obj => {
            return obj.id === SolicitationCode_R[i];
        });

        if (Solicitationcode_1st.length > 0) {
            if (SolicitationCode_R[i] === Solicitationcode_1st[0].SolicitationCode) {
                $('#txtsolicitation_2').val(Solicitationcode_1st[0].SolicitationDesc);// to add a value in text box
                $('#lblsolicitation_2').text(Solicitationcode_1st[0].SolicitationCode);// to add a value in text box
            }
            else {
                addSolicitation(); // to add a new text box for ****** Solicitation ****** // to add a new text box for ****** DEPARTMENT ******
                var getcount = cntSolicitation;
                $('#txtsolicitation_' + getcount).val(result[0].value);// to add a value in text box
                $('#lblsolicitation_' + getcount).text(SolicitationCode_R[i]);// to add a value in text box
            }
        }
        else {
            addSolicitation(); // to add a new text box for ****** DEPARTMENT ******
            var getcount = cntSolicitation;
            $('#txtsolicitation_' + getcount).val(result[0].value);// to add a value in text box
            $('#lblsolicitation_' + getcount).text(SolicitationCode_R[i]);// to add a value in text box
        }
    });

    $('#solicitationModal').modal('toggle');
});

function addSolicitation() {
  
    if (cntSolicitation < maxSolicitation) {
        cntSolicitation++;
        var filldata = '<div class="solicitation_' + cntSolicitation + ' row col-md-12 SolicitationMainrows" id="solicitationRow_' + cntSolicitation + '">' +

            '<div class="col-md-11 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnsolicitationrowclear" id="btnsolicitationrowclear_' + cntSolicitation + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtsolicitation_' + cntSolicitation + '" class="SIS_002 form-control  txtsolicitation dis_able1" name="textbox" /><label id="lblsolicitation_' + cntSolicitation + '" style="display:none;" class="lblsolicitation"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 S_PROC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremovesolicitation_' + cntSolicitation + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxsolicitation" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +

            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".solicitationincr").append(filldata);

    }
    set_Helpicon();
}
//===================== Solicitation Procedure Close Popup ===================//

function Base64ToBytes(base64) {
    //var s = window.atob(base64);
    var bytes = new Uint8Array(base64.length);
    for (var i = 0; i < base64.length; i++) {
        bytes[i] = base64.charCodeAt(i);
    }
    return bytes;
};