# 🍌 Nano Banana Prompts Vault - 開發計劃

## 📋 專案概述

這是一個 Nano Banana AI 圖片生成的提示詞收集網站，使用 GitHub Issues 作為資料庫。

- **前台網址**：https://mukiwu.github.io/prompts-vault
- **GitHub Repo**：https://github.com/mukiwu/prompts-vault

---

## ✅ 已完成

- [x] 建立前台頁面（index.html）
- [x] 宇宙主題設計（nano-banana.css）
- [x] GitHub API 整合（nano-banana.js）
- [x] GitHub Issue Template 投稿表單
- [x] 分類系統（人像角色、照片編輯、風格轉換、創意設計、產品攝影）
- [x] 搜尋與篩選功能
- [x] 一鍵複製提示詞
- [x] 響應式設計
- [x] README 文件（英文 + 中文）

---

## 🔜 待辦事項

### 優先級：高

- [ ] 推送到 GitHub
- [ ] 啟用 GitHub Pages
- [ ] 建立第一個測試 Issue 並加上 `approved` label 測試

### 優先級：中

- [ ] 新增「收藏」功能（使用 localStorage）
- [ ] 新增「最近複製」歷史記錄
- [ ] 優化載入狀態動畫
- [ ] 新增深色/淺色主題切換
- [ ] SEO 優化（meta tags、Open Graph）

### 優先級：低

- [ ] 新增提示詞評分/投票功能
- [ ] 新增使用者統計（最多複製、最受歡迎）
- [ ] 支援多語言（i18n）
- [ ] PWA 支援（離線使用）
- [ ] 新增分享功能（Twitter、Facebook）

---

## 🏗️ 技術架構

```
┌─────────────────────────────────────────────────┐
│                   使用者                         │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│           GitHub Pages (前台)                    │
│  ┌─────────────┬─────────────┬───────────────┐  │
│  │ index.html  │  CSS        │  JavaScript   │  │
│  └─────────────┴─────────────┴───────────────┘  │
└─────────────────────┬───────────────────────────┘
                      │ GitHub API
                      ▼
┌─────────────────────────────────────────────────┐
│              GitHub Issues (資料庫)              │
│  ┌─────────────────────────────────────────┐    │
│  │  Issue #1 [approved] - 夢幻森林精靈      │    │
│  │  Issue #2 [pending]  - 待審核投稿        │    │
│  │  Issue #3 [approved] - 拍立得風格        │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## 🔧 GitHub 設定

### 1. Labels 設定

在 GitHub repo 建立以下 labels：

| Label | 顏色 | 說明 |
|-------|------|------|
| `pending` | `#FEF3C7` | 待審核（預設） |
| `approved` | `#10B981` | 已審核上架 |
| `人像角色` | `#8B5CF6` | 分類標籤 |
| `照片編輯` | `#3B82F6` | 分類標籤 |
| `風格轉換` | `#EC4899` | 分類標籤 |
| `創意設計` | `#F59E0B` | 分類標籤 |
| `產品攝影` | `#10B981` | 分類標籤 |

### 2. GitHub Pages 設定

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root

---

## 📝 Issue 投稿格式

使用者透過 Issue Template 投稿，格式如下：

```markdown
### 提示詞名稱
夢幻森林精靈

### 分類
人像角色

### 提示詞內容
ethereal forest spirit, bioluminescent plants...

### 標籤
奇幻, 精靈, 森林

### 預覽圖片網址（選填）
https://...

### 作者名稱（選填）
MUKi

### 作者網站（選填）
https://muki.tw
```

---

## 🐛 已知問題

- [ ] API 速率限制（未認證 60 次/小時）
- [ ] 圖片需要外部託管（GitHub Issues 不支援直接上傳）

---

## 📞 聯絡

- GitHub: [@mukiwu](https://github.com/mukiwu)
- Website: [muki.tw](https://muki.tw)

