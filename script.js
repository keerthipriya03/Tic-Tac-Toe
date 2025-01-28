let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector(".msg");
let newbtn = document.querySelector("#newgame");
let display = document.querySelector("#display");
let buttons = document.getElementById('buttons');
display.innerHTML="Player1 Turn";

let turn1=true;
let count=0;

const arr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        // console.log("clicked");
        if(turn1){
            box.innerHTML="X";
            turn1=false;
            display.innerHTML="Player2 Turn";
        }
        else{
        box.innerHTML="O";
        turn1=true;
        display.innerHTML="Player1 Turn";
        }
        box.disabled = true;   // to make no changes after clicking
        count++;
        let isWinner=checkWinner();

        if(count === 9 && !isWinner){
            draw();
        }
    });
});

const draw = ()=>{
    display.classList.add("hide");
    msg.innerText = `Draw!!!`;
    msg.classList.remove("hide");
    disableBoxes();
    buttons.classList.remove("hide");
};

const resetGame = ()=>{
    turn1=true;
    count=0;
    enableBoxes();
    msg.classList.add("hide");
    buttons.classList.add("hide");
    display.classList.remove("hide");
    display.innerHTML="Player1 Turn";
};

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const checkWinner = ()=>{
    for(let i of arr){
        let first = boxes[i[0]].innerText;
        let second = boxes[i[1]].innerText;
        let third = boxes[i[2]].innerText;

        if(first!="" && second!="" && third!=""){
            if((first === second) && (second===third)){
                let ans=first;
                console.log("WInner ",first);
                printWinner(ans);
                return true;
            }
        }
    }
};

const printWinner = (ans)=>{
    display.classList.add("hide");
    msg.classList.remove("hide");
    if(ans=='O'){
        res = "Player 2";
    }
    else{
        res = "Player 1";
    }
    msg.innerText = `Congratulations, Winner is ${res}`;
    disableBoxes();
    buttons.classList.remove("hide");
};

reset.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);
