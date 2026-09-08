const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // ---------- mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close the menu after tapping a link (nice on mobile)
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    // close the menu if resized back to desktop width
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 840){
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- projects filter bar ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards = document.querySelectorAll('.proj-card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projCards.forEach(card=>{
        const cats = (card.dataset.cats || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });