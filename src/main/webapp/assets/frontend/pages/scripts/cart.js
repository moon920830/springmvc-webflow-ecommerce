var Cart = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            var $cartItems = $("#cartItems");
            $cartItems.delegate("[data-action='remove']", "click", function(e){
                e.preventDefault();
                var $this = $(this);
                $this.prev().attr("value", true);
                $this.parents("tr").hide();
            });
        }
    };
}();


