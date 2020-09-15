
let rangeBrillo=document.querySelector("#brillo");
let canvas=document.querySelector('#myCanvas');
let ctx=canvas.getContext('2d');
let rect=canvas.getBoundingClientRect();
let x=0, y=0, dibujando=false, color="black", colorBorrado="white", grosor=1;
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.fill();
let gomaActiva = false;
let nombreImagen="Sin título.png";
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

function getGreyScale(){
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
function getOtroEfecto(){
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let r,g,b;
  for (let x=0; x<canvas.width; x++){
    for (let y=0; y<canvas.height; y++){
      adjustment+= getRed(imageData,x,y);
      adjustment+=getGreen(imageData,x,y);
      adjustment+=getBlue(imageData,x,y);
      }
      setPixel(imageData, x, y, r, g, b,255);
    }
  
  ctx.putImageData(imageData, 0, 0);
}

function getFiltroBrillo() {
  let index;
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
                  index = (x + y * imageData.width) * 4;
                   r = imageData.data[index + 0] + 20;
                   g = imageData.data[index + 1] + 20;
                   b = imageData.data[index + 2] + 20;
                  imageData.data[index + 0] = r;
                  imageData.data[index + 1] = g;
                  imageData.data[index + 2] = b;
          }
  }
  ctx.putImageData(imageData, 0, 0);
}
function getFiltroOscurecer() {
  let index;
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
                  index = (x + y * imageData.width) * 4;
                   r = imageData.data[index + 0] - 20;
                   g = imageData.data[index + 1] - 20;
                   b = imageData.data[index + 2] - 20;
                  imageData.data[index + 0] = r;
                  imageData.data[index + 1] = g;
                  imageData.data[index + 2] = b;
          }
  }
  ctx.putImageData(imageData, 0, 0);
}

function getFiltroSaturacion (){
  let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  let sv = 2; 
  
  let luR = 0.3086; 
  let luG = 0.6094;
  let luB = 0.0820;
  
  let az = (1 - sv)*luR + sv;
  let bz = (1 - sv)*luG;
  let cz = (1 - sv)*luB;
  let dz = (1 - sv)*luR;
  let ez = (1 - sv)*luG + sv;
  let fz = (1 - sv)*luB;
  let gz = (1 - sv)*luR;
  let hz = (1 - sv)*luG;
  let iz = (1 - sv)*luB + sv;
  
  let red ;
  let green ;
  let blue ;
  for(var i = 0; i < imageData.data.length; i += 4) {
  red =  imageData.data[i + 0];
  green = imageData.data[i + 1];
  blue = imageData.data[i + 2];
  imageData.data[i + 0] = (az*red + bz*green + cz*blue);
  imageData.data[i + 1]= (dz*red + ez*green + fz*blue);
  imageData.data[i + 2] = (gz*red + hz*green + iz*blue);
  }
  
  ctx.putImageData(imageData, 0, 0);
  }

   function getFiltroBinario() {
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let resul=255/2;
    for (var i=0; i<imageData.data.length; i+=4) {
      let r = imageData.data[i];
      let g = imageData.data[i+1];
      let b = imageData.data[i+2];
      let v = (0.2126*r + 0.7152*g + 0.0722*b >= resul) ? 255 : 0;
      imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = v
    }
    ctx.putImageData(imageData, 0, 0);
  };
  function getFiltroBlur() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var radio = 1;
  
    let matriz = [];
    let dimension = radio*2 + 1;
    let vol = dimension*dimension;
  
    for (var i = 0; i < dimension; i++) {
      matriz[i] = [];
      for (var j = 0; j < dimension; j++) {
        matriz[i][j] = 1/vol;
      }
    }
  
    let imgData = convolucion(imageData, matriz);
    ctx.putImageData(imgData, 0, 0);
}
function convolucion(imagen, matriz) {
  let width = imagen.width;
  let height = imagen.height;
  let imgRetorno = ctx.createImageData(width, height);

  for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
          setRGB(imagen, width, height, matriz, imgRetorno, x, y)
      }
  }
  return imgRetorno;
};

function setRGB(imagen, width, height, matriz, imgRetorno, x, y) {
  let r = 0, g = 0, b = 0;
  let dimension = matriz.length;
  let radio = Math.floor(dimension/2);
  for (var matrizY = 0; matrizY < dimension; matrizY++) {
      for (var matrizX = 0; matrizX < dimension; matrizX++) {
          var variables = getRGB(y, matrizY, x, matrizX, radio, imagen, width, height, matriz);
          r += variables.r;
          g += variables.g;
          b += variables.b;
      }
  }
  setPixel(imgRetorno, x, y, r, g, b, 255, width);
}

function getRGB(y, matrizY, x, matrizX, radio, imagen, width, height, matriz) {
  let imageData = imagen.data;
  let difY = y + matrizY - radio;
  let difX = x + matrizX - radio;
  let variables = {'r' : 0, 'g' : 0, 'b' : 0}
  if (difY >= 0 && difY < height && difX >= 0 && difX < width) {
      let index = (difY * width + difX)*4;
      let valor = matriz[matrizY][matrizX];
      variables.r = imageData[index] * valor;
      variables.g = imageData[index+1] * valor;
      variables.b = imageData[index+2] * valor;
  }
  return variables;
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
  document.querySelector('#descargar').addEventListener('click', function(e){
    descargarImagen(nombreImagen);
  });  
  document.querySelector("#goma").addEventListener('click',BorrarConGoma);
  document.querySelector("#buttonGreyScale").addEventListener("click", getGreyScale);
  document.querySelector("#buttonSepia").addEventListener("click", getSepia);
  document.querySelector("#buttonNegative").addEventListener("click", getNegativo);
  document.querySelector("#buttonSaturacion").addEventListener("click", getFiltroSaturacion);
  document.querySelector("#buttonBinario").addEventListener("click", getFiltroBinario); 
  document.querySelector("#buttonBlur").addEventListener("click", getFiltroBlur); 
  document.querySelector("#filtroBrillo").addEventListener("click", getFiltroBrillo);
  document.querySelector("#filtroDark").addEventListener("click", getFiltroOscurecer);
  document.querySelector('#cargar').addEventListener('change', function(e){
    
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
                //let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
                //ultimoestado.push(imageData);
            }
            img.src = event.target.result;
           
        }
        reader.readAsDataURL(e.target.files[0]);
     
  });