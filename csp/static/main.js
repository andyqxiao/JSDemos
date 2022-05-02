//main.js

function fetchDataFromSameOrigin() {
    const url = "http://localhost:8080/same-origin";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataFromCrossOrigin() {
    const url = "http://localhost:8081/allow-one";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataAllowOne() {
    const url = "http://localhost:8081/allow-one";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataAllowAll() {
    const url = "http://localhost:8081/allow-all";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataAllowNone() {
    const url = "http://localhost:8081/allow-none";
    
    fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataThroughNonSampleRequest() {
    const url = "http://localhost:8081/allow-one";
    
    fetch(url, {
        //body: formData,
        headers: {
            'X-MY-HEADER': 'myHeader'
        },
        method: 'PUT'
    })
    .then(response => response.text())
    .then(result => {
        console.log('Non-sample request:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchDataFromFake() {
    const url = "http://localhost:8081/allow-fake";
    
    fetch(url, {
        //body: formData,
        method: 'PUT'
    })
    .then(response => response.text())
    .then(result => {
        console.log('Non-sample request:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//fetchDataAllowOne();
//fetchDataAllowAll();
//fetchDataAllowNone();

//fetchDataFromSameOrigin();
//fetchDataFromCrossOrigin();
//fetchDataThroughNonSampleRequest();
