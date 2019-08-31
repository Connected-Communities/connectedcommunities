function uploadController() {

    $('form').click(function () { that.postUploadedFile(); });
}

this.postUploadedFile = function () {

    console.log("upload button works")
    //   var that = this;
    //   $.ajax({
    //       url: '/home/doc-upload',
    //       type: 'POST',
    //       success: function (data) {
    //           that.goUpload();
    //       },
    //       error: function (jqXHR) {
    //           console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
    //       }
    //   });



}