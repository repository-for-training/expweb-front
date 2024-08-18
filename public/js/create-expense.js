// 経費申請フォームの生成
function createExpenseForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>経費申請</h2>
        <div class="form-group">
            <label for="amount">金額（円）</label>
            <input type="number" id="amount" name="amount" required>
        </div>
        <div class="form-group">
            <label for="description">説明（例：交通費、宿泊費、食費など）</label>
            <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <div class="form-group">
            <label for="date">日付</label>
            <input type="date" id="date" name="date" required>
        </div>
        <button type="submit">申請</button>
    `;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            amount: parseInt(formData.get('amount')),
            description: formData.get('description'),
            date: formData.get('date')
        };

        try {
            const result = await api.createExpense(data);
            alert('経費が正常に申請されました。');
            form.reset();
        } catch (error) {
            alert('経費の申請中にエラーが発生しました。');
            console.error(error);
        }
    });

    return form;
}