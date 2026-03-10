---
description: TalkTalk LPをGitHub経由でCloudflare Pagesにデプロイする
---

# デプロイ手順

// turbo-all

TalkTalk LPはGitHub（`hidatoyo/talktalk-lp`）の`main`ブランチにpushすると、Cloudflare Pagesが自動的にビルド・公開します。

## 手順

1. 現在のGit状態を確認する
```bash
cd /Users/thx/Downloads/obsidian/Private/TalkTalk && git status --short
```

2. すべての変更をステージングする
```bash
cd /Users/thx/Downloads/obsidian/Private/TalkTalk && git add -A
```

3. 変更をコミットする（メッセージは状況に応じて変更すること）
```bash
cd /Users/thx/Downloads/obsidian/Private/TalkTalk && git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"
```

4. GitHubのmainブランチにプッシュする
```bash
cd /Users/thx/Downloads/obsidian/Private/TalkTalk && git push origin main
```

5. 完了。Cloudflare Pagesが自動的にデプロイを開始します。反映まで1〜2分かかる場合があります。
