const addPlayer = function (data) {
    console.log(data);
    const source = $("#player-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({ data })
    $('#results').append(newHTML)
}

$('#submit').on('click', function () {
    const input = $('#input').val()
    $.ajax({
        method: 'GET',
        url: `/teams/${input}`,
        success: addPlayer
    })
})