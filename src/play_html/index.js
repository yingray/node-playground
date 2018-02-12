import express from 'express'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'
import mustache from 'mustache'

import searchArticle from './search/article'

const app = express()

require.extensions['.html'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}
const index =require('./web/index.html')
const news = require('./web/news.html')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use('/web', express.static(path.join(__dirname, 'web')))

app.get('/web', function(req, res) {
  res.sendFile(path.join(__dirname, 'web', 'index.html'))
})

app.get('/api', (req, res) => {
  const q = req.query.q
  searchArticle(q)
    .then(response => {
      const result = response.hits.hits
      let html = index
      _.forEach(result, r => {
        html = html + mustache.render(news, {
          title: r._source.stitle,
          content: r._source.content,
          score: parseInt(r._score * 10)
        })
      })
      res.send(html)
    })
    .catch(error => res.send('error'))
})

app.listen('3000', () => console.log('Example app listening on port 3000!'))
