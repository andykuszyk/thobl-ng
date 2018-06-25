import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
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
            "left" : 200,
            "top" : 200,
        },
        {
            "text" : "large",
            "size" : 2,
            "left" : 400,
            "top" : 400,
        }
    ];
}
