var EcommerceProductsEdit = function () {

    var handleReviews = function () {

        var grid = new Datatable();
        $table = $("#datatable_reviews");
        var source = $table.get(0).dataset.source;
        var $filterStatus = $("#filterStatus");
        grid.init({
            src: $table,
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
                    "url": source, // ajax source
                },
                "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'orderable': true,
                    'targets': [0]
                }],
                columns : [
                    {
                        data : "id"
                    },{
                        data : "createAt"
                    },{
                        data: "user",
                        render: function (data, type, row) {
                            return row.user.fullName;
                        }
                    },{
                        data: "rating"
                    },{
                        data: "status",
                        render: function(data,type, row){
                            return $filterStatus.clone().attr("name", 1).attr("value", row.status).html();
                        }
                    },{
                        data: "actions",
                        render: function (data, type, row) {
                            return "<a href='' class='btn btn-sm btn-default btn-circle btn-editable' data-target='#detailReviewModal' data-toggle='modal'><i class='fa fa-eye'></i> show</a>";
                        }
                    }
                ],
                "order": [
                    [1, "desc"]
                ] // set first column as a default sort by asc
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleReviews();
        }

    };

}();