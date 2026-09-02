document.addEventListener('DOMContentLoaded',()=>{
  const cursors=document.querySelectorAll('.cursor');
  setInterval(()=>cursors.forEach(el=>el.style.opacity=el.style.opacity==='0'?'1':'0'),550);

  const canvas=document.getElementById('matrix-bg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const chars='アァカサタナハマヤャラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let columns=0;
  let drops=[];
  const fontSize=15;

  const resize=()=>{
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=window.innerWidth*dpr;
    canvas.height=window.innerHeight*dpr;
    canvas.style.width='100%';
    canvas.style.height='100%';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    columns=Math.ceil(window.innerWidth/fontSize);
    drops=Array.from({length:columns},()=>Math.random()*window.innerHeight/fontSize-window.innerHeight/fontSize);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  };

  const draw=()=>{
    ctx.fillStyle='rgba(5,7,6,0.045)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.font=`${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline='top';

    for(let i=0;i<columns;i++){
      const x=i*fontSize;
      const y=drops[i]*fontSize;
      const head=chars[Math.floor(Math.random()*chars.length)];

      ctx.fillStyle='rgba(130,255,150,0.95)';
      ctx.fillText(head,x,y);

      for(let trail=1;trail<=7;trail++){
        const trailY=y-trail*fontSize;
        if(trailY<0)continue;
        const trailChar=chars[Math.floor(Math.random()*chars.length)];
        const alpha=Math.max(0.08,0.55-trail*0.065);
        ctx.fillStyle=`rgba(101,255,138,${alpha})`;
        ctx.fillText(trailChar,x,trailY);
      }

      if(y>window.innerHeight+fontSize*8){
        drops[i]=Math.random()*-20;
      }else{
        drops[i]+=0.9;
      }
    }

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize',resize);
  draw();
});
