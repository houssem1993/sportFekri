import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  matchForm : FormGroup ;

  match:any={};

  constructor( private matchService:MatchService) { }

  ngOnInit() {
  }

  SerachMatch(){

    this.matchService.addMatchSearch(this.match).subscribe(

    );

  }

}
