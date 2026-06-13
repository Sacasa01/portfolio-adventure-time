import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initFireflies } from './fireflies';
import { initConstellation } from './constellation';

gsap.registerPlugin(ScrollTrigger);

type Dict = Record<string, unknown>;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const lookup = (dict: Dict, path: string): unknown =>
  path.split('.').reduce<unknown>((o, k) => (o as Dict | undefined)?.[k], dict);

function getDicts(): Record<'en' | 'es', Dict> {
  return JSON.parse(document.getElementById('i18n-data')!.textContent!);
}

/* ---------- Theme ---------- */
function initTheme(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    btn.classList.remove('spinning');
    void (btn as HTMLElement).offsetWidth; // restart animation
    btn.classList.add('spinning');
  });
}

/* ---------- Language ---------- */
let lang: 'en' | 'es' = (localStorage.getItem('lang') as 'en' | 'es') || 'en';

function applyLang(): void {
  const dict = getDicts()[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const v = lookup(dict, el.dataset.i18n!);
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll<HTMLElement>('#lang-toggle .lang-label').forEach((el) => {
    el.textContent = lang === 'en' ? 'ES' : 'EN';
  });
}

function initLang(): void {
  if (lang !== 'en') applyLang();
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    document.body.classList.add('lang-fading');
    setTimeout(() => {
      lang = lang === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', lang);
      applyLang();
      document.body.classList.remove('lang-fading');
    }, 200);
  });
}

/* ---------- Navbar ---------- */
function initNav(): void {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let lastY = scrollY;
  addEventListener(
    'scroll',
    () => {
      const y = scrollY;
      nav.classList.toggle('nav-hidden', y > lastY && y > 80);
      lastY = y;
    },
    { passive: true },
  );

  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"]')];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((l) => {
          const active = l.getAttribute('href') === `#${e.target.id}`;
          l.classList.toggle('active', active);
          if (active) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

  const burger = document.getElementById('hamburger')!;
  const menu = document.getElementById('mobile-menu')!;
  const toggleMenu = (open: boolean): void => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
}

/* ---------- Entrance + scroll animations ---------- */
function initAnimations(): void {
  if (reduced) return;
  gsap
    .timeline()
    .from('#navbar', { y: -80, opacity: 0, duration: 0.6, ease: 'power3.out' })
    .from('#hero [data-stagger]', { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, '-=0.2')
    .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2');

  gsap.to('#hero-img', {
    yPercent: 16,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el, i) => {
    gsap.from(el, {
      x: i % 2 ? 60 : -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const proxy = { v: 0 };
    gsap.to(proxy, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => {
        el.textContent = Math.round(proxy.v) + suffix;
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('.skill-bar > span').forEach((bar) => {
    gsap.to(bar, {
      width: `${bar.dataset.level}%`,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: bar, start: 'top 92%' },
    });
  });
}

/* ---------- Typewriter ---------- */
function initTyping(): void {
  const el = document.getElementById('typed-role');
  if (!el) return;
  if (reduced) {
    el.textContent = 'Full-Stack Developer \u00b7 AI Engineer \u00b7 Cloud Architect';
    return;
  }
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const tick = (): void => {
    const roles = lookup(getDicts()[lang], 'hero.roles') as string[];
    const word = roles[roleIdx % roles.length];
    charIdx += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIdx);
    let delay = deleting ? 35 : 70;
    if (!deleting && charIdx === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx++;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  tick();
}

/* ---------- Project tilt + modal ---------- */
function initProjects(): void {
  if (matchMedia('(hover: hover)').matches && !reduced) {
    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  const modal = document.getElementById('project-modal') as HTMLDialogElement | null;
  if (!modal) return;
  document.querySelectorAll<HTMLElement>('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.openProject!;
      const card = document.getElementById(`project-${id}`)!;
      modal.querySelector('#modal-title')!.textContent = card.dataset.title!;
      const details = modal.querySelector<HTMLElement>('#modal-details')!;
      details.dataset.i18n = `projects.${id}.details`;
      details.textContent = String(lookup(getDicts()[lang], `projects.${id}.details`));
      modal.querySelector('#modal-tech')!.innerHTML = (JSON.parse(card.dataset.tech!) as string[])
        .map((t) => `<span class="badge">${t}</span>`)
        .join('');
      modal.querySelector('#modal-links')!.innerHTML = (
        JSON.parse(card.dataset.links!) as { label: string; href: string }[]
      )
        .map(
          (l) =>
            `<a class="btn btn-ghost" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`,
        )
        .join('');
      modal.showModal();
    });
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
  modal.querySelector('#modal-close')?.addEventListener('click', () => modal.close());
}

/* ---------- Contact ---------- */
function confetti(): void {
  const colors = ['#F59E0B', '#5FAD56', '#F1F5F9', '#D97706'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = `${30 + Math.random() * 40}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--tx', `${(Math.random() * 2 - 1) * 240}px`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

function initContact(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;
  const status = document.getElementById('form-status')!;
  const setError = (name: string, key: string | null): void => {
    const field = form.querySelector(`[name="${name}"]`)!.closest('.field')!;
    const msg = field.querySelector('.field-error')!;
    field.classList.toggle('invalid', key !== null);
    msg.textContent = key ? String(lookup(getDicts()[lang], key)) : '';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    let valid = true;
    if (!name) valid = false;
    setError('name', name ? null : 'contact.errName');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) valid = false;
    setError('email', emailOk ? null : 'contact.errEmail');
    if (message.length < 10) valid = false;
    setError('message', message.length >= 10 ? null : 'contact.errMessage');
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]')!;
    btn.textContent = String(lookup(getDicts()[lang], 'contact.sending'));
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('submit failed');
      status.textContent = String(lookup(getDicts()[lang], 'contact.success'));
      status.className = 'mt-4 text-accent font-semibold';
      form.reset();
      if (!reduced) confetti();
    } catch {
      status.textContent = String(lookup(getDicts()[lang], 'contact.fail'));
      status.className = 'mt-4 text-red-500 font-semibold';
    } finally {
      btn.textContent = String(lookup(getDicts()[lang], 'contact.send'));
    }
  });
}

/* ---------- Footer ---------- */
function initFooter(): void {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  document.getElementById('back-to-top')?.addEventListener('click', () =>
    scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }),
  );
}

/* ---------- Boot ---------- */
function init(): void {
  initTheme();
  initLang();
  initNav();
  initAnimations();
  initTyping();
  initProjects();
  initContact();
  initFooter();
  initFireflies(document.getElementById('fireflies') as HTMLCanvasElement | null);
  const graphEl = document.getElementById('constellation-data');
  if (graphEl) {
    initConstellation(
      document.getElementById('constellation') as HTMLCanvasElement | null,
      JSON.parse(graphEl.textContent!),
    );
  }
}

document.addEventListener('astro:page-load', init);
