import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  players:any = [] ;

  constructor( private router:Router ,
               private playerService:PlayerService) { }

  ngOnInit() {

    this.playerService.getAllPlayer().subscribe(
      (docs)=>
      {
        this.players=docs.players ;
      }
    );
  }

  displayPlayer(x:number)
  {

    this.router.navigate([`playerInfo/${x}`])

  }

  goToEditPlayer(x:number)
  {

  }

  deletePlayer(x:number)
  {

  }
}
