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
        var padwidth = 70;
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
        var bricks = [];
        for(var c = 0 ; c < brickcol ; c ++){
            bricks[c] = [];
            for(var r = 0 ; r < brickrow ; r ++){
                bricks[c][r] = {x: 0, y: 0, status: 1};
                console.log(bricks[c][r]);
            }
        }
        document.querySelector("body").addEventListener("click", function(){
            dx = 3;
            dy = -3;            
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
                            if(score == brickrow * brickcol * 7){
                                alert("CONGRATULATIONS!YOU WON!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
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
        drawlives();
        colldet();
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
            alert("GAME OVER!");
            document.location.reload();
        }
        else{
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 6;
            dy = -6;
            }
          }
        }  
        if(rightpress && padx < canvas.width - padwidth/2){
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
        var dx = 6;
        var dy = -6;
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
        for(var c = 0 ; c < brickcol ; c ++){
            bricks[c] = [];
            for(var r = 0 ; r < brickrow ; r ++){
                bricks[c][r] = {x: 0, y: 0, status: 1};
                console.log(bricks[c][r]);
            }
        }
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
            if(relx > 0 && relx < canvas.width){
                padx = relx - padwidth/2;
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
                            if(score == brickrow * brickcol * 7){
                                alert("CONGRATULATIONS!YOU WON!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
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
        drawlives();
        colldet();
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
            alert("GAME OVER!");
            document.location.reload();
        }
        else{
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 6;
            dy = -6;
            }
          }
        }  
        if(rightpress && padx < canvas.width - padwidth/2){
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
var z = window.matchMedia("(max-width : 600px)");
phone(z);
z.addListener(phone);
