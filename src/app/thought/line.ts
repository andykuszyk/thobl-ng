import { Thought } from './thought';

export class Line {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    isPermenant: boolean;
    thought1: Thought;
    thought2: Thought;

    constructor(x1: number, x2: number, y1: number, y2: number) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.isPermenant = false;
        this.thought1 = null;
        this.thought2 = null;
    }

    reposition() {
        if(this.thought1 == null || this.thought2 == null) return;
        this.x1 = this.thought1.left + this.thought1.width / 2;
        this.y1 = this.thought1.top + this.thought1.height / 2;
        this.x2 = this.thought2.left + this.thought2.width / 2;
        this.y2 = this.thought2.top + this.thought2.height / 2;
    }
}
