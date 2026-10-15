// ==========================================================================
// 📡 TECHTELEMETRY ENGINE INTERCEPTOR COR INTERACTIVE SPA ROUTER
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
    document.getElementById("btn-en")?.classList.toggle("active", targetLang === "en");
    document.getElementById("btn-hi")?.classList.toggle("active", targetLang === "hi");

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
            </aside>
        </div>
    `;

    // 🧱 STEP 2: Ingesting and rendering the 8 Premium Telemetry Articles inside left track
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer) {
        techBlogArticles.forEach(article => {
            const cardNode = document.createElement("div");
            cardNode.className = "blog-card";
            
            // Language selection tags logic
            const titleText = currentLanguage === "en" ? article.title : article.title_hi;
            const snippetText = article.snippet;

            cardNode.innerHTML = `
                <span class="card-tag">${article.category}</span>
                <h2 class="blog-feed-title" style="font-size: 1.35rem; margin-bottom: 12px; border:none; padding:0;">${titleText}</h2>
                <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 14px;">${snippetText}</p>
                <div class="card-meta">
                    <i class="fa-regular fa-calendar"></i> ${article.date} | <i class="fa-regular fa-user"></i> By Sudhir Mishra
                </div>
            `;
            articlesContainer.appendChild(cardNode);
        });
    }

    // 🧱 STEP 3: Ingesting and rendering the 3 Global Tech News Nodes inside right sidebar target
    const newsContainer = document.getElementById("live-news-feed-target");
    if (newsContainer && typeof liveTechNewsFeed !== "undefined") {
        liveTechNewsFeed.forEach(newsItem => {
            const newsCard = document.createElement("div");
            newsCard.className = "news-card-node";

            const newsTitle = currentLanguage === "en" ? newsItem.title_en : newsItem.title_hi;
            const newsSummary = currentLanguage === "en" ? newsItem.summary_en : newsItem.summary_hi;

            newsCard.innerHTML = `
                <span class="news-tag">${newsItem.badge}</span>
                <h4 class="news-card-title">${newsTitle}</h4>
                <p class="news-card-summary">${newsSummary}</p>
            `;
            newsContainer.appendChild(newsCard);
        });
    }
}
