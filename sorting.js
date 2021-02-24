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
    const cockTail = document.getElementById("cockTailShakerSort");
    const selection = document.getElementById("selectionSort");

    const sortInputs = document.getElementsByClassName("sortInput");

    const lowEnd = document.getElementById("lowHeight");
    const highEnd = document.getElementById("highHeight");

    // const speedAdjBtn  = document.getElementById("changeSpeed");
    // const speed = document.getElementById("inputSpeed");
    // speedAdjBtn.addEventListener("click", () => {
    //     rate = speed.value || 150;
    // });

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

    async function sortingInProgress(sortInProgressArray, towerAIndx, towerBIndx){
        createCanvas(); // draw the canvas
        drawTowersAfterCreated(sortInProgressArray, towerAIndx, towerBIndx);
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
    function drawTowersAfterCreated(allTowersArr, towerAIndx, towerBIndx) {
        let towerWidth = canvasWidth  / allTowersArr.length;
        let towerLocation = 0;
        for(let i = 0; i < allTowersArr.length; i+=1){
            if(i === towerAIndx){
                drawRectangleShape(towerLocation, c.height, towerWidth - 2, -allTowersArr[i], "#f80303");
                towerLocation += towerWidth;
            } else if (i === towerBIndx){
                drawRectangleShape(towerLocation, c.height, towerWidth - 2, -allTowersArr[i], "#2ae305");
                towerLocation += towerWidth;
            }
            drawRectangleShape(towerLocation, c.height, towerWidth - 2, -allTowersArr[i], "#ffffff");
            towerLocation += towerWidth;
        }
    }







    insertion.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        insertionSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = timeFormat(clockAfter - clock);
    });
    bubble.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        bubbleSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = timeFormat(clockAfter - clock);
    });
    cockTail.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        cockTailShakerSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = timeFormat(clockAfter - clock);
    })
    selection.addEventListener("click", () => {
        resetPage();
        clock = performance.now();
        selectionSort(randomTowerHeights);
        clockAfter = performance.now();
        timerTextLocation.innerText = timeFormat(clockAfter - clock);
    });

    Array.from(sortInputs).forEach(input => {
        input.addEventListener("input", () => {
            restart.innerText = "Apply Changes";
        });
    });









    function resetPage(){
        swapsCalled.innerText = "0";
        timerTextLocation.innerText = "0";
        timer = 0;
        swapCount = 0;
    }

    restart.addEventListener("click", resetSorter);
    window.addEventListener("keydown", (e) => {
        if(e.key === "Enter") resetSorter(); // why is this not working like i think it should ?
    });

    function resetSorter(){
        randomTowerHeights = [];
        swapsCalled.innerText = "0";
        let shortest = 5;
        let tallest = 550;
        let count = 100;

        if(lowEnd.value.length > 0){
            let input = lowEnd.value;
            shortest = isNumberCheck(lowEnd.value, 1);
            if(shortest !== input){
                lowEnd.value = shortest;
            }
            if(shortest < 1){
                shortest = 1;
                lowEnd.value = shortest.toString();
            }
        }

        if(highEnd.value.length > 0){
            let input = highEnd.value;
            tallest = isNumberCheck(highEnd.value, 735);
            if(input !== tallest){
                highEnd.value = tallest;
            }
            if(tallest > 735){
                tallest = 735;
                highEnd.value = 735;
            }
        }

        if(numCount.value.length > 0) {
            let input = numCount.value;
            count = isNumberCheck(numCount.value, 100);
            if(count > 350){
                count = 350;
                numCount.value = 350;
            } else if (count < 3){
                count = 3;
                numCount.value = 3;
            } else if (input !== count){
                numCount.value = count;
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
        restart.innerText = "Reset";
    }




    function createCanvas(){
        drawRectangleShape(0, 0, c.width, c.height, "#181818");
    }


    function drawRectangleShape(lx, ty, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(lx, ty, w, h);
    }




    async function swap(i, j, arr){
        await sleep(100);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swapCount++;
        swapsCalled.innerText = swapCount;
        await sortingInProgress(arr, i, j); // attempt to re render the towers every swap ……… still does not work, just gives a delay and renders at the end
    }



    async function insertionSort(arr){
        for(let i = 0; i < arr.length - 1; i++){
            let j = i;
            while(j >= 0 && arr[j] > arr[j + 1]){
                await swap(j, j+1, arr);
                j--;
                // break; // does a one by one sorting
            }
        }
        return arr;
    }

    async function bubbleSort(arr){
        let isSorted = false;
        let len = arr.length;
        while(!isSorted){
            isSorted = true;
            for(let i = 0; i < len - 1; i++){
                for(let j = 0; j < arr.length - 1; j++){
                    if(arr[j] > arr[j + 1]){
                        isSorted = false;
                        await swap(j, j + 1, arr);
                        // len--; // kind of does a sort visualizer ish
                    }
                }
            }
        }
        return arr;
    }

    async function cockTailShakerSort(arr){
        let isSorted = false;
        while(!isSorted){
            isSorted = true;
            for(let i = 0; i < arr.length - 1; i++){
                if(arr[i] > arr[i + 1]){
                    isSorted = false;
                    await swap(i, i + 1, arr);
                }
            }
            if(isSorted) break;
            isSorted = true;
            for(let i = arr.length - 1; i > 0; i--){
                if(arr[i] < arr[i - 1]){
                    isSorted = false;
                    await swap(i, i - 1, arr);
                }
            }
        }
        return arr;
    }

    async function selectionSort(arr){
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
            await swap(spot, currInd, arr);
            spot++;
        }
        return arr;
    }

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function random(m, t){
        return ~~(Math.random() * (t - m)) + m;
    }

    function isNumberCheck(input, x){
        return isNaN(input) ? x : parseFloat(input);
    }

    function timeFormat(ms){
        let checkMs = ms.toString().split(".")[0];
        return checkMs.length > 3 ? (ms / 1000).toFixed(2) + " sec" : ms.toFixed(4) + " ms";
    }

})();