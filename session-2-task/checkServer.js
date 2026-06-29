

function pingServer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const ping = Number(Math.random().toFixed(1));

            if (ping > 0.3) {
                resolve(`Server is up. Ping: ${ping} ms`);
            } else {
                reject("Server is down.");
            }
        }, 1000);
    });
}

let attempts = 0;

function checkServer() {
    attempts++;
    pingServer()
        .then((message) => {
            console.log(`Attempt ${attempts}: ${message}`);
        })
        .catch((error) => {
            console.log(`Attempt ${attempts}: ${error}`);
            if (attempts < 5) {
                console.log("hold...");
                checkServer();
            } else {
                console.log("Server unreachable after 5 attempts.");
            }
        });
}

checkServer();