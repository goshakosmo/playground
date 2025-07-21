const giftcodeCard = document.getElementById('giftcode-certificate');
const giftcodeLogo = document.getElementById('giftcode-partner-logo');
const giftcodeCode = document.getElementById('giftcode-code');
const giftcodeCopyMessage = document.getElementById('giftcode-copy-message');
let giftcodeRafId;
let giftcodeCurrentRotateX = 0;
let giftcodeCurrentRotateZ = 0;
let giftcodeRect = giftcodeCard.getBoundingClientRect();

const giftcodeDefaultData = {
  logoUrl: 'logo.png',
  title: 'Сертифікат на фотосесію у Львові',
  validUntil: '04.05.2026',
  code: 'PZ-LVIV-FOTO-2025',
  message: '🎁 Цей сертифікат — твій квиток на магію кадру 📸<br>Звернись до партнера й назви цей код, щоб активувати послугу.'
};

async function giftcodeLoadCertificateData() {
  try {
    const response = await fetch('./config.json');
    if (!response.ok) throw new Error('Failed to fetch JSON');
    const data = await response.json();

    document.querySelector('[data-giftcode-dynamic="logo"]').src = data.logoUrl || giftcodeDefaultData.logoUrl;
    document.querySelector('[data-giftcode-dynamic="title"]').textContent = data.title || giftcodeDefaultData.title;
    document.querySelector('[data-giftcode-dynamic="validUntil"]').textContent = `Дійсний до: ${data.validUntil || giftcodeDefaultData.validUntil}`;
    document.querySelector('[data-giftcode-dynamic="code"]').firstChild.textContent = data.code || giftcodeDefaultData.code;
    document.querySelector('[data-giftcode-dynamic="message"]').innerHTML = data.message || giftcodeDefaultData.message;
  } catch (error) {
    console.error('Error loading certificate data:', error);
    document.querySelector('[data-giftcode-dynamic="logo"]').src = giftcodeDefaultData.logoUrl;
    document.querySelector('[data-giftcode-dynamic="title"]').textContent = giftcodeDefaultData.title;
    document.querySelector('[data-giftcode-dynamic="validUntil"]').textContent = `Дійсний до: ${giftcodeDefaultData.validUntil}`;
    document.querySelector('[data-giftcode-dynamic="code"]').firstChild.textContent = data.code || giftcodeDefaultData.code;
    document.querySelector('[data-giftcode-dynamic="message"]').innerHTML = giftcodeDefaultData.message;
  }
}

giftcodeLoadCertificateData();

window.addEventListener('resize', () => {
  giftcodeCard.dispatchEvent(new Event('updateRect'));
});

giftcodeLogo.addEventListener('load', () => {
  giftcodeCard.dispatchEvent(new Event('updateRect'));
});

giftcodeCard.addEventListener('updateRect', () => {
  giftcodeRect = giftcodeCard.getBoundingClientRect();
});

giftcodeCard.addEventListener('animationend', () => {
  giftcodeCard.style.animation = 'none';
  giftcodeCard.style.transform = 'translateY(0) rotateY(0deg)';
});

function giftcodeHandleMove(e) {
  if (e.type === 'touchmove') {
    const touch = e.touches[0];
    if (
      touch.clientX >= giftcodeRect.left &&
      touch.clientX <= giftcodeRect.right &&
      touch.clientY >= giftcodeRect.top &&
      touch.clientY <= giftcodeRect.bottom
    ) {
      e.preventDefault();
    }
  }

  const x = e.type === 'touchmove' ? e.touches[0].clientX - giftcodeRect.left : e.clientX - giftcodeRect.left;
  const y = e.type === 'touchmove' ? e.touches[0].clientY - giftcodeRect.top : e.clientY - giftcodeRect.top;
  const centerX = giftcodeRect.width / 2;
  const centerY = giftcodeRect.height / 2;
  const deltaX = (x - centerX) / centerX;
  const deltaY = (y - centerY) / centerY;

  const targetRotateX = -deltaY * (window.innerWidth <= 480 ? 2 : 4);
  const targetRotateZ = deltaX * (window.innerWidth <= 480 ? 2 : 4);

  giftcodeCurrentRotateX += (targetRotateX - giftcodeCurrentRotateX) * 0.1;
  giftcodeCurrentRotateZ += (targetRotateZ - giftcodeCurrentRotateZ) * 0.1;

  const rotateX = Math.max(-4, Math.min(4, giftcodeCurrentRotateX));
  const rotateZ = Math.max(-4, Math.min(4, giftcodeCurrentRotateZ));
  const shadowX = -deltaX * 8;
  const shadowY = -deltaY * 8;

  cancelAnimationFrame(giftcodeRafId);
  giftcodeRafId = requestAnimationFrame(() => {
    giftcodeCard.style.transition = 'none';
    giftcodeCard.style.transform = `translateY(0) rotateY(0deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
    giftcodeCard.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.4)`;
  });
}

function giftcodeHandleEnd() {
  cancelAnimationFrame(giftcodeRafId);
  giftcodeCard.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
  giftcodeCard.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg) rotateZ(0deg)';
  giftcodeCard.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
  giftcodeCurrentRotateX = 0;
  giftcodeCurrentRotateZ = 0;
  giftcodeCard.addEventListener('transitionend', () => {
    giftcodeCard.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
  }, { once: true });
}

function giftcodeShowCopyMessage() {
  giftcodeCopyMessage.classList.add('visible');
  setTimeout(() => {
    giftcodeCopyMessage.classList.remove('visible');
  }, 2000);
}

function giftcodeCopyCode(e) {
  e.preventDefault();
  const codeText = giftcodeCode.textContent.trim();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codeText).then(() => {
      giftcodeShowCopyMessage();
    }).catch(() => {
      alert('Не вдалося скопіювати код.');
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = codeText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      giftcodeShowCopyMessage();
    } catch {
      alert('Не вдалося скопіювати код.');
    }
    document.body.removeChild(textarea);
  }
}

function giftcodeDownloadPDF() {
  alert('Завантаження PDF... (реалізується пізніше)');
}

function giftcodeSendEmail() {
  alert('Відправлення на e-mail... (реалізується пізніше)');
}

function giftcodeSaveGift() {
  alert('Збереження на Prezenta... (реалізується пізніше)');
}

giftcodeCard.addEventListener('mousemove', giftcodeHandleMove);
giftcodeCard.addEventListener('touchmove', giftcodeHandleMove, { passive: false });
giftcodeCard.addEventListener('mouseleave', giftcodeHandleEnd);
giftcodeCard.addEventListener('touchend', giftcodeHandleEnd);
giftcodeCode.addEventListener('click', giftcodeCopyCode);
giftcodeCode.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    giftcodeCopyCode(e);
  }
});