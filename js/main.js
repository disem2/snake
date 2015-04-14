/**
 * Created by dmitriy on 09.04.15.
 */
$(function(){

    //Game field
    var field = {
        canvas: document.getElementById("field"),
        w: null,
        h: null
    };
    field.w = field.canvas.width;
    field.h = field.canvas.height;
    field.context = field.canvas.getContext("2d");

    //Constructors
    function Snake(){
        this.sectors = [[10, 50], [20, 50], [30, 50], [40, 50]];
        this.tail = [];
        this.head = [];
        this.nextPart = [];
        this.speed = 200;
        this.direction = 'right';
        this.moveFlag = true;
    }
    function Rabbit(){
    }

    //Proto methods
    Snake.prototype.draw = function(){
        var i = 0, max = this.sectors.length;
        for(i; i < max; i++) {
            draw(this.sectors[i][0], this.sectors[i][1]);
        }
    };
    Snake.prototype.move = function(){
        if(snake.moveFlag) {
            var i = 0, max = snake.sectors.length - 1;
            snake.tail = snake.sectors.splice(0, 1);
            snake.head[0] = +(snake.sectors.slice(-1)[0][0]).toFixed(-1);
            snake.head[1] = +(snake.sectors.slice(-1)[0][1]).toFixed(-1);
            snake.nextPart = [snake.head[0], snake.head[1]];
            if (snake.direction == 'right') {
                if (snake.head[0] < (field.w - 10)) {
                    snake.nextPart[0] = snake.head[0] + 10;
                } else {
                    snake.nextPart[0] = 0;
                }
                snake.sectors.push([snake.nextPart[0], snake.head[1]]);
            }
            if (snake.direction == 'down') {
                if (snake.head[1] < (field.h - 10)) {
                    snake.nextPart[1] = snake.head[1] + 10;
                } else {
                    snake.nextPart[1] = 0;
                }
                snake.sectors.push([snake.head[0], snake.nextPart[1]]);
            }
            if (snake.direction == 'left') {
                if (snake.head[0] > 0) {
                    snake.nextPart[0] = snake.head[0] - 10;
                } else {
                    snake.nextPart[0] = field.w - 10;
                }
                snake.sectors.push([snake.nextPart[0], snake.head[1]]);
            }
            if (snake.direction == 'up') {
                if (snake.head[1] > 0) {
                    snake.nextPart[1] = snake.head[1] - 10;
                } else {
                    snake.nextPart[1] = field.h - 10;
                }
                snake.sectors.push([snake.head[0], snake.nextPart[1]]);
            }
            if (rabbit.x == snake.head[0] && rabbit.y == snake.head[1]) {
                snake.catchRabbit();
            } else {
                field.context.clearRect(snake.tail[0][0], snake.tail[0][1], 9, 9);
            }

            //Game over
            for (i; i < max; i++) {
                if (snake.sectors[i][0] == snake.nextPart[0] && snake.sectors[i][1] == snake.nextPart[1]) {
                    snake.moveFlag = false;
                    alert("GAME OVER!!!");
                }
            }
            snake.draw();
            setTimeout(snake.move, snake.speed);
        }
    };
    Snake.prototype.catchRabbit = function(){
        field.context.clearRect(0, 0, field.w, field.h);
        rabbit.setPosition();
        rabbit.draw();
        setTimeout(function(){
            snake.sectors.unshift(snake.tail);
        }, (snake.sectors.length - 1) * snake.speed);
    };
    Rabbit.prototype.draw = function(){
        draw(this.x, this.y);
    };
    Rabbit.prototype.setPosition = function(){
        var snakeBodyFlag = false,
        i= 0, max = snake.sectors.length;
        this.x = (Math.random() * (field.w - 10)).toFixed(-1);
        this.y = (Math.random() * (field.h - 10)).toFixed(-1);

        // Checking appearing rabbit at snake body
        for(i; i < max; i++){
            if(snake.sectors[i][0] == this.x && snake.sectors[i][1] == this.y){
                snakeBodyFlag = true;
                this.setPosition();
            }
        }
    };

    //Draw function
    function draw(posX, posY){
        field.context.fillRect(posX, posY, 9, 9);
    }

    //Keyboard listener
    document.onkeydown = function(event){
        var keyCode,
        keyDirect;
        if(event == null){
            keyCode = window.event.keyCode;
        }
        else{
            keyCode = event.keyCode;
        }

        switch(keyCode){
            case 37:
                if(keyDirect == 'right'){
                    return;
                }
                keyDirect = 'left';
                break;
            case 38:
                if(keyDirect == 'down'){
                    return;
                }
                keyDirect = 'up';
                break;
            case 39:
                if(keyDirect == 'left'){
                    return;
                }
                keyDirect = 'right';
                break;
            case 40:
                if(keyDirect == 'up'){
                    return;
                }
                keyDirect = 'down';
                break;
            default:
                break;
        }
        snake.direction = keyDirect;
    }

    // Inicialization
    var snake = new Snake();
    var rabbit = new Rabbit();
    snake.draw();
    rabbit.setPosition();
    rabbit.draw();
    snake.move();
});