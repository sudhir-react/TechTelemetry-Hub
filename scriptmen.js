// ==========================================================================
// 📡 TECHTELEMETRY ENGINE INTERCEPTOR FOR INTERACTIVE SPA ROUTER
// ==========================================================================

let currentLanguage = "en"; // Global translation state tracker

document.addEventListener("DOMContentLoaded", () => {
  initializeApplicationCore();
});

function initializeApplicationCore() {
  // Mount language switch listeners securely
  const btnEn = document.getElementById("btn-en");
  const btnHi = document.getElementById("btn-hi");

  if (btnEn && btnHi) {
    btnEn.addEventListener("click", () => switchLanguageMatrix("en"));
    btnHi.addEventListener("click", () => switchLanguageMatrix("hi"));
  }

  // Render the complete unified grid on initial boot
  renderUnifiedWorkspaceGrid();
}

function switchLanguageMatrix(targetLang) {
  currentLanguage = targetLang;

  // Toggle active classes on visual switcher buttons
  document
    .getElementById("btn-en")
    ?.classList.toggle("active", targetLang === "en");
  document
    .getElementById("btn-hi")
    ?.classList.toggle("active", targetLang === "hi");

  // Re-render strings dynamically across all nodes smoothly
  renderUnifiedWorkspaceGrid();
}

function renderUnifiedWorkspaceGrid() {
  const workspaceRoot = document.getElementById("dynamic-workspace-node");
  if (!workspaceRoot) return;

  // 🧱 STEP 1: Building the full responsive Multi-Column Sidebar layout structure dynamically
  workspaceRoot.innerHTML = `
        <div class="blog-workspace-matrix">
            <!-- 📄 Left Side: 70% Articles Stream -->
            <div id="articles-container" class="main-articles-track"></div>

            <!-- 📡 Right Side: 30% Glassmorphism Live News Sidebar -->
            <aside class="tech-telemetry-sidebar">
                <h2 class="sidebar-header">
                    <span class="pulse-indicator"></span> 
                    ${currentLanguage === "en" ? "Real-Time Telemetry Audit Feed" : "ताज़ा तकनीकी ऑडिट फीड"}
                </h2>
                <div id="live-news-feed-target" class="news-feed-scroller">
                    <!-- News items append here dynamically -->
                </div>
                
                <!-- 🏢 MICROSERVICE CROSS-NAVIGATION CROSSOVER INTERCEPTOR -->
                <div style="background: rgba(59, 130, 246, 0.1); border: 1px dashed #3b82f6; border-radius: 12px; padding: 1rem; margin-top: 1.5rem; text-align: left;">
                    <h4 style="color: #60a5fa; font-size: 0.88rem; margin-bottom: 6px; text-transform: uppercase; font-weight: 700;">
                        <i class="fa-solid fa-network-wired"></i> Backend AI Node
                    </h4>
                    <p style="color: #94a3b8; font-size: 0.8rem; line-height: 1.4; margin-bottom: 10px;">
                        Review Sudhir's standalone, cloud-certified Model Context Protocol (MCP) server managing 50 concurrent agents under a 6.0ms latency ceiling.
                    </p>
                    <a href="https://github.com" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #3b82f6; color: white; text-decoration: none; font-size: 0.82rem; font-weight: 700; padding: 6px 12px; border-radius: 6px; transition: background 0.2s ease;">
                        Access AI Vault <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                    </a>
                </div>
            </aside>
        </div>
    `;

  // 🧱 STEP 2: Ingesting and rendering the 8 Premium Telemetry Articles inside left track
  const articlesContainer = document.getElementById("articles-container");
  if (articlesContainer && typeof techBlogArticles !== "undefined") {
    techBlogArticles.forEach((article, index) => {
      const cardNode = document.createElement("div");
      cardNode.className = "blog-card";

      // Language selection tags logic
      const titleText =
        currentLanguage === "en" ? article.title : article.title_hi;
      const snippetText = article.snippet;

      cardNode.innerHTML = `
                <span class="card-tag">${article.category}</span>
                <h2 class="blog-feed-title" style="font-size: 1.35rem; margin-bottom: 12px; border:none; padding:0; text-align:left;">${titleText}</h2>
                <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 14px; text-align:left;">${snippetText}</p>
                <div class="card-meta" style="text-align:left;">
                    <i class="fa-regular fa-calendar"></i> ${article.date} | <i class="fa-regular fa-user"></i> By Sudhir Mishra
                </div>
            `;

      // 🔑 THE SYSTEM FIX: Attaching the live dynamic SPA route listener to pop open the full article
      cardNode.addEventListener("click", () => {
        renderIndividualArticleView(article);
      });

      articlesContainer.appendChild(cardNode);
    });
  }

  // 🧱 STEP 3: Ingesting and rendering the 3 Global Tech News Nodes inside right sidebar target
  const newsContainer = document.getElementById("live-news-feed-target");
  if (newsContainer && typeof liveTechNewsFeed !== "undefined") {
    liveTechNewsFeed.forEach((newsItem) => {
      const newsCard = document.createElement("div");
      newsCard.className = "news-card-node";

      const newsTitle =
        currentLanguage === "en" ? newsItem.title_en : newsItem.title_hi;
      const newsSummary =
        currentLanguage === "en" ? newsItem.summary_en : newsItem.summary_hi;

      newsCard.innerHTML = `
                <span class="news-tag">${newsItem.badge}</span>
                <h4 class="news-card-title">${newsTitle}</h4>
                <p class="news-card-summary">${newsSummary}</p>
            `;
      newsContainer.appendChild(newsCard);
    });
  }
}
// 🔑 DYNAMIC ROUTER EXTENSION: Renders full structural article content cleanly with a back interceptor
// ⚡ ULTIMATE HIGH-CONTRAST VISUAL ENFORCEMENT BY PRINCIPAL ARCHITECT SUDHIR KUMAR MISHRA | NOV 1, 2026
function renderIndividualArticleView(article) {
  const workspaceRoot = document.getElementById("dynamic-workspace-node");
  if (!workspaceRoot) return;

  const titleText = currentLanguage === "en" ? article.title : article.title_hi;
  
  // 🔒 SECURED INBOUND LANGUAGE CONFIGURATION MATRIX
  let contentBody = "";
  if (currentLanguage === "en") {
    contentBody = article.content_en ? article.content_en : (article.content ? article.content : article.snippet);
  } else {
    contentBody = article.content_hi ? article.content_hi : (article.content ? article.content : article.snippet);
  }

  workspaceRoot.innerHTML = `
        <div class="article-content" style="max-width: 900px; margin: 0 auto; padding: 2.5rem; text-align: left; background: #0b1120 !important; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); margin-top: 2rem;">
            
            <!-- 🔙 Dynamic Navigation Return Ingress (Deep Dark Industrial Theme Button) -->
            <div id="spa-back-btn" class="back-link-btn" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8 !important; border: 1px solid rgba(56, 189, 248, 0.4); padding: 0.6rem 1.35rem; border-radius: 8px; font-weight: 700; cursor: pointer; margin-bottom: 2.5rem; display: inline-flex; align-items: center; gap: 8px; font-size: 0.9rem; transition: all 0.2s;">
                <i class="fa-solid fa-arrow-left"></i> ${currentLanguage === "en" ? "Back to Operations Dashboard" : "डैशबोर्ड पर वापस जाएं"}
            </div>
            
            <br>
            <span class="card-tag" style="background: rgba(16, 185, 129, 0.15); color: #10b981 !important; font-size: 0.75rem; font-weight: 800; padding: 0.4rem 1rem; border-radius: 9999px; text-transform: uppercase; border: 1px solid rgba(16, 185, 129, 0.3); letter-spacing: 0.05em;">
                ${article.category}
            </span>
            
            <!-- 👑 BULLETPROOF TITLE COLOR INLINE FORCING -->
            <h1 style="font-size: 2.25rem; font-weight: 900; color: #ffffff !important; margin-top: 1.5rem; margin-bottom: 1.5rem; line-height: 1.3; text-shadow: 0 2px 4px rgba(0,0,0,0.5); text-align: left; font-family: system-ui, -apple-system, sans-serif; border: none !important; padding: 0 !important;">
                ${titleText}
            </h1>
            
            <div class="card-meta" style="color: #64748b !important; font-size: 0.88rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.25rem; font-weight: 600;">
                <i class="fa-regular fa-calendar"></i> ${article.date} | <i class="fa-regular fa-user"></i> By Sudhir Mishra
            </div>
            
            <!-- 🔑 THE CRITICAL RENDERING BODY (Strict Overrides Added for Inner HTML Tags) -->
            <div class="article-body" style="color: #f1f5f9 !important; font-size: 1.05rem; line-height: 1.85; text-align: left; font-family: system-ui, -apple-system, sans-serif;">
                <style>
                    /* Force absolute high contrast colors across all dynamically injected nodes */
                    .markdown-rich-text p { color: #e2e8f0 !important; font-size: 1.05rem !important; line-height: 1.85 !important; margin-bottom: 1.25rem !important; text-align: left !important; }
                    .markdown-rich-text h3 { color: #38bdf8 !important; font-size: 1.5rem !important; font-weight: 800 !important; margin-top: 2rem !important; margin-bottom: 1rem !important; text-align: left !important; }
                    .markdown-rich-text div.code-telemetry-box { color: #38bdf8 !important; }
                    .markdown-rich-text code { background: rgba(255,255,255,0.06) !important; color: #f43f5e !important; padding: 0.2rem 0.4rem !important; border-radius: 4px !important; font-family: monospace !important; }
                </style>
                <div class="markdown-rich-text" style="text-align: left; color: #f1f5f9 !important;">
                    ${contentBody}
                </div>
            </div>
        </div>
    `;

  // Bind back click logic cleanly to return to original main multi-column dashboard
  document.getElementById("spa-back-btn")?.addEventListener("click", () => {
    renderUnifiedWorkspaceGrid();
  });

  // Smooth window scroll sweep up to ensure perfect visual alignment
  window.scrollTo({ top: 0, behavior: "smooth" });
}

