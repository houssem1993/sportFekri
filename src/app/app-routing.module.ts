import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayersComponent } from './components/players/players.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';

import { WeatherComponent } from './components/weather/weather.component';



const routes: Routes = [

  // http://localhost:4200 =>  Home component will be displayed
  { path: "", component: HomeComponent },

  // http://localhost:4200/signin =>  Login component will be displayed
  { path: "signin", component: LoginComponent },

  // http://localhost:4200/subscription =>  Signup component will be displayed
  { path: "subscription", component: SignupComponent },

  { path: "signupAdmin", component: SignupComponent },

  { path: "allMatches", component: MatchesComponent },

  { path: "addMatches", component: AddMatchComponent },

  { path: "addPlayer", component: AddPlayerComponent },

  { path: "addTeam", component: AddTeamComponent },

  { path: "admin", component: AdminComponent },

  { path: "allPlayers", component: PlayersComponent },

  { path: "blog", component: BlogComponent },

  // :id => ID is a param

  { path: "matchInfo/:id", component: MatchInfoComponent } ,

  { path: "searchMatch", component: SearchComponent } ,

  { path: "playerInfo/:id", component:PlayerInfoComponent  } ,

  { path: "teamInfo/:id", component:TeamInfoComponent  } ,

  { path: "profile", component:ProfileComponent  } ,

  { path: "weather", component:WeatherComponent  } ,

 




  { path: "editMatch/:id", component: EditMatchComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
