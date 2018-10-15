var board = [];
 board.length=9;
var keyvalue='X';
var turnnumber=0;
var roundnumber=1;


//creating player object
function Player(){
    this.index=1;
    this.key='X',
    this.score=0;
}

//creating players
var player1= new Player();
var player2= new Player();
player2.key='O';
player2.index=2;

var winningindex=[];    //variable to store the index values of the winning squares

play(); //starts the game

//initialises the array with empty values
function initializeboard(){
     var count=0;
     while(count<board.length){
         board[count++]=" ";
     }
}

//generates grid on screen
function updategrid(){
    var count=0;
    var html="";
    turnnumber=0;
    while(count<(9)){
        html += '<tr>'; 
        for(var j=0;j<3;j++){
            html+='<td>' + board[count++] + '</td>';
        }
        html += '</tr>';
      };
    document.getElementById('board').innerHTML = html;
    
    var cells = document.getElementsByTagName("td"); 
//generate id for each square
    for (var i = 0; i < cells.length; i++) {
        cells[i].id=i;
    }
}
 
function play(){

    if(roundnumber==1){
        document.getElementById("play1").style.color="yellow";
    }
    if(roundnumber%2==0){ //used so that same player doesnt start every round
        
        keyvalue='O';
    }
    else
        {
            
            keyvalue='X';
        }
    document.getElementById("winner").style.color="white";
    document.getElementById("newround").style.display="none";
    document.getElementById("winner").innerHTML="Game has begun";
    document.getElementById("roundnum").innerHTML=roundnumber;
    initializeboard();
    updategrid();
    updatescores();
    var Winnerfound=false;
    var cells = document.getElementsByTagName("td"); 
    
    for (var i = 0; i < cells.length; i++) { 
        cells[i].onclick = function(){//adding onclick to each square
            if(this.innerHTML==" "){
                    var element=this.id;
                    board[element]=keyvalue;
                    this.innerHTML=keyvalue;
                    turnnumber++;
 //highlight user that has to do the next turn
                    if(turnnumber%2==0 && roundnumber%2==0){
                        document.getElementById("play1").style.color="white";
                        document.getElementById("play2").style.color="yellow";
                    }
                    
                    if(turnnumber%2==0 && roundnumber%2!==0){
                        document.getElementById("play2").style.color="white";
                        document.getElementById("play1").style.color="yellow";
                    }
                    
                 if(turnnumber%2!=0 && roundnumber%2==0){
                      document.getElementById("play2").style.color="white";
                      document.getElementById("play1").style.color="yellow";
                 }
                
                    
                 if(turnnumber%2!=0 && roundnumber%2!==0){
                      document.getElementById("play1").style.color="white";
                      document.getElementById("play2").style.color="yellow";
                 }
                    
                    if(turnnumber>=5){ //starts checking for wins only after 5th turn
                             Winnerfound=checkcolumns();
                             if(Winnerfound)
                             {
                                 endRound();
                                 return;
                             }
                             else
                               Winnerfound=checkrows();

                             if(Winnerfound)
                             {
                                 endRound();
                                 return;
                             }
                             else
                               Winnerfound=checkdiagonals();

                             if(Winnerfound)
                             {
                                 endRound();
                                 return;
                             }

                   }

                if(keyvalue=='X')
                           keyvalue='O';
                       else
                           keyvalue='X';
            };
       
     if(turnnumber>=9){ //if number of turns reaches 9 then game ends as draw
               document.getElementById("winner").innerHTML="Round is a draw";
               document.getElementById("winner").style.color="red";
               document.getElementById("newround").style.display="block";
                roundnumber++;
               return;
           }
    };  
  }
}

function checkcolumns(){ //checking for column wins
    var i;
    for(i=0;i<=3;i++)
        {   
            if(board[i]==board[i+3] && board[i+3]==board[i+6] && board[i+6]==keyvalue)  {    
               winningindex=[i,i+3,i+6];
               return true;
            }
        }
    return false;
}

function checkrows(){ //checking for row wins
    var i=0;
    while(i<=6)
        {
            if(board[i]==board[i+1] && board[i+1]==board[i+2] && board[i+2]==keyvalue){
                winningindex=[i,i+1,i+2];
                return true;
            }
            i=i+3;
        }
    return false;
}

function checkdiagonals(){ //checking for diagonal wins
    if(board[0]==board[4] && board[4]==board[8] && board[8]==keyvalue){
        winningindex=[0,4,8];
        return true;
    }
   if(board[2]==board[4] && board[4]== board[6] && board[6]==keyvalue){
        winningindex=[2,4,6];
        return true;
    }
    return false;
}

function updatescores(){  //update scores on screen
    document.getElementById("player1score").innerHTML=player1.score;
    document.getElementById("player2score").innerHTML=player2.score;
}

function resetscores(){ //resets scores
    player1.score=0;
    player2.score=0;
    updatescores();
}

function endRound(){
    var i;
    roundnumber++;
    document.getElementById("newround").style.display="block";
    if(player1.key==keyvalue){
    document.getElementById("winner").innerHTML="Player 1 Wins!";
        document.getElementById("winner").style.color="red";
    player1.score++;
        var cells = document.getElementsByTagName("td"); 
        for (var i = 0; i < cells.length; i++){
        cells[i].style.pointerEvents = "none";
    }
        for(i=0;i<3;i++)
        document.getElementById(winningindex[i]).classList.add("highlight");
        updatescores();
        
    }
    else{
        document.getElementById("winner").innerHTML="Player 2 Wins!";
        document.getElementById("winner").style.color="red";
        for(i=0;i<3;i++)
        document.getElementById(winningindex[i]).classList.add("highlight");
        
        player2.score++;
        updatescores();
        var cells = document.getElementsByTagName("td"); 
        for (var i = 0; i < cells.length; i++){
            cells[i].style.pointerEvents = "none";
            }
        }
}
