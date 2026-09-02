document.addEventListener('DOMContentLoaded',()=>{
  const cursors=document.querySelectorAll('.cursor');
  setInterval(()=>cursors.forEach(el=>el.style.opacity=el.style.opacity==='0'?'1':'0'),550);

  const canvas=document.getElementById('matrix-bg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const chars='アァカサタナハマヤャラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let columns=0;
  let drops=[];
  let fontSize=16;

  const resize=()=>{
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=window.innerWidth*dpr;
    canvas.height=window.innerHeight*dpr;
    canvas.style.width=window.innerWidth+'px';
    canvas.style.height=window.innerHeight+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    columns=Math.ceil(window.innerWidth/fontSize);
    drops=Array.from({length:columns},()=>Math.random()*window.innerHeight/fontSize);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  };

  const draw=()=>{
    ctx.fillStyle='rgba(5,7,6,0.08)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.font=`${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline='top';

    for(let i=0;i<columns;i++){
      const x=i*fontSize;
      const y=drops[i]*fontSize;
      const char=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillStyle='rgba(101,255,138,0.9)';
      ctx.fillText(char,x,y);

      if(y>window.innerHeight && Math.random()>0.985){
        drops[i]=Math.random()*-18;
      }
      drops[i]+=0.75;
    }

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize',resize);
  draw();
});
