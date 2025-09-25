import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    ($('.owl-carousel.testimonial') as any).owlCarousel({
      loop: true,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 7000,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        1200: { items: 1 }
      }
    });
  }

}
