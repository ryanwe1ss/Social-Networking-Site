export function ShowBoxDialog(message, timeout = 5) {
  const popup = document.querySelector('.popup-box');

  if (popup.timeoutId) {
    clearTimeout(popup.timeoutId);
  }

  popup.style.animation = 'none';
  void popup.offsetWidth;

  popup.style.animation = `fadeOut ${timeout}s ease-in-out`;
  popup.style.display = 'block';
  popup.innerHTML = message;

  popup.timeoutId = setTimeout(() => {
    popup.style.display = 'none';
  }, timeout * 1000);
}