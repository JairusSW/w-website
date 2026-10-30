const code = document.getElementById('retro-code');
const rawCode = code.textContent;
const escapeHTML = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
code.innerHTML = escapeHTML(rawCode).replace(/\b(pub|fn|mut|while|rt)\b|\b(i32)\b|\b(\d+)\b/g, (match,keyword,type) => '<span class="'+(keyword?'kw':type?'type':'num')+'">'+match+'</span>');
const copyButton = document.getElementById('copy-code');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(rawCode);
    copyButton.textContent = 'Copied';
    copyButton.setAttribute('aria-label', 'Copied');
    copyStatus.textContent = '';
  } catch {
    copyButton.textContent = 'Copy code ⧉';
    copyButton.setAttribute('aria-label', 'Copy example code');
    copyStatus.textContent = 'Select the code and copy it with your keyboard.';
  }
});
