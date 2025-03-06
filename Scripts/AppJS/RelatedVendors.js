var searchParameters = {};

$(document).ready(function () {

    set_Helpicon();

    searchParameters.agency_code = $("#agency_code").val();
    searchParameters.department_code = $("#department_code").val();
    searchParameters.naics_code = $("#naics_code").val();
    LoadRelatedVendorData();
    $('#relatedVendor_tbl tbody').on('click', 'tr', function () {
        var currentRowData = $('#relatedVendor_tbl').DataTable().row(this).data();
        window.open(window.location.origin + '/VendorSearch/Index?vendorname=' + currentRowData[1] + '&CG=' + currentRowData[2] + '&Type=Type2', '_blank');
        
        
    });
});

function LoadRelatedVendorData() {
    $('.Apploader').show();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/OppSolicitation/RelatedVendorsData",
        data: "{parameters:" + JSON.stringify(searchParameters) + "}",
        dataType: "json",
        async: true,
        success: function (getRelatedVendors) {
            $('.Apploader').hide();
            $('#RelatedVendor_tbody').html("");

            if (getRelatedVendors.length > 0) {

                var filldata = "";
                for (var i = 0; i < getRelatedVendors.length; i++) {

                    var vendor_name = getRelatedVendors[i].vendor_name;
                    var recipient_uei = getRelatedVendors[i].recipient_uei;
                    var cagecode = getRelatedVendors[i].cagecode;
                    var total_funding = parseFloat(getRelatedVendors[i].total_funding).toFixed(2);
                    if (vendor_name === null) {
                        vendor_name = "-";
                    }
                    if (recipient_uei === null) {
                        recipient_uei = "-";
                    }
                    if (cagecode === null) {
                        cagecode = "-";
                    }
                    if (total_funding === null) {
                        total_funding = "-";
                    }
                    else {
                        total_funding = CommaFormatted(total_funding);
                    }

                    filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td>' + vendor_name + /*'</td><td>' + recipient_uei + */ '</td><td>' + cagecode + '</td><td>$' + total_funding + '</td></tr>');
                }

                $('#RelatedVendor_tbody').html(filldata);
                $('#relatedVendor_tbl').DataTable({
                   
                    columns: [
                        { title: "Row #" },
                        { title: "Vendor Name" },
                       // { title: "Recipient UEI" },
                        { title: "Cage" },
                        { title: "Total Action Obligation" }
                    ],
                    "columnDefs": [
                        {
                            "targets": [2],
                            "visible": false,
                            "searchable": false
                        }
                    ]
                }
                );
                $('#relatedVendor_tbl').dataTable.Columns["INDEX"].ColumnName = "Row";
            }
        },

        error: function ajaxError(err) {
            swal("", err);

        }
    });
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


