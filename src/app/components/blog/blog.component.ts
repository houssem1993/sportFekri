import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogTab = [
    {id: 1 , title: "title1" , date: "15-02-2023", description : "description1" },
    {id: 2 , title: "title2" , date: "15-02-2023", description : "description2"},
    {id: 3 , title: "title3" , date: "15-02-2023", description : "description3"},
    {id: 4 , title: "title4" , date: "15-02-2023", description : "description4"}

  ] ;



  constructor() { }

  ngOnInit() {
  }

}
