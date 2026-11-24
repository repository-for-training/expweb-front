let apiBaseUrl;

async function loadApiBaseUrl() {
    try {
        const response = await fetch('/config');
        if (!response.ok) return '';
        const { API_BASE_URL } = await response.json();
        if (!API_BASE_URL) return '';
        const configured = new URL(API_BASE_URL, window.location.href);
        if (!['http:', 'https:'].includes(configured.protocol)) return '';
        const pathname = configured.pathname.replace(/\/+$/, '');
        const isSameOrigin = configured.origin === window.location.origin;
        const avoidsMixedContent = configured.host === window.location.host &&
            configured.protocol === 'http:' && window.location.protocol === 'https:';
        return isSameOrigin || avoidsMixedContent ? pathname : configured.origin + pathname;
    } catch {
        return '';
    }
}

async function requestExpense(suffix = '', options) {
    apiBaseUrl ??= loadApiBaseUrl();
    const base = await apiBaseUrl;
    const response = await fetch(`${base}/api/expense${suffix}`, options);
    if (!response.ok) {
        throw new Error(`経費APIのリクエストに失敗しました (HTTP ${response.status})`);
    }
    return response.status === 204 ? undefined : response.json();
}

function jsonRequest(method, data) {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
}

const api = {
    createExpense: (data) => requestExpense('', jsonRequest('POST', data)),
    getExpenses: () => requestExpense(),
    updateExpense: (id, data) => requestExpense(`/${encodeURIComponent(id)}`, jsonRequest('PUT', data)),
    deleteExpense: (id) => requestExpense(`/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
