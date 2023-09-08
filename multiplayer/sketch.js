

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 14;
let raio = 8;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let esquerdaBolinha;
let direitaBolinha;
let superiorBolinha;
let inferiorBolinha;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90
let direitaRaquete = xRaquete + raqueteComprimento;
let esquerdaRaquete = xRaquete - raqueteComprimento;
let superiorRaquete = yRaquete;
let inferiorRaquete = yRaquete + raqueteAltura;

//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0)
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda ();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //alterarPosicoesBolinha();
  //alterarPosicoesRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha () {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha () {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda () {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }  
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}



function movimentaMinhaRaquete() {
    if (keyIsDown(87)) {
        yRaquete -= 10;
    }
    if (keyIsDown(83)) {
        yRaquete += 10;
    }
    yRaquete = constrain(yRaquete, 10, 310);
}

function movimentaRaqueteOponente() {
 if (keyIsDown(UP_ARROW)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaqueteOponente += 10;
    }
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

function  alterarPosicoesBolinha() {
 esquerdaBolinha = xBolinha - raio;
 superiorBolinha = yBolinha - raio;
 inferiorBolinha = yBolinha + raio;    
}

function alterarPosicoesRaquete() {
 direitaRaquete = xRaquete + raqueteComprimento;
 superiorRaquete = yRaquete;
 inferiorRaquete = yRaquete + raqueteAltura;	    
 }

//Solução
function verificaColisaoRaquete (x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  rect(430, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26)
  text(pontosDoOponente, 450, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}
