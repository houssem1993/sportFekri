
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {

  match:any ={} ;

  matches: any = [];

    id:any ;
  constructor(private matchService:MatchService ,
    private activateRoute:ActivatedRoute) { }

  ngOnInit() {

    // get all matches

    // this.matches=JSON.parse(localStorage.getItem("matches")||"[]")

    // GET ID VALUE FROM ACTIF PATH
    this.id= this.activateRoute.snapshot.paramMap.get("id");

    this.matchService.getMatchById(this.id).subscribe(
      (data)=>{
        this.match =data.findedMatch
      }
    );

    // SEARCH OBJECT BY ID
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == this.id) {

    //     this.match = this.matches[i] ;
        
    //   }
      
    // }
  }

}
