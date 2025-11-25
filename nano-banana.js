/**
 * 🍌 Nano Banana Prompts Vault
 * A friendly prompt collection tool powered by GitHub Issues
 */

// ==========================================
// GitHub Configuration
// ==========================================
const GITHUB_CONFIG = {
  owner: 'mukiwu',           // GitHub 用戶名
  repo: 'prompts-vault',     // Repository 名稱
  label: 'approved'          // 只顯示有這個 label 的 Issues
};

// ==========================================
// State
// ==========================================
let prompts = [];
let currentFilter = 'all';
let searchQuery = '';
let currentPromptId = null;
let currentView = 'grid';
let isLoading = false;

// ==========================================
// Category Mapping
// ==========================================
const categoryNames = {
  'portrait': '◉ 人像角色',
  'photo-edit': '◈ 照片編輯',
  'style': '❖ 風格轉換',
  'design': '★ 創意設計',
  'product': '▣ 產品攝影'
};

const categoryIcons = {
  'portrait': '◉',
  'photo-edit': '◈',
  'style': '❖',
  'design': '★',
  'product': '▣'
};

const categoryMap = {
  '人像角色': 'portrait',
  '照片編輯': 'photo-edit',
  '風格轉換': 'style',
  '創意設計': 'design',
  '產品攝影': 'product'
};

// 每個分類對應的建議標籤
const categoryTags = {
  'portrait': ['人物', '公仔', '變裝', '3D人偶', 'Q版', '寫實', '動漫風', '全身', '半身', '大頭照'],
  'photo-edit': ['修復', '增強', '上色', '美化', '去背', '降噪', '銳化', '調色', '老照片', '模糊修復'],
  'style': ['拍立得', '3D風格', '草圖轉真實', '油畫', '水彩', '素描', '漫畫', '像素風', '復古', '賽博龐克'],
  'design': ['海報', '表情包', '室內設計', '萬聖節', '聖誕節', 'Logo', '插畫', 'Banner', '社群貼文', '封面'],
  'product': ['商品照', '產品展示', '白底去背', '情境照', '電商', '廣告', '包裝', '食物', '服飾', '3C產品']
};

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  loadPromptsFromGitHub();
});

// ==========================================
// GitHub API
// ==========================================
async function loadPromptsFromGitHub() {
  const container = document.getElementById('prompts-container');
  const emptyState = document.getElementById('empty-state');

  // Show loading state
  isLoading = true;
  container.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner">🍌</div>
      <p>載入中...</p>
    </div>
  `;
  emptyState.style.display = 'none';

  try {
    const { owner, repo, label } = GITHUB_CONFIG;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?labels=${label}&state=open&per_page=100`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const issues = await response.json();
    prompts = issues.map(parseIssueToPrompt).filter(p => p !== null);

    isLoading = false;
    renderPrompts();
    updateStats();
  } catch (error) {
    console.error('Failed to load prompts:', error);
    isLoading = false;
    container.innerHTML = `
      <div class="error-state">
        <span class="error-icon">⚠️</span>
        <p>載入失敗，請稍後再試</p>
        <button class="retry-btn" onclick="loadPromptsFromGitHub()">重新載入</button>
      </div>
    `;
  }
}

function parseIssueToPrompt(issue) {
  try {
    const body = issue.body || '';

    // Parse the Issue body (from GitHub Issue Form)
    const getValue = (label) => {
      const regex = new RegExp(`### ${label}\\s*\\n\\s*([\\s\\S]*?)(?=\\n###|$)`, 'i');
      const match = body.match(regex);
      return match ? match[1].trim() : '';
    };

    const title = getValue('提示詞名稱') || issue.title.replace('[Prompt]', '').trim();
    const prompt = getValue('提示詞內容');
    const categoryName = getValue('分類');
    const tagsStr = getValue('標籤');
    const imageContent = getValue('預覽圖片（選填）') || getValue('預覽圖片網址（選填）');
    const author = getValue('作者名稱（選填）');
    const authorUrl = getValue('作者網站（選填）');

    if (!prompt) return null;

    const category = categoryMap[categoryName] || 'style';
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];
    
    // Parse images from markdown format or direct URLs
    let images = [];
    if (imageContent && imageContent !== '_No response_') {
      // Match markdown image syntax: ![...](url) or direct URLs
      const markdownImageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
      const directUrlRegex = /(https?:\/\/(?:user-images\.githubusercontent\.com|github\.com\/user-attachments)[^\s<>"')\]]+)/g;
      
      let match;
      while ((match = markdownImageRegex.exec(imageContent)) !== null) {
        images.push(match[1]);
      }
      // Also check for direct URLs (in case they paste just the URL)
      while ((match = directUrlRegex.exec(imageContent)) !== null) {
        if (!images.includes(match[1])) {
          images.push(match[1]);
        }
      }
      // Fallback: if no images found but content exists and looks like a URL
      if (images.length === 0 && imageContent.startsWith('http')) {
        images = [imageContent.trim()];
      }
    }

    return {
      id: issue.number,
      title: title || '未命名提示詞',
      prompt,
      category,
      tags,
      images,
      author: author !== '_No response_' ? author : '',
      authorUrl: authorUrl !== '_No response_' ? authorUrl : '',
      issueUrl: issue.html_url,
      createdAt: issue.created_at,
      reactions: issue.reactions?.total_count || 0
    };
  } catch (error) {
    console.error('Failed to parse issue:', issue.number, error);
    return null;
  }
}

// ==========================================
// Event Listeners
// ==========================================
function initEventListeners() {
  // Category pills
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.category;
      renderPrompts();
    });
  });

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      const container = document.getElementById('prompts-container');
      container.classList.toggle('list-view', currentView === 'list');
    });
  });

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderPrompts();
  });

  // Keyboard shortcut for search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      closeModal('modal-overlay');
      closeModal('detail-overlay');
    }
  });

  // Add button - redirect to GitHub Issue
  document.getElementById('add-btn').addEventListener('click', openSubmitPage);

  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal('modal-overlay');
    });
  });

  // Detail modal close button
  const detailCloseBtn = document.getElementById('detail-close');
  if (detailCloseBtn) {
    detailCloseBtn.addEventListener('click', () => {
      closeModal('detail-overlay');
    });
  }

  // Modal backdrop click
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal('modal-overlay');
      }
    });
  }

  // Detail overlay backdrop click
  const detailOverlay = document.getElementById('detail-overlay');
  if (detailOverlay) {
    detailOverlay.addEventListener('click', (e) => {
      if (e.target === detailOverlay) {
        closeModal('detail-overlay');
      }
    });
  }

  // Detail actions
  document.getElementById('copy-prompt-btn').addEventListener('click', copyCurrentPrompt);
  document.getElementById('detail-favorite').addEventListener('click', openCurrentIssue);
}

// ==========================================
// Render
// ==========================================
function renderPrompts() {
  const container = document.getElementById('prompts-container');
  const emptyState = document.getElementById('empty-state');

  if (isLoading) return;

  let filtered = prompts;

  if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchQuery) ||
      p.prompt.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = filtered.map(renderPromptCard).join('');
}

function renderPromptCard(prompt) {
  const icon = categoryIcons[prompt.category] || '✦';
  const hasImage = prompt.images && prompt.images.length > 0;
  const imageCount = prompt.images?.length || 0;

  return `
    <div class="prompt-card" onclick="openDetail(${prompt.id})">
      <div class="card-image ${!hasImage ? 'no-image' : ''}">
        ${hasImage
      ? `<img src="${prompt.images[0]}" alt="${prompt.title}" loading="lazy">`
      : `<span class="card-placeholder">🍌</span>`
    }
        ${imageCount > 1 ? `<span class="card-image-count">+${imageCount - 1}</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(prompt.title)}</h3>
        <p class="card-preview">${escapeHtml(prompt.prompt)}</p>
        <div class="card-footer">
          <div class="card-tags">
            ${prompt.tags.slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <button class="card-copy-btn" onclick="event.stopPropagation(); quickCopy(${prompt.id})" title="複製">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function updateStats() {
  const totalPromptsEl = document.getElementById('total-prompts');
  const totalFavoritesEl = document.getElementById('total-favorites');
  const totalCopiesEl = document.getElementById('total-copies');

  if (totalPromptsEl) totalPromptsEl.textContent = prompts.length;
  if (totalFavoritesEl) totalFavoritesEl.textContent = Object.keys(categoryNames).length;

  const totalReactions = prompts.reduce((sum, p) => sum + (p.reactions || 0), 0);
  if (totalCopiesEl) totalCopiesEl.textContent = totalReactions;
}

// ==========================================
// Modal Functions
// ==========================================
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// Detail View
// ==========================================
function openDetail(id) {
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return;

  currentPromptId = id;

  document.getElementById('detail-title').textContent = prompt.title;
  document.getElementById('detail-category').textContent = categoryNames[prompt.category] || prompt.category;
  document.getElementById('detail-prompt').textContent = prompt.prompt;

  // Author info
  const authorContainer = document.getElementById('detail-author');
  if (prompt.author) {
    let authorHtml = `<span class="author-label">投稿者：</span>`;
    if (prompt.authorUrl) {
      authorHtml += `<a href="${prompt.authorUrl}" target="_blank" rel="noopener noreferrer" class="author-link">${escapeHtml(prompt.author)}</a>`;
    } else {
      authorHtml += `<span class="author-name">${escapeHtml(prompt.author)}</span>`;
    }
    authorContainer.innerHTML = authorHtml;
    authorContainer.style.display = 'flex';
  } else {
    authorContainer.style.display = 'none';
  }

  // Tags
  document.getElementById('detail-tags').innerHTML = prompt.tags.map(t =>
    `<span class="detail-tag">#${escapeHtml(t)}</span>`
  ).join('');

  // Images
  const imageContainer = document.getElementById('detail-image');
  const images = prompt.images || [];

  if (images.length > 0) {
    if (images.length === 1) {
      imageContainer.innerHTML = `<img src="${images[0]}" alt="${prompt.title}">`;
    } else {
      imageContainer.innerHTML = `
        <div class="detail-image-gallery">
          <div class="detail-main-image">
            <img src="${images[0]}" alt="${prompt.title}" id="main-preview-image">
          </div>
          <div class="detail-thumbnails">
            ${images.map((img, i) => `
              <div class="detail-thumbnail ${i === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this)">
                <img src="${img}" alt="縮圖">
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  } else {
    imageContainer.innerHTML = `<div class="no-image">🍌</div>`;
  }

  // Change favorite button to "View on GitHub"
  const favBtn = document.getElementById('detail-favorite');
  favBtn.innerHTML = `<span class="heart">↗</span> GitHub`;
  favBtn.title = '在 GitHub 上查看';

  openModal('detail-overlay');
}

function switchDetailImage(src, element) {
  document.getElementById('main-preview-image').src = src;
  document.querySelectorAll('.detail-thumbnail').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
}

function openCurrentIssue() {
  const prompt = prompts.find(p => p.id === currentPromptId);
  if (prompt && prompt.issueUrl) {
    window.open(prompt.issueUrl, '_blank');
  }
}

// ==========================================
// Actions
// ==========================================
function quickCopy(id) {
  const prompt = prompts.find(p => p.id === id);
  if (prompt) {
    copyToClipboard(prompt.prompt);
  }
}

function copyCurrentPrompt() {
  const prompt = prompts.find(p => p.id === currentPromptId);
  if (prompt) {
    copyToClipboard(prompt.prompt);
  }
}

function openSubmitPage() {
  const { owner, repo } = GITHUB_CONFIG;
  const url = `https://github.com/${owner}/${repo}/issues/new?template=prompt-submission.yml`;
  window.open(url, '_blank');
}

// ==========================================
// Utilities
// ==========================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('已複製到剪貼簿 📋');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('已複製到剪貼簿 📋');
  });
}

// ==========================================
// Toast
// ==========================================
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toast-icon');
  const msg = document.getElementById('toast-message');

  icon.textContent = type === 'success' ? '✓' : '✕';
  msg.textContent = message;
  toast.classList.add('show');
  toast.classList.toggle('error', type === 'error');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
