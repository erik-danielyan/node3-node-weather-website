const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;
// Defines paths for expressconfig
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {title: 'Weather', name: "Erik"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About me', name: "Erik"})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help page', name: "Erik"});
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {   
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
          return res.send({ error })
        }
          forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
              return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {title: '404', name: "Erik", message:'Help article not found.'})
})

app.get('*', (req, res) => {
    res.render('notFound', {title: '404', name: "Erik", message:'Page not found.'})
})//need to come last, after other all routes set up

app.listen(port, () => {
    console.log('Server is up on port ' + port )
})