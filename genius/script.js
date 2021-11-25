//genius

let order = [];
let clickedOrder = [];
let score = 0;

//0 - vermelho
//1 - verde
//2 - amarelo
//3 - azul

const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

//Cria a aleatoriedade
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); 
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order){
       // alert('entrou');
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
       // alert('entrou');
    }
}

//Acende proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
       // alert('primeiro time');
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
       // alert('segundo');
        element.classList.remove('selected');
    },number);
}

//Checa cor clicada
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível.`);
        nextLevel();
    }
}

//Funcoes para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//Função que retorna a cor
let createColorElement = (color) => {
    if (color == 0){
        return red;        
    }
    else if (color == 1){
        return green;
    }
    else if (color == 2){
        return yellow;
    }
    else if (color == 3){
        return blue;
    }
}

//Função para o proximo nivel

let nextLevel = () => {
    score++;
    shuffleOrder()
}

//GameOver

let gameOver = () => {
    alert(`Pontuação: ${score}. Você perdeu o jogo!\nClique em Ok para recomeçar.`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Inicia o jogo

let playGame = () => {
    score = 0;
    alert(`Bem-vindo ao Genesis. Iniciando novo jogo.`);

    nextLevel();
}

red.onclick = () => click(0);
green.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();