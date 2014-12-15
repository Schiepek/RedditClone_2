//Hier entsteht eine Klasse mit allen nötigen Methoden für den Server


(function  ($) {
	
	var ServiceUri = "http://localhost:4730";
	
	
	function showError() {
		alert("error");
	}


	
    getEntries = function  (fnSuccess) {
        var restUrl = "/entries";
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: ServiceUri + restUrl,
            dataType: "json",
            success: fnSuccess,
            error: showError
        });
    }

    getEntry = function  (id, fnSuccess) {
        var restUrl = "/entry/"+id;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: ServiceUri + restUrl,
            dataType: "json",
            success: fnSuccess,
            error: showError
        });
    }

    login = function  (username, password, fnSuccess, fnError) {
        var restUrl = "/login";
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            data: { name: username, password: password },
            success: fnSuccess,
            error: fnError
        });
    }
    doLogout = function  (fnSuccess) {
        var restUrl = "/logout";
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            success: fnSuccess,
            error: showError
        });
    }

    registerUser = function (username, password, repeat, fnSuccess, fnError) {
        var restUrl = "/register";
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            data: { name: username, password: password, repeat: repeat },
            success: fnSuccess,
            error: fnError
        });
    }
    sendLink = function (title, url, fnSuccess, fnError) {
        var restUrl = "/entry";
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            data: { title: title, url: url },
            success: fnSuccess,
            error: fnError
        });
    }

    doComment = function (id, comment, fnSuccess) {
        var restUrl = "/entry/"+id+"/comment";
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            data: { text: comment },
            success: fnSuccess,
            error: showError
        });
    }

    vote = function(id, type, direction, fnError) {
        var restUrl = "/" + type + "/" + id + "/" + direction;
        $.ajax({
            type: "POST",
            url: ServiceUri + restUrl,
            dataType: 'json',
            async: false,
            success: console.log("vote"),
            error: fnError
        });
    }

    getUser = function  (fnSuccess) {
        var restUrl = "/login";
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: ServiceUri + restUrl,
            dataType: "json",
            success: fnSuccess,
            error: function() {console.log("not logged in"); }
        });
    }


})(jQuery);