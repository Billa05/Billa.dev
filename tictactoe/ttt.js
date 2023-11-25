const blocks=document.querySelectorAll(".row > div")
let player ="X"
let board = [[null,null,null],[null,null,null],[null,null,null]]
var count =0
const msg=document.querySelector('.status');

for(const block of blocks){
    block.addEventListener("click",check);
}

function check(){
    let index = Array.from(blocks).indexOf(this);
    let row = Math.trunc(index/3);
    let col = index%3;

    if(this.textContent==""){
        if(player=="X"){
            count+=1
            this.textContent = player;
            board[row][col]=this.textContent;
            player="O"
            if (check_win(this.textContent)){
                win(this.textContent)
            }
            else{
                if (count==9){
                    msg.textContent="It's a draw"
                    reStart_btn=document.createElement("button");
                    reStart_btn.textContent="RESTART GAME";
                    document.body.append(reStart_btn);
                    reStart_btn.addEventListener("click",reStart);
                }
            }

        }
        else if(player=="O"){
            count+=1
            this.textContent = player;
            board[row][col]=this.textContent;
            player="X"
            if (check_win(this.textContent)){
                win(this.textContent)
            }
            else{
                if (count==9){
                    msg.textContent="It's a draw"
                    reStart_btn=document.createElement("button");
                    reStart_btn.textContent="RESTART GAME";
                    document.body.append(reStart_btn);
                    reStart_btn.addEventListener("click",reStart);
                }
            }
        }

    }
}

function check_win(match){
    for(let i=0;i<3;i++){
        if (board[0][i]==match && board[1][i]==match && board[2][i]==match)return true;
        if (board[i][0]==match && board[i][1]==match && board[i][2]==match)return true;
    }
    if(board[0][0]==match && board[1][1]==match && board[2][2]==match)return true;
    if(board[0][2]==match && board[1][1]==match && board[2][0]==match)return true;

    return false;
}

function reStart(){
    player="X"
    msg.textContent=""
    count=0
    board = [[null,null,null],[null,null,null],[null,null,null]]
    for(const block of blocks){
        block.addEventListener("click",check);
        block.textContent="";
    }
    reStart_btn.parentNode.removeChild(reStart_btn)
}

function win(player){
    msg.textContent= player + " wins";
    reStart_btn=document.createElement("button");
    reStart_btn.textContent="RESTART GAME";
    document.body.append(reStart_btn);
    reStart_btn.addEventListener("click",reStart);

    for(const block of blocks){
        block.removeEventListener("click",check);
    }
}