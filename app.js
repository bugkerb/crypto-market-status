// Crypto Market Status
(function() {
    'use strict';

    const cryptoData = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 97500, change24h: 2.45, marketCap: 1900000000000, volume24h: 45000000000 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3650, change24h: 3.12, marketCap: 440000000000, volume24h: 18000000000 },
        { id: 'binancecoin', name: 'BNB', symbol: 'BNB', price: 690, change24h: -1.23, marketCap: 102000000000, volume24h: 2500000000 },
        { id: 'solana', name: 'Solana', symbol: 'SOL', price: 185, change24h: 5.67, marketCap: 85000000000, volume24h: 3200000000 },
        { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 2.85, change24h: -0.89, marketCap: 160000000000, volume24h: 5400000000 },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.95, change24h: 1.45, marketCap: 34000000000, volume24h: 800000000 },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.32, change24h: 4.20, marketCap: 46000000000, volume24h: 3200000000 },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 6.85, change24h: -2.15, marketCap: 10000000000, volume24h: 450000000 }
    ];

    function formatCurrency(price) {
        if (price >= 1000) {
            return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (price >= 1) {
            return '$' + price.toFixed(2);
        } else {
            return '$' + price.toFixed(4);
        }
    }

    function formatLargeNumber(num) {
        if (num >= 1e12) {
            return '$' + (num / 1e12).toFixed(2) + 'T';
        } else if (num >= 1e9) {
            return '$' + (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return '$' + (num / 1e6).toFixed(2) + 'M';
        } else {
            return '$' + num.toLocaleString('en-US');
        }
    }

    function createCryptoCard(crypto) {
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = crypto.change24h >= 0 ? '↑' : '↓';
        
        return `
            <div class="crypto-card">
                <div class="crypto-header">
                    <div class="crypto-name">${crypto.name}</div>
                    <div class="crypto-symbol">${crypto.symbol}</div>
                </div>
                <div class="crypto-price">${formatCurrency(crypto.price)}</div>
                <div class="crypto-change ${changeClass}">
                    ${changeIcon} ${Math.abs(crypto.change24h).toFixed(2)}% (24h)
                </div>
                <div class="crypto-details">
                    <div class="crypto-detail">
                        <div class="crypto-detail-label">Market Cap</div>
                        <div class="crypto-detail-value">${formatLargeNumber(crypto.marketCap)}</div>
                    </div>
                    <div class="crypto-detail">
                        <div class="crypto-detail-label">Volume (24h)</div>
                        <div class="crypto-detail-value">${formatLargeNumber(crypto.volume24h)}</div>
                    </div>
                </div>
            </div>
        `;
    }

    function render() {
        const cardsHtml = cryptoData.map(createCryptoCard).join('');
        document.getElementById('crypto-grid').innerHTML = cardsHtml;
    }

    function simulatePriceUpdates() {
        cryptoData.forEach(crypto => {
            const changePercent = (Math.random() - 0.5) * 0.5;
            crypto.price *= (1 + changePercent / 100);
            crypto.change24h += (Math.random() - 0.5) * 0.1;
            crypto.change24h = Math.max(-15, Math.min(15, crypto.change24h));
        });
        render();
    }

    render();
    setInterval(simulatePriceUpdates, 60000);
})();
