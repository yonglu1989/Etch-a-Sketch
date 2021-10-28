// Initialization
const gridContainer = document.getElementById('grid-container');
const clearBoardButton = document.getElementById('clear-button');
const rainbowButton = document.getElementById('rainbow-button');
const greyButton = document.getElementById('grey-button');
let sliderValue = document.getElementById('slider-value');
let slider = document.getElementById('my-range');

sliderValue.innerHTML = slider.value.toString() + "x" + slider.value.toString()
let color = "#000000";
let rainbow = false;


drawBoard(slider.value);
activateSquares();

function drawBoard(inputNum) {

    let square = document.createElement("div");
    
    // Calculate the # of columns for the gridContainer.
    let columnStr = "";
    for(let i = 0; i < inputNum; i++) {
        columnStr += "1fr ";
    }
    columnStr.trim()
    gridContainer.style['grid-template-columns'] = columnStr;

    // Append the squares to gridContainer
    for(let i = 0; i < inputNum; i++) {
        for(let j = 0; j < inputNum; j++) {
            square = document.createElement("div")
            square.classList.add('square');
            gridContainer.appendChild(square);
        }
    }
}

function removeAllSquares(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Generates random int from 0 to max.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Function colors the square according to determined Color
function colorSquare(e) {
    if (rainbow == true) {
        let r = getRandomInt(255);
        let g = getRandomInt(255);
        let b = getRandomInt(255);
        color = "rgb(" + r + "," + g +"," + b + ")";
        this.style.backgroundColor = color;
    }
    else {
        this.style.backgroundColor = color;
    }
}

// Adding mouseenter event listeners to each square.
function activateSquares() {
    let squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', colorSquare);
    });
};

// Update slider value then remove all squares, redraw board,
// and reactivate all the squares.
function updateBoard(){
    const sliderString = this.value.toString() + "x" + this.value.toString();
    sliderValue.innerHTML = sliderString;
    removeAllSquares(gridContainer);
    drawBoard(this.value);
    activateSquares();
}


// Update the current slider value (each time you drag the slider handle)
slider.oninput = updateBoard;

// Clear Board button: sets all background colors to white.
clearBoardButton.addEventListener('click', () => {
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = "white");
});

// Rainbow Button: Sets the Etcher to etch random colors.
rainbowButton.addEventListener('click', () => {
    rainbow = true;
});

// Grey Button: Set the Etcher to etch the grey color.
greyButton.addEventListener('click', () => {
    rainbow = false;
    color = "grey";
});