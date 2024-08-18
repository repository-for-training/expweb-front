// 経費一覧の表示
async function displayExpenseList() {
    const container = document.createElement('div');
    container.innerHTML = '<h2>申請中の経費一覧</h2>';

    try {
        const expenses = await api.getExpenses();
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>作成日時</th>
                    <th>金額</th>
                    <th>説明</th>
                    <th>状態</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${expenses.map(expense => `
                    <tr>
                        <td>${new Date(expense.created_at).toLocaleString()}</td>
                        <td>${expense.amount}円</td>
                        <td>${expense.description}</td>
                        <td>${expense.status}</td>
                        <td>
                            <button class="action-btn edit-btn" data-id="${expense.id}">修正</button>
                            <button class="action-btn delete-btn" data-id="${expense.id}">削除</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        container.appendChild(table);

        // 修正ボタンのイベントリスナー
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editExpense(btn.dataset.id));
        });

        // 削除ボタンのイベントリスナー
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteExpense(btn.dataset.id));
        });

    } catch (error) {
        container.innerHTML += '<p>経費一覧の取得中にエラーが発生しました。</p>';
        console.error(error);
    }

    return container;
}

// 経費の編集
async function editExpense(id) {
    const newAmount = prompt('新しい金額を入力してください:');
    const newDescription = prompt('新しい説明を入力してください:');

    if (newAmount && newDescription) {
        try {
            await api.updateExpense(id, { amount: newAmount, description: newDescription });
            alert('経費が正常に更新されました。');
            // 一覧を再表示
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(await displayExpenseList());
        } catch (error) {
            alert('経費の更新中にエラーが発生しました。');
            console.error(error);
        }
    }
}

// 経費の削除
async function deleteExpense(id) {
    if (confirm('この経費を削除してもよろしいですか？')) {
        try {
            await api.deleteExpense(id);
            alert('経費が正常に削除されました。');
            // 一覧を再表示
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(await displayExpenseList());
        } catch (error) {
            alert('経費の削除中にエラーが発生しました。');
            console.error(error);
        }
    }
}