var ProductDetail = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            ProductDetail.initAddProductToCart();
            ProductDetail.initReview();
            ProductDetail.initRecommendations();
        },
        initAddProductToCart: function(){
            var $addProductToCart = $("#addProductToCart");
            if($addProductToCart.length > 0){
                var url = $addProductToCart.get(0).dataset.source;
                $.get(url, function (response) {
                    $addProductToCart.html(response);
                    Layout.initTouchspin();
                });
                $addProductToCart.on("submit", "form", function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    var data = $this.serializeArray();
                    $.post($this.attr("action"), data, function (response) {
                        $addProductToCart.html(response);
                        Layout.initTouchspin();
                    });
                });
            }
            
        },
        initReview: function () {
            
            var $createReviewContainer = $("#createReviewContainer");
            if ($createReviewContainer.length > 0) {
                var reviewUrl = $createReviewContainer.get(0).dataset.source;
                $.get(reviewUrl, function (response) {
                    $createReviewContainer.html(response);
                    $('div.rateit, span.rateit').rateit();
                });
                $createReviewContainer.on("submit", "form", function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    var data = $this.serializeArray();
                    $.post($this.attr("action"), data, function (response) {
                        $createReviewContainer.html(response);
                        $('div.rateit, span.rateit').rateit();
                    });
                });
            }
        },
        
        initRecommendations: function()  {
            
            var $recommendations = $("#recommendations");
            if($recommendations.length > 0) {
                var recommendationUrl = $recommendations.get(0).dataset.source;
                $.get(recommendationUrl, function (response) {
                    $createReviewContainer.html(response);
                    Layout.initOWL();
                });
            }
            
        }
    };
}();


