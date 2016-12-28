var EcommerceProductsEdit = function () {

    var handleImages = function() {
        
        var urlUpload = _ctx + "/admin/products/uploads/media";

        var uploader = new plupload.Uploader({
            runtimes : 'html5,html4',
             
            browse_button : document.getElementById('tab_images_uploader_pickfiles'), // you can pass in id...
            container: document.getElementById('tab_images_uploader_container'), // ... or DOM Element itself
             
            url : urlUpload,
             
            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png"}
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
                        var $template = $('#modelRowTemplate').clone().css("visibility", "visible");
                        var baseUrl = $template.attr("data-origin");
                        $("[data-image]", $template).val(response.filename).prev().attr('src', baseUrl + response.filename);
                        $("#modelRows").append($template);
                    }
                },
         
                Error: function(up, err) {
                    Metronic.alert({type: 'danger', message: err.message, closeInSeconds: 10, icon: 'warning'});
                }
            }
        });

        uploader.init();

    }

    var handleReviews = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_reviews"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": "demo/ecommerce_product_reviews.php", // ajax source
                },
                "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'orderable': true,
                    'targets': [0]
                }],
                "order": [
                    [0, "asc"]
                ] // set first column as a default sort by asc
            }
        });
    }

    var initComponents = function () {
        //init datepickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });

        //init datetimepickers
        $(".datetime-picker").datetimepicker({
            isRTL: Metronic.isRTL(),
            autoclose: true,
            todayBtn: true,
            pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10
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
            handleReviews();
        }

    };

}();