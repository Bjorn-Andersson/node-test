const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')

const connection = require('./connection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.static('public'))
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/api/books', (req, res) => {
    let sql = "SELECT * FROM bok"
    connection.query(sql, function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})

app.get('/api/books/:id', (req, res) => {
    let sql = "SELECT * FROM bok WHERE bokId = ?"
    connection.query(sql, [req.params.id], function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})

app.post('/api/books', (req, res) =>  {
    let sql ='CALL InsertBook(?,?,?,?,?)'
    let params =[req.body.bokTitel, req.body.bokForfattare, req.body.bokIsbn, req.body.bokPris, req.body.bokKategoriId]
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})

app.put('/api/books', (req, res) =>  {
    let sql ='CALL UpdateBook(?,?,?,?,?)'
    let params =[req.body.bokTitel, req.body.bokForfattare, req.body.bokIsbn, req.body.bokPris, req.body.bokId]
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})

app.delete('/api/books', (req, res) =>  {
    console.log(req.body)
    let sql = 'CALL DeleteBook(?)'
    connection.query(sql, [req.body.bokId], function (error, results, fields) {
        if (error) throw error
        res.end('Boken är nu raderad!')
    })
})

app.get('/api/books-categories', (req, res) => {
    let sql = "SELECT * FROM viewBookCategories"
    connection.query(sql, function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})

app.get('/api/books-count', (req, res) => {
    let sql = "SELECT * FROM viewBookCount"
    connection.query(sql, function (error, results, fields) {
        if (error) throw error
        res.json(results)
    })
})
