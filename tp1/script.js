//var ctx=document.querySelector("#myCanvas").getContext("2d");
//ctx.fillStyle="#FAC033";
//ctx.fillRect(20,20,150,150);

let canvas=document.querySelector('#myCanvas');
let ctx=canvas.getContext('2d');
let rect=canvas.getBoundingClientRect();
let x=0, y=0, dibujando=false, color="black", colorBorrado="white", grosor=1;
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.fill();
let gomaActiva = false;
let nombreImagen="image.png";
let lapizActivo = false;

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
    ctx.lineCap = "round";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}
function eliminar(){
    let canvas=document.querySelector('#myCanvas');
    let ctx=canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function BorrarConGoma(){
    document.body.style.cursor="url('images/goma.png')";
    let borrando = false;
    lapizActivo = false;
    gomaActiva = true;
    definirColor("white");
    herramientas(borrando);
  }

  //function Pintar(){ 
   // let ctx=document.querySelector("#myCanvas").getContext("2d");
    //let colour="red";
    //ctx.fillStyle=definirColor(colour);
   // ctx.fillRect(0,0,500,500);
    //ctx.fill();
  //}
    //function clearCanvas(){
    //this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //this.rellenarCanvas();
  //}

  function subirImagen(e){
  //  this.clearCanvas();
    let reader = new FileReader();
    let context = this.ctx;
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            let width = img.width;
            let height = img.height;
            while (width>canvas.width || height > canvas.height){
              width = width/2;
              height = height/2;
            }
            let posicionX = (canvas.width - width)/2;
            let posicionY = (canvas.height - height)/2;
            context.drawImage(img,posicionX,posicionY,width,height);
        }
        img.src = event.target.result;
    }
    //reader.readAsDataURL(e.target.files[0]);
  }



  function getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}

function getSepia(){
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let r,g,b;
  for (let x=0; x<canvas.width; x++){
    for (let y=0; y<canvas.height; y++){
        r = (getRed(imageData,x,y) * 0.393) + (getGreen(imageData,x,y)*0.769) + (getBlue(imageData,x,y) * 0.189);
        g = (getRed(imageData,x,y) * 0.349) + (getGreen(imageData,x,y)*0.686) + (getBlue(imageData,x,y) * 0.168);
        b = (getRed(imageData,x,y) * 0.272) + (getGreen(imageData,x,y)*0.534) + (getBlue(imageData,x,y) * 0.131);
        setPixel(imageData, x, y, r, g, b,255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
} 

function GetBlancoNegro(){
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let r,g,b;
  for (let x=0; x<canvas.width; x++){
    for (let y=0; y<canvas.height; y++){
      r = getRed(imageData,x,y);
      g = getGreen(imageData,x,y);
      b = getBlue(imageData,x,y);
      let gris = (r+g+b)/3;
      setPixel(imageData, x, y, gris, gris, gris,255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
function getNegativo(){
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let r,g,b;
  for (let x=0; x<canvas.width; x++){
    for (let y=0; y<canvas.height; y++){
      r = 255 - getRed(imageData,x,y);
      g = 255 - getGreen(imageData,x,y);
      b = 255 - getBlue(imageData,x,y);
      setPixel(imageData, x, y, r, g, b,255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
  function descargarImagen(nombreImagen){
        //nombreImagen+=".png";
        let link = window.document.createElement( 'a' );
        let url = canvas.toDataURL();
        link.setAttribute( 'href', url );
        link.setAttribute( 'download', nombreImagen );
        link.style.visibility = 'hidden';
        window.document.body.appendChild( link );
        link.click();
        window.document.body.removeChild( link );
      }

  function herramientas(dibujando){
    canvas.addEventListener('mousedown', e => {
      dibujando = true;
      ctx.beginPath();
    });
  }
  function mostrar(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        document.getElementById("img").src = reader.result;
        ctx.drawImage("file",0,0);
      }
    }
  }
  

  
  document.querySelector("#goma").addEventListener('click',BorrarConGoma);

  function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x+y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }
  function rellenarCanvas(){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
          setPixel(imageData,x,y,255,255,255,255);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rellenarCanvas();
  }
  document.getElementById('descargar').addEventListener('click', function(e){
    descargarImagen(nombreImagen);
  });  

  document.querySelector("#buttonBinary").addEventListener("click", GetBlancoNegro);
  document.querySelector("#buttonSepia").addEventListener("click", getSepia);
  document.querySelector("#buttonNegative").addEventListener("click", getNegativo);

  document.getElementById('cargar').addEventListener('change', function(e){
    
        clearCanvas();
        let reader = new FileReader();
        let context = ctx;
        reader.onload = function(event){
            let img = new Image();
            img.onload = function(){
                let width = img.width;
                let height = img.height;
                while (width>canvas.width || height > canvas.height){
                  width = width/2;
                  height = height/2;
                }
                let posicionX = (canvas.width - width)/2;
                let posicionY = (canvas.height - height)/2;
                context.drawImage(img,posicionX,posicionY,width,height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
      
  });