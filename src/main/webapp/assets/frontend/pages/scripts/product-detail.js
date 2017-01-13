var ProductDetail = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            ProductDetail.initReview();
        },
        initReview: function () {
            //var token = $("meta[name='_csrf']").attr("content"); 
            //var header = $("meta[name='_csrf_header']").attr("content");
            var $createReviewContainer = $("#createReviewContainer");
            var reviewUrl = $createReviewContainer.get(0).dataset.source;
            $.get(reviewUrl, function (response) {
                $createReviewContainer.html(response);
                $("#reviews-form").on("submit", function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    var data = $this.serializeArray();
                    $.ajax({
                        type: 'POST',
                        url: reviewUrl,
                        data: data,
                        beforeSend: function (xhr) {
                            //xhr.setRequestHeader(header, token);
                        },
                        success: function (response) {
                            $createReviewContainer.html(response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.status + " " + jqXHR.responseText);
                        }
                    });
                });
            });
            
            
        }
    };
}();


