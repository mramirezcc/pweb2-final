import { Component, Input, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.css'] // corregido de styleUrl a styleUrls
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = ["../../add1.jpg", "../../add2.jpg", "../../add3.jpg"];
  currentIndex: number = 0;
  private intervalId: any;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
          this.cdr.markForCheck();
        });
      }, 3000); // Cambia cada 3 segundos
    });
  }

  setCurrentIndex(index: number): void {
    this.ngZone.run(() => {
      this.currentIndex = index;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
