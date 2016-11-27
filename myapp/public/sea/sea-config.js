seajs.config({
    // Sea.js 的基础路径
//    base: 'http://kb.52yh.com/seajs/',

//    映射配置
    map: [
        ['.js', '.js?v=2016112311'],
        ['.css','.css?v=2016112311']
    ],
    alias:{
        'jquery':'tools/jquery-1.8.1.min.js',
        'jquery.bpopup':'tools/jquery-bpopup.js',
        'jquery.md5' : 'tools/jquery.md5.js',
        'touchslider' : 'tools/touchslider.js'
    },

    preload: [
        "jquery"
    ],

    // 文件编码
    charset: 'utf-8'
});

window.Config = {
    HOST: "http://kb.52yh.com/",
    LOGIN_HOST: "http://kblogin.52yh.com/",
	PF_HOST: "http://kbpf.52yh.com/",
    GAME_HOST: "http://kbgame.52yh.com/",
    PLATFORM: "kb",
    LANGUAGE: 'zh_CH',
    CNZZ_TRACKING_ID: "1260580892",
    PLATFORM_CODE: "kbpf",
    PAY:"http://kbpay.52yh.com/",
    CDN_FILE_ADDRESS: 'http://sdk.downloadtw.efunsea.com/',
    AREACODE: '86',
    PF_PREFIX: 'YHKB',
    PIC_ID : '616'

};

//cnzz
/*
(function() {
    var cnzz = document.createElement('script');
    cnzz.src = ('https:' == document.location.protocol ? " https://" : " http://")+"s95.cnzz.com/z_stat.php?id="+Config.CNZZ_TRACKING_ID;
    cnzz.async = true;
    var c = document.getElementsByTagName('script')[0];
    c.parentNode.insertBefore(cnzz, c);
})();


if(location.href.indexOf(Config.HOST) == -1){//debug
    Config.HOST = location.origin+location.pathname.substr(0,location.pathname.lastIndexOf("/")+1).replace('/vip/','/').replace('/page/','/');
    Config. PF_HOST = "http://pftest.efuntw.com/";
    //Config. PF_HOST = "http://pf.kubgame.com/";
    seajs.config({base: Config.HOST+'seajs/'});

} */
//seajs.config({base: Config.HOST+'seajs/'});