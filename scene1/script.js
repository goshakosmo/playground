document.addEventListener('DOMContentLoaded', () => {
  console.log('Сцена 1: DOM завантажено'); // Лог для діагностики

  const bow = document.getElementById("bow");
  const horizontalSVG = document.querySelector(".ribbon-horizontal");
  const verticalSVG = document.querySelector(".ribbon-vertical");
  const ribbonH = document.getElementById("ribbonPathHorizontal");
  const ribbonV = document.getElementById("ribbonPathVertical");

  bow.setAttribute("tabindex", "-1");
  bow.setAttribute("draggable", "false");

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight / 2;

  bow.style.left = `${baseX}px`;
  bow.style.top = `${baseY}px`;

  bow.addEventListener("mousedown", (e) => {
    console.log('mousedown на банті');
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    console.log('mousemove:', e.clientX, e.clientY);
    offsetX = Math.max(-100, Math.min(100, e.clientX - startX));
    offsetY = Math.min(window.innerHeight, Math.max(-100, e.clientY - startY));

    const newX = baseX + offsetX;
    const newY = baseY + offsetY;

    bow.style.left = `${newX}px`;
    bow.style.top = `${newY}px`;

    const curveY = 151 + offsetY * 0.3;
    const curveX = 151 + offsetX * 0.3;

    ribbonH.setAttribute("d", `M-100,150 C200,${curveY} 900,${curveY} 1100,150`);
    ribbonV.setAttribute("d", `M150,-100 C${curveX},300 ${curveX},800 150,1100`);
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    console.log('mouseup, offsetY:', offsetY);
    isDragging = false;

    if (offsetY > 200) {
      console.log('Запуск анімації стрічок');
      horizontalSVG.style.transform = "translateY(-50%) translateX(-100vw)";
      verticalSVG.style.transform = "translateX(-50%) translateY(100vh)";

      bow.style.transition = "transform 1s ease-in-out, top 1s ease-in-out";
      bow.style.transform = "translate(-50%, 200%)";
      bow.style.pointerEvents = "none";

      setTimeout(() => {
        console.log('Анімація завершена, надсилаємо postMessage');
        bow.style.display = "none";
        try {
          window.parent.postMessage('nextScene', '*');
          console.log('Повідомлення nextScene надіслано');
        } catch (error) {
          console.error('Помилка при надсиланні postMessage:', error);
        }
      }, 1000);
    } else {
      bow.style.transition = "top 0.5s ease, left 0.5s ease";
      bow.style.left = `${baseX}px`;
      bow.style.top = `${baseY}px`;
      bow.style.transform = "translate(-50%, -50%)";

      ribbonH.setAttribute("d", "M-100,150 C200,151 900,151 1100,150");
      ribbonV.setAttribute("d", "M150,-100 C151,300 151,800 150,1100");

      setTimeout(() => (bow.style.transition = ""), 500);
    }
  });

  // === Touch support ===
  bow.addEventListener("touchstart", (e) => {
    console.log('touchstart на банті');
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Блокуємо прокручування
    const touch = e.touches[0];

    console.log('touchmove:', touch.clientX, touch.clientY);
    offsetX = Math.max(-100, Math.min(100, touch.clientX - startX));
    offsetY = Math.min(window.innerHeight, Math.max(-100, touch.clientY - startY));

    const newX = baseX + offsetX;
    const newY = baseY + offsetY;

    bow.style.left = `${newX}px`;
    bow.style.top = `${newY}px`;

    const curveY = 151 + offsetY * 0.3;
    const curveX = 151 + offsetX * 0.3;

    ribbonH.setAttribute("d", `M-100,150 C200,${curveY} 900,${curveY} 1100,150`);
    ribbonV.setAttribute("d", `M150,-100 C${curveX},300 ${curveX},800 150,1100`);
  }, { passive: false });

  document.addEventListener("touchend", () => {
    if (!isDragging) return;
    console.log('touchend, offsetY:', offsetY);
    isDragging = false;

    if (offsetY > 200) {
      console.log('Запуск анімації стрічок');
      horizontalSVG.style.transform = "translateY(-50%) translateX(-100vw)";
      verticalSVG.style.transform = "translateX(-50%) translateY(100vh)";

      bow.style.transition = "transform 1s ease-in-out, top 1s ease-in-out";
      bow.style.transform = "translate(-50%, 200%)";
      bow.style.pointerEvents = "none";

      setTimeout(() => {
        console.log('Анімація завершена, надсилаємо postMessage');
        bow.style.display = "none";
        try {
          window.parent.postMessage('nextScene', '*');
          console.log('Повідомлення nextScene надіслано');
        } catch (error) {
          console.error('Помилка при надсиланні postMessage:', error);
        }
      }, 1000);
    } else {
      bow.style.transition = "top 0.5s ease, left 0.5s ease";
      bow.style.left = `${baseX}px`;
      bow.style.top = `${baseY}px`;
      bow.style.transform = "translate(-50%, -50%)";

      ribbonH.setAttribute("d", "M-100,150 C200,151 900,151 1100,150");
      ribbonV.setAttribute("d", "M150,-100 C151,300 151,800 150,1100");

      setTimeout(() => (bow.style.transition = ""), 500);
    }
  });

  document.addEventListener("touchcancel", () => {
    console.log('touchcancel');
    if (!isDragging) return;
    isDragging = false;

    bow.style.transition = "top 0.5s ease, left 0.5s ease";
    bow.style.left = `${baseX}px`;
    bow.style.top = `${baseY}px`;
    bow.style.transform = "translate(-50%, -50%)";

    ribbonH.setAttribute("d", "M-100,150 C200,151 900,151 1100,150");
    ribbonV.setAttribute("d", "M150,-100 C151,300 151,800 150,1100");

    setTimeout(() => (bow.style.transition = ""), 500);
  });
});