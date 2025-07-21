const scenes = ['scene1', 'scene2', 'scene3'];
let currentSceneIndex = 0;

function showScene(index) {
  console.log('Перехід до сцени:', scenes[index]); // Лог для діагностики
  const currentContainer = document.getElementById(`${scenes[currentSceneIndex]}-container`);
  const nextContainer = document.getElementById(`${scenes[index]}-container`);

  currentContainer.classList.add('hidden');
  setTimeout(() => {
    nextContainer.classList.remove('hidden');
    currentSceneIndex = index;
  }, 500); // Час синхронізації з transition
}

window.addEventListener('message', (event) => {
  console.log('Отримано повідомлення:', event.data, 'від:', event.origin); // Лог для діагностики
  if (event.data === 'nextScene') {
    const nextIndex = (currentSceneIndex + 1) % scenes.length;
    showScene(nextIndex);
  }
});

// Ініціалізація першої сцени
showScene(0);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker зареєстровано:', registration);
      })
      .catch(error => {
        console.error('Помилка реєстрації Service Worker:', error);
      });
  });
}