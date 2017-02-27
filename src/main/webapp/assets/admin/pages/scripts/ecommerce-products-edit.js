var EcommerceProductsEdit = function () {

    var handleReviews = function () {

        var grid = new Datatable();
        var $table = $("#datatable_reviews");
        var source = $table.get(0).dataset.source;
        var $filterStatus = $("#filterStatus");
        var $filterRating = $("#filterRating").next().rateit().end();
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
                        data : "createAt",
                        render: function(data, type, row) {
                            return new Date(row.createAt).toLocaleDateString();
                        }
                    },{
                        data: "user",
                        render: function (data, type, row) {
                            return row.user.fullName;
                        }
                    },{
                        data: "rating",
                        render: function(data, type, row, meta){
                           return $filterRating.clone()
                                .attr("name", "").attr("value", data).attr("readonly", "readonly")
                                .add($filterRating.next().clone())
                                .get().map(function(el) { return el.outerHTML }).join("");
                        }
                    },{
                        data: "status",
                        render: function(data, type, row, meta){
                            return $filterStatus.clone()
                                    .attr("name", "reviews["+meta.row+"].status")
                                    .children("[value="+data+"]")
                                    .attr("selected", "selected")
                                    .end().get(0).outerHTML;
                        }
                    },{
                        data: "actions",
                        render: function (data, type, row) {
                            return "<a href='' class='btn btn-sm btn-default btn-circle btn-editable' data-target='#detailReviewModal' data-toggle='modal' data-review='"+row.id+"'><i class='fa fa-eye'></i> show</a>";
                        }
                    }
                ],
                "order": [
                    [1, "desc"]
                ] // set first column as a default sort by asc
            }
        });
    }
    
    var handleModalReview = function(){
        
        var $detailReviewModal = $("#detailReviewModal");
        $("#datatable_reviews").on("click", "[data-review]", function(event) {
            event.preventDefault();
            var review = this.dataset.review;
            var url = _ctx + "/admin/products/reviews/" + review;
            $.getJSON(url, function(response) {
                $detailReviewModal.find("[data-title]").text(response.username + " " + response.createAt);
                $detailReviewModal.find("[data-content]").text(response.body);
            });
        });
    }
            
    

    return {

        //main function to initiate the module
        init: function () {
            handleReviews();
            handleModalReview();
        }

    };

}();