import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm:FormGroup ;

  weatherResult:any;



  constructor( private weatherServices:WeatherService ,
               private formBuilder:FormBuilder,
               private router:Router) { }



  ngOnInit() {

    this.weatherForm=this.formBuilder.group({

      city: ["", [Validators.required]]


    })
  }

  search()
  {

    console.log(this.weatherForm.value);
    

    this.weatherServices.search(this.weatherForm.value).subscribe(
      (response)=>
      {

        
        console.log("here response from api",response.data);

        this.weatherResult=response.data;
       
        
        
      }

     
    );

    

  }

}
