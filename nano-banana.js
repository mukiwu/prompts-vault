/**
 * 🍌 Nano Banana Prompts Vault
 * A friendly prompt collection tool powered by GitHub Issues
 */

// ==========================================
// Google Analytics Event Tracking
// ==========================================
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

// ==========================================
// GitHub Configuration
// ==========================================
const GITHUB_CONFIG = {
  owner: 'mukiwu',           // GitHub 用戶名
  repo: 'prompts-vault',     // Repository 名稱
  label: 'approved'          // 只顯示有這個 label 的 Issues
};

// ==========================================
// i18n (Internationalization)
// ==========================================
let currentLang = localStorage.getItem('lang') || 'zh-TW';

const i18n = {
  'zh-TW': {
    // Header
    searchPlaceholder: '搜尋提示詞...',
    addPrompt: '新增提示詞',
    // Categories
    all: '全部',
    portrait: '人像角色',
    photoEdit: '照片編輯',
    style: '風格轉換',
    design: '創意設計',
    product: '產品攝影',
    // Stats
    prompts: '提示詞',
    favorites: '讚',
    copies: '本月新增',
    // Card & Detail
    copy: '複製',
    copied: '已複製到剪貼簿 📋',
    author: '來源：',
    promptLabel: '✨ 提示詞',
    viewOnGitHub: 'GitHub',
    edit: '✏️ 編輯',
    delete: '🗑️ 刪除',
    // Loading states
    loading: '載入中...',
    loadingImage: '載入圖片中...',
    loadFailed: '載入失敗，請稍後再試',
    retry: '重新載入',
    // Empty state
    noPrompts: '還沒有提示詞',
    noPromptsHint: '點擊「新增提示詞」開始收集你的創意',
    addFirstPrompt: '+ 新增第一個提示詞',
    // View
    gridView: '網格檢視',
    listView: '列表檢視',
    // CTA & Banners
    sharePrompt: '✨ 歡迎分享你的提示詞',
    topBanner: '💬 有任何建議或想法？歡迎聯繫 MUKI',
    bottomBanner: '🍌 喜歡這個網站嗎？追蹤 MUKI 獲取更多資訊',
    // Comments
    comments: '留言',
    reply: '回應',
    loadingComments: '載入留言中...',
    noComments: '還沒有留言，來當第一個吧！',
    // Issue template
    issueTemplate: 'prompt-submission.yml'
  },
  'en': {
    // Header
    searchPlaceholder: 'Search prompts...',
    addPrompt: 'Add Prompt',
    // Categories
    all: 'All',
    portrait: 'Portrait',
    photoEdit: 'Photo Edit',
    style: 'Style Transfer',
    design: 'Design',
    product: 'Product',
    // Stats
    prompts: 'Prompts',
    favorites: 'Likes',
    copies: 'This Month',
    // Card & Detail
    copy: 'Copy',
    copied: 'Copied to clipboard 📋',
    author: 'By: ',
    promptLabel: '✨ Prompt',
    viewOnGitHub: 'GitHub',
    edit: '✏️ Edit',
    delete: '🗑️ Delete',
    // Loading states
    loading: 'Loading...',
    loadingImage: 'Loading image...',
    loadFailed: 'Failed to load. Please try again.',
    retry: 'Retry',
    // Empty state
    noPrompts: 'No prompts yet',
    noPromptsHint: 'Click "Add Prompt" to start collecting your ideas',
    addFirstPrompt: '+ Add First Prompt',
    // View
    gridView: 'Grid View',
    listView: 'List View',
    // CTA & Banners
    sharePrompt: '✨ Share your prompt',
    topBanner: '💬 Have suggestions or ideas? Contact MUKI',
    bottomBanner: '🍌 Like this site? Follow MUKI for more',
    // Comments
    comments: 'Comments',
    reply: 'Reply',
    loadingComments: 'Loading comments...',
    noComments: 'No comments yet. Be the first!',
    // Issue template
    issueTemplate: 'prompt-submission-en.yml'
  }
};

// Get translation
function t(key) {
  return i18n[currentLang]?.[key] || i18n['zh-TW'][key] || key;
}

// Switch language
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUILanguage();
}

// Toggle language
function toggleLanguage() {
  const newLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
  trackEvent('switch_language', { language: newLang });
  switchLanguage(newLang);
}

// Update all UI text based on current language
function updateUILanguage() {
  // Update language button
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.textContent = currentLang === 'zh-TW' ? 'EN' : '中';
    langBtn.title = currentLang === 'zh-TW' ? 'Switch to English' : '切換為中文';
  }

  // Update search placeholder
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = t('searchPlaceholder');
  }

  // Update add button
  const addBtnText = document.querySelector('#add-btn span:last-child');
  if (addBtnText) {
    addBtnText.textContent = t('addPrompt');
  }

  // Update category pills
  const categoryKeys = ['all', 'portrait', 'photoEdit', 'style', 'design', 'product'];
  const pills = document.querySelectorAll('.pill');
  pills.forEach((pill, index) => {
    const textNode = pill.childNodes[pill.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = ' ' + t(categoryKeys[index]);
    }
  });

  // Update stat labels
  const statLabels = document.querySelectorAll('.stat-label');
  const statKeys = ['prompts', 'favorites', 'copies'];
  statLabels.forEach((label, index) => {
    label.textContent = t(statKeys[index]);
  });

  // Update view buttons
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    if (btn.dataset.view === 'grid') {
      btn.title = t('gridView');
    } else if (btn.dataset.view === 'list') {
      btn.title = t('listView');
    }
  });

  // Update empty state if visible
  const emptyState = document.getElementById('empty-state');
  if (emptyState && emptyState.style.display !== 'none') {
    emptyState.querySelector('h3').textContent = t('noPrompts');
    emptyState.querySelector('p').textContent = t('noPromptsHint');
    emptyState.querySelector('.empty-add-btn').textContent = t('addFirstPrompt');
  }

  // Update share prompt CTA
  const sharePromptText = document.getElementById('ad-submit-text');
  if (sharePromptText) {
    sharePromptText.textContent = t('sharePrompt');
  }

  // Update top banner
  const topBannerText = document.getElementById('ad-top-text');
  if (topBannerText) {
    topBannerText.textContent = t('topBanner');
  }

  // Update bottom banner
  const bottomBannerText = document.getElementById('ad-bottom-text');
  if (bottomBannerText) {
    bottomBannerText.textContent = t('bottomBanner');
  }

  // Re-render prompts to update card text
  if (prompts.length > 0) {
    renderPrompts();
  }
}

// ==========================================
// State
// ==========================================
let prompts = [];
let currentFilter = 'all';
let searchQuery = '';
let currentPromptId = null;
let currentView = 'grid';
let isLoading = false;
let currentPage = 1;
const ITEMS_PER_PAGE = 24;

// ==========================================
// Category Mapping (supports both languages)
// ==========================================
const categoryNames = {
  'portrait': '◉ 人像角色',
  'photo-edit': '◈ 照片編輯',
  'style': '❖ 風格轉換',
  'design': '★ 創意設計',
  'product': '▣ 產品攝影'
};

const categoryNamesEn = {
  'portrait': '◉ Portrait',
  'photo-edit': '◈ Photo Edit',
  'style': '❖ Style Transfer',
  'design': '★ Design',
  'product': '▣ Product'
};

function getCategoryName(key) {
  const names = currentLang === 'en' ? categoryNamesEn : categoryNames;
  return names[key] || key;
}

const categoryIcons = {
  'portrait': '◉',
  'photo-edit': '◈',
  'style': '❖',
  'design': '★',
  'product': '▣'
};

// ==========================================
// Image Proxy for thumbnails (resize & optimize)
// ==========================================
// Use wsrv.nl free image proxy service for thumbnails
// This reduces load time significantly for large images
function getThumbnailUrl(originalUrl, width = 400) {
  if (!originalUrl) return '';
  // wsrv.nl is a free image CDN that supports resize
  // Parameters: w=width, q=quality, we=webp-auto
  return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&q=80&we`;
}

function getOptimizedUrl(originalUrl, width = 800) {
  if (!originalUrl) return '';
  return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&q=85&we`;
}

const categoryMap = {
  // Chinese
  '人像角色': 'portrait',
  '照片編輯': 'photo-edit',
  '風格轉換': 'style',
  '創意設計': 'design',
  '產品攝影': 'product',
  // English
  'Portrait & Character': 'portrait',
  'Photo Editing': 'photo-edit',
  'Style Transfer': 'style',
  'Creative Design': 'design',
  'Product Photography': 'product'
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
  updateUILanguage();
  loadPromptsFromGitHub();
  
  // Handle initial route
  handleRoute();
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
      <p>${t('loading')}</p>
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
        <p>${t('loadFailed')}</p>
        <button class="retry-btn" onclick="loadPromptsFromGitHub()">${t('retry')}</button>
      </div>
    `;
  }
}

function parseIssueToPrompt(issue) {
  try {
    const body = issue.body || '';

    // Parse the Issue body (from GitHub Issue Form)
    const getValue = (label) => {
      const regex = new RegExp(`### ${label}\\s*\\n([\\s\\S]*?)(?=\\n*###|$)`, 'i');
      const match = body.match(regex);
      if (!match) return '';
      // Clean up the value - remove empty lines and trim
      let value = match[1].trim();
      // Remove any ### headers that might have been captured
      value = value.replace(/^###.*$/gm, '').trim();
      // Return empty if value is just whitespace or newlines
      if (!value || /^\s*$/.test(value)) return '';
      return value;
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
      author: (author && author !== '_No response_' && author.trim()) ? author.trim() : '',
      authorUrl: (authorUrl && authorUrl !== '_No response_' && authorUrl.trim()) ? authorUrl.trim() : '',
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
      currentPage = 1; // Reset to first page
      trackEvent('filter_category', { category: currentFilter });
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
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    currentPage = 1; // Reset to first page
    renderPrompts();
    // Debounced search tracking
    clearTimeout(searchTimeout);
    if (searchQuery) {
      searchTimeout = setTimeout(() => {
        trackEvent('search', { search_term: searchQuery });
      }, 1000);
    }
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
  document.getElementById('detail-edit').addEventListener('click', editCurrentIssue);
  document.getElementById('detail-reply').addEventListener('click', replyCurrentIssue);
  document.getElementById('detail-delete').addEventListener('click', deleteCurrentIssue);
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
    hidePagination();
    return;
  }

  emptyState.style.display = 'none';
  
  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPrompts = filtered.slice(startIndex, endIndex);
  
  container.innerHTML = paginatedPrompts.map(renderPromptCard).join('');
  
  // Render pagination
  renderPagination(currentPage, totalPages, filtered.length);
}

function renderPromptCard(prompt) {
  const icon = categoryIcons[prompt.category] || '✦';
  const hasImage = prompt.images && prompt.images.length > 0;
  const imageCount = prompt.images?.length || 0;

  return `
    <div class="prompt-card" onclick="openDetail(${prompt.id})">
      <div class="card-image ${!hasImage ? 'no-image' : ''}" id="card-image-${prompt.id}">
        ${hasImage
      ? `<div class="image-loader">
           <div class="spinner"></div>
           <span class="loader-text">${t('loading').replace('...', '')}</span>
         </div>
         <img src="${getThumbnailUrl(prompt.images[0])}" alt="${prompt.title}" loading="lazy" onload="onImageLoad(this, ${prompt.id})" onerror="onImageError(this, ${prompt.id})">`
      : `<span class="card-placeholder">🍌</span>`
    }
        ${imageCount > 1 ? `<span class="card-image-count">+${imageCount - 1}</span>` : ''}
        ${prompt.reactions > 0 ? `<span class="card-reactions">👍 ${prompt.reactions}</span>` : ''}
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

// ==========================================
// Pagination
// ==========================================

function renderPagination(current, total, totalItems) {
  const container = document.getElementById('pagination');
  if (!container) return;
  
  if (total <= 1) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'flex';
  
  const prevDisabled = current <= 1;
  const nextDisabled = current >= total;
  
  // Generate page numbers
  let pageNumbers = [];
  const maxVisible = 5;
  
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pageNumbers.push(i);
  } else {
    if (current <= 3) {
      pageNumbers = [1, 2, 3, 4, '...', total];
    } else if (current >= total - 2) {
      pageNumbers = [1, '...', total - 3, total - 2, total - 1, total];
    } else {
      pageNumbers = [1, '...', current - 1, current, current + 1, '...', total];
    }
  }
  
  const pageNumbersHtml = pageNumbers.map(p => {
    if (p === '...') {
      return `<span class="page-dots">...</span>`;
    }
    return `<button class="page-num ${p === current ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>`;
  }).join('');
  
  const prevText = currentLang === 'zh-TW' ? '上一頁' : 'Prev';
  const nextText = currentLang === 'zh-TW' ? '下一頁' : 'Next';
  const pageInfo = currentLang === 'zh-TW' 
    ? `共 ${totalItems} 個提示詞` 
    : `${totalItems} prompts`;
  
  container.innerHTML = `
    <button class="page-btn prev" onclick="goToPage(${current - 1})" ${prevDisabled ? 'disabled' : ''}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      ${prevText}
    </button>
    <div class="page-numbers">
      ${pageNumbersHtml}
    </div>
    <button class="page-btn next" onclick="goToPage(${current + 1})" ${nextDisabled ? 'disabled' : ''}>
      ${nextText}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    <span class="page-info">${pageInfo}</span>
  `;
}

function hidePagination() {
  const container = document.getElementById('pagination');
  if (container) {
    container.style.display = 'none';
  }
}

function goToPage(page) {
  currentPage = page;
  renderPrompts();
  // Scroll to top of prompts container, accounting for fixed header height (76.2px + some padding)
  const container = document.getElementById('prompts-container');
  const headerHeight = 80;
  const targetPosition = container.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

// Image loading handlers
function onImageLoad(img, id) {
  img.classList.add('loaded');
  const container = document.getElementById(`card-image-${id}`);
  if (container) {
    container.classList.add('loaded');
  }
}

function onImageError(img, id) {
  // Replace with placeholder on error
  const container = document.getElementById(`card-image-${id}`);
  if (container) {
    container.innerHTML = '<span class="card-placeholder">🍌</span>';
    container.classList.add('no-image');
  }
}

// Detail modal image loading handlers
function onDetailImageLoad(img) {
  img.classList.add('loaded');
  const loader = img.parentElement?.querySelector('.detail-image-loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

function onDetailImageError(img) {
  const loader = img.parentElement?.querySelector('.detail-image-loader');
  if (loader) {
    loader.innerHTML = '<span class="card-placeholder">🍌</span>';
  }
  img.style.display = 'none';
}

function updateStats() {
  const totalPromptsEl = document.getElementById('total-prompts');
  const totalReactionsEl = document.getElementById('total-favorites');
  const thisMonthEl = document.getElementById('total-copies');

  if (totalPromptsEl) totalPromptsEl.textContent = prompts.length;

  // Total reactions (likes) across all prompts
  const totalReactions = prompts.reduce((sum, p) => sum + (p.reactions || 0), 0);
  if (totalReactionsEl) totalReactionsEl.textContent = totalReactions;

  // Count prompts created this month
  const now = new Date();
  const thisMonth = prompts.filter(p => {
    const created = new Date(p.createdAt);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
  if (thisMonthEl) thisMonthEl.textContent = thisMonth;
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
  
  // Clear URL hash when closing detail modal
  if (id === 'detail-overlay' && window.location.hash.startsWith('#/prompt/')) {
    history.pushState({}, '', window.location.pathname);
  }
}

// ==========================================
// ==========================================
// Routing
// ==========================================

function updateURL(id) {
  if (id) {
    history.pushState({ promptId: id }, '', `#/prompt/${id}`);
  } else {
    history.pushState({}, '', window.location.pathname);
  }
}

function handleRoute() {
  const hash = window.location.hash;
  const match = hash.match(/^#\/prompt\/(\d+)$/);
  
  if (match) {
    const promptId = parseInt(match[1], 10);
    // Wait for prompts to load if needed
    if (prompts.length > 0) {
      openDetailFromRoute(promptId);
    } else {
      // Prompts not loaded yet, wait and retry
      const checkInterval = setInterval(() => {
        if (prompts.length > 0) {
          clearInterval(checkInterval);
          openDetailFromRoute(promptId);
        }
      }, 100);
      // Timeout after 5 seconds
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }
}

function openDetailFromRoute(id) {
  const prompt = prompts.find(p => p.id === id);
  if (prompt) {
    openDetail(id, true); // true = from route, don't update URL
  }
}

// Listen for browser back/forward
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.promptId) {
    openDetailFromRoute(e.state.promptId);
  } else {
    // Close modal if open
    const overlay = document.getElementById('detail-overlay');
    if (overlay && overlay.classList.contains('active')) {
      closeModal('detail-overlay');
    }
  }
});

// ==========================================
// Detail View
// ==========================================
function openDetail(id, fromRoute = false) {
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return;

  currentPromptId = id;
  
  // Update URL (unless coming from route)
  if (!fromRoute) {
    updateURL(id);
  }
  
  trackEvent('view_prompt', {
    prompt_id: id,
    prompt_title: prompt.title,
    category: prompt.category
  });

  document.getElementById('detail-title').textContent = prompt.title;
  document.getElementById('detail-category').textContent = getCategoryName(prompt.category);
  document.getElementById('detail-prompt').textContent = prompt.prompt;

  // Author info - only show if author name exists and is not empty
  const authorContainer = document.getElementById('detail-author');
  const authorName = prompt.author?.trim();
  if (authorName && authorName.length > 0) {
    let authorHtml = `<span class="author-label">${t('author')}</span>`;
    if (prompt.authorUrl?.trim()) {
      authorHtml += `<a href="${prompt.authorUrl}" target="_blank" rel="noopener noreferrer" class="author-link">${escapeHtml(authorName)}</a>`;
    } else {
      authorHtml += `<span class="author-name">${escapeHtml(authorName)}</span>`;
    }
    authorContainer.innerHTML = authorHtml;
    authorContainer.style.display = 'flex';
  } else {
    authorContainer.innerHTML = '';
    authorContainer.style.display = 'none';
  }

  // Tags
  document.getElementById('detail-tags').innerHTML = prompt.tags.map(t =>
    `<span class="detail-tag">#${escapeHtml(t)}</span>`
  ).join('');

  // Images
  const imageContainer = document.getElementById('detail-image');
  const images = prompt.images || [];
  // Store images for lightbox
  window.currentDetailImages = images;

  if (images.length > 0) {
    if (images.length === 1) {
      imageContainer.innerHTML = `
        <div class="detail-image-loader">
          <div class="spinner"></div>
          <span>${t('loadingImage')}</span>
        </div>
        <img src="${getOptimizedUrl(images[0])}" alt="${prompt.title}" 
             class="detail-clickable-image"
             onclick="openLightbox(window.currentDetailImages, 0)"
             onload="onDetailImageLoad(this)" onerror="onDetailImageError(this)">
      `;
    } else {
      imageContainer.innerHTML = `
        <div class="detail-image-gallery">
          <div class="detail-main-image">
            <div class="detail-image-loader">
              <div class="spinner"></div>
              <span>${t('loadingImage')}</span>
            </div>
            <img src="${getOptimizedUrl(images[0])}" alt="${prompt.title}" id="main-preview-image"
                 class="detail-clickable-image"
                 onclick="openLightboxAtCurrent()"
                 onload="onDetailImageLoad(this)" onerror="onDetailImageError(this)">
          </div>
          <div class="detail-thumbnails">
            ${images.map((img, i) => `
              <div class="detail-thumbnail ${i === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this, ${i})">
                <img src="${getThumbnailUrl(img, 100)}" alt="">
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  } else {
    imageContainer.innerHTML = `<div class="no-image">🍌</div>`;
  }

  // Change favorite button to show reactions and link to GitHub
  const favBtn = document.getElementById('detail-favorite');
  const reactionCount = prompt.reactions || 0;
  const likeText = currentLang === 'zh-TW' ? '讚' : 'Like';
  favBtn.innerHTML = `<span class="heart">👍</span> ${likeText} ${reactionCount > 0 ? `(${reactionCount})` : ''}`;
  favBtn.title = currentLang === 'zh-TW' ? '在 GitHub 上按讚' : 'Like on GitHub';

  // Update reply button text
  document.getElementById('detail-reply-text').textContent = t('reply');

  // Update comments section UI text
  document.getElementById('comments-title').textContent = t('comments');
  
  // Reset comments list with loading state
  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = `
    <div class="comments-loading">
      <div class="spinner"></div>
      <span>${t('loadingComments')}</span>
    </div>
  `;

  // Load comments
  loadComments(id);

  openModal('detail-overlay');
}

// Track current image index for multi-image view
let currentDetailImageIndex = 0;

// ==========================================
// Comments
// ==========================================

// Simple Markdown renderer
function renderMarkdown(text) {
  if (!text) return '';
  
  let html = escapeHtml(text);
  
  // Code blocks (```)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  // Inline code (`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Bold (**text** or __text__)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Italic (*text* or _text_)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Strikethrough (~~text~~)
  html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Images ![alt](url) - render as links to avoid loading issues
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">🖼️ $1</a>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  
  return html;
}

// Toggle comments section
function toggleComments() {
  const section = document.getElementById('detail-comments');
  section.classList.toggle('collapsed');
}

// Load comments for an issue
async function loadComments(issueId) {
  const commentsList = document.getElementById('comments-list');
  
  try {
    const { owner, repo } = GITHUB_CONFIG;
    // Add timestamp to prevent caching (don't use Cache-Control header as it causes CORS issues)
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}/comments?_t=${Date.now()}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to load comments');
    }
    
    const comments = await response.json();
    const commentsSection = document.getElementById('detail-comments');
    
    // Hide entire section if no comments
    if (comments.length === 0) {
      commentsSection.style.display = 'none';
      return;
    }
    
    // Show section and update count in header
    commentsSection.style.display = 'block';
    document.getElementById('comments-title').textContent = `💬 ${t('comments')} (${comments.length})`;
    
    commentsList.innerHTML = comments.map(comment => `
      <div class="comment">
        <div class="comment-header">
          <a href="${comment.user.html_url}" target="_blank" rel="noopener noreferrer" class="comment-author">
            <img src="${comment.user.avatar_url}" alt="${comment.user.login}" class="comment-avatar">
            <span class="comment-name">${escapeHtml(comment.user.login)}</span>
          </a>
          <span class="comment-date">${formatDate(comment.created_at)}</span>
        </div>
        <div class="comment-body">
          ${renderMarkdown(comment.body)}
        </div>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Error loading comments:', error);
    // Hide section on error
    document.getElementById('detail-comments').style.display = 'none';
  }
}

// Format date for comments
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return currentLang === 'zh-TW' ? `${diffMins} 分鐘前` : `${diffMins}m ago`;
    }
    return currentLang === 'zh-TW' ? `${diffHours} 小時前` : `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return currentLang === 'zh-TW' ? `${diffDays} 天前` : `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString(currentLang === 'zh-TW' ? 'zh-TW' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

function openLightboxAtCurrent() {
  openLightbox(window.currentDetailImages, currentDetailImageIndex);
}

function switchDetailImage(src, element, index = 0) {
  currentDetailImageIndex = index;
  const mainImage = document.getElementById('main-preview-image');
  const loader = document.querySelector('.detail-main-image .detail-image-loader');

  // Show loading state
  mainImage.classList.remove('loaded');
  if (loader) {
    loader.style.display = 'flex';
  }

  // Update active thumbnail
  document.querySelectorAll('.detail-thumbnail').forEach(t => t.classList.remove('active'));
  element.classList.add('active');

  // Load new image
  const newSrc = getOptimizedUrl(src);
  mainImage.onload = function () {
    mainImage.classList.add('loaded');
    if (loader) {
      loader.style.display = 'none';
    }
  };
  mainImage.onerror = function () {
    if (loader) {
      loader.innerHTML = '<span class="card-placeholder">🍌</span>';
    }
    mainImage.style.display = 'none';
  };
  mainImage.src = newSrc;
}

function openCurrentIssue() {
  const prompt = prompts.find(p => p.id === currentPromptId);
  if (prompt && prompt.issueUrl) {
    trackEvent('like_prompt', {
      prompt_id: currentPromptId,
      prompt_title: prompt.title
    });
    window.open(prompt.issueUrl, '_blank');
  }
}

function editCurrentIssue() {
  const prompt = prompts.find(p => p.id === currentPromptId);
  if (prompt && prompt.issueUrl) {
    // GitHub Issue edit URL format
    window.open(prompt.issueUrl, '_blank');
  }
}

function replyCurrentIssue() {
  if (currentPromptId) {
    const { owner, repo } = GITHUB_CONFIG;
    const url = `https://github.com/${owner}/${repo}/issues/${currentPromptId}#issuecomment-new`;
    window.open(url, '_blank');
    trackEvent('reply_prompt', { prompt_id: currentPromptId });
  }
}

function deleteCurrentIssue() {
  const prompt = prompts.find(p => p.id === currentPromptId);
  if (prompt && prompt.issueUrl) {
    const confirmMsg = currentLang === 'zh-TW'
      ? '刪除需要到 GitHub 操作，確定要前往嗎？'
      : 'Delete requires GitHub access. Go to GitHub?';
    if (confirm(confirmMsg)) {
      window.open(prompt.issueUrl, '_blank');
    }
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
  trackEvent('add_prompt', { language: currentLang });
  const { owner, repo } = GITHUB_CONFIG;
  const template = t('issueTemplate');
  const url = `https://github.com/${owner}/${repo}/issues/new?template=${template}`;
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
  const prompt = prompts.find(p => p.id === currentPromptId);
  trackEvent('copy_prompt', {
    prompt_id: currentPromptId,
    prompt_title: prompt?.title || 'unknown'
  });
  navigator.clipboard.writeText(text).then(() => {
    showToast(t('copied'));
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(t('copied'));
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

// ==========================================
// Lightbox
// ==========================================
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, startIndex = 0) {
  if (!images || images.length === 0) return;
  
  lightboxImages = images;
  lightboxIndex = startIndex;
  
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-image');
  const loader = document.getElementById('lightbox-loader');
  const counter = document.getElementById('lightbox-counter');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  // Show loading, hide image
  img.classList.remove('loaded');
  if (loader) loader.classList.remove('hidden');
  
  // Load image
  img.onload = () => {
    img.classList.add('loaded');
    if (loader) loader.classList.add('hidden');
  };
  img.src = getOptimizedUrl(lightboxImages[lightboxIndex], 1200);
  
  // Update counter
  if (lightboxImages.length > 1) {
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    counter.style.display = 'block';
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
  } else {
    counter.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
  
  updateLightboxNav();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  trackEvent('open_lightbox', { image_count: lightboxImages.length });
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-image');
  const loader = document.getElementById('lightbox-loader');
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clear image after animation completes to prevent showing old image
  setTimeout(() => {
    img.src = '';
    img.classList.remove('loaded');
    if (loader) loader.classList.remove('hidden');
  }, 300);
}

function lightboxPrev() {
  if (lightboxIndex > 0) {
    lightboxIndex--;
    updateLightboxImage();
  }
}

function lightboxNext() {
  if (lightboxIndex < lightboxImages.length - 1) {
    lightboxIndex++;
    updateLightboxImage();
  }
}

function updateLightboxImage() {
  const img = document.getElementById('lightbox-image');
  const loader = document.getElementById('lightbox-loader');
  const counter = document.getElementById('lightbox-counter');
  
  // Show loading
  img.classList.remove('loaded');
  if (loader) loader.classList.remove('hidden');
  
  // Load new image
  img.onload = () => {
    img.classList.add('loaded');
    if (loader) loader.classList.add('hidden');
  };
  img.src = getOptimizedUrl(lightboxImages[lightboxIndex], 1200);
  
  counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  updateLightboxNav();
}

function updateLightboxNav() {
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  prevBtn.disabled = lightboxIndex === 0;
  nextBtn.disabled = lightboxIndex === lightboxImages.length - 1;
}

// Initialize lightbox event listeners
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);
  if (nextBtn) nextBtn.addEventListener('click', lightboxNext);
  
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox-overlay')?.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });
});
