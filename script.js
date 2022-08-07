const cards=document.querySelectorAll('.card');
let cardOne,cardTwo;
let openCard=false;
let match=0;

function flipCard({target: clickedCard}){
    
    if(clickedCard!=cardOne && !openCard){
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne=clickedCard;
        }        
        cardTwo=clickedCard;
        openCard=true;
        macthcard(cardOne.querySelector('img').src,cardTwo.querySelector('img').src);

    }
}

function macthcard(img1,img2){
    if(img1===img2){
        match++;
        if(match===8){
            setTimeout(()=>{
                return shufflecard();
            },1000)
        }
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne.style.cursor="default";
        cardTwo.style.cursor="default";
        cardOne = cardTwo = "";              
        return openCard=false;
    }

    setTimeout(()=>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
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
    openCard = false;
    cardOne = cardTwo = "";
    
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

