$(document).ready(function () {
    const origin = window.location.origin;
    //origin.includes('answers') || origin.includes('fpdsplus') ? $(".full_nav").hide() : '';
    origin.includes('localhost') || origin.includes('fpdsplus') ? $("#navSearchHeading").html('EZ Search') : $("#navSearchHeading").html('Search');
    
    $("#vendorLi").html(origin.includes('localhost') ||origin.includes('fpdsplus') ?
        `<a class="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i class="ti-search"></i><span class="hide-menu">Vendor - EZ</span></a>` :
        `<a class="sidebar-link waves-effect waves-dark sidebar-link" href="/VendorSearch/Index" aria-expanded="false"><i class="ti-search"></i><span class="hide-menu">Vendor</span></a>`)
    $("#contractLi").html(origin.includes('localhost') || origin.includes('fpdsplus') ?
        `<a class="sidebar-link waves-effect waves-dark sidebar-link"  aria-expanded="false"><i class="ti-search"></i><span class="hide-menu">Contract - EZ</span></a>` :
        `<a class="sidebar-link waves-effect waves-dark sidebar-link" href="/ContractSearch/Index" aria-expanded="false"><i class="ti-search"></i><span class="hide-menu">Contract</span></a>`)
    origin.includes('local') || origin.includes('fpdsplus') ? $("#downloadReports").show() : $("#downloadReports").hide()
    $("#downloadReports").html(origin.includes('local') || origin.includes('fpdsplus') ?
        `<a class="sidebar-link waves-effect waves-dark sidebar-link" href="/Download/Index" aria-expanded="false"><i class="fa-solid fa-download"></i><span class="hide-menu">Download</span></a>` :
        `<a style="display:none;"></a>`)

    $("#videoNav").prop('href', origin.includes('answers') || origin.includes('fpdsplus')? 'https://www.youtube.com/playlist?list=PLLqOry17kGuSRV04rPnyhq15l6Wd2nLPv' :
    'https://www.youtube.com/playlist?list=PLLqOry17kGuR1DF9xABXvPLn1KnBoNwRa')
    $("#faqNav").prop('href', origin.includes('answers') || origin.includes('fpdsplus')? 'https://docs.google.com/spreadsheets/d/1lAc6jMR82AuAfGGQSNCpon0szMbjD6fRZ8jOPQHH148/edit#gid=989125590' :
        'https://docs.google.com/spreadsheets/d/1lAc6jMR82AuAfGGQSNCpon0szMbjD6fRZ8jOPQHH148/edit?usp=sharing')
    
    GetHelpingIcon();

    $("#vendorLi").click(function () {
        if (origin.includes('localhost') || origin.includes('fpdsplus')) {
            if (!$("#vendorsModal").length) {
                $("body").append(`<div class="modal fade" id="vendorsModal" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">

                    <h2 class="modal-title heading">Vendor Search</h2>
                    <i class="fa fa-times" aria-hidden="true"  onclick="$('#vendorsModal').modal('hide');" style="cursor:pointer"></i>
                </div>
                <div class="modal-body" id="vendorBodyLayout">

                    @*<div class="row">
                        <div class="col-md-12">
                            <label class="lbl_S001">Enter Vendor Name</label>
                            <div class="input-group mb-3">
                                <input style="font-size: 13px; font-size: 13px; height: 40px;" type="text" autocomplete="off" id="vendorNameNav"
                                       class="DIS_002 form-control  dis_able1" name="textbox" />
                                <label id="vendorsInput" style="display:none;" class="lbldept lblclr"></label>
                            </div>
                        </div>

                    </div>*@
                </div>
                <div class="modal-footer" style="justify-content:flex-start;">
                    <div class="bottom-footer main_content">
                        <div class="right-footer-btn-sec  buttons ">
                            <button style="float:right" type="button" class="btn btn-purple" onclick="onVendorSearch()" disabled="true" id="selectVendorButton">Search</button>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>`)
            }
            $("#vendorsModal").modal("show")
            if (!$("#scriptEleVendor").length) {
                let scriptEleVendor = document.createElement("script");
                scriptEleVendor.id = "scriptEleVendor";
                scriptEleVendor.setAttribute("src", "/Scripts/AppJS/LayoutVendorUei.js");
                document.body.appendChild(scriptEleVendor);
                scriptEleVendor.onload = function () {
                  //  $(`#${obj.wizard_question_parameter_id}`).click();
                }
               
            }
            const html = ` <div class="row">
                        <div class="col-lg-12" >
                           <label for="basic-url"  class="lbl_S001">Enter Vendor Name</label>
						    <span style="color:red;">*</span>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenVendor2Popup btndeptrowclear" id="btndeptrowclear2_vendor"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtvendor" id="txt2_vendor" required=" true"  />
								<label id="lblvendor_2" style="display:none;" class="lblvendor lblclr"></label>
                           </div>
                        </div>
                     </div>
					`
            $("#vendorBodyLayout").html(html)
        }
    })

    $("#contractLi").click(function () {
        if (origin.includes('localhost') || origin.includes('fpdsplus')) {
            if (!$("#contractModal").length) {
                 $("body").append(`<div class="modal fade" id="contractModal" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">

                    <h2 class="modal-title heading">Contract Search </h2>
                    <i class="fa fa-times" aria-hidden="true"  onclick="$('#contractModal').modal('hide')" style="cursor:pointer"></i>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-12">
                            <label class="lbl_S001">Enter Contract Number</label>
                            <span style="color:red;">*</span>
                           <!-- <div class="input-group mb-3">
                                <input style="font-size: 13px; font-size: 13px; height: 40px;" type="text" autocomplete="off" id="contractsInput"
                                       class="DIS_002 form-control  dis_able1" name="textbox" />
                                <label id="contractslabel" style="display:none;" class="lbldept lblclr"></label>
                            </div>-->
                             <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenContract2Popup btndeptrowclear" id="btndeptrowclear2_contract"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtvendor" id="txt2_contract" required=" true"  />
								<label id="lblcontract_2" style="display:none;" class="lblvendor lblclr"></label>
                           </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer" style="justify-content:flex-start;">
                    <div class="bottom-footer main_content">
                        <div class="right-footer-btn-sec  buttons ">
                            <button style="float:right" type="button" class="btn btn-purple" onclick="onSelectContract()" disabled="true" id="selectContractButton">Search</button>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>`)
            }
           
            $("#contractModal").modal("show")
            if (!$("#scriptEleContract").length) {
                let scriptEleContract = document.createElement("script");
                scriptEleContract.id = "scriptEleContract";
                scriptEleContract.setAttribute("src", "/Scripts/AppJS/LayoutContract.js");
                document.body.appendChild(scriptEleContract);
                scriptEleContract.onload = function () {
                  
                }

            }
/*            $('#contractsInput').keyup(function (event) {
                if (event.currentTarget.value.length > 3) {
                    $("#selectContractButton").prop("disabled", false)
                } else {
                    $("#selectContractButton").prop("disabled", true)
                }
            });*/
        }
    })
    teamingRequest()
 
});

function teamingRequest() {
    const payload = "{}";
    const url = "/Teaming/GetTeamingActiveForm";
    const result = AjaxPost(url, payload);
    const data = result.records;
    const len = data.length;

    if (len > 0) {
        let fillData=''
        for (let a = 0; a < data.length; a++) {
            fillData = fillData + `<li class="sidebar-item full_nav" id="form_name${data[a].wizard_teaming_id}" style="cursor:pointer" >
				<a class="sidebar-link waves-effect waves-dark sidebar-link liIcon" href="javascript:void(0)" aria-expanded="false" onclick="teaming_click('form_name1','teaming_list1')">
								<i class="fa-solid fa-plus"></i>
								<span class="hide-menu"  style=" width: calc(100% - 35px); position: relative; ">${data[a].title}
       </span>

				</a>
				<ul id="teaming_list${data[a].wizard_teaming_id}">
								<li class="sidebar-item">
									<a class="sidebar-link waves-effect waves-dark sidebar-link" href="/Teaming/Add?id=${data[a].wizard_teaming_id}" aria-expanded="false">
										<i class="mdi mdi-dots-horizontal"></i><span class="hide-menu">Input Information</span>
									</a>
								</li>
								<li class="sidebar-item">
									<a class="sidebar-link waves-effect waves-dark sidebar-link" href="/Teaming/List?id=${data[a].wizard_teaming_id}" aria-expanded="false">
										<i class="mdi mdi-dots-horizontal"></i><span class="hide-menu">View Responses</span>
									</a>
								</li>
				</ul>
</li>`
        }
        var newLi = `<li class="nav-small-cap sidebar-bold-menu-text ">
				<i class="mdi mdi-dots-horizontal"></i>
				<span class="hide-menu">Teaming</span>
</li>
${fillData}
`

        $('#sidebarnav').children().eq(8).before(newLi);
    }
}

function teaming_click(id, childId) {
    const element = `#${id} .liIcon  i`;
    if ($(element).hasClass('fa-plus')) {
        $(element).addClass('fa-minus');
        $(element).removeClass('fa-plus');
    } else {
        $(element).removeClass('fa-minus');
        $(element).addClass('fa-plus');
    }
    $(`#${childId}`).toggle();
}
function onVendorSearch() {
   
    window.location.href = `/AnswerWizard/vendorPlus?vendor_uei=${$("#lblvendor_2").text()}&category=agency`
}


function GetHelpingIcon() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/GetHelpingIcons",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            //console.log(result);
            if (result.length > 0) {
               
                var NaicsCode = ""; var NaicsCodeDescription = ""; var NaicsFamilyCode = ""; var NaicsFamilyDescription = ""; var Department = ""; var Agency = "";
                var PSCCode = ""; var PSCDescription = ""; var VendorName = ""; var CageCode = ""; var FinancialYear = ""; var MininumContractSize = "";
                var BusinessSize = ""; var ContractorNumber = ""; var SolicitationNumber = ""; var KeywordDescription = ""; var Socioeconomic = "";
                var BaseType = ""; var SolicitaionProcedure = ""; var FundingOffice = ""; var AwardingAgency = ""; var AwardingSubAgency = ""; var AwardingOffice = "";
                for (var i = 0; i < result.length; i++) {

                    //console.log(i);

                    if (result[i].Code == 'NC') { NaicsCode = result[i].Description; }
                    if (result[i].Code == 'NCD') { NaicsCodeDescription = result[i].Description; } // (result[i].Code == 'NCD') ? result[i].Description : "";
                    if (result[i].Code == 'NFC') { NaicsFamilyCode = result[i].Description; } // (result[i].Code == 'NFC') ? result[i].Description : "";
                    if (result[i].Code == 'NFD') { NaicsFamilyDescription = result[i].Description; } // (result[i].Code == 'NFD') ? result[i].Description : "";
                    if (result[i].Code == 'DEPT') { Department = result[i].Description; } // (result[i].Code == 'DEPT') ? result[i].Description : "";
                    if (result[i].Code == 'AGCY') { Agency = result[i].Description; } // (result[i].Code == 'AGCY') ? result[i].Description : "";
                    if (result[i].Code == 'PSCC') { PSCCode = result[i].Description; } // (result[i].Code == 'PSCC') ? result[i].Description : "";
                    if (result[i].Code == 'PSCD') { PSCDescription = result[i].Description; } // (result[i].Code == 'PSCD') ? result[i].Description : "";
                    if (result[i].Code == 'VN') { VendorName = result[i].Description; } // (result[i].Code == 'VN') ? result[i].Description : "";
                    if (result[i].Code == 'CGC') { CageCode = result[i].Description; } // (result[i].Code == 'CGC') ? result[i].Description : "";
                    if (result[i].Code == 'FY') { FinancialYear = result[i].Description; } // (result[i].Code == 'FY') ? result[i].Description : "";
                    if (result[i].Code == 'MCS') { MininumContractSize = result[i].Description; } // (result[i].Code == 'MCS') ? result[i].Description : "";
                    if (result[i].Code == 'BS') { BusinessSize = result[i].Description; } //(result[i].Code == 'BS') ? result[i].Description : "";
                    if (result[i].Code == 'C_NO') { ContractorNumber = result[i].Description; } // (result[i].Code == 'C_NO') ? result[i].Description : "";
                    if (result[i].Code == 'S_NO') { SolicitationNumber = result[i].Description; } // (result[i].Code == 'S_NO') ? result[i].Description : "";
                    if (result[i].Code == 'KEY') { KeywordDescription = result[i].Description; } // (result[i].Code == 'KEY') ? result[i].Description : "";
                    if (result[i].Code == 'SOE') { Socioeconomic = result[i].Description; } // (result[i].Code == 'SOE') ? result[i].Description : "";
                    if (result[i].Code == 'BT') { BaseType = result[i].Description; } // (result[i].Code == 'BT') ? result[i].Description : "";
                    if (result[i].Code == 'S_PROC') { SolicitaionProcedure = result[i].Description; }
                    if (result[i].Code == 'FOFFC') { FundingOffice = result[i].Description; }
                    if (result[i].Code == 'AWAGCY') { AwardingAgency = result[i].Description; }
                    if (result[i].Code == 'AWSAGCY') { AwardingSubAgency = result[i].Description; }
                    if (result[i].Code == 'AWOFFC') { AwardingOffice = result[i].Description; }
                }


                sessionStorage.setItem("NaicsCode", NaicsCode);
                sessionStorage.setItem("NaicsCodeDescription", NaicsCodeDescription);
                sessionStorage.setItem("NaicsFamilyCode", NaicsFamilyCode);
                sessionStorage.setItem("NaicsFamilyDescription", NaicsFamilyDescription);
                sessionStorage.setItem("Department", Department);
                sessionStorage.setItem("Agency", Agency);
                sessionStorage.setItem("PSCCode", PSCCode);
                sessionStorage.setItem("PSCDescription", PSCDescription);
                sessionStorage.setItem("VendorName", VendorName);
                sessionStorage.setItem("CageCode", CageCode);
                sessionStorage.setItem("FinancialYear", FinancialYear);
                sessionStorage.setItem("MininumContractSize", MininumContractSize);
                sessionStorage.setItem("BusinessSize", BusinessSize);
                sessionStorage.setItem("ContractorNumber", ContractorNumber);
                sessionStorage.setItem("SolicitationNumber", SolicitationNumber);
                sessionStorage.setItem("KeywordDescription", KeywordDescription);
                sessionStorage.setItem("Socioeconomic", Socioeconomic);
                sessionStorage.setItem("BaseType", BaseType);
                sessionStorage.setItem("SolicitaionProcedure", SolicitaionProcedure);
                sessionStorage.setItem("FundingOffice", FundingOffice);
                sessionStorage.setItem("AwardingAgency", AwardingAgency);
                sessionStorage.setItem("AwardingSubAgency", AwardingSubAgency);
                sessionStorage.setItem("AwardingOffice", AwardingOffice);
            }
        },
        error: function ajaxError(err) {
            
            //swal("", err);
        }
    });
}


function set_Helpicon() {
    $(".NC").attr('title', sessionStorage.getItem("NaicsCode"));
    $(".NC").attr('data-original-title', "");

    $(".NCD").attr('title', sessionStorage.getItem("NaicsCodeDescription"));
    $(".NCD").attr('data-original-title', "");

    $(".NFC").attr('title', sessionStorage.getItem("NaicsFamilyCode"));
    $(".NFC").attr('data-original-title', "");

    $(".NFD").attr('title', sessionStorage.getItem("NaicsFamilyDescription"));
    $(".NFD").attr('data-original-title', "");

    $(".DEPT").attr('title', sessionStorage.getItem("Department"));
    $(".DEPT").attr('data-original-title', "");

    $(".AGCY").attr('title', sessionStorage.getItem("Agency"));
    $(".AGCY").attr('data-original-title', "");

    $(".PSCC").attr('title', sessionStorage.getItem("PSCCode"));
    $(".PSCC").attr('data-original-title', "");

    $(".PSCD").attr('title', sessionStorage.getItem("PSCDescription"));
    $(".PSCD").attr('data-original-title', "");

    $(".VN").attr('title', sessionStorage.getItem("VendorName"));
    $(".VN").attr('data-original-title', "");

    $(".CGC").attr('title', sessionStorage.getItem("CageCode"));
    $(".CGC").attr('data-original-title', "");

    $(".FY").attr('title', sessionStorage.getItem("FinancialYear"));
    $(".FY").attr('data-original-title', "");

    $(".MCS").attr('title', sessionStorage.getItem("MininumContractSize"));
    $(".MCS").attr('data-original-title', "");

    $(".BS").attr('title', sessionStorage.getItem("BusinessSize"));
    $(".BS").attr('data-original-title', "");

    $(".C_NO").attr('title', sessionStorage.getItem("ContractorNumber"));
    $(".C_NO").attr('data-original-title', "");

    $(".S_NO").attr('title', sessionStorage.getItem("SolicitationNumber"));
    $(".S_NO").attr('data-original-title', "");

    $(".KEY").attr('title', sessionStorage.getItem("KeywordDescription"));
    $(".KEY").attr('data-original-title', "");

    $(".SOE").attr('title', sessionStorage.getItem("Socioeconomic"));
    $(".SOE").attr('data-original-title', "");

    $(".BT").attr('title', sessionStorage.getItem("BaseType"));
    $(".BT").attr('data-original-title', "");

    $(".S_PROC").attr('title', sessionStorage.getItem("SolicitaionProcedure"));
    $(".S_PROC").attr('data-original-title', "");

    $(".FOFFC").attr('title', sessionStorage.getItem("FundingOffice"));
    $(".FOFFC").attr('data-original-title', "");

    $(".AWAGCY").attr('title', sessionStorage.getItem("AwardingAgency"));
    $(".AWAGCY").attr('data-original-title', "");

    $(".AWSAGCY").attr('title', sessionStorage.getItem("AwardingSubAgency"));
    $(".AWSAGCY").attr('data-original-title', "");

    $(".AWOFFC").attr('title', sessionStorage.getItem("AwardingOffice"));
    $(".AWOFFC").attr('data-original-title', "");
}