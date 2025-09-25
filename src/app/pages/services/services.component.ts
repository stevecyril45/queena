import { AfterViewInit, Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    ($('.owl-carousel') as any).owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        1200: { items: 1 }
      }
    });
  }
}
