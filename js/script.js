document.addEventListener('DOMContentLoaded',()=>{const cursors=document.querySelectorAll('.cursor');setInterval(()=>cursors.forEach(el=>el.style.opacity=el.style.opacity==='0'?'1':'0'),550);});
