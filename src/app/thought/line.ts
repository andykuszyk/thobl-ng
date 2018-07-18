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
        if(this.thought1 == null || thi.thought2 == null) return;
        this.x1 = thought1.left + thought1.width / 2;
        this.y1 = thought1.top thought1.height / 2;
        this.x2 = thought2.left + thought2.width / 2;
        this.y2 = thought2.top + thought2.height / 2;
    }
}
