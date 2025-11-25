# 🍌 Nano Banana Prompts Vault

A beautiful prompt collection website for Nano Banana AI image generation, powered by GitHub Issues.

[繁體中文版 README](./README_TW.md)

![Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **GitHub-Powered** - Uses GitHub Issues as a database, no backend required
- **Community Submissions** - Anyone can submit prompts via GitHub Issue forms
- **Built-in Review System** - Approve submissions by adding labels in GitHub
- **Beautiful UI** - Cosmic-themed design with smooth animations
- **Search & Filter** - Find prompts by category, tags, or keywords
- **One-Click Copy** - Quickly copy prompts to clipboard
- **Responsive Design** - Works on desktop and mobile

## 🚀 How It Works

1. **Submit** - Users click "Add Prompt" → Opens GitHub Issue form
2. **Review** - Maintainer reviews the Issue and adds `approved` label
3. **Display** - Website automatically shows Issues with `approved` label

## 📁 Project Structure

```
prompts-vault/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── prompt-submission.yml   # Issue form template
├── index.html                      # Main page
├── nano-banana.css                 # Styles
├── nano-banana.js                  # Logic (GitHub API)
├── README.md                       # English docs
└── README_TW.md                    # Chinese docs
```

## ⚙️ Configuration

Edit the GitHub config in `nano-banana.js`:

```javascript
const GITHUB_CONFIG = {
  owner: 'your-username',    // Your GitHub username
  repo: 'prompts-vault',     // Repository name
  label: 'approved'          // Label for approved prompts
};
```

## 🏷️ Label System

| Label | Purpose |
|-------|---------|
| `pending` | New submissions (default) |
| `approved` | Approved and displayed on website |

## 📝 Categories

- **Portrait & Character** - People, figures, costumes, 3D avatars
- **Photo Editing** - Restore, enhance, colorize, beautify
- **Style Transfer** - Polaroid, 3D style, sketch to photo
- **Creative Design** - Posters, stickers, interior design
- **Product Photography** - Product shots, e-commerce, ads

## 🛠️ Deployment

### GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to **main branch**
3. Your site will be live at `https://mukiwu.github.io/prompts-vault`

### Other Platforms

Simply deploy the static files to any hosting service (Netlify, Vercel, etc.)

## 📄 License

MIT License - feel free to use and modify!

## 🙏 Credits

Created by [MUKi Wu](https://github.com/mukiwu)
