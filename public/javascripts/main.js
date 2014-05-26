$(function() {
    var va_code = getQueryStringRegExp('code');
    var access_token = docCookies.getItem('access_token');
    var repos = $('#repo-list');
    var progress_bar = $('.progress-bar');
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
            if (repos.length) {
                $('#repo-list').empty();
                $('.progress-bar').width('0');
            }
            $.get('https://api.github.com/users/' + tar_user + '/starred?per_page=100', function(resp) {
                var add_repo_list = [];
                var repo_collection = [];
                for (var i = 0; i < resp.length; i++) {
                    var name = resp[i].full_name;
                    var add_repo = '<li class="col-md-6 repos"><input class="repo-check" type="checkbox" data-repo="' + name + '" checked><a href="https://github.com/' + name + '">' + name + '</a></li>';
                    add_repo_list.push(add_repo);
                }
                $('#repo-list').append(add_repo_list);
                progress_bar.width('5%');
            });
        } else {
            $('#tar-user').focus();
        }
    });
    $('#run').click(function(e) {
        e.preventDefault();
        if (repos.length) {
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
        }
    });
    $('#reset').click(function(e) {
        e.preventDefault();
        repos.empty();
        progress_bar.width('0');
    });
});
