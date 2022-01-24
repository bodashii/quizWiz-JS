const startBtn = document.querySelector("#startBtn"); 
const timer = document.querySelector("#timer");
const content = document.querySelector("#content");
const qzContent = document.querySelector("#qzContent");
const highscoreLink = document.querySelector("#highscoreLink");
const qzEl = document.querySelector("#title");
let verdictDiv =document.querySelector("#verdict");
let scoreDiv = document.querySelector("#score");
let navlink = document.getElementById("#navLeaderboard");


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
// sets response if question correct or wrong
var verdict  = document.createElement("p");
verdict.setAttribute("class", "text-muted");
verdictDiv.appendChild(verdict);

// starts quiz
function startQz(){

    startTmr();
    buildQuestion();

}
// starts timer
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
//  this builds each question
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
// this displays each question as user progresses and deducts time
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
    showLeaderboard();
}
// dynamically creates table to display leaderboard
function showLeaderboard(){
    qzEl.innerHTML = "Leaderboard";
    qzEl.setAttribute("class","text-center text-info");
    qzEl.style.display = "block";

    qzContent.style.display = "none";
    scoreDiv.style.display = "none";

        // display table with leaderboards
        let t = document.createElement("table");
        t.setAttribute("id","table");
        t.style.textAlign = "center";

        let tBody = document.createElement("tbody");

        let row = document.createElement("tr");

        let head = document.createElement("th");
        let headText = document.createTextNode("Name");
        head.setAttribute("class","bg-info");
        head.appendChild(headText);
        row.appendChild(head);

        let head1 = document.createElement("th");
        let headText1 = document.createTextNode("Name");
        head1.setAttribute("class","bg-info");
        head1.appendChild(headText1);
        row.appendChild(head1);

        tBody.appendChild(row);

        let uLength = 0;
        if(pastScores){
            uLength = pastScores.length;
        }

        for (let i = 0; i < uLength; i++){
            let row = document.createElement("tr");

            let uName = pastScores[i].name;
            let uScore = pastScores[i].score;

            let cell = document.createElement("td");
            let cellText = document.createTextNode(uName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            let cell1 = document.createElement("td");
            let cellText1 = document.createTextNode(uName);
            cell.appendChild(cellText1);
            row.appendChild(cell1);

            tBody.appendChild(row);
        }

        // place tbody on table
        if(uLength > 0){
            buildQuestion.appendChild(tBody);
        }

        t.setAttribute("border", "2");
        t.setAttribute("width", "100%");

        leaderBoard.appendChild(t);

        var scoreBtn = document.createElement("div");
        scoreBtn.style.textAlign = "center";
        leaderBoard.appendChild(scoreBtn);

    navlink.style.display = "none";

    let back = document.createElement("button");
    back.setAttribute("class", "btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    back.textContent = "back to quiz";
    scoreBtn.appendChild(back);

    back.addEventListener("click",function(){
        window.location= "index.html";
    });

    let clear = document.createElement("button");
    clear.setAttribute("class", "btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    clear.textContent = "clear scores";
    scoreBtn.appendChild(clear);
    
    clear.addEventListener("click", function(){
        localStorage.clear();
        var table = document.querySelector("#table");
        table.style.display = "none";
    });
}

// navigate to highscore
highscoreLink.addEventListener("click",function(){
    content.style.display = "none";
    navlink.style.display = "none";

    pastScores = JSON.parse(localStorage.getItem("pastScores"));
    showLeaderboard();
});


startBtn.addEventListener("click",startQz);