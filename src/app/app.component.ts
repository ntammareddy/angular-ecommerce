import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  images = [1, 2, 3].map((n) => `../assets/images/carousel/carousel_${n}.jpg`);

}
