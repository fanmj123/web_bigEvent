$(function () {
    // 获取用户信息
    getUserInfo();
    // 给退出按钮注册点击事件 
    $("#logout").on('click', function () {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 清除 本地的token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//获取用户信息
function getUserInfo() {
    // 发送ajax请求
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers就是请求头对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                // 用户获取信息成功
                return layui.layer.msg(res.message);
            }
            // console.log(res);
            // 调用渲染头像函数
            getUserAvatar(res.data);
        },
    })
}
function getUserAvatar(user) {
    // 获取用户名
    var uname = user.nickname || user.username
    // 更改欢迎 xxx
    $("#welcome").html("欢迎 &nbsp;&nbsp;" + uname);
    // 判断用户是否有图片头像
    if (user.user_pic !== null) {
        // 用户有图片头像 让图片头像显示
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 文字头像隐藏
        $('.avatar').hide();

    } else {
        // 图片头像隐藏
        $(".layui-nav-img").hide();
        // 用户有文字头像 让用户名的首个字符转换成大写显示文字头像
        var first = uname[0].toUpperCase();
        $(".avatar").html(first).show();
    }
}