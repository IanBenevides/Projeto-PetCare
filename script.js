if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('Service Worker registration failed', err));
}

let db;
const request = indexedDB.open('dashboardDB', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('dataStore', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
    fetchData();
};

request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.errorCode);
};

document.getElementById('data-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const value = document.getElementById('value').value;
    saveData({ name, value });
});

function saveData(data) {
    const transaction = db.transaction(['dataStore'], 'readwrite');
    const store = transaction.objectStore('dataStore');
    store.add(data);

    transaction.oncomplete = () => {
        console.log('Data saved locally');
        fetchData(); // Update the UI
    };

    transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.errorCode);
    };
}

function fetchData() {
    const transaction = db.transaction(['dataStore'], 'readonly');
    const store = transaction.objectStore('dataStore');
    const request = store.getAll();

    request.onsuccess = () => {
        displayData(request.result);
    };
}

function displayData(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // Clear existing data
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.value}</td>`;
        tbody.appendChild(row);
    });
}

window.addEventListener('online', () => {
    console.log('Back online');
    syncData();
});

function syncData() {
    const transaction = db.transaction(['dataStore'], 'readonly');
    const store = transaction.objectStore('dataStore');
    const request = store.getAll();

    request.onsuccess = () => {
        const data = request.result;
        if (data.length > 0) {
            fetch('/upload', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => {
                console.log('Data synced with server:', result);
                // Clear local data after sync
                clearLocalData();
            })
            .catch(err => console.error('Sync error:', err));
        }
    };
}

function clearLocalData() {
    const transaction = db.transaction(['dataStore'], 'readwrite');
    const store = transaction.objectStore('dataStore');
    store.clear();
}
