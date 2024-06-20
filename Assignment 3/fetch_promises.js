function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = null;
            let data = { id: 1, name: "Nikhil Mishra" };
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        }, 1000);
    });
}

async function main() {
    try {
        const data = await fetchData();
        const processedData = await processData(data);
        console.log('Data:', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage
main();


function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = null;
            let processedData = { ...data, processed: true };
            if (error) {
                reject(error);
            } else {
                resolve(processedData);
            }
        }, 1000);
    });
}
