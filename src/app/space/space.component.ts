import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought/thought';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
    thoughts = [
        new Thought("small", 0.2, 10, 10),
        new Thought("medium", 1, 400, 200),
        new Thought("large", 2, 100, 300),
    ];

    constructor() { }

    ngOnInit() {
    }

    onMouseDown(event: any) {
        for(let thought of this.thoughts) {
            if(thought.isOver(event.pageX, event.pageY)) {
                thought.isSelected = true;
                thought.isDragging = true;

            } else {
                thought.isSelected = false;
                thought.isEditing = false;
            }
        }
    }

    onMouseUp(event: any) {
        for(let thought of this.thoughts) {
            thought.isDragging = false;
        }
    }

    onMouseMove(event: any) {
        for(let thought of this.thoughts) {
            if(!thought.isDragging) continue;
            thought.onMouseMove(event);
        }
    }
}
