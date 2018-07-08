import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
    @Input() text: string;
    @Input() left: number;
    @Input() top: number;
    @Input() size: number;
    width: number;
    height: number;
    mouseOffsetX: number;
    mouseOffsetY: number;
    borderSize: number;
    private _isDragging: boolean;

    constructor() {
        this._isDragging = false;
    }

    ngOnInit() {
        this.width = 100 * this.size;
        this.height = 100 *this.size;
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
        this.borderSize = 0.8;

    }

    onMouseDown() {
        this._isDragging = true;
    }

    onMouseUp() {
        this._isDragging = false;
    }

    onMouseMove(event: any) {
        if (!this._isDragging) return;
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
