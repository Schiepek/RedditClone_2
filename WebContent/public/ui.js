var entryTemplate = doT.template($("#entryTemplate").text() );
var commentTemplate = doT.template($("#commentTemplate").text() );

$( document ).ready(function() {

    var socket = io.connect('http://localhost:4730/');

    alert($("#footer").text() || "sdfs");

    var showEntries = function (entries) {
        var container = $("#containEntries");
        $.each(entries , function(index,element) {
            if(!$("#link"+element.id).size()) {
                container.prepend(entryTemplate(element));
            }
            if($("#linkRating"+element.id).text() != element.rating.value){
                $("#linkRating"+element.id).html("<b>" + element.rating.value + "<b>");
            }
            if($("#showComments"+element.id).text() != element.comments.length){
                $("#showComments"+element.id).html(element.comments.length +" Comment(s)");
            }
            var entryContainer = $("#containComments"+element.id);
            $.each(element.comments , function(index,element) {
                if(!$("#comment"+element.id).size()) entryContainer.append(commentTemplate(element));
                if($("#commentRating"+element.id).text() != element.rating.value) $("#commentRating"+element.id).html("<b>" + element.rating.value + "<b>")
            });
        });
    };
    getEntries(showEntries);

    var renderNavbar = function(user)  {
        $("#newUser").css('display', 'none');
        $("#welcomeNewUser").text('');
        $("#postNew").css('display', 'block');
        $("#loginForm").css('display', 'none');
        $("#welcomeForm").css('display', 'inline');
        $("#registerForm").css('display', 'none');
        $("#username").val('');
        $("#password").val('');
        $("#welcomeUser").text('Logged in as \"' + user + "\"");
        $('.commentForm').show();
    }

    getUser(renderNavbar);

    $("#signin").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        var signin = function (success) {
            if (success) {
                $("#newUser").css('display', 'none');
                $("#welcomeNewUser").text('');
                $("#postNew").css('display', 'block');
                $("#loginForm").css('display', 'none');
                $("#welcomeForm").css('display', 'inline');
                $("#registerForm").css('display', 'none');
                $("#username").val('');
                $("#password").val('');
                $("#welcomeUser").text('Welcome ' + username);
                $('.commentForm').show();

            }
        }
        login(username, password, signin, errorMessage);
    });

    $("#logout").click(function() {
        var logout = function (success) {
            if (success) {
                $("#postNew").css('display', 'none');
                $("#postLink").css('display', 'none');
                $("#loginForm").css('display', 'inline');
                $("#welcomeForm").css('display', 'none');
                $('.commentForm').hide();
            }
        }
        doLogout(logout);
    });
    $("#register").click(function() {
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        var repeat = $("#repeatPassword").val();

        var register = function (success) {
            if(success) {
                $("#newUser").css('display', 'inline');
                $("#welcomeNewUser").text('User \"' + username + '\" created, please login!');
                $("#registerForm").css('display', 'none');
                $("#register-error").css('display', 'none');
                $("#registerUsername").val('');
                $("#registerPassword").val('');
                $("#repeatPassword").val('');
            }
        }
        registerUser(username, password, repeat, register, registerErrorMessage);
    });
    $("#showRegister").click(function() {
        $("#registerForm").toggle( "slow" );
    });
    $("#closeRegister").click(function() {
        $("#register-error").css('display', 'none');
        $("#registerForm").toggle( "slow" );
        $("#registerUsername").val('');
        $("#registerPassword").val('');
        $("#repeatPassword").val('');
    });
    $("#postNew").click(function() {
        $("#postLink").toggle( "slow" );
    });
    $("#submitLink").click(function() {
        var title = $("#linkTitle").val();
        var url = $("#linkURL").val();
        if (url.substr(0, 7) != "http://" && url != "") {
            url = "http://"+url;
        }
        var submitLink = function (entry) {
            if (entry) {
                $("#postLink").css('display', 'none');
                var container = $("#containEntries");
                $("#submitLink-error").css('display', 'none');
                $("#linkTitle").val('');
                $("#linkURL").val('');
            }
        }
        sendLink(title, url, submitLink, linkErrorMessage);
    });
    $("#cancelPost").click(function() {
        $("#postLink").toggle( "slow" );
        $("#submitLink-error").css('display', 'none');
        $("#linkTitle").val('');
        $("#linkURL").val('');
    });

    socket.on("EntriesChanged", function(data) {
        console.log("Socket Update: " + data.action);
        getEntries(showEntries);
    });

});

function errorMessage(message) {
    $("#errorMessage").text(message.responseText);
    $("#errorArea").css('display', 'inline');
    window.setTimeout("   $(\"#errorArea\").css('display' , 'none');  ", 1500);
    window.setTimeout("   $(\"#errorMessage\").text('');  ", 1500);
}

function registerErrorMessage(message) {
    $("#register-error").text(message.responseText);
    $("#register-error").css('display', 'inline');
    window.setTimeout("   $(\"#register-error\").css('display' , 'none');  ", 1500);
    window.setTimeout("   $(\"#register-error\").text('');  ", 1500);
}

function linkErrorMessage(message) {
    $("#submitLink-error").text(message.responseText);
    $("#submitLink-error").css('display', 'block');
    window.setTimeout("   $(\"#submitLink-error\").css('display' , 'none');  ", 1500);
    window.setTimeout("   $(\"#submitLink-error\").text('');  ", 1500);
}


$(document).on('click', '.sendComment', function() {
    var id = $(this).attr('id').substr(11);
    var comment = $("#commentText"+id).val();
    var test = function (comment) {
        if (comment) {
            if (!$("#containComments"+id).is(":visible")) {
                $("#containComments"+id).toggle('slow');
            }
            $("#comment-error"+id).css('display', 'none');
            $("#commentText"+id).val('');
        } else {
            $("#comment-error"+id).css('display', 'block');
        }
    }
    doComment(id, comment, test);
});



$(document).on('click', '.voteLinkUp', function() {
    var id = $(this).parent().attr('id').substr(8);
    vote(id, "entry", "up", errorMessage);
});

$(document).on('click', '.voteLinkDown', function() {
    var id = $(this).parent().attr('id').substr(8);
    vote(id, "entry", "down", errorMessage);
});

$(document).on('click', '.voteCommentUp', function() {
    var id = $(this).parent().attr('id').substr(11);
    vote(id, "comment", "up", errorMessage);
});

$(document).on('click', '.voteCommentDown', function() {
    var id = $(this).parent().attr('id').substr(11);
    vote(id, "comment", "down", errorMessage);
});

$(document).on('click', '.showComments', function() {
    var id = $(this).attr('id').substr(12);
    $( "#containComments"+id).toggle( "slow" );
});

