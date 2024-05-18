document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const stateName = document.getElementById('state-name').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(stateName)}`,
    })
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table header
        const headerRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'ST';
        const th2 = document.createElement('th');
        th2.textContent = 'STATE_NAME';
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        thead.appendChild(headerRow);

        // Create table rows
        if (data.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.textContent = 'No results found.';
            emptyCell.colSpan = 2; // Span both columns
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        } else {
            data.forEach(state => {
                const row = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.textContent = state.ST;
                const td2 = document.createElement('td');
                td2.textContent = state.STATE_NAME;
                row.appendChild(td1);
                row.appendChild(td2);
                tbody.appendChild(row);
            });
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        resultsDiv.appendChild(table);
    })
    .catch(error => {
        resultsDiv.innerHTML = '<p>An error occurred.</p>';
        console.error('Error:', error);
    });
});
