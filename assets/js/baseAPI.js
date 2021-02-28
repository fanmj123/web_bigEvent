// 每次发送请求的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // 在发起请求之前先拼接url
    options.url = "http://ajax.frontend.itheima.net" + options.url;
})