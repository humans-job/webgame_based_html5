// 音乐播放器的方法
// 音乐播放方法
function MusicPlay(filePath){
    const music = new Audio(filePath)
    music.loop = false
    music.playbackRate = 1

    music.play()
}

// 获取音乐时长方法
// 需要异步使用
function getMusicTime(filePath) {
    return new Promise((resolve, reject) => {
        const music = new Audio(filePath);
        music.addEventListener('canplaythrough', () => {
            resolve(music.duration); // 在这里返回时长
        });
        music.addEventListener('error', (e) => {
            reject(new Error('音频加载失败'));
        });
    });

}