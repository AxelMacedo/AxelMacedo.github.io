document.addEventListener('DOMContentLoaded',()=>{
  const cursors=document.querySelectorAll('.cursor');
  setInterval(()=>cursors.forEach(el=>el.style.opacity=el.style.opacity==='0'?'1':'0'),550);

  const canvas=document.getElementById('matrix-bg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize=18;
  const speed=0.22;
  let columns=0;
  let drops=[];

  const resize=()=>{
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=window.innerWidth*dpr;
    canvas.height=window.innerHeight*dpr;
    canvas.style.width='100%';
    canvas.style.height='100%';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    columns=Math.ceil(window.innerWidth/fontSize);
    drops=Array.from({length:columns},()=>Math.random()*window.innerHeight/fontSize);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  };

  const draw=()=>{
    ctx.fillStyle='rgba(5,7,6,0.06)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.font=`bold ${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline='top';

    for(let i=0;i<columns;i++){
      const x=i*fontSize;
      const y=drops[i]*fontSize;

      ctx.shadowBlur=10;
      ctx.shadowColor='#65ff8a';
      ctx.fillStyle='rgba(150,255,170,0.98)';
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],x,y);

      for(let trail=1;trail<=8;trail++){
        const trailY=y-trail*fontSize;
        if(trailY<0)continue;
        ctx.shadowBlur=4;
        ctx.fillStyle=`rgba(101,255,138,${Math.max(0.12,0.75-trail*0.07)})`;
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)],x,trailY);
      }

      ctx.shadowBlur=0;
      drops[i]+=speed;
      if(y>window.innerHeight+fontSize*8){
        drops[i]=Math.random()*-10;
      }
    }

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize',resize);
  draw();
});
