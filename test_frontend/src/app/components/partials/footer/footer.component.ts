import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})

export class FooterComponent {

  currentYear: number = 0;

  constructor() {}

  ngOnInit() {
    this.updateYear();
  }
  
  updateYear() {
    this.currentYear = new Date().getFullYear();
  }
  
}