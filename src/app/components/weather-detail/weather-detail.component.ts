// import { Component, OnInit } from '@angular/core';
// import { WeatherService } from 'src/app/services/weather.service';

// @Component({
//   selector: 'app-weather-detail',
//   templateUrl: './weather-detail.component.html',
//   styleUrls: ['./weather-detail.component.css']
// })
// export class WeatherDetailComponent implements OnInit {

//   myWeather:any;

//   city:string;

//   temperature:number;

//   sunrise:number;

//   sunset:number;

//   humidity:number;

//   constructor(private weatherService:WeatherService) { }

//   ngOnInit() {
//     this.weatherService.getWeather().subscribe(
//       (res)=>
//       {
//         console.log(res);

//         this.myWeather=res;

//         this.city=this.myWeather.name;

//         this.temperature=this.myWeather.main.temp;

//         this.sunrise=this.myWeather.sys.sunrise;

//         this.sunset=this.myWeather.sys.sunset;

//         this.humidity=this.myWeather.main.humidity
//         ;


        
//       }
//     );
//   }

// }
