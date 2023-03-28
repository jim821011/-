document.addEventListener("DOMContentLoaded", function () {

    let zoo = [{
            id: 1,
            animal: "./imgs/Aquarius.jpg"
        },
        {
            id: 2,
            animal: "./imgs/Aries.jpg"
        },
        {
            id: 3,
            animal: "./imgs/Cancer.jpg"
        },
        {
            id: 4,
            animal: "./imgs/Capricorn.jpg"
        },
        {
            id: 5,
            animal: "./imgs/Gemini.jpg"
        },
        {
            id: 6,
            animal: "./imgs/Leo.jpg"
        },
        {
            id: 7,
            animal: "./imgs/Libra.jpg"
        },
        {
            id: 8,
            animal: "./imgs/Pisces.jpg"
        },
        {
            id: 9,
            animal: "./imgs/Sagittarius.jpg"
        },
        {
            id: 10,
            animal: "./imgs/Scorpio.jpg"
        },
        {
            id: 11,
            animal: "./imgs/Taurus.jpg"
        },
        {
            id: 12,
            animal: "./imgs/Virgo.jpg"
        }
    ];

    let firstOpen = null;
    let secondOpen = null;
    let randomAnimal = [];
    let randomAnimalId = [];
    let completeCardId = [];
    let getSum = 12;
    let point = 0;
    let timer = 0; //毫秒
    let timerMe;

    createDiv();

    function getAnimal() {
        let random;
        let random2;
        let randomArr = [];
        let randomAnimalNum = [];
        while (true) {
            random = Math.floor(Math.random() * zoo.length);
            let isSame = false;
            for (let i = 0; i < randomArr.length; i++) {
                if (randomArr[i] == zoo[random].animal) {
                    isSame = true;
                    break;
                }
            }
            if (!isSame) {
                randomArr.push(`${zoo[random].animal}`);
            }
            if (randomArr.length == getSum) {
                break;
            }
        }

        for (let i = 0; i < randomArr.length; i++) {
            randomAnimalNum.push(0);
        }

        while (true) {
            random2 = Math.floor(Math.random() * randomArr.length);
            if (randomAnimalNum[random2] < 2) {
                randomAnimalNum[random2]++;
                randomAnimal.push(randomArr[random2]);
                zoo.forEach(e => {
                    if (e.animal == randomArr[random2]) {
                        randomAnimalId.push(e.id);
                    }
                })
            }
            if (randomAnimal.length >= getSum * 2) {
                break;
            }
        }
        // console.log(randomAnimal);
        // console.log(randomAnimalId);
    }

    $("#time-start").on("click", timerStart);

    function createDiv() {
        getAnimal();
        let str = "";
        for (let i = 0; i < randomAnimal.length; i++) {
            str += `<div class="game-card-box" data-id="${randomAnimalId[i]}">
            <div class="card-style card-font">
                <img src="${randomAnimal[i]}">
            </div>
            <div class="card-style card-back">

            </div>
        </div>`;
        }
        $(".gmae-site").html(str);
    }

    function cardClick() {
        let getId = parseInt($(this).attr("data-id"));
        let num = completeCardId.indexOf(getId);
        let isOpen = $(this).hasClass("actived");
        if (num == -1) {
            if (!isOpen) {
                $(this).addClass("actived");
                if (firstOpen === null) {
                    firstOpen = $(this);
                } else {
                    secondOpen = $(this);
                    isSame();
                }
            }
        }
    }

    function isSame() {
        $(".game-card-box").off("click")
        if (firstOpen.attr("data-id") == secondOpen.attr("data-id")) {
            point++;
            showPoint();
            completeCardId.push(parseInt(firstOpen.attr("data-id")));
            firstOpen = null;
            secondOpen = null;
            $(".game-card-box").on("click", cardClick)
        } else {
            setTimeout(function () {
                firstOpen.removeClass("actived");
                secondOpen.removeClass("actived");
                firstOpen = null;
                secondOpen = null;
                $(".game-card-box").on("click", cardClick);
            }, 400);
        }
        finishGame();
    }

    function showPoint() {
        $("#point").text(point)
    }

    function timerStart() {
        timerMe = setInterval(function () {
            timer += 10;
            let seconds = Math.floor(timer / 1000);
            let milliseconds = timer % 1000;
            $('#timer').text(`${seconds}:${milliseconds.toString().padStart(2, '0').slice(0, 2)}`);
        }, 10)
        $("#time-start").off("click");
        $(".game-card-box").on("click", cardClick);
        $("#game-reset").on("click", reset)
    }

    function reset() {
        $("#timer").text("0:00");
        timer = 0;
        $("#point").text("");
        point = 0;
        randomAnimal = [];
        randomAnimalId = [];
        completeCardId = [];
        clearInterval(timerMe);
        timerMe = null;
        $("#time-start").on("click", timerStart);
        createDiv();
        $("#game-reset").off("click");
    }

    function finishGame() {
        if (completeCardId.length == getSum) {
            clearInterval(timerMe);
        }
    }
})