$(document).ready(function () {

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
       // data.append('namespaceName', $("#new_name").val());
        $.ajax({
            type: "POST",
            data,
            enctype: 'multipart/form-data',
            url: `/Scraper/UploadFile?namespaceName=${$("#new_name").val()}`,
            processData: false,
            contentType: false,
            cache: false,
            success: function (response) {
                //$('#message').html('<div class="alert alert-success">File uploaded successfully.</div>');
                swal.fire({
                    title: "",
                    text: "Namespace Created",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000,
                })
                document.location = `/Scraper/Index`;
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
})