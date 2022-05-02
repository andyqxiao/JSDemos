//main.js

function sop() {
    const url = "http://localhost:8080/sop";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function corsSimple() {
    const url = "http://localhost:8081/cors";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function corsComplex() {
    const url = "http://localhost:8081/cors";
    
    fetch(url, {
        //body: formData,
        headers: {
            'X-MY-HEADER': 'myHeader'
        },
        method: 'PUT'
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function corsBlock() {
    const url = "http://localhost:8081/cors/block";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function corsCache() {
    const url = "http://localhost:8081/cors/cache";
    
    fetch(url, {
        method: 'PUT'
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
