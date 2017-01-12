var ProductDetail = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            ProductDetail.initReview();
        },
        initReview: function () {
            var token = $('#csrfToken').val();
            var header = $('#csrfHeader').val();
            var $reviewsPane = $("#Reviews");
            var reviewUrl = $reviewsPane.get(0).dataset.source;
            $.get(reviewUrl, function(response){
                $reviewsPane.html(response);
            });
            
            $("#reviews-form").on("submit", function (e) {
                e.preventDefault();
                var $this = $(this);
                var data = $this.serializeArray();
                $.ajax({
                    type: 'POST',
                    url: reviewUrl,
                    data: data,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader(header, token);
                    },
                    success: function (response) {
                        $reviewsPane.html(response);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR.status + " " + jqXHR.responseText);
                    }
                });
            }); 
        }
    };
}();


