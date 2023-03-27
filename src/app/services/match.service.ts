import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Server BE Address
  matchUrl:string="http://localhost:3000/matches"
  constructor(private httpClient:HttpClient ) { }


  // request to add  Match 
  // response : message

  addMatch(obj){

   return this.httpClient.post<{message:string , isAdded:boolean}>(this.matchUrl,obj) ;
 
  }

  addMatchSearch(obj){

    return this.httpClient.post<{matches:any}>(this.matchUrl+"/search",obj) ;
  
   }


  // request to get All Matches
  // response : [{},{},{}]

  getAllMatches(){

    return this.httpClient.get<{matches:any ,message:string }>(this.matchUrl) ;
  }


  // request to get  Match by Id
  // response : {}

  getMatchById(id){

    return this.httpClient.get<{findedMatch:any}>(`${this.matchUrl}/${id}`);

  }


  // request to delete  Match by Id
  // response : message
  deleteMatchById(id){

    return this.httpClient.delete<{message:string}>(`${this.matchUrl}/${id}`) ;

  }


  // Request to update match By Id
  // Response : message 
  
  editMatch(newObj){
    return this.httpClient.put<{message:string}>(this.matchUrl,newObj) ;
 
  }
}
