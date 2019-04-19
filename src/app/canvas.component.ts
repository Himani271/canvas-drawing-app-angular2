import {
  Component, Input, ElementRef, AfterViewInit, ViewChild,
} from '@angular/core';
import { fromEvent} from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  constructor(private elementRef:ElementRef) {}
  
  @Input() public width = 600;
  @Input() public height = 400;

  lastEvent = null;
 
  rect :any= {
     w:"",
     h:""
};
rectStartXArray: any [];
rectStartYArray: any [];
rectWArray: any[];
rectHArray: any[];
    drag = false;
    offsetLeft:any;
    offsetTop: any;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    
    this.cx = canvasEl.getContext('2d');
    

    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

   this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        canvasEl.getBoundingClientRect();
        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
  
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
  
        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }
  
  
  init() {
    console.log("hi-------------->>>>>>>>");
    const canvas = event.target;
     console.log(event);
    canvas.addEventListener('mousedown',this. mouseDown, false);
	 canvas.addEventListener('mouseup',this. mouseUp, false);
	 canvas.addEventListener('mousemove',this. mouseMove, false);
  }
  

  
  
  mouseDown(event) {
    // if (this.lastEvent == null) {
    //   this.lastEvent = event;
    //   return;
    // }
  //  this.cx.beginPath();
    // const canvas = event.target;
    // console.log(event);
    // const rect = canvas.getBoundingClientRect();
    // rect.startX = event.pageX -  this.offsetLeft;
    // rect.startY = event.pageY -  this.offsetTop;
    // this.drag = true;
    this.rect.startX = event.pageX - this.offsetLeft;
    this.rect.startY = event.pageY - this.offsetTop;
    this.drag = true;
    
   
  }

  mouseUp() { 
    this.rectStartXArray[this.rectStartXArray.length] = this.rect.startX;
    this.rectStartYArray[this.rectStartYArray.length] = this.rect.startY;
    this.rectWArray[this.rectWArray.length] =this. rect.w;
    this.rectHArray[this.rectHArray.length] = this.rect.h;
    this.drag = false; 
  }
  

   mouseClick(event){
    
    if (this.lastEvent == null) {
      this.lastEvent = event;
      return;
    }
    this.cx.beginPath();
    const canvas = event.target;
    console.log(event);
    const rect = canvas.getBoundingClientRect();
    const prevPos = {
      x: this.lastEvent.clientX - rect.left,
      y: this.lastEvent.clientY - rect.top
    };

    const currentPos = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    this.drawRect(prevPos, currentPos,event);

    this.lastEvent = null;

   }

  mouseMove(event) {
  //   if (this.lastEvent == null) {
  //     this.lastEvent = event;
  //     return;
  //   }
  //   if (this.drag) {
    
  //     this.rect.w = (event.pageX - this.offsetLeft) - this.rect.startX;
  //     this.rect.h = (event.pageY - this.offsetTop) - this.rect.startY;
  //     this.cx.strokeStyle = 'red';
  //     this.cx.clearRect(this.rect.startX, this.rect.startY,this.rect.w,this.rect.h);
  
    
    

  //    this.drawRandomLine();
  //   const canvas = event.target;
  //   console.log(event);
  //   const rect = canvas.getBoundingClientRect();
  //   console.log(rect)


  //   const prevPos = {
  //     x: this.lastEvent.clientX - rect.left,
  //     y: this.lastEvent.clientY - rect.top
  //   };

  //   const currentPos = {
  //     x: event.clientX - rect.left,
  //     y: event.clientY - rect.top
  //   };

  //    this.drawOnCanvas(prevPos, currentPos);

  //   this.lastEvent = event;
  // }
  const prevPos = {
        x: this.lastEvent.clientX - this.rect.left,
        y: this.lastEvent.clientY - this.rect.top
      };
  
      const currentPos = {
        x: event.clientX - this.rect.left,
        y: event.clientY - this.rect.top
      };
  if (this.drag) {
    this.rect.w = (event.pageX - this.offsetLeft) - this.rect.startX;
    this.rect.h = (event.pageY - this.offsetTop) - this.rect.startY;
    this.drawOnCanvas(prevPos, currentPos);
}
  }

  drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    
    if (!this.cx) { return;  }

    this.cx.beginPath();
    if (prevPos) {
      
      this.cx.moveTo(prevPos.x, prevPos.y); 
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
      
     
    
    }
  }

  drawRect(prevPos: { x: number, y: number }, currentPos: { x: number, y: number },event){

const canvas = event.target;
    console.log(event);
    const rect = canvas.getBoundingClientRect();
    var ctx = this.cx;
ctx.strokeStyle = "#FF0000";
ctx.strokeRect(prevPos.x, prevPos.y, currentPos.x - prevPos.x, currentPos.y - prevPos.y);
ctx.clearRect(rect.startX, rect.startY, rect.w, rect.h);
	  ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  }

   drawRandomLine(){
    
    this.cx.beginPath();
    this.cx.moveTo(0,0); 
    this.cx.lineTo(100, 100);
    this.cx.stroke();
  }


  drawOldShapes(){
    for(var i=0;i<this.rectStartXArray.length;i++)
    {
        if(this.rectStartXArray[i]!= this.rect.startX &&
           this.rectStartYArray[i] != this.rect.startY && this.rectWArray[i] != this.rect.w && this.rectHArray[i] != this.rect.h)
        {
          this.cx.beginPath();
          this.cx.fillStyle="#FF0000";
          this.cx.fillRect(this.rectStartXArray[i], this.rectStartYArray[i], this.rectWArray[i],this. rectHArray[i]);
          this.cx.stroke();
        }
    }
  }


  remove()
  {
    document.body.style.cursor = "default";
    this.cx.lineWidth = 20;
    this.cx.strokeStyle = '#ffffff';

  }
  changeCursor()
  {
    
    this.cx.strokeStyle = '#000';
    this.cx.lineWidth=3;
    document.body.style.cursor = "cell";
  }
  
  cursorColor(color)
{
  this.cx.strokeStyle = color;
}



}


