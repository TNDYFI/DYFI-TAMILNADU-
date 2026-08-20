const $=s=>document.querySelector(s);const sidebar=$('.sidebar'),overlay=$('.mobile-overlay');
function toggleMenu(){sidebar?.classList.toggle('open');overlay?.classList.toggle('show')}
$('#menuBtn')?.addEventListener('click',toggleMenu);overlay?.addEventListener('click',toggleMenu);
$('#themeBtn')?.addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('dyfi-theme',document.documentElement.classList.contains('dark')?'dark':'light');});
if(localStorage.getItem('dyfi-theme')==='dark')document.documentElement.classList.add('dark');
const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(a=>{const href=a.getAttribute('href')||'';if((path==='index.html'&&href.startsWith('index.html#home'))||href===path)a.classList.add('active')});
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

// Close the mobile navigation after selecting a page/section.
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  if(window.matchMedia('(max-width:760px)').matches){sidebar?.classList.remove('open');overlay?.classList.remove('show')}
}));
window.addEventListener('resize',()=>{
  if(window.innerWidth>760){sidebar?.classList.remove('open');overlay?.classList.remove('show')}
});


// Final static-site viewport guard: prevents accidental horizontal page expansion.
(function(){
  const root=document.documentElement;
  function fit(){
    root.style.overflowX='hidden';
    document.body.style.overflowX='hidden';
    document.querySelectorAll('img,video,iframe,canvas').forEach(el=>{
      el.style.maxWidth='100%';
      if(el.tagName==='IFRAME') el.style.width='100%';
    });
  }
  fit();
  window.addEventListener('pageshow',fit,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(fit,80),{passive:true});
})();
