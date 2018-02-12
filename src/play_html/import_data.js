import elasticsearch from 'elasticsearch'
import test from './test.json'

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const promise = new Promise((resolve, reject) => {
  const body = []
  _.forEach(test, (value, key) => {
    body.push({ index: { _index: 'news', _type: 'doc', _id: key } })
    body.push(value)
  })
  client
    .bulk({ body })
    .then(() => resolve('OK'))
    .catch(error => reject(error))
})
