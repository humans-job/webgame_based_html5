class numB{
    constructor() {
        this.number = 0;
    }
}

class tone_control {
    constructor(tone_produce,one_lineList,two_lineList,three_lineList,num,time,score_Counter) {
        this.tone_produce_queue = tone_produce;
        this.flag = false;
        this.num = num;
        this.time = time;
        this.one_lineList = one_lineList;
        this.two_lineList = two_lineList;
        this.three_lineList = three_lineList;
        this.score_Counter = score_Counter;
    }
    //控制控制器 状态位置
    control(num) {
        this.num = num;
    }
    tone_produce() {
        if ((this.tone_produce_queue[0][2] - this.tone_produce_queue[0][1])<= this.time.getTime()) {
            let tone_produce = this.tone_produce_queue.shift();
            switch (this.num) {
                case 1: {
                    new tone(1, this.num , tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                }
                break;
                case 2: {
                    if (tone_produce[0] === 1) {
                        new tone(1, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    } else if (tone_produce[0] === 2) {
                        new tone(2, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    }
                }
                break;
                case 4: {
                    if (tone_produce[0] === 1) {
                        new tone(1, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    } else if (tone_produce[0] === 2) {
                        new tone(2, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    } else if (tone_produce[0] === 3) {
                        new tone(3, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    } else if (tone_produce[0] === 4) {
                        new tone(4, this.num, tone_produce[1], tone_produce[2], this.one_lineList, this.two_lineList, this.three_lineList, this.time, this.score_Counter);
                    }
                }
            }
        }
    }
}

class tone{
    constructor(a,num,life_time ,arr_time,one_lineList,two_lineList,three_lineList,time,scoreCounter){
        this.id = document.createElement("div");
        this.life_time = life_time;
        this.arr_time = arr_time;
        this.one_lineList = one_lineList;
        this.two_lineList = two_lineList;
        this.three_lineList = three_lineList;
        this.num = num;
        console.log(this.num)
        this.time =time;
        this.a = a;
        this.score_Counter = scoreCounter;
        this.init();
        this.distance = null;
        this.direction = null;
    }
    init(){
        console.log("produce");
        switch (this.num) {
            case 1:{
                this.id.style.cssText= 'position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:0%;left: 50%;background-color: lightskyblue;visibility="visible";';
                this.distance = 400;
                this.direction = "down";
            }
                break;
            case 2:{
                if(this.a === 1){
                    this.id.style.cssText= 'position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:calc0%;left: 50%;background-color: lightskyblue;';
                    this.distance = 400;

                }
                else if(this.a === 2){
                    this.id.style.cssText= 'position: absolute;width: 100px;height: 15px;transform-origin: center;top:100%;left: 50%;background-color: lightskyblue;';
                    this.distance = -400;

                }
            }
                break;
            case 4:{
                if(this.a === 1){
                    this.id.style.cssText='position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:100%;left:0%;transform: translate(50%, -50%);rotate:45deg;background-color: lightskyblue;';
                    this.distance = 520;

                }
                else if(this.a === 2){
                    this.id.style.cssText='position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:0% ;left:0%;rotate:-45deg;background-color: lightskyblue;transform: translate(-50%, -50%);';
                    this.distance = 520;

                }
                else if(this.a === 3){
                    this.id.style.cssText='position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:100%;left:100%;rotate:135deg;background-color: lightskyblue;transform: translate(50%, 50%);';
                    this.distance = 520;

                }
                else if(this.a === 4){
                    this.id.style.cssText='position: absolute;width: 100px;height: 15px;transform-origin: 0 0;top:0% ;left:100%;rotate:-135deg;  background-color: lightskyblue;transform: translate(50%, -50%);';
                    this.distance = 520;

                }
            }
                break;
        }
        let con = document.getElementById('game');
        con.appendChild(this.id);

        this.move();

    }
    move () {

        this.id.style.animation = `move ${this.life_time / 100}s linear`;
        const keyframes = `
  @keyframes move {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(${this.distance}px);
    }
  }
`;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);
        this.kill();
        this.id.addEventListener('animationend', () => {
            let endTime = this.time.getTime()
            this.death(endTime); });
    }
    death(time){
        this.score_Counter.count(this.arr_time + 400, this.arr_time ,time);
        this.id.remove();
    }
    kill(){
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.arr_time-this.time.getTime()<=150) {
                let times = this.time.getTime();
                switch (this.num) {
                    case 1:{
                        if (this.one_lineList[this.a-1].active === true){
                            console.log('win');
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