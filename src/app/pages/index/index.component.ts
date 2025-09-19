import { AfterViewInit, Component } from '@angular/core';

declare var Shuffle: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const container = document.querySelector('.my-shuffle-container');
    if (container) {
      const shuffleInstance = new Shuffle(container, {
        itemSelector: '.grid-item'
      });

      // Wait for DOM ready before filtering
      setTimeout(() => {
        shuffleInstance.filter('clearing');
      }, 100);

      // Filter button events
      const filterButtons = document.querySelectorAll('.btn-filter');
      filterButtons.forEach((button: any) => {
        button.addEventListener('click', () => {
          const group = button.getAttribute('data-group');
          shuffleInstance.filter(group);

          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });
    }
  }
}
