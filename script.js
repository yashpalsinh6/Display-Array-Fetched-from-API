//function to fetch data from APIs
function fetchData(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Resolve the promise with the fetched data
                    resolve(data);
                })
                .catch(error => {
                    // Reject the promise if there is an error
                    reject(error);
                });
        }, delay);
    });
}

function promiseAPI1() {
    return fetchData('https://dummyjson.com/posts', 1000);
}

function promiseAPI2() {
    return fetchData('https://dummyjson.com/products', 2000);
}

function promiseAPI3() {
    return fetchData('https://dummyjson.com/todos', 3000);
}

function fetchdata(){
    promiseAPI1()
    .then(data => {
        displayDataInTable(data, 0); // Display API 1 data in the table
        return promiseAPI2(); // Return the next promise
    })
    .then(data => {
        displayDataInTable(data, 1); // Display API 2 data in the table
        return promiseAPI3(); // Return the next promise
    })
    .then(data => {
        displayDataInTable(data, 2); // Display API 3 data in the table
    })
    .catch(error => {
        // Handle any errors that occur during the promise chain
        console.error('Error:', error);
    });
}

function displayDataInTable(data, columnIndex) {
    const table = document.getElementById('dataTable');
    const tableBody = table.getElementsByTagName('tbody')[0];
    
    // Check if the table row for the corresponding API data exists, if not, create one
   
        tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow); 

    const tableData = document.createElement('td');
    tableData.textContent = JSON.stringify(data);
    tableRow.appendChild(tableData);
}