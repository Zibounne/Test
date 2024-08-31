import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sign-up.component.html',
})

export class SignUpComponent {

  // Constructor
  constructor(private titleService: Title) { }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Test | Sign Up");
  }
}