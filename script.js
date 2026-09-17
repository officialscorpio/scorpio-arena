(function(){
  var hdr=document.getElementById('hdr'),nav=document.getElementById('nav'),bg=document.getElementById('burger');
  function scrolled(){hdr.classList.toggle('on',window.scrollY>20)}
  scrolled();window.addEventListener('scroll',scrolled,{passive:true});
  bg.addEventListener('click',function(){
    var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o?'true':'false');
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');bg.setAttribute('aria-expanded','false')}});

  // scroll reveal
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      en.forEach(function(e,i){if(e.isIntersecting){e.target.style.transitionDelay=(Math.min(i,6)*55)+'ms';e.target.classList.add('in');io.unobserve(e.target)}})
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('in')})}

  // contact form -> mail client
  var f=document.getElementById('contactForm'),msg=document.getElementById('formMsg');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var E=f.elements,n=E['name'].value.trim(),em=E['email'].value.trim(),s=E['subject'].value.trim(),m=E['message'].value.trim();
    if(!n||!em||!s||!m){msg.textContent='Fill in every field before sending.';return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){msg.textContent='Enter a valid email address.';return}
    var body='Name: '+n+'\nEmail: '+em+'\n\n'+m;
    window.location.href='mailto:Official.scorpioarena@gmail.com?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(body);
    msg.textContent='Opening your email app with this message ready to send.';
  });

  // hero particles
  var c=document.getElementById('dust');
  if(c&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var x=c.getContext('2d'),P=[],w,h,dpr=Math.min(devicePixelRatio||1,2);
    function size(){var r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0)}
    function make(){P=[];var n=Math.round(Math.min(70,w/16));
      for(var i=0;i<n;i++)P.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.4,
        vy:-(Math.random()*.25+.07),vx:(Math.random()-.5)*.14,a:Math.random()*.5+.15,red:Math.random()<.4})}
    size();make();
    var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){size();make()},180)});
    (function loop(){
      x.clearRect(0,0,w,h);
      for(var i=0;i<P.length;i++){var p=P[i];p.y+=p.vy;p.x+=p.vx;
        if(p.y<-6){p.y=h+6;p.x=Math.random()*w}
        x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);
        x.fillStyle=p.red?'rgba(255,60,68,'+p.a+')':'rgba(206,212,222,'+(p.a*.65)+')';x.fill()}
      requestAnimationFrame(loop)})();
  }
})();
