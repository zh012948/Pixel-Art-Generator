let container = document.querySelector(".container");
let width = document.getElementById('width-range');
let height = document.getElementById('height-range');
let height_display = document.getElementById('height-display');
let width_display = document.getElementById('width-display');
let create_grid = document.getElementById('create-grid');
let clear_grid = document.getElementById('clear-grid');
let btncolor = document.getElementById('btncolor');
let btnerase = document.getElementById('btnerase');
let btnpaint = document.getElementById('btnpaint');
let rowDisplay = document.getElementById('rowStats');
let colDisplay = document.getElementById('colStats');
let totalDisplay = document.getElementById('gridStats');
let paintedStats = document.getElementById('paintedStats')
let remainingStats = document.getElementById('remainingStats');

height.value = 0;
width.value = 0;

let rowCount = 0;
let colCount = 0;
let totalCount = 0;
let paintedCount = 0;
let remaningCount = 0;


let draw = false;
let erase = false;


// Managing the height count display
height.addEventListener('input', () => {
    if (height.value <= 9) {
        height_display.textContent = 0 + `${height.value}`;
    }
    else {
        height_display.textContent = `${height.value}`
    }
})

// Managing width count display
width.addEventListener('input', () => {
    if (width.value <= 9) {
        width_display.textContent = 0 + `${width.value}`;
    }
    else {
        width_display.textContent = `${width.value}`
    }
})


create_grid.addEventListener("click", () => {
    container.innerHTML = '';
    rowCount = width.value;
    colCount = height.value;
    totalCount = width.value * height.value;
    rowDisplay.textContent = rowCount;
    colDisplay.textContent = colCount;
    totalDisplay.textContent = totalCount;
    remainingStats.textContent = remaningCount;
    let count = 0;
    for (let i = 0; i < height.value; i++) {
        count += 2;
        let div = document.createElement('div');
        div.classList.add('gridRow');
        for (let j = 0; j < width.value; j++) {
            count += 2;
            let col = document.createElement('div');
            col.classList.add('gridCol');
            col.setAttribute("id", `gridCol${count}`)
            div.appendChild(col);

            // We make these listeners inside the col loop because we won't be able to access single column grid outside loop
            col.addEventListener('mousedown', () => {
                draw = true;
                if (erase) {
                    if (paintedCount >= totalCount) {
                        paintedCount += 0;
                    }
                    else {
                        paintedCount--;
                    }
                    col.style.backgroundColor = "transparent";
                    paintedStats.textContent = paintedCount;
                }
                else if (!col.classList.add('painted')) {

                    if (paintedCount >= totalCount) {
                        paintedCount += 0;
                    }
                    else {
                        paintedCount++;
                        remaningCount = totalCount - paintedCount;

                    }
                    col.style.backgroundColor = btncolor.value;
                    col.classList.add('painted')
                    paintedStats.textContent = paintedCount;
                    remainingStats.textContent = remaningCount

                }
            })

            // continously pressing the mouse and painting the grid
            col.addEventListener('mousemove', (e) => {
                let colId = document.elementFromPoint(e.clientX, e.clientY).id;
                checker(colId);
            })

            col.addEventListener('mouseup', () => {
                draw = false;
            })

        }

        container.appendChild(div);
    }
});


clear_grid.addEventListener('click', () => {
    container.textContent = ""
    width.value = 0;
    height.value = 0;
    width_display.textContent = "00";
    height_display.textContent = "00";
    totalCount = 0;
    rowCount = 0;
    colCount = 0;
    paintedCount = 0;
    remaningCount = 0;
    rowDisplay.textContent = 0;
    colDisplay.textContent = 0;
    totalDisplay.textContent = 0;
    paintedStats.textContent = 0;
    remainingStats.textContent = 0;
})

function checker(elementId) {
    let gridColumns = document.querySelectorAll('.gridCol');
    gridColumns.forEach((element) => {

        if (elementId == element.id) {
            if (draw && !erase && !element.classList.contains('painted')) {

                if (paintedCount >= totalCount) {
                    paintedCount += 0;
                }
                else {
                    paintedCount++;
                    remaningCount = totalCount - paintedCount;
                }
                element.style.backgroundColor = btncolor.value;
                element.classList.add('painted');
                paintedStats.textContent = paintedCount;
                remaningStats.textContent = remaningCount;
            }
            else if (draw && erase) {
                element.style.backgroundColor = "transparent";
                element.classList.remove('painted');

                if (paintedCount >= totalCount) {
                    paintedCount += 0;
                }
                else {

                    paintedCount--;
                }
                paintedStats.textContent = paintedCount
            }
        }
    })

}


btnerase.addEventListener('click', () => {
    erase = true;
    draw = false;
})

btnpaint.addEventListener('click', () => {
    draw = true;
    erase = false;
})


document.addEventListener('DOMContentLoaded', () => {
    width.value = 0;
    height.value = 0;
    rowDisplay.textContent = 0;
    colDisplay.textContent = 0;
    totalDisplay.textContent = 0;
    paintedStats.textContent = 0;
    remainingStats.textContent = 0;
})
