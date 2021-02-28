// 每次发送请求的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // 在发起请求之前先拼接url
    options.url = "http://ajax.frontend.itheima.net" + options.url;

    // 统一为有权限的接口 配置headers属性
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局挂在 complete 不论请求成功失败都会调用complete函数
    options.complete = function (res) {
        // console.log(res);
        // 判断状态
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html'
        }
    }

})