$(document).ready(function () {
    fetchScraperList();
    $("#newNameSpace").click(()=> {
        document.location = `/Scraper/NewNamespace`;
    })
    var dropZone = $('#dropZone');

    dropZone.on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('hover');
    });

    dropZone.on('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('hover');
    });

    dropZone.on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('hover');

        var files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        const data = new FormData();
        const fileUpload = $("#fileInput").get(0);
        const file = fileUpload.files[0];
        const myNewFile = new File([file], file.name, { type: file.type });
        data.append('file', myNewFile);
        $.ajax({
            type: "POST",
            data,
            enctype: 'multipart/form-data',
            url: "/Scraper/UploadFile",
            processData: false,
            contentType: false,
            cache: false,
            success: function (response) {
                $('#message').html('<div class="alert alert-success">File uploaded successfully.</div>');
            },
            error: function (response) {
                $('#message').html('<div class="alert alert-danger">File upload failed.</div>');
            }
        });
    });

    function handleFiles(files) {
        var formData = new FormData();
        formData.append('file', files[0]);

        $.ajax({
            type: "POST",
            data: "",
            enctype: 'multipart/form-data',
            
            url: "/Scraper/UploadFile",
            success: function (response) {
                $('#message').html('<div class="alert alert-success">File uploaded successfully.</div>');
            },
            error: function (response) {
                $('#message').html('<div class="alert alert-danger">File upload failed.</div>');
            }
        });
    }

   

   
 

});
function fetchScraperList() {
    $.ajax({
        type: "POST",
        data: {},
        enctype: 'multipart/form-data',
        url: "/Scraper/nameSpaceList",
        success: function (result) {

            result = jQuery.parseJSON(result);
            result = jQuery.parseJSON(result.response);
            if (result && result != 0) {
                const records = result;
                let html = "";
                for (let a = 0; a < records.length; a++) {
                    if (records[a] == 'opportunity-docs-index') {

                    } else {
                        html = html + ` <tr>
                                            <td>${a + 1}</td>
                                            <td>${records[a]}</td>
                                            <td style="text-align: center;">
                                                <button class="scraper-btn" style="background-color:#56c950" onclick="chat_doc()">Chat</button>
                                                <button class="scraper-btn" style="background-color:#81AEFF" data-toggle="modal" data-target="#addDocModalCenter">Add Document</button>
                                                <button class="scraper-btn" style="background-color:#ff9800" onclick="delete_ns('${records[a]}')">Delete Namespace</button>
                                            </td>
                                        </tr>`;
                    }

                }

                $("#scraperTable").html(html)

            }
            else {
                $('#scraperTable').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
            }
        },
        error: function (error) { }
    });

}
//function delete_ns(name) {
//    $.ajax({
//        type: "POST",
//        data: { name },
//        enctype: 'multipart/form-data',
//        url: "/Scraper/deleteNamespace",
//        success: function (result) {
//            swal.fire({
//                title: "",
//                text: "Namespace Deleted",
//                type: "success",
//                showCancelButton: false,
//                showConfirmButton: false,
//                timer: 3000,
//            })
//            location.reload()
//        },
//        error: function (error) { }
//    });
//}

//function chat_doc() {
//    document.location = `/Scraper/ChatAI`;
//}
//function add_doc(name) {
   
//    $("#addDocModalCenter").toggle();
//}