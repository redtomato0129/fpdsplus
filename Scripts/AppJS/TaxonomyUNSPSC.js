$(document).ready(() => {
    getSegments();

    $(document).on("click", "#btndeptrowclear_2", function (e) {
        e.preventDefault();
        $("#searchFamilyInput").val("");
        $("#searchClassInput").val("");
        $("#searchCommodityInput").val("");
        $("#family_records").html("");
        $("#class_records").html("");
        $("#commodity_records").html("");
        $("#tableBodyFamily").html("");
        $("#tableBodyClass").html("");
        $("#tableBodyCommodity").html("");
        setTimeout(function () {
            $('#txtdept_2').val('');
            $('#lbldept_2').text('');
        }, 1000);
    });
})

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

function showList() {
    $("#txtdept_2").val("");
   
    $("#txtdept_2").focus()
    

}

function getSegments() {
    $('.OpenDeptPopup').disableAutoFill();
    $("#txtdept_2").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/TaxonomyUNSPSC/GetSegmentList",
                enctype: 'multipart/form-data',
                data: {
                    search_text: request.term
                },
                success: function (resp) {
                    const data = JSON.parse(resp)


                    data.records.length == 0 ? response([]) : response($.map(data.records, function (item) {

                        return {
                            label: item.segmentname,
                            value: item.segmentname,
                            values2:item.segment
                        };
                    }));
                }
            });
        },
        minLength: 0,
        select: function (event, ui) {
         
            $('#txtdept_2').val(ui.item.label);
          
           // $('#lbldept_2').text(ui.item.value.trim());
            getFamilies(ui.item.values2)
            //gets the select value from autocomplete
        },
        open: function () {
            $(".ui-autocomplete").scrollTop(0);
        }
    }).focus(function () {
        $(this).autocomplete("search", "");
    });;
    
}

let g_segment = "";
let g_family = "";

function getFamilies(segment) {
    $.ajax({
        type: "POST",
        data: { segment: segment, search_text: '', search_type: 'List' },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/GetFamilyList",
        success: function (result) {
            g_segment = segment;
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#searchCommodityInput").val("");
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                $("#searchClassInput").val("");
                $("#class_records").html("");
                $("#tableBodyClass").html("");
                $("#searchFamilyInput").val("");
                $("#family_records").html("");
                $("#tableBodyFamily").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#family_records").html(`Showing ${records[0].total_rows} Families`)
                    let html = "";
                    html = html + `<tr style ='cursor:pointer;' onclick='getClasses("${records[b].family}");'>
                                    <td>${records[b].family}</td>
                                    <td>${records[b].familyname}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    $("#tableBodyFamily").append(html);
                }
            }
            else {
                //$("#tableBodyFamily").html("");
                $("#family_records").html(`No Family Found`)
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyFamily").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")
        }
    });
}

function getClasses(family) {
    $.ajax({
        type: "POST",
        data: { family: family, search_text: '', search_type: 'List' },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/GetClassList",
        success: function (result) {
            g_family = family;
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#searchCommodityInput").val("");
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                $("#searchClassInput").val("");
                $("#class_records").html("");
                $("#tableBodyClass").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#class_records").html(`Showing ${records[0].total_rows} Classes`)
                    let html = "";
                    html = html + `<tr style ='cursor:pointer;' onclick='getCommodities("${records[b].classNo}");'>
                                    <td>${records[b].classNo}</td>
                                    <td>${records[b].classname}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    $("#tableBodyClass").append(html);
                }
            }
            else {
                //$("#tableBodyClass").html("");
                $("#class_records").html(`No Class Found`)
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyClass").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")
        }
    });
}

function getCommodities(classNo) {
    $.ajax({
        type: "POST",
        data: { classNo },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/GetCommodityList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#searchCommodityInput").val("");
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#commodity_records").html(`Showing ${records[0].total_rows} Commodities`)
                    let html = "";
                    if (!records[b].SEWP_VI_Note) {
                        html = html + `<tr>
                                    <td>${records[b].Commodity}</td>
                                    <td>${records[b].CommodityName}</td>
                                    <td></td>
                                   </tr>`;
                    }
                    else {
                        html = html + `<tr>
                                    <td>${records[b].Commodity}</td>
                                    <td>${records[b].CommodityName}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    }
                    $("#tableBodyCommodity").append(html);
                }
            }
            else {
                //$("#tableBodyCommodity").html("");
                $("#commodity_records").html(`No Commodity Found`)
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyCommodity").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")
        }
    });
}

let timeoutId1, timeoutId2, timeoutId3;

function delayedSearchFamily(event) {

    clearTimeout(timeoutId1);

    timeoutId1 = setTimeout(function () {
        searchFamily(event);
    }, 500);
}

function searchFamily(event) {
    let searchKeyword = event.target.value;
    console.log("----", g_segment)
    if (searchKeyword.length > 2) {
        showSearchedFamily(g_segment, searchKeyword, 'Search');
    } else if (searchKeyword.length == 0) {
        showSearchedFamily(g_segment, "", 'Search');
    }
}

function delayedSearchClass(event) {

    clearTimeout(timeoutId2);

    timeoutId2 = setTimeout(function () {
        searchClass(event);
    }, 500);
}

function searchClass(event) {
    let searchKeyword = event.target.value;
    console.log("----", g_family)
    if (searchKeyword.length > 2) {
        showSearchedClass(g_family, searchKeyword, 'Search');
    } else if (searchKeyword.length == 0) {
        showSearchedClass(g_family, "", 'Search');
    }
}

function delayedSearchCommodity(event) {

    clearTimeout(timeoutId3);

    timeoutId3 = setTimeout(function () {
        searchCommodity(event);
    }, 500); 
}

function searchCommodity(event) {
    //$("#commodity_records").html("");
    //$("#tableBodyCommodity").html("");
    let searchKeyword = event.target.value;
    if (searchKeyword.length > 1) {
        showSearchedCommodity(searchKeyword);
    } else if (searchKeyword.length == 0) {
        showSearchedCommodity("");
    }
}

function showSearchedFamily(segment, search_text, search_type) {
    $.ajax({
        type: "POST",
        data: { segment, search_text, search_type },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/GetFamilyList",
        success: function (result) {
            g_segment = segment;
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#searchCommodityInput").val("");
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                $("#searchClassInput").val("");
                $("#class_records").html("");
                $("#tableBodyClass").html("");
                $("#family_records").html("");
                $("#tableBodyFamily").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#family_records").html(`Showing ${records[0].total_rows} Families`)
                    let html = "";
                    html = html + `<tr style ='cursor:pointer;' onclick='getClasses("${records[b].family}");'>
                                    <td>${records[b].family}</td>
                                    <td>${records[b].familyname}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    $("#tableBodyFamily").append(html);
                }
            }
            else {
                //$("#tableBodyFamily").html("");
                $("#family_records").html(`No Family Found`)
                $("#tableBodyFamily").html("");
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyFamily").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")
        }
    });
}

function showSearchedClass(family, search_text, search_type) {
    $.ajax({
        type: "POST",
        data: { family, search_text, search_type },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/GetClassList",
        success: function (result) {
            g_family = family;
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#searchCommodityInput").val("");
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                $("#class_records").html("");
                $("#tableBodyClass").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#class_records").html(`Showing ${records[0].total_rows} Classes`)
                    let html = "";
                    html = html + `<tr style ='cursor:pointer;' onclick='getCommodities("${records[b].classNo}");'>
                                    <td>${records[b].classNo}</td>
                                    <td>${records[b].classname}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    $("#tableBodyClass").append(html);
                }
            }
            else {
                //$("#tableBodyClass").html("");
                $("#class_records").html(`No Class Found`)
                $("#tableBodyClass").html("");
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyClass").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")

        }
    });
}

function showSearchedCommodity(search_text) {
    $.ajax({
        type: "POST",
        data: { search_text },
        enctype: 'multipart/form-data',
        url: "/TaxonomyUNSPSC/SearchCommodityList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#commodity_records").html("");
                $("#tableBodyCommodity").html("");
                for (let b = 0; b < records.length; b++) {
                    console.log("total records: ", records[0].total_rows)
                    if (records[0].total_rows < 2000) {
                        $("#commodity_records").html(`Showing ${records[0].total_rows} of ${records[0].total_rows} Commodities`)
                    } else {
                        $("#commodity_records").html(`Showing 2000 of ${records[0].total_rows} Commodities`)
                    }
                    let html = "";
                    if (!records[b].SEWP_VI_Note) {
                        html = html + `<tr>
                                    <td>${records[b].Commodity}</td>
                                    <td>${records[b].CommodityName}</td>
                                    <td></td>
                                   </tr>`;
                    }
                    else {
                        html = html + `<tr>
                                    <td>${records[b].Commodity}</td>
                                    <td>${records[b].CommodityName}</td>
                                    <td>${records[b].SEWP_VI_Note}</td>
                                   </tr>`;
                    }
                    $("#tableBodyCommodity").append(html);
                }
            }
            else {
                //$("#tableBodyClass").html("");
                $("#commodity_records").html(`No Commodity Found`)
                $("#tableBodyCommodity").html("");
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyCommodity").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")

        }
    });
}