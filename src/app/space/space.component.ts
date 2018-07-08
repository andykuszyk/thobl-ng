import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
    ideas = [
        {
            "text" : "small",
            "size" : 0.2,
            "left" : 10,
            "top" : 10,
        }, 
        {
            "text" : "medium",
            "size" : 1,
            "left" : 400,
            "top" : 200,
        },
        {
            "text" : "large",
            "size" : 2,
            "left" : 100,
            "top" : 300,
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
