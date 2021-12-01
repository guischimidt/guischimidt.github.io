const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let game_over = false;
let dinoPosition = 0;
let contador = 0;
let speed = -10;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping && !game_over) {
            jump();
        }
    }
}

function upSpeed() {

    if (speed < -40)
        speed = -10;
    else {
        speed -= 0.5;
        console.log(speed);
    }
};

function jump() {

    contador++;
    upSpeed();
    isJumping = true;
    let upInterval = setInterval(() => {
        if (dinoPosition >= 150) {

            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + "px";
                }
            }, 20);

        } else {
            dinoPosition += 40;
            dino.style.bottom = dinoPosition + "px";
        }
    }, 20);

    document.getElementById('score').innerHTML = "Score: " + contador;
}

function createCactus() {

    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 1500 + 1000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let position = 1000;

    let leftInterval = setInterval(() => {

        if (position < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (position > 0 && position < 60 && dinoPosition < 60) {
            game_over = true;
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Game Over<br>Score: " + contador + "</h1>"
            + "<button onclick='window.location.reload();'>Novo Jogo</button>";

        }
        else {

            position = position + speed;
            cactus.style.left = position + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}

createCactus();

document.addEventListener('keyup', handleKeyUp)