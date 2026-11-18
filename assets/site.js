(function(){
  const root=document.documentElement;
  const btn=document.querySelector('.theme-toggle');
  function sync(){
    const dark=root.dataset.theme==='dark';
    btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    btn.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
    btn.setAttribute('aria-pressed',String(dark));
    if(location.protocol==='file:'){
      const prefix=document.body.dataset.page==='home'?'./':'../';
      document.querySelectorAll('[data-site-path]').forEach(a=>{
        const p=a.dataset.sitePath;
        a.href=prefix+(p==='/'?'index.html':p.replace(/^\//,'')+'index.html')+'?theme='+(dark?'dark':'light');
      });
    }
  }
  btn.addEventListener('click',function(){
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem('elena-theme',root.dataset.theme)}catch(e){}
    sync();
  });
  sync();
  const paperButtons=document.querySelectorAll('.paper-toggle');
  function closePaperSummaries(){
    paperButtons.forEach(function(button){
      const panel=document.getElementById(button.getAttribute('aria-controls'));
      if(!panel)return;
      button.setAttribute('aria-expanded','false');
      panel.hidden=true;
    });
  }
  closePaperSummaries();
  // Reset restored pages too, so returning with Back/Forward starts closed.
  window.addEventListener('pageshow',function(event){
    if(event.persisted)closePaperSummaries();
  });
  paperButtons.forEach(function(button){
    const panel=document.getElementById(button.getAttribute('aria-controls'));
    if(!panel)return;
    button.addEventListener('click',function(){
      const expanded=button.getAttribute('aria-expanded')==='true';
      button.setAttribute('aria-expanded',String(!expanded));
      panel.hidden=expanded;
    });
  });
})();

