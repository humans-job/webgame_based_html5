async function line_run(lineControl,timelong){
    setInterval(() => lineControl.check_time(), 10);
    await new Promise(resolve => setTimeout(resolve, timelong));
}
async function tone_run (toneControl,timelong){
    setInterval(() => toneControl.tone_produce(), 10);
    await new Promise(resolve => setTimeout(resolve, timelong));
}
async function game_control(){
    let tone_produce =await MusicScoreGenerator.readFile("tone.txt");
    let control_produce = await MusicScoreGenerator.readFile("line.txt");
    let time_check = new Timer();
    let num = new numB();
    let end_time = 254400;
    console.log(end_time);
    console.log(tone_produce);
    console.log(control_produce);
    let one_lineList = [];
    let two_lineList = [];
    let three_lineList = [];
    let score_Counter = new ScoreCounter();
    let toneControl =new tone_control(tone_produce,one_lineList,two_lineList,three_lineList,num,time_check,score_Counter);
    let line = new LineControler(control_produce,one_lineList,two_lineList,three_lineList,time_check,toneControl);


    time_check.startTiming();
    MusicPlay("test.mp3");
    await Promise.all([line_run(line,end_time),tone_run(toneControl,end_time)]);
    console.log('end_game');
}
function setStyle()
{
    let a = document.getElementById("start");
    game_control();
    a.style.display="none";
    a.remove();
}
