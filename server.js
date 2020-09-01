const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')
const port = 3000

const URL = 'http://data.nba.net/10s/prod/v1/2018/players.json'

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
app.get('/teams/:teamName', function (request, response) {
    const team = request.params.teamName
    urllib.request(URL, function (err, res) {
        const data = JSON.parse(res.toString()).league.standard
        const theTeam = data.filter(p => p.teamId === teamToIDs[team] && p.isActive)
            .map(p => {
                return {
                    firstName: `${p.firstName}`,
                    lastName: `${p.lastName}`,
                    jerseyNum: p.jersey,
                    position: p.pos,
                }
            })
        response.send(theTeam)
    })
})

// app.get('/players/:lastName/:firstName', function (request, response) {
//     const first = request.params.firstName
//     const last = request.params.lastName
//     urllib.request(`${baseUrl}/${last}/${first}`, function (err, img) {
//         response.send(img)
//     })
// })



app.listen(port, function () {
    console.log('server is runing');
})