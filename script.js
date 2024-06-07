const buttons = document.querySelectorAll("button");

function gameboard (gameArray){
    let gameOn = false;


    
    const gameTurn = (position,letter,square0,squareXO) => {
        for(let i = 0 ; i < gameArray.length ; i++){
            for(let j = 0 ; j < gameArray[i].length ; j++){
                if(gameArray[i][j] == position){
                    gameArray[i][j] = letter;
                    if(letter == "X"){
                        square0[i][j] = squareXO[i][j];
                        if(searchWinner(square0,15))gameOn = true;
                    };
                    if(letter == "O"){
                        square0[i][j] = squareXO[i][j];
                        if(searchWinner(square0,30))gameOn = true;
                    
                    };
                    console.log(gameArray);  
                    return; 
                }        
            }
        
        }
        
        console.log("Posición no válida. Inténtelo de nuevo.");
    }
  
    return {gameArray,gameTurn,getGameOn: () => gameOn}
};

function calculateSums(square) {
    const n = square.length;
    const sums = {
      rows: Array(n).fill(0),
      columns: Array(n).fill(0),
      diagonals: [0, 0]
    };
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        sums.rows[i] += square[i][j];
        sums.columns[j] += square[i][j];
        if (i === j) {
          sums.diagonals[0] += square[i][j];
        }
        if (i + j === n - 1) {
          sums.diagonals[1] += square[i][j];
        }
      }
    }
  
    return sums;
}

function searchWinner(searchSquare,searchValue){
    sumsObject = calculateSums(searchSquare);
    const foundRows = sumsObject.rows.find((element) => element == searchValue);
    const foundColumns = sumsObject.columns.find((element) => element == searchValue);
    const foundDiagonals = sumsObject.diagonals.find((element) => element == searchValue);
    if (foundRows !== undefined || foundColumns !== undefined || foundDiagonals !== undefined) {
        return true;
    }
    return false;
}


function createPlayer(name) {
    let playCallback;

    const play = (callback) => {
        playCallback = callback;
    };

    const makeMove = () => {
        if (playCallback) {
            playCallback();
        }
    };

    

    return { name, play, makeMove };
}

function letsPlay(){
    const game = gameboard(
        [["a1","a2","a3"],
        ["b1","b2","b3"],
        ["c1","c2","c3"]]);

    const inputDiv = document.getElementById("input-div");
    const playerForm = document.createElement("form");
    const playerOneInput = document.createElement("input");
    playerOneInput.placeholder = "player 1 name";
    const playerTwoInput = document.createElement("input");
    playerTwoInput.placeholder = "player 2 name";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Start";
    submitButton.style.width="50px";
    submitButton.style.height ="20px";

    let player1, player2;

    playerForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        playerOneInput.value != "" ? playerOneName = playerOneInput.value : playerOneName = "player 1";
        playerTwoInput.value != "" ? playerTwoName = playerTwoInput.value : playerTwoName = "player 2";
        player1 = createPlayer(playerOneName);
        player2 = createPlayer(playerTwoName);
        // inputDiv.style.display = "none";

        startGame();
    });


    inputDiv.appendChild(playerForm);
    playerForm.appendChild(playerOneInput);
    playerForm.appendChild(playerTwoInput);
    playerForm.appendChild(submitButton);


    

    let square0 = [  
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    const squareX = [
        [2, 7, 6],
        [9, 5, 1],
        [4, 3, 8]
    ];

    const squareO = [
        [4, 14, 12],
        [18, 10, 2],
        [8, 6, 16]
    ];

    let currentPlayer = player1;
    let currentLetter = "X";
    let currentSquare = squareX;

    function nextTurn() {
        if (game.getGameOn()) {
            document.getElementById('gameStatus').innerText = `${currentPlayer.name} gana!`;
            return;
        }
        currentLetter = (currentLetter === "X") ? "O" : "X";
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        
        currentSquare = (currentSquare === squareX) ? squareO : squareX;
    }

    function handleMove(position) {
        game.gameTurn(position, currentLetter, square0, currentSquare);
        nextTurn();
    }

    function startGame(){
        player1.play(handleMove);
        player2.play(handleMove);

       

        document.querySelectorAll(".button").forEach(button => {
            button.addEventListener('click', (event) => {
                console.log(player1.name);
                currentPlayer === player1 ? button.textContent = "X" : button.textContent = "O";
                button.style.fontSize = "90px";
                button.textContent === "X" ? button.style.color = "red" : button.style.color = "black";
                const position = event.target.id;
                // currentPlayer.
                handleMove(position);
                event.target.disabled = true;  // Desactivar el botón después de hacer una jugada
                
            });
        });

        const restartButton = document.createElement("button");
        const inputDiv = document.getElementById("input-div");
        inputDiv.removeChild(playerForm);

        restartButton.style.width = "100px";
        restartButton.style.height = "30px";
        restartButton.textContent = "restart";
        inputDiv.appendChild(restartButton);
        restartButton.addEventListener("click", () => {
            document.querySelectorAll(".button").forEach(button => {
                button.textContent = "";
                button.disabled = false;
                button.style.color = "black";
            });
            document.getElementById('gameStatus').innerText = "";
            inputDiv.removeChild(restartButton);
            letsPlay();
        });
        
    }
    


    
    
    

}



letsPlay();