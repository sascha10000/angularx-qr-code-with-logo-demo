import { Component, ElementRef, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { debug } from 'util';

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-code-test';
  imgURL = "";
  @ViewChild('qrCode', {static : false}) qrCode:any;

  createQRWithImage(){
    // get canvas dom element
    let elem =  this.qrCode.elementRef.nativeElement.children[0];
    // convert to canvas type
    let context = elem.getContext("2d");

    // create image
    let img = new Image();
    img.src = this.imgURL;

    // fixed sizes
    let iWidth = 100;
    let iHeight = 100;
    
    let _that = this; 
    img.onload = () => {
      context.drawImage(img, (elem.width/2) - (iWidth/2),(elem.height/2) - (iHeight/2), iWidth, iHeight);    
      saveAs(_that.canvasToBlob(elem), "file.png");
    }
  }

  // adapted from: https://medium.com/better-programming/convert-a-base64-url-to-image-file-in-angular-4-5796a19fdc21
  canvasToBlob(canvas){
    let dataurl = canvas.toDataURL("image/png");
    let byteString = window.atob(dataurl.replace(/^data:image\/(png|jpg);base64,/, ""));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/jpeg' });
  }
}
