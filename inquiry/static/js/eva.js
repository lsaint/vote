//存储图片链接信息的关联数组
var c ,images = {},Cmend = true,addListener = true,number,cxt,secs,one,power = 0,cotent = new Image(),data = new Image(),label = new Image(),yuandata = false,mySize =new Array(),x = 170,w = 0,handOpen = false,waterOpen = new Array(),shou = true,value = {},percent = {},cardValue = {},Ey,tipT = true,cardO = false;
var sources = {
    leftHand : "image/youshou.png",
    rightHand : "image/zuoshou.png",
    chanpin01 : "image/chanpin01.png",
    chanpin02 : "image/chanpin02.png",
    chanpin03 : "image/chanpin03.png",
    chanpin04 : "image/chanpin04.png",
    clickHand : "image/tishishou.png",
    yuan : "image/yuan.png",
    nengliangtiao : "image/nengliangtiao.png",
    water_01 : "image/water_01.png",
    water_02 : "image/water_02.png",
    water_03 : "image/water_03.png",
    water_04 : "image/water_04.png",
    water_05 : "image/water_05.png",
    water_06 : "image/water_06.png",
    water_07 : "image/water_07.png",
    water_08 : "image/water_08.png",
    water_09 : "image/water_09.png",
    water_10 : "image/water_10.png",
    card : "image/card.png",
    label1 : 'image/p1_money.png',
    label2 : 'image/p2_money.png',
    label3 : 'image/p3_money.png',
    label4 : 'image/p4_money.png',
    logline02 : 'image/longline_06.png',
    tip : 'image/2down.png',
    fuck : 'image/chacha.png'
 };

window.onload=function() {
    c = document.getElementById('game'),cxt = c.getContext("2d"),secs = 5,one = true,number = 0;
    var Px = $('.game').width()/750;
    var Py = $('.game').height()/835;
    var PoutY = $('.game').outerHeight(true) - $('.game').height();
    percent = {
        x : Px,
        y : Py,
        outY : PoutY
    };
    var cW = 102*percent.x;
    var cH = 162*percent.y;
    var cX = 580*percent.x;
    var cY = 16*percent.y +percent.outY;
    var cEndx = cX + cW;
    var cEndy = cY + cH;
    cardValue = {
        w : cW,
        h : cH,
        x : cX,
        y : cY,
        endx : cEndx,
        endy : cEndy,
        changeY : 0,
        changeEndy : 0
    };
    // 加载图片,初始化游戏
    value = {
        level1 : '20%',
        level2 : '30%',
        level3 : '40%',
        level4 : '50%',
        img1 : 'image/end_1.png',
        img2 : 'image/end_2.png',
        img3 : 'image/end_3.png',
        img4 : 'image/end_4.png',
        mental1 : 'image/1_star.png',
        mental2 : 'image/2_star.png',
        mental3 : 'image/3_star.png',
        mental4 : 'image/4_star.png',
        txt1 : '只能说，出来混，不能太温柔！',
        txt2 : '找个点钱师傅给你培训一下！',
        txt3 : '讨厌，这么厉害，人家都被你戳疼了啦！',
        txt4 : '亮瞎剁手党，借手指来膜拜 一下！',
        name1 : '温柔手',
        name2 : '无影手',
        name3 : '金手指',
        name4 : '一指禅'
        };
    loadImages(sources, function(images){
        if (c.getContext){
            var vh=$(document).height();
            $(".product span").css("height",vh*0.35);
            $('.product span').on('touchend',function (event){
                var className = $(this).attr('class');
                switch(className){
                    case 'p1' :
                        $('#all_2').addClass('none');
                        ready(images.chanpin02);
                        label = images.label1;
                        $('.game').removeClass('none');
                        $('.move_text').removeClass('none');
                        break;
                    case 'p2' :
                        $('#all_2').addClass('none');
                        ready(images.chanpin03);
                        label = images.label2;
                        $('.game').removeClass('none');
                        $('.move_text').removeClass('none');
                        break;
                    case 'p3' :
                        $('#all_2').addClass('none');
                        ready(images.chanpin01);
                        label = images.label3;
                        $('.game').removeClass('none');
                        $('.move_text').removeClass('none');
                        break;
                    case 'p4' :
                        $('#all_2').addClass('none');
                        ready(images.chanpin04);
                        label = images.label4;
                        $('.game').removeClass('none');
                        $('.move_text').removeClass('none');
                        break;
                }
            })
        }
     });
    // 游戏开始
    $('#game').on('touchend',function(){
        event.preventDefault();
        if (one == true) {
            clearInterval(Interval1);
            secs = 5;
            cxt.clearRect(0, 0, 750, 835);
            bgi();
            show_time();
            waterOpen = [1,1,1,1,1,1,1,1,1,1];
            IntervalM = setInterval("nengliang()",200);
            IntervalD = setInterval("draw()",1);
            c.addEventListener('touchend', start, false);
            return one = false;
        };
    });
}

// 初始化游戏
function ready(name){
    number = 0;
    images.cotent = name;
    cxt.clearRect(0, 0, 750, 835);
    cxt.drawImage(images.cotent,170,222,407,497);
    cxt.drawImage(images.leftHand,0,215,275,352);
    cxt.drawImage(images.rightHand,478,215,275,352);
    cxt.fillStyle="#fff";
    cxt.fillRect(668, 22, 52, 432);
    cxt.drawImage(images.clickHand,463,640,103,180);
    cxt.font = '30px Microsoft YaHei';
    cxt.fillStyle = '#fff';
    cxt.fillText('点击开戳',566, 830);
    cxt.font = 'bold 60px Microsoft YaHei';
    cxt.fillStyle = 'yellow';
    cxt.fillText((secs>9)?(secs+'s'):('  '+secs+'s'),155, 145);
    Interval1 = setInterval("yuan()",200);
    mySize = [0,0,0,0,0,0,0,0,0,0];
}
// 游戏背景
function bgi(){
    cxt.clearRect(0, 0, 750, 835);
    cxt.drawImage(images.cotent,170,222,407,497);
    cxt.drawImage(images.leftHand,0,215,275,352);
    cxt.drawImage(images.rightHand,478,215,275,352);
    cxt.fillStyle="#fff";
    cxt.fillRect(668, 22, 52, 432);
    cxt.font = 'bold 60px Microsoft YaHei';
    cxt.fillStyle = 'yellow';
    cxt.fillText((secs>9)?(secs+'s'):('  '+secs+'s'),155, 145);
}
// 倒计时
function show_time(){
        cxt.clearRect(95, 80, 180, 70);
        cxt.font = 'bold 60px Microsoft YaHei';
        cxt.fillStyle = 'yellow';
        secs--;
        cxt.fillText((secs>9)?(secs+'s'):('  '+secs+'s'),155, 145);
        if(secs > 0){
            Timeout1 = setTimeout("show_time()",1000);
        }
    }
// 手点击
function yuan(){
    if (number == 0&&yuandata == false) {
        data = cxt.getImageData(443,614,73,73);
        cxt.drawImage(images.yuan,443,614,73,73);
        yuandata = true;
    }else{
        cxt.putImageData(data,443,614);
        yuandata = false;
    }
}
// 能量条
function nengliang(){
    if(secs>0){
    if (power>=10){
        power =10;
    };
    cxt.fillStyle="#fff";
    cxt.fillRect(668, 22, 52, 432);
    cxt.drawImage(images.nengliangtiao, 0, power<10?(432-43.2*power):0, 52, power<10?(43.2*power):432, 668, power<10?(454-43.2*power):22, 52, power<10?(43.2*power):432);
    power--;
    if (power<=0){
        power = 0;
    };
    }else{
        clearTimeout(Timeout1);
        clearInterval(IntervalM);
        clearInterval(IntervalD);
        c.removeEventListener('touchend', start, false);
        $('.move_text').addClass('none');
        $('.move_text_end').removeClass('none');
        $('.move_tip').fadeIn(2000);
        $('.moveOver').on('touchend',card);
        bgi();
        cxt.drawImage(images.nengliangtiao,668, 22, 52, 432);
        if(number<=25){
            $('.number').html(number);
            $('.per_num').html(value.level1);
            $('.end_text_2').html(value.txt1);
            $('.end_title_2').html(value.name1);
            $('.end').attr('src',value.img1);
            $('.prize').attr('src',value.mental1);
        }else if(number<=35){
            $('.number').html(number);
            $('.per_num').html(value.level2);
            $('.end_text_2').html(value.txt2);
            $('.end_title_2').html(value.name2);
            $('.end').attr('src',value.img2);
            $('.prize').attr('src',value.mental2);
        }else if(number<=40){
            $('.number').html(number);
            $('.per_num').html(value.level3);
            $('.end_text_2').html(value.txt3);
            $('.end_title_2').html(value.name3);
            $('.end').attr('src',value.img3);
            $('.prize').attr('src',value.mental3);
        }else{
            $('.number').html(number);
            $('.per_num').html(value.level4);
            $('.end_text_2').html(value.txt4);
            $('.end_title_2').html(value.name4);
            $('.end').attr('src',value.img4);
            $('.prize').attr('src',value.mental4);
        };
    }
}
// 手挤水效果
function hand(){
    // 图像与裁剪像素1:1.26，原图宽度346
    if(handOpen){
        if(shou){
            x --;
            if (x == 120){
                shou = false;
            };
        }else{
            x ++;
            if (x == 170){
                shou = true;
                handOpen = false;
                clearInterval(Interval2);
            };
        }
    }
}
function draw(){
    if (secs>0) {
        cxt.clearRect(105,160,543,675);
        cxt.drawImage(images.cotent,170,222,407,497);
        cxt.drawImage(images.leftHand,346-1.26*x,0,1.26*x,351,105,215,x,352);
        cxt.drawImage(images.rightHand,0,0,1.26*x,351,648-x,215,x,352);
        cxt.drawImage(images.water_01, 410 - 250*mySize[0]/100, 380 - 220*mySize[0]/100,  210*mySize[0]/100, 120*mySize[0]/100);
        // cxt.drawImage(images.water_09, 410 - 250*mySize[8]/100, 380 - 220*mySize[8]/100,  210*mySize[8]/100, 120*mySize[8]/100);
        cxt.drawImage(images.water_10, 410 - 250*mySize[9]/100, 380 - 220*mySize[9]/100,  210*mySize[9]/100, 120*mySize[9]/100);
        cxt.drawImage(images.water_02, 350 + 20*mySize[1]/100, 430 - 270*mySize[1]/100, 90*mySize[1]/100, 210*mySize[1]/100);
        cxt.drawImage(images.water_08, 300 + 150*mySize[7]/100, 300 - 10*mySize[7]/100, 200*mySize[7]/100, 110*mySize[7]/100);
        cxt.drawImage(images.water_03, 340+100*mySize[2]/100, 190 + 310*mySize[2]/100, 150*mySize[2]/100, 150*mySize[2]/100);
        cxt.drawImage(images.water_04, 450 - 300*mySize[3]/100, 450 - 100*mySize[3]/100, 200*mySize[3]/100, 70*mySize[3]/100);
        cxt.drawImage(images.water_05, 300 + 150*mySize[4]/100, 300 - 10*mySize[4]/100, 200*mySize[4]/100, 110*mySize[4]/100);
        // cxt.drawImage(images.water_07, 300 + 150*mySize[6]/100, 300 - 10*mySize[6]/100, 200*mySize[6]/100, 110*mySize[6]/100);
        cxt.drawImage(images.water_06, 450 - 320*mySize[5]/100, 300 + 120*mySize[5]/100, 200*mySize[5]/100, 140*mySize[5]/100);
    }
}
//水滴效果
function watermove(){
        switch(number%5){
            case 1 :
                // if(number == 26&&waterOpen[6] == 1){
                //     IntervalW7 = setInterval("waterSeven()",1);
                // }else
                if (waterOpen[1] == 1) {
                    IntervalW2 = setInterval("waterTwo()",1);
                };
                break;
            case 2 :
                // if(number == 52 && waterOpen[8] == 1){
                //     IntervalW9 = setInterval("waterNine()",1);
                // }else
                if(waterOpen[2] == 1) {
                    IntervalW3 = setInterval("waterThree()",1);
                };
                break;
            case 3:
                // if (number == 13 && waterOpen[0] == 1) {
                //     IntervalW1 = setInterval("waterOne()",1);
                // }else
                if (waterOpen[3] == 1) {
                    IntervalW4 = setInterval("waterFour()",1);
                };
                break;
            case 4 :
                // if(number == 39 && waterOpen[7] == 1){
                //     IntervalW8 = setInterval("waterEight()",1);
                // }else
                if (waterOpen[4] == 1) {
                    IntervalW5 = setInterval("waterFive()",1);
                };
                break;
            case 0 :
                if(number == 10 && waterOpen[0] == 1){
                    IntervalW1 = setInterval("waterOne()",1);
                }else if (number == 20 &&waterOpen[7] == 1) {
                    IntervalW8 = setInterval("waterEight()",1);
                }else if (number == 30 &&waterOpen[9] == 1) {
                    IntervalW10 = setInterval("waterTen()",1);
                }else if (waterOpen[5] == 1) {
                    IntervalW6 = setInterval("waterSix()",1);
                };
        }
    // }
};
function waterOne(){
    waterOpen[0] = 0;
    mySize[0] += 0.5;
    if(mySize[0] == 100){
        mySize[0] = 0;
        waterOpen[0] = 1;
        clearInterval(IntervalW1);
    };
}
function waterTwo(){
    waterOpen[1] = 0;
    mySize[1]+= 1;
    if(mySize[1] == 100){
        mySize[1] = 0;
        waterOpen[1] = 1;
        clearInterval(IntervalW2);
    }
}
function waterThree(){
    waterOpen[2] = 0;
    mySize[2]+= 1;
    if(mySize[2] == 100){
        mySize[2] = 0;
        waterOpen[2] = 1;
        clearInterval(IntervalW3);
    }
}
function waterFour(){
    waterOpen[3] = 0;
    mySize[3]+= 1;
    if(mySize[3] == 100){
        mySize[3] = 0;
        waterOpen[3] = 1;
        clearInterval(IntervalW4);
    }
}
function waterFive(){
    waterOpen[4] = 0;
    mySize[4]++;
    if(mySize[4] == 100){
        mySize[4] = 0;
        waterOpen[4] = 1;
        clearInterval(IntervalW5);
    }
}
function waterSix(){
    waterOpen[5] = 0;
    mySize[5]++;
    if(mySize[5] == 100){
        waterOpen[5] = 1;
        mySize[5] = 0;
        clearInterval(IntervalW6);
    }
}
function waterSeven(){
    waterOpen[6] = 0;
    mySize[6] += 0.5;
    if(mySize[6] == 100){
        waterOpen[6] = 1;
        mySize[6] = 0;
        clearInterval(IntervalW7);
    }
}
function waterEight(){
    waterOpen[7] = 0;
    mySize[7] += 0.5;
    if(mySize[7] == 100){
        waterOpen[7] = 1;
        mySize[7] = 0;
        clearInterval(IntervalW8);
    }
}
function waterNine(){
    waterOpen[8] = 0;
    mySize[8] += 0.5;
    if(mySize[8] == 100){
        waterOpen[8] = 1;
        mySize[8] = 0;
        clearInterval(IntervalW9);
    }
}
function waterTen(){
    waterOpen[9] = 0;
    mySize[9] += 0.5;
    if(mySize[9] == 100){
        waterOpen[9] = 1;
        mySize[9] = 0;
        clearInterval(IntervalW10);
    }
}
// 游戏开始
function start(event){
    event.preventDefault();
    $(window).scrollTop(0);
    if(secs != 0){
        ++number;
        watermove();
        if(handOpen == false){
            handOpen = true;
            Interval2 = setInterval("hand()",0.1);
        };
        power++;
    }else{
        if(number<=25){
            $('.number').html(number);
            $('.per_num').html(value.level1);
            $('.end_text_2').html(value.txt1);
            $('.end_title_2').html(value.name1);
            $('.end').attr('src',value.img1);
            $('.prize').attr('src',value.mental1);
        }else if(number<=35){
            $('.number').html(number);
            $('.per_num').html(value.level2);
            $('.end_text_2').html(value.txt2);
            $('.end_title_2').html(value.name2);
            $('.end').attr('src',value.img2);
            $('.prize').attr('src',value.mental2);
        }else if(number<=40){
            $('.number').html(number);
            $('.per_num').html(value.level3);
            $('.end_text_2').html(value.txt3);
            $('.end_title_2').html(value.name3);
            $('.end').attr('src',value.img3);
            $('.prize').attr('src',value.mental3);
        }else{
            $('.number').html(number);
            $('.per_num').html(value.level4);
            $('.end_text_2').html(value.txt4);
            $('.end_title_2').html(value.name4);
            $('.end').attr('src',value.img4);
            $('.prize').attr('src',value.mental4);
        };
        clearTimeout(Timeout1);
        clearInterval(IntervalM);
        clearInterval(IntervalD);
        c.removeEventListener('touchend', start, false);
        $('.move_text').addClass('none');
        $('.move_text_end').removeClass('none');
        $('.move_tip').fadeIn(2000);
        $('.moveOver').on('touchend',card);
        bgi();
        cxt.drawImage(images.nengliangtiao,668, 22, 52, 432);
    }
}
//刷卡
function card(){
    if(cardValue.changeY < 654*percent.y && cardO == false && Cmend == true){
        cardValue.changeY = 0;
        cardValue.changeEndy = 0;
        $('.move_text_end').addClass('none');
        $('.move_tip').removeAttr('style');
        $('.card_text').removeClass('none');
        cxt.clearRect(0, 0, 750, 835);
        cxt.fillStyle = '#fff';
        cxt.fillRect(580, 16, 10, 767);
        cxt.drawImage(images.card,520, 16, 162, 162);
        cxt.shadowOffsetX = -15;
        cxt.shadowOffsetY = 10;
        cxt.shadowColor="#cb4634";
        // cxt.drawImage(images.cotent,156, 240, 305,497);
        cxt.drawImage(images.cotent,106, 240 - percent.outY,  407,497);
        cxt.shadowOffsetX = 0;
        cxt.shadowOffsetY = 0;
        IntervalT = setInterval("tip()",200);
        if (addListener == true) {
            document.addEventListener("touchstart", cardMove, false);
            document.addEventListener("touchmove", cardMove, false);
            document.addEventListener("touchend", card, false);
            addListener = false;
        };
        Cmend = false;
    }
}
function tip(){
        if (yuandata) {
            cxt.clearRect(606, 190, 52, 85);
            yuandata = false;
        }else{
            cxt.drawImage(images.tip, 606, 190, 52, 85);
            yuandata = true;
        }
}
function drawCard(){
    cxt.clearRect(500, 0, 200, 835);
    cxt.fillStyle = '#fff';
    cxt.fillRect(580, 16, 10, 767);
    cxt.drawImage(images.logline02,0,0,10,cardValue.changeY/percent.y,580, 16, 10, cardValue.changeY/percent.y);
    cxt.drawImage(images.card,520, 16+cardValue.changeY/percent.y, 162, 162);
}
// 拖动银行卡
function cardMove(event) {
    //只跟踪一次触摸
    if (event.touches.length == 1){
            switch (event.type) {
                case "touchstart":
                    if(cardValue.x<event.touches[0].clientX && cardValue.endx > event.touches[0].clientX && cardValue.y+cardValue.changeY < event.touches[0].clientY && cardValue.endy+cardValue.changeEndy > event.touches[0].clientY){
                        Ey = event.touches[0].clientY;
                        // console.log(Ey);
                    }
                    break;
                case "touchmove":
                    event.preventDefault(); //阻止滚动
                    if (cardO == false && cardValue.x<event.touches[0].clientX && cardValue.endx > event.touches[0].clientX && cardValue.y+cardValue.changeY < event.touches[0].clientY && cardValue.endy+cardValue.changeEndy > event.touches[0].clientY) {
                        if (event.touches[0].clientY-Ey <= 630*percent.y) {
                            if(event.touches[0].clientY-Ey > 0){
                                console.log((event.touches[0].clientY-Ey) == 615*percent.y);
                                clearInterval(IntervalT);
                                Cmend = true;
                                cardValue.changeY = event.touches[0].clientY - Ey;
                                cardValue.changeEndy = event.touches[0].clientY - Ey;
                            };
                            drawCard();
                        }else if(event.touches[0].clientY-Ey > 630*percent.y){
                            cardValue.changeY = 630*percent.y;
                            document.removeEventListener("touchstart", cardMove, false);
                            document.removeEventListener("touchmove", cardMove, false);
                            document.removeEventListener("touchend", card, false);
                            cardOver();
                        }
                    };
                break;
            }
    }
}
//拖动完成
function cardOver(){
    cardO = true;
    $('.card_text').addClass('none');
    $('.card_text_end').removeClass('none');
    $('.card_tip').fadeIn(2000);
    fuckLab = setInterval('drawLable()',100);
    $('.pLink').on('touchend',function(){
        postScore();
        setTimeout("share()",500);
    })
}
// 标签
var up = 0;
function drawLable(){
    if(up == 1){
        up = 1;
        Tup = setInterval('cut()',70);
        clearInterval(fuckLab);
    }else if(up < 1){
        up += 0.1
        cxt.clearRect(0, 0, 480, 835);
        // cxt.clearRect(0, 0, 560, 835);
        cxt.drawImage(images.cotent,106, 240 - percent.outY, 407,497);
        cxt.globalAlpha = up;
        cxt.drawImage(label, 5, 222 - percent.outY, 190, 260);
        cxt.globalAlpha = 1;
    }else{
        up = 1;
    };
}
// 消减
function cut(){
    if(up < 50){
        up += 10;
        cxt.clearRect(0, 0, 480, 835);
        // cxt.drawImage(images.cotent,156, 240, 305,497);
        cxt.drawImage(images.cotent,106, 240 - percent.outY,  407,497);
        cxt.drawImage(label, 5, 222 - percent.outY, 190, 260);
        cxt.drawImage(images.fuck, 29, 320+up - percent.outY, 200 - 1.66*up, 120 - up);
    }else{
        clearInterval(Tup);
    }
}
// 分享
//function share(){
//    $('.move').addClass('none');
//    $('#all_3').removeClass('none');
//}
//调用图片预加载函数，实现回调函数
function loadImages(sources, callback){
    var count = 0,
        imgNum = 0;
    for(src in sources){
        imgNum++;
    }
    for(src in sources){
        images[src] = new Image();
        images[src].onload = function(){
            if(++count >= imgNum){
                callback(images);
            }
        }
        images[src].src = sources[src];
    }
}
