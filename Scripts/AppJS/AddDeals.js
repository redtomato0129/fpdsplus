
var OKSocio = [];
var Agencycombo = [];
$(document).ready(function () {
    getSubAgencyList();
    GetAwardingSubAgency();
    GetIncumbent();
    GetOrganizationListAll();
    //if (len == 6) {
    //    $('#txtnaicscode_2').val();
    //    /*  $('#txtnaicscode_2').val(Naics);*/
    //    GetNaics(Naics);
    //}

    var urlParams = new URLSearchParams(window.location.search);
    var dealId = urlParams.get('dealId');
    if (dealId != null) {
        GetDealById(dealId);
    }
    else {
        $("#heading").html(`<strong>Add New Deal</strong>`)
    }
    $('#SaveDeal').click(function () {

        var Deal = {};
        Deal = {
            Deal_ID: dealId,
            Deal_Title: $('#txtdealtitle').val(),
            Deal_SamGov_Link: $('txtDealSamGovLink').val(),
            Deal_Status: $('#DDStatus option:selected').text() === "Please Choose one" ? "" : $('#DDStatus option:selected').text(),
            Deal_Funding_Agency_code: SubAgencyCode,
            Deal_Funding_Agency_Name: FundingName,
            Deal_naics_code: $('#txtDealNAICS').val(),
            Deal_naics_description: $('#txtDealNAICSDesc').val(),
            Deal_Incumbent_UEI: IncumbentSAM,
            Deal_Incumbent_Name: $('#txtDealIncumbentName').val(),
            Deal_Govwin_ID: $('#txtDealGovwinID').val(),
            Deal_govwin_link: 'Govwin Link',
            Deal_SolicitationNumber: $('#txtDealSolicitationNumber').val(),
            Deal_Stage: $('#DDdealsstage option:selected').text() === "Please Choose one" ? "" : $('#DDdealsstage option:selected').text(),
            Deal_Awarding_Agency_code: AwardingSubAgency,
            Deal_Awarding_Agency_name: AwardingName,
            Deal_funding_sub_agency_code: SubAgencyCode,
            Deal_funding_sub_agency_name: SubAgencyNameDeals,
            Deal_Award_Type: $('#DDAwardType option:selected').text() === "Please Choose one" ? "" : $('#DDAwardType option:selected').text(),
            Deal_PSC_code: $('#txtDealPSC').val(),
            Deal_PSC_Description: $('#txtDealPSCDesc').val(),
            Deal_Potential_Award_Amount: $('#txtDealPotentialAwardAmount').val(),
            Deal_Priority: $('#Priority option:selected').text() === "Please Choose one" ? "" : $('#Priority option:selected').text(),
            Deal_SamGov_Link: $('#txtDealSamGovLink').val(),
            Deal_RFP_Release_Date: $('#txtDealDueDate').val(),
            DDAwardType: $('#DDAwardType option:selected').text(),
            Deal_Set_Aside: value,
            Deal_Set_Aside_Description: descriprion,
            Deal_Expiration_Date: $('#dateexpiry').val(),
            user_id: document.getElementById("userid").value,
            user_domain: document.getElementById("userDomain").value,
            multi_single_award: $('#Award').val() === "" ? "" : $('#Award').val(),
            Deal_Type: $('#DType').val() === "" ? "" : $('#DType').val(),
            Description: $('#txtDescription').val(),
        }
        if (Deal.Deal_Type === 'Commercial') {
            Deal.organization_id = $('#organizationList').val() === "" ? "" : $('#organizationList').val()
        } else if (Deal.Deal_Type ==='Federal') {
            if (!Deal.Deal_funding_sub_agency_code) {
                swal.fire({
                    icon: 'error',
                    title: "Deal",
                    text: "Please select Funding Sub Agency",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                return;
            }
        }

        if (Deal.Deal_Title !== "" && Deal.Deal_Status !== "" && Deal.Deal_Stage !== "" && Deal.Deal_Priority !== "" && Deal.Deal_RFP_Release_Date !== "") {
            var data = "{Deal:" + JSON.stringify(Deal) + "}";
            var url = "/CrmDeals/DealsAdd";

            var result = AjaxPost(url, data);

            if (result.response == "Success") {
                //alert(' Please check your email and verify your account ');
                //$('.Verification').show();
                //$('.Register').hide();
                //$('.plan-sec').hide();
                //$('.auth-wrapper').removeClass('register');
                swal.fire({
                    icon: 'success',
                    title: "Deal",
                    text: "Deal added successfully",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                })
                $('#txtdealtitle').val('');
                $('#txtDealSolicitationNumber').val('');
                $('#txtDealNAICS').val('');
                $('#txtDealNAICSDesc').val('');
                $('#txtDealGovwinID').val('');
                $('#txtDescription').val('');
                $('#txtDealPSC').val('');
                $('#txtDealPSCDesc').val('');
                $('#txtDealSamGovLink').val('');

                if (dealId == null) {
                    $("form")[1].reset()
                    /* $('#txtdealtitle').val("");
                     $('txtDealSamGovLink').val("");
                     $('#DDStatus option:selected').text("Please Choose one");         
                     $('#txtDealNAICS').val();
                     $('#txtDealNAICSDesc').val("");                            
                     $('#txtDealIncumbentName').val("");
                     $('#txtDealGovwinID').val("");*/


                }

                //$('#errregemail').hide();
            }
            else if (result.response == "fail") {
                swal.fire({
                    icon: 'error',
                    title: "Deal",
                    text: "Failed to insert deal",
                    type: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                //$('#errregemail').show();

            }

            else if (result.response == "Updated") {
                $("#heading").html(`<strong>Deal: ${Deal.Deal_Title}</strong>`)
                swal.fire({
                    icon: 'success',
                    title: "Deal",
                    text: "Updated",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                //$('#errregemail').show();

            }
            else {
                swal.fire(result);
            }
        }
        else {
         
            //swal.fire("", "All (*) fields are mandatory", "warning");
            /* swal.fire({
                 title: "",
                 text: "All (*) fields are mandatory",
                 type: "warning",
                 showCancelButton: false,
                 showConfirmButton: false,
                 timer: 2000,
             });*/
            let html = "";
            if (!Deal.Deal_Title) {
                html = html+`Title, `
            } if (!Deal.Deal_Status) {
                html = html +`Status, `
            } if (!Deal.Deal_Priority) {
                html = html +`Priority, `
            } if (!Deal.Deal_RFP_Release_Date) {
                html = html +`RFP Release Date, `
            } if (!Deal.Deal_Stage) {
                html = html + `Stage, `
            } 
            html = html.replace(/,\s*$/, "");

            Swal.fire({
                icon: 'error',
                title: '',
                buttons:true,
                html: `Please fill in all required <span class='text-danger'>*</span> fields (${html}).`,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })

            //$('#errregmandatory').show();
        }

    });

    $('#go').click(function () {
        var origin = window.location.origin;
        window.location.href = origin;
    });

    $("#routeDealButton").click(function () {
        location.open("/CrmDeals/AddDeal", '_self')
    });

    $('#btnNaicsCodeCancel').click(function () {

        $('#naicsModal').modal('toggle');

    });

    //$('#btnmdIncumbentNameclose').click(function () {
    //    $('#txtDealIncumbentName').val(txtIncumbentName_2.value);

    //    $('#myIncumentModal').modal('toggle');

    //});


    $(".txtDealPotentialAwardAmount").each(function () {
        $(this).format({ format: "#,###", locale: "us" });
    });


    //$('#btnmdIncumbentNameclose').click(function () {
    //    $('#txtDealIncumbentUEI').val(txtcagecode_2.value);

    //    $('#myIncumentModalUEI').modal('toggle');

    //});


    //$('#btnmdImbcancel').click(function () {
    //    /* $('#txtDealIncumbentName').val(txtcagecode_2.value);*/

    //    $('#myIncumentModalUEI').modal('toggle');

    //});



    //$('#btnfundingcancel').click(function () {
    //    /* $('#txtDealIncumbentName').val(txtcagecode_2.value);*/

    //    $('#myModal').modal('toggle');

    //});

    $('#btnamdcancel').click(function () {
        /* $('#txtDealIncumbentName').val(txtcagecode_2.value);*/

        $('#awardingAgencyModal').modal('toggle');

    });

    //$('#btnmdclose').click(function () {
    //    ;
    //    $('#txtDealFundingAgencyCode').val(txtfund_1.value);
    //    $('#myModal').modal('toggle');

    //});

    //$('#btnmdcancel').click(function () {
    //    ;
    //   /* $('#txtDealFundingAgencyCode').val(txtdept_2.value);*/
    //    $('#myModal').modal('toggle');

    //});



    $('#txtSetAside').click(function () {
        /*  $('#txtDealFundingAgencyCode').val(txtdept_2.value);*/
        $('#Mysocio').modal('toggle');
        GetSocioEconomic();

    });

    $('#txtDealNAICS').click(function () {

        onNaicsCodeChange(event)

    });

    //$('#txtDealFundingSubAgencyCode').click(function () {

    //    getsubAgency();

    //});

    //$('#txtDealIncumbentName').click(function () {

    //    getAgencyList();

    //});

    //$('#txtDealIncumbentName').click(function () {
    //    ;

    //    $('#myIncumentModal').modal('show');

    //});


    //$('#txtDealIncumbentUEI').click(function () {
    //    ;

    //    $('#myIncumentModalUEI').modal('show');

    //});

    $('#txtDealAwardingAgencycode').click(function () {
        ;

        getAwardingAgencyList();

    });

    $('#btnmdpscclose').click(function () {
        $('#txtDealPSC').val(txtPSC_1.value);
        $('#PscModal').modal('toggle');

    });
    $('#btnmdpsccancel').click(function () {

        $('#PscModal').modal('toggle');

    });


    //$('#btnmdIncumbentUEIclose').click(function () {
    //    $('#txtDealIncumbentUEI').val(txtIncumbentUEI_2.value);
    //    $('#myIncumentModalUEI').modal('toggle');

    //});


    $('#btnamdclose').click(function () {
        $('#txtDealAwardingAgencycode').val(txtaward_2.value);
        $('#awardingAgencyModal').modal('toggle');

    });

    $('#btnfundingagencyclear').click(function () {
        $('#txtDealFundingAgencyCode').val('');
        $('#txtDealFundingSubAgencyCode').val('');



    });

    $('#btnsubfundingagencyclear').click(function () {

        $('#txtDealFundingSubAgencyCode').val('');
        SubAgencyCode = "";
        Deal_Funding_Agency_Name = "";


    });



    $('#btnnaicsDescclear').click(function () {
        $('#txtDealNAICSDesc').val('');
        /*  $('#txtDealAwardingSubAgencycode').val('');*/



    });

    $('#btnnaicsCodeclear').click(function () {
        ;
        $('#txtDealNAICS').val('');
        $('#txtDealNAICSDesc').val('');



    });

    $('#btnnPSCCodeclear').click(function () {
        $('#txtDealPSCDesc').val('');
        /*  $('#txtDealAwardingSubAgencycode').val('');*/



    });

    $('#btnPSCCodeclear').click(function () {
        $('#txtDealPSC').val('');
        $('#txtDealPSCDesc').val('');



    });

    $('#btnawardingagencyclear').click(function () {
        $('#txtDealAwardingAgencycode').val('');
        $('#txtDealAwardingSubAgencycode').val('');



    });

    $('#btnawardingsubagencyclear').click(function () {

        $('#txtDealAwardingSubAgencycode').val('');



    });



    //$('#txtDealPSC').click(function () {
    //    ;

    //    $('#PscModal').modal('show');

    //});

    $('#CancelSocio').click(function () {
        ;

        $('#Mysocio').modal('toggle');

    });


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
    $('#Mysocio').modal('toggle');

    SocioCount();
});

function GetOrganizationListAll() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmPeople/GetOrganizationListAll",
        /* result = AjaxPost(url, data);*/
        dataType: "json",
        async: false,
        success: function (result) {
            //result = JSON.parse(result)
            let html = '<option selected disabled="disabled">Please Choose one</option>';
            const domain = $("#userDomain").val();
            if (result.records.length > 0) {
                const data = result.records;                
                for (let i = 0; i < data.length; i++) {
                    const emailDomain = data[i].email_address.split('@')[1];
                    if (emailDomain === domain) {
                        html = html + `<option value="${data[i].organization_id}">${data[i].name}</option>`;
                    }
                    
                }
            }
            $("#organizationList").html(html)
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}
function SocioCount() {

    $('.OpenMinContSize').val(OKSocio[0].value);

    if (OKSocio.length == 0) {
        $("#Res_totalSocio").css("display", "block");
        $('#lblRes_Socio').text(OKSocio.length - 1);
    }
    else {
        $("#Res_totalSocio").css("display", "none");
        $('#lblRes_Socio').text("");
    }
}

var Naics;
var NaicsDescription;
function onNaicsCodeChange(event) {

    if (event.currentTarget.value.length == 6) {
        ;

        /*Naics: $('#txtnaicscode_2').val();*/
        Naics = event.currentTarget.value;
        GetNaics(Naics);

    }
}

var PSC;
var PSCDescription;
function onPSCCodeChange(event) {

    if (event.currentTarget.value.length == 4) {
        ;

        /*Naics: $('#txtnaicscode_2').val();*/
        PSC = event.currentTarget.value;
        GetPSC(PSC);

    }
}


function getAwardingAgencyList() {

    AwardAgencycombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmDeals/GetFundingAgency",
        /* result = AjaxPost(url, data);*/
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                //AgencyCode = result[0].funding_agency_code;
                // Agencycombo.push(result);
                $("#txtDealAwardingAgencycode").addClass('ui-autocomplete-loading');
                
                for (let i in result) {
                    AwardAgencycombo.push({
                        label: result[i].funding_agency_name, code: result[i].funding_agency_code
                    })

                }


                $("#txtDealAwardingAgencycode").autocomplete({
                    delay: 0,
                    source: AwardAgencycombo,
                    select: function (event, ui) {
                        $('#txtDealAwardingAgencycode').val(ui.item.value);

                        AgencyCode = ui.item.code;//gets the select value from autocomplete
                        getawardsubAgency(AgencyCode);
                    }
                });
                /*$("#txtDealFundingAgencyCode").autocomplete({
                    minLength: 0,
                    source: Agencycombo,
                    select: function (event, ui) {
                        $('#txtagency_' + id).val(ui.item.value);
                        $('#lblagency_' + id).text(ui.item.id);
                        //$(".txtagency").val(ui.item.value);
                        AgencyCode = ui.item.id;//gets the select value from autocomplete
                    }
                });*/


                /*var list = "";

                for (i = 0; i < result.length; i++) {
                    list += "<li>" + result[i] + "</li>";
                    $("#txtDealFundingAgencyCode").append(list);
                }*/

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

function getawardsubAgency(AgencyCode) {
    AwardSubagency = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/CrmDeals/GetSubAgencyList",
        data: "{'Agencycode': '" + AgencyCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                for (let i in result) {
                    AwardSubagency.push({
                        label: result[i].value, code: result[i].id
                    })

                }
                $("#txtDealAwardingSubAgencycode").autocomplete({
                    delay: 0,
                    source: Subagency,
                    select: function (event, ui) {
                        $('#txtDealAwardingSubAgencycode').val(ui.item.value);

                        AgencyCode = ui.item.code;//gets the select value from autocomplete

                    }
                });
            }
            else {
                //swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal.fire("", err);

        }
    });
}


function getsubAgencylist() {

    ;

    SubAgencycombo = [];
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/CrmDeals/GetFundingAgency",
        /* result = AjaxPost(url, data);*/
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {

                //AgencyCode = result[0].funding_agency_code;
                // Agencycombo.push(result);
                $("#txtDealFundingSubAgencyCode").addClass('ui-autocomplete-loading');

                for (let i in result) {
                    SubAgencycombo.push({
                        label: result[i].funding_agency_name, code: result[i].funding_agency_code
                    })

                }


                $("#txtDealFundingSubAgencyCode").autocomplete({
                    delay: 0,
                    source: SubAgencycombo,
                    select: function (event, ui) {
                        $('#txtDealFundingSubAgencyCode').val(ui.item.value);

                        AgencyValue = ui.item.value;//gets the select value from autocomplete
                        getagencyAgency(AgencyValue);
                    }
                });
                /*$("#txtDealFundingAgencyCode").autocomplete({
                    minLength: 0,
                    source: Agencycombo,
                    select: function (event, ui) {
                        $('#txtagency_' + id).val(ui.item.value);
                        $('#lblagency_' + id).text(ui.item.id);
                        //$(".txtagency").val(ui.item.value);
                        AgencyCode = ui.item.id;//gets the select value from autocomplete
                    }
                });*/


                /*var list = "";

                for (i = 0; i < result.length; i++) {
                    list += "<li>" + result[i] + "</li>";
                    $("#txtDealFundingAgencyCode").append(list);
                }*/

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
function OnFundingSubAgencyChange(event) {
    if (event.currentTarget.value.length == 3) {
        SubAgencyName = event.currentTarget.value;
        GetSubAgency(SubAgencyName);
    }
}
function OnIncumbentNameChange(event) {
    if (event.currentTarget.value.length == 4) {

        ;
        IncName = event.currentTarget.value;
        GetIncumbent(IncName);
    }
}

function OnAwardingSubAgencyChange(event) {
    if (event.currentTarget.value.length == 4) {

        ;
        AwardingSubAgencyName = event.currentTarget.value;
        GetAwardingSubAgency(AwardingSubAgencyName);
    }
}


var IncumbentSAM;

var SubAgencyNameDeals;
var FundingCode;
var SubAgencyCode;
var FundingName;


function GetIncumbent() {
    ;
    Incum = [];
    $("#txtDealIncumbentName").autocomplete({
        delay: 0,
        minLength: 3,
        source: function (request, response) {

            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetIncumebentName?search=" + request.term,
                data: "{'Code': '0'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    Incum = [];
                    if (result.length > 0) {

                        for (let i in result) {
                            Incum.push({
                                label: result[i].legal_buisness_name, code: result[i].SAM
                            })

                        }
                        response(Incum)

                    }


                    else {
                        //swal("", "No Data Found !");
                    }

                },
                error: function ajaxError(err) {
                    swal.fire("", err);

                }
            });
        },
        select: function (event, ui) {


            $('#txtDealIncumbentName').val(ui.item.value);
            /* IncumbentName.SAM*/
            IncumbentSAM = ui.item.code;


            //gets the select value from autocomplete
            //gets the select value from autocomplete
            /* console.log(AgencyCode);*/
            /*  IncumbentSAM = AgencyCode;*/

        }
    });
}
function getSubAgencyList() {
    SubAgency = [];
    $("#txtDealFundingSubAgencyCode").autocomplete({
        delay: 0,
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetFundingAgency?SubAgencyName=" + request.term,
                data: "{'Code': '0'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    SubAgency = [];
                    if (result.length > 0) {

                        for (let i in result) {

                            SubAgency.push({
                                label: result[i].funding_agency_name, code: result[i].funding_subagency_code, name: result[i].funding_subagency_name, depcode: result[i].funding_agency_code
                            })

                        }
                        response(SubAgency);
                    }
                    else {
                        //swal("", "No Data Found !");
                    }
                },
                error: function ajaxError(err) {
                    swal.fire("", err);

                }
            });
        },
        select: function (event, ui) {
            $('#txtDealFundingSubAgencyCode').val(ui.item.value);
            /* IncumbentName.SAM*/
            SubAgencyCode = ui.item.code;
            SubAgencyNameDeals = ui.item.value;
            FundingCode = ui.item.depcode;
            FundingName = ui.item.name;

            //gets the select value from autocomplete
            //gets the select value from autocomplete
            /* console.log(AgencyCode);*/
            /*  IncumbentSAM = AgencyCode;*/

        }
    });


}


var AwardingName;
var AwardingSubAgency;
function GetAwardingSubAgency() {
    ;

    AwardSubAgency = [];
    $("#txtDealAwardingSubAgencycode").autocomplete({
        delay: 0,
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetAwardingFundingAgency?AwardingSubAgencyName=" + request.term,
                data: "{'Code': '0'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    AwardSubAgency = [];
                    if (result.length > 0) {

                        for (let i in result) {
                            AwardSubAgency.push({
                                label: result[i].award_agency_name, code: result[i].award_agency_code
                            })

                        }
                        response(AwardSubAgency);

                    }

                    else {
                        //swal("", "No Data Found !");
                    }

                },
                error: function ajaxError(err) {
                    swal.fire("", err);

                }
            });
        },

        select: function (event, ui) {
            $("#txtDealAwardingSubAgencycode").val(ui.item.value);

            AwardingSubAgency = ui.item.code;
            AwardingName = ui.item.value;


            //gets the select value from autocomplete
            //gets the select value from autocomplete
            /* console.log(AgencyCode);*/
            /*  IncumbentSAM = AgencyCode;*/

        }
    });
}

    var FundingAgencyCode;
    var FundingAgencyNameList;
    function getagencyAgency(Agencyvalue) {
        ;
        Subagency = [];
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/CrmDeals/GetAgencyList",
            data: "{'AgencyValue': '" + Agencyvalue + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {

                    for (let i in result) {
                        Subagency.push({
                            label: result[i].value, code: result[i].id
                        })

                    }
                    $("#txtDealFundingAgencyCode").autocomplete({
                        delay: 0,
                        source: Subagency,
                        select: function (event, ui) {
                            $('#txtDealFundingAgencyCode').val(ui.item.value);

                            FundingAgencyCode = ui.item.code;
                            FundingAgencyNameList = ui.item.value;


                            //gets the select value from autocomplete

                        }
                    });

                }
                else {
                    //swal("", "No Data Found !");
                }

            },
            error: function ajaxError(err) {
                swal.fire("", err);

            }
        });
    }



    var FundingAgency;
    var FundingAgencyName;
    function onFundingCodeChange(event) {

        if (event.currentTarget.value.length == 1) {
            ;

            /*Naics: $('#txtnaicscode_2').val();*/
            FundingAgency = event.currentTarget.value;
            GetFundingAgency(FundingAgency);

        }
    }

    function GetFundingAgency(FundingAgency) {
        ;

        if (FundingAgency.length == '3') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetFundingAgency",
                data: "{'FundingAgency': '" + FundingAgency + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        FundingAgencyName = result[0];
                        $('#txtfund_2').val(result[0]);

                        /*  $('#txtnaicsdesc_2').val(result[0]);*/
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal.fire("", "No record Found !", "success");

                    }



                },
                error: function ajaxError(err) {
                    swal.fire("", "Error", err);

                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }
    }

    var AwardAgency;
    var AwardAgencyName;
    function onAwardingCodeChange(event) {
        ;
        if (event.currentTarget.value.length == 3) {
            ;

            /*Naics: $('#txtnaicscode_2').val();*/
            AwardAgency = event.currentTarget.value;
            GetAwardAgency(AwardAgency);

        }
    }

    function GetAwardAgency(AwardAgency) {
        ;

        if (AwardAgency.length == '3') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetAwardAgency",
                data: "{'AwardAgency': '" + AwardAgency + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        AwardAgencyName = result[0];
                        $('#txtawsubagency_2').val(result[0]);

                        /*  $('#txtnaicsdesc_2').val(result[0]);*/
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal("", "No record Found !", "success");

                    }



                },
                error: function ajaxError(err) {
                    swal("", "Error", err);

                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }
    }

    var SetASide;
    var SetASideDescription;
    function onSetAsideCodeChange(event) {
        ;
        GetSocioEconomic();

    }

    //function GetAwardAgency(AwardAgency) {
    //    ;

    //    if (AwardAgency.length == '3') {
    //        $('#AlertMsg').text('');


    //        $.ajax({
    //            type: "POST",
    //            contentType: "application/json;charset=utf-8",
    //            url: "/CrmDeals/GetAwardAgency",
    //            data: "{'AwardAgency': '" + AwardAgency + "'}",
    //            dataType: "json",
    //            async: false,
    //            success: function (result) {

    //                if (result.length > 0) {
    //                    AwardAgencyName = result[0];
    //                    $('#txtagency_2').val(result[0]);

    //                    /*  $('#txtnaicsdesc_2').val(result[0]);*/
    //                    //$(".dis_able0").attr('disabled', 'disabled');

    //                    ////NaicsCode.push(NaicsCodeval);
    //                    //$(".dis_able0").children().attr('disabled', 'disabled');
    //                    NAICS_mode = "NaicsCode";
    //                }
    //                else {
    //                    swal("", "No record Found !", "success");

    //                }



    //            },
    //            error: function ajaxError(err) {
    //                swal("", "Error", err);

    //            }
    //        });
    //    }
    //    else {
    //        $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
    //    }
    //}

    var CageCode;
    var IncumbentName;
    function onCageCodeChange(event) {

        if (event.currentTarget.value.length == 5) {
            ;

            /*Naics: $('#txtnaicscode_2').val();*/
            CageCode = event.currentTarget.value;
            GetIncumbentName(CageCode);

        }
    }
    function GetIncumbentName(CageCode) {
        ;

        if (CageCode.length == '5') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetIncumebentName",
                data: "{'CageCode': '" + CageCode + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        IncumbentName = result[0];
                        $('#txtIncumbentName_2').val(result[0]);

                        /*  $('#txtnaicsdesc_2').val(result[0]);*/
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal("", "No record Found !", "success");

                    }



                },
                error: function ajaxError(err) {
                    swal("", "Error", err);

                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }
    }

    var CageCodeUEI;
    var IncumbentUEI;
    function onCageCodeChangeUEI(event) {

        if (event.currentTarget.value.length == 5) {
            ;

            /*Naics: $('#txtnaicscode_2').val();*/
            CageCodeUEI = event.currentTarget.value;
            GetIncumbentUEI(CageCodeUEI);

        }
    }
    function GetIncumbentUEI(CageCodeUEI) {
        ;

        if (CageCodeUEI.length == '5') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetIncumebentUEI",
                data: "{'CageCodeUEI': '" + CageCodeUEI + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        IncumbentUEI = result[0];
                        $('#txtIncumbentUEI_2').val(result[0]);

                        /*  $('#txtnaicsdesc_2').val(result[0]);*/
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal.fire("", "No record Found !", "success");

                    }



                },
                error: function ajaxError(err) {
                    swal("", "Error", err);

                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }
    }

    function getAwardType() {


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/CrmDeals/GetAwardType",
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

    var descriprion;
    var value
    function GetSocioEconomic() {
        $('.Apploader').show();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/CrmDeals/Get_SocioEconomic",
            data: "{}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    ;

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
                        descriprion = result[i].abbreviation;
                        value = result[i].SetASideCode;
                        filldata = filldata + '<tr><td>' + (i + 1) + '</td><td>' + descriprion + '</td><td>' + value +
                            '</td><td><label class="container"><input  id="' + descriprion + '" class="Socioec" type="checkbox" value="' + value + '"><span class="checkmark0"></span></label></td></tr>';
                    }
                    $('#tbody_Socio').html(filldata);
                    $('#tbl_Socio').DataTable({
                        //scrollY: 300,

                        scrollCollapse: true,
                        paging: false,
                        bInfo: false,
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

                    var setAside = $("#txtSetAside").val();
                    for (i = 0; i < result.length; i++) {
                        descriprion = result[i].abbreviation;
                        value = result[i].SetASideCode;
                        //console.log(document.getElementById(descriprion).value)
                        let element = document.getElementById(descriprion);
                        if (setAside == element.value) {
                            element.click();
                            break;
                        }
                        //let flag = descriprion ==  ? true : false;


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


    function saveNaicsData() {
        $('#txtDealNAICS').val(Naicscode.value);

        $('#naicsModal').modal('toggle');

    }
    function GetNaics(Naics) {
        //;

        if (Naics.length == '6') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetNAICSFam",
                data: "{'Code': '" + Naics + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        ;
                        NaicsDescription = result[0];
                        $('#txtDealNAICSDesc').val(NaicsDescription);
                        /*$('#txtnaicsdesc_1').val(result[0]);*/
                        /*   $('#txtnaics_2').val(result[0]);*/

                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal("", "No record Found !", "success");

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


    function GetPSC(PSC) {
        ;

        if (PSC.length == '4') {
            $('#AlertMsg').text('');


            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "/CrmDeals/GetPSC",
                data: "{'Code': '" + PSC + "'}",
                dataType: "json",
                async: false,
                success: function (result) {

                    if (result.length > 0) {
                        PSCDescription = result[0];
                        $('#txtDealPSCDesc').val(PSCDescription);

                        /*  $('#txtnaicsdesc_2').val(result[0]);*/
                        //$(".dis_able0").attr('disabled', 'disabled');

                        ////NaicsCode.push(NaicsCodeval);
                        //$(".dis_able0").children().attr('disabled', 'disabled');
                        NAICS_mode = "NaicsCode";
                    }
                    else {
                        swal("", "No record Found !", "success");

                    }



                },
                error: function ajaxError(err) {
                    swal("", "Error", err);

                }
            });
        }
        else {
            $('#AlertMsg').text('*** The NAICS Code should be exactly 6 Digits ! ***');
        }
    }

function GetDealById(dealId) {
    ;
        var url = "/CrmDeals/DealsById";
        var data = "{dealId:" + JSON.stringify(dealId) + "}";
        //;
        var result = AjaxPost(url, data);

    $("#heading").html(`<strong>${result.deal.Deal_Title}</strong>`)
        $('#txtDealFundingAgencyName').val(result.deal.Deal_Funding_Agency_Name);
        $('#txtDealSamGovLink').val(result.deal.Deal_SamGov_Link);
        $('#txtdealtitle').val(result.deal.Deal_Title);
        $('#DDStatus option:selected').text(!result.deal.Deal_Status ? "Please Choose one" : result.deal.Deal_Status);
        $('#txtDealFundingAgencyCode').val(result.deal.Deal_Funding_Agency_code);
        $('#txtDealNAICS').val(result.deal.Deal_naics_code);
        $('#txtDealNAICSDesc').val(result.deal.Deal_naics_description);
        $('#txtDealIncumbentUEI').val(result.deal.Deal_Incumbent_UEI);
        $('#txtDealIncumbentName').val(result.deal.Deal_Incumbent_Name);
        $('#txtDealGovwinID').val(result.deal.Deal_Govwin_ID === 0 ? '' : result.deal.Deal_Govwin_ID);
        $('#txtDealGovwinLink').val(result.deal.Deal_govwin_link);
        $('#txtDealSolicitationNumber').val(result.deal.Deal_SolicitationNumber);
        $('#DDdealsstage option:selected').text(result.deal.Deal_Stage);
        $('#txtDealAwardingAgencycode').val(result.deal.Deal_Awarding_Agency_code);
        $('#txtDealAwardingSubAgencycode').val(result.deal.Deal_Awarding_Agency_name);
        $('#txtDealFundingSubAgencyCode').val(result.deal.Deal_Funding_Agency_Name);
        SubAgencyCode = result.deal.Deal_funding_sub_agency_code;
        SubAgencyNameDeals = result.deal.Deal_Funding_Agency_Name;
        $('#txtDealFundingSubAgencyName').val(result.deal.Deal_funding_sub_agency_name);
        $('#DDAwardType').val(result.deal.Deal_Award_Type);
        $('#txtDealPSC').val(result.deal.Deal_PSC_code);
        $('#txtDealPSCDesc').val(result.deal.Deal_PSC_Description);
        $('#txtDealPotentialAwardAmount').val(result.deal.Deal_Potential_Award_Amount);
        $('#Priority option:selected').text(!result.deal.Deal_Priority ? "Please Choose one" : result.deal.Deal_Priority);
        $('#txtDealSamGovLink').val(result.deal.Deal_SamGov_Link);
        /*  $('#txtDealDueDate').val(result.deal.Deal_RFP_Release_Date);*/
        document.getElementById("txtDealDueDate").valueAsDate = new Date(result.deal.Deal_RFP_Release_Date);
        $('#DDAwardType option:selected').text(result.deal.DDAwardType);
        $('#DDSetAside option:selected').text(result.deal.Deal_Set_Aside);
        $('#txtSetAside').val(result.deal.Deal_Set_Aside_Description);
        //$('#dateexpiry').val(new Date(result.deal.Deal_Expiration_Date));
        document.getElementById("dateexpiry").valueAsDate = new Date(result.deal.Deal_Expiration_Date);
    $("#Award").val(result.deal.multi_single_award);
  
    $('#Award option:selected').text(!result.deal.multi_single_award ? "Please Choose one"
        : result.deal.multi_single_award);
        $('#userid').val(result.deal.user_id);
        $('#user_domain').val(result.deal.user_domain);
    $("#DType").val(result.deal.deal_type);
    $("#organizationList").val(result.deal.organization_id)
    $("#DType").trigger("change")
        $('#txtDescription').val(result.deal.Description);
    }

function onChangeDealType() {
   
    if ($("#DType").val() == 'Commercial') {
        $("#peopleSection").show()
    } else {
        $("#peopleSection").hide()
    }

}