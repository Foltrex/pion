// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Кнопки A+ / A-
const articleBody = document.getElementById('articleBody');
let currentSize = 16;

document.querySelectorAll('.font-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.size;
    if (mode === 'large') {
      currentSize = Math.min(currentSize + 2, 22);
    } else {
      currentSize = Math.max(currentSize - 2, 12);
    }
    articleBody.style.fontSize = currentSize + 'px';
  });
});

// Кнопка «Поделиться»
const shareBtn = document.querySelector('.action-btn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: '10 женщин, которых признали самыми красивыми в мире',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Ссылка скопирована в буфер обмена');
      }
    } catch (err) {
      console.warn('Ошибка при попытке поделиться:', err);
    }
  });
}

// Плавное появление секций
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.person').forEach((section) => {
  section.classList.add('fade-in');
  observer.observe(section);
});