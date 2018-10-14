import { Line } from './line';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login.service';

export class Thought {
    _id: string;
    private _isNew: boolean;
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
    isEditing: boolean;
    thoughts: Thought[];
    lines: Line[];
    parentId: string;
    private _isSelected: boolean;

    get isNew(): boolean {
        return this._isNew;
    }

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

    constructor(private http: HttpClient, private loginService: LoginService, text: string, size: number, left: number, top: number, id = null) {
        this.isDragging = false;
        this.isEditing = false;
        this.text = text;
        this.size = size;
        this.scale();
        this.left = left - this.width / 2;
        this.top = top - this.height / 2;
        this.mouseOffsetX = null;
        this.mouseOffsetY = null;
        this.borderSize = 0.8;
        this.background = 'red';
        this._isSelected = false;
        this.thoughts = [];
        this.lines = [];
        this._id = id;
        this._isNew = this._id == null;
    }

    toJson() {
        return {
            _id: this._id,
            text: this.text,
            left: this.left,
            top: this.top,
            size: this.size,
            width: this.width,
            height: this.height,
            parentId: this.parentId,
        };
    }

    getCenterX() {
        return this.left + this.width / 2;
    }

    getCenterY() {
        return this.top + this.height / 2;
    }

    scale() {
        this.width = 100 * this.size;
        this.height = 100 * this.size;
        this.save();
    }

    onKeyDown(event: any) {
        this.text = event.target.value;
        if(event.key == "Enter" || event.key == "Escape") {
            this.save();
            this.isEditing = false;
        }
    }

    onWheel(event:any) {
        if(event.deltaY < 0) {
            this.size += 0.1;
        } else {
            this.size -= 0.1;
            if (this.size < 0) {
                this.size = 0;
            }
        }
        this.scale();

        return false;
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
        this.save();
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

    /**
     * Saves the current thought based on its internal `_isNew` state.
     * If the thought is new, it is posted and all of its children are also saved.
     * If it is not new, only the thought itself is saved and all of its children
     * are left un-saved.
     */
    save() {
        if (this._isNew) {
            this.http.post('api/thoughts', this.toJson(), { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': this.loginService.idToken}), observe: 'response'}).subscribe(
                res => { 
                    console.log('post thought success'); 
                    this._id = res.body['_id'];
                    for(let thought of this.thoughts) {
                        thought.parentId = this._id;
                        thought.save();
                    }
                    this._isNew = false;
                },
                res => { console.log('post thought failure'); }
            );
            // Make sure that there aren't any new thoughts that need saving.
            for(let thought of this.thoughts) {
                if(thought.isNew) {
                    thought.save();
                }
            }
        } else {
            this.http.put(`api/thoughts/${this._id}`, this.toJson(), { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': this.loginService.idToken}), observe: 'response'}).subscribe(
                res => { console.log('put thought success'); },
                res => { console.log('put thought failure'); }
            );
        }
    }
}
