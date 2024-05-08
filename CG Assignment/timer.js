var canvas = document.getElementById("clockCanvas");
var ctx = canvas.getContext("2d");
var totalSeconds;
   
    function midpoint(cx, cy, r, px, t) {
    let x = 0;
    let y = r;
    let p = 1 - r;

    function other_points(cx, cy, x, y) {
        ctx.fillRect(cx + x, cy - y, px, px);
        ctx.fillRect(cx - x, cy - y, px, px);
        ctx.fillRect(cx + x, cy + y, px, px);
        ctx.fillRect(cx - x, cy + y, px, px);
        ctx.fillRect(cx + y, cy - x, px, px);
        ctx.fillRect(cx - y, cy - x, px, px);
        ctx.fillRect(cx + y, cy + x, px, px);
        ctx.fillRect(cx - y, cy + x, px, px);
    }

    function animate() {
        if (x <= y) {
            ctx.fillRect(cx + x, cy - y, px, px);
            other_points(cx, cy, x, y);

            if (p < 0) {
                p += 2 * x + 3;
            } else {
                p += 2 * (x - y) + 5;
                y--;
            }
            x++;

            requestAnimationFrame(animate); 
        }
    }

    animate();
    }
    
        


        function updateClock() {
            var hourInput = parseInt(document.getElementById("hourInput").value, 10) || 0;
            var minuteInput = parseInt(document.getElementById("minuteInput").value, 10) || 0;
            var secondInput = parseInt(document.getElementById("secondInput").value, 10) || 0;

            totalSeconds = hourInput * 3600 + minuteInput * 60 + secondInput;
            
            if (hourInput < 0 || hourInput > 12 || isNaN(hourInput) ||
                minuteInput < 0 || minuteInput >= 60 || isNaN(minuteInput) ||
                secondInput < 0 || secondInput >= 60 || isNaN(secondInput)) {
                alert("Invalid input. Please enter valid values.");
                return; 
            }
           
            drawTime(hourInput, minuteInput, secondInput);
        
            countdownInterval = setInterval(function () {
                if (secondInput > 0) {
                    secondInput--;
                } else {
                    if (minuteInput > 0) {
                        minuteInput--;
                        secondInput = 59;
                    } else {
                        if (hourInput > 0) {
                            hourInput--;
                            minuteInput = 59;
                            secondInput = 59;
                        } else {
                            clearInterval(countdownInterval);
                            alert("Countdown finished!");
                        }
                    }
                }
        
                drawTime(hourInput, minuteInput, secondInput);
            }, 1000); 
        }
        
        function drawTime(hour, minute, second) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // midpoint(canvas.width / 2, canvas.height / 2, 100,1,0);
        
            midpoint(canvas.width / 2, canvas.height / 2, 140,5);
            const amharicNumerals = [
                "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲",
                "፲፩", "፲፪", "፲፫", "፲፬", "፲፭", "፲፮", "፲፯", "፲፰", "፲፱", "፳",
                "፳፩", "፳፪", "፳፫", "፳፬", "፳፭", "፳፮", "፳፯", "፳፰", "፳፱", "፴",
                "፴፩", "፴፪", "፴፫", "፴፬", "፴፭", "፴፮", "፴፯", "፴፰", "፴፱", "፵",
                "፵፩", "፵፪", "፵፫", "፵፬", "፵፭", "፵፮", "፵፯", "፵፰", "፵፱", "፶",
                "፶፩", "፶፪", "፶፫", "፶፬", "፶፭", "፶፮", "፶፯", "፶፰", "፶፱", "፷"
              ];
              
        
            ctx.font = "50px Arial";
            ctx.fillStyle = "bisque";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
        
            ctx.fillText(`${amharicNumerals[hour % 12]} : ${amharicNumerals[minute%60]} : ${amharicNumerals[second%60]}`, canvas.width / 2, canvas.height / 2-10);
        }
        
        document.getElementById("startButton").addEventListener("click", updateClock);
    