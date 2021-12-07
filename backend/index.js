const axios = require('axios');
const express = require('express')
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors');

const getData = async (req, res) => {
    var query_param = req.query.q;
    var max_id = req.query.max_id;
    var count = req.query.count;
    var include_entities = req.query.include_entities;
    if(query_param == '')
    {
        return res.send([])
    }
    var url = "https://api.twitter.com/1.1/search/tweets.json";
    var query = "";
    if(max_id)
    {
        query = `?max_id=${max_id}&q=${query_param}&count=${count}&include_entities=${include_entities}`;
    }
    else{
        query = `?count=100&q=${query_param}`;
    }
    console.log("query",query)
    const response = await axios({
        method: 'get',
        url: url+query,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    })
    res.send(response.data)
}
app.use(cors());
app.options('*', cors());
app.get('/search', (req, res) => {
    getData(req, res);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
