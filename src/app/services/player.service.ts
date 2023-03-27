import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl:string="http://localhost:3000/players";
  constructor(private httpClient:HttpClient) { }

  addPlayer(player){
console.log("here service");

    return this.httpClient.post<{message:String ,isAdded:Boolean}>(this.playerUrl,player) ;
  
  
  }
  
  editPlayer(newPlayer){
  
    return this.httpClient.put(this.playerUrl,newPlayer) ;

  }
  
  deletePlayer(id){
  
    return this.httpClient.delete(`${this.playerUrl}/${id}`) ;
  
  }
  
  getAllPlayer(){
  
    return this.httpClient.get<{players:any}>(this.playerUrl) ;
  
  
  }
  
  getAllPlayerById(id){
  
    return this.httpClient.get(`${this.playerUrl}/${id}`) ;
  
  }
  
}
