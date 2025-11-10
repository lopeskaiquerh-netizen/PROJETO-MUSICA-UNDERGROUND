// Basic interactivity: hamburger, modals, toasts, form validation
document.addEventListener('DOMContentLoaded', ()=> {
  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle){
    navToggle.addEventListener('click', ()=> {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(navMenu.style.display === 'block') navMenu.style.display = '';
      else navMenu.style.display = 'block';
    });
  }

  // Submenu accessibility - allow keyboard open
  document.querySelectorAll('.has-sub > a').forEach(a=>{
    a.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); a.parentElement.classList.toggle('open'); }
    });
  });

  // Modal open/close
  document.querySelectorAll('[data-open-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const id = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(id);
      if(modal){ modal.setAttribute('aria-hidden','false'); }
    });
  });
  document.querySelectorAll('.modal [data-close], .modal-close').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      btn.closest('.modal').setAttribute('aria-hidden','true');
    });
  });
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', (e)=> {
      if(e.target === m) m.setAttribute('aria-hidden','true');
    });
  });

  // Toast helper
  window.showToast = function(message, timeout=3000){
    const container = document.getElementById('toasts');
    const t = document.createElement('div'); t.className='toast'; t.textContent=message;
    container.appendChild(t);
    setTimeout(()=> t.remove(), timeout);
  };

  // Form validation (visual)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input=>{
        const errEl = input.parentElement.querySelector('.form-error');
        if(!input.value || (input.minLength && input.value.length < input.minLength) ){
          valid = false;
          errEl.textContent = input.getAttribute('data-err') || 'Campo inválido';
          input.classList.add('invalid');
        } else {
          errEl.textContent = '';
          input.classList.remove('invalid');
        }
      });
      if(valid){
        showToast('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        showToast('Corrija os campos destacados', 4000);
      }
    });
  }

});
