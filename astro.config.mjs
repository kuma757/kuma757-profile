// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Cloudflare Pages では静的出力（デフォルト）のままデプロイできます。
  // 独自ドメインを設定したら、サイトの URL を site に指定してください。
  // site: 'https://YOUR-SITE.pages.dev',
  output: 'static',
  build: {
    // ビルド成果物（Cloudflare Pages の出力ディレクトリ）
    assets: '_astro',
  },
  vite: {
    build: {
      // 小さなスクリプトが HTML へ自動インライン化されると
      // CSP の script-src 'self' でブロックされるため、
      // 常に外部ファイルとして出力する（assetsInlineLimit: 0）
      assetsInlineLimit: 0,
    },
  },
});