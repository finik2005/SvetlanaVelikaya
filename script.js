/* ======================================
            НАСТРОЙКИ
====================================== */

const TEXT = {

    correct: "Правильно молодец",

    finish: "За 150руб сделаю с любыми фото и текстом tg @mmpler",

    mistakes: [

        "Оценивай человека на фото а не себя",

        "Ты хуже чем я думал",

        "Можешь закрывать сайт еблан",

        "пизда"

    ]

};


/* ======================================
            ВОПРОСЫ
====================================== */

const QUESTIONS = [

    {

        image:"images/1.jpg",

        question:"Как выглядит этот человек",

        answers:[

            "Нормально",

            "Шикарно",

            "Пойдет",

            "Красиво"

        ],

        correct:1

    },

    {

        image:"images/2.jpg",

        question:"Оцените человека по десятибальной шкале",

        answers:[

            "8",

            "2",

            "100",

            "10"

        ],

        correct:2

    },

    {

        image:"images/3.jpg",

        question:"Человек на фото вызывает у вас положительные эмоции?",

        answers:[

            "Да",

            "Нет",

            "Не знаю",

            "..."

        ],

        correct:0

    },

    {

        image:"images/4.jpg",

        question:"Когда я смотрю на этого человека я...",

        answers:[

            "У меня текут слюнки",

            "Я ничего не испытываю",

            "Я хочу спрятаться под одеяло",

            "Первый вариант правильный"

        ],

        correct:3

    },

    {

        image:"images/5.jpg",

        question:"Я устал придумывать вопросы гадай сама",

        answers:[

            "Ахуенная",

            "Вайбовая",

            "Имбовая",

            "Симпатичная"

        ],

        correct:3

    }

];


/* ======================================
            ПЕРЕМЕННЫЕ
====================================== */

let currentQuestion = 0;

let mistakes = 0;


/* ======================================
            ЭЛЕМЕНТЫ
====================================== */

const container = document.querySelector(".container");
const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");
const message = document.getElementById("message");
const answers = document.getElementById("answers");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeImage = document.getElementById("closeImage");


/* ======================================
        ПРЕДЗАГРУЗКА КАРТИНОК
====================================== */

function preloadImages(){

    QUESTIONS.forEach(q=>{

        const img = new Image();

        img.src = q.image;

    });

    const finish = new Image();

    finish.src = "images/6.jpg";

}


/* ======================================
    АВТОРАЗМЕР ВОПРОСА
====================================== */

function fitQuestion(){

    const len = questionText.textContent.length;

    let size = 30;

    if(len > 45) size = 27;

    if(len > 70) size = 23;

    if(window.innerWidth <= 700){

        size = 20;

        if(len > 45) size = 18;

        if(len > 70) size = 16;

    }

    questionText.style.fontSize = size + "px";

}

window.addEventListener("resize", fitQuestion);


/* ======================================
        ПОКАЗ ВОПРОСА
====================================== */

function showQuestion(){

    mistakes = 0;

    message.textContent = "";

    const q = QUESTIONS[currentQuestion];

    questionText.textContent = q.question;

    fitQuestion();

    questionImage.src = q.image;

    answers.innerHTML = "";

    q.answers.forEach((text,index)=>{

        const button = document.createElement("button");

        button.textContent = text;

        button.onclick = ()=>checkAnswer(index,button);

        answers.appendChild(button);

    });

}
/* ======================================
        ПРОВЕРКА ОТВЕТА
====================================== */

function checkAnswer(index,button){

    const q = QUESTIONS[currentQuestion];

    if(index===q.correct){

        button.classList.add("correct");

        message.textContent = "✅ " + TEXT.correct;

        [...answers.children].forEach(btn=>btn.disabled=true);

        setTimeout(nextQuestion,900);

    }else{

        mistakes++;

        button.disabled=true;

        button.classList.add("wrong");

        const text=TEXT.mistakes[
            Math.min(
                mistakes-1,
                TEXT.mistakes.length-1
            )
        ];

        message.textContent="❌ "+text;

    }

}


/* ======================================
        СЛЕДУЮЩИЙ ВОПРОС
====================================== */

function nextQuestion(){

    container.style.opacity="0";

    container.style.transform="translateY(20px) scale(.98)";

    setTimeout(()=>{

        currentQuestion++;

        if(currentQuestion>=QUESTIONS.length){

            showFinish();

            return;

        }

        showQuestion();

        container.style.opacity="1";

        container.style.transform="translateY(0) scale(1)";

    },280);

}


/* ======================================
          ФИНАЛ
====================================== */

function showFinish(){

    container.innerHTML=`

        <div class="finish">

            <div class="finish-image-box">

                <img
                    src="images/6.jpg"
                    alt="Финал">

            </div>

            <p>${TEXT.finish}</p>

        </div>

    `;

    container.style.opacity="0";

    container.style.transform="translateY(20px) scale(.98)";

    setTimeout(()=>{

        container.style.opacity="1";

        container.style.transform="translateY(0) scale(1)";

    },40);

}


/* ======================================
        ПРОСМОТР КАРТИНКИ
====================================== */

questionImage.onclick=()=>{

    modalImage.src=questionImage.src;

    modal.classList.add("show");

};

closeImage.onclick=()=>{

    modal.classList.remove("show");

};

modal.onclick=(e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

    }

};


/* ======================================
            ЗАПУСК
====================================== */

preloadImages();

showQuestion();
