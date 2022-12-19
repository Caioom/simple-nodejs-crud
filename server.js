const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => {
  console.log('listening on 3000')
})

MongoClient.connect('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/simple-crud', 
  {
    useUnifiedTopology: true
  }
).then(client => {
  console.log('Connected to Mongo with success')
  const db = client.db('simple-crud')
  const quotesCollection = db.collection('quotes')

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      }).catch(error => {
        console.log(error)
      })
  })

  app.get('/', async (req, res) => {
    const quotes = await quotesCollection.find().toArray()
    console.log(quotes)
    res.render('index.ejs', { quotes })
  })
}).catch(error => {
  console.log(error)
})