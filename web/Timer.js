class Timer{
    constructor() {
        this.startTime = Date.now()
        this.currentTime = Date.now() - this.startTime
    }

    // 更新当前时间
    updateTime(){
        this.currentTime = Date.now() - this.startTime
    }

    startTiming(){
        setInterval(this.updateTime.bind(this),0)
    }

    // 获取当前时间
    getTime(){
        return this.currentTime
    }
}