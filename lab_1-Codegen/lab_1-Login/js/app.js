var userGlob;
var currentPath;
$.holdReady(true);

$.getScript(((window.location.protocol == 'file:') ? "http:" : window.location.protocol) + "//api.backendless.com/sdk/js/latest/backendless.min.js", function () {
    $.holdReady(false);

    (function ($) {
        $.fn.wrongInput = function () {
            return this.each(function () {
                var $this = $(this),
                    $field = $this.is("input.txt") || $this.is("input[type=text]") ? $this : $this.find("input.txt"),
                    rmWrng = function ($field) {
                        $field.removeClass('wronginput');
                    };
                if ($field.hasClass('wronginput')) {
                    return
                }
                $field.addClass('wronginput');
                $field.one('input', function () {
                    rmWrng($field);
                });
            });
        };
    })(Zepto);

    $(function () {

        function createPopup(text, type) {
            var $popup = $("<div class='popup'></div>"),
                $body = $('body');
            if (type) {
                $popup.addClass(type);
            }
            $popup.text(text);
            if ($body.find('.popup').length) {
                $('.popup').remove();
            }
            $body.append($popup);
            $popup.animate({
                right: '20px',
                opacity: 0.8
            }, 500);
            setTimeout(function () {
                $popup.animate({
                    right: '-' + $popup.width() + 'px',
                    opacity: 0
                }, 500);
                setTimeout(function () {
                    $popup.remove();
                }, 500);
            }, 3000);
        }

        //Backendless: defaults
        var APPLICATION_ID = '235E5C42-408D-C5A8-FFA9-CC2778AC4600';
        var SECRET_KEY = '29E14435-40D1-CEF5-FFFE-A5E2D285B000';
        var VERSION = 'v1';

        if (!APPLICATION_ID || !SECRET_KEY || !VERSION)
            alert("Missing application ID and secret key arguments. Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. Copy/paste the values into the Backendless.initApp call located in app.js");

        var loggedInUser, username, password, remember;

        Backendless.serverURL = "https://api.backendless.com";
        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

        var cache = Backendless.LocalCache.getAll();
        if (cache["stayLoggedIn"]) {
            var tokenExist = Backendless.UserService.isValidLogin();
            if (tokenExist) {
                userLoggedInStatus(cache["user-token"]);
            } else {
                Backendless.LocalCache.clear();
            }
        }

        function gotError(err) { // see more on error handling
            $('input').addClass("redBorder");
            if (error.code != 0) {
                createPopup(err.message, 'error');
                console.log("error message - " + err.message);
                console.log("error code - " + err.statusCode);
            }
        }

        function userLoggedOut() {
            console.log("user has been logged out");
        }

        function logoutUser() {
            localStorage.clear();
            Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
            location.reload();
        }

        $('#logout').on('click', function () {
            logoutUser();
        });


        function gotErrorRegister(err) { // see more on error handling
            $('input').each(function () {
                if (err.message.indexOf($(this).attr('id')) != -1) {
                    $(this).addClass('redBorder');
                }
            });
            createPopup(err.message, 'error');
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
        }

        function gotErrorRestore(err) { // see more on error handling
            $('input').addClass("redBorder");
            createPopup(err.message, 'error');
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
        }

        function userLoggedInStatus(user) {
            userGlob = user;
            console.log("user has logged in");
            $('.login').hide();
            $('.logined').show();

            document.getElementById("home").onclick = function () {
                fillFiles(user.login)
            };
            fillFiles(user.login);
        }


        function userRegistered(user1) {
            console.log("user has been registered");
            $('.thankTemp').show();
            $('.regForm').hide();

        }

        function success() {
            $('.restorePass').hide();
            $('.thankTemp').show();
        }

        $('#remember').prop('checked', cache['stayLoggedIn']);

        $('#remember').on('change', function () {
            remember = $('#remember').prop("checked");
        });

        $('#user_login').on('click', function () {

            username = $('#login').val();
            password = $("#password").val();

            $('input').on('keydown', function () {
                $('input').removeClass('redBorder');
            });

            if (username == '') {
                createPopup("Identity cannot be empty!", 'error');
                $('#login').addClass("redBorder");
                return false;
            } else if (password == '') {
                createPopup("Password cannot be empty!", 'error');
                $('#password').addClass("redBorder");
                return false;
            }
            Backendless.UserService.login(username, password, remember, new Backendless.Async(userLoggedInStatus, gotError));
        });

        $('.double, .int').on('input', function (e) {
            var $el = $(this),
                value = $el.val().trim(),
                pattern = /^((-(([1-9]+\d*(\.\d+)?)|(0\.0*[1-9]+)))|((0|([1-9]+\d*))(\.\d+)?))([eE](\+|\-)?\d+)?$/;
            if (value.search(pattern) == -1) {
                $el.val("");
            }
        });

        $(".date").datepicker({
            beforeShow: function (input, inst) {
                setTimeout(function () {
                    inst.dpDiv.css({left: 50 + '%', top: 218, marginLeft: -30});
                }, 0);
            }
        });

        $('#register').on('click', function () {
            var user = new Backendless.User();

            $('input').each(function () {
                var $el = $(this),
                    value = $el.val().trim();
                if (value) {
                    user[$el.attr("id")] = value;
                }
            });

            if (Backendless.UserService.register(user)) {
                Backendless.Files.saveFile(user.login + "/sharedwithme/", "system.sys", new Blob(["hello!"]), true);
            }
        });

        $('#restore').on('click', function (e) {
            e.preventDefault();
            $('.restorePass input').removeClass('redBorder');
            $('.login').hide();
            $('.restorePass').show();
        });

        $('#restorePassword').on('click', function () {
            var login = $('#loginRestore').val();
            $('input').on('keydown', function () {
                $('input').removeClass('redBorder');
            });
            if (login == '') {
                createPopup("Enter username!", 'error');
                $('input').addClass("redBorder");
                return false;
            }
            Backendless.UserService.restorePassword(login, new Backendless.Async(success, gotErrorRestore));
        });

        $('#newfolderbtn').on('click', function (e) {
            var callback = {}
            callback.success = function (result) {
                fillFiles(userGlob.login);
            }
            $('#newfolder').val();
            Backendless.Files.saveFile(currentPath + "/" + $('#newfolder').val(), "readme.txt", new Blob(["hello"]), true, callback);


        });

    });
});


function fillFiles(path) {
    currentPath = path;
    $('#files').empty();
    $.each(Backendless.Files.listing(path, "*", false).data, function (i, val) {
        if (val.name.indexOf(".") > -1) {
            $('#files').append("<tr><td><a href='#'>" + val.name + "</a></td><td><a href='#' class='btn-danger' onclick='del(\"" + path + "/" + val.name + "\")'>Delete</a></td>" + "<td><a href='"+val.publicUrl+ "' class='btn-danger'>Download</a></td>"+ "</tr>");
        } else {
            $('#files').append("<tr><td>" + "<a onclick=\"fillFiles(\'" + path + "/" + val.name + "\')\" href=\"#\">" + val.name + "</a>" + "</td>" +"<td><a href='#' class='btn-danger' onclick='delDir(\"" + path + "/" + val.name + "\")'>Delete</a></td>" + "</tr>");
        }
    });
}


function del(path) {
    var callback = new Backendless.Async(
        function (result) {
            fillFiles(currentPath);
        });

    Backendless.Files.remove(path, callback);
    console.log(path);
}
function delDir(path) {
    var callback = new Backendless.Async(
        function (result) {
            fillFiles(currentPath);
        });

    Backendless.Files.removeDirectory(path, callback);
    console.log(path);
}
document.getElementById('filesUpload').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt)
{
    files = evt.target.files; // FileList object
}

function uploadFileFunc()
{
    var callback = {};

    callback.success = function(result)
    {
        fillFiles(currentPath);
    }

    callback.fault = function(result)
    {
        alert( "error - " + result.message );
    }

    Backendless.Files.upload( files, currentPath, callback );
}