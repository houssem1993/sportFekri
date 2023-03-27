import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Form id
  signupForm: FormGroup;

  path:string ;

  msgError:string ;

  imagePreview:any ;



  constructor(private formBuilder: FormBuilder,
    private router: Router ,
    private userService:UserService) { }

  ngOnInit() {
  this.path = this.router.url ;

// console.log("here is path",this.path);


    // create Form Inputs by FormBuilder

    this.signupForm = this.formBuilder.group({

      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img:[""]
    });
  }


  // event function 
  signup() {
    console.log("here user object", this.signupForm.value);

    // if (this.path=="/subscription") {

    //     this.signupForm.value.role = "user" ;
      
    // } else {
      
    //   this.signupForm.value.role = "admin" ;
    // }

    this.signupForm.value.role =(this.path=="/subscription") ? "user" :"admin" ;

    // let usersTab = JSON.parse(localStorage.getItem("users") || "[]");

    // this.signupForm.value.id = generateId(usersTab);

    // usersTab.push(this.signupForm.value);

    // localStorage.setItem("users", JSON.stringify(usersTab));

    this.userService.Signup(this.signupForm.value,this.signupForm.value.img).subscribe(
      (response)=>
      {

        console.log("Here message",response.message);

        if (response.message=="error") {

          this.msgError="Email Exist"
          
        } else {

          this.router.navigate(["signin"]);
          
        }
        

      }
    );

 



  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
