import { Component, OnInit,AfterViewInit } from '@angular/core';
import Swiper, { Autoplay, Pagination, Navigation } from 'swiper'; // Import Swiper and modules
import { ClientService } from 'src/assets/service/clients.service';
import { Router } from '@angular/router';
// Initialize Swiper with the necessary modules
Swiper.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page  {
  clients: any;
  swiper: Swiper | undefined;
  firsttime:boolean=false;
  constructor(private clientService:ClientService,private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiper?.update();  // Ensures it adapts  to breakpoints after rendering
    }, 100);  // A short delay for the DOM to settle might help
  }
  ngAfterViewChecked() {
if(this.firsttime == false){
    setTimeout(() => {
      this.swiper?.update();  // Ensures it adapts to breakpoints after rendering
    }, 100); 
    this.firsttime=true; 
  }
    }
  goToDetails(id:number){
    this.clientService.setObjects(this.rightRotateByNAndUpdateIds(this.clients,6 - id));
    this.router.navigate(['/details']);
  }
  ngOnInit() {
    /// swiper initialize//////
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        // when window width is >= 640px
        640: {
          slidesPerView: 2, // Show 2 slides on medium screens
          spaceBetween: 20,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3, // Show 3 slides on large screens
          spaceBetween: 30,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 4, // Show 4 slides on extra large screens
          spaceBetween: 40,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      loop: false,  
    });
    setTimeout(() => {
      this.swiper?.update();  // Ensures it adapts to breakpoints after rendering
    }, 100); 
    ///// get client list from service//////
    this.clientService.getClients().then((data) =>{ this.clients = data.sort((a:any, b:any) => a.id - b.id);
    });

  }
   rightRotateByNAndUpdateIds(arr: any[], n: number) {
    const length = arr.length;
    n = n % length; // Handle cases where n > array length

    if (n > 0) {
        const rotated = arr.slice(-n).concat(arr.slice(0, length - n)); // Rotate
        // Update IDs based on new order
        rotated.forEach((obj, index) => {
            obj.sort_id = index + 1; // Assign new IDs starting from 1
        });
        return rotated;
    }
    return arr; // Return original array if no rotation
}

}
