function phone(z){
    if(z.matches){
        var canvas = document.getElementById("phoneCanvas");
        var ctx = canvas.getContext("2d");
        var ballrad = 7;
        var x = canvas.width/2;
        var y = canvas.height - 30;
        var dx = 0;
        var dy = 0;
        var padheight = 10;
        var padwidth = 78;
        var padx = (canvas.width - padwidth)/2;
        var pady = canvas.height - padheight;
        var rightpress = false;
        var leftpress = false;
        var brickrow = 9;
        var brickcol = 5;
        var brickwidth = 30;
        var brickheight = 20;
        var brickpadding = 7;
        var brickoffsetleft = 10;
        var brickoffsettop = 30;
        var score = 0;
        var lives = 3;
        var cn = 0;
        var bricks = [];
        for(var c = 0 ; c < brickcol ; c ++){
            bricks[c] = [];
            for(var r = 0 ; r < brickrow ; r ++){
                bricks[c][r] = {x: 0, y: 0, status: 1};
                console.log(bricks[c][r]);
            }
        }
           document.querySelector("#phoneCanvas").addEventListener("click", function(){
               if(cn == 0){
            dy = -4;
               }
               cn ++;
        });
    
document.querySelector("#myCanvas").remove();
document.getElementById("right").addEventListener("touchstart", function(){
        rightpress = true;
});     
document.getElementById("right").addEventListener("touchend", function(){
    rightpress = false;
});      
document.getElementById("left").addEventListener("touchstart", function(){
    leftpress = true;
});     
document.getElementById("left").addEventListener("touchend", function(){
leftpress = false;
});      


document.getElementById("right").addEventListener("mousedown", function(){
    rightpress = true;
});     
document.getElementById("right").addEventListener("mouseup", function(){
rightpress = false;
});      
document.getElementById("left").addEventListener("mousedown", function(){
leftpress = true;
});     
document.getElementById("left").addEventListener("mouseup", function(){
leftpress = false;
});      

        function drawscore(){
        ctx.font = "20px Arial";
        ctx.fillStyle = "Green";
        ctx.fillText("Score : " + score, 8, 25);
        }
        function drawlives(){
        ctx.font = "20px Arial";
        ctx.fillStyle = "Red";
        ctx.fillText("Lives : " + lives, canvas.width - 90, 25);
        }
        function liveszero(){
            ctx.font = "20px Arial";
            ctx.fillStyle = "Red";
            ctx.fillText("Lives : " + 0, canvas.width - 90, 25);
        }
        function drawball(){
            ctx.beginPath();
            ctx.arc(x, y, ballrad, 0, 2 * 3.14159);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }
        function drawpaddle(){
            ctx.beginPath();
            ctx.rect(padx, pady, padwidth, padheight);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
        function colldet(){
            for(var c = 0 ; c < brickcol ; c ++){
                for(var r = 0 ; r < brickrow ; r ++){
                    var b = bricks[c][r];
                    if(b.status == 1){
                        if(x > b.x && x < b.x + brickwidth && y > b.y && y < b.y + brickheight){
                            dy = -dy;
                            b.status = 0;
                            score += 7;
                        }
                    }
                }
            }
        }
        function win(){
            dx = 0;
            dy = 0;
            rightpress = false;
            leftpress = false;
            ctx.font = "25px Arial";
            ctx.fillStyle = "Green";
            ctx.fillText("Congratulations!You Won!",canvas.width / 4 - 40, canvas.height / 2);
            ctx.fillText("Swipe Down to Play again.",canvas.width / 4 - 40, canvas.height / 2 + 30);
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fill();
            ctx.closePath();
        }
        function lose(){
            dx = 0;
            dy = 0;
            rightpress = false;
            leftpress = false; 
            ctx.font = "25px Arial";
            ctx.filStyle = "Red";
            ctx.fillText("Game Over!", canvas.width / 4, canvas.height/ 2);
            ctx.fillText("Swipe down to retry.",canvas.width / 4, canvas.height / 2 + 30);
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fill();
            ctx.closePath();
        }
        function reload(){
            document.location.reload();
        }
        function drawbricks(){
            for(var c = 0 ; c < brickcol ; c ++){
                for(var r = 0 ; r < brickrow ; r ++){
                    if(bricks[c][r].status == 1){
                        var brickx = (r * (brickwidth + brickpadding)) + brickoffsetleft;
                        var bricky = (c * (brickheight + brickpadding)) + brickoffsettop;
                        bricks[c][r].x = brickx;
                        bricks[c][r].y = bricky;
                        ctx.beginPath();
                        ctx.rect(brickx, bricky, brickwidth, brickheight);
                        ctx.fillStyle = "purple";
                        ctx.fill();
                        ctx.closePath();
                    }     
                }
            }
        }
        function draw(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawball();    
        drawbricks();
        drawpaddle();
        drawscore();
        if(lives >= 0){
        drawlives();
        }
        else{
            liveszero();
        }
        colldet();
        if(score == brickrow * brickcol * 7){
            win();
            document.querySelector("#phoneCanvas").addEventListener("dblclick", function(){
                reload();
            });
        }
        if(dx == 0 && dy == 0 && lives == 3){
            ctx.font = "25px Arial";
            ctx.fillStyle = "white";   
            ctx.fillText("Tap Here to Start.", canvas.width/4, canvas.height/2);
     
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fill();
        }        
        if(x + dx > canvas.width - ballrad || x + dx < ballrad){
            dx = -dx;
        }
        if(y + dy < ballrad){
            dy = -dy;
        }
        else if(y + dy > canvas.height - ballrad){
        if(x > padx && x < padx + padwidth){
            dx = 8 * ((x - (padx + padwidth / 2)) / padwidth);
            dy = -dy;
        }
        else{
            lives --;
        if(!lives){
            lose();
            document.querySelector("#phoneCanvas").addEventListener("dblclick", function(){
                reload();
            });
        }
        if(lives > 0 || score <= 0){
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 0;
            dy = 0;
            document.querySelector("#phoneCanvas").addEventListener("click", function(){
            dy = -4;
             });
            }
          }
        }  
        if(rightpress && padx < canvas.width - padwidth){
            padx += 14;
          }
        if(leftpress && padx > 0){
        padx -= 14;
          }
          x += dx;
          y += dy;
          requestAnimationFrame(draw);
        }
        draw();  
    }



















    else{
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var ballrad = 10;
        var x = canvas.width/2;
        var y = canvas.height - 30;
        var dx = 0;
        var dy = 0;
        var padheight = 10;
        var padwidth = 250;
        var padx = (canvas.width - padwidth)/2;
        var pady = canvas.height - padheight;
        var rightpress = false;
        var leftpress = false;
        var brickrow = 13;
        var brickcol = 5;
        var brickwidth = 80;
        var brickheight = 50;
        var brickpadding = 7;
        var brickoffsetleft = 35;
        var brickoffsettop = 30;
        var score = 0;
        var lives = 3;
        var bricks = [];
        var click = 0;
        var cn = 0;
        for(var c = 0 ; c < brickcol ; c ++){
            bricks[c] = [];
            for(var r = 0 ; r < brickrow ; r ++){
                bricks[c][r] = {x: 0, y: 0, status: 1};
                console.log(bricks[c][r]);
            }
        }
       var start = document.querySelector("#myCanvas").addEventListener("click", function(){
           if(cn == 0){
            dy = -6;
           }
           cn ++;
        });
    
        document.querySelector("#phoneCanvas").remove();
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
        
        function keyDownHandler(e){
            if(e.keyCode == 39){
                rightpress = true;
            }
            if(e.keyCode == 68){
                rightpress = true;
            }
            if(e.keyCode == 37){
                leftpress = true;
            }
            if(e.keyCode == 65){
                leftpress = true;
            }    
        }
        function keyUpHandler(e){
                if(e.keyCode == 39){
                    rightpress = false;
                }
                if(e.keyCode == 68){
                    rightpress = false;
                }
                if(e.keyCode == 37){
                    leftpress = false;
                }
                if(e.keyCode == 65){
                    leftpress = false;
                }        
        }
        function mouseMoveHandler(e){
            var relx = e.clientX - canvas.offsetLeft;
            if(relx > 240 && relx < canvas.width){
                padx = relx - padwidth + 3;
            }
        }
        function drawscore(){
        ctx.font = "21px Arial";
        ctx.fillStyle = "Green";
        ctx.fillText("Score : " + score, 8, 20);
        }
        function drawlives(){
        ctx.font = "21px Arial";
        ctx.fillStyle = "Red";
        ctx.fillText("Lives : " + lives, canvas.width - 85, 20);
        }
        function liveszero(){
            ctx.font = "20px Arial";
            ctx.fillStyle = "Red";
            ctx.fillText("Lives : " + 0, canvas.width - 90, 25);
        }
        function drawball(){
            ctx.beginPath();
            ctx.arc(x, y, ballrad, 0, 2 * 3.14159);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }
        function drawpaddle(){
            ctx.beginPath();
            ctx.rect(padx, pady, padwidth, padheight);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
        function colldet(){
            for(var c = 0 ; c < brickcol ; c ++){
                for(var r = 0 ; r < brickrow ; r ++){
                    var b = bricks[c][r];
                    if(b.status == 1){
                        if(x > b.x && x < b.x + brickwidth && y > b.y && y < b.y + brickheight){
                            dy = -dy;
                            b.status = 0;
                            score += 7;
                            //
                            //
                        }
                    }
                }
            }
        }
        function win(){
            dx = 0;
            dy = 0;
            ctx.font = "40px Arial";
            ctx.fillStyle = "Green";
            ctx.fillText("Congratulations!You Won!",canvas.width / 4, canvas.height / 2);
            ctx.fillText("Press R to Play again!", canvas.width / 4, canvas.height/ 2 + 80);
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fill();
        }
        function lose(){
            dx = 0;
            dy = 0;
            ctx.font = "40px Arial";
            ctx.fillStyle = "Red";
            ctx.fillText("Game Over!", canvas.width / 4, canvas.height/ 2);
            ctx.fillText("Press R to Try again!", canvas.width / 4, canvas.height/ 2 + 80);
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fill();
            
        }
        function drawbricks(){
            for(var c = 0 ; c < brickcol ; c ++){
                for(var r = 0 ; r < brickrow ; r ++){
                    if(bricks[c][r].status == 1){
                        var brickx = (r * (brickwidth + brickpadding)) + brickoffsetleft;
                        var bricky = (c * (brickheight + brickpadding)) + brickoffsettop;
                        bricks[c][r].x = brickx;
                        bricks[c][r].y = bricky;
                        ctx.beginPath();
                        ctx.rect(brickx, bricky, brickwidth, brickheight);
                        ctx.fillStyle = "purple";
                        ctx.fill();
                        ctx.closePath();
                    }     
                }
            }
        }
        function reload(){
            document.location.reload();
        }
        function draw(){

            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawball();    
        drawbricks();
        drawpaddle();
        drawscore();
        drawlives();
        colldet();
        if(score == brickrow * brickcol * 7){
            win();
            document.querySelector("#myCanvas").addEventListener("click", function(){
                reload();
            });

        }
        if(lives >= 0){
            drawlives();
            }
            else{
                liveszero();
            }
        if(x + dx > canvas.width - ballrad || x + dx < ballrad){
            dx = -dx;
        }
        if(y + dy < ballrad){
            dy = -dy;
        }
        else if(y + dy > canvas.height - ballrad){
        if(x > padx && x < padx + padwidth){
            dx = 8 * ((x - (padx + padwidth / 2)) / padwidth);
            dy = -dy;
        }
        else{
            lives --;
        if(lives == 0){
            lose();
             document.querySelector("#myCanvas").addEventListener("click", function(){
                 reload();
             });
        }
        else{
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 0;
            dy = 0;
            document.querySelector("#myCanvas").addEventListener("click", function(){
                dy = -6;
            });
            }
          }
        }  
        if(rightpress && padx < canvas.width - padwidth){
            padx += 14;
          }
        if(leftpress && padx > 0){
        padx -= 14;
          }
          x += dx;
          y += dy;
          requestAnimationFrame(draw);
        }
        draw();      
    }
}
var z = window.matchMedia("(max-width : 800px)");
phone(z);
z.addListener(phone);
