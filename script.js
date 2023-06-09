let pseudonyme1 = prompt('Joueur 1: Choisis ton pseudonyme') 

let pseudonyme2 = prompt('Joueur 2: Choisis ton pseudonyme') 

let paragraphe = document.getElementsByClassName("game");
let x = prompt("Bienvenue dans puissance 4 il est le temps de créer ta grille, combien de ligne tu veux?");
let y = prompt("Combien de colonne veux-tu?");


class player{
    constructor(id,name,playerwin){
        this.id = id;
        
        this.name = name;
        this.playerwin = 0;
    }
    test(){
        return `${this.color} ${this.name} ${this.id} ${this.playerwin}`;
    }
}



let player1 = new player(1, pseudonyme1);
console.log(player1.test());

let player2 = new player(2, pseudonyme2);
console.log(player2.test());



class Cell{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.state = "EMPTY";
    }
}

          

class P4{
    constructor(selector, player1, player2){
        this.COL = y;
        this.LGN = x;
        this.selector = selector;
        this.creategrid();
        this.interraction();
        this.player = "red";
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        
        // this.verif();
        
       
      }
     
        
    
    
//On crée la grille
    creategrid(){
    //    let joueur1 = prompt("Bienvenue dans puissance 4, Comment s'appelle le premier joueur");
    //    let joueur2 = prompt("Comment s'appelle le second joueur");
    //    console.log(joueur1);
    //    console.log(joueur2);
       
      
       console.log(x, y);
        

        const $jeu = $(this.selector);

    for(let lgn=0; lgn < x; lgn++){
        const $lgn = $('<div>').addClass('lgn');
        for(let col = 0; col < y; col++){
            const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-lgn", lgn)
            $lgn.append($col.attr("data-col", col).attr("data-lgn", lgn));
        }
        $jeu.append($lgn);
    }
    
}
//Ici on crée les différentes animations
    interraction(){
        const $jeu = $(this.selector);
        const that = this;
    
    //On récupère la case la plus haute
        function firstcase(col){
            const $cells = $(`.col[data-col='${col}']`);
            for(let i = 0; i < $cells.length; i++){
                const $cell = $($cells[i]);
                if($cell.hasClass('empty')){
                    
                    return $cell;
                }
            }
            return null;
        }
    
    //On récupère la case la plus basse 
        function lastCase(col){
            const $cells = $(`.col[data-col='${col}']`);
            for(let i = $cells.length-1; i>=0; i--){
                const $cell = $($cells[i]);
                if($cell.hasClass('empty')){
                    $cell.addClass('falling');
                    return $cell;
                }
            }
    
            return null;
        }
        $jeu.on('mouseenter', '.col.empty', function(){
            const $col = $(this).data('col');
            const $last = firstcase($col);
            if($last != null){
                $last.addClass(`p${that.player}`);
            }
        });

        $jeu.on('mouseleave', '.col', function(){
            $('.col').removeClass(`p${that.player}`);
        });

        $jeu.on('click', '.col.empty', function() {
            const col = $(this).data('col');
            const $last = lastCase(col);
            const $first = firstcase(col);
            $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', that.currentPlayer.id);
            $first.removeClass(`p${that.player}`);
            const winnerhorizontal = that.verifHorizontal($last.data('lgn'), $last.data('col'));
            const winnerVertical = that.verifVertical($last.data('lgn'), $last.data('col'));
            const winnerDiagonal = that.verifDiagonal($last.data('lgn'), $last.data('col'));
            if (winnerhorizontal || winnerVertical|| winnerDiagonal ) {
              
              $jeu.off('mouseenter');
              $jeu.off('mouseleave');
              $jeu.off('click');
            $('#current-player').css("display", "none");
            $('#gagnant').text(`${that.currentPlayer.name} a gagné la partie`).css("display", "block");
            $('#restart').css('visibilty', 'visible');
            } 
        
            else {
              that.player = (that.player === 'red') ? 'jaune' : 'red';
              that.currentPlayer = (that.currentPlayer === player1) ? player2 : player1;
            }
          });
        
        
        // else{
        //     that.player = "red";
        //     that.currentPlayer = player1;
            
        // }
    

    setInterval(() => {
        $('#current-player').text(`Tour de ${that.currentPlayer.name}`);
    }, 1000);

}
//verification horizontale
verifHorizontal(lgn, col) {
    const $cells = $(`.col[data-lgn='${lgn}']`);
    let count = 0;
    let lastPlayer = null;
    for (let i = 0; i < $cells.length; i++) {
      const $cell = $($cells[i]);
      const player = $cell.data('player');
      if (player === lastPlayer && player !== undefined) {
        count++;
        if (count === 4) {
          return lastPlayer;
        }
      } else {
        count = 1;
        lastPlayer = player;
      }
    }
    return null;
  }

  //verification verticale

  verifVertical(lgn, col) {
    const $cells = $(`.col[data-col='${col}']`);
    let count = 0;
    let lastPlayer = null;
    for (let i = 0; i < $cells.length; i++) {
      const $cell = $($cells[i]);
      const player = $cell.data('player');
      if (player === lastPlayer && player !== undefined) {
        count++;
        if (count === 4) {
          return lastPlayer;
        }
      } else {
        count = 1;
        lastPlayer = player;
      }
    }
    return null;
  }
  verifDiagonal(lgn, col) {
    // Vérifie la diagonale vers le haut et la droite
    let count = 0;
    let i = lgn;
    let j = col;
    while (i >= 0 && j < this.COL) {
      const $cell = $(`.col[data-lgn='${i}'][data-col='${j}']`);
      if ($cell.data('player') === this.currentPlayer.id) {
        count++;
        if (count === 4) {
          return this.currentPlayer;
        }
      } else {
        count = 0;
      }
      i--;
      j++;
    }
  
    // Vérifie la diagonale vers le bas et la droite
    count = 0;
    i = lgn;
    j = col;
    while (i < this.LGN && j < this.COL) {
      const $cell = $(`.col[data-lgn='${i}'][data-col='${j}']`);
      if ($cell.data('player') === this.currentPlayer.id) {
        count++;
        if (count === 4) {
          return this.currentPlayer;
        }
      } else {
        count = 0;
      }
      i++;
      j++;
    }
  
    // Vérifie la diagonale vers le haut et la gauche
    count = 0;
    i = lgn;
    j = col;
    while (i >= 0 && j >= 0) {
      const $cell = $(`.col[data-lgn='${i}'][data-col='${j}']`);
      if ($cell.data('player') === this.currentPlayer.id) {
        count++;
        if (count === 4) {
          return this.currentPlayer;
        }
      } else {
        count = 0;
      }
      i--;
      j--;
    }
  
    // Vérifie la diagonale vers le bas et la gauche
    count = 0;
    i = lgn;
    j = col;
    while (i < this.LGN && j >= 0) {
      const $cell = $(`.col[data-lgn='${i}'][data-col='${j}']`);
      if ($cell.data('player') === this.currentPlayer.id) {
        count++;
        if (count === 4) {
          return this.currentPlayer;
        }
      } else {
        count = 0;
      }
      i++;
      j--;
    }
  
    return null;
  }
}
  
//   veriricationDiagonale1(lgn, col){
//         let count = 0;
//         let lastPlayer = null;
//         for (let i = -3; i <= 3; i++){
//             const $cell = $(`.col[data-lgn='${lgn + 1}'][data-col='${col - i}']`)
//         }
//   }
// }


    
     
   
//     }
//     verifHorizontal(lgn, col, currentPlayer){
//         const $cells = $(`.col[data-lgn='${lgn}']`);
//         let count = 0;
//         for (let i=0; i < $cells.length; i++){
//             const $cell = $($cells[i]);
//             if ($cell.hasClass("red")){
//                 count++;
            
//                 if(count === 4){
//                     return true;
//                 }
//             } else{
//                 count = 0;
//             }
//             return false;
//         }
        
//     }

//     verif(){
//         const that = this;
//         const $jeu = $(this.selector);
//         const currentPlayer = this.currentPlayer;

//         for (let lgn = 0; lgn< x ; lgn++) {
//             for(let col = 0; col < y - 3; col++){
//                 if(that.verifHorizontal(lgn, col, that.player) === true){
//                     console.log (that.player);
//                 };
//             }
//         }
//     }
// }



    //     verif(lgn, col){
//         const that = this;
    
//         function $getCell(i, j){
//             return $(`.col[data-lgn="${i}"][data-col="${j}"]`);
//         }
//         function verifdirection(direction){
//             let total = 0;
//             let i = lgn + direction.i;
//             let j = col + direction.j;
//             let $next = $getCell(i, j);
//             while(i >= 0 && i < x && j >= 0 && j < y && $next.data('player') == that.player){
//                 total++;
//                 i += direction.i;
//                 j += direction.j;
//                 $next = $getCell(i, j);
//             }
//             return total;
//         }
//         function verif(a,b){
//             const total = 1 + verifdirection(a) + verifdirection(b);
//             if(total>=4){
                
//                 console.log(that.player);
//             }else{
//                 return null;
//             }
//         }
//         function horizontal(){
//             return verif({i: 0, j: 1}, {i:0, j:-1})
//         }
//         function vertical(){
//             return verif({i: 1, j: 0}, {i:-1 , j:0})
//         } 
//         function diagonal1(){
//             return verif({i: 1, j: 1}, {i: -1, j:-1})
//         }
//         function diagonal2(){
//             return verif({i:1, j: -1}, {i: -1, j:1})
//         }
//         return horizontal() || vertical() || diagonal1() || diagonal2();
//     }
// }
// //         function checkDirection(direction){
//             let total = 0;
//             let i = lgn + direction.i;
//             let j = col + direction.j;
//             let $next = $getCell(i, j);
//             while(i >= 0 && i < x && j >= 0 && j < y && $next.data('player') === that.player){
//                 total++;
//                 i += direction.i;
//                 j += direction.j;
//                 $next = $getCell(i, j);
//             }
//             return total;
//         }
    
//         function checkWin(directionA, directionB){
//             const total = 1 + checkDirection(directionA) + checkDirection(directionB);
//             if(total>=4){
//                 return that.player;
//             }else{
//                 return null;
//             }
//         }
    
//         function checkVerticals(){
//             return checkWin({i:-1, j:0}, {i:1, j:0});
//         }
    
//         function checkHorizontals(){
//             return checkWin({i:0, j:-1}, {i:0, j:1});
//         }
    
//         function checkDiagonalBLtoTR(){
//             return checkWin({i:1, j:-1}, {i:1, j:1});
//         }
    
//         function checkDiagonalTLtoBR(){
//             return checkWin({i:1, j:1}, {i:-1, j:-1});
//         }
    
//         return checkVerticals() || checkHorizontals() || checkDiagonalBLtoTR() || checkDiagonalTLtoBR();
//     }
// }
