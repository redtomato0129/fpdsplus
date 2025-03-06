var contractno = "";
var IDV = "";
let ContractDetailExcel = [];
var BreadCrums = "";
var cage = "";
var DUNS_Value = "";

var naics_code = "";
var funding_agency_name = "";
var funding_subagency_name = "";
var dept_code = "";
var agency_code = "";

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function copyToClipboard() {
    var tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    swal.fire({
        title: "",
        text: "URL copied to clipboard!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {

   

    contractno = getParameterByName("CTNO");
    BreadCrums = getParameterByName("PG");
    cage = getParameterByName("CG");
    DUNS_Value = getParameterByName("DU");
    
    CP = getParameterByName("CP");
    CP = window.atob(CP);
    if (CP === "null" || CP === "") {
        $('#ContractPricing').text("0");
    }
    else {
        $('#ContractPricing').text(CP);
    }

    
    //alert(BreadCrums);
    $('.sear').text(BreadCrums);
    //alert(contractno);
    IDV = getParameterByName("IDVNO");
    //alert(IDV);

    if (contractno != "") {
        $('.ContractPartial').show();
        getcontractno();
    }

    if (IDV != "") {
        $('.ReferanceIDVPartial').show();
        getReferenceIDV();
        //alert(IDV);

    }

});

$(document).on('click', '#btnContractPastPerformance', function () {

    var funding_agency  = $('#funding_agency_name').text();
    var funding_sub_agency = $('#funding_sub_agency_name').text();
   
    if (funding_agency == "") {
        funding_agency = "agency";
    }
    if (naics_code == "") {
        display_naics = "NAICS";
        swal("No NAICS code found.", "");
    }
    else {
        $("#pastPerformanceText").html("Press OK to see a list of vendors with Past Performance in " + funding_agency + "," + funding_sub_agency + " and " + naics_code + " within the previous 3 years. <br/><br/> In the next panel, you will see a list of competitive vendors within this customer and NAICS code.<br/><br/> Adjust your search as needed (SB, Socio-Economic, FY Range)");

        $('#CompetitiveContractor').modal('toggle');
    }
});

$(document).on('click', '#btnCancelCompetitiveContractor', function () {
    $('#CompetitiveContractor').modal('toggle');
});

$(document).on('click', '#btnOkCompetitiveContractor', function () {

    var funding_agency = $('#funding_agency_name').text();
    var funding_sub_agency = $('#funding_sub_agency_name').text();
    var DeptCode = dept_code;
    var AgencyCode = agency_code;

    $('#CompetitiveContractor').modal('toggle');
    var end_year = new Date().getUTCFullYear();
    var start_year = end_year - 3;


    window.open(window.location.origin + '/VendorSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&Agency=' + funding_sub_agency + '&Dept=' + funding_agency + '&Naics=' + naics_code + '&Businesssize=All&FYStart=' + start_year + '&FYEnd=' + end_year + '&MinimumContractSize=0', '_blank');
  
});

$(document).on('click', '#btnIDVPastPerformance', function () {

   

    if (funding_agency_name == "") {
        funding_agency_name = "funding agency";
    }
    if (funding_subagency_name == "") {
        funding_agency_name = "funding sub agency";
    }
    if (naics_code == "") {
        display_naics = "NAICS";
        swal("No NAICS code found.", "");
    }
    else {
        $("#IDVpastPerformanceText").html("Press OK to see a list of vendors with Past Performance in " + funding_agency_name + "," + funding_subagency_name + " and " + naics_code + " within the previous 3 years. <br/><br/> In the next panel, you will see a list of competitive vendors within this customer and NAICS code.<br/><br/> Adjust your search as needed (SB, Socio-Economic, FY Range)");

        $('#IDVCompetitiveContractor').modal('toggle');
    }
});

$(document).on('click', '#btnCancelIDVCompetitiveContractor', function () {
    $('#IDVCompetitiveContractor').modal('toggle');
});

$(document).on('click', '#btnOkIDVCompetitiveContractor', function () {

    var funding_agency = funding_agency_name;
    var funding_sub_agency = funding_subagency_name;
    var DeptCode = dept_code;
    var AgencyCode = agency_code;

    $('#IDVCompetitiveContractor').modal('toggle');
    var end_year = new Date().getUTCFullYear();
    var start_year = end_year - 3;

    window.open(window.location.origin + '/VendorSearch/Index?&DeptCode=' + DeptCode + '&AgencyCode=' + AgencyCode + '&Agency=' + funding_sub_agency + '&Dept=' + funding_agency + '&Naics=' + naics_code + '&Businesssize=All&FYStart=' + start_year + '&FYEnd=' + end_year + '&MinimumContractSize=0', '_blank');

});

function getcontractno() {
    $("#dvPastPerformance").hide();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Contract/GetContractNumberDetail",
        data: "{'contractno': '" + contractno + "','DUNS': '" + DUNS_Value + "'}",

        dataType: "json",
        async: false,
        success: function (result) {

            BindData(result);
            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}

function getReferenceIDV() {
    $("#dvPastPerformance").show();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Contract/getReferenceIDVDetail",
        data: "{'IDV': '" + IDV + "'}",

        dataType: "json",
        async: false,
        success: function (result) {
            BindIVDData(result);


            $('.Apploader').hide();
        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });
}



function BindData(result) {
    $('#funding_agency_name').text(result[0].funding_agency_name);
    $('#funding_sub_agency_name').text(result[0].funding_sub_agency_name);
    $('.recipient_name').text(result[0].recipient_name);
    $('#awarding_agency_name').text(result[0].awarding_agency_name);
    $('#awarding_sub_agency_name').text(result[0].awarding_sub_agency_name);
    $('#naics_description').text(result[0].naics_description);
    $('#naics_code').text('(' + result[0].naics_code + ')');
    naics_code = result[0].naics_code;
    dept_code = result[0].funding_agency_code;
    agency_code = result[0].funding_sub_agency_code;
    var BindDataCard = "";

    for (var i = 0; i < result.length; i++) {

        if (result[i].modification_number == "0") {
            $('#psc_description').text(result[i].product_or_service_code_description);
            $('#psc_code').text('(' + result[i].product_or_service_code + ')');
            $('#funding_office_name').text(result[i].funding_office_name);
            $('#funding_office_code').text(result[i].funding_office_code);
            $('#award_type').text(result[i].award_type);
            $('#type_of_set_aside').text(result[i].type_of_set_aside);
        }

        var base_and_exercised_options_value1 = parseFloat((result[i].base_and_exercised_options_value)).toFixed(2);
        var base_and_exercised_options_value = CommaFormatted(base_and_exercised_options_value1);

        var base_and_all_options_value1 = parseFloat((result[i].base_and_all_options_value)).toFixed(2);
        var base_and_all_options_value = CommaFormatted(base_and_all_options_value1);

        var federal_action_obligation1 = parseFloat((result[i].federal_action_obligation)).toFixed(2);
        var federal_action_obligation = CommaFormatted(federal_action_obligation1);

        var actiondate = result[i].action_date;
        var periodstartdate = result[i].period_of_performance_start_date;

        var periodenddate = result[i].period_of_performance_current_end_date;
        var potentialdate = result[i].period_of_performance_potential_end_date;


        var AwadrDescpLen = result[i].award_description.length;
        //var AwadrDesc = "SYNOPSIS: THIS PROPOSED PROCUREMENT IS SET-ASIDE FOR SMALL BUSINESSES.  THE NAICS IS 561720 WITH SIZE STANDARD OF $19,500,000. A CONTRACT IS REQUIRED FOR JANITORIAL SERVICES IN SEVEN LOCATIONS IN DELAWARE.  ADDITIONAL INFORMATION IN ACCORDANCE WITH THE PERFORMANCE WORK STATEMENT IS INCLUDED IN THE REQUEST FOR QUOTATION PACKAGE. ALL QUESTIONS SHALL BE SUBMITTED BY 10 MARCH 2021, 12:00 PM BY EMAIL TO RYANDALE.R.FERNANDEZ@USACE.ARMY.MIL QUOTES SHALL ONLY BE SUBMITTED TO EMAIL RYANDALE.R.FERNANDEZ@USACE.ARMY.MIL THE SOLICITATION WILL BE PROVIDED IN AN ELECTRONIC FORMAT, FREE OF CHARGE ON OR ABOUT 23 FEBRUARY 2021, TO ALL AUTHENTICATED ACCOUNT HOLDERS OF BETASAM.GOV.  TO FAMILIARIZE VENDORS WITH THE NEWLY RELEASED BETASAM SYSTEM, PLEASE REVIEW THE BETASAM.GOV WEBSITE.  NOTE THAT ALL CORPS OF ENGINEERS ACQUISITIONS ARE CONSIDERED SENSITIVE, BUT UNCLASSIFIED DOCUMENTS, AND REQUIRE USERS TO HAVE A VALID ACCOUNT ENTERED IN THE BETASAM SYSTEM TO ACCESS THE PACKAGE. THE MEDIA THROUGH WHICH THE GOVERNMENT CHOOSES TO ISSUE THIS SOLICITATION WILL BE THE INTERNET ONLY. THIS SOLICITATION WILL NOT BE ISSUED IN PAPER. NO PHONE OR FAX REQUEST FOR A COPY OF SOLICITATION WILL BE ACCEPTED.";
        //var AwadrDescpLen = AwadrDesc.length;
        // alert(AwadrDescpLen);
        var text = '';
        if (AwadrDescpLen > '238') {
            // text = '<div id="profile-description"><div class="text show-more-height"><label class="Co_010">' + result[i].award_description + ' </label></div><div class="show-more">(Show More)</div></div>';
            text = '<div id="profile-description"><p class="collapse Co_010" id="collapseExample_' + (i + 1) + '" aria-expanded="false">' + result[i].award_description + ' </p><a class="collapsed" data-toggle="collapse" href="#collapseExample_' + (i + 1) + '" aria-expanded="false" aria-controls="collapseExample"></a></div> ';
        }
        else {
            text = '<label class="Co_010">' + result[i].award_description + ' </label>';

        }

        var city = result[i].primary_place_of_performance_city_name.length > 0 ? result[i].primary_place_of_performance_city_name : '';

        var state = result[i].primary_place_of_performance_state_name.length > 0 ? result[i].primary_place_of_performance_state_name : '';

        var country = result[i].primary_place_of_performance_country_name.length > 0 ? result[i].primary_place_of_performance_country_name : '';

        //var address = city + ',' + state + ',' + country;
        //address = address.toString();
        //var bindPlaceDetail = address.replace(",,", ",");
        //if (bindPlaceDetail[0] == ',') {
        //    bindPlaceDetail = bindPlaceDetail.replace(",", "");
        //}
        //if (bindPlaceDetail[bindPlaceDetail.length - 1] === ',') {
        //    bindPlaceDetail = bindPlaceDetail.slice(0, -1);
        //}
        //address = bindPlaceDetail;


      
        BindDataCard = BindDataCard.concat('<div class="card Co_004">' +
            '<div class="card-header">' +
                        '<div class="row">' +
            '<div class="col-md-12">' +
            '<label class="Co_001 Co_006">Award ID</label>&nbsp;-&nbsp;<label class="Co_001 Co_006" id="AwardID"></label><label class="Co_001 Co_006" id="ModificationNumber">( ' + result[i].modification_number + ' )</label>&nbsp;&nbsp;<a style="font-size: 11px;" href="' + result[i].usaspending_permalink + '"  target="_blank">' + result[i].award_id + '<img class="Com_007" src="/Content/assets/images/Logos/USA_1.png" /></a>' +
                                    //'<div class="col-md-4"><label class="Co_001 Co_006">Award Type</label>&nbsp;-&nbsp;<label class="Co_001 Co_006">' + result[i].award_type + ' </label></div><div class="col-md-4"><label class="Co_001 Co_006">type of set aside&nbsp;-&nbsp;</label><label class="Co_001 Co_006">' + result[i].type_of_set_aside + ' </label></div>' +
                                    '</div>' +
                        '</div></div>' +

                        '<div class="card-body">' +
                            '<div class="row">' +

                                '<div class="col-lg-12 row">' +
                                    //'<div class="col-lg-3"><label class="Co_009">funding office name :</label></div>' +
                                    //'<div class="col-lg-4"><label class="Co_010">' + result[i].funding_office_name + '</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_008">base and all options value (Contract value):</label></div>' +
                                     '<div class="col-lg-12"><label class="Co_007">$' + base_and_all_options_value + ' </label></div>' +
                                    '<div class="col-lg-12"><label class="Co_008">Action Date (DATE SIGNED):</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_007">' + actiondate + '</label></div>' +
                                '</div>' +

                                '<div class="col-lg-12 row">' +
                                     //'<div class="col-lg-3"><label class="Co_009">funding office code:</label></div>' +
                                     //'<div class="col-lg-4"><label class="Co_007">' + result[i].funding_office_code + '</label></div>' +
                                     '<div class="col-lg-12"><label class="Co_008">Base and excercised options value:</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_007">$' + base_and_exercised_options_value + ' </label></div>' +
                                     '<div class="col-lg-12"><label class="Co_008">Action Date Fiscal Year (FY):</label></div>' +
                                     '<div class="col-lg-12"><label class="Co_007">' + result[i].action_date_fiscal_year + '</label></div>' +
                                '</div>' +

                                '<div class="col-lg-12 row">' +
                                    //'<div class="col-lg-3"><label class="Co_008">PSC:</label></div>' +
                                    //'<div class="col-lg-4"><label class="Co_007">' + result[i].product_or_service_code_description + ' (' + result[i].product_or_service_code + ')</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_008">federal action obligation:</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_007">$' + federal_action_obligation + '</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_008">Period of Performance Start date:</label></div>' +
                                    '<div class="col-lg-12"><label class="Co_007">' + periodstartdate + ' </label></div>' +
                                '</div>' +

                                '<div class="col-lg-12 row">' +
                                '<div class="col-lg-12"><label class="Co_008">Place of Performance:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007"></label></div>' +
                                '<div class="col-lg-12"><label class="Co_008">Period of Performance End date:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007">' + periodenddate + '</label></div>' +
                                '</div>' +
                                '<div class="col-lg-12 row">' +
                                '<div class="col-lg-12"><label class="Co_008">City:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007">' + city + '</label></div>' +
                                '<div class="col-lg-12"><label class="Co_008">Period of Performance Potential End date:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007">' + potentialdate + ' </label></div>' +
                                '</div>' +
                                '<div class="col-lg-12 row">' +
                                '<div class="col-lg-12"><label class="Co_008">State:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007">' + state + '</label></div>' +
                                '<div class="col-lg-12"><label class="Co_008"></label></div>' +
                                '<div class="col-lg-12"><label class="Co_007"> </label></div>' +
                                '</div>' +
                                '<div class="col-lg-12 row">' +
                                '<div class="col-lg-12"><label class="Co_008">Country:</label></div>' +
                                '<div class="col-lg-12"><label class="Co_007">' + country + '</label></div>' +
                                '<div class="col-lg-12"><label class="Co_008"></label></div>' +
                                '<div class="col-lg-12"><label class="Co_007"> </label></div>' +
                                '</div>' +

           

                            '<div class="col-lg-12 row">' +
                            '<div class="col-lg-12"><label class="Co_008">Award Description:</label></div>' +
                            '<div class="col-lg-12">' + text + '</div>' +
                            '</div>' +
                             '</div>' +
                         '</div></div>');

        
        ContractDetailExcel.push({
            "CONTRACTOR": result[i].recipient_name,
            "AWARDING AGENCY": result[i].awarding_agency_name,
            "AWARDING SUB AGENCY": result[i].awarding_sub_agency_name,
            "NAICS": result[i].naics_description + '(' + result[i].naics_code + ')',
            "AWARD ID": result[i].award_id + '(' + result[i].modification_number + ')',
            "FUNDING OFFICE NAME": result[i].funding_office_name,
            "FUNDING OFFICE CODE": result[i].funding_office_code,
            "PSC": result[i].product_or_service_code_description + ' (' + result[i].product_or_service_code + ')',
            "BASE AND ALL OPTIONS VALUE (CONTRACT VALUE)": base_and_all_options_value,
            "BASE AND EXCERCISED OPTIONS VALUE": base_and_exercised_options_value,
            "FEDERAL ACTION OBLIGATION": federal_action_obligation,
            "AWARD DESCRIPTION": result[i].award_description,
            "ACTION DATE (DATE SIGNED)": actiondate,
            "ACTION DATE FISCAL YEAR (FY)": result[i].action_date_fiscal_year,
            "PERIOD OF PERFORMANCE START DATE": periodstartdate,
            "PERIOD OF PERFORMANCE END DATE": periodenddate,
            "PERIOD OF PERFORMANCE POTENTIAL END DATE": potentialdate
        });

    }
    $("#BindContractData").append(BindDataCard);
  
}

function BindIVDData(result) {

    console.log("resilt: ", result)
    naics_code = result[0].naics_code;
    funding_agency_name = result[0].funding_agency_name;
    funding_subagency_name = result[0].funding_sub_agency_name;
    dept_code = result[0].funding_agency_code;
    agency_code = result[0].funding_sub_agency_code;
    var gg = result[0].recipient_name;
    $('.recipient_name').text(result[0].recipient_name);
    //$('#product_or_service_code_description').text(result[0].product_or_service_code_description);

    $('.awarding_agency_name').text(result[0].awarding_agency_name);
    $('.awarding_sub_agency_name').text(result[0].awarding_sub_agency_name);
    $('.naics_description').text(result[0].naics_description);
    $('.naics_code').text('(' + result[0].naics_code + ')');
    $('.refidv').text(result[0].referenced_idv_id);

    //$('.psc_description').text(result[0].product_or_service_code_description);
    //$('.psc_code').text('( ' + result[0].product_or_service_code + ' )');




    var BindDataCard = "";

    for (var i = 0; i < result.length; i++) {

        //var base_and_exercised_options_value = CommaFormatted(result[i].base_and_exercised_options_value);
        // var federal_action_obligation = CommaFormatted(result[i].federal_action_obligation);
        // var base_and_all_options_value = CommaFormatted(result[i].base_and_all_options_value);
        var base_and_exercised_options_value1 = parseFloat((result[i].base_and_exercised_options_value)).toFixed(2);
        var base_and_exercised_options_value = CommaFormatted(base_and_exercised_options_value1);

        var base_and_all_options_value1 = parseFloat((result[i].base_and_all_options_value)).toFixed(2);
        var base_and_all_options_value = CommaFormatted(base_and_all_options_value1);

        var federal_action_obligation1 = parseFloat((result[i].federal_action_obligation)).toFixed(2);
        var federal_action_obligation = CommaFormatted(federal_action_obligation1);


        /* var base_and_exercised_options_value = parseFloat(CommaFormatted(result[i].base_and_exercised_options_value)).toFixed(2);
		var federal_action_obligation = parseFloat(CommaFormatted(result[i].federal_action_obligation)).toFixed(2);
		var base_and_all_options_value = parseFloat(CommaFormatted(result[i].base_and_all_options_value)).toFixed(2); */

        //var actiondatespl = actiondate.split('/');
        var actiondate = result[i].action_date;
        //var actionformattedDate = actiondatespl[1] + '/' + actiondatespl[0] + '/' + actiondatespl[2];


        var periodstartdate = result[i].period_of_performance_start_date;
        /*var periodstartdatespl = periodstartdate.split('/');
        var periodstartdateformattedDate = periodstartdatespl[1] + '/' + periodstartdatespl[0] + '/' + periodstartdatespl[2];*/


        var periodenddate = result[i].period_of_performance_current_end_date;
        /*var periodenddatespl = periodenddate.split('/');
        var periodenddateformattedDate = periodenddatespl[1] + '/' + periodenddatespl[0] + '/' + periodenddatespl[2]; */


        var potentialdate = result[i].period_of_performance_potential_end_date;
        /*var potentialdatespl = potentialdate.split('/');
        var potentialdateformattedDate = potentialdatespl[1] + '/' + potentialdatespl[0] + '/' + potentialdatespl[2];  */
        var AwadrDescpLen = result[i].award_description.length;

        //var AwadrDesc = "SYNOPSIS: THIS PROPOSED PROCUREMENT IS SET-ASIDE FOR SMALL BUSINESSES.  THE NAICS IS 561720 WITH SIZE STANDARD OF $19,500,000. A CONTRACT IS REQUIRED FOR JANITORIAL SERVICES IN SEVEN LOCATIONS IN DELAWARE.  ADDITIONAL INFORMATION IN ACCORDANCE WITH THE PERFORMANCE WORK STATEMENT IS INCLUDED IN THE REQUEST FOR QUOTATION PACKAGE. ALL QUESTIONS SHALL BE SUBMITTED BY 10 MARCH 2021, 12:00 PM BY EMAIL TO RYANDALE.R.FERNANDEZ@USACE.ARMY.MIL QUOTES SHALL ONLY BE SUBMITTED TO EMAIL RYANDALE.R.FERNANDEZ@USACE.ARMY.MIL THE SOLICITATION WILL BE PROVIDED IN AN ELECTRONIC FORMAT, FREE OF CHARGE ON OR ABOUT 23 FEBRUARY 2021, TO ALL AUTHENTICATED ACCOUNT HOLDERS OF BETASAM.GOV.  TO FAMILIARIZE VENDORS WITH THE NEWLY RELEASED BETASAM SYSTEM, PLEASE REVIEW THE BETASAM.GOV WEBSITE.  NOTE THAT ALL CORPS OF ENGINEERS ACQUISITIONS ARE CONSIDERED SENSITIVE, BUT UNCLASSIFIED DOCUMENTS, AND REQUIRE USERS TO HAVE A VALID ACCOUNT ENTERED IN THE BETASAM SYSTEM TO ACCESS THE PACKAGE. THE MEDIA THROUGH WHICH THE GOVERNMENT CHOOSES TO ISSUE THIS SOLICITATION WILL BE THE INTERNET ONLY. THIS SOLICITATION WILL NOT BE ISSUED IN PAPER. NO PHONE OR FAX REQUEST FOR A COPY OF SOLICITATION WILL BE ACCEPTED.";
        //var AwadrDescpLen = AwadrDesc.length;
        // alert(AwadrDescpLen);
        var text = '';

        if (AwadrDescpLen > '238') {
            // text = '<div id="profile-description"><div class="text show-more-height"><label class="Co_010">' + result[i].award_description + ' </label></div><div class="show-more">(Show More)</div></div>';
            text = '<div id="profile-description"><p class="collapse Co_010" id="collapseExample_' + (i + 1) + '" aria-expanded="false">' + result[i].award_description + ' </p><a class="collapsed" data-toggle="collapse" href="#collapseExample_' + (i + 1) + '" aria-expanded="false" aria-controls="collapseExample"></a></div> ';
        }
        else {
            text = '<label class="Co_010">' + result[i].award_description + ' </label>';

        }

        var city = result[i].primary_place_of_performance_city_name.length > 0 ? result[i].primary_place_of_performance_city_name : '';

        var state = result[i].primary_place_of_performance_state_name.length > 0 ? result[i].primary_place_of_performance_state_name : '';

        var country = result[i].primary_place_of_performance_country_name.length > 0 ? result[i].primary_place_of_performance_country_name : '';

        //var address = city + ',' + state + ',' + country;
        //address = address.toString();
        //var bindPlaceDetail = address.replace(",,", ",");
        //if (bindPlaceDetail[0] == ',') {
        //    bindPlaceDetail = bindPlaceDetail.replace(",", "");
        //}
        //if (bindPlaceDetail[bindPlaceDetail.length - 1] === ',') {
        //    bindPlaceDetail = bindPlaceDetail.slice(0, -1);
        //}
        //address = bindPlaceDetail;


        BindDataCard = BindDataCard.concat('<div class="card Co_004">' +
                        '<div class="card-header">' +
                         '<div class="col-md-12 row">' +
                                    '<div class="col-md-4"><label class="Co_001 Co_006">Award ID</label>&nbsp;-&nbsp;<label class="Co_001 Co_006" id="AwardID"></label><label class="Co_001 Co_006" id="ModificationNumber">( ' + result[i].modification_number + ' )</label>&nbsp;&nbsp;<a  style="font-size: 11px;" href="' + result[i].usaspending_permalink + '"  target="_blank">' + result[i].award_id + '<img class="Com_007" src="/Content/assets/images/Logos/USA_1.png" /></a></div>' +
                                    '<div class="col-md-4"><label class="Co_001 Co_006">Award Type</label>&nbsp;-&nbsp;<label class="Co_001 Co_006">' + result[i].award_type + ' </label></div>' +
                                    //'<div class="col-md-4"><label class="Co_001 Co_006">type of set aside&nbsp;-&nbsp;</label><label class="Co_001 Co_006">' + result[i].type_of_set_aside + ' </label></div>' +
                        '</div></div>' +

                        '<div class="card-body">' +
                            '<div class="d-flex no-block align-items-center">' +
                            '<div class="row">' +
                                '<div class="col-lg-12 row">' +

                                     // ================================= //
                                    '<div class="col-lg-3"><label class="Co_009">PSC:</label></div>' +
            '<div class="col-lg-4"><label class="Co_010">' + result[i].product_or_service_code_description + ' (' + result[i].product_or_service_code+')'+'</label></div>' +

                                    '<div class="col-lg-3"><label class="Co_009">value:</label></div>' +
                                    '<div class="col-lg-2"><label class="Co_010">$' + base_and_all_options_value + '</label></div>' +
                                                                    

                                   // ================================= //
                                    '<div class="col-lg-3"><label class="Co_009">funding agency:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].funding_agency_name + '</label></div>' +

                                    '<div class="col-lg-3"><label class="Co_009">Action Date Fiscal Year (FY):</label></div>' +
                                    '<div class="col-lg-2" style="text-align:right"><label class="Co_010">' + result[i].action_date_fiscal_year + '</label></div>' +

                                    // ================================= //
                                    '<div class="col-lg-3"><label class="Co_009">solicitation identifier:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].solicitation_identifier + ' </label></div>' +

                                    '<div class="col-lg-3"><label class="Co_009">Action Date (Signed):</label></div>' +
                                    '<div class="col-lg-2" style="text-align:right"><label class="Co_010">' + actiondate + '</label></div>' +

                                    // ================================= //
                                    '<div class="col-lg-3"><label class="Co_009">funding sub agency:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].funding_sub_agency_name + '</label></div>' +

                                    '<div class="col-lg-3"><label class="Co_009">Period of Performance Start date:</label></div>' +
                                    '<div class="col-lg-2" style="text-align:right"><label class="Co_010">' + periodstartdate + ' </label></div>' +
                                    
                                    // ================================= //
                                    '<div class="col-lg-3"><label class="Co_009">major program:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].major_program + ' </label></div>' +

                                     '<div class="col-lg-3"><label class="Co_009">Period of Performance End date:</label></div>' +
                                    '<div class="col-lg-2" style="text-align:right"><label class="Co_010">' + periodenddate + '</label></div>' +

                                    // ================================= //
           
            '<div class="col-lg-3"><label class="Co_009">Primary Place of Performance:<br/><span>City: </span><br/><span>State: </span><br/><span>Country: </span></label></div>' +
            '<div class="col-lg-5"><label class="Co_010"><br/><span>' + city + '</span><br/><span>' + state + '</span><br/><span>' + country + '</span></label></div>' +
            '<div class="col-lg-4"><label class="Co_010"> </label></div>' +
            '<div class="col-lg-3"><label class="Co_009">Award Description:</label></div>' +
            '<div class="col-lg-9"><label class="Co_010">' + text + ' </label></div>' +

           
                                  '</div>' +

                                    '</div>' +

                                    '</div>' +

                                '</div>' +

                                '</div>');

    }
    $("#BindIDVContractData").append(BindDataCard);
}

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

$(document).on('click', '.show-more', function () {

    if ($(".text").hasClass("show-more-height")) {
        $(this).text("(Show Less)");
    } else {
        $(this).text("(Show More)");
    }

    $(".text").toggleClass("show-more-height");
});

$(document).on('click', '.recipient_name', function () {
    var vendorname = jQuery(this).text();
    window.open(window.location.origin + '/VendorSearch/Index?vendorname=' + vendorname + '&CG=' + cage, '_blank');
    
});

$(document).on('click', '#ExcelContract', function () {
    //$("#dvjson").excelexportjs({
    //    containerid: "dvjson",
    //    datatype: 'json',
    //    dataset: ContractDetailExcel,
    //    columns: getColumns(ContractDetailExcel),
    //    filename:'hello'
    //});

    //var options = {
    //    fileName: "hello"
    //};
    //Jhxlsx.export(ContractDetailExcel, options);

    var Contract = ContractDetailExcel[0].CONTRACTOR;

    var Filename = "ContractDetails - " + Contract + '.xlsx';
    var ws = XLSX.utils.json_to_sheet(ContractDetailExcel);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, Filename);
});

