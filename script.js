const player = document.querySelector('#player')
let isJumping = false

function jump() {
    if (isJumping) return

    isJumping = true
    player.classList.add('jump')

    setTimeout(() => {
        player.classList.remove('jump')
        setTimeout(() => {
            isJumping = false
        }, 200);
    }, 500)
}

document.addEventListener('keydown', (elem) => {
    if (elem.code == 'Space' || elem.code == 'ArrowUp') {
        jump()
    }
})

const obstacle = document.querySelector('#obstacle')
const scoreEl = document.querySelector('#score')

let obstacleX = 800
let speed = 5
let score = 0
let gameRunning = true

function moveObstacle() {
    if (!gameRunning) return;


    obstacleX -= speed
    obstacle.style.right = 'auto'
    obstacle.style.left = obstacleX + 'px'

    if (obstacleX < -20) {
        
        obstacleX = 800
        score++
        scoreEl.innerHTML = score

        if (score % 3 == 0) {
            speed += 0.7
        }
    }
    checkColission()
}

setInterval(moveObstacle, 20);

function checkColission() {
    if (obstacleX<110 || obstacleX>60 && isJumping == false) {
        gameOver()
    }
}
let maxScore = 0
let maxScoreEl = document.querySelector('#maxScore')

function gameOver() {
    gameRunning = false

    const msg = document.createElement('div')
    msg.setAttribute('id', 'gameover')
    msg.innerHTML = `
    <h2>💀 GAME OVER</h2>
    <p>Score: ${score}</p>
    <button onclick="restart()">🔄 Restart</button>`
    document.querySelector('#game').appendChild(msg)

    if(score > maxScore){
        maxScoreEl.innerHTML = score
    }
}

function restart(){
    obstacleX = 800
    speed = 5
    score = 0
    scoreEl.innerHTML = 0
    gameRunning = true
    document.querySelector('#gameover').remove()
}
