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
        `;
        const tbody = table.createTBody();
        for (const expense of expenses) {
            const row = tbody.insertRow();
            const values = [
                new Date(expense.created_at).toLocaleString(),
                `${expense.amount}円`,
                expense.description,
                expense.status,
            ];
            for (const value of values) {
                row.insertCell().textContent = String(value ?? '');
            }
            const actions = row.insertCell();
            for (const [label, className, onClick] of [
                ['修正', 'edit-btn', editExpense],
                ['削除', 'delete-btn', deleteExpense],
            ]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('action-btn', className);
                button.textContent = label;
                button.dataset.id = String(expense.id);
                button.addEventListener('click', () => onClick(button.dataset.id));
                actions.appendChild(button);
            }
        }
        container.appendChild(table);

    } catch (error) {
        const message = document.createElement('p');
        message.textContent = '経費一覧の取得中にエラーが発生しました。';
        container.appendChild(message);
        console.error(error);
    }

    return container;
}

// 経費の編集
async function editExpense(id) {
    const newAmount = prompt('新しい金額を入力してください:');
    const newDescription = prompt('新しい説明を入力してください:');

    if (newAmount !== null && newDescription !== null) {
        try {
            await api.updateExpense(id, { amount: Number(newAmount), description: newDescription });
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