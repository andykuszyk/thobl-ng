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
    
    get lines(): Line[] {
        if(this.currentThought == null) return [];
        return this.currentThought.lines;
    }

    get selectedThoughts(): Thought[] {
        let selectedThoughts = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected) {
                selectedThoughts.push(thought);
            }
        }
        return selectedThoughts;
    }

    get selectedThoughtsX2(): number {
        if(this.selectedThoughts == null || this.selectedThoughts.length == 1) return 0;
        return Math.max(...this.selectedThoughts.map(t => t.left + t.width));
    }

    get selectedThoughtsY1(): number {
        if(this.selectedThoughts == null || this.selectedThoughts.length == 1) return 0;
        return Math.min(...this.selectedThoughts.map(t => t.top));
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
    }

    onMouseDown(event: any) {
        if(event.target.id == "make-lines-permenant") {
            for(let line of this.lines.filter(l => !l.isPermenant)) {
                line.isPermenant = true;
                for(let thought of this.thoughts) {
                    if(thought.isOver(line.x1, line.y1)) {
                        line.thought1 = thought;
                    } else if(thought.isOver(line.x2, line.y2)) {
                        line.thought2 = thought;
                    }
                }
            }
            return;
        }
        
        let thoughtsToRemove = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected && event.target.id == "remove-thought") {
                thoughtsToRemove.push(thought); 
            } else if(thought.isSelected && event.target.id == "open-thought") {
                this.thoughts = thought.thoughts;
                this.previousThoughts.push(this.currentThought);
                this.currentThought = thought;
            } else if(thought.isOver(event.pageX, event.pageY)) {
                thought.isSelected = true;
                thought.isDragging = true;

            } else if(!event.ctrlKey) {
                thought.isSelected = false;
                thought.isEditing = false;
            }
        }

        for(let thought of thoughtsToRemove) {
            this.thoughts.splice(this.thoughts.indexOf(thought, 0), 1);
        }

        this.populateLines();

        return false;
    }

    populateLines() {
        let selectedThoughts: Thought[] = [];
        for(let thought of this.thoughts) {
            if(thought.isSelected) {
                selectedThoughts.push(thought);
            }
        }
        if(selectedThoughts.length < 2) {
            if(this.currentThought != null) {
                this.currentThought.lines = this.lines.filter(l => l.isPermenant);   
            }
            return;
        }

        while(selectedThoughts.length > 0) {
            let thought = selectedThoughts.pop();
            for(let t of selectedThoughts) {
                let x1 = thought.getCenterX();
                let x2 = t.getCenterX();
                let y1 = thought.getCenterY();
                let y2 = t.getCenterY()
                this.lines.push(new Line(x1, x2, y1, y2));
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
        for(let line of this.lines) {
            line.reposition();
        }
    }
}
