import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  games$: Observable<any>;
  todotext = 'hallo';
  gameId: string;
  currentGame: any;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {  }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'games');
    this.games$ = collectionData(coll); // with "collectionData" all the data will be imported

    this.route.paramMap.subscribe(async (pm) => {
      
      console.log(pm);
      const gameID = pm.get('id');
      this.gameId = gameID;
      const docRef = doc(coll, this.gameId);
      const docSnap = await getDoc(docRef);
      this.currentGame = docSnap.data()['game'];
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()['games']);
        // this.game.currentPlayer = docSnap.data()['games'].currentPlayer;
        // this.game.playedCards = docSnap.data()['games'].playedCards;
        // this.game.players = docSnap.data()['games'].players;
        // this.game.stack = docSnap.data()['games'].stack;
        this.newGame(docRef);
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })

  }

  newGame(docRef) {
    this.game = this.currentGame;
    const unsub = onSnapshot(docRef, (doc) => {
      this.game = doc.data()['game'];
    });
    console.log('Game update', this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); // pop = returns the last element of array and at the same time it will be removed out of array
      this.pickCardAnimation = true;
      console.log('new card:', this.currentCard);
      console.log('game is:', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // adds currentPlayer until last currentplayer and starts again from the beginning
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }

    });
  }

  async saveGame() {
    const coll = collection(this.firestore, 'games')
    console.log(this.game);
    const docRef = doc(coll, this.gameId);
    await setDoc(docRef, { game: this.game.toJson()});
  }

  // addTodo() {
  //   const coll = collection(this.firestore, 'games'); // get collection
  //   setDoc(doc(coll), {games: this.todotext}); // adds a new doc to collection
  // }
  

}


