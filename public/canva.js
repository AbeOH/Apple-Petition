console.log("Hi");

// // Setting ALL variables
let isMouseDown = false;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", () => {
    console.log("Mouse Down");
    mousedown(canvas, event);
});

canvas.addEventListener("mousemove", () => {
    mousemove(canvas, event);
});

canvas.addEventListener("mouseup", mouseup);

// // Need to add event listner for mouseleave
// canvas.addEventListener("mouseleave", mouseleave);

// // Getting Mouse Position
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

// // Mouse Down
function mousedown(canvas, evt) {
    const mousePos = getMousePos(canvas, evt);
    isMouseDown = true;
    var currentPosition = getMousePos(canvas, evt);
    ctx.moveTo(currentPosition.x, currentPosition.y);
    ctx.beginPath();
    ctx.lineCap = "round";
}

// // Mouse Move
function mousemove(canvas, evt) {
    if (isMouseDown) {
        const currentPosition = getMousePos(canvas, evt);
        ctx.lineTo(currentPosition.x, currentPosition.y);
        ctx.stroke();
    }
}

// // Mouse Up
function mouseup() {
    isMouseDown = false;
}

/// Saving Image
// toDataURL()---- Creating event listner to the event of button submit
// and then pass the information of toDataUrl into hidden element
// The log in check
// Then part 5
