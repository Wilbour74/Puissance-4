$('#game').ready(function(){
    const p4 =new P4('#game', player1, player2);
    $('#restart').on('click', function(){
        $('#game').empty();
        p4.creategrid();
        p4.interraction();
        
        $('#restart').css('visibility', 'hidden');
    })

   
});



$('#p1').ready(function(){
    const p1Element = document.getElementById("p1").innerHTML = player1.name;
    p1Element.innerHTML += player1.playerwin;
})

$('#p2').ready(function(){
    const p2Element = document.getElementById("p2").innerHTML = player2.name;
    p2Element.innerHTML += player2.playerwin;
})

