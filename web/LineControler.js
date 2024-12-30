/**
    判定线控制器（判定线数据结构[时间戳、判定线数量]、状态标志、列表（size=6）判定线【活动区域、休眠区域】、列表区域分界索引，当前生效判定线）

    1. check_time()：读判定线数据结构，根据计时器判断当前判定线的状态（每帧）
    2. change_line ( int amount)：amount!=0，
        状态改变。amount>0，索引右移amount，amount<0，索引左移amount。
        根据索引位置得知活动数量，根据活动数量，修改活动区域的判定线相应状态。修改状态标志。
        TODO:通信，通知音键控制器*6（状态标志）。
 */

/**
 * 判定线class
 * 
 */
class DecideLine {
    constructor(id, line, area){
        this.id = id;
        this.line = line;
        this.area = area;
        this.active = false;
        this.init();
        this.flag = false;
    }
    // 鼠标移入移出，以及空格按下抬起
    init(){

        this.area.addEventListener('mouseover', () => {
            this.line.classList.add('hovered');
        });

        this.area.addEventListener('mouseout', () => {
            this.line.classList.remove('hovered');
            this.line.classList.remove('active');
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.line.classList.contains('hovered')) {
                this.line.classList.add('active');
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && this.line.classList.contains('hovered')) {
                this.line.classList.remove('active');
            }
        });
    }
}


class LineControler {
    // 构造函数
    constructor(timelist, one_lineList,two_lineList,four_lineList, nowTime) {
        this.timelist = timelist;
        this.flag = 1;              //1~6
        this.lineListIndex = 0;     //0~5
        this.nowTime = nowTime;
        this.gameMain = document.getElementById("game");
        this.one_lineList = one_lineList;
        this.two_lineList = two_lineList;
        this.four_lineList = four_lineList;
        this.init();
    }
    // 初始化
    init(){
        // 一个
        let v = document.createElement("div");
        v.id = "line1";
        v.className = "line line1";
        let a = document.createElement("div");
        a.id = "area1";
        a.className = "area area1";
        this.one_lineList.push(new DecideLine(1, v, a));
        // 两个
        let vT = document.createElement("div");
        vT.id = "lineT";
        vT.className = "line lineT";
        let aT = document.createElement("div");
        aT.id = "areaT";
        aT.className = "area areaT";
        let vB = document.createElement("div");
        vB.id = "lineB";
        vB.className = "line lineB";
        let aB = document.createElement("div");
        aB.id = "areaB";
        aB.className = "area areaB";
        this.two_lineList.push(new DecideLine(1, vT, aT));
        this.two_lineList.push(new DecideLine(2, vB, aB));
        // 四个
        let vTL = document.createElement("div");
        vTL.id = "lineTL";
        vTL.className = "line lineTL";
        let aTL = document.createElement("div");
        aTL.id = "areaTL";
        aTL.className = "area areaTL";
        let vTR = document.createElement("div");
        vTR.id = "lineTR";
        vTR.className = "line lineTR";
        let aTR = document.createElement("div");
        aTR.id = "areaTR";
        aTR.className = "area areaTR";
        let vBL = document.createElement("div");
        vBL.id = "lineBL";
        vBL.className = "line lineBL";
        let aBL = document.createElement("div");
        aBL.id = "areaBL";
        aBL.className = "area areaBL";
        let vBR = document.createElement("div");
        vBR.id = "lineBR";
        vBR.className = "line lineBR";
        let aBR = document.createElement("div");
        aBR.id = "areaBR";
        aBR.className = "area areaBR";
        this.four_lineList.push(new DecideLine(1, vTL, aTL));
        this.four_lineList.push(new DecideLine(2, vTR, aTR));
        this.four_lineList.push(new DecideLine(3, vBL, aBL));
        this.four_lineList.push(new DecideLine(4, vBR, aBR));
    }

    // 检查判定线状态
    check_time() {
        // 读判定线数据结构的头
        // 根据计时器判断当前判定线的状态
        if (this.timelist[0][0] >= this.nowTime) {// 到时间，
            // 将timelist的第一项删除
            let time = this.timelist.shift();
            return time[1] - this.flag; // 返回0,则判定线索引不变，返回1,则判定线索引+1，返回-1，则判定线索引-1
        }
        return 0;
    }
    // 改变状态
    check_line(amount) {
        if (amount !== 0) {
            this.lineListIndex += amount;
            for (let i = 0; i < this.lineList.length; i++) {
                this.lineList[i].active = i < this.lineListIndex;
            }
            this.flag = this.lineListIndex + 1;
        }
    }
    // 修改布局
    change_layout() {
        this.clear_layout();
        setTimeout(() => {
            this.gameMain.innerHTML = "";
            this.updateLayout();
        }, 1000);
    }
    // 清除布局动画
    clear_layout() {
        // 获取所有判定线
        let nowlineList = this.gameMain.children;
        for (let i = 0; i < nowlineList.length; i++) {
            nowlineList[i].classList.add("animated", "zoomOut");
            setTimeout(() => nowlineList[i].classList.remove("animated", "zoomOut"), 1000);
        }
    }
    // 更新布局
    updateLayout() {
        switch (this.flag) {
            case 1:
                this.one_line_layout();
                break;
            case 2:
                this.two_line_layout();
                break;
            case 4:
                this.four_line_layout();
                break;
            default:
                break;
        }
    }

    // 单线布局
    one_line_layout() {
        this.gameMain.appendChild(this.one_lineList[0].area);
        this.gameMain.appendChild(this.one_lineList[0].line);
        // css类的animated zoomIn是出现动画，添加后需要移除
        this.one_lineList[0].line.classList.add("animated", "zoomIn");
        setTimeout(() => this.one_lineList[0].line.classList.remove("animated", "zoomIn"), 1000);
    }
    // 双线布局
    two_line_layout() {
        for (let i = 0; i < this.two_lineList.length; i++) {
            this.gameMain.appendChild(this.two_lineList[i].area);
            this.gameMain.appendChild(this.two_lineList[i].line);
            this.two_lineList[i].line.classList.add("animated", "zoomIn");
            setTimeout(() => this.two_lineList[i].line.classList.remove("animated", "zoomIn"), 1000);
        }

    }
    // 四线布局
    four_line_layout() {
        for (let i = 0; i < this.four_lineList.length; i++) {
            this.gameMain.appendChild(this.four_lineList[i].area);
            this.gameMain.appendChild(this.four_lineList[i].line);
            this.four_lineList[i].line.classList.add("animated", "zoomIn");
            setTimeout(() => this.four_lineList[i].line.classList.remove("animated", "zoomIn"), 1000);
        }

    }

    // 返回状态
    get_flag(){
        let flag = this.flag;
        return flag;
    }
}


window.onload = function () {
    

    one_lineList = [];
    two_lineList = [];
    four_lineList = [];

    var lineControler = new LineControler(null,one_lineList,two_lineList,four_lineList, null);

    lineControler.one_line_layout();
    setTimeout(() => {
        lineControler.clear_layout();
        setTimeout(() => {
            lineControler.gameMain.innerHTML = "";
            lineControler.four_line_layout();
        },1000)
    },1000)
    
    

    console.log('222')
}