# 🍌 Nano Banana Prompts Vault

一個美觀的 Nano Banana AI 圖片生成提示詞收集網站，使用 GitHub Issues 作為資料庫。

[English README](./README.md)

![Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ 功能特色

- **GitHub 驅動** - 使用 GitHub Issues 作為資料庫，無需後端
- **社群投稿** - 任何人都可以透過 GitHub Issue 表單投稿
- **內建審核系統** - 在 GitHub 加上 label 即可審核投稿
- **精美介面** - 宇宙主題設計，流暢動畫效果
- **搜尋與篩選** - 依分類、標籤或關鍵字搜尋
- **一鍵複製** - 快速複製提示詞到剪貼簿
- **響應式設計** - 支援桌面與手機瀏覽

## 🚀 運作方式

1. **投稿** - 使用者點擊「新增提示詞」→ 開啟 GitHub Issue 表單
2. **審核** - 管理員審核 Issue 並加上 `approved` label
3. **顯示** - 網站自動顯示有 `approved` label 的 Issues

## 📁 專案結構

```
prompts-vault/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── prompt-submission.yml   # Issue 表單模板
├── index.html                      # 主頁面
├── nano-banana.css                 # 樣式
├── nano-banana.js                  # 邏輯（GitHub API）
├── README.md                       # 英文文件
└── README_TW.md                    # 中文文件
```

## ⚙️ 設定

編輯 `nano-banana.js` 中的 GitHub 設定：

```javascript
const GITHUB_CONFIG = {
  owner: 'your-username',    // 你的 GitHub 用戶名
  repo: 'prompts-vault',     // Repository 名稱
  label: 'approved'          // 已審核提示詞的 label
};
```

## 🏷️ Label 系統

| Label | 用途 |
|-------|------|
| `pending` | 新投稿（預設） |
| `approved` | 已審核，會顯示在網站上 |

## 📝 分類

- **人像角色** - 人物、公仔、變裝、3D 人偶
- **照片編輯** - 修復、增強、上色、美化
- **風格轉換** - 拍立得、3D 風格、草圖轉真實
- **創意設計** - 海報、表情包、室內設計
- **產品攝影** - 商品照、電商、廣告

## 🛠️ 部署方式

### GitHub Pages

1. 前往 repository **Settings** → **Pages**
2. 設定 source 為 **main branch**
3. 網站將上線於 `https://mukiwu.github.io/prompts-vault`

### 其他平台

將靜態檔案部署到任何託管服務即可（Netlify、Vercel 等）

## 📄 授權

MIT License - 歡迎自由使用與修改！

## 🙏 作者

由 [MUKi Wu](https://github.com/mukiwu) 建立

