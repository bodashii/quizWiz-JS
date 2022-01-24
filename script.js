const startBtn = document.querySelector("#startBtn"); 
const timer = document.querySelector("#timer");
const content = document.querySelector("#content");
const qzContent = document.querySelector("#qzContent");
const highscoreLink = document.querySelector("#highscoreLink");
const qzEl = document.querySelector("#title");
let verdictDiv =document.querySelector("#verdict");
let scoreDiv = document.querySelector("#score");


var timeRemain = 60;
const totalQz = questions.length;
let questionIndex = 0;
let correct = 0;
let aChoice;
let pastScores;
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

var verdict  = document.createElement("p");
verdict.setAttribute("class", "text-muted");
verdictDiv.appendChild(verdict);


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
        aChoice = questions[questionIndex].answer;

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

        if(otherOpt === aChoice){
            correct++;
            verdictDiv.style.display = "block";

            verdict.textContent = "Great Job!"

            setTimeout(function(){
                verdict.textContent = "";
            },500);
        }
        else {
            timeRemain -= 10;

            verdict.textContent = "Better luck next time..."

            setTimeout(function(){
                verdict.textContent = "";
            },500);
        }

        questionIndex++;
        buildQuestion();
});

// shows score when done
function viewVerdict(){

    qzEl.innerHTML = "All done!";
    qzEl.style.display = "block";

    let k = document.createElement("p");
    k.textContent = "Your Score : "+correct;
    scoreDiv.appendChild(k);

    let form = document.createElement("form");

    let label = document.createElement("label");
    label.textContent = "Your name : ";

    let text = document.createElement("input");
    text.setAttribute("id","name");
    text.setAttribute("class","ml-3");

    let postButton = document.createElement("button");
    postButton.setAttribute("class","btn btn-primary rounded-pill mb-2 ml-3 mt-2");
    postButton.textContent = "Post My Score";

    scoreDiv.appendChild(form);

    postButton.addEventListener("click", saveScore);
}

function saveScore(event){
    event.preventDefault();
    let user = document.querySelector("#name").ariaValueMax.trim();

    if(user === null || user === ''){
        alert("Name is required...");
        return;
    }

    let u = {name : user, score : correct}
    console.log(u);

    pastScores = JSON.parse(localStorage.getItem("pastScores"));

    if(pastScores){
        pastScores.push(u);
    }
    else{
        pastScores = [u];
    }

    // post submission
    localStorage.setItem("pastScores", JSON.stringify(pastScores));
}

startBtn.addEventListener("click",startQz);