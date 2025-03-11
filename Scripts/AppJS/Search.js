var DeptCombo = [];
var Agencycombo = [];
var OfficeCombo = [];
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
var userinfo = "";
var origin = window.location.origin;
var Type = "";
var NaicsType = "Code";
var AgencyDescription = [];
var DepartmentDescription = [];
var NaicsCodeDescription = [];
var OfficeDescription = [];
var AwAgencyDescription = [];
var AwSubAgencyDescription = [];
var AwOfficeDescription = [];

var OKSocio = [];

var DefaultStartDate = '2017';
var DefaultEndDate = '2022';

var dept = "";
var awagency = "";

var cntdept = 2;
var cntagency = 2;
var cntSolicitation = 2;
var maxSolicitation = 6;
var cntoffice = 2;
var cntawagency = 2;
var cntawsubagency = 2;
var cntawoffice = 2;

// naics Family //
var maxFam = 6;
var cntFam = 2;

// naics code //
var max = 6;
var cnt = 2;

//Solicitation procedure
var SolicitationCombo = [];
var solicitation = "";
var SolicitationCode = [];
var SolicitationCode_R = [];
var SolicitationDescription = [];
var Solicitationcode_1st = [];


var BindDepartmentCode = "";
var BindAgencyCode = "";
var BindAgencyDesc = "";
var BindOfficeCode = "";
var BindOfficeDesc = "";
var MasterID = "";

var BindAwAgencyCode = "";
var BindAwSubAgencyCode = "";
var BindAwSubAgencyDesc = "";
var BindAwOfficeCode = "";
var BindAwOfficeDesc = "";

var CG = ""; // from Contract Detail screen > vendor search 


let MarketContext_DepartmentBind = [];
let MarketContext_NaicsCode = [];
let MarketContext_AwardingAgencyBind = [];
var MC_AutoBindData = 0;

var searchParameters = {};
var corporate_url = "";

function copyToClipboard() {
    
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
        $("#SolicitationDDL").val(paramData.FullSearch.solicitation_name);
    }
    set_Helpicon();
    $('.startYear_1').val(paramData ? paramData.FullSearch.FY : DefaultStartDate);
    $('.EndYear_1').val(paramData ? paramData.FullSearch.FY_End : DefaultEndDate);
    
    $('.startYear_2').val(paramData ? paramData.FullSearch.FY : DefaultStartDate);
    $('.EndYear_2').val(paramData ? paramData.FullSearch.FY_End : DefaultEndDate);
    $(".loadbtn").hide();
    $('.OpenDeptPopup').disableAutoFill();
    $(".MinContractSize_2").val(paramData ? paramData.FullSearch.base_and_all_options_value:'0');
    $(".MinContractSize_1").val(paramData ? paramData.FullSearch.base_and_all_options_value : '0');
    Type = 'Type1';
    GetSocioEconomic();
    GetUserInfo();
    getDept();
    getSolicitationProcedure();
    RedirectedFun();
    // ========================== string query params =========================//

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function RedirectedFun() {

        dept = getParameterByName("Dept");
        var Naics = getParameterByName("Naics");
        BindDepartmentCode = getParameterByName("DeptCode");
        Businesssize = getParameterByName("Businesssize");
        Agency = getParameterByName("Agency");
        var FYStart = getParameterByName("FYStart");
        var FYEnd = getParameterByName("FYEnd");
        var MinimumContractSize = getParameterByName("MinimumContractSize");
        AgencyCode = getParameterByName("AgencyCode");
        var vendorname = getParameterByName("vendorname");
        CG = getParameterByName("CG");
        solicitation = getParameterByName("SProc");
        solicitationCode = getParameterByName("SProcCode");
        BindOfficeDesc = getParameterByName("OffcDesc");
        awagency = getParameterByName("AwAgency");
        BindAwSubAgencyDesc = getParameterByName("AwSubAgency");
        BindAwSubAgencyCode = getParameterByName("AwSubAgencyCode");
        BindAwOfficeDesc = getParameterByName("AwOffice");
        BindAwOfficeCode = getParameterByName("AwOfficeCode");
        BindAgencyCode = getParameterByName("AgencyCode");
        BindOfficeCode = getParameterByName("FOfficeCode");
        Type = getParameterByName("Type");
        if (Type == "") {
            Type = "Type1";
        }
        len = Naics.length;
        // #################################3 Advanced search #################################//
        if (dept != "") {

            $(".TypeTwo").trigger("click");
            $('#DepartmentDDL').val(dept);
            $('#AgencyDDL').val(Agency);
            $('#FundingOfficeDDL').val(BindOfficeDesc);
            $('.startYear_2').val(FYStart);
            $('.EndYear_2').val(FYEnd);
            //var MinimumContractSize = $(".MinContractSize_2").text(MinimumContractSize);
            //$(".MinContractSize_2 > [value=" + MinimumContractSize + "]").attr("selected", "true");

            $('.OpenAwAgencyPopup').val(awagency);
            $('#AwSubAgencyDDL').val(BindAwSubAgencyDesc);
            $('#AwOfficeDDL').val(BindAwSubAgencyDesc);

            if (solicitation !== "" && solicitation !== undefined) {
                $('#SolicitationDDL').val(solicitationCode);
                $('#txtsolicitation_2').val(solicitation);
                $('#lblsolicitation_2').text(solicitationCode);
            }

            $(".MinContractSize_2").val(MinimumContractSize);
            if (len == 6) {
                $('#txtnaicscode_1').val(Naics);
                $('#txtnaicscode_2').val(Naics);
                NAICS_mode = "NaicsCode";
                GetNaics(Naics);

            }
            else {
                GetNaicsFamily(Naics);
                NAICS_mode = "NaicsFamCode";
                NaicsType = "Code";
                $('#txtnaicsfamcode_1').val(Naics);
                $('#txtnaicsfamcode_2').val(Naics);
                //$('.btn-toggle_Naics').trigger('click');
            }

            if (Businesssize == null || Businesssize == '') {
                Businesssize = "ALL";
            }

            $(':radio[value="' + Businesssize + '"]').prop('checked', true);
            //if (Businesssize == "SB") {
            //    $('.clsSocioeconomic').show();
            //    var SB_VAlues = getParameterByName("SBValues");
            //    var SBspl = SB_VAlues.split(',');
            //    $(SBspl).each(function (index, element) {
            //        console.log(SBspl);
            //        $('.clsSocioeconomic input:checkbox[value="' + SBspl[index] + '"]').prop('checked', true);

            //    });
            //    $('.clsSocioeconomic input:checked').each(function () {
            //        var text = $(this).attr('id');
            //        var html = '<label class="lbl_S001" calss="selectcheck" title="' + text + '">' + text + '</label>';
            //        $('.multiSel').append(html);
            //    });

            //}
            if (Businesssize == "SB") {
                //$('.clsSocioeconomic').show();
                $('.OpenMinContSize').prop('disabled', false);
                var SB_VAlues = getParameterByName("SBValues");
                var SBspl = SB_VAlues.split(',');
                $(SBspl).each(function (index, element) {
                    $('.clsSocioeconomic input:checkbox[value="' + SBspl[index] + '"]').prop('checked', true);

                });
                $('.clsSocioeconomic input:checked').each(function () {
                    var text = $(this).attr('id');
                    var html = '<label class="lbl_S001" calss="selectcheck" title="' + text + '">' + text + '</label>';
                    $('.multiSel').append(html);
                });

            }
            setTimeout(function () {
                $("#btnSearch").trigger("click");
            }, 1000);
        }
        else {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetDepartmentCode",
                data: "{'dept': '" + dept + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        var code = result[0].id;
                        $(".TypeTwo").trigger("click");

                        $('#DepartmentDDL').val(dept);
                        $('.txtdept').val(dept);
                        $('#AgencyDDL').val(Agency);
                        $('.txtagency').val(Agency);
                        $('#lbldept_2').text(BindDepartmentCode);
                        $('#lblagency_2').text(AgencyCode);
                        $('#FundingOfficeDDL').val(BindOfficeDesc);
                        $('.txtoffice').val(BindOfficeDesc);
                        $('#lbloffice_2').text(BindOfficeCode);

                        var FYStart = $('.startYear_2').val(FYStart);
                        var FYEnd = $('.EndYear_2').val(FYEnd);
                        var MinimumContractSize = $(".MinContractSize_2").val(MinimumContractSize);
                        if (len == 6) {
                            $('#txtnaicscode_1').val(Naics);
                            GetNaics(Naics);
                        }
                        else {
                            GetNaicsFamily(Naics);
                        }
                        $('.radiocheck').prop('checked', true);
                        Businesssize = Businesssize;
                        setTimeout(function () {
                            $("#btnSearch").trigger("click");
                        }, 1000);

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

        if (dept != "") {
            $('#DepartmentDDL').val(dept);
            $('#AgencyDDL').val(Agency);
            $('#txtdept_2').val(dept);
            $('#txtagency_2').val(Agency);
            $('#lbldept_2').text(BindDepartmentCode);
            $('#lblagency_2').text(AgencyCode);
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
        // #################################3 Advanced search #################################//

        // ################################# simple search ################################# //
        if (vendorname != "") {
            $("#SearchName").val(vendorname);
            $('#SearchName').trigger('focus');
            $("#SearchCage").val(CG);

            if (FYStart != "" && FYEnd != "") {
                $('.startYear_1').val(FYStart);
                $('.EndYear_1').val(FYEnd);
            }
            if (MinimumContractSize != "") {
                $(".MinContractSize_1").val(MinimumContractSize);
            }
            //var MinimumContractSize1 = '500000';
            //var MinimumContractSize = $(".MinContractSize_1").text(MinimumContractSize1);

            Type = 'Type1';

            SearchAutocomplete(vendorname, CG);


        }
        // ################################# simple search ################################# //


        // ############################### AUTOFILL SEARCH DATA ############################## //

        if (dept == "" && vendorname == "") {


            GetMasterData();

        }

        // ############################### AUTOFILL SEARCH DATA ############################## //

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
                debugger;
                const myParam = urlParams.get('data');
                let paramData;
                if (myParam) {
                    paramData = JSON.parse(myParam);
                }
                if (result.length > 0) {
                    MC_AutoBindData = 1;

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

                         
                            MarketContext_NaicsCode.push({
                                Description: result[i].Description,
                                Code:result[i].Code
                            });
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

                            var DeptDesc = paramData ? paramData.FullSearch.department_name:Description[0];
                            var AgencyDesc = paramData ? paramData.FullSearch.agency_name :Description[1];
                            var OfficeDesc = paramData ? paramData.FullSearch.office_name :Description[2];

                            var DeptCode = paramData ? paramData.FullSearch.department_code:Code[0];
                            var AgencyCode = paramData ? paramData.FullSearch.agency_code :Code[1];
                            var OfficeCode = paramData ? paramData.FullSearch.funding_office_code : Code[2];

                            MarketContext_DepartmentBind.push({ DeptDesc: DeptDesc, DeptCode: DeptCode, AgencyDesc: AgencyDesc, AgencyCode: AgencyCode, OfficeDesc: OfficeDesc, OfficeCode: OfficeCode });
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

                            MarketContext_AwardingAgencyBind.push({ AAgencyDesc: AAgencyDesc, AAgencyCode: AAgencyCode, ASubAgencyDesc: ASubAgencyDesc, ASubAgencyCode: ASubAgencyCode, AOfficeDesc: AOfficeDesc, AOfficeCode: AOfficeCode });
                        }
                    }

                    if (paramData&& paramData.FullSearch.NAICS) {
                        MarketContext_NaicsCode = [];
                        paramData.FullSearch.NAICS.split(',').forEach((item, index) => {

                            MarketContext_NaicsCode.push({
                                Description: paramData.FullSearch.naics_name.split(',')[index],
                                Code: item
                            })
                        });
                        
                    }
                    $(".TypeTwo").trigger("click");


                }


            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }

    // ========================== string query params =========================//






    function SearchAutocomplete(vendorname, CG) {
        if (CG.length !== 5) {
            CG = window.atob(CG);
        }
        var nameval = vendorname + '+' + CG;
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetData",
            data: "{'value': '" + nameval + "','Mode':'Name'}",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.length > 0) {

                    var recipient_uei = result[0].recipient_uei;
                 
                    var CAGECODE = result[0].CAGECODE;
                    $("#SearchDuns").prop('disabled', true);
                    $("#SearchDuns").val(recipient_uei);

                    $("#SearchCage").prop('disabled', true);
                    $('#SearchCage').val(CAGECODE);


                    $('#btnSearch').trigger('click');
                }
                else {

                    swal("", "Vendor Name not found", "info");
                    //swal("", "DUNS Value cannot be Empty !");

                }

            },
            error: function ajaxError(err) {
                swal("", err);



            }
        });

    }
    var table = $('#searchreportData').DataTable();

    table
        .clear()
        .draw();
    $('#searchreportData').parents('div.dataTables_wrapper').first().hide();
    $('[data-toggle="tooltip"]').tooltip({

        'placement': 'left'

    });
    $('[data-toggle="popover"]').popover({
        'placement': 'bottom'
    });

    $('#popoverOption').popover({ trigger: "hover" });




    $(document).on('click', '#LEGAL_BUSINESS_NAME', function () {
        var vendorname = jQuery(this).text();
        if (corporate_url !== "" && corporate_url !== null) {
            window.open(corporate_url, '_blank');
        }
        else {
            window.open(window.location.origin + '/VendorSearch/Index?vendorname=' + vendorname + '&CG=' + cage, '_blank');
        }
    });
    //========================================= Go to contractor Details =============================//
    $('#searchreportData tbody').on('click', 'tr', function () {
        document.title = "FedPipeline - Vendor Detail";
        $(".Apploader").show();
        
        $('.cont').show();
        $('html, body').animate({ scrollTop: '0px' }, 0);

        DepartmentCode = [];
        AgencyCode = [];

        var UEI_Value = $(this).find("#GetDuns").html();
        $('#lbldunsurl').text(UEI_Value);

        // ============== Naics Code =================//
        if (NAICS_mode == "NaicsFamCode") {

            $(".NaicsFamCode").each(function () {
                var naicsfam = $(this).val();
                NaicsCode.push(naicsfam);
            });
        }
        else if (NAICS_mode == "NaicsCode") {
            $(".NaicsCode ").each(function () {
                var naicscode = $(this).val();
                NaicsCode.push(naicscode);
            });
        }

        NaicsCode = NaicsCode.filter(item => item);
        NaicsCode = NaicsCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        // ============== Naics Code =================//


        // ====================== Department ========================== //
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
        }
        // ====================== Department ========================== //

        // ====================== Agency ====================== //
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
        }
        // ====================== Agency ====================== //

        // ====================== Funding Office ====================== //
        $(".lbloffice").each(function () {
            var fundingoffice = $(this).text();

            if (fundingoffice !== "") {
                OfficeCode.push(fundingoffice);
                //console.log(fundingoffice);
                //console.log(OfficeCode)
            }

        });
        if (OfficeCode.length > 0) {
            OfficeCode = OfficeCode.filter(item => item);
            OfficeCode = OfficeCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            //console.log(OfficeCode);
            var office_group_code = OfficeCode.join();
            //console.log(agency_group_code);
            OfficeCode = office_group_code;
        }
        // ====================== Funding Office ====================== //

        // ====================== Awarding Agency ========================== //
        $(".lblawagency").each(function () {
            var aagency = $(this).text();
            if (aagency !== "") {
                AwardingAgencyCode.push(aagency);
                //console.log(aagency);
            }
            //console.log(AwardingAgencyCode)
        });
        if (AwardingAgencyCode.length > 0) {
            AwardingAgencyCode = AwardingAgencyCode.filter(item => item);
            AwardingAgencyCode = AwardingAgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            var awarding_agency_group_code = AwardingAgencyCode.join();
            //console.log(department_group_code);
            AwardingAgencyCode = awarding_agency_group_code;
        }
        // ====================== Awarding Agency ========================== //

        // ====================== Awarding Sub Agency ====================== //
        $(".lblawsubagency").each(function () {
            var subagency = $(this).text();

            if (subagency != "") {
                AwSubAgencyCode.push(subagency);
                //console.log(subagency);
                //console.log(AgencyCode)
            }

        });
        if (AwSubAgencyCode.length > 0) {
            AwSubAgencyCode = AwSubAgencyCode.filter(item => item);
            AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            //console.log(AgencyCode);
            var awarding_sub_agency_group_code = AwSubAgencyCode.join();
            //console.log(awarding_sub_agency_group_code);
            AwSubAgencyCode = awarding_sub_agency_group_code;
        }
        // ====================== Awarding Sub Agency ====================== //

        // ====================== Awarding Office ====================== //
        $(".lblawoffice").each(function () {
            var awardingoffice = $(this).text();

            if (awardingoffice !== "") {
                AwOfficeCode.push(awardingoffice);
                //console.log(fundingoffice);
                //console.log(OfficeCode)
            }

        });
        if (AwOfficeCode.length > 0) {
            AwOfficeCode = AwOfficeCode.filter(item => item);
            AwOfficeCode = AwOfficeCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            //console.log(OfficeCode);
            var awarding_office_group_code = AwOfficeCode.join();
            //console.log(agency_group_code);
            AwOfficeCode = awarding_office_group_code;
        }
        // ====================== Awarding Office ====================== //               

        let ContractData = {}

        var NAICS = NaicsCode.join();
        var naics_family = "";
        if ($('#txtnaicsfamcode_1').val() != "") {
            naics_family = '1';
        }
        else if ($('#txtnaicscode_1').val() != "") {
            naics_family = '0';
        }

        var business_size = Businesssize;
        var recipient_uei = UEI_Value;
        var department_code = DepartmentCode;
        var agency_code = AgencyCode;
        var funding_office_code = OfficeCode;
        var awarding_agency_code = AwardingAgencyCode;
        var awarding_sub_agency_code = AwSubAgencyCode;
        var awarding_office_code = AwOfficeCode;
        var solicitation_code = SolicitationCode;

        //=======================clsSocioeconomic==========================//
        $('.clsSocioeconomic input:checked').each(function () {
            getval.push(this.value);
        });
        //=======================clsSocioeconomic==========================//


        // ======================= SB Types ==========================//
        var business_type_code_list = "";
        if (getval != null) {
            business_type_code_list = getval.join();
        }
        // ======================= SB Types ==========================//


        // ======================== Simple search =========================== //
        if (Type == 'Type1') {

            var startYear = $('.startYear_1').val();
            var EndYear = $('.EndYear_1').val();
            if (userinfo == "False") { var FY = DefaultStartDate; var FY_End = DefaultEndDate; }
            else { var FY = startYear; var FY_End = EndYear; }

            var base_and_all_options_value = $(".MinContractSize_1").val();
        }
        // ======================== Simple search =========================== //
        // ======================== Advanced search =========================== //
        else if (Type == 'Type2') {

            var startYear = $('.startYear_2').val();
            var EndYear = $('.EndYear_2').val();
            if (userinfo == "False") { var FY = DefaultStartDate; var FY_End = DefaultEndDate; }
            else { var FY = startYear; var FY_End = EndYear; }

            var base_and_all_options_value = $(".MinContractSize_2").val();
        }
        // ======================== Advanced search =========================== //


        //if ($('#AgencyDDL').val() == "") {
        //    agency_code = "";
        //}
        //if ($('#DepartmentDDL').val() == "") {
        //    department_code = "";
        //}

        ContractData.NAICS = NAICS,
            ContractData.naics_family = naics_family,
            ContractData.business_type_code_list = business_type_code_list,
            ContractData.business_size = business_size,
            ContractData.uei = recipient_uei,
            ContractData.department_code = department_code,
            ContractData.agency_code = agency_code,
            ContractData.funding_office_code = funding_office_code,
            ContractData.awarding_agency_code = awarding_agency_code,
            ContractData.awarding_sub_agency_code = awarding_sub_agency_code,
            ContractData.awarding_office_code = awarding_office_code,
            ContractData.FY = FY,
            ContractData.FY_End = FY_End,
            ContractData.base_and_all_options_value = base_and_all_options_value
        ContractData.solicitation_procedures_code = solicitation_code
        if (UEI_Value != "") {
            CallDUNS(ContractData);
        }
        else {
            swal("", "DUNS Value cannot be Empty !");

        }

    });


    function CallDUNS(ContractData) {

    var data = "{ContractorDetails:" + JSON.stringify(ContractData) + "}";
    var url = "/Search/GetContractorDetails";

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: url,
            data: data,
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.Error == "") {
                   
                    if (result.EntityByDUNS.length > 0) {
                        corporate_url = result.EntityByDUNS[0].corporate_url;

                        $('#LEGAL_BUSINESS_NAME').text(result.EntityByDUNS[0].LEGAL_BUSINESS_NAME);
                        $('#DUNS').text(result.EntityByDUNS[0].uei);
                        $('#CAGE_CODE').text(result.EntityByDUNS[0].CAGE_CODE);

                        $('#contact_first_name_1').text(result.EntityByDUNS[0].contact_first_name_1);
                        $('#contact_last_name_1').text(result.EntityByDUNS[0].contact_last_name_1);
                        $('#contact_phone_1').text(result.EntityByDUNS[0].contact_phone_1);

                        $('#contact_email_1').text(result.EntityByDUNS[0].contact_email_1);

                        $('#contact_first_name_2').text(result.EntityByDUNS[0].contact_first_name_2);
                        $('#contact_last_name_2').text(result.EntityByDUNS[0].contact_last_name_2);
                        $('#contact_phone_2').text(result.EntityByDUNS[0].contact_phone_2);
                        $('#contact_email_2').text(result.EntityByDUNS[0].contact_email_2);

                        $('#contact_first_name_3').text(result.EntityByDUNS[0].contact_first_name_3);
                        $('#contact_last_name_3').text(result.EntityByDUNS[0].contact_last_name_3);
                        $('#contact_phone_3').text(result.EntityByDUNS[0].contact_phone_3);
                        $('#contact_email_3').text(result.EntityByDUNS[0].contact_email_3);

                        $('#contact_first_name_4').text(result.EntityByDUNS[0].contact_first_name_4);
                        $('#contact_last_name_4').text(result.EntityByDUNS[0].contact_last_name_4);
                        $('#contact_phone_4').text(result.EntityByDUNS[0].contact_phone_4);
                        $('#contact_email_4').text(result.EntityByDUNS[0].contact_email_4);

                        //$('#address_line1').text(result.EntityByDUNS[0].address_line1);
                        $('#address_line1').text([result.EntityByDUNS[0].address_line1, result.EntityByDUNS[0].address_line2].filter(Boolean).join(", "));
                        $('#city').text([result.EntityByDUNS[0].city, result.EntityByDUNS[0].state, result.EntityByDUNS[0].zip_code, result.EntityByDUNS[0].zip_code_4].filter(Boolean).join(", "));
                        //$('#address_line2').text(result.EntityByDUNS[0].address_line2);
                        //$('#city').text(result.EntityByDUNS[0].city);
                        //$('#zip_code').text(result.EntityByDUNS[0].zip_code);
                        //$('#zip_code_4').text(result.EntityByDUNS[0].zip_code_4);
                        //$('#state').text(result.EntityByDUNS[0].state);
                        $('.lblphoneno').text(function (i, text) {
                            return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                        });

                        if (result.GetContractorData.length > 0) {

                            var filldata = "";
                            $('#ContractorGrid_tbl').dataTable().fnDestroy();


                            for (var i = 0; i < result.GetContractorData.length; i++) {

                                var department_name = result.GetContractorData[i].department_name;
                                var agency_name = result.GetContractorData[i].agency_name;
                                var department_code = result.GetContractorData[i].department_code;
                                var agency_code = result.GetContractorData[i].agency_code;
                                var contract_type = result.GetContractorData[i].contract_type;
                                var Contract_number = result.GetContractorData[i].Contract_number;
                                var FY_awarded = result.GetContractorData[i].FY_awarded;
                                var NAICSvalue = result.GetContractorData[i].NAICS;
                                var PSC = result.GetContractorData[i].PSC;
                                //var Link = result.GetContractorData[i].Link;
                                var Referenced_idv_id = result.GetContractorData[i].Referenced_idv_id;
                                var transaction_id = result.GetContractorData[i].transaction_id;
                                var award_id = result.GetContractorData[i].award_id;

                                
                                var type_of_contract_pricing = result.GetContractorData[i].type_of_contract_pricing;

                                var NAICS_opportunity = result.GetContractorData[i].NAICS_opportunity;
                                var PSC_opportunity = result.GetContractorData[i].PSC_opportunity;
                                var PSC_NAICS_opportunity = result.GetContractorData[i].PSC_NAICS_opportunity;

                                var total_contract_values = parseFloat(result.GetContractorData[i].total_contract_values).toFixed(2);
                                //var total_contract_values = result.GetContractorData[i].total_contract_values;
                                //page = page.concat(spanishTerms[i] + '<br>');   
                                //var solicitation_code = result.GetSimpleSearchData[i].solicitation_code;
                                //var solicitation_name = result.GetSimpleSearchData[i].solicitation_name;
                                //var funding_office_code = result.GetSimpleSearchData[i].funding_office_code;
                                //var funding_office_name = result.GetSimpleSearchData[i].funding_office_name;
                                //var awarding_agency_code = result.GetSimpleSearchData[i].awarding_agency_code;
                                //var awarding_agency_name = result.GetSimpleSearchData[i].awarding_agency_name;
                                //var awarding_sub_agency_code = result.GetSimpleSearchData[i].awarding_sub_agency_code;
                                //var awarding_sub_agency_name = result.GetSimpleSearchData[i].awarding_sub_agency_name;
                                //var awarding_office_code = result.GetSimpleSearchData[i].awarding_office_code;
                                //var awarding_office_name = result.GetSimpleSearchData[i].awarding_office_name;

                                total_contract_values = CommaFormatted(total_contract_values);

                                //filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td>' + department_name + '</td><td>' + agency_name + '</td><td>' + contract_type + '</td><td class="GoContact" id=' + Contract_number + '>' + Contract_number + '</td><td class="GoReference" id=' + Referenced_idv_id + '>' + Referenced_idv_id + '</td><td>' + FY_awarded + '</td><td>' + NAICSvalue + '</td><td>' + PSC + '</td><td class="money">' + total_contract_values + '</td></tr>');
                                //filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td class="GoDeptSearch" id="' + DepartmentCode + '">' + department_name + '</td><td class="' + agency_name + '">' + agency_name + '</td><td>' + contract_type + '</td><td class="GoContact" id=' + Contract_number + '>' + Contract_number + '</td><td class="GoReference" id=' + Referenced_idv_id + '>' + Referenced_idv_id + '</td><td>' + FY_awarded + '</td><td id=' + NAICSvalue + '>' + NAICSvalue + '</td><td>' + PSC + '</td><td class="money">' + total_contract_values + '</td></tr>');
                              filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td class="GoContact" referenced_idv_id="' + Referenced_idv_id+'" transaction_id="' + transaction_id + '" award_id=' + award_id + ' id=' + Contract_number + '>' + Contract_number + '</td><td class="GoReference" id=' + Referenced_idv_id + '>' + Referenced_idv_id + '</td><td class="" id=' + DepartmentCode + '>' + department_name + '</td><td class="GoAgencySearch" id=' + AgencyCode + '>' + agency_name + '</td><td>' + contract_type + '</td><td>' + type_of_contract_pricing + '</td><td>' + FY_awarded + '</td><td class="" id=' + NAICSvalue + '>' + NAICSvalue + '</td><td  class="GoVendor_OppNaics" id=' + NAICS_opportunity + '>' + NAICS_opportunity + '</td><td class="">' + PSC + '</td><td  class="GoVendor_OppPSC" id=' + PSC_opportunity + '>' + PSC_opportunity + '</td><td class="money Com_003">' + total_contract_values + '</td></tr>');
                             //   filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td class="GoContact" id=' + Contract_number + '>' + Contract_number + '</td><td class="GoReference" id=' + Referenced_idv_id + '>' + Referenced_idv_id + '</td><td class="" id=' + DepartmentCode + '>' + department_name + '</td><td class="GoAgencySearch" id=' + AgencyCode + '>' + agency_name + '</td><td>' + contract_type + '</td><td>' + type_of_contract_pricing + '</td><td>' + FY_awarded + '</td><td class="" id=' + NAICSvalue + '>' + NAICSvalue + '</td><td  class="GoVendor_OppNaics" id=' + NAICS_opportunity + '>' + NAICS_opportunity + '</td><td class="">' + PSC + '</td><td  class="GoVendor_OppPSC" id=' + PSC_opportunity + '>' + PSC_opportunity + '</td><td class="money Com_003">' + total_contract_values + '</td></tr>');
                            }

                            //$('.money').mask("#,##0.00", { reverse: true });
                            $('#ContractorGrid_tbody').html(filldata);
                            $('#ContractorGrid_tbl').DataTable({

                                dom: 'lBfrtip' +
                                    "<'row'<'col-sm-12'tr>>" +
                                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",

                                buttons: [{
                                    extend: 'excel',
                                    title: null
                                }],
                                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                columnDefs: [
                                    { className: 'text-center', targets: [0, 5, 6, 7] },
                                    { className: 'text-right', targets: [8] }

                                ],
                                language: {
                                    search: "Search within Grid",
                                    //searchPlaceholder: "Search within Grid"
                                }



                            });
                            $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-cyan text-white mr-1');

                            $('#ContractorGrid_tbl').closest('#ContractorGrid_tbody').css('max-height', '500px');
                            $('#ContractorGrid_tbl').DataTable().draw();
                        }
                        else {
                            var table = $('#ContractorGrid_tbl').DataTable();

                            table
                                .clear()
                                .draw();
                            $('#ContractorGrid_tbl').parents('div.dataTables_wrapper').first().hide();
                        }


                        if (SocioArr.length > 0) {

                            var FillSocio = "";


                            var len = (SocioArr[0].length / 2);

                            if (result.getsocio.length > 0) {

                                for (var i = 0; i < result.getsocio.length; i++) {

                                    var abbreviation = result.getsocio[i].abbreviation;
                                    var business_type_code = result.getsocio[i].business_type_code;
                                    $("#" + business_type_code).prop('checked', true);

                                    FillSocio = FillSocio + "<div class='sociocont'><span class='s017'>" + abbreviation + "</span></div>";
                                }
                            }
                            else {
                                FillSocio = FillSocio + "<div class='sociocont' style='width:100%'><h6 style='color: #bbbbbb;text-align:center;font-size: 12px;'>There are no Socio-Economic Designation(s) for this vendor !</h6></div>";
                            }

                            $('#LoadSocio').html(FillSocio);
                        }

                        if (result.S_Business.length > 0) {

                            var S_B = "";

                            for (var i = 0; i < result.S_Business.length; i++) {


                                var NAICS_SB = result.S_Business[i].NAICS;
                                var size_standard_dollars = result.S_Business[i].size_standard_dollars;
                                var size_standard_employees = result.S_Business[i].size_standard_employees;
                                var prefix = result.S_Business[i].prefix;
                                var suffix = result.S_Business[i].suffix;
                                var SBI = result.S_Business[i].SBI;

                                if (suffix == " employees") {
                                    S_B = S_B.concat('<div class="row"><div class="col-md-4"><label style="font-size:12px;font-weight:300;">' + NAICS_SB + '</label></div ><div class="col-md-6"><label  style="font-size:12px;font-weight:300;">' + size_standard_employees + '' + suffix + '</label></div><div class="col-md-2" style="text-align: center;"><label  style="font-size:12px;font-weight:300;">' + SBI + '</label></div></div>');
                                }
                                else if (suffix == " million") {
                                    S_B = S_B.concat('<div class="row"><div class="col-md-4"><label style="font-size:12px;font-weight:300;">' + NAICS_SB + '</label></div ><div class="col-md-6"><label  style="font-size:12px;font-weight:300;">' + prefix + '' + size_standard_dollars + '' + suffix + '</label></div><div class="col-md-2" style="text-align: center;"><label  style="font-size:12px;font-weight:300;">' + SBI + '</label></div></div>');
                                }
                            }
                            $('#LoadsmallBusiness').html(S_B);
                        }

                    }
                    $('#ShowSearch').hide();
                  
                    $('#ShowcontractDetail').show();
                    $(".Apploader").hide();
                    result = "";
                }
                else {
                    $(".Apploader").hide();
                    swal("", result.Error);
                }
            },
            error: function ajaxError(err) {
                $(".Apploader").hide();
                swal("", err);


            }
             
        });
      
}
        
 
    //========================================= Go to contractor Details =============================//



    //=============================== Remove NaicsCode New fieds ==========================================//
    //$(document).on("click", ".remove-textboxfam", function (e) {
    //    e.preventDefault();
    //    var getId = (this.id);

    //    var splitid = getId.split('_');
    //    var id = parseInt(splitid[1]);


    //    var removeItem = $('#txtnaicsfamcode_' + id).val();
    //    NaicsCode = jQuery.grep(NaicsCode, function (value) {
    //        return value != removeItem;
    //    });

    //    $('#txtnaicsfamcode_' + id).val("");
    //    $('#txtnaicsfamdesc_' + id).val("");
    //    $(this).parents(".naicsFam").remove();
    //    //cntFam--;

    //});
    //=============================== Remove NaicsCode New fieds ==========================================//

    //=============================== search autocomplete Validation ==========================================//
    $(document).on('focus', '#SearchName', function () {
      
        $("#SearchName").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#SearchName").autocomplete({
            source: function (request, response) {
                var SearchName = request.term;
                if (SearchName.length > 4) {
                    

                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "/Search/Search_Name",
                        data: "{SearchName: '" + SearchName + "'}",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (result != '') {
                                response(result);
                            }

                        },
                        error: function ajaxError(err) {
                            swal("", err);


                        }
                    });
                }
            }, select: function (event, ui) {
                
                var txtval = ui.item.label;//gets the select value from autocomplete
                var getSN = txtval.split('(');
                var getName = getSN[0].split(' -');
                var getCagecode = getSN[1].split(')')
                //var latlong = getSearchName[1].substring(getSearchName[1].indexOf('(') + 1, getSearchName[1].indexOf(')'));
                var nameval = getName[0] + '+' + getCagecode[0];

                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: "/Search/GetData",
                    data: "{'value': '" + nameval + "','Mode':'Name'}",
                    dataType: "json",
                    async: false,
                    success: function (result) {

                        var DUNS = result[0].uei;
                        var CAGECODE = result[0].CAGECODE;

                        $("#SearchDuns").prop('disabled', true);
                        $("#SearchDuns").val(DUNS);

                        $("#SearchCage").prop('disabled', true);
                        $('#SearchCage').val(CAGECODE);


                    },
                    error: function ajaxError(err) {
                        swal("", err);



                    }
                });
            }
        });

    });
    //=============================== search autocomplete Validation ==========================================//

    //=============================== Duns Validation ==========================================//
    $(document).on('keyup', '#SearchDuns', function () {
        //$("#target").keypress(function (event) {
        var SearchDuns = $('#SearchDuns').val();
        if (SearchDuns.length == '12') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetData",
                data: "{'value': '" + SearchDuns + "','Mode':'DUNS'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.length > 0) {
                        $('#SearchCage').val(result[0].CAGECODE);
                        $('#SearchName').val(result[0].LEGAL_BUSINESS_NAME);
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
            $('#AlertMsg').text('*** The UEI should be minimum of 12 ! ***');
        }
    });
    //=============================== Duns Validation ==========================================//

    //=============================== Cage Validation ==========================================//
    $(document).on('keyup', '#SearchCage', function () {

        var SearchCage = $('#SearchCage').val();
        if (SearchCage.length == '5') {
            $('#AlertMsg').text('');



            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/Search/GetData",
                data: "{'value': '" + SearchCage + "','Mode':'CAGE'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        $('#SearchDuns').val(result[0].uei);
                        $('#SearchName').val(result[0].LEGAL_BUSINESS_NAME);
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
            $('#AlertMsg').text('*** The Cage Code should be minimum of 5 Digits ! ***');
        }
    });
    //=============================== Cage Validation ==========================================//

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
                        if (spl.length > 0) {
                            $('#txtnaicsfamdesc_' + spl[1]).val(result[0]);
                        }
                        else {
                            $('#txtnaicsfamdesc_1').val(result[0]);
                        }
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
            $('.AlertMsgNaics').text('');
        }
        else {
            $('.AlertMsgNaics').text('*** The NAICS Family Code should be exactly 4 Digits ! ***');
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
            $('.AlertMsgNaics').text('');
        }
        else {
            $('.AlertMsgNaics').text('*** The NAICS Code should be exactly 6 Digits ! ***');
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
            getval.push(id);
            get_TExt.push(gettext);
            $(".hida").hide();

        } else {
            $('label[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            getval.splice(index, 1);
            getval.splice(index, 1);
            get_TExt.splice(ind, 1);
        }
    });

    //$('.radiocheck').click(function () {
    //    Businesssize = $('input[name="businessize"]:checked').val();
    //    if (Businesssize == "SB") {
    //        $('.clsSocioeconomic').show();
    //    }
    //    else {
    //        $(".Socioec").prop('checked', false);

    //        $('.Socioec').parent().parent().parent().css("background-color", "");
    //        $("#Res_totalSocio").css("display", "none");
    //        $('#lblRes_Socio').text("");
    //        $('.OpenMinContSize').val("");

    //        //$('.clsSocioeconomic').hide();
    //    }
    //});
    $('.radiocheck').click(function () {
        Businesssize = $('input[name="businessize"]:checked').val();
        if (Businesssize === "SB") {
            //$('.clsSocioeconomic').show();
            $('.OpenMinContSize').prop('disabled', false);
        }
        else {
            OKSocio = [];
            $(".Socioec").prop('checked', false);
            $('.OpenMinContSize').val('');
            $('.OpenMinContSize').prop('disabled', true);
            $("#Res_totalSocio").css("display", "none");
            $('#lblRes_Socio').text("");

            //$('.clsSocioeconomic').hide();
        }
    });
    //=============================== Business Size ==========================================//

    //=============================== Clear Function ==========================================//
    $('#btnClear').click(function () {
        clear();
    });


    //=============================== Clear Function ==========================================//

    ////=============================== Load Department  ==========================================//
    //$(document).on('focus', '#DepartmentDDL', function () {

    //    $("#DepartmentDDL").addClass('ui-autocomplete-loading');

    //    //Complaints Auto Complete
    //    $("#DepartmentDDL").autocomplete({
    //        source: DeptCombo[0],
    //        select: function (event, ui) {

    //            $("#DepartmentDDL").val(ui.item.value);
    //            var AgenCode = ui.item.id;//gets the select value from autocomplete
    //            getAgency(getAgency);
    //        }
    //    });



    //});
    ////=============================== Load Department  ==========================================//


    //=============================== Load Funding Agency  ==========================================//
    $(document).on('focus', '#AgencyDDL', function () {

        $("#AgencyDDL").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $("#AgencyDDL").autocomplete({
            minLength: 0,
            source: Agencycombo[0],
            select: function (event, ui) {

                $("#AgencyDDL").val(ui.item.value);
                AgencyCode = ui.item.id;//gets the select value from autocomplete

            }
        });

    });
    //=============================== Load Funding Sub Agency  ==========================================//

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

    $('#btnrowclear').click(function () {

        $("#SearchName").val("");
        $("#SearchDuns").val("");
        $("#SearchCage").val("");
        $('#SearchName').prop("disabled", false);
        $('#SearchDuns').prop("disabled", false);
        $('#SearchCage').prop("disabled", false);

    });

    $(document).on('click', '#btnnaicsfamrowclear_1', function () {
        $('.add-textboxfammodal').trigger('click');
    });

    $(document).on('click', '#btnnaicsfourrowclear_1', function () {
        $('.add-textboxcodemodal').trigger('click');
    });

    $('#btndeprowclear').click(function () {
        $("#DepartmentDDL").val("");
        $("#AgencyDDL").val("");
        $("#FundingOfficeDDL").val("");
    });

    $('#btnAgencyclear').click(function () {
        //$("#AgencyDDL").val("");
    });
  
    if (myParam) {
       
        $('#btnSearch').trigger('click', { data:paramData });
    }
});

//$(document).on('click', '.btn-toggle', function () {

//    $(this).find('.btn').toggleClass('active');

//    if ($(this).find('.Type1').length > 0) {
//        $(this).find('.btn').toggleClass('Type1');
//    }
//    if ($(this).find('.Type2').length > 0) {
//        $(this).find('.btn').toggleClass('Type2');
//    }

//    $(this).find('.btn').toggleClass('btn-default');

//});

$(document).on('click', '.TypeOne', function () {

    $(this).removeClass("Com_005");
    $(this).addClass("Com_006");
    $('.TypeTwo').removeClass("Com_006");
    $('.TypeTwo').addClass("Com_005");

    Type = 'Type1'; //To consolidate the search [FY, AwardAmont]
    $('#Simplesearch').show();
    $('#AdvancedSearch').hide();
    clear();
    $('.lbldept').text('');
    $('.txtdept').val('');
    $('.txtagency').val('');
    $('.lblagency').text('');
    $('.lbloffice').text('');
    $('.txtoffice').val('');
    $('.lblawagency').text('');
    $('.txtawagency').val('');
    $('.lblawsubagency').text('');
    $('.txtawsubagency').val('');
    $('.lblawoffice').text('');
    $('.txtawoffice').val('');
    $(".MinContractSize_1").val('0');

});
$(document).on('click', '.TypeTwo', function () {

    cleartable();
    
    $("#SearchName").val('');
    $("#SearchCage").val('');
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
    $('.lbldept').text('');
    $('.txtdept').val('');
    $('.txtagency').val('');
    $('.lblagency').text('');
    $('.lbloffice').text('');
    $('.txtoffice').val('');
    $('.lblawagency').text('');
    $('.txtawagency').val('');
    $('.lblawsubagency').text('');
    $('.txtawsubagency').val('');
    $('.lblawoffice').text('');
    $('.txtawoffice').val('');

    //$(".naicsincrFam1").css("display", "none");
    //$(".naicsincr1").css("display", "block");
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('data');
    let paramData;
    if (myParam) {
        paramData = JSON.parse(myParam);
    }
    $(".MinContractSize_2").val(paramData ? paramData.FullSearch.base_and_all_options_value : '0');
    Businesssize = "ALL";
    $(':radio[value="ALL"]').prop('checked', true);
    $(".SIMSearchResults").hide();
    $(".SearchFields").show();
    $(".IDshowfields").hide();
    // ################## Bind MarketContext Data ################## //

    if (MC_AutoBindData == 1) {


        // ====================== Dept/Agecny =================== //

        // ====================== NaicsCode =================== //

        if (MarketContext_NaicsCode[0].Code.length == 4) {


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
            NaicsType = "Code";
            //$('.btn-toggle_Naics').trigger('click');

            $('#txtnaicscode_1').val(MarketContext_NaicsCode[0].Code);
            $('#txtnaicsdesc_1').val(MarketContext_NaicsCode[0].Description);

            $('#txtnaicscode_2').val(MarketContext_NaicsCode[0].Code);
            $('#txtnaicsdesc_2').val(MarketContext_NaicsCode[0].Description);

            for (var i = 1; i < MarketContext_NaicsCode.length; i++) {
                var Count = 0;
                addnaicscode();
                Count = (cntFam + 1);

                $('#txtnaicscode_' + Count).val(MarketContext_NaicsCode[i].Code);
                $('#txtnaicsdesc_' + Count).val(MarketContext_NaicsCode[i].Description);
            }

            CloseNaicsPopup();
        }
        // ====================== Dept/Agecny =================== //
        $('#txtdept_2').val(MarketContext_DepartmentBind[0].DeptDesc);
        $('#DepartmentDDL').val(MarketContext_DepartmentBind[0].DeptDesc);

        $('#lbldept_2').text(MarketContext_DepartmentBind[0].DeptCode);

        $('#txtagency_2').val(MarketContext_DepartmentBind[0].AgencyDesc);
        $('#AgencyDDL').val(MarketContext_DepartmentBind[0].AgencyDesc);


        $('#lblagency_2').text(MarketContext_DepartmentBind[0].AgencyCode);

        $('#txtoffice_2').val(MarketContext_DepartmentBind[0].OfficeDesc);
        $('#FundingOfficeDDL').val(MarketContext_DepartmentBind[0].OfficeDesc);


        $('#lbloffice_2').text(MarketContext_DepartmentBind[0].OfficeCode);

        for (var i = 1; i < MarketContext_DepartmentBind.length; i++) {
            adddepartment();
            addagency();
            addoffice();

            var DeptCount = cntdept++;
            var AgencyCount = cntagency++;
            var OfficeCount = cntoffice++;

            $('#txtdept_' + DeptCount).val(MarketContext_DepartmentBind[i].DeptDesc);
            $('#lbldept_' + DeptCount).text(MarketContext_DepartmentBind[i].DeptCode);

            $('#txtagency_' + AgencyCount).val(MarketContext_DepartmentBind[i].AgencyDesc);
            $('#lblagency_' + AgencyCount).text(MarketContext_DepartmentBind[i].AgencyCode);

            $('#txtoffice_' + OfficeCount).val(MarketContext_DepartmentBind[i].OfficeDesc);
            $('#lbloffice_' + OfficeCount).text(MarketContext_DepartmentBind[i].OfficeCode);
        }

        CloseDeptAgencyPopup();
        // ====================== Dept/Agecny =================== //

        // ====================== Awarding Agecny/ Sub Agency =================== //
        if (MarketContext_AwardingAgencyBind.length > 0) {
            $('#txtawagency_2').val(MarketContext_AwardingAgencyBind[0].AAgencyDesc);
            $('#AwAgencyDDL').val(MarketContext_AwardingAgencyBind[0].AAgencyDesc);

            $('#lblawagency_2').text(MarketContext_AwardingAgencyBind[0].AAgencyCode);

            $('#txtawsubagency_2').val(MarketContext_AwardingAgencyBind[0].ASubAgencyDesc);
            $('#AwSubAgencyDDL').val(MarketContext_AwardingAgencyBind[0].ASubAgencyDesc);


            $('#lblawsubagency_2').text(MarketContext_AwardingAgencyBind[0].ASubAgencyCode);

            $('#txtawoffice_2').val(MarketContext_AwardingAgencyBind[0].AOfficeDesc);
            $('#AwOfficeDDL').val(MarketContext_AwardingAgencyBind[0].AOfficeDesc);


            $('#lblawoffice_2').text(MarketContext_AwardingAgencyBind[0].AOfficeCode);
        }
        for (var i = 1; i < MarketContext_AwardingAgencyBind.length; i++) {
            //console.log(MarketContext_AwardingAgencyBind[i])
            addawagency();
            addawsubagency();
            addawoffice();

            var AAgencyCount = cntawagency++;
            var SubAgencyCount = cntawsubagency++;
            var AOfficeCount = cntawoffice++;

            $('#txtawagency_' + AAgencyCount).val(MarketContext_AwardingAgencyBind[i].AAgencyDesc);
            $('#lblawagency_' + AAgencyCount).text(MarketContext_AwardingAgencyBind[i].AAgencyCode);

            $('#txtawsubagency_' + SubAgencyCount).val(MarketContext_AwardingAgencyBind[i].ASubAgencyDesc);
            $('#lblawsubagency_' + SubAgencyCount).text(MarketContext_AwardingAgencyBind[i].ASubAgencyCode);

            $('#txtawoffice_' + AOfficeCount).val(MarketContext_AwardingAgencyBind[i].AOfficeDesc);
            $('#lblawoffice_' + AOfficeCount).text(MarketContext_AwardingAgencyBind[i].AOfficeCode);
        }

        CloseAwardingAgencyPopup();
        // ====================== Awarding Agency/Sub Agency =================== //

        Type = 'Type2';


        // ====================== NaicsCode =================== //
        //$(':radio[value="ALL"]').prop('checked', true);
       
    }
    // ################## Bind MarketContext Data ################## //

});


//=============================== All Over Search ==========================================//
$(document).on('click', '#btnSearch', function (event,copyClipBoard) {

    //$("#btnSearch").hide();
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
    DepartmentDescription = [];
    AgencyDescription = [];
    OfficeCode = [];
    OfficeDescription = [];
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

    // =======Naics Code ==========//
    if (NAICS_mode === "NaicsFamCode") {

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

        $(".NaicsCode").each(function () {
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
    // =======Naics Code ==========//


    // =========== Department =============//
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
    // =========== Department =============//


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
        //console.log("DepartmentDescription", DepartmentDescription);
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
    var UEI = $('#SearchDuns').val();
    var Cages = $('#SearchCage').val();
    var department_code = DepartmentCode;
    var agency_code = AgencyCode;
    var solicitation_code = SolicitationCode;
    var funding_office_code = OfficeCode;
    var awarding_agency_code = AwardingAgencyCode;
    var awarding_sub_agency_code = AwSubAgencyCode;
    var awarding_office_code = AwOfficeCode;


    //=======================clsSocioeconomic==========================//
    $('.clsSocioeconomic input:checked').each(function () {
        getval.push(this.value);
        get_TExt.push($(this).attr('id'))
    });
    var business_type_code_list = "";
    if (getval != null) {
        business_type_code_list = getval.join();
        show_get_TExt = get_TExt.join();
    }
    //=======================clsSocioeconomic==========================//


    //======================= Simple search //=======================
    if (Type == 'Type1') {

        var startYear = $('.startYear_1').val();
        var EndYear = $('.EndYear_1').val();
        if (userinfo == "False") { var FY = DefaultStartDate; var FY_End = DefaultEndDate; }
        else { var FY = startYear; var FY_End = EndYear; }

        business_size = "ALL"
        var base_and_all_options_value = $(".MinContractSize_1").val();
        // alert(base_and_all_options_value);

    }
    //======================= Simple search //=======================//


    //======================= Advanced search //=======================//

    else if (Type == 'Type2') {
        var startYear = $('.startYear_2').val();
        var EndYear = $('.EndYear_2').val();

        if (userinfo == "False") { var FY = DefaultStartDate; var FY_End = DefaultEndDate; }
        else { var FY = startYear; var FY_End = EndYear; }


        var base_and_all_options_value = $(".MinContractSize_2").val();
    }
    //======================= Advanced search //=======================//



    if ($('#AgencyDDL').val() == "") {
        agency_code = "";
    }

    if ($('#DepartmentDDL').val() == "") {
        department_code = "";
    }

    if ($('#FundingOfficeDDL').val() == "") {
        funding_office_code = "";
    }

    if ($('#AwAgencyDDL').val() == "") {
        awarding_agency_code = "";
    }

    if ($('#AwSubAgencyDDL').val() == "") {
        awarding_sub_agency_code = "";
    }

    if ($('#AwOfficeDDL').val() == "") {
        awarding_office_code = "";
    }

    SearchData.NAICS = NAICS,

        SearchData.agency_code = agency_code,
        SearchData.naics_family = naics_family,
        SearchData.business_type_code_list = business_type_code_list,
        SearchData.business_size = business_size,
        SearchData.uei = UEI,
        SearchData.department_code = department_code,
        SearchData.FY = FY,
        SearchData.FY_End = FY_End,
        SearchData.solicitation_code = solicitation_code,
        SearchData.base_and_all_options_value = base_and_all_options_value,
        SearchData.funding_office_code = funding_office_code,
        SearchData.awarding_agency_code = awarding_agency_code,
        SearchData.awarding_sub_agency_code = awarding_sub_agency_code,
        SearchData.awarding_office_code = awarding_office_code

    if (business_type_code_list == "") {
        SearchData.business_type_code_list = "";
    }
    //console.log(JSON.stringify(SearchData));
    //console.log(SearchData);
    if (Type == "Type2" && MC_AutoBindData == 1) {
        SearchData.uei = '';
    }
    if ( SearchData.uei == "") {
        if ((SearchData.NAICS != "" || SearchData.naics_family != "") &&
            (SearchData.department_code.length != 0 && SearchData.agency_code.length != 0 && (DepartmentCodeWithoutFilter.length == AgencyCodeWithoutFilter.length))
            && (SearchData.awarding_agency_code.length != 0 && SearchData.awarding_sub_agency_code.length != 0 && (AwardingAgencyCodeWithoutFilter.length == AwardingSubAgencyCodeWithoutFilter.length))
            && SearchData.base_and_all_options_value != "" && SearchData.business_size) {
            setTimeout(function () {
                searchData(copyClipBoard);
            }, 50);
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
                                swal("", "Please choose a funding sub agency ", "warning");
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
            swal("", "Please fill in all required(*) fields");
            cleartable();
            $('.Apploader').hide();
        }
    }
    else {
        if (SearchData.uei != "" && SearchData.FY != "" && SearchData.base_and_all_options_value) {
            setTimeout(function () {
                searchData(copyClipBoard);
            }, 50);

        }
        else {
            swal("", "Please fill in all required(*) fields");
            cleartable();
            $('.Apploader').hide();

        }

    }

    function searchData(copyClipBoard) {
        var data = "{FullSearch:" + JSON.stringify(SearchData) + "}";
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
            SearchData.solicitation_name = $("#SolicitationDDL").val();
            const queryParams = JSON.stringify({ FullSearch: SearchData })
            var tempInput = document.createElement('input');
            tempInput.value = `${window.location.href}?data=${encodeURIComponent(queryParams)}`;
            document.body.appendChild(tempInput);
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); /* For mobile devices */
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            return;
        }
        if (typeof copyClipBoard != 'undefined' && copyClipBoard.data) {
            data = "{FullSearch:" + JSON.stringify(copyClipBoard.data.FullSearch) + "}";  

        }
       
        var excelData = {};
        excelData = SearchData;
        var url = "/Search/FullSearch";
        var result = AjaxPost(url, data);
        if (result.Error == "") {

            SearchData = {}
            if (result.GetInitialData.length > 0) {

                //========== Bind Search Result data ===========//
                bindsearchdata();
                //$('#SearchResults').show();
                $('.SearchFields').hide();
                // clear();
                NaicsCode = [];

                $('#searchreportData').show();

                var filldata = "";
                $('#searchreportData').dataTable().fnDestroy();


                for (var i = 0; i < result.GetInitialData.length; i++) {

                    var legal_business_name = result.GetInitialData[i].legal_business_name;
                    var CAGECODE = result.GetInitialData[i].CAGECODE;
                    let recipient_uei = result.GetInitialData[i].recipient_uei;
                    var total_awards = result.GetInitialData[i].total_awards;
                    var total_action_obligation = parseFloat(result.GetInitialData[i].total_action_obligation).toFixed(2);
                    var base_and_all_options_value = parseFloat(result.GetInitialData[i].base_and_all_options_value).toFixed(2);

                    var base_and_all_options_value_amount = CommaFormatted(base_and_all_options_value);
                    var total_action_obligation_amount = CommaFormatted(total_action_obligation);
                    //var department_code = result.GetInitialData[i].department_code;
                    //var department_name = result.GetInitialData[i].department_name;
                    //var agency_code = result.GetInitialData[i].agency_code;
                    //var agency_name = result.GetInitialData[i].agency_name;
                    //var solicitation_code = result.GetInitialData[i].solicitation_code;
                    //var solicitation_name = result.GetInitialData[i].solicitation_name;
                    //var funding_office_code = result.GetInitialData[i].funding_office_code;
                    //var funding_office_name = result.GetInitialData[i].funding_office_name;
                    //var awarding_agency_code = result.GetInitialData[i].awarding_agency_code;
                    //var awarding_agency_name = result.GetInitialData[i].awarding_agency_name;
                    //var awarding_sub_agency_code = result.GetInitialData[i].awarding_sub_agency_code;
                    //var awarding_sub_agency_name = result.GetInitialData[i].awarding_sub_agency_name;
                    //var awarding_office_code = result.GetInitialData[i].awarding_office_code;
                    //var awarding_office_name = result.GetInitialData[i].awarding_office_name;

                    filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + CAGECODE + '</td><td  style="width: 654px;">' + legal_business_name + '</td><td style="display:none" id="GetDuns">' + recipient_uei + '</td>'+
                        '<td> $' + total_action_obligation_amount + '</td>' +
                        '<td> $' + base_and_all_options_value_amount + '</td>' +
                        '<td>' + total_awards + '</td>'+
                    '</tr> ';
                    //filldata = filldata + '<tr>' +
                    //    '<td>' + (i + 1) + '</td>' +
                    //    '<td  style = "width: 654px;">' + legal_business_name + '</td> ' +
                    //    '<td>' + CAGECODE + '</td >' +
                    //    '<td style="display:none" id="GetDuns">' + recipient_duns + '</td>' +
                    //    '<td> ' + total_awards + '</td>' +
                    //    '<td class="GoDeptSearch" id="' + department_code + '">' + department_name + '</td>' +
                    //    '<td class="GoAgencySearch" id="' + agency_code + '">' + agency_name + '</td>' +
                    //    '<td class="GoDeptSearch" id="' + funding_office_code + '">' + funding_office_name + '</td>' +
                    //    '<td class="GoAgencySearch" id="' + awarding_agency_code + '">' + awarding_agency_name + '</td>' +
                    //    '<td class="GoDeptSearch" id="' + awarding_sub_agency_code + '">' + awarding_sub_agency_name + '</td>' +
                    //    '<td class="GoAgencySearch" id="' + awarding_office_code + '">' + awarding_office_name + '</td>' +
                    //    '<td class="GoSolicitationSearch" id="' + solicitation_code + '">' + solicitation_name + '</td>' +
                    //    '</tr>';       
                }
                $('#searchreportTable').html(filldata);
                $('#searchreportData').DataTable({
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
                });
                //
                $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-cyan text-white mr-1');

            }
            else {

                swal("", "Your search did not produce any results, please modify your search"); var table = $('#searchreportData').DataTable();

                cleartable();

            }
        }
        else if (result == "TimedOut") {
            $('.Apploader').hide();

            swal("", "Timed Out !", "error");

            window.location.href = origin;
        }
        else {
            $('.Apploader').hide();

            swal("", result.Error, "error");
            cleartable();
        }
        SearchData = {}
    }



    function bindsearchdata() {


        if ($('#SearchName').val() == "" && Type == "Type2") {
            // if advanced search //

            if ($('#txtnaicscode_1').val() == "") {

                var FamDesc = "";
                var FamCode = "";

                if ($('#txtnaicsfamdesc_1').val() != "") {
                    FamDesc = $('#txtnaicsfamdesc_1').val();
                    FamCode = $('#txtnaicsfamcode_1').val();

                }

                $('#HD_NaicsFamily').text(FamDesc + '   (' + FamCode + ')');
                $('#HD_NaicsFamily_CD').text($('#HD_NaicsFamily').text());
                if (NaicsCodeDescription.length > 1) {
                    $('#Res_totalNaicsFam').show();
                    $('#lblRes_NaicsFam').text(NaicsCodeDescription.length - 1);
                    $('#Res_totalNaicsFam_CD').show();
                    $('#lblRes_NaicsFam_CD').text(NaicsCodeDescription.length - 1);
                }

                //naics fam result 
                $('.HD_Naicscode').hide();
                $('.HD_Naicscode_CD').hide();
                $('.HD_NaicsFamily').show();
                $('.HD_NaicsFamily_CD').show();
            }
            else {

                var Desc = "";
                var Code = "";

                if ($('#txtnaicsdesc_1').val() != "") {
                    Desc = $('#txtnaicsdesc_1').val();
                    Code = $('#txtnaicscode_1').val();
                }

                $('#HD_Naicscode').text(Desc + '   (' + Code + ')');
                $('#HD_Naicscode_CD').text($('#HD_Naicscode').text());

                if (NaicsCodeDescription.length > 1) {
                    $('#Res_totalNaicsCode').show();
                    $('#lblRes_NaicsCode').text(NaicsCodeDescription.length - 1);
                    $('#Res_totalNaicsCode_CD').show();//vendorsearch > Contract details
                    $('#lblRes_NaicsCode_CD').text($('#lblRes_NaicsCode').text());//vendorsearch > Contract details

                }

                $('.HD_Naicscode').show();
                $('.HD_Naicscode_CD').show();//vendorsearch > Contract details
                $('.HD_NaicsFamily').hide();
                $('.HD_NaicsFamily_CD').hide();//vendorsearch > Contract details
            }

            if (DepartmentDescription.length > 1) {

                $('#Res_totalDept').show();
                $('#Res_totalDept_CD').show();//vendorsearch > Contract details

                $('#lblRes_Dept').text(DepartmentDescription.length - 1);
                $('#lblRes_Dept_CD').text($('#lblRes_Dept').text()); //vendorsearch > Contract details

            }
            else {
                $('#Res_totalDept').hide();
                $('#Res_totalDept_CD').hide();//vendorsearch > Contract details

                $('#lblRes_Dept').text("");
                $('#lblRes_Dept_CD').text($('#lblRes_Dept').text()); //vendorsearch > Contract details
            }

            if (AgencyDescription.length > 1) {
                $('#Res_totalAgency').show();
                $('#Res_totalAgency_CD').show(); //vendorsearch > Contract details

                $('#lblRes_Agency').text(AgencyDescription.length - 1);
                $('#lblRes_Agency_CD').text($('#lblRes_Agency').text());//vendorsearch > Contract details
            }
            else {
                $('#Res_totalAgency').hide();
                $('#Res_totalAgency_CD').hide(); //vendorsearch > Contract details

                $('#lblRes_Agency').text("");
                $('#lblRes_Agency_CD').text($('#lblRes_Agency').text());//vendorsearch > Contract details
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

            //Hide div //
            $('#AdvancedSearch').hide();
            $('.ADVSearchResults').slideDown("slow");



            $('#HD_Dept_CD').text($('#HD_Dept').text());
            $('#HD_Agency_CD').text($('#HD_Agency').text());
            $('#HD_Business_CD').text($('#HD_Business').text());
            $('#HD_FY_CD').text($('#HD_FY').text());
            $('#HD_MinContract_CD').text($("#HD_MinContract").text());
            $('#HD_Socio_CD').text(show_get_TExt);
            $('.AdvResults_CD').show(); //vendorsearch > Contract details
            $('.SimResults_CD').hide(); //vendorsearch > Contract details
            $('#IDshowResult').hide();
            $('#IDshowfields').show();
        }
        else {
            // if simple search //
            $('#HDS_vendorname').text($('#SearchName').val());
            $('#HDS_duns').text($('#SearchDuns').val());
            $('#HDS_cage').text($('#SearchCage').val());
            $('#HDS_fy').text($('.startYear_1').val() + '/' + $('.EndYear_1').val());
            $('#HDS_mincontract').text($(".MinContractSize_1").val());

            $('#HDS_vendorname_CD').text($('#HDS_vendorname').text());
            $('#HDS_duns_CD').text($('#HDS_duns').text());
            $('#HDS_cage_CD').text($('#HDS_cage').text());
            $('#HDS_fy_CD').text($('#HDS_fy').text());
            $('#HDS_mincontract_CD').text($("#HDS_mincontract").text());

            //Hide div //
            $('#Simplesearch').hide();
            $('#AdvancedSearch').hide();
            $('.SIMSearchResults').slideDown("slow");
            $('.SimResults_CD').show();  //Contract details page
            $('.AdvResults_CD').hide(); //Contract details page
            $('#IDshowResult').hide();
            $('#IDshowfields').show();
        }

       

    }


});
//=============================== All Over Search ==========================================//

$(document).on('click', '#btnOkExcel', function () {
    searchParameters.report_notes = $("#report_notes").val().length > 0 ? $("#report_notes").val() : 'NA';
    // searchParameters save to excel report table
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/SaveSearchParameters",
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
    var report_notes_section = '<div class="col-md-6 title2"><label>Questions/Comments/Notes: </label>' +
        '<div class="input-group mb-3">' +
        '<textarea cols="5" rows="5" class="DIS_002 form-control" id="report_notes" name="report_notes" />' +
        '<div class="input-group-append">' +
        '<span class="input-group-text s001">' +
        '</span>' +
        '</div></div></div>';
    if (Type === 'Type1') {
        if ($("#SearchName").val() !== "" && $("#SearchName").val() !== null) {
            searchParameters.vendor_name = $("#SearchName").val().length > 0 ? $("#SearchName").val() : 'NA';
            searchParameters.cage = $("#SearchCage").val().length > 0 ? $("#SearchCage").val() : 'NA';
            searchParameters.FY_start = $(".startYear_1").val();
            searchParameters.FY_end = $(".EndYear_1").val();
            searchParameters.minimum_contract_size = $(".MinContractSize_1").val();
            searchParameters.naics_family = false;
            searchParameters.naics_code_list = null;
            filldata = filldata + '<table width="100%" border="2px">' +
                '<tr>' +
                '<td><label>Vendor Name: </label></td><td><label>' + searchParameters.vendor_name + '</label></td>' +
                '<td><label>Cage: </label></td><td><label>' + searchParameters.cage + '</label ></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>StartYear - EndYear: </label></td><td><label>' + searchParameters.FY_start + '-' + searchParameters.FY_end + '</label></td>' +
                '<td><label>Minimum Contract Size: </label></td><td><label>' + searchParameters.minimum_contract_size + '</label ></td>' +
                '</tr>' +
                '</table>' + report_notes_section;
           
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
                //console.log(office);
                //console.log(OfficeDescription);
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
            searchParameters.minimum_contract_size = $(".MinContractSize_2").val();
            searchParameters.business_size = $('input[name=businessize]:checked').val();
            searchParameters.solicitation_procedure_code = $("#SolicitationDDL").val().length > 0 ? SolicitationCode : 'NA';
            searchParameters.funding_agency_code_list = $("#DepartmentDDL").val().length > 0 ? DepartmentCode : 'NA';
            searchParameters.funding_sub_agency_code_list = $("#AgencyDDL").val().length > 0 ? AgencyCode : 'NA';
            searchParameters.funding_office_list = $("#FundingOfficeDDL").val().length > 0 ? OfficeDescription : 'NA';
            searchParameters.awarding_agency_code_list = $("#AwAgencyDDL").val().length > 0 ? AwardingAgencyCode : 'NA';
            searchParameters.awarding_sub_agency_code_list = $("#AwSubAgencyDDL").val().length > 0 ? AwSubAgencyCode : 'NA';
            searchParameters.awarding_office_list = $("#AwOfficeDDL").val().length > 0 ? AwOfficeCode : 'NA';

            var display_socio_economic_list = "";
            var display_socio_economic_text = "";
            if (OKSocio.length > 0) {
                for (var i = 0; i < OKSocio.length; i++) {
                    if (OKSocio.length == 1) {
                        display_socio_economic_list = OKSocio[i].value;
                        display_socio_economic_text = OKSocio[i].text;
                    }
                    if (OKSocio.length > 1) {
                        if (i == OKSocio.length - 1) {
                            display_socio_economic_list += OKSocio[i].value;
                            display_socio_economic_text += OKSocio[i].text;
                        } else {
                            display_socio_economic_list += OKSocio[i].value + ',';
                            display_socio_economic_text += OKSocio[i].text + ',';
                        }
                    }
                }
            }
            searchParameters.socio_economic_list = display_socio_economic_list.length > 0 ? display_socio_economic_list : 'NA';

            var awAgencyDescription = AwAgencyDescription.length > 0 ? AwAgencyDescription : 'NA';
            var awSubAgencyDescription = AwSubAgencyDescription.length > 0 ? AwAgencyDescription : 'NA';
            var awOfficeDescription = AwOfficeDescription.length > 0 ? AwOfficeDescription : 'NA';

            var display_dynamic_popup = [];

            if (searchParameters.funding_office_list != "NA") {
                display_dynamic_popup.push('<td><label>Funding Office: </label></td><td><label>' + searchParameters.funding_office_list + '</label></td>');
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


            if (searchParameters.socio_economic_list != "NA") {
                display_dynamic_popup.push('<td><label>Socio-Economic Designation(s): </td><td><label> ' + display_socio_economic_text + '</label></td>');
            }
            if (searchParameters.solicitation_procedure_code != "NA") {
                display_dynamic_popup.push('<td><label>Solicitation Procedure: </td><td><label> ' + SolicitationDescription + '</label></td>');
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
                '<td><label>Funding Agency: </label></td><td><label>' + DepartmentDescription + '</label></td>' +
                '<td><label>Funding Sub Agency: </label></td><td><label>' + AgencyDescription + '</label></td>' +
                '</tr>' + 
                '<tr>' +
                '<td><label>FY Range (Start / End): </label></td><td><label>' + searchParameters.FY_start + '-' + searchParameters.FY_end + '</label></td>' +
                '<td><label>Minimum Contract Size: </td><td><label>' + searchParameters.minimum_contract_size + '</label></td>' +
                '<td><label>Business Size : </label></td><td><label>' + searchParameters.business_size + '</label></td>' +
                '</tr>' + displayTd +
                '</table>' + report_notes_section;
           

            $('#selectContractSearchData').html(filldata);
            $('#ContractSearchExcel').modal('show');
        }
        else {
            swal("", "please choose any search parameter", "warning");
        }
    }

}

//=============================== Show More on Result of Funding Agency/Awarding Agency/Solicitation //=============================== //
$(document).on('click', '#Res_totalDept', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
        //alert('');
    }, 200);
});

$(document).on('click', '#Res_totalAgency', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#myModal').modal('show');
        //alert('');
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

//===============================Show More on Result of Funding Agency/Awarding Agency/Solicitation //=============================== //

//===============================Show More on Result of NaicsCode/NaicsFam //=============================== //
$(document).on('click', '#Res_totalNaicsCode', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        //$('#NaicsCodeModal').modal('show');
        $("#lbltotalnaics").trigger('click');
        //alert('');
    }, 200);
});
$(document).on('click', '#Res_totalNaicsFam', function () {

    $('#IDshowfields').trigger('click');
    setTimeout(function () {
        $('#NaicsfamilyModal').modal('show');
        //alert('');
    }, 200);
});
//===============================Show More on Result of NaicsCode/NaicsFam //=============================== //

$(document).on('click', '#Res_totalNaicsCode_CD', function () {

    $('#sear').trigger('click');
    
    setTimeout(function () {
        $('#IDshowfields').trigger('click');
        setTimeout(function () {
           
            //$('#NaicsCodeModal').modal('show');
            $("#lbltotalnaics").trigger('click');
            //alert('');
        }, 200);
    }, 100);
});
$(document).on('click', '#Res_totalNaicsFam_CD', function () {
    $('#sear').trigger('click');
    setTimeout(function () {
        $('#IDshowfields').trigger('click');
        setTimeout(function () {
            $('#NaicsfamilyModal').modal('show');
            //alert('');
        }, 200);
    }, 100);
});

$(document).on('click', '#IDshowfields', function () {

    if ($('#SearchName').val() == "" && Type === "Type2") {
        // if advanced search //
        //Hide div //
        $('#AdvancedSearch').slideDown("slow");
        $(".ADVSearchResults").hide();
        $('.SearchFields').show();
    }
    else {
        // if simple search //
        //Hide div //
        $('#Simplesearch').slideDown("slow");
        $(".SIMSearchResults").hide();
        $('.SearchFields').show();
    }
    $('#IDshowResult').show();
    $('#IDshowfields').hide();


});


$(document).on('click', '#IDshowResult', function () {

    if ($('#SearchName').val() == "" && Type === "Type2") {
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
                //console.log(result[0])
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

function GetSocioEconomic() {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/Get_SocioEconomic",
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
                //    $("#SBusiness").append($("<li><input id=" + text + " class='Socioec' type='checkbox' value=" + value + " style='height:13px;cursor:pointer'><label class='lbl_S001'>  &nbsp;" + text + "</label></li>"));
                //}
                //$("#SBusiness").html("");
                ////$("#SBusiness").append($("<option value=''>~ Select ~</option>"));
                //for (i = 0; i < result.length; i++) {
                //    var text = result[i].abbreviation;
                //    var value = result[i].business_type_code;
                //    var descriprion = result[i].Business_type_description;
                //    $("#SBusiness").append($("<label class='with-square-checkbox'><input class='Socioec' type='checkbox' value=" + value + "><span class='s008'>" + text + "</span></label>"));
                //}




                $('#tbl_Socio').show();

                var filldata = "";
                $('#tbl_Socio').dataTable().fnDestroy();


                for (i = 0; i < result.length; i++) {
                    var text = result[i].abbreviation;
                    var value = result[i].business_type_code;
                    var descriprion = result[i].Business_type_description;

                    filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + descriprion + '</td><td>' + text + '</td><td><label class="container"><input id="' + descriprion + '" class="Socioec" type="checkbox" value="' + value + '"><span class="checkmark0"></span></label></td></tr>';
                }
                $('#tbody_Socio').html(filldata);
                $('#tbl_Socio').DataTable({
                    // scrollY: 300,
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
              
                if (typeof answerWidgetSocioCheck == 'function') {
                    answerWidgetSocioCheck();
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

function getAwardValue() {

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetAwardValue",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                // Defined for Name/Duns/Cage
                $(".MinContractSize_1").html("");
                $(".MinContractSize_1").append($("<option value='0'>0</option>"));
                // Defined for NaicsCode/NaicsCodeFam
                $(".MinContractSize_2").html("");
                $(".MinContractSize_2").append($("<option value='0'>0</option>"));

                //$(".MinContractSize").append($("<option value=''>~ Select ~</option>"));
                for (i = 0; i < result.length; i++) {
                    var text0 = result[i].award_value;
                    var value = result[i].award_value_id;
                    //value = parseFloat(text0).toFixed(2)
                    value = Math.trunc(value);
                    // Defined for Name/Duns/Cage
                    $(".MinContractSize_1").append($("<option value=" + value + ">" + text0 + "</option>"));
                    $(".MinContractSize_1 > [value=" + 1 + "]").attr("selected", "true");
                    // Defined for NaicsCode/NaicsCodeFam
                    $(".MinContractSize_2").append($("<option value=" + value + ">" + text0 + "</option>"));
                    $(".MinContractSize_2 > [value=" + 1 + "]").attr("selected", "true");
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

                    $(".startYear_1").val('2017');
                    $(".EndYear_1").val('2022');
                    $(".startYear_2").val('2017');
                    $(".EndYear_2").val('2022');
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
    //$('#searchreportData').dataTable().fnDestroy();
    var table = $('#searchreportData').DataTable();
    table
        .clear()
        .draw();
    $('#searchreportData').parents('div.dataTables_wrapper').first().hide();
    $('.OpenMinContSize').prop('disabled', true);
    //$('.clsSocioeconomic').hide();

    $('.ADVSearchResults').hide();
    $('.SIMSearchResults').hide();
    $('#IDshowResult').hide();
    $('#IDshowfields').hide();
    $('.SearchFields').show();

    OKSocio = [];
    $(".Socioec").prop('checked', false);
    $('.OpenMinContSize').val('');
    $('.OpenMinContSize').prop('disabled', true);
    $("#Res_totalSocio").css("display", "none");
    $('#lblRes_Socio').text("");

    AgencyCodeWithoutFilter = [];
    DepartmentCodeWithoutFilter = [];
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
    $('#Res_totalSocio').hide("");
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
    var table = $('#searchreportData').DataTable();

    table
        .clear()
        .draw();
    $('#searchreportData').parents('div.dataTables_wrapper').first().hide();

    //$('.clsSocioeconomic').hide();
}


$(document).on('click', '#sear', function () {
    document.title = "FedPipeline - Vendor Search";
    $('#ShowSearch').show();
    $('#ShowcontractDetail').hide();
    $('.cont').hide();

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

// =========redirect to new tab on contract number click ========//
$(document).on('click', '.GoContact', function () {
    var ContractNo = this.id;
    const transactionId = this.getAttribute('transaction_id')
    const parentAwardIdPiid = this.getAttribute('referenced_idv_id')
  //  const awardIdPiid = this.getAttribute('award_id')
    var CG = $('#CAGE_CODE').text();
    const encodedData = window.btoa(CG);
    var CTNO = window.btoa(ContractNo);
    var DU = window.btoa($('#lbldunsurl').text());
    var test = window.btoa(ContractNo);
    var contractPricing = $(this).parent().find("td:eq('12')").text();
    const CP = window.btoa(contractPricing);
    var DeptCode = $(this).parent().find("td:eq('18')").text();
    var AgencyCode = $(this).parent().find("td:eq('19')").text();
    //encodedIDV means IDV ID, CG or encodedData means, DU =Duns
    //window.open(window.location.origin + '/Contract/Index?CTNO=' + CTNO + '&PG=Vendor Search&CG=' + encodedData + '&CP=' + CP + '&DU=' + DU, '_blank');
    window.open(window.location.origin + `/ContractSearch/FpdsSearch?transaction_id=${transactionId}&award_id_piid=${ContractNo}&parent_award_id_piid=${parentAwardIdPiid}&CTNO=${test}&PG=Contract Search&CG=${encodedData}&CP=${CP}&DU=${DU}&DeptCode=${DeptCode}&AgencyCode=${AgencyCode}`, '_blank');
});

// =========redirect to new tab on IDV number click ========//
$(document).on('click', '.GoReference', function () {
    
    var IDV = this.id;
    var CG = $('#CAGE_CODE').text();
    const encodedData = window.btoa(CG);
    var encodedIDV = window.btoa(IDV);
    var DU = window.btoa($('#lbldunsurl').text());

    //encodedIDV means IDV ID, CG or encodedData means Cage Code, DU =Duns
   window.open(window.location.origin + '/Contract/Index?IDVNO=' + encodedIDV + '&PG=Vendor Search&CG=' + encodedData + '&DU=' + DU, '_blank');

});


// =========redirect to new tab on Department click ========//

$(document).on('click', '.GoDeptSearch', function () {
    var SBval = "";
    var Dept = $(this).parent().find("td:eq('3')").text();
    var DeptCode = "";
    if (Dept != "") {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetDepartmentCode",
            data: "{'dept': '" + Dept + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                DeptCode = result[0].id;
                // alert(DeptCode);
            }
        });
    }



    var Naics = $(this).parent().find("td:eq('8')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "SB") {
        SBval = getval.join();
    }

    var Agency = "";
    //var test = window.btoa(Dept);
    if (Type == 'Type1') {
        var FYStart = $('.startYear_1').val();
        var FYEnd = $('.EndYear_1').val();
        var MinimumContractSize = $(".MinContractSize_1").val();
    }
    else if (Type == 'Type2') {
        var FYStart = $('.startYear_2').val();
        var FYEnd = $('.EndYear_2').val();
        var MinimumContractSize = $(".MinContractSize_2").val();
    }

    // var test1 = window.btoa(Naics);
    window.open(window.location.origin + '/VendorSearch/Index?Dept=' + Dept + '&DeptCode=' + DeptCode + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval, '_blank');

});


// =========redirect to new tab on Agency click ========//

$(document).on('click', '.GoAgencySearch', function () {
    var SBval = "";
    var AgencyCode = this.id;
    var DeptCode = DepartmentCode;
    var Dept = $(this).parent().find("td:eq('3')").text();
    var Naics = $(this).parent().find("td:eq('8')").text();
    var Businesssize = $('input[name=businessize]:checked').val();
    if (Businesssize == "" || Businesssize == undefined) {
        Businesssize = "ALL";
    }
    if (Businesssize == "SB") {
        SBval = getval.join();
    }
    var Agency = $(this).parent().find("td:eq('4')").text();
    if (Type == 'Type1') {
        var FYStart = $('.startYear_1').val();
        var FYEnd = $('.EndYear_1').val();
        var MinimumContractSize = $(".MinContractSize_1").val();
    }
    else if (Type == 'Type2') {
        var FYStart = $('.startYear_2').val();
        var FYEnd = $('.EndYear_2').val();
        var MinimumContractSize = $(".MinContractSize_2").val();
    }
    if (Dept != "") {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetDepartmentCode",
            data: "{'dept': '" + Dept + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                DeptCode = result[0].id;
                // alert(DeptCode);
            }
        });
    }
    if (AgencyCode == "") {

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetAgencyCode",
            data: "{'Agency': '" + Agency + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                AgencyCode = result[0].id;
            }
        });


    }

    //var test1 = window.btoa(Naics);
    window.open(window.location.origin + '/VendorSearch/Index?&AgencyCode=' + AgencyCode + '&Agency=' + Agency + '&Dept=' + Dept + '&DeptCode=' + DeptCode + '&Naics=' + Naics + '&Businesssize=' + Businesssize + '&FYStart=' + FYStart + '&FYEnd=' + FYEnd + '&MinimumContractSize=' + MinimumContractSize + '&SBValues=' + SBval, '_blank');

});

// =========redirect to new tab on NAICS Opp# ========//
$(document).on('click', '.GoVendor_OppNaics', function () {

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);

    var PDS = getDate(today);
    var PDE = getDate(new Date());

    var Naics = $(this).parent().find("td:eq('8')").text();

    window.open(window.location.origin + '/OpportunitySearch/Index?PDS=' + PDS + '&PDE=' + PDE + '&Naics=' + Naics + "&Mode=Vendor_Opp", '_blank');
});
// =========redirect to new tab on NAICS Opp# ========//

// =========redirect to new tab on PCS Opp# ========//
$(document).on('click', '.GoVendor_OppPSC', function () {

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);

    var PDS = getDate(today);
    var PDE = getDate(new Date());

    var PSC = $(this).parent().find("td:eq('10')").text();

    window.open(window.location.origin + '/OpportunitySearch/Index?PDS=' + PDS + '&PDE=' + PDE + '&PSC=' + PSC + "&Mode=Vendor_Opp", '_blank');
});
// =========redirect to new tab on PCS Opp# ========//


function getDate(Date) {
    var month = Date.getMonth() + 1;
    if (month.toString().length < 2) {
        month = '0' + month;
    }
    var date = Date.getDate();
    if (date.toString().length < 2) {
        date = '0' + date;
    }
    var year = Date.getFullYear();
    return month + '/' + date + '/' + year;
}


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
    //clearNaicsPopup();
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

//$('#btnagencyrowclear').click(function () {
//    $("#txtagency_1").val("");
//});

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

// ========= naics toggle ========//

$(document).on('click', '.btn-toggle_Naics', function () {

    if (NaicsType == "Code") {
        NaicsType = "Family";

        $(".naicsincr1").css("display", "none");
        $(".naicsincr1 input")[0].style.display = "none"
        $(".naicsincrFam1").css("display", "block");
        $(".naicsincrFam1 input")[0].style.display = "block"
        $('.dis_able1').val("");
        $(".remove-textboxfam").trigger("click");
        $(".remove-textboxnaicsfour").trigger("click");
    }
    else if (NaicsType == "Family") {
        NaicsType = "Code";

        $(".naicsincrFam1").css("display", "none");
        $(".naicsincrFam1 input")[0].style.display = "none"
        $(".naicsincr1").css("display", "block");
        $(".naicsincr1 input")[0].style.display = "block"
        $('.dis_able0').val("");
        $(".remove-textboxfam").trigger("click");
        $(".remove-textboxnaicsfour").trigger("click");
    }
     
   
    $('#lbltotalnaics').text("");

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
                    
                   // $('#txtnaicsfamdesc_' + spl[1]).val(result[0]);
                 
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





//=============================== Remove NaicsFamily New fieds ==========================================//
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
    $(".naicsFam_" + id).remove();
   
});
//=============================== Remove NaicsFamily New fieds ==========================================//

//=============================== modal popup Naics Family close start ==========================================//
$(document).on("click", "#lbltotalnaicsfamily", function (e) {
    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();

    $('#NaicsfamilyModal').modal('show');

});
//=============================== modal popup Naics Family close end ==========================================//

//=============================== modal popup Naics Code close start ==========================================//
$(document).on("click", "#lbltotalnaics", function (e) {

    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();

    $('#NaicsCodeModal').modal('show');

});
//=============================== modal popup Naics Code close end ==========================================//

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

//=============================== Add new Funding Agency  ==========================================//
$(document).on("click", ".add-textboxdept", function (e) {
    var dept = $("#txtdept_2").val();

    if (dept != "") {
        e.preventDefault();

        adddepartment();
        addagency();
        addoffice();
    }
    else {
        swal("", "Please enter at least one Funding Agency !", "info");
    }

});

//=============================== Add new Awarding Agency field  ==========================================//
$(document).on("click", ".add-textboxawagency", function (e) {
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

function adddepartment() {

    var maxdept = 6;

    if (cntdept < maxdept) {
        cntdept++;

        var filldata = '<div class="dept_' + cntdept + ' row col-md-12 DeptMainrows" id="DeptRow_' + cntdept + '">' +

            '<div class="col-md-11 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btndeptrowclear" id="btndeptrowclear_' + cntdept + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtdept_' + cntdept + '" class="DIS_002 form-control  txtdept dis_able1" name="textbox" /><label id="lbldept_' + cntdept + '" style="display:none;" class="lbldept"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 DEPT" data-toggle="tooltip" ></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremovedept_' + cntdept + '" class="s022 btn btn-sm dis_able1 B_s004 remove-textboxdept" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".deptincr").append(filldata);
    }
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

function addawagency() {

    var maxawagency = 6;

    if (cntawagency < maxawagency) {
        cntawagency++;
        // alert(cntdept);
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


//===============================  Add Department New fieds ==========================================//

//=============================== modal popup Departement, Funding Office and agency close starts ===============================//
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
        //console.log(DeptDesc);
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
    //console.log("AgencyCode", AgencyCode);
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
    //console.log("DepartmentCode", DepartmentCode);
    //============= Count Departmrnt =========//
    // Bind Data to Search fields //
    $('#DepartmentDDL').val($('#txtdept_2').val());
    $('#AgencyDDL').val($('#txtagency_2').val());
    $('#FundingOfficeDDL').val($('#txtoffice_2').val());
    //$("#AgencyDDL").prop('disabled', true);
    //$("#FundingOfficeDDL").prop('disabled', true);

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


    //if (AgencyCode.length > 0) {
    //    if (AgencyCode.length == DepartmentCode.length) {

    //    }
    //    else {
    //        swal("", "Please fix the following <br/>1.  Choose an agency on all rows <br/>OR<br/>  2.  Leave all agencies choices empty.", "info");
    //        return false;
    //    }
    //}

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
            //console.log(Departmentcode_R)
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
        //console.log(DeptDesc);
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

                $(".awagency_" + spl[1]).remove();
                $(".awsubagency_" + spl[1]).remove();
                $(".awoffice_" + spl[1]).remove();

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
    //console.log("AgencyCode", AgencyCode);
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
    //console.log("AgencyCode", AgencyCode);
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
    //console.log("DepartmentCode", DepartmentCode);
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

//================= naice code popup close function =================//


//$(document).on('click', '#btnmdnaicscodeclose', function () {

//    clearNaicsPopup();
//});

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
}
//================= naice code popup close function =================//



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
//=============================== Remove Agency New fieds ==========================================//

$(document).on('click', '#btnkeywordrowclear', function () {

    $("#txtkeyword").val("");
});

//=======================================  Naics code Popup 27022021 ==========================================//

$(document).on('click', '#txtnaicscode_1', function () {

    $('.add-textboxcodemodal').trigger('click');

});

$(document).on("click", ".add-textboxcodemodal", function (e) {
   
    $('#NaicsCodeModal').modal('show');
    NaicsCode_R = [];
    NaicsCode_R = NaicsCode.slice();
    if (NaicsCode_R.length > 1) {
        cnt = NaicsCode_R.length + 1;
    }
    else {
        cnt = 2;
    }

    setTimeout(function () {
        $("#txtnaicscode_2").focus();
    }, 1000);
});

$(document).on("click", ".add-textboxcode", function () {

    var Naics = $("#txtnaicscode_2").val();

    if (Naics != "") {
        addnaicscode();
    }
    else {
        swal("", "Please enter at least one Naics code field !", "info");
    }

});


//========================================== Naics Family Popup 2702021 ===========================================//


$(document).on('click', '#txtnaicsfamcode_1', function () {
    $('.add-textboxfammodal').trigger('click');
});

$(document).on("click", ".add-textboxfammodal", function (e) {

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

$(document).on("click", ".add-textboxfam", function (e) {

    var Naics = $("#txtnaicsfamcode_2").val();

    if (Naics != "") {
        e.preventDefault();
        addnaicsfamily();
        //NaicsCode = [];
        //NaicsCode.push(Naics);
    }
    else {
        swal("", "Please enter at least one Naics family field !");
    }

});

$(document).on("click", "#btnmdnaicsfamilyclose", function (e) {

    CloseNaicsFamilyPopup();
    $('#NaicsfamilyModal').modal('toggle');
});


function CloseNaicsFamilyPopup() {
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
        //console.log(NaicsCode);
    });



    $('#txtnaicsfamcode_1').val($('#txtnaicsfamcode_2').val());
    $('#txtnaicsfamdesc_1').val($('#txtnaicsfamdesc_2').val());
}

//=============================== Add NaicsFamily New fieds ==========================================//
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
            '<input style="font-size: 13px;" type="text" id="txtnaicsfamcode_' + cntFam + '" class="DIS_002 form-control NaicsFamCode dis_able0" name="textbox" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NFC" data-toggle="tooltip" ></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-9">' +
            '<div class="row">' +
            '<div class="col-md-11">' +
            '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtnaicsfamdesc_' + cntFam + '" class="form-control lblnaicsFamdesc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NFD" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button id= "btnremovenaicssix_' + cntFam + '"  type="button" class="s022 btn   btn-sm remove-textboxfam B_s004" data-toggle="tooltip" title="Click here to delete rows)">' +
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
//=============================== Add NaicsFamily New fieds ==========================================//

//=============================== Add NaicsCode New fieds ==========================================//
function addnaicscode() {
   
    if (cnt < max) {
        cnt++;
        //console.log("addnaicscode()", cnt);

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
            '<input disabled type="text" id="txtnaicsdesc_' + cnt + '" class="form-control lblnaicsdesc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NCD" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            ' </div>' +

            '<div class="col-md-1">' +
            '<button type="button" id="btnremovenaicsfour_' + cnt + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxnaicsfour" data-toggle="tooltip" title="Click here to remove rows">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".naicsincr").append(filldata);
    }
}
//=============================== Add NaicsCode New fieds ==========================================//
//=============================== Remove NaicsCode New fieds ==========================================//
$(document).on("click", ".remove-textboxnaicsfour", function () {
    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);

    //var removeItem = $('#txtnaicscode_' + id).val();
    //NaicsCode = jQuery.grep(NaicsCode, function (value) {
    //    return value != removeItem;
    //});
    cnt = cnt - 1;
    $('#txtnaicscode_' + id).val("");
    $('#txtnaicsdesc_' + id).val("");
    //$(this).parents(".naics").remove();

    $('.naics_' + id).remove();
    //cnt--;
});
//=============================== Remove NaicsCode New fieds ==========================================//


$(document).on('click', '.usp', function () {
    let recipient_value = $('#lbldunsurl').text();
    window.open('https://beta.sam.gov/entity/' + recipient_value, '_blank');

});


//===================== Dept / Agency / Funding Office [cancel] ===================//

$(document).on('click', '#btnmdcancel', function () {
    AgencyCodewithoutFilter = [];
    DepartmentCodewithoutFilter = [];
    //console.log('Departmentcode_R==', Departmentcode_R);
    //console.log('AgencyCode_R==', AgencyCode_R);
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
           // $('#txtdept_' + spl[1]).val("");
           // $('#lbldept_' + spl[1]).text("");
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
            //console.log("no", $('#lbldept_' + spl[1]).text())
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
            //console.log("yes", dept);
        }
        else {
            //console.log("No", dept);
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
            //console.log("yes-Agency", Agency);
        }
        else {
            //console.log("No-Agency", Agency);
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
            //console.log("yes-Agency", Agency);
        }
        else {
            //console.log("No-Agency", Agency);
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

                    //console.log("======Agencyresult======", Agencyresult);

                    // to add a new text box for ****** AGENCY ******
                    var A_getcount = cntagency;
                    $('#txtagency_' + A_getcount).val(Agencyresult[0].value);// to add a value in text box
                    $('#lblagency_' + A_getcount).text(AgencyCode_R[i]);// to add a value in text box

                    //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
                }

                addoffice();
                if (OfficeCode_R.length > 0) {
                    getFundingOffice(AgencyCode_R[i]);

                    var Officeresult = OfficeCombo[0].filter(obj => {
                        return obj.id === OfficeCode_R[i];
                    });

                    //console.log("======Agencyresult======", Agencyresult);

                    // to add a new text box for ****** OFFICE ******
                    var O_getcount = cntoffice;
                    $('#txtagency_' + O_getcount).val(Officeresult[0].value);// to add a value in text box
                    $('#lblagency_' + O_getcount).text(OfficeCode_R[i]);// to add a value in text box

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

                //console.log("======Agencyresult======", Agencyresult);

                // to add a new text box for ****** AGENCY ******
                var A_getcount = cntagency;
                $('#txtagency_' + A_getcount).val(Agencyresult[0].value);// to add a value in text box
                $('#lblagency_' + A_getcount).text(AgencyCode_R[i]);// to add a value in text box

                //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
            }

            addoffice();
            if (OfficeCode_R.length > 0) {
                getFundingOffice(AgencyCode_R[i]);

                var Officeresult = OfficeCombo[0].filter(obj => {
                    return obj.id === OfficeCode_R[i];
                });

                //console.log("======Agencyresult======", Agencyresult);

                // to add a new text box for ****** OFFICE ******
                var O_getcount = cntoffice;
                $('#txtagency_' + O_getcount).val(Officeresult[0].value);// to add a value in text box
                $('#lblagency_' + O_getcount).text(OfficeCode_R[i]);// to add a value in text box

                //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
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
           // $('#lblawagency_' + spl[1]).text("");
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
            //console.log($("yes", '#lbldept_' + spl[1]).text())
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
            //console.log("no", $('#lbldept_' + spl[1]).text())
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
            //console.log("yes", dept);
        }
        else {
            //console.log("No", dept);
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
            //console.log("No-Agency", Agency);
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
            //console.log("No-Agency", Agency);
        }

    });

    $(AwardingAgencycode_R).each(function (i) { // To add again the removed "ok" values

        var result = AwAgencyCombo[0].filter(obj => {
            return obj.id === AwardingAgencycode_R[i];
        });
        //console.log("getDeptdesc", Departmentcode_R[i], "DepartmentAgencycode_1st==", DepartmentAgencycode_1st);

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

                    //console.log("======Agencyresult======", Agencyresult);

                    // to add a new text box for ******SUB AGENCY ******
                    var A_getcount = cntawsubagency;
                    $('#txtawagency_' + A_getcount).val(SubAgencyresult[0].value);// to add a value in text box
                    $('#lblawagency_' + A_getcount).text(AwSubAgencyCode_R[i]);// to add a value in text box

                    //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
                }

                addawoffice();
                if (AwOfficeCode_R.length > 0) {
                    getAwardingOffice(AwOfficeCode_R[i]);

                    var AwOfficeresult = AwOfficeCombo[0].filter(obj => {
                        return obj.id === AwOfficeCode_R[i];
                    });

                    //console.log("======Agencyresult======", Agencyresult);

                    // to add a new text box for ****** OFFICE ******
                    var O_getcount = cntawoffice;
                    $('#txtawoffice_' + O_getcount).val(AwOfficeresult[0].value);// to add a value in text box
                    $('#lblawoffice_' + O_getcount).text(AwOfficeCode_R[i]);// to add a value in text box

                    //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
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

                //console.log("======Agencyresult======", Agencyresult);

                // to add a new text box for ****** AGENCY ******
                var A_getcount = cntawsubagency;
                $('#txtawsubagency_' + A_getcount).val(AwSubAgencyresult[0].value);// to add a value in text box
                $('#lblawsubagency_' + A_getcount).text(AwSubAgencyCode_R[i]);// to add a value in text box

                //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
            }

            addawoffice();
            if (AwOfficeCode_R.length > 0) {
                getAwardingOffice(AwSubAgencyCode_R[i]);

                var AwOfficeresult = AwOfficeCombo[0].filter(obj => {
                    return obj.id === AwOfficeCombo[i];
                });

                //console.log("======Agencyresult======", Agencyresult);

                // to add a new text box for ****** OFFICE ******
                var O_getcount = cntawoffice;
                $('#txtawoffice_' + O_getcount).val(AwOfficeresult[0].value);// to add a value in text box
                $('#lblawoffice_' + O_getcount).text(AwOfficeCode_R[i]);// to add a value in text box

                //console.log("getAgencydesc", Agencyresult[0].value, AgencyCode_R[i]);
            }
        }

    });

        AwardingAgencyCode = [];
        $(".lblawagency").each(function () {
            var awagency = $(this).text();
            if (awagency !== "") {
                AwardingAgencyCode.push(awagency);
                //console.log(awagency);
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
                //console.log(subagency);
                //console.log(AgencyCode);
            }
        });
        if (AwSubAgencyCode.length > 0) {
            AwSubAgencyCode = AwSubAgencyCode.filter(item => item);
            AwSubAgencyCode = AwSubAgencyCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            //console.log(AgencyCode);
            var sub_agency_group_code = AwSubAgencyCode.join();
            //console.log(agency_group_code);
            AwSubAgencyCode = sub_agency_group_code;
            // alert(AgencyCode);
        }

    $('#awardingAgencyModal').modal('toggle');
});


// #################### Naics Code popup data Add & OK ################### //
$(document).on("click", "#btnmdnaicscodeclose", function (e) {

    CloseNaicsPopup();
    $('#NaicsCodeModal').modal('toggle');

});

function CloseNaicsPopup() {
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


        });

        $('#txtnaicscode_1').val($('#txtnaicscode_2').val());
        $('#txtnaicsdesc_1').val($('#txtnaicsdesc_2').val());


    }, 200);

    //============= Remove blank rows =========//
}
// #################### Naics Code popup data Add & OK ################### //


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
            //console.log($("yes", '#txtnaicscode_' + spl[1]).val())

            $('#txtnaicsfamcode_' + spl[1]).val("");
            $('#txtnaicsfamdesc_' + spl[1]).val("");

            $('#NaicsFamilyRow_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#txtnaicsfamcode_' + spl[1]).val())
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

$(document).on('click', '.OpenMinContSize', function () {
    $('#Mysocio').modal('toggle');
    ListSocio();
});


$(document).on('click', '#Res_totalSocio', function () {
    $('.OpenMinContSize').trigger('click');
});

$(document).on('click', '#OKSocio', function () {
    OKSocio = [];
    $('.clsSocioeconomic input:checked').each(function () {
        OKSocio.push({ value: this.value, text: this.id });
    });

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

    if (OKSocio.length > 0) {
        $('.OpenMinContSize').val(OKSocio[0].text);
        $("#Res_totalSocio").css("display", "block");
        $('#lblRes_Socio').text(OKSocio.length - 1);
    }
    else {
        $("#Res_totalSocio").css("display", "none");
        $('#lblRes_Socio').text("");
        $('.OpenMinContSize').val('');
    }
}

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

    //============= Count Departmrnt =========//
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

//===================== Solicitation Procedure Close Popup ===================//

$(document).on('click', '#CancelSolicitation', function () {
    //console.log('Departmentcode_R==', Departmentcode_R);
    //console.log('AgencyCode_R==', AgencyCode_R);

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
            //console.log($("yes", '#lblsolicitation_' + spl[1]).text())
            $('#txtsolicitation_' + spl[1]).val("");
            $('#lblsolicitation_' + spl[1]).text("");
            $('.solicitation_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#lblsolicitation_' + spl[1]).text())
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
            //console.log("yes", dept);
        }
        else {
            //console.log("No", dept);
        }

    });

    $(SolicitationCode_R).each(function (i) { // To add again the removed "ok" values

        var result = SolicitationCombo[0].filter(obj => {
            return obj.id === SolicitationCode_R[i];
        });
        //console.log("getDeptdesc", SolicitationCode_R[i], "DepartmentAgencycode_1st==", DepartmentAgencycode_1st);
        //console.log("getSolicitationdesc", SolicitationCode_R[i]);

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
            $('#txtsolicitation' + id).val(ui.item.value);
            $('#lblsolicitation_' + id).text(ui.item.id);
            var solicitationcod = ui.item.id;//gets the select value from autocomplete
            //alert($(this).parent().find('label').text());
            getAgency(solicitationcod);
        }
    });
});

$(document).on("click", ".add-textboxsolicitation", function (e) {
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