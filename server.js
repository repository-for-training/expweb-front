const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// APIのベースURLを環境変数から取得（デフォルト値も設定）
const API_BASE_URL = process.env.API_BASE_URL

// 静的ファイルの配信
app.use(express.static(path.join(__dirname, 'public')));

// APIのベースURLをクライアントに渡すためのエンドポイント
app.get('/config', (req, res) => {
    res.json({ API_BASE_URL: API_BASE_URL });
});

// すべてのルートをindex.htmlにリダイレクト（SPA用）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});