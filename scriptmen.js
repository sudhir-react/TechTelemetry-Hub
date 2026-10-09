// ==========================================================================
// 💿 TECHTELEMETRY ROUTER ENGINE - DYNAMIC SINGLE PAGE APPLICATION CONTROLLER
// ==========================================================================

// Global Application State Tracker
let activeLanguage = localStorage.getItem('preferred_lang') || 'en';

// DOM Mount Coordinates Locator
const workspaceNode = document.getElementById("dynamic-workspace-node");
const btnEn = document.getElementById("btn-en");
const btnHi = document.getElementById("btn-hi");

// 🌐 1. MASTER SINGLE PAGE SPA ROUTER GRID
function telemetryAppRouter() {
    if (!workspaceNode) return;
    
    // Extracting the targeted hash path state parameter
    const currentHash = window.location.hash || '#feed';
    
    // Branch Ingestion Loop 1: Dynamic Article View Panel
    if (currentHash.startsWith('#article/')) {
        const articleId = currentHash.replace('#article/', '');
        const targetPost = techBlogArticles.find(post => post.id === articleId);
        
        if (targetPost) {
            renderArticleView(targetPost);
        } else {
            workspaceNode.innerHTML = `
                <div class="article-content" style="text-align: center;">
                    <a class="back-link-btn" onclick="window.location.hash='#feed'"><i class="fa-solid fa-arrow-left"></i> Back to Main Feed</a>
                    <h2 style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Error 404: Target Node Missing</h2>
                    <p style="color: #64748b;">The requested telemetry record could not be extracted from storage.</p>
                </div>`;
        }
    } 
    // Branch Ingestion Loop 2: Master Core Aggregate Feed Grid
    else {
        renderMainFeedView();
    }
}

// 📰 2. RENDER MASTER CORE AGGREGATE LOG FEED VIEW
function renderMainFeedView() {
    let headerText = activeLanguage === 'hi' ? 'ताज़ा तकनीकी ऑडिट फीड' : 'Latest Telemetry Audits';
    let feedHtml = `<h2 class="blog-feed-title">${headerText}</h2>`;
    
    techBlogArticles.forEach(post => {
        const activeTitle = activeLanguage === 'hi' ? post.title_hi : post.title;
        feedHtml += `
            <div class="blog-card" onclick="window.location.hash='#article/${post.id}'">
                <span class="card-tag">${post.category}</span>
                <h3 style="font-size: 1.4rem; margin: 6px 0; color: #0f172a; font-weight: 700;">${activeTitle}</h3>
                <p style="color: #475569; font-size: 1rem; margin: 8px 0 12px 0; line-height: 1.6;">${post.snippet}</p>
                <div class="card-meta">
                    <i class="fa-regular fa-calendar"></i> ${post.date} | <i class="fa-regular fa-user"></i> By Sudhir Mishra
                </div>
            </div>`;
    });
    
    workspaceNode.innerHTML = feedHtml;
}

// 💿 3. FIXED: RENDER DYNAMIC DETAILED ARTICLE WITH CORRECT VARIABLE MAPPING KEYS
function renderArticleView(post) {
    const activeTitle = activeLanguage === 'hi' ? post.title_hi : post.title;
    
    // 🔑 FIXED KEY MATCHING SIGNATURES: Bypassing the undefined token trap cleanly
    const activeContent = activeLanguage === 'hi' ? post.content_hi : post.content_en;
    const backBtnText = activeLanguage === 'hi' ? 'मुख्य फ़ीड पर वापस जाएं' : 'Back to Main Feed';
    
    workspaceNode.innerHTML = `
        <article class="article-content">
            <a class="back-link-btn" onclick="window.location.hash='#feed'">
                <i class="fa-solid fa-arrow-left"></i> ${backBtnText}
            </a>
            <br>
            <span class="card-tag">${post.category}</span>
            <h1 style="font-size: 2.2rem; margin: 10px 0; color: #0f172a; letter-spacing: -0.04rem; font-weight: 800;">${activeTitle}</h1>
            <p class="card-meta"><i class="fa-regular fa-calendar"></i> Published: ${post.date} | <i class="fa-solid fa-code"></i> Architect: Sudhir Kumar Mishra</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <div class="article-body">
                ${activeContent || '<p style="color:red;">Error: Content payload compilation fault.</p>'}
            </div>
        </article>`;
}

// 🗂️ 4. THEMATIC TRANSLATION SWAP INTERCEPTORS
function executeLanguageSwap(langCode) {
    activeLanguage = langCode;
    localStorage.setItem('preferred_lang', langCode);
    
    if (langCode === 'hi') {
        if(btnHi) btnHi.classList.add('active');
        if(btnEn) btnEn.classList.remove('active');
    } else {
        if(btnEn) btnEn.classList.add('active');
        if(btnHi) btnHi.classList.remove('active');
    }
    
    telemetryAppRouter();
}

// 📡 5. CORE EVENT LOOP ROUTING INITIALIZATION CHANNEL
if (btnEn && btnHi) {
    btnEn.addEventListener("click", () => executeLanguageSwap('en'));
    btnHi.addEventListener("click", () => executeLanguageSwap('hi'));
}

window.addEventListener("hashchange", telemetryAppRouter);
window.addEventListener("DOMContentLoaded", () => {
    if (activeLanguage === 'hi') {
        if(btnHi) btnHi.classList.add('active');
        if(btnEn) btnEn.classList.remove('active');
    } else {
        if(btnEn) btnEn.classList.add('active');
        if(btnHi) btnHi.classList.remove('active');
    }
    telemetryAppRouter();
    console.log("🚀 TechTelemetry SPA Routing Ingest Core fully booted onto memory spaces.");
});
