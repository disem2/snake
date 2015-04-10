/**
 * Created by dmitriy on 09.04.15.
 */
$(function(){
    var field = {
        canvas: document.getElementById("field"),
        width: null,
        heigth: null
    };
    field.width = field.canvas.width;
    field.height = field.canvas.height;
    field.context = field.canvas.getContext("2d");

    function Snake(){
        this.sectors = [[10, 50], [20, 50], [30, 50], [40, 50]];
        this.tail = [];
        this.head = [];
        this.nextPart = [];
        this.speed = 200;
        this.direction = 'right';
    }

    Snake.prototype.draw = function(){
        console.log(this.sectors);
        var i = 0, max = this.sectors.length;
        for(i; i < max; i++) {
            draw(this.sectors[i][0], this.sectors[i][1]);
        }
    };
    Snake.prototype.move = function(){
        this.tail = this.sectors.splice(0, 1);
        this.head[0] = +(this.sectors.slice(-1)[0][0]).toFixed(-1);
        this.head[1] = +(this.sectors.slice(-1)[0][1]).toFixed(-1);
        if(this.direction == 'right'){
            field.context.clearRect(this.tail[0][0], this.tail[0][1], 9, 9);
            if(this.head[0] < (field.width - 10)){
                this.nextPart[0] = this.head[0] + 10;
            } else {
                this.head[0] = 0;
            }
            this.sectors.push([this.nextPart[0], this.head[1]]);
            this.draw();
        }
        //if(this.direction == 'down'){
        //    snake.clearRect(tail[0][0], tail[0][1], 9, 9);
        //    if(last_y < (canvasHeight-10)){
        //        next_y = last_y + 10;
        //    } else {
        //        next_y = 0;
        //    }
        //    snake_sectors.push([last_x, next_y]);
        //    drawSnake(snake_sectors);
        //}
        //if(this.direction == 'left'){
        //    snake.clearRect(tail[0][0], tail[0][1], 9, 9);
        //    if(last_x > 0){
        //        next_x = last_x - 10;
        //    } else {
        //        next_x = canvasWidth - 10;
        //    }
        //    snake_sectors.push([next_x, last_y]);
        //    drawSnake(snake_sectors);
        //}
        //if(this.direction == 'up'){
        //    snake.clearRect(tail[0][0], tail[0][1], 9, 9);
        //    if(last_y > 0){
        //        next_y = last_y - 10;
        //    } else {
        //        next_y = canvasHeight - 10;
        //    }
        //    snake_sectors.push([last_x, next_y]);
        //    drawSnake(snake_sectors);
        //}
        //if(rabbitX == last_x && rabbitY == last_y){
        //    setRabbit();
        //    setTimeout(function(){
        //        snake_sectors.unshift(tail);
        //    }, (snake_sectors.length - 1) * speed);
        //}
        setTimeout(this.move(), this.speed);
    };

    function Rabbit(){
        this.x = (Math.random() * (field.width - 10)).toFixed(-1);
        this.y = (Math.random() * (field.height - 10)).toFixed(-1);
    }
    Rabbit.prototype.draw = function(){
        draw(this.x, this.y);
    };

    function draw(posX, posY){
        field.context.fillRect(posX, posY, 9, 9);
    }
    var snake = new Snake();
    snake.draw();
    var rabbit = new Rabbit();
    rabbit.draw();
    snake.move();

    //function snakeMove(){
    //    var tail = snake_sectors.splice(0, 1),
    //    next_x, next_y;
    //    last_x = +(snake_sectors.slice(-1)[0][0]).toFixed(-1);
    //    last_y = +(snake_sectors.slice(-1)[0][1]).toFixed(-1);
    //    if(direction == 'right'){
    //        snake.clearRect(tail[0][0], tail[0][1], 9, 9);
    //        if(last_x < (canvasWidth-10)){
    //            next_x = last_x + 10;
    //        } else {
    //            next_x = 0;
    //        }
    //        snake_sectors.push([next_x, last_y]);
    //        drawSnake(snake_sectors);
    //    }
    //    if(direction == 'down'){
    //        snake.clearRect(tail[0][0], tail[0][1], 9, 9);
    //        if(last_y < (canvasHeight-10)){
    //            next_y = last_y + 10;
    //        } else {
    //            next_y = 0;
    //        }
    //        snake_sectors.push([last_x, next_y]);
    //        drawSnake(snake_sectors);
    //    }
    //    if(direction == 'left'){
    //        snake.clearRect(tail[0][0], tail[0][1], 9, 9);
    //        if(last_x > 0){
    //            next_x = last_x - 10;
    //        } else {
    //            next_x = canvasWidth - 10;
    //        }
    //        snake_sectors.push([next_x, last_y]);
    //        drawSnake(snake_sectors);
    //    }
    //    if(direction == 'up'){
    //        snake.clearRect(tail[0][0], tail[0][1], 9, 9);
    //        if(last_y > 0){
    //            next_y = last_y - 10;
    //        } else {
    //            next_y = canvasHeight - 10;
    //        }
    //        snake_sectors.push([last_x, next_y]);
    //        drawSnake(snake_sectors);
    //    }
    //    if(rabbitX == last_x && rabbitY == last_y){
    //        setRabbit();
    //        setTimeout(function(){
    //            snake_sectors.unshift(tail);
    //        }, (snake_sectors.length - 1) * speed);
    //    }
    //    setTimeout(snakeMove, speed);
    //}
    //document.onkeydown = function(event){
    //    var keyCode,
    //    keyDirect;
    //    if(event == null){
    //        keyCode = window.event.keyCode;
    //    }
    //    else{
    //        keyCode = event.keyCode;
    //    }
    //
    //    switch(keyCode){
    //        case 37:
    //            if(keyDirect == 'right'){
    //                return;
    //            }
    //            keyDirect = 'left';
    //            break;
    //        case 38:
    //            if(keyDirect == 'down'){
    //                return;
    //            }
    //            keyDirect = 'up';
    //            break;
    //        case 39:
    //            if(keyDirect == 'left'){
    //                return;
    //            }
    //            keyDirect = 'right';
    //            break;
    //        case 40:
    //            if(keyDirect == 'up'){
    //                return;
    //            }
    //            keyDirect = 'down';
    //            break;
    //        default:
    //            break;
    //    }
    //    direction = keyDirect;
    //}
});