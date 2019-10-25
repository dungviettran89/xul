const express = require('express');
let app = express();
let proxy = require('http-proxy-middleware');
const port = 8080;
app.use('/vnc', proxy({
    pathRewrite: {'^/vnc/': ''},
    ws: true,
    router: (req) => {
        return "http://localhost:6080";
    }
}));
app.use(express.static('public'));
app.listen(port, () => console.log(`Started on ${port}`));