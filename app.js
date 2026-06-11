const copyButton = document.querySelector("#copyPitch");
const pitchText = document.querySelector("#pitchText");
const estimateForm = document.querySelector("#estimateForm");
const copyEstimate = document.querySelector("#copyEstimate");
const openEstimateIssue = document.querySelector("#openEstimateIssue");
const packageButtons = document.querySelectorAll("[data-package]");

const packagePresets = {
  mini: {
    platform: "クラウドワークス",
    target: "初回ミニ修正: 公開URLまたはHTML/CSSファイルを共有予定",
    problem:
      "スマホ表示、余白、画像はみ出し、ボタン位置など、1から3箇所の軽微なHTML/CSS修正を相談したいです。",
    budget: "3,000円くらい",
  },
  faq: {
    platform: "クラウドワークス",
    target: "Q&A/FAQセクション追加: 対象ページURLを共有予定",
    problem:
      "ECサイトまたはLPにQ&A/FAQ欄を追加したいです。見出し構造、スマホ表示、必要に応じたFAQPage構造化データのたたき台も相談したいです。",
    budget: "5,000円くらい",
  },
  form: {
    platform: "クラウドワークス",
    target: "AI生成PHPフォーム一次確認: 対象フォーム一式を共有予定",
    problem:
      "AI生成PHPフォームの入力検証、メール送信、出力エスケープ、CSRF、bot/連投対策、正常送信・異常入力の確認を相談したいです。",
    budget: "10,000円以上",
  },
};

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

function setField(name, value) {
  if (!estimateForm) return;
  const field = estimateForm.elements.namedItem(name);
  if (!field) return;
  field.value = value;
}

function applyPackagePreset(packageName, shouldScroll = true) {
  const preset = packagePresets[packageName];
  if (!preset || !estimateForm) return;
  setField("platform", preset.platform);
  setField("target", preset.target);
  setField("problem", preset.problem);
  setField("budget", preset.budget);
  updateIssueLink();
  if (shouldScroll) {
    document.querySelector("#request")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyPackagePreset(button.dataset.package);
  });
});

if (estimateForm) {
  const packageName = new URLSearchParams(window.location.search).get("package");
  applyPackagePreset(packageName, false);
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
