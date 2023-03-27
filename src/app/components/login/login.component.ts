import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup ;

  messageError:string;

  constructor(private formBuilder:FormBuilder ,
              private router : Router ,
              private userService:UserService) { }

  ngOnInit() {

this.loginForm = this.formBuilder.group({

  email:["" ,[Validators.required , Validators.email]] ,

  pwd:["",[Validators.required ]]


}) ;

 

  }

  login(){

    let user = this.loginForm.value ;

    console.log("here is login user",user);

    // let users = JSON.parse(localStorage.getItem("users") || "[]");

    // for (let i = 0; i <users.length; i++) {

    //   if (users[i].email == object.email && users[i].pwd == object.pwd) {


    //     (users[i].role == "admin") ?

    //     this.router.navigate(["admin"]) :

    //     this.router.navigate([""]) ;

        
    //   } 
      
      
    // }

    // this.userService.login(user).subscribe(
    //   (response)=>
    //   {
    //     console.log("Response after login",response);
    //     if (response.message=="2") {

    //       this.router.navigate([""]);
          
          
    //     } else {

    //       this.messageError="Please check Email/pwd"

          
    //     }
        
    //   });


    

    this.userService.login(user);

  }

}
