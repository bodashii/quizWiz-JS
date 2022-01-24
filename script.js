const startBtn = document.querySelector("#startBtn"); 
const timer = document.querySelector("#timer");
const content = document.querySelector("#content");
const qzContent = document.querySelector("#qzContent");
const highscoreLink = document.querySelector("#highscoreLink");
const qzEl = document.querySelector("#title");


var timeRemain = 60;
const totalQz = questions.length;
const questionIndex = 0;
const input = 0;
const choiceArray = [], subjectArray = [];



// start buttons for choices
for(var j = 0 ; j < 4; j++){
    var subject = document.createElement("div");
    var opt = document.createElement("button");
    opt.setAttribute("data-index", j);
    opt.setAttribute("class", "btn btn-primary rounded-pill mb-2");
    choiceArray.push(opt);
    subjectArray.push(subject);
}


function startQz(){

    startTmr();
    buildQuestion();

}

function startTmr(){

    var tmrInterval = setInterval(function(){

        timeRemain--;

        timer.textContent = "Time : "+timeRemain+ " seconds";
        if(timeRemain <= 0 || (questionIndex > totalQz - 1)){

            qzContent.style.display = "none";
            clearInterval(tmrInterval);
            timer.textContent = "";
        }
    }, 1000);

}

function buildQuestion(){

    qzEl.style.display= "none";
    content.style.display= "none";
    qzContent.style.display= "none";

    if(questionIndex > totalQz - 1 ){
        return;
    }
    else {
        correct = questions[questionIndex].answer;

        // display question
        qzEl.innerHTML = questions[questionIndex].title;
        qzEl.setAttribute("class","text-left");
        qzEl.style.display= "block";

        for (var i = 0; i < 4; i++){
            var index = choiceArray[i].getAttribute("data-index");
            choiceArray[i].textContent = (+index+1) + ". "+questions[questionIndex].choices[index];
            subjectArray[i].appendChild(choiceArray[i]);
            qzContent.appendChild(subjectArray[i]);
        }

    }
    qzContent.style.display= "block";
}
// 
qzContent.addEventListener("click", function(event){

    let choice = event.target;
    let answerOpt = choice.textContent;
    let otherOpt = answerOpt.substring(3, answerOpt.length);

        if(otherOpt === input){
            correct++;
        }

        questionIndex++;
        buildQuestion();
    
});

startBtn.addEventListener("click",startQz);