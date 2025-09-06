let button = document.querySelector('.btn')
let button2 = document.querySelector('.btn1')
let dropdown = document.querySelector('.dropdown')
let question = document.querySelector('#ques')
let cate = document.querySelector('#cat')
let difficult = document.querySelector('#dif')
let typ = document.querySelector('#typ')
let mcq = document.querySelector('.mcq')
let button3 = document.querySelector('.btn2')
let option = document.querySelector('.option')
let options = document.querySelector('.options')
let heading = document.querySelector('.heading')
let container= document.querySelector('.qcontainer')
let result = document.querySelector('.result')
let score = document.querySelector('.score')
let live = document.querySelector('.live')
let last = document.querySelector('.last')
let resetBtn = document.querySelector('.reset');
resetBtn.style.display = "none";

let count = 0
let currentIndex = 0


let category = ''
let amount = 0
let difficulty = ''
let type = ''
let token = '';

async function getToken() {
    const res = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await res.json();
    token = data.token; // save it
}
getToken();


let store = (()=>{
    button.addEventListener('click',()=>{
        button.classList.add('hide')
        dropdown.classList.remove('dropdown')
    })
})
store()

async function loadCategories() {
    let api = await fetch('https://opentdb.com/api_category.php')
    let response = await api.json()

    response.trivia_categories.forEach(cat => {
        let create = document.createElement('option')
        create.value = cat.id
        create.textContent = cat.name
        cate.appendChild(create)

    });
}
loadCategories()


button2.addEventListener('click',()=>{
    category = cate.value
    amount = question.value
    difficulty = difficult.value
    type = typ.value
    if (!amount || !category || !difficulty || !type) {
        alert("Please select all options!");
        return;
    }
    dropdown.classList.add('hide')
    mcq.classList.remove('hide')
    
    quiz()
})




async function quiz(){
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}
`
    const api = await fetch(url)
    const response = await api.json()

    if (response.response_code === 3) {
        // Token expired → get a new one and try again
        await getToken();
        return quiz(); // retry
    }
    // console.log(response)
    let questions = response.results

    showQuestion(questions[currentIndex])
    console.log(questions)

   button3.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion(questions[currentIndex]);
    } else {
        mcq.classList.add('hide');
        result.classList.remove('hide');
        last.innerText = `🎉 Final Score: ${count}/${amount}`;
        resetBtn.style.display = "block";
    }
};
}
function showQuestion(qObj){
    heading.innerHTML = qObj.question;
    let answers = [...qObj.incorrect_answers];
    answers.push(qObj.correct_answer);
    answers = shuffle(answers);

    options.innerHTML = "";
    button3.disabled = true;   // lock Next until answered

    answers.forEach(ans => {
        let btn = document.createElement("button");
        btn.classList.add("option");
        btn.innerHTML = ans;
        btn.addEventListener("click", () => {

             // Disable all buttons after first click
            let allBtns = options.querySelectorAll(".option");
            allBtns.forEach(b => b.disabled = true);

            if(ans === qObj.correct_answer){
                btn.classList.add('correct')
                count +=1
            } else {
                btn.classList.add('wrong')
            }
            live.innerText = `Score: (${count}/${amount})`
            allBtns.forEach(b => {
                    if(b.innerHTML === qObj.correct_answer){
                        b.classList.add('correct')
                    }
                    });
                    button3.disabled = false;  // unlock Next
        });
        options.appendChild(btn);
       
    });

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetQuiz() {
    count = 0;
    currentIndex = 0;
    live.innerText = "";
    last.innerText = "";
    options.innerHTML = "";
    heading.innerText = "";

    result.classList.add("hide");
    mcq.classList.add("hide");
    dropdown.classList.remove("hide");
    resetBtn.style.display = "none";
}

resetBtn.addEventListener("click", resetQuiz);
