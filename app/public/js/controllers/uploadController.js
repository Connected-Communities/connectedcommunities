function uploadController() {

    $('#upload-form').click(function () { that.postUploadedFile(); });
}

this.postUploadedFile = function () {
    var that = this;
    $.ajax({
        url: '/home/doc-upload',
        type: 'POST',
        success: function (data) {
            that.goUpload();
        },
        error: function (jqXHR) {
            console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
        }
    });
}