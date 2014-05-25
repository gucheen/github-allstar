$(function() {
    var va_code = getQueryStringRegExp('code');
    var access_token = docCookies.getItem('access_token');
    if (va_code && !access_token) {
        $.post('/access', {
            code: va_code
        }, function(resp) {
            docCookies.setItem('access_token', resp);
            console.log('set cookie of access token.');
        });
    }
    if (access_token && !va_code) {
        console.log('access token already exists.');
    }
    $('#get-repo-list').click(function(e) {
        e.preventDefault();
        var tar_user = $('#tar-user').val();
        if (tar_user) {
            $.get('https://api.github.com/users/' + tar_user + '/starred', function(resp) {
                var add_repo_list = [];
                var repo_collection = [];
                for (var i = 0; i < resp.length; i++) {
                    var name = resp[i].full_name;
                    var add_repo = '<li class="col-md-6 repos"><input class="repo-check" type="checkbox" data-repo="' + name + '" checked><a href="https://github.com/' + name + '">' + name + '</a></li>';
                    add_repo_list.push(add_repo);
                }
                $('#repo-list').append(add_repo_list);
                $('.progress-bar').width('5%');
            });
        } else {
            $('#tar-user').focus();
        }
    });
    $('#run').click(function(e) {
        e.preventDefault();
        $('.repo-check:checked').each(function(i, e) {
            var $e = $(e);
            var rp = $e.data('repo');
            $.post('/star', {
                repo: rp,
                accessToken: access_token
            }, function(resp) {
                console.log(resp);
                if (resp === '204') {
                    $e.parent().children('a').css('color', '#27ae60');
                } else {
                    $e.parent().children('a').css('color', '#c0392b');
                }
            });
        });
    });
});
