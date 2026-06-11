const copyButton = document.querySelector("#copyPitch");
const pitchText = document.querySelector("#pitchText");

if (copyButton && pitchText) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pitchText.value.trim());
      copyButton.textContent = "コピーしました";
      setTimeout(() => {
        copyButton.textContent = "応募文をコピー";
      }, 1800);
    } catch {
      pitchText.focus();
      pitchText.select();
    }
  });
}
