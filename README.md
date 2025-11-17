# 🎂 Birthday Surprise Landing Page

彼女へのお誕生日サプライズのために作成した、インタラクティブなランディングページです。

## ✨ 特徴

- **ウェルカム画面**: サプライズを始めるための入り口
- **カウントダウン**: ドラマチックな5秒間のカウントダウン
- **Happy Birthdayメッセージ**: 風船のアニメーションと共に表示される誕生日メッセージ
- **インタラクティブな宝箱**: クリックすると開く3D宝箱アニメーション
- **プレゼントの演出**: 宝箱を開けるとプレゼントが飛び出します
- **メッセージカード**: 5つの心からのメッセージ
- **Confettiエフェクト**: 各セクションでお祝いのconfettiが降ります

## 🎨 デザインコンセプト

- v0 by Vercelのバースデーテンプレートをインスピレーション源として活用
- CodePenの宝箱アニメーションを参考に3D効果を実装
- グラデーションとアニメーションで華やかな雰囲気を演出
- レスポンシブデザインでモバイルでも快適に閲覧可能

## 🚀 使い方

1. `index.html`をブラウザで開く
2. 「始めよう！」ボタンをクリック
3. カウントダウンが終わるまで待つ
4. Happy Birthdayメッセージを楽しむ
5. 宝箱をクリックして開ける
6. メッセージを読む
7. 「もう一度見る」で最初から再生可能

## 📁 ファイル構成

```
.
├── index.html      # メインHTMLファイル
├── styles.css      # スタイルとアニメーション
├── script.js       # インタラクティブ機能
└── README.md       # このファイル
```

## 🎭 カスタマイズ方法

### メッセージの変更
`index.html`の`#messages`セクション内の`.message-card`を編集してください。

### 色の変更
`styles.css`のグラデーション部分を編集:
```css
background: linear-gradient(135deg, #色1 0%, #色2 100%);
```

### プレゼント内容の変更
`index.html`の`.gift-content`セクションを編集してください。

## 🌟 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**:
  - 3D Transforms (宝箱アニメーション)
  - Keyframe Animations
  - Flexbox & Grid
  - グラデーション
- **Vanilla JavaScript**:
  - Canvas API (confetti)
  - DOM操作
  - イベントハンドリング

## 📱 ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 🚢 Vercelへのデプロイ

このプロジェクトはVercelへ簡単にデプロイできます。

### 前提条件
- GitHubアカウント
- Vercelアカウント（[vercel.com](https://vercel.com)で無料作成可能）

### デプロイ手順

1. **リポジトリの準備**
   - このプロジェクトをGitHubリポジトリにプッシュ済み

2. **Vercelへのデプロイ**
   - [Vercel](https://vercel.com)にログイン
   - 「Add New Project」をクリック
   - GitHubリポジトリを選択
   - プロジェクト設定:
     - **Framework Preset**: Other
     - **Root Directory**: `./`（デフォルト）
     - **Build Command**: 空白（静的サイトのため不要）
     - **Output Directory**: `./`（デフォルト）
   - 「Deploy」ボタンをクリック

3. **デプロイ完了**
   - 数秒でデプロイが完了します
   - Vercelが自動生成したURLでサイトにアクセス可能
   - カスタムドメインの設定も可能

### ファイル構成（Vercel用）
```
.
├── index.html        # メインHTMLファイル
├── styles.css        # スタイルシート
├── script.js         # JavaScript
├── package.json      # プロジェクト設定
├── vercel.json       # Vercel設定（出力ディレクトリ指定）
├── .gitignore        # Git除外ファイル
└── README.md         # このファイル
```

**注意**: `vercel.json`でルートディレクトリ（`.`）を出力ディレクトリとして指定しています。HTMLファイル内のリソースパスは絶対パス（`/`から始まる）を使用しています。

### 自動デプロイ
- GitHubリポジトリにプッシュすると自動的に再デプロイされます
- ブランチごとにプレビュー環境が自動生成されます

### トラブルシューティング
- デプロイに失敗した場合は、Vercelのログを確認してください
- すべてのファイル（HTML, CSS, JS）が正しくコミットされているか確認してください

## 💝 クレジット

- デザインインスピレーション: [v0 by Vercel](https://v0.dev/)
- 宝箱アニメーション参考: CodePen community
- 作成者: あなたの名前

## 📄 ライセンス

個人使用のみ。愛を込めて作成しました ❤️

---

**Happy Birthday! 🎉**
