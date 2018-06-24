import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

    left: number;
    top: number;
    width: number;
    height: number;
    mouseOffsetX: number;
    mouseOffsetY: number;
    text: string;
    borderSize: number;

    constructor() {
        this.left = 250;
        this.top = 250;
        this.width = 100;
        this.height = 100;
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
        this.text = "spam eggs";
        this.borderSize = 0.8;
    }

    ngOnInit() { }

    onDrag(event: any) {
        if(this.mouseOffsetX == null && this.mouseOffsetY == null) {
            this.mouseOffsetX = event.pageX - this.left;
            this.mouseOffsetY = event.pageY - this.top;
        }

        if(event.pageX != 0 && event.pageY != 0) {
            this.left = event.pageX - this.mouseOffsetX;
            this.top = event.pageY - this.mouseOffsetY;
        } else {
            this.mouseOffsetX == null;
            this.mouseOffsetY == null;
        }
    }

    onDrop(event: any) {
        console.log("dropped!");
    }
}
