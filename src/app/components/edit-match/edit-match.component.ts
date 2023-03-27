import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  matchForm:FormGroup ;

  match:any= {} ;

  matches:any=[] ;
  
  id:any ;


  constructor( private activateRoute: ActivatedRoute ,
               private router : Router ,
               private matchService :MatchService) { }

  ngOnInit() {

    // this.matches=JSON.parse(localStorage.getItem("matches")||"[]");

    this.id=this.activateRoute.snapshot.paramMap.get("id") ;

    this.matchService.getMatchById(this.id).subscribe(
      (response)=>
      {
        this.match=response.findedMatch
      }
    );

    // for (let i = 0; i < this.matches.length; i++) {

    //   if (this.matches[i].id== this.id) {

    //     this.match = this.matches[i] ;

    //     break ;
        
    //   }
      
    // }
    
  }


  editMatch(){

    console.log("here is new match ",this.match);

    this.matchService.editMatch(this.match).subscribe(
      (response)=>
      {
        console.log("edit ",response.message);
        
      }
    );
    
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id==this.id) {

    //     this.matches[i] = this.match ;

    //     break ;
       
    //   }
      
    // }

    // localStorage.setItem("matches",JSON.stringify(this.matches))

    this.router.navigate(["admin"]) ;


  }

}
