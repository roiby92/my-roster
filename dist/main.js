
const fetchs = new Fetch()

$('#submit').on('click', function () {
    $('#results').empty()
    const input = $('#input').val().toLocaleLowerCase()
    fetchs.getTeam(input)
})

$('#dream').on('click', function () {
    $('#results').empty()
    fetchs.getDreamTeam()
})

$('#results').on('click', '#add', function () {
    const playerId = $(this).closest('.player').data().id
    fetchs.addToDreamTeam(playerId)
})

$('#results').on('click', '#remove', function () {
    const playerId = $(this).closest('.player').data().id
    fetchs.deleteFromDreamTeam(playerId)
})