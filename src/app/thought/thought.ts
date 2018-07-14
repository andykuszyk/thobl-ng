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
    private _isDragging: boolean;
    background: string;
    private _isSelected: boolean;

    get isSelected():boolean {
        return this._isSelected;
    }

    set isSelected(newIsSelected: boolean) {
        this._isSelected = newIsSelected;
        if (this._isSelected) {
            this.background = 'blue';
        } else {
            this.background = 'red';
        }
    }

    constructor(text: string, size: number, left: number, top: number) {
        this._isDragging = false;
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

    onMouseOut() {
        this.onMouseUp();
        this.isSelected = this._isSelected;
    }

    onMouseOver() {
        this.background = 'yellow';
    }

    onMouseDown() {
        this._isDragging = true;
        this.isSelected = !this.isSelected;
    }

    onMouseUp() {
        this._isDragging = false;
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
    }

    onMouseMove(event: any) {
        if (!this._isDragging) return;
        if(this.mouseOffsetX == null && this.mouseOffsetY == null) {
            this.mouseOffsetX = event.pageX - this.left;
            this.mouseOffsetY = event.pageY - this.top;
        }

        this.left = event.pageX - this.mouseOffsetX;
        this.top = event.pageY - this.mouseOffsetY;
    }
}
