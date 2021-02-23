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
        fillLocationsArrayFromRandomNumbers(randomTowerHeights);
        fillTowersArrayFromLocations();
        drawTowersAfterCreated(towersArr);
    }

    function sortingInProgress(sortInProgressArray){
        fillLocationsArrayFromRandomNumbers(sortInProgressArray);
        fillTowersArrayFromLocations();
        drawTowersAfterCreated(sortInProgressArray);
    }

    // 1 = > generate 'x' amount of random numbers within a range
    // 2 = > Create a locations array based on that amount of numbers for evenly spaced towers / tower widths
    // 3 = > Create an array of Tower objects based on the random numbers as Heights and in the locations from locations array
    // 4 = > Draw those towers on the canvas as the x and y positions for each Tower in Towers array



    //========1
    function genRandomNumbersInRange(x, low, high){
        randomTowerHeights = []; // reset the towersArr array
        for(let i = 0; i < x; i++){
            let ran = random(low, high);
            randomTowerHeights.push(ran);
        }
        return randomTowerHeights;
    }

    //========2
    function fillLocationsArrayFromRandomNumbers(amountOfNumbersChosen){
        locations = [];
        let towerWidth = canvasWidth  / amountOfNumbersChosen.length;
        let towerLocation = 0;
        for(let i = 0; i < amountOfNumbersChosen.length; i+=1){
            locations.push(towerLocation);
            towerLocation += towerWidth;
        }
    }


    //==========3
    function fillTowersArrayFromLocations(){
        towersArr = [];
        for(let i = 0; i < randomTowerHeights.length; i++){
            // create a tower obj on the screen at each x spot and at that randomTowerHeights height
            towersArr.push(new Tower(locations[i], randomTowerHeights[i]));
        }
    }

    //==========4
    function drawTowersAfterCreated(allTowersArr) {
        let towerWidth = canvasWidth  / allTowersArr.length;
        for(let i = 0; i < allTowersArr.length; i+=1){
            drawRectangleShape(allTowersArr[i].x, c.height, towerWidth - 2, -allTowersArr[i].h, "#ffffff");
        }
    }



    // setInterval(load, 200);
    function load(){
        createCanvas();
        setUp();
    }
    createCanvas();
    setUp();






    insertion.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callInsertion();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });
    bubble.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callBubble();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });
    selection.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        callSelection();
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });

    function callInsertion() {
        insertionSort(towersArr);
        swapsCalled.innerText = swapCount;
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
        sortingInProgress(arr); // attempt to re render the towers every swap
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