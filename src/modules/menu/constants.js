var http = require("http");


export const keepAlive = () => {
    setInterval(() => {
        http.get("https://show-me0.herokuapp.com")
    }, 300000); // every 5 minutes (300000)
};
