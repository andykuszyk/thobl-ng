export class Thought {
    text: string;
    left: number;
    top: number;
    size: number;
    width: number;
    height: number;
    mouseOffsetX: number;
    mouseOffsetY: number;
    borderSize: number;
    isDragging: boolean;
    background: string;
    private _isSelected: boolean;

    get isSelected():boolean {
        return this._isSelected;
    }

    set isSelected(newIsSelected: boolean) {
        this._isSelected = newIsSelected;
        this.setBackground();
    }

    setBackground() {
        if (this._isSelected) {
            this.background = 'blue';
        } else {
            this.background = 'red';
        }
    }

    constructor(text: string, size: number, left: number, top: number) {
        this.isDragging = false;
        this.text = text;
        this.left = left;
        this.top = top;
        this.size = size;
        this.width = 100 * this.size;
        this.height = 100 * this.size;
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
        this.borderSize = 0.8;
        this.background = 'red';
        this._isSelected = false;
    }

    isOver(x: number, y: number) {
        if(x < this.left) return false;
        if(y < this.top) return false;
        if(x > this.left + this.width) return false;
        if(y > this.top + this.height) return false;
        return true;
    }

    onMouseOut() {
        this.onMouseUp();
        this.setBackground();
    }

    onMouseOver() {
        this.background = 'yellow';
    }

    onMouseUp() {
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
    }

    onMouseMove(event: any) {
        if (!this.isDragging) return;
        if(this.mouseOffsetX == null && this.mouseOffsetY == null) {
            this.mouseOffsetX = event.pageX - this.left;
            this.mouseOffsetY = event.pageY - this.top;
        }

        this.left = event.pageX - this.mouseOffsetX;
        this.top = event.pageY - this.mouseOffsetY;
    }
}
