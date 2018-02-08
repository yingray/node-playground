import express from 'express'
import fetch from 'node-fetch'
import _ from 'lodash'
import elasticsearch from 'elasticsearch'
import test from './test.json'

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/demo', (req, res) => {
  const body = []
  _.forEach(test, (value, key) => {
    body.push({ index: { _index: 'news', _type: 'doc', _id: key } })
    body.push(value)
  })
  client
    .bulk({
      body: body
    })
    .then(() => {
      res.send('OK!')
    })
})

app.listen('3000', () => console.log('Example app listening on port 3000!'))
