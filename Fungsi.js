var BoxWelcome = document.getElementById("welcome")
var BoxTimer = document.getElementById("timer")
var BoxDashboard = document.getElementById("dashboard")
var BoxGamePause = document.getElementById("GamePause")
var BoxGamePauseTimer = document.getElementById("GamePauseTimer")
var BoxGameOver = document.getElementById("BoxGameOver")
var InpUsername = document.getElementById("username")
var BtnMulai = document.getElementById("mulai")
var TextTimer = document.getElementById("timerText")
var NamaPlayer = document.getElementById("nama_player")
var TimerGame = document.getElementById("timer_game")
var ScoreText = document.getElementById("score")
var FailText = document.getElementById("fail")
var BtnContinue = document.getElementById("Continue")
var BtnRestart = document.getElementById("restartBtn")
var BtnRestartMenu = document.getElementById("restartBtnMenu")
var BtnRestartGameOver = document.getElementById("BtnRestartGameOver")
var TimerGamePauseText = document.getElementById("TimerDot")


InpUsername.oninput = (e) => {
    BtnMulai.disabled = e.target.value == "" ? true : false;
}

BtnMulai.onclick = () => {
    BoxWelcome.style.display = "none";
    localStorage.setItem("name", InpUsername.value);
    StartTimer()
}

function StartTimer() {
    BoxTimer.style.display = "flex"
    var i = 3;

    var x = setInterval(() => {
        if (i === 1) {
            clearInterval(x)
            AcakFirusMuncul()
            ShowGame()
            BoxTimer.style.display = "none"
            return false
        }
        i--
        TextTimer.innerText = i
    }, 500);
}

function ShowGame() {
    NamaPlayer.innerText = "Player : " + localStorage.getItem("name")
    BoxDashboard.style.display = "grid"
    StartGame();
}


/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var BagiCanvas = canvas.width / 4;
var AkhiriVirus = 30;
var menit = 0;
var detik = 0;
var sec = 0;
var Score = 0;
var Fail = 0;
var Stoped = false;
var Virus = []
var VaksinD;
var VaksinF;
var VaksinJ;
var VaksinK;
var VirusPng;

function Reset() {
    menit = 0;
    detik = 0;
    sec = 0;
    Score = 0;
    Fail = 0;
    Virus = []
}

window.onload = () => {
    VaksinD = new Image(100, 100);
    VaksinD.src = "./AssetNotC/vaksinD.png"
    VaksinD.onload = () => { console.log("Berhasil Di Load VaksinD"); }

    VaksinF = new Image(100, 100);
    VaksinF.src = "./AssetNotC/VaksinF.png"
    VaksinF.onload = () => { console.log("Berhasil Di Load VaksinF"); }

    VaksinJ = new Image(100, 100);
    VaksinJ.src = "./AssetNotC/VaksinJ.png"
    VaksinJ.onload = () => { console.log("Berhasil Di Load VaksinJ"); }

    VaksinK = new Image(100, 100);
    VaksinK.src = "./AssetNotC/VaksinK.png"
    VaksinK.onload = () => { console.log("Berhasil Di Load VaksinK"); }

    VirusPng = new Image(100, 100);
    VirusPng.src = "./AssetNotC/Virus.png"
    VirusPng.onload = () => { console.log("Berhasil Di Load Virus"); }

    InpUsername.value = localStorage.getItem("name")
    BtnMulai.disabled = InpUsername.value == "" ? true : false;
}

window.addEventListener('keydown', (event) => {
    // 68
    // Fungsi.js: 108 70
    // Fungsi.js: 108 74
    // Fungsi.js: 108 75
    switch (event.keyCode) {
        case 27:
            Stop();
            event.preventDefault();
            break;
        case 68:
            KillVirus(0)
            event.preventDefault();
            break;
        case 70:
            KillVirus(BagiCanvas * 1)
            event.preventDefault();
            break;
        case 74:
            KillVirus(BagiCanvas * 2)
            event.preventDefault();
            break;
        case 75:
            KillVirus(BagiCanvas * 3)
            event.preventDefault();
            break;
        default:
            break;
    }
});

function KillVirus(x) {
    var hasil = (canvas.height - BagiCanvas - AkhiriVirus) / 2;
    var Filter = Virus.filter((ed) => { return ed.x === x && ed.h === false && ed.y > hasil })
    Filter.forEach(el => {
        el.h = true;
        Score++
    });
}

function Stop() {
    Stoped = true;
    BoxGamePause.style.display = "flex";
}

BtnContinue.onclick = () => {
    BoxGamePause.style.display = "none"
    BoxGamePauseTimer.style.display = "flex"
    var i = 3;

    var x = setInterval(() => {
        if (i === 1) {
            clearInterval(x)
            BoxGamePauseTimer.style.display = "none"
            TimerGamePauseText.innerHTML = 3
            Stoped = false;
            return false
        }
        i--
        TimerGamePauseText.innerHTML = i
    }, 500);
}

const ResetActionPost = () => {
    BoxGamePause.style.display = "none"
    BoxGamePauseTimer.style.display = "flex"
    var i = 3;

    var x = setInterval(() => {
        if (i === 1) {
            clearInterval(x)
            BoxGamePauseTimer.style.display = "none"
            TimerGamePauseText.innerHTML = 3
            Stoped = false;
            Reset();
            return false
        }
        i--
        TimerGamePauseText.innerHTML = i
    }, 500);
}

BtnRestart.onclick = ResetActionPost
BtnRestartMenu.onclick = ResetActionPost
BtnRestartGameOver.onclick = () => {
    BoxGameOver.style.display = "none";
    ResetActionPost();
}
document.getElementById("QuitBtn").onclick = () => { window.location.href = "index.html" }

function GameSetAll() {
    if (Stoped) { return false }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    CreateLayoutGame();
    SetTimerGame();
    ScoreText.innerText = "Score : " + Score;
    FailText.innerText = "Fail : " + Fail;
    MunculkanVirus()

    if (detik > 0 && detik % 1 == 0 && sec >= 59) {
        AcakFirusMuncul()
    }

    if (Fail >= 10) {
        Stoped = true;
        BoxGameOver.style.display = "flex"
        BoxGameOver.querySelector("#timer_close").innerText = "Score : " + Score;
        BoxGameOver.querySelector("#score_close").innerText = "Fail : " + Fail;
        BoxGameOver.querySelector("#name_close").innerText = "Player : " + localStorage.getItem("name");
    }
}

function StartGame() {
    GameSetAll();
    requestAnimationFrame(StartGame)
}

function SetTimerGame() {
    sec++
    if (detik === 60) {
        detik = 0
        menit++
    }
    if (sec === 60) {
        sec = 0;
        detik++
    }

    TimerGame.innerText = "Timer : " + menit.toString().padStart(2, "0") + ":" + detik.toString().padStart(2, "0")
}

function CreateLayoutGame() {
    var ColorBg = ["#101010", "#181818", "#101010", "#181818"]
    ColorBg.forEach((dt, id) => {
        ctx.beginPath();
        ctx.fillStyle = dt
        ctx.fillRect(BagiCanvas * id, 0, BagiCanvas, canvas.height)
    })
    ctx.drawImage(VaksinD, BagiCanvas * 0, canvas.height - BagiCanvas, BagiCanvas, BagiCanvas)
    ctx.drawImage(VaksinF, BagiCanvas * 1, canvas.height - BagiCanvas, BagiCanvas, BagiCanvas)
    ctx.drawImage(VaksinJ, BagiCanvas * 2, canvas.height - BagiCanvas, BagiCanvas, BagiCanvas)
    ctx.drawImage(VaksinK, BagiCanvas * 3, canvas.height - BagiCanvas, BagiCanvas, BagiCanvas)
    ctx.beginPath();
    ctx.fillStyle = "rgba(232, 13, 13, 0.2)"
    ctx.fillRect(0, (canvas.height - BagiCanvas - AkhiriVirus) / 2, canvas.width, (canvas.height - (BagiCanvas + AkhiriVirus)) / 2)
    ctx.beginPath();
    ctx.fillStyle = "red"
    ctx.fillRect(0, (canvas.height - BagiCanvas) - AkhiriVirus, canvas.width, AkhiriVirus)

}

const AcakFirusMuncul = () => {
    var nilaiAcak = Math.random();
    var nilaiSkala = nilaiAcak * 4;
    var angkaAcak = Math.floor(nilaiSkala);
    Virus.push(
        {
            x: angkaAcak * BagiCanvas,
            y: 0,
            h: false
        }
    )
}

function MunculkanVirus() {
    var Filter = Virus.filter((dt) => { return dt.h === false })
    var Ketahui = (canvas.height - BagiCanvas) - AkhiriVirus - BagiCanvas

    Filter.forEach(dt => {
        dt.y += 2
        if (dt.y > Ketahui && dt.h !== true) {
            dt.h = true;
            Fail++
        }
        ctx.drawImage(VirusPng, dt.x, dt.y, BagiCanvas, BagiCanvas)
    });
}