import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare var Shuffle: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  @ViewChild('bannerTitle') bannerTitle!: ElementRef;
  @ViewChild('bannerParagraph') bannerParagraph!: ElementRef;

  private typingSpeed = 50; // ms per letter

  ngAfterViewInit(): void {
    // --- Shuffle.js init ---
    setTimeout(() => {
      const container = document.querySelector('.my-shuffle-container');
      if (container) {
        const shuffleInstance = new Shuffle(container, {
          itemSelector: '.grid-item',
          sizer: null
        });

        const filterButtons = document.querySelectorAll('.btn-filter');
        const defaultButton: any = document.querySelector('.btn-filter.active');
        if (defaultButton) {
          const group = defaultButton.getAttribute('data-group');
          shuffleInstance.filter(group);
        }
        filterButtons.forEach((button: any) => {
          button.addEventListener('click', () => {
            const group = button.getAttribute('data-group');
            shuffleInstance.filter(group);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
          });
        });
      }
    }, 100);

    // --- Carousel animation hook ---
    const carousel = document.getElementById('mainCarousel');
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', () => {
        this.startTypewriter();
      });
    }

    // Animate first slide on load
    this.startTypewriter();
  }

  startTypewriter() {
    const titleElement = this.bannerTitle.nativeElement;
    const paragraphElement = this.bannerParagraph.nativeElement;

    const titleText = titleElement.innerText;
    const paragraphText = paragraphElement.innerText;

    // clear existing text
    titleElement.innerText = '';
    paragraphElement.innerText = '';

    // type h1, then p
    this.typeText(titleElement, titleText, () => {
      this.typeText(paragraphElement, paragraphText);
    });
  }

  private typeText(element: HTMLElement, text: string, callback?: () => void) {
    let index = 0;
    const interval = setInterval(() => {
      element.innerText += text.charAt(index);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, this.typingSpeed);
  }
}
