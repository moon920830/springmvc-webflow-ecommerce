var GlobalSettings = function(){
    
    return {
        
        init: function(){
            GlobalSettings.initCsrfAJAX();
        },
        
        initCsrfAJAX: function(){
            var token = $("meta[name='_csrf']").attr("content"); 
            var header = $("meta[name='_csrf_header']").attr("content");
            if(header && token){
                $.ajaxSetup({
                    beforeSend: function (xhr)
                    {
                       xhr.setRequestHeader(header, token);     
                    }
                });
            }
        },
        
        doLogout: function () {
            $("#logoutForm").get(0).submit();
        }
    }
}


