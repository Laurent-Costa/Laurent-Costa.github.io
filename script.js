const qrDialog = document.getElementById('qrDialog');
const openQr = document.getElementById('openQr');
const shareButton = document.getElementById('shareButton');
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.qr-view');

openQr?.addEventListener('click', () => {
  if (typeof qrDialog.showModal === 'function') qrDialog.showModal();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    views.forEach(v => v.classList.toggle('active', v.id === target));
  });
});

shareButton?.addEventListener('click', async () => {
  const title = 'Carte de visite — Laurent Costa';
  const text = 'Laurent Costa — Développement commercial & solutions pour buralistes';
  const url = window.location.href;

  if (navigator.share && !url.startsWith('file:')) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (error) {}
  }

  const message = `${title}\n${text}\nTéléphone : 06 31 03 55 74\nE-mail : lc13@free.fr\nLinkedIn : https://www.linkedin.com/in/laurent-costa-b1b971406/\nApplications : https://drive.google.com/drive/folders/1kGOX2A1lS9dal_LtMFKa498MFvhypLqH`;

  try {
    await navigator.clipboard.writeText(message);
    shareButton.textContent = 'Coordonnées copiées';
    setTimeout(() => { shareButton.textContent = 'Partager ma carte'; }, 2000);
  } catch (error) {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
  }
});
