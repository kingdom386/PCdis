  /*地图地点标记*/
    var mapAddr = [
        {'positionX': '1.58', 'positionY': '1.85'},
        {'positionX': '1.43', 'positionY': '2.88'},
        {'positionX': '3.43', 'positionY': '2.76'},
        {'positionX': '2.91', 'positionY': '3.55'},
        {'positionX': '1.83', 'positionY': '4.23'},
        {'positionX': '2.13', 'positionY': '3.96'},
        {'positionX': '2.41', 'positionY': '4.68'},
        {'positionX': '3.19', 'positionY': '4.96'},
        {'positionX': '4.31', 'positionY': '2.52'},
        {'positionX': '5.61', 'positionY': '2.62'},
        {'positionX': '6.91', 'positionY': '1.84'},
        {'positionX': '7.28', 'positionY': '6.0'},
        {'positionX': '8.24', 'positionY': '1.29'},
        {'positionX': '8.14', 'positionY': '1.69'},
        {'positionX': '7.60', 'positionY': '2.36'},
        {'positionX': '6.74', 'positionY': '2.52'},
        {'positionX': '6.32', 'positionY': '2.88'},
        {'positionX': '5.90', 'positionY': '3.42'},
        {'positionX': '5.50', 'positionY': '3.73'},
        {'positionX': '5.22', 'positionY': '4.13'},
        {'positionX': '4.66', 'positionY': '4.87'},
        {'positionX': '4.20', 'positionY': '6.01'},
        {'positionX': '4.56', 'positionY': '5.76'},
        {'positionX': '5.24', 'positionY': '5.34'},
        {'positionX': '5.18', 'positionY': '5.86'},
        {'positionX': '5.42', 'positionY': '6.21'},
        {'positionX': '5.70', 'positionY': '5.86'},
        {'positionX': '5.62', 'positionY': '6.14'},
        {'positionX': '6.12', 'positionY': '5.65'},
        {'positionX': '5.94', 'positionY': '5.34'},
        {'positionX': '6.38', 'positionY': '5.42'},
        {'positionX': '6.72', 'positionY': '5.11'},
        {'positionX': '6.08', 'positionY': '4.98'},
        {'positionX': '6.80', 'positionY': '2.60'},
        {'positionX': '6.70', 'positionY': '5.55'},
        {'positionX': '7.1', 'positionY': '4.65'},
        {'positionX': '7.01', 'positionY': '4.14'},
        {'positionX': '6.71', 'positionY': '4.34'},
        {'positionX': '6', 'positionY': '4'},
        {'positionX': '6', 'positionY': '5'},
        {'positionX': '2', 'positionY': '4'},
        {'positionX': '5.5', 'positionY': '3.2'},
        {'positionX': '5.26', 'positionY': '5.84'},
        {'positionX': '7', 'positionY': '5'}
    ];
    //中奖消息滚动
    var msgTime, speed = 50, iliHeight = 0, delay = 2000, username = proname = '';
    window.onload = function () {
        //ajax 请求后台数据
        $.ajax({
            url: 'http://www.vsnbw.com/Ajax/AppHandler.ashx',
            type: 'post',
            async: 'true',
            data: {'method': 'GetRealTimeOrder'},
            dataType: 'json',
            success: function (data) {
                str = '';// <li>会员<em>王小二</em>购买了购买了100箱啤酒购买了购买了100箱啤酒购买了购买了100箱啤酒</li>
                $(data.data).each(function (i, t) {
                    if (i == 0) {
                        username = t.username;
                        proname = t.prodname;
                        skip();
                    }
                    if (i < 200) {
                        str += '<li>会员<em>' + t.username + '</em><i>购买了' + t.prodname + '</i></li>';
                    }
                });
                $('.list-items').append(str);
                //启动滚动
                start();
            },
            error: function (msg) {
            }
        })
    }

    function start() {
        iliHeight = $(".list-panel li").height();
        area = document.getElementById("rolePanel");
        area.scrollTop = 0;
        area.innerHTML += area.innerHTML;
        //启动滚动
        var CanList = $('.list-panel').height() / iliHeight;
        if (($("ul li").length / 2) >= CanList) {
            setTimeout(startScroll, delay);
        }
    }

    function startScroll() {
        msgTime = setInterval("scrollUp()", speed);
        var temp = area.scrollTop++;
        var indx = temp / iliHeight + 1;
        username = $('em', $('ul li').eq(indx)).html();
        proname = $('i', $('ul li').eq(indx)).html();
    }

    function scrollUp() {
        0 == (area.scrollTop % iliHeight) ? (clearInterval(msgTime), skip(), setTimeout(startScroll, delay)) : (area.scrollTop++ , area.scrollTop >= area.scrollHeight / 2 && (area.scrollTop = 0))
    }

    function skip() {
        //清空初始化
        $('#username').html("");
        $('#proname').html("");
        //添加数据
        $('#username').html(username);
        $('#proname').html(proname);
        var indx = Math.floor(Math.random() * ( mapAddr.length - 1));
        $('.GPS-loc').addClass('active').css({
            'left': mapAddr[indx].positionX + 'rem',
            'top': mapAddr[indx].positionY + 'rem'
        });

        setTimeout(function(){ $('.GPS-loc').removeClass('active')},3350);

    }

