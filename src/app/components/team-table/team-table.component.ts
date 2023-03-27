import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnInit {

  teamsTab:any=[];



  constructor(private teamService:TeamService,
              private router :Router) { }

  ngOnInit() {

    this.teamService.getAllTeams().subscribe(
      (response)=>
      {
        this.teamsTab =response.teams;
      }
    );
  }


  deleteTeamById(x)
  {

    this.teamService.deleteById(x).subscribe(
      (response)=>
      {
        console.log("Here response after delete",response.message);

        this.teamService.getAllTeams().subscribe(
          (response)=>
          {
            this.teamsTab=response.teams;
          }
        );
        
        
      }
    );
  }

  displayById(x)
  {

    this.router.navigate([`teamInfo/${x}`])
  }

}
