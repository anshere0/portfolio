/*
  Tech stack: JavaScript
  Purpose: Loader, scroll progress, mobile menu, reveal animation, resume download, and contact form validation.
*/

window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('ldr').classList.add('gone'),1500)});

window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('prog').style.width=(s/h*100)+'%';
  document.getElementById('bt').classList.toggle('vis',s>400);
});

document.getElementById('ham').addEventListener('click',()=>document.getElementById('mob').classList.toggle('open'));
function closeMob(){document.getElementById('mob').classList.remove('open')}

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.1});
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>obs.observe(el));

document.getElementById('dlResume').addEventListener('click',()=>{
  const a=document.createElement('a');
  a.href='Ansh_Arora_Resume.pdf';
  a.download='Ansh_Arora_Resume.pdf';
  a.click();
});

function submitForm(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('fe2').value.trim();
  const s=document.getElementById('fs').value.trim();
  const m=document.getElementById('fm').value.trim();
  const show=(id,v)=>document.getElementById(id).classList.toggle('show',v);
  show('fn-e',!n);show('fe2-e',!e||!/\S+@\S+\.\S+/.test(e));show('fs-e',!s);show('fm-e',!m);
  if(n&&e&&/\S+@\S+\.\S+/.test(e)&&s&&m){
    document.getElementById('fsuc').classList.add('show');
    ['fn','fe2','fs','fm'].forEach(id=>document.getElementById(id).value='');
    setTimeout(()=>document.getElementById('fsuc').classList.remove('show'),5000);
  }
}

// Typing animation for hero code
const lines=['nutrisnap.py','analysis.py','tic_tac_toe.py','ml_model.py'];
let li=0;
const el=document.querySelector('.hc-file');
setInterval(()=>{li=(li+1)%lines.length;el.style.opacity='0';setTimeout(()=>{el.textContent=lines[li];el.style.opacity='1';},300)},3000);
el.style.transition='opacity 0.3s';

