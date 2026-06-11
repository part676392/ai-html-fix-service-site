# AI生成HTML・LP軽微修正サービス

AI生成HTML、LP、既存サイトの軽微なHTML/CSS崩れを即日修正するための営業ページです。

## 狙い

- クラウドワークス等の「HTML/CSS修正」「AI生成HTMLの調整」「GitHub/Sass/WordPress更新」案件に応募するためのポートフォリオURLを用意する。
- 3,000円以上の小額受注を狙い、5ドル以上の初回売上に到達する。
- 「何でも作る」ではなく、軽微修正と差分納品に絞る。

## 主要ファイル

- `index.html` - 公開LP
- `styles.css` - 表示スタイル
- `app.js` - 応募文コピー機能
- `.github/ISSUE_TEMPLATE/request-fix.yml` - 見積もり相談フォーム
- `operations/proposals/` - 案件応募用の下書き

## 公開予定URL

https://part676392.github.io/ai-html-fix-service-site/

Netlifyミラー:

https://ai-html-fix-service.netlify.app/

## 問い合わせ導線

公開ページ内の相談フォームは、入力内容から相談文を生成し、GitHub Issueで送れる形にする。未検証のサーバー送信フォームは使わない。
