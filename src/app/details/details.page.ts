import { Component, OnInit,ElementRef, ViewChildren, QueryList, Renderer2 ,AfterViewInit, AfterViewChecked } from '@angular/core';
import { ClientService } from 'src/assets/service/clients.service';
import { GestureController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage{
  @ViewChildren('card') cardElements!: QueryList<ElementRef>; 
  cards:any;
  clients: any;
  firstone:boolean=false;
  constructor(private clientService:ClientService,private gestureCtrl: GestureController, private renderer: Renderer2,private toastController: ToastController) { }
ngAfterViewInit(){
  this.intialize();
}
ngAfterViewChecked() {
this.intialize();
}
intialize(){
  this.cardElements.forEach((card, index) => {
    console.log(index)
    const gesture = this.gestureCtrl.create({
      el: card.nativeElement,
      gestureName: 'swipe-card',
      onMove: ev => this.onMove(ev, card.nativeElement),
      onEnd: ev => this.onEnd(ev, card.nativeElement),
    });
    gesture.enable(true);
  });
}
// Handle swipe movement
onMove(event: any, card: HTMLElement) {
  const x = event.deltaX;
  const y = event.deltaY;
  this.renderer.setStyle(card, 'transform', `translate(${x}px, ${y}px)`);
  this.renderer.setStyle(card, 'transition', 'transform 0s');
}

// Handle swipe end and remove the card if necessary
onEnd(event: any, card: HTMLElement) {
  const x = event.deltaX;

  if (x > 150) {
    // Swipe to the right
    this.renderer.setStyle(card, 'transform', `translateX(1000px)`);
    this.renderer.setStyle(card, 'transition', 'transform 0.3s ease-out'); 
   if(!this.clients.find((item:any) => item.id == card.id).shortlist){
    this.presentToast('top',"Interested");
   }
    setTimeout(() => card.remove(), 300); // Remove card after animation
  } else if (x < -150) {
    // Swipe to the left
    console.log(event)
    console.log(card.id,this.clients,this.clients.find((item:any) => item.id == card.id).shortlist)
   if(!this.clients.find((item:any) => item.id == card.id).shortlist){
    this.presentToast('top',"Not Interested");
   }
    this.renderer.setStyle(card, 'transform', `translateX(-1000px)`);
    this.renderer.setStyle(card, 'transition', 'transform 0.3s ease-out'); 
    setTimeout(() => card.remove(), 300);
  } else {
    // Reset if swipe is not enough
    this.renderer.setStyle(card, 'transform', `translateX(0px)`);
    this.renderer.setStyle(card, 'transition', 'transform 0.3s ease-out'); 
  }
}
changeShort(id:any,obj:any){
  this.clients.find((item:any) => item.id == id).shortlist = obj;
  console.log(obj)
  this.clientService.setObjects(this.clients);
  this.presentToast('top',"Shortlisted");
}
goNext(val:any,id:any){
if(val == "Interested"){
 console.log(document.getElementById(id));
 if(!this.clients.find((item:any) => item.id == id).shortlist){
  this.presentToast('top',"Interested");
 }
  setTimeout(() => document.getElementById(id)!.remove(), 300);
}else if(val == "NotInterested"){
  if(!this.clients.find((item:any) => item.id == id).shortlist){
  this.presentToast('top',"Not Interested");
  }
  setTimeout(() => document.getElementById(id)!.remove(), 300);
}
}
async presentToast(position: 'top' | 'middle' | 'bottom',message:any) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: position,
  });

  await toast.present();
}
  ngOnInit() {
    this.cards = [
      { id: 1, title: 'Card 1', content: 'This is the content of card 1.' },
      { id: 2, title: 'Card 2', content: 'This is the content of card 2.' },
      { id: 3, title: 'Card 3', content: 'This is the content of card 3.' },
      { id: 4, title: 'Card 4', content: 'This is the content of card 4.' },
    ];
    this.clientService.getClients().then((data) =>{ this.clients = data.sort((a:any, b:any) => a.sort_id - b.sort_id);
      console.log(this.clients)
    });
  }
}
