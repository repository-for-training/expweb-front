let API_BASE_URL = '';

// サーバーから設定を取得する関数
async function fetchConfig() {
    try {
        const response = await fetch('/config');
        const config = await response.json();
        API_BASE_URL = config.API_BASE_URL;
    } catch (error) {
        console.error('Failed to fetch config:', error);
    }
}

// API呼び出し用の関数
const api = {
    // 経費の作成
    createExpense: async (data) => {
        await fetchConfig(); // 設定を取得
        const response = await fetch(`${API_BASE_URL}/api/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    // 経費一覧の取得
    getExpenses: async () => {
        await fetchConfig(); // 設定を取得
        const response = await fetch(`${API_BASE_URL}/api/expense`);
        return response.json();
    },

    // 経費の更新
    updateExpense: async (id, data) => {
        await fetchConfig(); // 設定を取得
        const response = await fetch(`${API_BASE_URL}/api/expense/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    // 経費の削除
    deleteExpense: async (id) => {
        await fetchConfig(); // 設定を取得
        const response = await fetch(`${API_BASE_URL}/api/expense/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};