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
function renderIndividualArticleView(article) {
  const workspaceRoot = document.getElementById("dynamic-workspace-node");
  if (!workspaceRoot) return;

  const titleText = currentLanguage === "en" ? article.title : article.title_hi;
  const contentBody =
    currentLanguage === "en"
      ? article.content || article.snippet
      : article.content_hi || article.snippet;

  workspaceRoot.innerHTML = `
        <div class="article-content">
            <div id="spa-back-btn" class="back-link-btn">
                <i class="fa-solid fa-arrow-left"></i> ${currentLanguage === "en" ? "Back to Operations Dashboard" : "डैशबोर्ड पर वापस जाएं"}
            </div>
            
            <span class="card-tag">${article.category}</span>
            <h1 class="blog-feed-title" style="margin-bottom: 20px;">${titleText}</h1>
            
            <div class="card-meta" style="margin-bottom: 30px;">
                <i class="fa-regular fa-calendar"></i> ${article.date} | <i class="fa-regular fa-user"></i> By Sudhir Mishra
            </div>
            
            <div class="article-body">
                <p style="color: #334155; font-size: 1.15rem; line-height: 1.8; margin-bottom: 20px; text-align:left;">${contentBody}</p>
                
                <!-- Code Telemetry Metrics Representation Block -->
                <div class="code-telemetry-box">
                    // TechTelemetry High-Velocity Verification Logs<br>
                    [STATUS] PRODUCTION_VERIFIED // CORE_LATENCY: EXCELLENT
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
