const playerFirst = document.querySelector(".playerFirst");
const divToe = document.querySelectorAll(".tacSquare");
const switchButton = document.querySelector(".switchButton");
//variabila de stocare
let playerOne = [];
let playerTwo = [];
let computerArray = [];
let compArr = [];
let equal = [];
//variabila pentru a stoca cu ce alege playerul sa joace X sau O
let player = 'X';
//variabila pentru a juca cu calculatorul sau cu player
let playerComp = 'player';
let scoreOne = 0;
let scoreTwo = 0;
let computerScore = 0;
//variabila pentru a pune calculatorul primul
let computerFirst = false;

//functie selectie X sau O si 

function selectXO(){
        const selectXO = document.querySelector(".selectXO");
        const playerCompAndPlayer = document.querySelector(".playerComp");
        
    divToe.forEach(el =>{
    el.addEventListener("click", (evt)=>{
        if(playerComp === 'player'){
            playerVsPlayer(evt) 
        } else if(playerComp === 'comp'){
            computerPlay(evt)
        }
        });
    })  
    
    
//buton schimbare computer sau player
playerCompAndPlayer.addEventListener('click', ()=>{
    /* playerFirst.disabled = false */
    document.querySelector(".scoreP1").innerHTML = "0"
    document.querySelector(".scoreP2").innerHTML = "0"
    switchButton.disabled = false;
    document.querySelector(".selectPlayerFirst").innerHTML= "Player" ;
    computerFirst = false;
    scoreOne = 0;
    computerScore = 0;
    if(playerComp === 'comp'){
        playerComp = "player";
        divToe.forEach(el =>{
            el.innerHTML = "";
            el.style.pointerEvents = "";
        });
        computerArray = [];
        compArr = [];
        equal = [];
        document.querySelector(".selectPlayerComp").innerHTML = 'Player Vs Player';
        document.querySelector(".playerWord").innerHTML = "Player X Score:"
        document.querySelector(".conputerScore").innerHTML = "Player O Score:"
        playerFirst.disabled = true
    }else if(playerComp === 'player'){
        playerComp = 'comp';
        document.querySelector(".selectPlayerComp").innerHTML = 'Player Vs Computer';
        document.querySelector(".playerWord").innerHTML = "Player Score:"
        document.querySelector(".conputerScore").innerHTML = "Computer Score:"
        playerFirst.disabled = false
    }
})
    
// buton schimbare X sau O
    switchButton.addEventListener("click", ()=>{
      
        if(playerComp === "comp" && computerFirst === true){
            
            divToe.forEach(el =>{
                el.innerHTML = "";
                el.style.pointerEvents = "";
            });
            computerArray = [];
            compArr = [];
            equal = [];
            console.log(player)
        }

     if(player === "X"){
        selectXO.innerHTML = 'O';
        player = "O"
        if(playerComp === "comp" && computerFirst === true){
            letsPlay()
        }
        return 
    } else if( player === "O"){
        selectXO.innerHTML = 'X';
        player = "X"
       if(playerComp === "comp" && computerFirst === true){
        letsPlay()
    }
        return
    }
});

//functie computer 
function computerPlay(element){
    if(player === 'X'){
        switchButton.disabled = true;
        playerCompAndPlayer.disabled = true;
        playerFirst.disabled = true
        element.target.innerHTML = "X";
        element.target.style.pointerEvents = 'none';
        player = "X";
        playerOne.push(element.target.id);
        equal.push(parseInt(element.target.id));
        compArr.push(parseInt(element.target.id));
        
        
    }   else if(player === 'O'){
        switchButton.disabled = true;
        playerCompAndPlayer.disabled = true;
        playerFirst.disabled = true;
        element.target.innerHTML = "O";
        element.target.style.pointerEvents = 'none';
        player = "O";
        playerOne.push(element.target.id);
        equal.push(parseInt(element.target.id));
        compArr.push(parseInt(element.target.id));
       
       }
       setTimeout(letsPlay, 100)
}


///functie playerVSplayer
function playerVsPlayer(ele){
    if(player === 'X'){
        switchButton.disabled = true;
        playerCompAndPlayer.disabled = true;
        playerFirst.disabled = true
        ele.target.innerHTML = "X";
        ele.target.style.pointerEvents = 'none';
        player = "O";
        playerOne.push(ele.target.id);
        equal.push(ele.target.id);
        winnerChoose(playerOne, playerTwo, computerArray, equal);
        
    }   else if(player === 'O'){
        switchButton.disabled = true
        playerCompAndPlayer.disabled = true;
            ele.target.innerHTML = "O"
            ele.target.style.pointerEvents = 'none';
            player = "X";
            playerTwo.push(ele.target.id);
            equal.push(ele.target.id);
            winnerChoose(playerOne, playerTwo, compArr, equal);  
       } 
}
}

selectXO()

//buton selectie cine sa puna primul
playerFirst.addEventListener("click", ()=>{
    const switchButton = document.querySelector(".switchButton")
    if(computerFirst === false){
        computerFirst = true
        computerTakeFirst()
        document.querySelector(".selectPlayerFirst").innerHTML = "Computer"
       switchButton.disabled = true
    } else if (computerFirst === true){
        switchButton.disabled = false
        divToe.forEach(el =>{
            el.innerHTML = "";
            el.style.pointerEvents = "";
        });
        computerArray = [];
        compArr = [];
        equal = [];
        computerFirst = false
        console.log(computerFirst)
        document.querySelector(".selectPlayerFirst").innerHTML = "Player"
    }
})

// functie ca sa puna calculatorul primul
function computerTakeFirst(){
    if(computerFirst === true && playerComp ==="comp"){
        letsPlay()
    }
}

//functie random Computer
function letsPlay(){
    let divNum = [0,1,2,3,4,5,6,7,8];
      let filter = divNum.filter(el =>{
          return !compArr.includes(el)
      })
      let randomNum = filter[Math.floor(Math.random()*filter.length)]
      if(randomNum !== undefined){
          compArr.push(randomNum);
          computerArray.push(randomNum);
          equal.push(randomNum);
      }
      winnerChoose(playerOne, playerTwo, computerArray, equal);
       document.getElementById(`${randomNum}`).style.pointerEvents = 'none';
      if(player === "X"){
          document.getElementById(`${randomNum}`).innerHTML = 'O';
      } else if(player === "O"){
          document.getElementById(`${randomNum}`).innerHTML = 'X';
      }
  }


// functie care selectaza castigatorul
function winnerChoose(p1, p2, comp, equal){
    const divToe = document.querySelectorAll(".tacSquare");
    const parseP1 = p1.map(el =>parseInt(el));
    const parseP2 = p2.map(el =>parseInt(el));
    const scoreP1 = document.querySelector(".scoreP1");
    const scoreP2 = document.querySelector(".scoreP2");
  
    const winTicTac = [
    //row wins
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //column wins
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal wins
    [0,4,8],
    [2,4,6],
];

let winComp = winTicTac.some(ele=>{
    return ele.every(el=>(comp.includes(el)))
    });

let winP1 = winTicTac.some(ele=>{
       return ele.every(el=>(parseP1.includes(el)))
    });

let winP2 = winTicTac.some(ele=>{
        return ele.every(el=>(parseP2.includes(el)))
    });


    if(winP1 === true){
        console.log(playerComp)
        if(playerComp === "comp"){
            Swal.fire({
                title: "Player Win",
                timer: 2000,
                showConfirmButton: true
            }).then(function() {
                setTimeout(resetAll, 200);
                setTimeout(computerTakeFirst, 250);
              })
        } else if(playerComp === "player"){
            Swal.fire({
                title: "X Win",
                timer: 2000,
                showConfirmButton: true
            }).then(function() {
               setTimeout(resetAll, 200);
               setTimeout(computerTakeFirst, 250);
                 })
        }
            scoreOne ++;
            console.log(scoreOne)
            scoreP1.innerHTML = scoreOne;
                divToe.forEach(el=>{
                 if(el.innerHTML === ""){
                     el.style.pointerEvents = 'none';
                }
            })
            return
    } else if(winP2 === true){
        Swal.fire({
            title: "O Win",
            timer: 2000,
            showConfirmButton: true
        }).then(function() {
            setTimeout(resetAll, 200);
            setTimeout(computerTakeFirst, 250);
          })
            scoreTwo += 1
            scoreP2.innerHTML = scoreTwo;
                divToe.forEach(el=>{
                    if(el.innerHTML === ""){
                        el.style.pointerEvents = 'none'
            }
        })
        return
    } else if(winComp === true){
        Swal.fire({
            title: "Computer Win",
            timer: 2000,
            showConfirmButton: true
        }).then(function() {
            setTimeout(resetAll, 200);
            setTimeout(computerTakeFirst, 250);
          })
            computerScore += 1;
            scoreP2.innerHTML = computerScore;
            divToe.forEach(el=>{
                if(el.innerHTML === ""){
                    el.style.pointerEvents = 'none'
                }
            })
            return
    }  else if(equal.length === 9 && (winP1 !== true && winP2 !== true && winComp !== true)){
        Swal.fire({
            title: "Equal",
            timer: 2000,
            showConfirmButton: true
        }).then(function() {
            setTimeout(resetAll, 200);
            setTimeout(computerTakeFirst, 250);
          });
            }
            
}
//functie resetare dupa ce se termina runda
function resetAll(){
    const switchButton = document.querySelector(".switchButton");
    const divToe = document.querySelectorAll(".tacSquare");
    const playerCompAndPlayer = document.querySelector(".playerComp");
    const selectXO = document.querySelector(".selectXO");
    divToe.forEach(el =>{
        el.innerHTML = "";
        el.style.pointerEvents = "";
    });
    player = selectXO.innerHTML;
    switchButton.disabled = false;
    playerCompAndPlayer.disabled = false;
        if(playerComp === "comp"){
                 playerFirst.disabled = false;
        }
    playerOne = [];
    playerTwo = [];
    computerArray = [];
    compArr = [];
    equal = [];
 }
//resetare totala cand apasam pe hader
const header =  document.querySelector("header")
header.addEventListener("click",resetAll)


const date = new Date();
let year = date.getFullYear();
const an = (document.getElementById("an").textContent = year + " @eduardbede ");