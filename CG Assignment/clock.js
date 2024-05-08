var canvas = document.getElementById("clockCanvas");
var ctx = canvas.getContext("2d");

// Utility function to draw a line
function drawLineDDA(x1, y1, x2, y2,color,px) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    const steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;
    
    let x = x1;
    let y = y1;
    
    ctx.fillStyle = color;
    ctx.fillRect(x, y, px, px); 

    for (let i = 1; i <= steps; i++) {
    x += xIncrement;
    y += yIncrement;
    ctx.fillRect(Math.round(x), Math.round(y), px, px); 
    }

}

function drawCircle() {
    var canvas = document.getElementById("clockCanvas");

    var radius = 0;
    var angle = 0;

    line_width = 5;
 
    var x1 = canvas.width / 2
    var y1 = canvas.height / 2

    color = "#D2B48C";

    for (var n = 0; n < 1300; n++) {
        radius += 0.15;
        angle += (Math.PI * 2) / 50;
        var x = canvas.width / 2 + radius * Math.cos(angle);
        var y = canvas.height / 2 + radius * Math.sin(angle);

        drawLineDDA(x1, y1, x, y,color,line_width)
        x1 = x;
        y1 = y;    
    }

};

function drawClock() {
    const canvas = document.getElementById("clockCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    drawCircle();

    // Draw Amharic numbers
    const amharicNumbers = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲", "፲፩", "፲፪"];
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const amharicFontSize = 30;
    const boldAmharicFont = 'bold ' + amharicFontSize + 'px Arial';

    for (let i = 1; i <= 12; i++) {
        const amharicIndex = i % 12 === 0 ? 11 : i % 12 - 1; // Adjust for 0-based array
        const amharicX = centerX + (radius - amharicFontSize) * Math.cos((i - 3) * (Math.PI / 6));
        const amharicY = centerY + (radius - amharicFontSize) * Math.sin((i - 3) * (Math.PI / 6));

        ctx.font = boldAmharicFont;

        ctx.fillText(amharicNumbers[amharicIndex], amharicX, amharicY);
    }
    // Draw hour hand
    const hour = new Date().getHours() % 12;
    const hourAngle = (hour - 3) * (Math.PI / 6);
    const hourHandLength = radius * 0.5;
    const hourX = centerX + hourHandLength * Math.cos(hourAngle);
    const hourY = centerY + hourHandLength * Math.sin(hourAngle);
    drawLineDDA(centerX, centerY, hourX, hourY, "#008000", 5);

    // Draw minute hand
    const minute = new Date().getMinutes();
    const minuteAngle = (minute - 15) * (Math.PI / 30);
    const minuteHandLength = radius * 0.7;
    const minuteX = centerX + minuteHandLength * Math.cos(minuteAngle);
    const minuteY = centerY + minuteHandLength * Math.sin(minuteAngle);
    drawLineDDA(centerX, centerY, minuteX, minuteY, "#FF0000", 3);

    // Draw second hand
    const second = new Date().getSeconds();
    const secondAngle = (second - 15) * (Math.PI / 30);
    const secondHandLength = radius * 0.9;
    const secondX = centerX + secondHandLength * Math.cos(secondAngle);
    const secondY = centerY + secondHandLength * Math.sin(secondAngle);
    drawLineDDA(centerX, centerY, secondX, secondY, "#FFFF00", 1);

}

// Function to update and redraw the clock every second
function updateClock() {
    drawClock();
    // Draw time at the bottom
    const time = new Date();
    const hour = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const amharicNumerals = [
      "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲",
      "፲፩", "፲፪", "፲፫", "፲፬", "፲፭", "፲፮", "፲፯", "፲፰", "፲፱", "፳",
      "፳፩", "፳፪", "፳፫", "፳፬", "፳፭", "፳፮", "፳፯", "፳፰", "፳፱", "፴",
      "፴፩", "፴፪", "፴፫", "፴፬", "፴፭", "፴፮", "፴፯", "፴፰", "፴፱", "፵",
      "፵፩", "፵፪", "፵፫", "፵፬", "፵፭", "፵፮", "፵፯", "፵፰", "፵፱", "፶",
      "፶፩", "፶፪", "፶፫", "፶፬", "፶፭", "፶፮", "፶፯", "፶፰", "፶፱", "፷"
    ];
    
    
    ctx.font = "30px Arial" ;
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    
    
    ctx.fillText(`${amharicNumerals[hour % 12]} : ${amharicNumerals[minutes%60]} : ${amharicNumerals[seconds%60]}`, 200, 450);
    setTimeout(updateClock, 1000);
}

// Initial setup
updateClock();

