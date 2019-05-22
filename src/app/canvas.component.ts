import {
  Component, Input, ElementRef, AfterViewInit, ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;


  constructor(private elementRef: ElementRef) { }

  @Input() public width = 800;
  @Input() public height = 400;

  lastEvent = null;
  // parentMove = false;
  // childMove = false;


  startX: number = null;
  startY: number = null;
  cursor :boolean = false;
  drag= false;
  color = "#000";

  
   drawerTypes = ["pencil", "erasor" , "square" , "circle"];

   drawerType = this.drawerTypes[0];
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
}


<<<<<<< HEAD
  
mouseDown(event) {
    if (this.lastEvent == null) {
      this.lastEvent = event;
      return;
    }
   
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.drag = true;
    console.log(this.drag);
    this.lastEvent = event;
   
  }

  mouseUp(event) {
    this.drag = false;
    
   //this.drect(event);
   
  }

//    drect(event){
//   let x = this.startX - this.canvas.nativeElement.getBoundingClientRect().left;
//   let y = this.startY - this.canvas.nativeElement.getBoundingClientRect().top;
//   let w = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left - x;
//   let h = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top - y;
//   this.canvas.nativeElement.getContext("2d");
//   this.canvas.nativeElement.getContext("2d").strokeRect(x, y, w, h);

//   this.drag = false;
// }


  


  mouseMove(event) {
    
    if(this.drawerType == "ractangle"){
      this.ractangleDraw(event);
    } else if(this.drawerType == "erasor") {
      this.drawLine(event, true)

    } else {
      this.drawLine(event, false)
    } 
  
    }
    
  //  

  


   ractangleDraw(event)
   {
    if (!this.drag) {
      return;
    }

 const canvas = event.target;

    if (this.drag) {

      
      const rect = canvas.getBoundingClientRect();

      let canvasLeft = rect.left, canvasTop = rect.top;
      let x = this.startX - canvasLeft;
      let y = this.startY - canvasTop;
      let w = event.clientX - canvasLeft - x;
      let h = event.clientY - canvasTop - y;
       this.cx.beginPath();
      this.cx.strokeStyle = this.color;
      this.cx.fillStyle = "#fff";
      this.cx.fillRect(x, y, w, h);
      this.cx.strokeRect(x, y, w, h);

    }

    const rect = canvas.getBoundingClientRect();


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
>>>>>>> 69f15af0cd7534e41536487854b48d56ce508373
    const prevPos = {

      x: this.lastEvent.clientX - rect.left,
      y: this.lastEvent.clientY - rect.top
    };
    const currentPos = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    this.cx.beginPath();

    this.drawOnCanvas(prevPos, currentPos);
    this.lastEvent = event;
   
   }

  drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {

    if (this.cx) { return; }

    this.cx.beginPath();
    if (prevPos) {

     this.cx.moveTo(prevPos.x, prevPos.y);
     this.cx.lineTo(currentPos.x, currentPos.y);
     this.cx.stroke();
      
    }
  }


  drawLine(event, isErasor){

    if (!this.drag) {
      return;
    }


    console.log("draw line")

    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();

    const prevPos = {

      x: this.lastEvent.clientX - rect.left,
      y: this.lastEvent.clientY - rect.top
    };
    const currentPos = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    
    this.cx.strokeStyle= isErasor ? "#ffffff" :this.color;
    
        this.cx.beginPath();
        
    this.cx.moveTo(prevPos.x, prevPos.y); 
    this.cx.lineTo(currentPos.x, currentPos.y);
    this.cx.stroke();


    // this.cx.beginPath();

    // this.drawOnCanvas(prevPos, currentPos);
    this.lastEvent = event;

  }

  drawRect(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    this.cx.beginPath();
    var ctx = this.cx;

    ctx.strokeRect(prevPos.x, prevPos.y, currentPos.x - prevPos.x, currentPos.y - prevPos.y);
    this.lastEvent=event;

  }




  ractangle(){

    this.drawerType = "ractangle"

  }

  pencil(){

    this.drawerType = "pencil"
  }
   

  eraser()
  {

    this.drawerType = "erasor"

    
  }
  circle()
  {
    this.drawerType="circle"
  }


  changeCursor() {
   this.cx.lineWidth = 3;
    document.body.style.cursor = "crosshair";
  }

  cursorColor(color) {
    this.cx.lineWidth = 3;
    this.cx.strokeStyle = color;
    this.color = color;
  }

 
}

