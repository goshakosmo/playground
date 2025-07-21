function positionBalloons() {
    const card = document.querySelector('.card');
    const balloon1 = document.querySelector('.balloon1');
    const balloon2 = document.querySelector('.balloon2');
    const cardRect = card.getBoundingClientRect();
  
    balloon1.style.left = `${cardRect.right + window.scrollX - 20}px`;
    balloon1.style.top = `${cardRect.top + window.scrollY - 20}px`;
    balloon1.style.right = 'auto';
  
    balloon2.style.left = `${cardRect.left + window.scrollX - 110}px`;
    balloon2.style.top = `${cardRect.bottom + window.scrollY - 110}px`;
    balloon2.style.bottom = 'auto';
  }
  
  function launchConfetti() {
    const duration = 10 * 1000;
    const end = Date.now() + duration;
  
    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } });
  
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
  
  window.onload = () => {
    launchConfetti();
    positionBalloons();
  };
  
  document.getElementById("giftBtn").addEventListener("click", () => {
    document.querySelector(".card").classList.add("exit-up");
    document.querySelector(".balloon1").classList.add("exit-up");
    document.querySelector(".balloon2").classList.add("exit-up");
    document.querySelectorAll(".sparkle").forEach(el => el.classList.add("exit-up"));
  
    setTimeout(() => {
      alert("🎁 Тут відкриється подарунок або нова сцена!");
    }, 1500);
  });
  
  const resizeObserver = new ResizeObserver(() => {
    positionBalloons();
  });
  resizeObserver.observe(document.querySelector('.card'));
  
  window.addEventListener('resize', positionBalloons);