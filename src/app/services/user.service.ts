import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token:string;
  public name:any;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated =false;
  userUrl:string="http://localhost:3000/users";
  constructor(private httpClient:HttpClient ,
              private router:Router) { }

getToken() {
 return this.token;
 }

 getAuthStatusListener() {
 return this.authStatusListener.asObservable();
 }
 
 isUserAuth() {
 return this.isUserAuthenticated;
 }
 getName(){
 return this.name;
 }


 login(obj){

    return this.httpClient.post<{message:string, user:any}>(this.userUrl+"/signin",obj).subscribe(
      (res) => {
      const token = res.user.jwt;
      this.token = token;
      if (token) {
      this.isUserAuthenticated = true;
      this.name = res.user.firstName;
      this.authStatusListener.next( true);
      localStorage.setItem( 'token' , token);
      localStorage.setItem( 'name' , res.user.firstName);

      (res.user.role=="admin")?
         this.router.navigate(['admin']):
         this.router.navigate(['']);
      }
      }
      )
 }
  
  Signup(obj,img:File){

    let formData= new FormData();
    formData.append("firstName",obj.firstName);
    formData.append("lastName",obj.lastName);
    formData.append("email",obj.email);
    formData.append("pwd",obj.pwd);
    formData.append("img",img);
    
  
    return this.httpClient.post<{message:string}>(this.userUrl+"/subscription",formData) ;

  }

  editProfile(newUser){

    return this.httpClient.put(this.userUrl,newUser) ;

  }

  logout() {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'name' );
    this.isUserAuthenticated = false ;
    this.authStatusListener.next( false );
    this.router.navigate([ '/']);
    }
  

 
  


}
