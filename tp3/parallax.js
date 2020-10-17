let layer1=document.querySelector("#layer1");
let layer2=document.querySelector("#layer2");
let layerNube=document.querySelector("#layer2-2");
let layer3=document.querySelector("#layer3");
let text=document.querySelector("#text")

window.addEventListener("scroll",function(e){
    let value=window.scrollY;
    layer1.style.top= value * 0.5 + 'px';
    layer2.style.left= - value * 0.5 + 'px';
    layerNube.style.left= value *0.3 +'px';
    layer3.style.top= - value * 0.15 + 'px';
    text.style.top=value *0.5 + 'px';

}
);