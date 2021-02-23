(function (){
    "use strict";
    const c = document.getElementById("canvas");
    const cc = c.getContext("2d");

    const canvasWidth = c.width;

    let randomTowerHeights = [];
    let rate = 150;
    let swapCount = 0;
    let timer = 0;
    let clock;
    let clockAfter;

    const insertion = document.getElementById("insertionSort");
    const bubble = document.getElementById("bubbleSort");
    const selection = document.getElementById("selectionSort");

    const lowEnd = document.getElementById("lowHeight");
    const highEnd = document.getElementById("highHeight");

    const speedAdjBtn  = document.getElementById("changeSpeed");
    const speed = document.getElementById("inputSpeed");
    speedAdjBtn.addEventListener("click", () => {
        rate = speed.value || 150;
    });

    const timerTextLocation = document.getElementById("timer");
    const numCount = document.getElementById("numberCount");
    const restart = document.getElementById("reset");
    const swapsCalled = document.getElementById("swapsText");

    // draw canvas
    createCanvas();
    setUp(100, 2, 598); // initial set up for 100 numbers


    function setUp(x, y, h) { // used on reset for new range of numbers
        createCanvas();
        genRandomNumbersInRange(x, y, h);
        drawTowersAfterCreated(randomTowerHeights);
    }

    function sortingInProgress(sortInProgressArray){
        createCanvas(); // draw the canvas
        drawTowersAfterCreated(sortInProgressArray);
    }


    //======== generate 'x' amount of random numbers within a range ( start with initial set up )
    function genRandomNumbersInRange(x, low, high){
        randomTowerHeights = []; // reset the towersArr array
        for(let i = 0; i < x; i++){
            let ran = random(low, high);
            randomTowerHeights.push(ran);
        }
    }

    //========== Draw those towers on the canvas at locations spaced based on amount of nums choosen and at height
    function drawTowersAfterCreated(allTowersArr) {
        let towerWidth = canvasWidth  / allTowersArr.length;
        let towerLocation = 0;
        for(let i = 0; i < allTowersArr.length; i+=1){
            drawRectangleShape(towerLocation, c.height, towerWidth - 2, -allTowersArr[i], "#ffffff");
            towerLocation += towerWidth;
        }
    }







    insertion.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        insertionSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });
    bubble.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        bubbleSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });
    selection.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        selectionSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = (clockAfter - clock).toFixed(4);
    });










    function resetPage(){
        swapsCalled.innerText = "0";
        timerTextLocation.innerText = "0";
        timer = 0;
        swapCount = 0;
    }

    restart.addEventListener("click", () => {
        swapsCalled.innerText = "0";
        let shortest = 5;
        let tallest = 550;
        let count = 100;

        if(lowEnd.value.length > 0){
            shortest = parseFloat(lowEnd.value);
            if(shortest < 1){
                shortest = 1;
                lowEnd.value = shortest.toString();
            }
        }

        if(highEnd.value.length > 0){
            tallest = parseFloat(highEnd.value);
            if(tallest > 695){
                tallest = 695;
                highEnd.value = 695;
            }
        }

        if(numCount.value.length > 0) {
            count = parseFloat(numCount.value);
            if(count > 5000){
                count = 5000;
                numCount.value = 5000;
            } else if (count < 3){
                count = 3;
                numCount.value = 3;
            }
        }

        if(shortest > tallest){
            let temp = tallest;
            tallest = shortest;
            shortest = temp;
            highEnd.value = tallest;
            lowEnd.value = shortest;
        }

        setUp(count, shortest, tallest);
    });






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
        swapsCalled.innerText = swapCount;
        sortingInProgress(arr); // attempt to re render the towers every swap ……… still does not work, just gives a delay and renders at the end
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


    function random(m, t){
        return ~~(Math.random() * (t - m)) + m;
    }

})();