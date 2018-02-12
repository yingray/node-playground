import elasticsearch from 'elasticsearch'

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

export default string =>
  new Promise((resolve, reject) => {
    client
      .search(
        {
          index: 'news',
          type: 'doc',
          body: {
            query: {
              match: {
                content: string || '好喔'
              }
            }
          }
        },
        function(error, response) {
          if (error) {
            reject(error)
          }
          console.log(response)
          resolve(response)
        }
      )
  })
