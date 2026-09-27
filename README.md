# kuma757 profile

kuma757 の自己紹介サイトです。

- **フレームワーク**: [Astro](https://astro.build/)（静的出力）
- **デザイン**: モノクロ（白 × 黒）のエディトリアルデザイン
- **ホスティング**: Cloudflare Pages

## 構成

```
├── public/
│   ├── _headers          # Cloudflare Pages 用セキュリティヘッダー（CSP 含む）
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/       # Header / Footer
│   ├── layouts/          # BaseLayout（メタ・フォント・クライアントスクリプト）
│   ├── pages/            # index.astro
│   └── styles/           # global.css（デザインシステム）
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## ローカル開発

Node.js 22.12.0 以上が必要です（Bun でも可）。

```bash
# 依存関係のインストール
bun install   # または npm install

# 開発サーバー（http://localhost:4321）
bun run dev

# ビルド（dist/ に出力）
bun run build

# 型チェック
bun run check

# ビルド結果の確認（http://localhost:4321）
bun run preview
```

## Cloudflare Pages へのデプロイ

### 方法 1: Git 連携（推奨）

1. リポジトリを GitHub / GitLab にプッシュする
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. リポジトリを選択し、以下を設定する

| 項目 | 値 |
| --- | --- |
| Framework preset | Astro（または none） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| 環境変数 | なし（静的サイトのため不要） |

4. **Save and Deploy** をクリック

### 方法 2: Wrangler CLI

```bash
# ログイン
npx wrangler login

# public ディレクトリに dist を公開
npx wrangler pages deploy dist --project-name kuma757-profile
```

初回はプロジェクト名の確認を求められます。

### 独自ドメインを使う場合

1. Cloudflare Pages のプロジェクト設定 → **Custom domains** からドメインを追加
2. `astro.config.mjs` の `site` に URL を設定して再デプロイする

### ビルドの注意点

- Cloudflare Pages はビルド環境に Node.js と npm を用意しているため、
  **ビルドコマンドは `npm run build` を推奨**します（ローカルのみ Bun で開発可）。
- `bun.lock` はコミット対象外です（`.gitignore` に登録済み）。Cloudflare Pages のビルドは npm で
  インストールを行い、`package.json` のバージョン範囲から npm 側のロックが生成されます。
- 出力物 `dist/` には `_headers`（CSP 等）が含まれており、Pages が自動で適用します。
- セキュリティヘッダーは `public/_headers` を編集してください。

## コンテンツの変更

- プロフィール・プロジェクト・リンクの文言: `src/pages/index.astro`
- 配色・レイアウト: `src/styles/global.css`（トークンは `:root` に定義）
- メタ情報（OGP / Twitter Card）: `src/layouts/BaseLayout.astro`
- Discord プロフィールリンク: `src/pages/index.astro` の `DISCORD_URL`（`https://discord.com/users/1125045664821289030`）

## ライセンス

サイトのコンテンツ・デザインは kuma757 に帰属します。