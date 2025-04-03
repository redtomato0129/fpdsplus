$(document).ready(() => {
    fetchList()
})

function fetchList() {
    $.ajax({
        type: "POST",
        data: {  },
        enctype: 'multipart/form-data',
        url: "/Download/GetReports",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                console.log("records: ", records)
                for (let a = 0; a < records.length; a++) {
                    let formatted_date = formatDate(records[a].created_at)
                    let html = "";
                    html = html +
                    `<tr style ='cursor:pointer;'>
                            <td>${a + 1}</td><td>${records[a].name}</td>
                            <td>${records[a].description}</td>
                            <td><a href="${records[a].url}" target="_blank"><img class="excel-btn" src="/Content/assets/images/excel.png"/></a></td>
                            <td><a href="${records[a].shopify_url}" target="_blank"><img class="excel-btn" src="/Content/assets/images/report.png"/></a></td>
                            <td>${formatted_date}</td>
                    </tr>`;
                    $("#dowloadReportGrid_tbody").append(html);
                }
            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}

function formatDate(d) {
    if (d) {
        let date = new Date(d);

        const day = date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()
        return (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear().toString().substr(-2);
    }
    return "";
}

