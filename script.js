const startBtn = document.querySelector("#startBtn"); 
const timer = document.querySelector("#timer");
const content = document.querySelector("#content");
const qzContent = document.querySelector("#qzContent");


const timeRemain = 90;

// start buttons for choices
for(var j=0 ; j < 4; i++){
    var subject = document.createElement("div");
    var opt = document.createElement("button");
    opt.setAttribute("data-index",i);
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

        secondsLeft--;

        timer.textContent = "Time : "+timeRemain+ " seconds";
        if(timeRemain <= 0){
            clearInterval(tmrInterval);
            timer.text = "";
        }
    }, 1000);

}

function buildQuestion(){



    if(questionIndex > totalQuestions =1){
        return;
    }
    else {
        correct = questions[questionIndex].answer;

        // display question
        questionEl.innerHTML = questions[questionIndex].title;
        questionEl.setAttribute("class","text-left");
        questionEl.style.display= "block";

        for (var i = 0; i <4; i++){
            var index = choiceArray[i].getAttribute("data-index");
            choiceArray[i].textContent = (+index+1) + ". "+questions[questionIndex].choices[index];
            divArray[i].appendChild(choiceArray[i]);
            qzContent.appendChild(divArray[i]);
        }

    }
    content.style.display= "block";
}

startBtn.addEventListener("click",startQz);