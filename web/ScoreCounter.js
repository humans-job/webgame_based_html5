class ScoreCounter {
    // 构造函数
    constructor() {
        this.Notesum = 100;   // 音符总数（假设是100个音符）
        this.goodsum = 0;   // good情况次数
        this.normalsum = 0; // normal情况次数
        this.Scoresum = 0;
    }

    count(upperdBoundTime, lowerBoundTime, clickTime){
        // 计数的分类方法（假设是这么个区间）
        let t = (upperdBoundTime + lowerBoundTime)/2;
        if (Math.abs(t- clickTime) < 500){
            this.goodsum++;
        }else{
            this.normalsum++;
        }
    }

    sum(){
        // 计分方法（假设是这么个方法）
        this.Scoresum = 2 * this.goodsum + 1 * this.normalsum;
    }
}