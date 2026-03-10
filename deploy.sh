#!/bin/bash
# ===========================================
#  TalkTalk LP デプロイスクリプト
#  GitHub → Cloudflare Pages 自動デプロイ
# ===========================================

set -e

# 色付き出力
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo ""
echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo -e "${CYAN}  TalkTalk LP デプロイ${NC}"
echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo ""

# 1. 現在の変更状況を表示
echo -e "${YELLOW}📋 変更状況:${NC}"
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo -e "${GREEN}  ✅ 変更はありません。デプロイ不要です。${NC}"
    exit 0
fi

git status --short
echo ""

# 2. すべての変更をステージング
echo -e "${YELLOW}📦 変更をステージング中...${NC}"
git add -A
echo -e "${GREEN}  ✅ 完了${NC}"
echo ""

# 3. コミットメッセージ
if [ -n "$1" ]; then
    COMMIT_MSG="$1"
else
    # 引数がない場合はタイムスタンプ付きのデフォルトメッセージ
    COMMIT_MSG="deploy: $(date '+%Y-%m-%d %H:%M')"
fi

echo -e "${YELLOW}💬 コミットメッセージ: ${NC}${COMMIT_MSG}"
git commit -m "$COMMIT_MSG"
echo ""

# 4. GitHubへプッシュ
echo -e "${YELLOW}🚀 GitHubへプッシュ中...${NC}"
git push origin main
echo ""

# 5. 完了
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ デプロイ完了！${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}  Cloudflare Pagesが自動的にビルド・公開します。${NC}"
echo -e "${CYAN}  反映まで1〜2分かかる場合があります。${NC}"
echo ""
