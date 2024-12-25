class Queue {
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    enqueue(item) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }

    dequeue() {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }

    peek() {
        return this.items[this.headIndex];
    }

    get length() {
        return this.tailIndex - this.headIndex;
    }
}

class tone_control {
    constructor( id ,a, x , y){//,tone_active,tone_produce,check_tone,time) {
        this.id = document.getElementById(id);
        //控制器初始位置
        this.x = x;
        this.y = y;
        音键的生产队列
        this.tone_active_queue = tone_active;
        音键的活动队列
        this.tone_produce_queue = tone_produce;
        当前需要判断死亡的音键(队头音键)
        this.check_tone = check_tone;
        this.flag = false;
        this.time = time;
    }
    //控制控制器 状态位置
    control(num){
        if (this.a >num){
            this.flag = false;
        }
        else if(this.a <= num){
            this.flag = true;
            this.move();
            this.tone_produce();
            this.tone_check_death();
        }
    }
    move() {
        this.id.style.left = x;
        this.id.style.top = y;
    }
    tone_produce() {
        while (this.flag == true) {
            if (this.tone_produce_queue.peek().time+this.tone_produce_queue.peek().lifetime == this.time) {
                new tone(x, y,a,life_time, arr_time);
            }

        }
    }
    tone_check_death() {

    }
    tone_check_kill(time){
        this.check_tone = this.tone_active_queue.dequeue();
    }
}

class tone{
    constructor( startx , starty ,endx,endy,a,life_time, arr_time,){
        this.a = a
        this.id = "<div class=\"tap\"></div>";
        this.x = startx;
        this.y = starty;
        this.endx = endx;
        this.endy = endy;
        this.life_time = life_time;
        this.arr_time = arr_time;
        this.move();
    }
    move(){
        if(this.a === 1){

        }
        else if(this.a ==2){

        }
        else if(this.a ==3){

        }
        else if(this.a ==4){

        }
        while(time.getTime()<this.arr_time){

        }
        this.death();
    }
    death(){
        score_counter.count(this.check_tone.arr_time + 300, this.check_tone.arr_time + 300,this.check_tone.arr_time);
        this.id.remove();
    }
}
test1 = new tone_control("myDiv",2,300,600);
test1.move();
