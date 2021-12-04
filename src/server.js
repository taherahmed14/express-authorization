const app = require(".");
const connect = require("./config/db");

app.listen(2345, async function(){
    await connect();
    console.log("Listening to port 2345");
});