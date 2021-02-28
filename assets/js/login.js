$(function () {
    // 给“去注册账号”注册点击事件
    $("#reg-link").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    // 给“去登陆”注册点击事件
    $("#login-link").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //利用layui获取form 
    var form = layui.form
    form.verify({
        // 密码框验证
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码验证
        repwd: function (value) {
            // 获取输入密码的值
            var pwd = $("#reg_form [name=password]").val();
            // 判断两次输入是否一致
            if (pwd !== value) {
                return "两次输入不一致哦！"
            }
        }
    })

    //注册表单监听提交事件
    $("#reg_form").on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发送ajax请求
        var username = $('#reg_form [name=username]').val();
        var password = $('#reg_form [name=password]').val();
        $.post('/api/reguser', { username: username, password: password }, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg("注册成功，请登录！");
            // 自动跳转到登录页面
            $("#login-link").click();
            // 将注册的用户名和密码赋值给登录的输入框
            $("#l-uname").val(username);
            $("#l-pwd").val(password);
            // 重置注册信息
            $("#reg_form")[0].reset();
        })
    })
    // 登录表单监听提交事件
    $("#login_form").on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("登录成功！");
                // 将登录成功得到的token 保存到本地中
                localStorage.setItem('token', res.token)
                // 页面跳转到index.html
                location.href = '/index.html'
            }
        })
    })


})