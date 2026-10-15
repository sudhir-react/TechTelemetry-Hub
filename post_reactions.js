// ==========================================================================
// 💎 TECHTELEMETRY INTERACTIVE STATE LEDGER - LIKE & COMMENT INGRESS CONTROLLER
// ==========================================================================

// In-Memory State Vault simulating localized transient data arrays
const portfolioReactionState = {
    likesCount: 14,
    commentsList: [
        { user: "Alex_DevOps_Lead", text: "Blistering speed metrics on the SQLite3 WAL mode implementation!", timestamp: "Oct 14, 2026" },
        { user: "Marta_AI_Architect", text: "The Multi-Client Asynchronous MCP Router architecture is bulletproof.", timestamp: "Oct 15, 2026" }
    ]
};

function initializeInteractiveReactionPanel() {
    const interactionRoot = document.getElementById("interactive-feedback-node");
    if (!interactionRoot) return;

    // Render the beautiful structural Glassmorphism interaction panel layout template
    interactionRoot.innerHTML = `
        <div style="background: rgba(30, 41, 59, 0.45); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem; margin-top: 3rem; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); backdrop-filter: blur(16px); text-align: left;">
            
            <!-- 🟢 LIKE INGRESS ACCELERATOR SECTION -->
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                <div>
                    <h3 style="color: #f8fafc; font-size: 1.2rem; margin-bottom: 4px;">Was this architecture execution highly optimized?</h3>
                    <p style="color: #94a3b8; font-size: 0.85rem;">Stamp your verification signature onto the decentralized tracking grid.</p>
                </div>
                <button id="like-increment-btn" style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s ease;">
                    <i class="fa-solid fa-heart-pulse"></i> Verify Ingress (<span id="likes-counter-display">${portfolioReactionState.likesCount}</span>)
                </button>
            </div>

            <!-- 💬 TELEMETRY COMMENTARY LEDGER LOOP -->
            <h3 style="color: #f8fafc; font-size: 1.1rem; margin-bottom: 1rem;"><i class="fa-solid fa-comments"></i> Technical Review Ledger</h3>
            <div id="comments-stream-target" style="max-height: 250px; overflow-y: auto; margin-bottom: 1.5rem; padding-right: 5px;">
                <!-- Comments cascade here dynamically -->
            </div>

            <!-- 📝 INPUT INGESTION FIELDS -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="comment-user-input" placeholder="Enter Developer Handle (e.g., @sudhir_react)" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.75rem; border-radius: 8px; color: #f8fafc; font-family: monospace; font-size: 0.9rem;">
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="comment-text-input" placeholder="Type structural architectural feedback packet string..." style="flex: 1; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.75rem; border-radius: 8px; color: #f8fafc; font-size: 0.9rem;">
                    <button id="submit-comment-btn" style="background: #3b82f6; border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s ease;">Commit Feedback</button>
                </div>
            </div>

        </div>
    `;

    // Initialize individual logical listeners
    document.getElementById("like-increment-btn")?.addEventListener("click", executeLikeMutationSweep);
    document.getElementById("submit-comment-btn")?.addEventListener("click", executeCommentIngressWrite);

    renderCommentsStreamMatrix();
}

function renderCommentsStreamMatrix() {
    const target = document.getElementById("comments-stream-target");
    if (!target) return;
    target.innerHTML = portfolioReactionState.commentsList.map(c => `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 10px; margin-bottom: 0.75rem; border-left: 3px solid #3b82f6;">
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#60a5fa; margin-bottom:4px; font-family:monospace;">
                <span><strong>${c.user}</strong></span> <span>${c.timestamp}</span>
            </div>
            <p style="color:#e5e7eb; font-size:0.88rem; line-height:1.4;">${c.text}</p>
        </div>
    `).join("");
}

function executeLikeMutationSweep() {
    portfolioReactionState.likesCount++;
    const display = document.getElementById("likes-counter-display");
    if (display) display.innerText = portfolioReactionState.likesCount;
    
    // Add rapid button scale effect logic safely
    const btn = document.getElementById("like-increment-btn");
    if (btn) {
        btn.style.transform = "scale(1.05)";
        setTimeout(() => btn.style.transform = "scale(1)", 150);
    }
}

function executeCommentIngressWrite() {
    const userInput = document.getElementById("comment-user-input");
    const textInput = document.getElementById("comment-text-input");
    
    if (!userInput || !textInput || !userInput.value.trim() || !textInput.value.trim()) return;

    portfolioReactionState.commentsList.unshift({
        user: userInput.value.trim(),
        text: textInput.value.trim(),
        timestamp: "Just Now"
    });

    // Reset parameters safely
    textInput.value = "";
    
    renderCommentsStreamMatrix();
}

// Hook transaction gate into initialization queues safely
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInteractiveReactionPanel);
} else {
    initializeInteractiveReactionPanel();
}
