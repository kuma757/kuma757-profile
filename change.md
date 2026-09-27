# 変更履歴

## 2026-09-27

### サイト新規作成（kuma757 自己紹介サイト / Astro）

- **変更内容**: kuma757 の自己紹介サイトを新規作成
- **変更理由**: Cloudflare Pages でホストする自己紹介サイトとして新規立ち上げ
- **影響範囲**: プロジェクト全体（新規）

#### 実装内容

- Astro（静的出力）で構成。ビルド不要の静的サイトとして Cloudflare Pages へデプロイ可能
- 参考サイト（simpliesbot-tts-v2.pages.dev）のデザインを踏襲
  - ダークテーマ（zinc 系カラーパレット / `#09090b` ベース）
  - 図形レス構成（罫線＋番号によるセクション・カード）
  - Inter / Noto Sans JP、Google Material Symbols
  - スティッキーヘッダー（モバイルメニュー付き）
- セクション構成: ヒーロー / プロフィール / プロジェクト（KumaEarth・SimpliesBot TTS）/ リンク / フッター
- Discord ユーザー名「kuma757」のコピーボタン（クリップボード API + フォールバック）
- SEO: JSON-LD（Person）、Open Graph、Twitter Card
- セキュリティ: `public/_headers` で CSP・各種ヘッダーを適用

#### 設定変更

- `package.json` に npm scripts を定義（dev / build / preview / check）
- `astro.config.mjs` で `vite.build.assetsInlineLimit: 0` を指定
  - Astro が小さい `<script>` を HTML へ自動インライン化するため、CSP の `script-src 'self'` で
    ブロックされないよう常に外部ファイルとして出力する

#### デプロイ設定（Cloudflare Pages）

- ビルドコマンド: `npm run build` / 出力ディレクトリ: `dist`

#### 備考

- 独自ドメイン決定後に `astro.config.mjs` の `site` を設定すること
- ローカル環境に Node.js が無いため開発・検証は Bun で実施（本番ビルドは npm 前提）

### GitHub リポジトリへの公開

- 公開先: https://github.com/kuma757/kuma757-profile
- `bun.lock` はコミット対象外に設定（`.gitignore` に追記）
  - Cloudflare Pages のビルドは npm でインストールするため、Bun のロックファイルは不要
- 初回プッシュは GitHub API（MCP）経由を試行したが、空リポジトリには初回コミットを作成できない
  制約のため、SSH 経由の git CLI で初回コミットを作成して push

### デザイン全面リニューアル / Discord リンク変更

- **変更内容**: 参照サイト（simpliesbot-tts-v2.pages.dev）の構成踏襲をやめ、オリジナルデザインに刷新
- **変更理由**: ユーザー指定（「がっちがっちに参考にしなくていい」「もっといい感じに」）
- **デザイン変更**:
  - ダーク × アンバー（`#fbbf24`）アクセントのカードベース構成
  - グラスモーフィズムのスティッキーヘッダー（backdrop-filter）
  - ヒーローにアンバーのラジアルグロー、Space Grotesk のディスプレイフォント
  - プロフィールカード / 情報リスト / プロジェクトカード（タグ付き）/ リンクタイル
- **Discord リンク変更**:
  - ユーザー名コピーボタンを廃止し、`https://discord.com/users/1125045664821289030` へのリンクに変更
  - `CopyField.astro` コンポーネントを削除、コピー用スクリプトを削除
- **依存整理**: Google Material Symbols を廃止し、インライン SVG アイコンに置換（外部依存を削減）
- **SEO**: JSON-LD の `sameAs` に Discord プロフィール URL を追加
- **影響範囲**: `src/styles/global.css`（全面）/ `src/pages/index.astro` / `Header` / `Footer` /
  `BaseLayout` / `public/favicon.svg` / ドキュメント類

### モノクロデザインへの刷新（白 × 黒のみ）

- **変更内容**: カラー（アンバーアクセント・グロー・グラデーション）を全廃し、白 × 黒のみのモノクロ構成に変更
- **変更理由**: ユーザー指定（「カラフル過ぎる・AI感がある。色は白と黒だけで統一」）
- **デザイン変更**:
  - 白背景 × 黒インク（`#0a0a0a`）のエディトリアル構成。グレーは中間諧調（`#f7f7f7` 等）のみ使用
  - Space Grotesk を廃止し Inter / Noto Sans JP に統一、グロー・グラデーション・絵文字アイコンを全削除
  - アイコンは白黒の線画 SVG に置換（リンクタイルはホバーで白黒反転）
  - フッターを黒背景 × 白文字にし、白黒のコントラストで締める
  - favicon を「黒背景 × 白の K」に変更
- **影響範囲**: `src/styles/global.css`（全面）/ `src/pages/index.astro` /
  `src/layouts/BaseLayout.astro` / `public/favicon.svg` / ドキュメント類