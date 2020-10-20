let links = document.getElementsByClassName('menu')[0].getElementsByTagName('a');
for(link of links){
  link.addEventListener('click',()=>{
    cerrar()
  })
}

function cerrar(){
  document.getElementsByClassName('menu-icon')[0].click()
}

