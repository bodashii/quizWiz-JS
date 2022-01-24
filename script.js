const startBtn = document.querySelector("#startBtn"); 
const timer = document.querySelector("#timer");
const timeRemain = 90;

function startQz(){
    startTmr();

}

function startTmr(){

    var tmrInterval = setInterval(function(){

        secondsLeft--;

        timer.textContent = "Time : "+timeRemain+ " seconds";
        if(timeRemain <= 0){
            viewResult();
            clearInterval(tmrInterval);
            timer.text = "";
        }
    }, 1000);
    console.log(timer);
}

startBtn.addEventListener("click",startBtn);