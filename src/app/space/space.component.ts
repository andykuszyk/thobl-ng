import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought/thought';
import { Line } from '../thought/line';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
    thoughts: Thought[];
    previousThoughts: Thought[];
    currentThought: Thought;
    lines: Line[]

    get selectedThoughts: Thought[] {
        let selectedThoughts = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected) {
                selectedThoughts.push(thought);
            }
        }
        return selectedThoughts;
    }

    constructor() { }

    ngOnInit() {
        this.currentThought = new Thought("Root", 0, 0, 0);
        this.currentThought.thoughts = [
            new Thought("small", 0.5, 100, 200),
            new Thought("medium", 1, 400, 400),
            new Thought("large", 2, 100, 500),
        ];
        this.thoughts = this.currentThought.thoughts;
        this.previousThoughts = [];
        this.lines = [];
    }

    onMouseDown(event: any) {
        let thoughtsToRemove = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected && event.target.id == "remove-thought") {
                thoughtsToRemove.push(thought); 
            }
            if(thought.isSelected && event.target.id == "open-thought") {
                this.thoughts = thought.thoughts;
                this.previousThoughts.push(this.currentThought);
                this.currentThought = thought;
            }
            if(thought.isOver(event.pageX, event.pageY)) {
                thought.isSelected = true;
                thought.isDragging = true;

            } else {
                if(!event.ctrlKey) {
                    thought.isSelected = false;
                    thought.isEditing = false;
                }
            }
        }

        for(let thought of thoughtsToRemove) {
            this.thoughts.splice(this.thoughts.indexOf(thought, 0), 1);
        }

        this.populateLines();
    }

    populateLines() {
        let selectedThoughts: Thought[] = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected) {
                selectedThoughts.push(thought);
            }
        }
        if(selectedThoughts.length < 2) {
            this.lines = [];   
            return;
        }

        while(selectedThoughts.length > 0) {
            let thought = selectedThoughts.pop();
            for(let t of selectedThoughts) {
                let x1 = thought.left + thought.width / 2;
                let x2 = t.left + t.width / 2;
                let y1 = thought.top + thought.height / 2;
                let y2 = t.top + t.height / 2
                this.lines.push(new Line(x1, x2, y1, y2);
            }
        }
    }

    selectCurrentThought(thought: Thought) {
        while (this.previousThoughts.length > 0) {
            if (this.previousThoughts.pop() == thought) {
                this.currentThought = thought;
                this.thoughts = this.currentThought.thoughts;
                break;
            }
        }
    }

    onMouseDoubleClick(event: any) {
        for(let t of this.thoughts) {
            if(t.isOver(event.pageX, event.pageY)) return;
        }

        let thought = new Thought("untitled", 1, event.pageX, event.pageY);
        thought.isSelected = true;
        thought.isEditing = true;
        this.thoughts.push(thought);
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
