GlobalSettings =(function(){
    
    return {
        
        init: function(){
            GlobalSettings.initCsrfAJAX();
            GlobalSettings.initContextUrl();
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
        
        initContextUrl: function () {
            // Prepend context path to all jQuery AJAX requests
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                if (!options.crossDomain) {
                    if (options.url.indexOf(_ctx) == -1)
                        options.url = _ctx + options.url;
                }
            });
        },
        
        doLogout: function () {
            $("#logoutForm").get(0).submit();
        }
    }
})();


