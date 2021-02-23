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
    const canvasWidth = c.width;


    const insertion = document.getElementById("insertionSort");
    const bubble = document.getElementById("bubbleSort");
    const selection = document.getElementById("selectionSort");

    const speedAdjBtn  = document.getElementById("changeSpeed");
    const speed = document.getElementById("inputSpeed");
    speedAdjBtn.addEventListener("click", () => {
        rate = speed.value || 150;
    });

    const numCount = document.getElementById("numberCount");
    const restart = document.getElementById("reset");
    const swapsCalled = document.getElementById("swapsText");




    createCanvas();


    function setUp() {
        genRandomNumbersInRange(100, 2, 598);
        drawTowersOnCanvas(randomTowerHeights);
        renderTowers();
    }
    setUp();

    function drawTowersOnCanvas(amountOfNumbersChosen) {
        locations = [];
        let towerWidth = canvasWidth  / amountOfNumbersChosen.length;
        let towerLocation = 0;
        for(let i = 0; i < amountOfNumbersChosen.length; i+=1){
            drawRectangleShape(towerLocation, c.height, towerWidth - 2, -amountOfNumbersChosen[i], "#ffffff");
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
        for(let i = 0; i < randomTowerHeights.length; i++){
            // create a tower obj on the screen at each x spot and at that randomTowerHeights height
            towersArr.push(new Tower(locations[i], randomTowerHeights[i]));
        }
    }





    setInterval(load, 50);
    function load(){
        createCanvas();
        drawTowersOnCanvas(randomTowerHeights);
    }






    insertion.addEventListener("click", () => {
        swapCount = 0;
        callInsertion();
    });
    bubble.addEventListener("click", () => {
        swapCount = 0;
        callBubble();
    });
    selection.addEventListener("click", () => {
        swapCount = 0;
        callSelection();
    });


    function callInsertion() {
        swapsCalled.innerText = "0";
        insertionSort(randomTowerHeights);
        swapsCalled.innerText = swapCount;
    }

    function callBubble(){
        swapsCalled.innerText = "0";
        bubbleSort(randomTowerHeights);
        swapsCalled.innerText = swapCount;
    }
    function callSelection(){
        swapsCalled.innerText = "0";
        selectionSort(randomTowerHeights);
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
            while(j >= 0 && arr[j] > arr[j + 1]){
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
                    if(arr[j] > arr[j + 1]){
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
            let curr = arr[i];
            let currInd = i;
            for(let j = i; j < arr.length; j++){
                let inner = arr[j];
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
})();