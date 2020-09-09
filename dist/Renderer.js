class Renderer{

    render(data){
        const source = $("#player-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ data })
        $('#results').append(newHTML)
    }
}