import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup;

  player: any = {};

  constructor(
    private router: Router,
    private playerService: PlayerService) { }

  ngOnInit() {
  }


  addPlayer() {

    console.log("here match object ", this.player);

    this.playerService.addPlayer(this.player).subscribe(
      (response) => {
        console.log("Here response P from BE", response);

      }
    );

    this.router.navigate(["allPlayers"])


  }

}
