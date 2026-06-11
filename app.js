const copyButton = document.querySelector("#copyPitch");
const pitchText = document.querySelector("#pitchText");
const estimateForm = document.querySelector("#estimateForm");
const copyEstimate = document.querySelector("#copyEstimate");
const openEstimateIssue = document.querySelector("#openEstimateIssue");

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

function buildEstimateText() {
  if (!estimateForm) return "";
  const data = new FormData(estimateForm);
  const rows = [
    ["お名前または表示名", data.get("name")],
    ["連絡先", data.get("contact")],
    ["契約・支払いに使いたい場所", data.get("platform")],
    ["対象URLまたは作業概要", data.get("target")],
    ["困っていること", data.get("problem")],
    ["予算感", data.get("budget")],
  ];
  return rows
    .map(([label, value]) => `## ${label}\n${String(value || "").trim() || "未入力"}`)
    .join("\n\n");
}

function updateIssueLink() {
  if (!openEstimateIssue) return;
  const body = buildEstimateText();
  const title = "見積もり相談";
  const params = new URLSearchParams({
    template: "request.md",
    title,
    body,
  });
  openEstimateIssue.href = `https://github.com/part676392/ai-html-fix-service-site/issues/new?${params.toString()}`;
}

if (estimateForm) {
  estimateForm.addEventListener("input", updateIssueLink);
  estimateForm.addEventListener("change", updateIssueLink);
  updateIssueLink();
}

if (copyEstimate) {
  copyEstimate.addEventListener("click", async () => {
    const text = buildEstimateText();
    try {
      await navigator.clipboard.writeText(text);
      copyEstimate.textContent = "コピーしました";
      setTimeout(() => {
        copyEstimate.textContent = "相談文をコピー";
      }, 1800);
    } catch {
      copyEstimate.textContent = "コピーできませんでした";
      setTimeout(() => {
        copyEstimate.textContent = "相談文をコピー";
      }, 1800);
    }
    updateIssueLink();
  });
}
