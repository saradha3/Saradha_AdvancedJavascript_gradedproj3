let para = document.querySelector('.paragraph p');
let inputText = document.querySelector('.input');
let errors =  document.querySelector('.errors');
let timeTag = document.querySelector('.time');
let cpmTag = document.querySelector('.cpm p:nth-child(2)');
let wpmTag = document.querySelector('.wpm p:nth-child(2)');
let accuracyTag = document.querySelector('.accuracy p:nth-child(2)');
let restart = document.querySelector('.restart');
let charIndex = mistakes = 0;
let timer;
let maxTime = 60, isTyping = false;
let timeLeft = maxTime;
let characterCount;
let correctCharsTyped;
loadParagraph();

function loadParagraph(){
    let randomInt = Math.floor(Math.random() * paragraph.length);
    console.log(randomInt);
   // para.innerHTML = paragraph[randomInt];
    paragraph[randomInt].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        para.innerHTML += spanTag;
    })
    characterCount =  paragraph[randomInt].length; 
}

inputText.addEventListener('input', inputEventHandler);

function inputEventHandler(){
    if(!isTyping){
        timer = setInterval(startTimer,1000);
        isTyping = true;
    }
    
    let characters = document.querySelectorAll('span');
    let typedChar = inputText.value.split("")[charIndex];
    console.log(typedChar);
    if(typedChar == null){
        charIndex--;
        console.log(characters[charIndex].style.color);
        if(characters[charIndex].style.backgroundColor === 'red'){
            console.log(characters[charIndex].style.backgroundColor);
            characters[charIndex].style.backgroundColor = '';
            mistakes--;
        } 
        else if(characters[charIndex].style.color === 'red') {
            console.log(characters[charIndex].style.color);
            characters[charIndex].style.color = 'black';
            mistakes--;
        }
        else if (characters[charIndex].style.color === 'green'){
            characters[charIndex].style.color = 'black';
        }
        
        
    }
    else if(characters[charIndex].innerText === typedChar){
        console.log("Correct");
        characters[charIndex].style.color = 'green';
        charIndex++;
    }
    else{
        console.log("Incorrect");
        characters[charIndex].style.color = 'red';
        if(characters[charIndex].innerText === " "){
            characters[charIndex].style.backgroundColor = 'red';
        }
        mistakes++;
        charIndex++;
    }
    
    
    console.log(mistakes);
    console.log(errors.children[1]);
    errors.children[1].innerText = mistakes;
    correctCharsTyped = (inputText.value.length) - mistakes;
    calcAccuracy();
}

function calcCPM(){
    //correctCharsTyped = characterCount - mistakes;
    cpmTag.innerText = correctCharsTyped;
}

function calcWPM(){
    let words = (inputText.value.length)/5;
    wpmTag.innerText = words;
}

function calcAccuracy(){
    let accuracy = Math.round((correctCharsTyped/(inputText.value.length))*100);
    accuracyTag.innerText = accuracy;
}

function startTimer(){
    if(timeLeft>0){
        timeLeft--;
        console.log(timeTag.children[1]);
        timeTag.children[1].innerText = `${timeLeft}s`;
    }
    else{
        clearInterval(timer);
        alert("Time Up!!");
        calcCPM();
        calcWPM();
        calcAccuracy();
        document.querySelector('.cpm').classList.add('show');
        document.querySelector('.wpm').classList.add('show');
    }
   
}

restart.addEventListener('click', restartHandler);

function restartHandler(){
    window.location.reload();
}

