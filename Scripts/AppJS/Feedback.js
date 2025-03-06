var files = [];
var extensions = [];

$(document).ready(function () {

    var dropzone = new Dropzone('#demo-upload', {
        previewTemplate: document.querySelector('#preview-template').innerHTML,
        parallelUploads: 5,
        paramName: "file",
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 10,
        filesizeBase: 1000,
        maxFiles: 10,
        acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf,.txt,.zip,.rar,.ods,.html,.avi,.aif,.au,.cvs,.jpeg,.jpg,.psd,.key,.number,.wps,.xml,.xps,.docm,.tiff",
        addRemoveLinks: true,
        init: function () {
            this.on("error", function (file, message, xhr) {
                if (xhr == null) this.removeFile(file);
                swal("", message, "warning");
            });
        },
        thumbnail: function (file, dataUrl) {
            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                for (var i = 0; i < images.length; i++) {
                    var thumbnailElement = images[i];
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
                setTimeout(function () { file.previewElement.classList.add("dz-image-preview"); }, 1);
            }
        }

    });
    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    dropzone.uploadFiles = function (files) {
        var self = this;

        for (var i = 0; i < files.length; i++) {

            var file = files[i];
            totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

            for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function (file, totalSteps, step) {
                    return function () {
                        file.upload = {
                            progress: 100 * (step + 1) / totalSteps,
                            total: file.size,
                            bytesSent: (step + 1) * file.size / totalSteps
                        };

                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, 'success', null);
                            self.emit("complete", file);
                            self.processQueue();
                        }
                    };
                }(file, totalSteps, step), duration);
            }
        }
    }


    var maxLength = 3000;
    $('#chars').hide();

    $('#btnFeedback').click(function () {

        var FeedbackDetails = {};
        FeedbackDetails.Feedback_Module = $(".MinContractSize_1 option:selected").text();
        FeedbackDetails.Feedback_Type = $(".MinContractSize_2 option:selected").text();

        FeedbackDetails.Feedback_Contact_Requested = $(".MinContractSize_3 option:selected").val();
        FeedbackDetails.Feedback_Message = $('#textareaChars').val();


        if (FeedbackDetails.Feedback_Module != "" && FeedbackDetails.Feedback_Type != "" && FeedbackDetails.Feedback_Contact_Requested != "" && FeedbackDetails.Feedback_Message != "") {
            var data = "{FeedbackDetails:" + JSON.stringify(FeedbackDetails) + "}";
            var url = "/Feedback/SendFeedbackMail";
            var result = AjaxPost(url, data);
            if (result.Error = "success") {

                swal("", "Message sent successfully !");
                var origin = window.location.origin;

                window.location.href = origin.includes('fpdsplus') ? origin + "/AnswerWizard/Index" : origin + "/Dashboard/Index";

            }
        }
        else {
            swal("", "All (*) fields are mandatory", "warning");
        }

    });

    $('#textareaChars').keyup(function () {
        var length = $(this).val().length;
        var length = maxLength - length;
        $('#chars').text(length + ' characters left');
        $('#chars').show();
    });

    $('#btnInstantFeedback').click(function () {
        $('.Apploader').show();
        var myDropzone = Dropzone.forElement(".dropzone");
        myDropzone.processQueue();
        var totalIndex = myDropzone.files.length;
        if (totalIndex == 0) {
            SubmitFeedback();
        }
        else {
            files = [];
            extensions = [];
            for (var i = 0; i < myDropzone.files.length; i++) {

                getBase64(myDropzone.files[i]).then(
                    function (data) {
                        files.push(data.data);
                        extensions.push(data.ext);
                        if (files.length == totalIndex) {
                            SubmitFeedback();
                        }
                    }
                );
            }
        }
    });
});

function SubmitFeedback() {
    var FeedbackDetails = {};
    var myDropzone = Dropzone.forElement(".dropzone");
    FeedbackDetails.Files = files;
    FeedbackDetails.Extensions = extensions;
    FeedbackDetails.Feedback_Module = $(".MinContractSize_1 option:selected").text();
    FeedbackDetails.Feedback_Type = $(".MinContractSize_2 option:selected").text();
    FeedbackDetails.Feedback_Contact_Requested = $(".MinContractSize_3 option:selected").val();
    FeedbackDetails.Feedback_Message = $('#textareaChars').val();
    if (FeedbackDetails.Feedback_Module === "Polaris Data Call" && FeedbackDetails.Feedback_Type === "Document(s)" && FeedbackDetails.Files.length == 0) {
        swal("", "Documents need to be uploaded", "warning");
        $('.Apploader').hide();
    }
    else if (FeedbackDetails.Feedback_Module != "" && FeedbackDetails.Feedback_Module != "Select" && FeedbackDetails.Feedback_Type != "" && FeedbackDetails.Feedback_Type != "Select" && FeedbackDetails.Feedback_Message != "") {

        var formData = new FormData();
        formData.append('Feedback_Module', FeedbackDetails.Feedback_Module);
        formData.append('Feedback_Type', FeedbackDetails.Feedback_Type);
        formData.append('Feedback_Message', FeedbackDetails.Feedback_Message);

        for (var i = 0; i < files.length; i++) {
            formData.append('Files[]', files[i]);
        }
        for (var i = 0; i < extensions.length; i++) {
            formData.append('Extensions[]', extensions[i]);
        }

        var url = "/Feedback/SendInstantFeedback";
        var result = AjaxPostForFile(url, formData);
        console.log(result);
        if (result = "success") {
            files = [];
            extensions = [];
            FeedbackDetails.Files = files;
            FeedbackDetails.Extensions = extensions;
            $(".MinContractSize_1 option:selected").val("0");
            $(".MinContractSize_2 option:selected").val("0");
            $('#textareaChars').val("");
            myDropzone.removeAllFiles();
            swal("", "Message sent successfully !");
        }
    }
    else {
        swal("", "All (*) fields are mandatory", "warning");
        $('.Apploader').hide();
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        var ext = file.name.split('.').pop();
        reader.onload = () => resolve({ data: reader.result, ext: ext });
        reader.onerror = error => reject(error);
    });
}

function changeFeedbackType() {
    var result = $(".MinContractSize_1").val();
    if (result === "5") {
        $("#fdtype").val(result);
    }
    else {
        $("#fdtype").val(0);
    }
}
