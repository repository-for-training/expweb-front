// メインのアプリケーションロジック
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const nav = document.querySelector('nav');

    // グローバルスコープで updateContent 関数を定義
    window.updateContent = async function(href) {
        app.innerHTML = '';  // コンテンツをクリア

        switch (href) {
            case '#home':
                app.innerHTML = `
                    <div class="home">
                        <h1>経費報告システムへようこそ</h1>
                        <p>簡単に経費を申請し、管理することができます。</p>
                        <a href="#create" class="btn" onclick="updateContent('#create')">経費を申請する</a>
                    </div>
                `;
                break;
            case '#create':
                app.appendChild(createExpenseForm());
                break;
            case '#list':
                app.appendChild(await displayExpenseList());
                break;
            default:
                app.innerHTML = '<h2>ページが見つかりません</h2>';
        }
    }

    // ナビゲーションのイベントリスナー
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            updateContent(href);
        }
    });

    // 初期表示
    updateContent('#home');
});