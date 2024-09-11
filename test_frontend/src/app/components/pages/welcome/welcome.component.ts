import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './welcome.component.html',
})

export class WelcomeComponent {

  // Constructor
  constructor(private titleService: Title) { }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Welcome");
  }

}