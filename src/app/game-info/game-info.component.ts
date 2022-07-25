import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone should keep drinking until the person who picked the card stops' },
    { title: 'Choose', description: 'You decide who drinks' },
    { title: 'Me', description: 'You must drink' },
    { title: 'Chicks', description: 'All girls must drink' },
    { title: 'Thumb Master', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master till someone else picks a five.' },
    { title: 'Dicks', description: 'All guys drink' },
    { title: 'Heaven', description: 'Point your finger in the sky, whoever is last must drink' },
    { title: 'Mate', description: 'Choose someone to drink with you. Your drinking buddy, should always drink with you.' },
    { title: 'Categories', description: 'Pick a category such as football and you go in a circle and everyone has to say a word that fits with football such as: touchdown, field goal, USC. Whoever messes up, drinks.' },
    { title: 'Rhyme', description: 'Pick a word such as "fog" and the person next to you must rhyme with it, like "dog", and it goes to the next person and the next, in a circle, until someone messes up and he/she will have to drink' },
    { title: 'Jack', description: 'Make a Rule – You can make up any rule that everyone has to follow, such as you can only drink with your left hand. Everyone (including you) must follow this rule for the whole entire game and if you disobey you must drink.' },
    { title: 'Never have I ever', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one and so on. You have to remember all the moves, whoever messes up, drinks.' }
  ];

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void { // void means that the method will execute without returning

  }

  ngOnChanges(): void { // ngOnChanges will activated when the input variable changes
    if (this.card) {
      console.log('current card:', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
