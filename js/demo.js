var rows = 4, 
    cols = 17, 
    wincont = mids = rows * cols / 2, // wincont 用于判断剩余节点 mids用于循环 
    nums = rows * cols, // nums 用于循环
    conts = 0; //得分
var flag = true; // 初始化开关
var key = true; // 开关
var mark=null;
var imgpath=new Array(mids);

var btnDiv = document.getElementById('btn-div') // 开始按钮
var starDiv = document.getElementsByClassName('star-div')[0] // 开始按钮的遮罩
var boxDiv = document.getElementById('box-div') // 生成格子的div
var sTitle = document.getElementsByClassName('title-span')[0] // 首页游戏字体
var topDiv = document.getElementsByClassName('top-div')[0] // 游戏界面顶部
var back = document.getElementsByClassName('reset') // 获取返回按钮
var setTime = document.getElementsByClassName('set-time')[0] // 获取时间
var overBack = document.getElementsByClassName('overBack')[0] // 获取游戏结束遮罩层
var gameWin = document.getElementsByClassName('gameWin')[0] // 获取游戏胜利遮罩层
var start = document.getElementsByClassName('start')[1] 
var p = document.getElementsByTagName('p')[0]

btnDiv.addEventListener('click', load, false)
btnDiv.addEventListener('click', init, false)
back[0].addEventListener('click', getBack, false) 
back[1].addEventListener('click', getBack, false) 
back[2].addEventListener('click', getBack, false) 
start.addEventListener('click', start, false)

// 计时器
var add = 40;
function callTime() {
    this.timer = setInterval(function () {
        if (add == 0) { 
            clearInterval(timer)
            gameOver();
        }
        add--;
        setTime.innerHTML = add;
    }, 1000)
}

// 关卡函数
function start() {
    gameWin.style.display = 'none';
    clearInterval(timer);
    init();
    add = 40;
    setTime.innerHTML = add;
}

function gameOver() {

    // 游戏结束 弹出遮罩
    
    clearInterval(timer)
    overBack.style.height = window.innerHeight + 'px';
    overBack.style.display = 'block';
    document.onmousewheel = function(){
        return false;
    } 
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
        }, false);
}
function gameWins() {

    // 游戏胜利 弹出遮罩
    clearInterval(timer)
    gameWin.style.height = window.innerHeight + 'px';
    gameWin.style.display = 'block';
    document.onmousewheel = function(){
        return false;
    }
    var params = {"time":Date.parse(new Date())};
    $.ajax({
        url: "HJr4Fe5sra.php",
        cache:false,
        async: false,
        data:params,
        dataType: "html",
        type:"POST",
        success: function (data){
            window.alert(data)
        }
    });
}

function load() {
    
    boxDiv.style.display = 'block';
    starDiv.style.display = 'none';
    sTitle.style.display = 'none';
    topDiv.style.display = 'block';
    p.style.display = 'none';
    
}
function getBack() {
	
    setTime.innerHTML = 40;
    add =40;
    clearInterval(timer)
    boxDiv.innerHtml = '';
    boxDiv.style.display = 'none';
    starDiv.style.display = 'block';
    sTitle.style.display = 'block';
    topDiv.style.display = 'none';
    gameWin.style.display = 'none';
    p.style.display = 'block';
    overBack.style.display = 'none';
}

// 初始化函数
function init() {  
    callTime();

    var count = 0;
    wincont = mids = rows * cols / 2;
    nums = rows * cols;
    flag = true;
    var bWidth = boxDiv.style.width;
    //init boxes
    if (flag) {
        var d = document.createElement('div');//创建div
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var con = document.createElement('img');
                con.classList.add('con');
                con.setAttribute('id', count);
				con.setAttribute('draggable', false);
                count++;
                d.appendChild(con);//con设定为d的子节点
            }
        }
        boxDiv.innerHTML = d.innerHTML;
        addImg(mids);
    }

}

function addImg() {
    for (var i = 0; i < mids; i++) {
        var getcon = document.getElementById(i)
		imgpath[i]='images/'+Math.floor(Math.random() * 34)+'.jpg';
		getcon.setAttribute('src',imgpath[i]);  
    }

    while (mids) {
        /**
         * 循环前半元素 的同时 随机生成一个值 用于后半元素 绑定div
         * 先判断 随机生成的值里面有没有标识符 即 'set',set代表已配对
         * 如果已经有了标识符 则重新生成一个随机数
         * 如果随机生成的这个值没有标识符 则进入条件判断
         * 在条件判断之前 先获取本次循环的一个值作为id绑定前半元素的img
         * 如果本次循环的div含有标识符或是随机生成的div数含有一个标识符
         * 则不会进行下一步判断
         * 否则 进行传递 并同时打上标识符set
        */
        for (var i = 0; i < nums / 2; i++) {
            var setImgId = null,
                getCon2 = null;
				
            setImgId = Math.floor(Math.random() * nums / 2 + nums / 2);//随机生成的后半的值
            getCon2 = document.getElementById(setImgId); // 后半id值
            if (getCon2.classList.contains('set')) {
                setImgId = Math.floor(Math.random() * nums / 2 + nums / 2);
            } else {
                var getCon1 = document.getElementById(i); // 获取前半
                if (!getCon1.classList.contains('set') && !getCon2.classList.contains('set')) {
                    getCon2.draggleble= false;
                    getCon2.src=getCon1.src;
					getCon2.setAttribute('id',setImgId);
                    getCon1.classList.add('set');
                    getCon2.classList.add('set');
                    mids--;
                }
            }

        }

    }

    flag = false;

}

// 绑定事件
boxDiv.addEventListener('click', checking, false)

// 核心逻辑
function checking(e) {
    /**
     * 第一次点击该元素 
     * 第二次点击该元素 用id编码区分
     * 
     * 如果第一次点击该元素 则需保留该元素的 标识符 边框颜色变为白色 
     * 如果第二次点击该元素 保留第二次点击元素的标识符 边框颜色恢复原样
     * 如果两次标识符一致 则取消选中状态

     * 如果在这之前点击过其他元素 则将两元素背景进行对比 若相等则移除该节点
    */

    var event = e || window.event;
    var eStyle = event.target.style;
	

    eId = event.target.id; // 获得点击的id(img的id)
	test1();
    function test1() {

        if (key) { // 点第一次  true
            mark = eId;//第一次的值记录在mark上
            eStyle.borderColor = '#fff';
            key = false;

        } else if (!key) { // 点第二次
		
            if (eId == mark) {//点击自身
                eStyle.borderColor = '#000';
                key = !key; 
                mark = null;

            } else {//点击不同
                var eMark = document.getElementById(mark);
                //	boxDiv.remove(event.target) ;
                if (event.target.src == eMark.src) {
					
                    boxDiv.removeChild(event.target);
                    boxDiv.removeChild(eMark);
					
                    wincont--; // 剩余节点统计
                    key = !key; // key = true
                    mark = null; // 恢复初始化

                    if (wincont == 0) { // 
                        gameWins();
                    }
                }else{
					
				}

            }

        }
    };
    
}
