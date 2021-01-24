(function (){

    function Tower(x, h){
        this.x = x;
        this.h = h;
    }

    const insert = document.getElementById("start");
    const bubble = document.getElementById("start2");
    const selection = document.getElementById("start3");
    const speedAdj  = document.getElementById("changeSpeed");
    const speed = document.getElementById("speed");
    const numCount = document.getElementById("howManyNums");
    const restart = document.getElementById("restart");
    const begin = document.getElementById("begin");
    const c = document.getElementById("canvas");
    const cc = c.getContext("2d");
    const swapsCalled = document.getElementById("times");
    const screen = c.width;
    let nums = [];
    let locations = [];
    let towers = [];
    let rate = 150;
    let swapCount = 0;
    let bSort;
    let iSort;

    begin.addEventListener("click", renderTowers);

    restart.addEventListener("click", () => {
        clearInterval(bSort);
        clearInterval(iSort);
        if(numCount.value.length > 0) {
            let count = parseFloat(numCount.value);
            if(count > 10000){
                count = 10000;
            }
            genRandomNums(count, 5, 550);
        } else {
            genRandomNums(100, 5, 550)
        }
    })

    genRandomNums(100,5, 550);
    setInterval(load, 50);
    function load(){
        draw();
    }
    speedAdj.addEventListener("click", () => {
        let newSpeed = speed.value || 150;
        rate = newSpeed;
    });




    insert.addEventListener("click", () => {
        swapCount = 0;
        iSort = setInterval(callInsertion, rate);
    });
    bubble.addEventListener("click", () => {
        swapCount = 0;
        bSort = setInterval(callBubble, rate);
    });
    selection.addEventListener("click", () => {
        swapCount = 0;
        callSelection();
    })
    function callInsertion() {
        swapsCalled.innerText = swapCount;
        insertionSort(nums);
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

    function callBubble(){
        swapsCalled.innerText = swapCount;
        bubbleSort(nums);
    }
    function bubbleSort(arr){
        let isSorted = false;
        while(!isSorted){
            isSorted = true;
            for(let i = 0; i < arr.length - 1; i++){ // same reason
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

    function callSelection(){
        swapsCalled.innerText = swapCount;
        selectionSort(nums);
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



    function swap(i, j, arr){
        findMatchingTower(arr[i], arr[j]);// for coloring the curr one
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swapCount++;
    }

    function findMatchingTower(larger, smaller){
        let space = screen / towers.length;
        //pass in the current num from arr
        // find matching h in towers arr
        // fill at that towers x and to h with red
        let tSmaller = {x:null, h:null};
        let tLarger = {x:null, h:null};
        for(let i = 0; i < towers.length; i++){
            if(towers[i].h === smaller){
                tSmaller.h = towers[i].h;
                tSmaller.x = towers[i].x;
            } else if(towers[i].h === larger) {
                tLarger.h = towers[i].h;
                tLarger.x = towers[i].x;
            }
        }
        // console.log(tSmaller);
        // fill(tSmaller.x, 0, space - 2, -tSmaller.h, "#cb2d2d");
    }

    function renderTowers(){
        if(locations.length > 1){
            locations = [];
        }
        // console.log(locations);
        for(let i = 0; i < nums.length; i++){

            towers.push(new Tower(locations[i], nums[i]));
        }
    }

    function draw(){
        fill(0, 0, c.width, c.height, "#181818");
        drawNumLines(nums);
    }
    function fill(lx, ty, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(lx, ty, w, h);
    }

    function drawNumLines(arr){
        let space = screen  / arr.length;
        let x = 0;
        for(let i = 0; i < arr.length; i+=1){
            // locations.push(x);
            fill(x, c.height, space - 2, -arr[i], "#fff");
            x+=space;
        }
    }

    function genRandomNums(x, low, high){
        nums = [];
        for(let i = 0; i < x; i++){
            let ran = random(low, high);
            nums.push(ran);
        }
        return nums;
    }

    function random(m, t){
        return ~~(Math.random() * (t - m)) + m;
    }
})();