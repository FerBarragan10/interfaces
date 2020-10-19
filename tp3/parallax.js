let layer1=document.querySelector("#layer1");
let layer2=document.querySelector("#layer2");
let layerNube=document.querySelector("#layer2-2");
let layer3=document.querySelector("#layer3");
let text=document.querySelector("#text")
let layer5=document.querySelector("#layer5");
let layer6=document.querySelector("#layer6");

window.addEventListener("scroll",function(e){
    let value=window.scrollY;
    layer1.style.top= value * 0.5 + 'px';
    layer2.style.left= - value * 0.5 + 'px';
    layerNube.style.left= value *0.3 +'px';
    layer3.style.top= - value * 0.15 + 'px';
    text.style.top= value *0.5 + 'px';
    layer5.style.left=  value * 0.5 + 'px';
    layer6.style.left= value *0.2 +'px';
}
);