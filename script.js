let grid = document.querySelector(".grids");
let getGridNumbers=document.querySelector("#getGridNumbers");
let build =document.getElementById('build');
let erase = document.getElementById('eraseIcon');

let opacityIcon = document.getElementById('opacityIcon');
let changeColor = document.getElementById('changeColor');

let mixedColor = document.getElementById('mixedColor');
let welcomeWindow = document.querySelector('.welcome');
let wrapper= document.querySelector('.container');
const downloadBtn = document.getElementById('download');

downloadBtn.addEventListener('click', () => {
    html2canvas(grid).then(canvas => {
        const link = document.createElement('a');
        link.download = 'etch-a-sketch.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});


let red =0;
let blue =0;
let green =0;

let isDrawing = false;
let clear = false;
let gridNumbers =0;
let count =0;
let bgColor =changeColor.value;
let useMixedColor = false;
let useOpacity = false;


function defaultGrid(){
    if(grid.children.length === 0){
        gridNumbers = 40;
        drawGrids(gridNumbers);isDrawing = false;
    }

}function welcome() {
    setTimeout(() => {
      welcomeWindow.style.animation = "fadeOut 1s forwards";
  
      // Hide after fade out ends
      setTimeout(() => {
        welcomeWindow.classList.add("hidden");
        wrapper.classList.remove("hidden");
      }, 1000);
    }, 2000); 
  }
  
  welcome();

defaultGrid()





build.addEventListener('click',()=>{
    grid.innerHTML=``;
    gridNumbers = getGridNumbers.value;
    drawGrids(gridNumbers);
});

document.body.addEventListener("mousedown", () => (isDrawing = true));
document.body.addEventListener("mouseup", () => (isDrawing = false));

changeColor.addEventListener('click',()=>{
    clear = false;
    useMixedColor = false;
})
mixedColor.addEventListener('click',()=>{
    count++;
    clear = false;
     console.log(count +"coloredddddd" +clear);
        useMixedColor = true;
    

})
let opacityInput;
let opacityDiv; // We'll track this for later removal

opacityIcon.addEventListener('click', () => {
    // Remove existing slider if already visible
    if (opacityDiv) {
        opacityDiv.remove();
        opacityDiv = null;
        return;
    }
    // Create and show the slider
    opacityDiv = document.createElement('div');
    opacityDiv.classList.add('opacityDiv');
    opacityDiv.innerHTML = `
        <input id="opacity" type="range" min="0.0" max="1.0" step="0.1" value="1.0" style="width: 89%; height: 5px;"> 
    `;
    wrapper.appendChild(opacityDiv);
    opacityInput = opacityDiv.querySelector('#opacity');
});



erase.addEventListener('click',()=>{
    count++;
    useMixedColor = false;
        clear = true;
     console.log(count +"clicked" +clear);
});


function drawGrids(gridNumbers){

    if(gridNumbers >=40 && gridNumbers <=100){
        for(let i=0; i<gridNumbers; i++){
            let colGrid=document.createElement('div');
            colGrid.classList.add("allGrid");
            grid.style.gridTemplateColumns = `repeat(${gridNumbers}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${gridNumbers}, 1fr)`;

            
        for(let j=0; j<gridNumbers; j++){
            let cell=document.createElement('div');
            cell.classList.add("cell");
            colGrid.append(cell);


            cell.addEventListener("mouseover", () => {
                if (isDrawing) {
                    if (opacityDiv) {
                        opacityDiv.remove();
                        opacityDiv = null;
                    }
                    if(useMixedColor){
                        clear = false;
                        
                        red=Math.floor(Math.random() * 256);
                        blue = Math.floor(Math.random() * 256);
                        green = Math.floor(Math.random() * 256);
                        bgColor = `rgb(${red}, ${green}, ${blue})`;
                        cell.style.backgroundColor = bgColor; 
                        // useMixedColor = false; 
                       
                    }else{
                  cell.style.backgroundColor = changeColor.value;

                    }
                cell.style.opacity = opacityInput ? opacityInput.value : 1;

                  cell.style.transform = "scale(1.2)";


                    setTimeout(() => {
                    cell.style.transform = "scale(1)";
                    }, 150);
                  if(clear===true){
                    useMixedColor = false;
                    cell.style.backgroundColor = "rgb(189, 177, 177)";
  
                  }
                }
            });
            cell.addEventListener("mousedown", () => {

                cell.style.backgroundColor = changeColor.value;
                //  cell.style.opacity = document.getElementById('opacity')?.value || 1;
                cell.style.opacity = opacityInput ? opacityInput.value : 1;

                if(clear===true){
                    useMixedColor = false;
                    cell.style.backgroundColor = "rgb(189, 177, 177)";
  
                  }
            });
            
            console.log(clear);
        }
            grid.append(colGrid);   
        }
    
    }else{
        alert(" only  between : 30 - 100  ! ")
        defaultGrid()
    }

}




















