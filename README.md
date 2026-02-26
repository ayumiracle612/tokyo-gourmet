# 🍜 Tokyo Gourmet — AI-Powered Food Itinerary Generator

インバウンド旅行者向けの東京グルメ旅程自動生成ツール。  
Claude AIがあなたの好みに合わせた東京グルメプランを生成します。

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **AI**: Anthropic Claude API
- **Styling**: CSS Modules
- **Deploy**: Vercel (推奨) / AWS

## 開発環境のセットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/YOUR_USERNAME/tokyo-gourmet.git
cd tokyo-gourmet
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて、Anthropic APIキーを設定：

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

APIキーは https://console.anthropic.com/ で取得できます。

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 で確認できます。

## Vercelへのデプロイ

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

Vercelのダッシュボードで環境変数 `ANTHROPIC_API_KEY` を設定してください。

## プロジェクト構成

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # Claude APIを呼び出すAPIルート
│   ├── globals.css            # グローバルスタイル・CSS変数
│   ├── layout.tsx             # ルートレイアウト・メタデータ
│   ├── page.tsx               # メインページ
│   └── page.module.css
├── components/
│   ├── ItineraryForm.tsx      # 入力フォームコンポーネント
│   ├── ItineraryForm.module.css
│   ├── ItineraryResult.tsx    # 旅程表示コンポーネント
│   └── ItineraryResult.module.css
└── lib/
    ├── types.ts               # TypeScript型定義
    └── prompt.ts              # Claude APIプロンプトビルダー
```

## 今後の実装予定

- [ ] 多言語対応（中国語・韓国語）
- [ ] DynamoDBによる旅程キャッシュ
- [ ] PDFエクスポート機能
- [ ] Stripeによるプレミアム課金
- [ ] Google Places APIによる店舗情報強化

## ライセンス

MIT
