var SolicitationNo = "";
var naics_code = "";
var department_code = "";
var agency_code = "";
var solicitation = "";


$(document).ready(function () {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    SolicitationNo = getParameterByName("SONO");

    if (SolicitationNo != "") {
        $('.Apploader').show();
        $('.SolicitationPartial').show();
        getSolicitationNo(SolicitationNo);
    }

   

});

$(document).on('click', '#btnOkCompetitiveVendor', function () {
  
    var funding_agency = $('#Department_IndAgency').text(); // funding agency
    var funding_subagency = $('#SubTier').text();
    var naics_description = $('#naics_description').text();  // naics_description
    
    $('#CompetitiveVendor').modal('toggle');
    var end_year = new Date().getUTCFullYear();
    var start_year = end_year - 3;
    

    window.open(window.location.origin + '/VendorSearch/Index?&AgencyCode=' + agency_code + '&Agency=' + funding_subagency + '&Dept=' + funding_agency + '&DeptCode=' + department_code + '&Naics=' + naics_code + '&Businesssize=All&FYStart=' + start_year + '&FYEnd=' + end_year + '&MinimumContractSize=0', '_blank');

});

$(document).on('click', '#btnCancelCompetitiveVendor', function () {
    $('#CompetitiveVendor').modal('toggle');
});

$(document).on('click', '#btnRelatedVendors', function () {
    var funding_agency = $('#Department_IndAgency').text();
    var display_naics = naics_code;
    if (funding_agency == "") {
        funding_agency = "agency";
    }
    if (naics_code == "") {
        display_naics = "NAICS";
        swal("","No NAICS code found.", "");
    }
    else {
        $("#pastPerformanceText").html("Press OK to see a list of Vendors with Past Performance in " + funding_agency + " and " + display_naics + " within the previous 3 years. <br/><br/> In the next panel, you will see a list of competitive vendors within this customer and NAICS code.<br/><br/> Adjust your search as needed (SB, Socio-Economic, FY Range)");

        $('#CompetitiveVendor').modal('toggle');
    }
});

function getSolicitationNo(SolicitationNo) {
   
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/OppSolicitation/GetSoliciDetails",
        data: "{'SolicitationNo': '" + SolicitationNo + "'}",
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

function BindData(result) {
    solicitation = result[0].SolicitationNo;
    naics_code = result[0].naics_code;
    department_code = result[0].CGAC;
    agency_code = result[0].FPDSCode;
    $('#Title').text(result[0].Title);
    $('#Department_IndAgency').text(result[0].Department_IndAgency);
    $('#SubTier').text(result[0].SubTier);
    $('#TYPE').text(result[0].Type);
    $('#SolicitationNo').text(result[0].SolicitationNo);
    //$('#naics_description').text(result[0].naics_description);
    $('#naics_code').text('(' + result[0].naics_code + ')');
    var Naics = result[0].naics_code;
    if (Naics != "") {
        GetNaics(Naics);
    }
    //$('#psc_description').text(result[0].psc_description);
    if (result[0].product_or_service_code.length > 0) {
        $('#psc_code').text('(' + result[0].product_or_service_code + ')');
    } else {
        $('#psc_code').text('');
    }
    var PSC = result[0].product_or_service_code;
    if (PSC != "") {
        getpsc(PSC);
    }
    var BindDataCard = "";
    var addclass = "";

    for (var i = 0; i < result.length; i++) {

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


        var AwadrDescpLen = result[i].Description.length;
        var text = '';
        if (AwadrDescpLen > '238') {
            //text = '<div class="profile-description"><div class="text show-more-height"><label class="Co_010">' + result[i].Description + ' </label></div><label class="show-more" id="myBtn">(Show More)</label></div>';
            text = '<div id="module"><p class="collapse Co_010" id="collapseExample_' + (i + 1) + '" aria-expanded="false">' + result[i].Description + ' </p><a class="collapsed" data-toggle="collapse" href="#collapseExample_' + (i + 1) + '" aria-expanded="false" aria-controls="collapseExample"></a></div> ';
        }
        else {
            text = '<label class="Co_010">' + result[i].Description + ' </label>';

        }

        if (i == 0) {
            addclass = "FirstCard"
        }
        else {
            addclass = "accordion";
        }
        var addressLine = "";
        var cityStZip = "";
        if (result[i].addressLine === undefined) {
            addressLine = "";
        }
        if (result[i].CityStZip === undefined) {
            cityStZip = "";
        }

        if (result[i].addressLine !== "") {
            addressLine = result[i].addressLine;
        }
        if (result[i].addressLine !== "" && result[i].CityStZip !== "") {
            addressLine += ',' + result[i].CityStZip;
        }
     
        if (result[i].ClassificationCode === undefined) {
            result[i].ClassificationCode = "";
        }

        BindDataCard = BindDataCard.concat('<div class="card Co_004">' +
                    '<button class="'+addclass+'">'+
                        '<div class="card-header">' +

                         '<div class="col-md-12 row">' +
                                    '<div class="col-md-4"><label class="Co_001 Co_006">Posted Date</label>&nbsp;-&nbsp;<label class="Co_001 Co_006" id="PostedDate"><a href="' + result[i].Link + '"  target="_blank">' + result[i].PostedDate + ' <img src="/Content/assets/images/Logos/Sam_2.png" style="width:10%; margin-left: 4px;"></a> </label></div>' +
                                    '<div class="col-md-8"><label class="Co_001 Co_006">Title</label>&nbsp;-&nbsp;<label class="Co_001 Co_014">' + result[i].Title + '</label></div>' +

                                  //'<div class="col-md-4"><label class="Co_001 Co_006">Award Type</label>&nbsp;-&nbsp;<label class="Co_001 Co_006">' + result[i].award_type + ' </label></div><div class="col-md-4"><label class="Co_001 Co_006">type of set aside-</label><label class="Co_001 Co_006">' + result[i].type_of_set_aside + ' </label></div>' +
                        '</div></div>' +
                    '</button>'+
                        //'<div class="card-body">' +
                        //    '<div class="d-flex no-block align-items-center">' +
                        '<div class="panel" style="max-height:0px !important;">' +

                            '<div class="row" style="padding: 15px 18px;">' +

                                '<div class="col-lg-12 row">' +
                                    '<div class="col-lg-3"><label class="Co_009">Title :</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].Title + '</label></div>' +
                                    '<div class="col-lg-3"><label class="Co_009">Posted Date:</label></div>' +
                                    '<div class="col-lg-2"><label class="Co_010">' + result[i].PostedDate + '</label></div>' +
                                '</div>' +

                                '<div class="col-lg-12 row">' +
                                     '<div class="col-lg-3"><label class="Co_009">Sub Tier:</label></div>' +
                                     '<div class="col-lg-4"><label class="Co_010">' + result[i].SubTier + '</label></div>' +
                                     '<div class="col-lg-3"><label class="Co_009">Set ASide Code:</label></div>' +
                                     '<div class="col-lg-2"><label class="Co_010">' + result[i].SetASideCode + '</label></div>' +
                                '</div>' +

                                '<div class="col-lg-12 row">' +
                                    '<div class="col-lg-3"><label class="Co_009">Office:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + result[i].Office + '</label></div>' +

                                 '</div>' +

                                 '<div class="col-lg-12 row">' +
                                     '<div class="col-lg-3"><label class="Co_009">Primary Contact FullName:</label></div>' +
                                     '<div class="col-lg-4"><label class="Co_010">' + result[i].PrimaryContactFullName + '</label></div>' +
                                     '<div class="col-lg-3"><label class="Co_009">Primary Contact Title:</label></div>' +
                                     '<div class="col-lg-2"><label class="Co_010">' + result[i].PrimaryContactTitle + ' </label></div>' +
                                 '</div>' +

                                    '<div class="col-lg-12 row">' +
                                    '<div class="col-lg-3"><label class="Co_009">Address:</label></div>' +
                                    '<div class="col-lg-4"><label class="Co_010">' + addressLine + ' </label></div>' +
                                    '<div class="col-lg-3"><label class="Co_009">Classification Code:</label></div>' +
                                    '<div class="col-lg-2"><label class="Co_010">' + result[i].ClassificationCode + ' </label></div>' +
                                    '</div>' +

                                  '<div class="col-lg-12 row">' +
                                     '<div class="col-lg-3"><label class="Co_009">Type:</label></div>' +
                                     '<div class="col-lg-4"><label class="Co_010">' + result[i].Type + ' </label></div>' +
                                    '<div class="col-lg-3"><label class="Co_009">BaseType:</label></div>' +
                                    '<div class="col-lg-2"><label class="Co_010">' + result[i].BaseType + ' </label></div>' +
                                    '</div>' +

                                 '<div class="col-lg-12 row">' +
                                    '<div class="col-lg-3 Ops001"><label class="Co_009">Award Description:</label></div>' +
                                    '<div class="col-lg-9 Ops001">' + text + '</div>' +
                                '</div>' +
                                
                             '</div>' +

                             '</div>' +
                         // '</div>' +
                         //'</div>'+
                         '</div>');
    }
    $("#BindContractData").append(BindDataCard);


    //var acc = document.getElementsByClassName("accordion");
    //var i;

    //for (i = 0; i < acc.length; i++) {
    //    if (acc[i] == '1') {
    //        $("p:first").addClass("intro");
    //    }
    //}
    $('.FirstCard').trigger('click');
}

$(document).on('click', '.accordion', function () {

    //acc[i].addEventListener("click", function () {

    //console.log(acc[i]);
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        //alert('open');

    } else {
        //panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = "0px";

        //alert('close');
        //alert(panel.scrollHeight);

    }
});

$(document).on('click', '.FirstCard', function () {

    //acc[i].addEventListener("click", function () {

    //console.log(acc[i]);
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        //alert('open');

    } else {
        //panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = "0px";

        //alert('close');
        //alert(panel.scrollHeight);

    }
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

function GetNaics(Naics) {
    var NaicsCodeval = Naics;
    if (NaicsCodeval.length == '6') {
        


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NaicsCodeval + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#naics_description').text(result[0]);
                }
                else {
                    $('#naics_description').text("");
                }



            },
            error: function ajaxError(err) {
                swal("", err);

            }
        });
    }
   
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
                $('#psc_description').text(result[0]);
            }
            else {
                $('#psc_description').text("");
            }

            $('.Apploader').hide();

        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });

}

//$(document).on('click', '.show-more', function () {

//    if ($(this).closest('div.text').hasClass("show-more-height")) {
//        $(this).text("(Show Less)");
//    } else {
//        $(this).text("(Show More)");
//    }
//    //$(this).closest('div.text').toggleClass("show-more-height");
//    var vv = $(this).parents('div.text');
//    $(this).closest("p").toggleClass("show-more-height");
//    //$(this).closest('div').find('.text').toggleClass("show-more-height");


//});