document.addEventListener('DOMContentLoaded', () => {

    // Initialize Chart.js
    const ctx = document.getElementById('priceChart').getContext('2d');
    let priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Competitor Price',
                    data: [50, 50, 55, 55, 60, 60],
                    borderColor: '#f472b6',
                    backgroundColor: 'rgba(244, 114, 182, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Your Price',
                    data: [40, 40, 45, 45, 49, 49],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });

    const form = document.getElementById('strategy-form');
    const analyzeBtn = document.getElementById('analyze-btn');
    const logsContainer = document.getElementById('agent-logs');
    const strategyOutput = document.getElementById('strategy-output');

    const addLog = (message, type = 'system') => {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;

        const time = new Date().toLocaleTimeString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        logEntry.textContent = `[${time}] ${message}`;

        logsContainer.appendChild(logEntry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            business: data.business,
            product: data.product,
            price: data.price,
            competitor: data.competitor,
            target: data.target,
            platform: data.platform,
            description: data.description
        };

        // Update chart dynamically
        const priceMatch = data.price.match(/\d+/);
        if (priceMatch) {
            const price = parseInt(priceMatch[0], 10);
            priceChart.data.datasets[1].data = Array(6).fill(price);
            priceChart.data.datasets[1].label = `${data.business} Price`;
            priceChart.data.datasets[0].label = `${data.competitor} Price`;
            priceChart.update();
        }

        // Loading state
        analyzeBtn.disabled = true;
        const originalBtnText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = "Analyzing...";

        logsContainer.innerHTML = "";
        strategyOutput.innerHTML = `
            <div class="empty-state">
                <p>Agents are generating your strategy...</p>
            </div>
        `;

        try {

            addLog(`Initializing analysis for ${data.business}...`);
            await sleep(800);

            addLog(`Scout Agent scanning competitor ${data.competitor}...`, "scout");
            await sleep(1200);

            addLog(`Analyst Agent evaluating ${data.product}...`, "analyst");
            await sleep(1500);

            addLog(`Strategist Agent generating plan...`, "strategist");

            // Webhook call
            const response = await fetch("https://harishwa.app.n8n.cloud/webhook/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            // ✅ Correct JSON parsing
            const raw = await response.json();
            console.log("RAW Webhook Response:", JSON.stringify(raw, null, 2));

            // ✅ Unwrap n8n's common envelope keys in order
            let result = Array.isArray(raw) ? raw[0] : raw;
            if (result && result.json) result = result.json;
            if (result && result.output) result = result.output;

            console.log("Parsed result:", result);

            // ✅ Helper: n8n sometimes sends arrays as objects {0:'a', 1:'b'}
            const toArray = (val) => {
                if (!val) return [];
                if (Array.isArray(val)) return val;
                if (typeof val === 'object') return Object.values(val);
                return [val];
            };

            addLog("Strategy successfully generated.", "success");

            // ✅ Display structured output with styled sections
            const listItems = (val) =>
                toArray(val).map((item, i) => `<li><span class="list-num">${i + 1}</span>${item}</li>`).join('');

            strategyOutput.innerHTML = `
                <div class="strategy-sections">
                    <div class="strategy-section">
                        <h3 class="section-title">💰 Pricing Strategy</h3>
                        <p class="section-body">${result.pricing_strategy || '<em>No data</em>'}</p>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">📣 Marketing Strategy</h3>
                        <p class="section-body">${result.marketing_strategy || '<em>No data</em>'}</p>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">🚀 Growth Tactics</h3>
                        <ol class="strategy-list">${listItems(result.growth_tactics)}</ol>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">🎯 Competitive Positioning</h3>
                        <p class="section-body">${result.competitive_positioning || '<em>No data</em>'}</p>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">📡 Customer Acquisition Channels</h3>
                        <ol class="strategy-list">${listItems(result.customer_acquisition_channels)}</ol>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">✨ Product Differentiation</h3>
                        <p class="section-body">${result.product_differentiation || '<em>No data</em>'}</p>
                    </div>

                    <div class="strategy-section">
                        <h3 class="section-title">🗺️ Execution Roadmap</h3>
                        <ol class="strategy-list">${listItems(result.execution_roadmap)}</ol>
                    </div>
                </div>
            `;


        } catch (error) {

            console.error(error);

            addLog(`Error: ${error.message}`, "error");

            strategyOutput.innerHTML = `
                <div style="color:red">
                    Failed to generate strategy. Please try again.
                </div>
            `;

        } finally {

            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = originalBtnText;

            addLog("Analysis complete.");

        }

    });

});
