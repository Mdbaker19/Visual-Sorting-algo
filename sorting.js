(function (){
    "use strict";
    const c = document.getElementById("canvas");
    const cc = c.getContext("2d");
    function Tower(x, h){
        this.x = x;
        this.h = h;
    }

    let randomTowerHeights = [];
    let locations = [];
    let towersArr = [];
    let rate = 150;
    let swapCount = 0;
    let timer = 0;
    let clock;
    let clockAfter;
    const canvasWidth = c.width;


    const insertion = document.getElementById("insertionSort");
    const bubble = document.getElementById("bubbleSort");
    const selection = document.getElementById("selectionSort");

    const timerTextLocation = document.getElementById("timer");
    const speedAdjBtn  = document.getElementById("changeSpeed");
    const speed = document.getElementById("inputSpeed");
    speedAdjBtn.addEventListener("click", () => {
        rate = speed.value || 150;
    });

    const numCount = document.getElementById("numberCount");
    const restart = document.getElementById("reset");
    const swapsCalled = document.getElementById("swapsText");






    function setUp() {
        genRandomNumbersInRange(100, 2, 598);
        fillLocationsArray(randomTowerHeights);
        renderTowers();
        drawTowersOnCanvas(towersArr);
    }

    function drawTowersOnCanvas(allTowersArr) {
        let towerWidth = canvasWidth  / allTowersArr.length;
        for(let i = 0; i < allTowersArr.length; i+=1){
            drawRectangleShape(allTowersArr[i].x, c.height, towerWidth - 2, -allTowersArr[i].h, "#ffffff");
        }
    }

    function fillLocationsArray(amountOfNumbersChosen){
        locations = [];
        let towerWidth = canvasWidth  / amountOfNumbersChosen.length;
        let towerLocation = 0;
        for(let i = 0; i < amountOfNumbersChosen.length; i+=1){
            locations.push(towerLocation);
            towerLocation += towerWidth;
        }
    }



    function genRandomNumbersInRange(x, low, high){
        randomTowerHeights = []; // reset the towersArr array
        for(let i = 0; i < x; i++){
            let ran = random(low, high);
            randomTowerHeights.push(ran);
        }
        return randomTowerHeights;
    }



    function renderTowers(){
        towersArr = [];
        for(let i = 0; i < randomTowerHeights.length; i++){
            // create a tower obj on the screen at each x spot and at that randomTowerHeights height
            towersArr.push(new Tower(locations[i], randomTowerHeights[i]));
        }
    }





    // setInterval(load, 15500);
    function load(){
        createCanvas();
        setUp()
    }
    createCanvas();
    setUp()






    insertion.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callInsertion();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toString();
    });
    bubble.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callBubble();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toString();
    });
    selection.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callSelection();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toString();
    });


    function callInsertion() {
        // it is not sorted before by tower.h and it is after
        // console.log(towersArr);
        let temp = [];
        for(let i = 0; i < towersArr.length; i++){
            temp.push(towersArr[i]);
        }

        insertionSort(temp);
        swapsCalled.innerText = swapCount;
        // console.log(temp);
    }

    function callBubble(){
        bubbleSort(towersArr);
        swapsCalled.innerText = swapCount;
    }
    function callSelection(){
        selectionSort(towersArr);
        swapsCalled.innerText = swapCount;
    }
























    function createCanvas(){
        drawRectangleShape(0, 0, c.width, c.height, "#181818");
    }


    function drawRectangleShape(lx, ty, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(lx, ty, w, h);
    }




    function swap(i, j, arr){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swapCount++;
    }



    function insertionSort(arr){
        for(let i = 0; i < arr.length - 1; i++){
            let j = i;
            while(j >= 0 && arr[j].h > arr[j + 1].h){
                swap(j, j+1, arr);
                j--;
            }
        }
        return arr;
    }

    function bubbleSort(arr){
        let isSorted = false;
        while(!isSorted){
            isSorted = true;
            for(let i = 0; i < arr.length - 1; i++){
                for(let j = 0; j < arr.length - 1; j++){
                    if(arr[j].h > arr[j + 1].h){
                        isSorted = false;
                        swap(j, j + 1, arr);
                    }
                }
            }
        }
        return arr;
    }

    function selectionSort(arr){
        let spot = 0;
        for(let i = 0; i < arr.length; i++){
            let curr = arr[i].h;
            let currInd = i;
            for(let j = i; j < arr.length; j++){
                let inner = arr[j].h;
                if(inner < curr){
                    curr = inner;
                    currInd = j;
                }
            }
            swap(spot, currInd, arr);
            spot++;
        }
        return arr;
    }

    restart.addEventListener("click", () => {
        swapsCalled.innerText = "0";
        if(numCount.value.length > 0) { // is a number entered ? if not then default 100 towersArr
            let count = parseFloat(numCount.value);
            if(count > 5000){   // no more than 5000 towersArr at time
                count = 5000;
            }
            genRandomNumbersInRange(count, 5, 550);
        } else {
            genRandomNumbersInRange(100, 5, 550)
        }
    });

    function random(m, t){
        return ~~(Math.random() * (t - m)) + m;
    }

    function resetPage(){
        swapsCalled.innerText = "0";
        timerTextLocation.innerText = "0";
        timer = 0;
        swapCount = 0;
    }
})();