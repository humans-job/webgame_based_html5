class number{
    constructor() {
        this.number = 0;
    }
}

class tone_control {
    constructor( id ,a, x , y,tone_produce,one_lineList,two_lineList,three_lineList,num,time) {
        this.id = document.getElementById(id);
        this.a = a;
        this.x = x;
        this.y = y;
        this.tone_produce_queue = tone_produce;
        this.flag = false;
        this.num = num;
        this.time = time;
        this.one_lineList = one_lineList;
        this.two_lineList = two_lineList;
        this.three_lineList = three_lineList;
    }
    //控制控制器 状态位置
    control(num) {
            if (this.a > num) {
                this.flag = false;
            } else if (this.a <= num) {
                this.flag = true;
                this.move();
                this.tone_produce();
            }
    }
    move() {
        this.id.style.top = this.x + 'px';
        this.id.style.top = this.y + 'px';
    }
    tone_produce() {
        while (this.flag === true) {
            if (this.tone_produce_queue[this.num.number][0] === this.a) {
                if (this.tone_produce_queue[this.num.number][1] + this.tone_produce_queue[this.num.number][2] >= this.time.getTime()) {
                    new tone(this.x, this.y, this.tone_produce_queue[this.num.number][1], this.tone_produce_queue[this.num.number][2], this.one_lineList ,this.two_lineList,this.three_lineList,this.time);
                    this.num.number++;
                }
            }
        }
    }
}

class tone{
    constructor( a,num,start_x , start_y ,end_x ,end_y ,life_time ,arr_time,one_lineList,two_lineList,three_lineList,time){
        this.id = document.createElement("div");
        this.id.style.top =start_x + 'px';
        this.id.style.left =start_y + 'px';
        this.id.style.width=200+ 'px';
        this.id.style.height=15+ 'px';
        this.id.style.position= 'absolute';
        this.id.style.background='lightskyblue';
        this.x = Number(start_x);
        this.y = Number(start_y);
        this.endx =Number(end_x);
        this.endy = Number(end_y);
        this.id.style.rotate = Math.atan2(this.y - this.endy,this.x - this.endx)+'deg';
        let con = document.getElementById('content');
        this.x = start_x;
        this.y = start_y;
        this.endx = end_x;
        this.endy = end_y;
        this.life_time = life_time;
        this.arr_time = arr_time;
        this.one_lineList = one_lineList;
        this.two_lineList = two_lineList;
        this.three_lineList = three_lineList;
        this.num = num;
        this.time =time;
        this.a = a;
        con.appendChild(this.id);
        window.requestAnimationFrame(this.move);
    }
    move (timestamp){
        let start, previousTimeStamp;
        if (start === undefined) {
            start = timestamp;
        }
        let done = false;
        const elapsed = timestamp - start;
        if (previousTimeStamp !== timestamp) {
            const count = Math.min(0.1 * elapsed, this.y - this.endy);
            this.id.style.transform = `translateY(${count}px)`;
            if (count === this.y - this.endy) done = true;
        }
        if (elapsed < this.life_time) { // 2秒后停止动画
            previousTimeStamp = timestamp;
            if (!done) {
                window.requestAnimationFrame(this.move);
            }
            else {
                this.death(timestamp);
            }
        }
    }
    death(time){
        score_counter.count(this.arr_time + 200, this.arr_time ,time);
        this.id.style.display = 'none';
        this.id.remove();
    }
    kill(){
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.arr_time-this.time>=200) {
                let times = this.time;
                switch (this.num) {
                    case 1:{
                        if (this.one_lineList[this.a-1].active === true){
                            this.death(times);
                        }
                    }
                    break;
                    case 2:{
                        if (this.two_lineList[this.a-1].active === true){
                            this.death(times);
                        }
                    }
                    break;
                    case 4:{
                        if (this.three_lineList[this.a-1].active === true){
                            this.death(times);
                        }
                    }
                }
            }
        });
    }
}