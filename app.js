const express = require('express')
const pretty = require('express-prettify');
const path = require('path')
const app = express()
app.use("/", express.static(__dirname+'/app'))

var data = [
    {id:1, name: "dodo.acme.com", value: "1.2.3.4", bypass: "false", ttl: 1000},
    {id:14, name: "doku.acme.com", value: "5.6.4.4", bypass: "false", ttl: 1000},
    {id:15, name: "dufo.acme.com", value: "4.2.2.1", bypass: "false", ttl: 1000},
    {id:16, name: "uuu.acme.com", value: "1.2.1.1", bypass: "true", ttl: 1000}
]

app.get("/v1/dns", function (req, res) {
    console.log("fetching...")
    res.json(data);
})

app.get("/v1/dns/:id", function (req, res) {
    res.json(data.find(item => item.id == req.params.id));
})

app.listen(8000, function () {
    console.log('Status route is ready')
})
