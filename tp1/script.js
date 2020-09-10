//var ctx=document.querySelector("#myCanvas").getContext("2d");
//ctx.fillStyle="#FAC033";
//ctx.fillRect(20,20,150,150);

let canvas=document.querySelector('#myCanvas');
let ctx=canvas.getContext('2d');
let rect=canvas.getBoundingClientRect();
let x=0, y=0, dibujando=false, color="black", grosor=1;

function definirColor(colour){
    color=colour;
}
function definirGrosor(gros){
    grosor=gros;
}
canvas.addEventListener("mousedown",function(e){
    x=e.clientX - rect.left;
    y=e.clientY - rect.top;
    dibujando=true;
});

canvas.addEventListener("mousemove",function(e){
   
    if(dibujando===true){
        dibujar(x,y,e.clientX - rect.left,e.clientY - rect.top);
        x=e.clientX - rect.left;
        y=e.clientY - rect.top;
    }
   
});
canvas.addEventListener("mouseup",function(e){
    x2=e.clientX - rect.left;
    y2=e.clientY - rect.top;
    if(dibujando===true){
        dibujar(x,y,x2,y2);
        x=0;
        y=0;
        dibujando=false;
    }
   
});
function dibujar(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=grosor;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}