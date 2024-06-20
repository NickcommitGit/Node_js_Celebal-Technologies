function fetchData(callback) {
    setTimeout(() => {
        let error = null;
        let data = { id: 1, name: "Nikhil Mishra" };
        callback(error, data);
    }, 1000);
}

function processData(data, callback) {
    setTimeout(() => {
        let error = null;
        let processedData = { ...data, processed: true };
        callback(error, processedData);
    }, 1000);
}

function displayData(error, data) {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
}

// Usage
fetchData((error, data) => {
    if (error) {
        return displayData(error);
    }
    processData(data, displayData);
});
