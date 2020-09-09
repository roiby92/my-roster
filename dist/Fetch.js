const renderer = new Renderer()
class Fetch{

    getTeam(input){
        $.ajax({
            method: 'GET',
            url: `/teams/${input}`,
            success: renderer.render
        })
    }
    getDreamTeam(){
        $.ajax({
            method: 'GET',
            url: `/dreamTeam`,
            success: renderer.render
        })
    }

    addToDreamTeam(playerId){
        $.ajax({
            method: 'POST',
            url: `/roster/${playerId}`,
        })
    }

    deleteFromDreamTeam(playerId){
        $.ajax({
            method: 'DELETE',
            url: `/roster/${playerId}`,
        })
    }
}