var EcommerceProductsCreate = function () {

    var handleImages = function() {
        
        var $template = $('[data-product-line-template]').detach();
        $template.css("display", "table-row");
        var $rows = $("#modelRows");
        
        var urlUpload = _ctx + "/admin/products/media/upload";

        var uploader = new plupload.Uploader({
            runtimes : 'html5,html4',
             
            browse_button : document.getElementById('tab_images_uploader_pickfiles'), // you can pass in id...
            container: document.getElementById('tab_images_uploader_container'), // ... or DOM Element itself
             
            url : urlUpload,
             
            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,jpeg,gif,png"}
                ]
            },           
         
            init: {
                BeforeUpload: function(up, file) {
                    console.log("BeforeUpload:", file);
                    up.settings.multipart_params = {"fileid": file.id };
                },
                PostInit: function() {
                    $('#tab_images_uploader_filelist').html("");
         
                    $('#tab_images_uploader_uploadfiles').click(function() {
                        uploader.start();
                        return false;
                    });

                    $('#tab_images_uploader_filelist').on('click', '.added-files .remove', function(){
                        uploader.removeFile($(this).parent('.added-files').attr("id"));    
                        $(this).parent('.added-files').remove();                     
                    });
                },
         
                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        $('#tab_images_uploader_filelist').append('<div class="alert alert-warning added-files" id="uploaded_file_' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> remove</a></div>');
                    });
                },
                
                FilesRemoved: function(up, files){
                    console.log("Files:", files);
                },
         
                UploadProgress: function(up, file) {
                    console.log("File to upload", file);
                    $('#uploaded_file_' + file.id + ' > .status').html(file.percent + '%');
                },

                FileUploaded: function(up, file, response) {
                    
                    if(response.status == 200){
                        var response = $.parseJSON(response.response);
                        console.log(response);
                        $('#uploaded_file_' + response.fileId + ' > .status').removeClass("label-info").addClass("label-success").html('<i class="fa fa-check"></i> Done');
                        Metronic.alert({type: 'success', message: 'Fichero ' + response.filename + ' subido con éxito', closeInSeconds: 5, icon: 'success'});
                        var idx = $rows.children().size();
                        $productLine = $template.clone();
                        var baseUrl = $template.attr("data-origin");
                        //Config image
                        $("[data-image]", $productLine)
                                .attr("name", "productLines["+idx+"].image")
                                .val(response.filename)
                                .prev()
                                .attr('src', baseUrl + response.filename);
                        // Product Line Description field.
                        $("[data-desc]", $productLine)
                            .attr("name", "productLines["+idx+"].description");
                        // Product Line Stock field.
                        $("[data-stock]", $productLine)
                            .attr("name", "productLines["+idx+"].stock");
                        $rows.append($productLine);
                    }
                },
         
                Error: function(up, err) {
                    Metronic.alert({type: 'danger', message: err.message, closeInSeconds: 10, icon: 'warning'});
                }
            }
        });

        uploader.init();

    }

    

    var initComponents = function () {
        //init datepickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true,
            format: 'dd/mm/yyyy',
            setDate: new Date()
        });

        //init datetimepickers
        $(".datetime-picker").datetimepicker({
            isRTL: Metronic.isRTL(),
            autoclose: true,
            todayBtn: true,
            pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10,
            format: 'dd/mm/yyyy',
            setDate: new Date()
        });

        //init maxlength handler
        $('.maxlength-handler').maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true,
            threshold: 5
        });
        
        $('#bootstrap-editor').wysihtml5();
    }

    return {

        //main function to initiate the module
        init: function () {
            initComponents();
            handleImages();
        }

    };

}();