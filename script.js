const cards=document.querySelectorAll('.card');
let cardOne,cardTwo;
let openCard=false;
let match=0,flip=0;
const wrongAudio=new Audio('./effect/wrong_card.wav');
const rightAudio=new Audio('./effect/right_card.wav');
const winAudio=new Audio('./effect/win.mp3');

const jsConfetti = new JSConfetti();

async function hurrey(){
    await jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        confettiRadius: 6,
        confettiNumber: 200,
        emojiSize: 40
    });
    setTimeout(()=>{
        window.location.reload();
    },3000);
}

function flipCard({target: clickedCard}){
    
    if(clickedCard!=cardOne && !openCard){
        
        clickedCard.classList.add("flip");
        flip++;
        document.getElementById('flipscore').innerText="flips:"+flip;
        if(!cardOne){
            return cardOne=clickedCard;
        }        
        rightAudio.pause();
        rightAudio.currentTime = 0;
        
        cardTwo=clickedCard;
        openCard=true;
        macthcard(cardOne.querySelector('img').src,cardTwo.querySelector('img').src);

    }
}

function macthcard(img1,img2){
    if(img1===img2){
        match++;

        let per=(match*100)/8;
        document.getElementById('percentage').innerText=Math.trunc(per)+"%";
        document.querySelector('.fillbar').style.width=per+"%";

        if(match===8){
            setTimeout(()=>{
                winAudio.play();
                hurrey();
                return shufflecard();
            },1000)   
        }
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne.style.cursor="default";
        cardTwo.style.cursor="default";
        cardOne = cardTwo = "";  
        setTimeout(()=>{
            rightAudio.pause();
            rightAudio.currentTime = 0;
            rightAudio.play();            
        },400);
        return openCard=false;
    }

    setTimeout(()=>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        wrongAudio.play();
    },500);
    
    setTimeout(()=>{
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = "";
        openCard=false;
    },1100);

}

function shufflecard(){
    matched = 0;
    flip = 0;
    openCard = false;
    cardOne = cardTwo = "";
    document.getElementById('flipscore').innerText="flips:" + flip;
    document.getElementById('percentage').innerText="0%";
    document.querySelector('.fillbar').style.width="0%";

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back img");
        imgTag.src = `img/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shufflecard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

document.querySelector('.replay').addEventListener("click",()=>{
    shufflecard();
});

