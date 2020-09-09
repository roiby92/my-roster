const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const URL = 'http://data.nba.net/10s/prod/v1/2018/players.json'

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let theTeam = [
]

router.get('/teams/:teamName', function (request, response) {
    const team = request.params.teamName
    urllib.request(URL, function (err, res) {
        const data = JSON.parse(res.toString()).league.standard
        theTeam = data.filter(p => p.teamId === teamToIDs[team] && p.isActive)
            .map(p => {
                return {
                    id: p.personId,
                    firstName: `${p.firstName}`,
                    lastName: `${p.lastName}`,
                    jerseyNum: p.jersey || '----',
                    position: p.pos,
                    img: `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`
                }
            })
        response.send(theTeam)
    })
})

router.put('/team', function (req, res) {
    const teamName = req.body.teamName
    const teamId = req.body.teamId
    teamToIDs[teamName] = teamId
})

const dreamTeam = []

router.get('/dreamTeam', function (req, res) {
    res.send(dreamTeam)
})

router.post('/roster/:id', function (req, res) {
    const playerId = req.params.id
    for (let player of dreamTeam) {
        if (playerId === player.id)
            return console.log(`canot add same player`);
    }
    for (let player of theTeam) {
        if (player.id == playerId) {
            if (dreamTeam.length === 5) {
                console.log('sorry, The Dream Team is Full');
                res.send(dreamTeam)
            }
            else {
                dreamTeam.push(player)
            }
        }
    }
    res.send(dreamTeam)
})

router.delete('/roster/:id', function (req, res) {
    const playerId = req.params.id
    for (let i in dreamTeam) {
        if (dreamTeam[i].id === playerId) {
            dreamTeam.splice(i, 1)
        }
    }
    res.send(dreamTeam)
})
module.exports = router