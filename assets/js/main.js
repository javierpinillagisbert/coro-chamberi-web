(() => {
  const body = document.body;
  const page = body.dataset.page;
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  document.querySelectorAll('.site-nav a').forEach(link => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  const toast = document.querySelector('.toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
  }

  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const message = form.dataset.success || 'Gracias. Hemos recibido tu solicitud.';
      form.reset();
      showToast(message);
    });
  });

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
      document.querySelectorAll('.event-card').forEach(card => {
        card.hidden = !(filter === 'all' || card.dataset.type === filter);
      });
    });
  });

  const yearButtons = document.querySelectorAll('[data-memory-tab]');
  yearButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.memoryTab;
      yearButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
      document.querySelectorAll('.memory-panel').forEach(panel => panel.classList.toggle('active', panel.id === target));
    });
  });

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const img = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    const close = lightbox.querySelector('.lightbox-close');
    let lastFocused;

    const closeLightbox = () => {
      lightbox.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      lastFocused?.focus();
    };

    document.querySelectorAll('.gallery-grid button').forEach(button => {
      button.addEventListener('click', () => {
        lastFocused = button;
        img.src = button.querySelector('img').src;
        img.alt = button.querySelector('img').alt;
        caption.textContent = button.dataset.caption || button.querySelector('img').alt;
        lightbox.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
        close.focus();
      });
    });
    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox(); });
  }

  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Correo copiado: ${email}`);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
})();

// Reproductor coral destacado: controlado por el usuario, sin autoplay.
(() => {
  const player = document.querySelector('[data-audio-player]');
  if (!player) return;

  const audio = player.querySelector('audio');
  const playButton = player.querySelector('.audio-play');
  const progress = player.querySelector('.audio-progress');
  const currentLabel = player.querySelector('[data-current-time]');
  const durationLabel = player.querySelector('[data-duration]');

  const formatTime = value => {
    if (!Number.isFinite(value)) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const setPlayingState = playing => {
    player.classList.toggle('is-playing', playing);
    playButton.setAttribute('aria-label', playing ? 'Pausar muestra sonora' : 'Reproducir muestra sonora');
  };

  audio.addEventListener('loadedmetadata', () => {
    durationLabel.textContent = formatTime(audio.duration);
  });

  playButton.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setPlayingState(true);
      } catch (error) {
        setPlayingState(false);
      }
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  audio.addEventListener('timeupdate', () => {
    currentLabel.textContent = formatTime(audio.currentTime);
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  });

  audio.addEventListener('ended', () => {
    setPlayingState(false);
    progress.value = 0;
    currentLabel.textContent = '0:00';
  });

  progress.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });
})();
