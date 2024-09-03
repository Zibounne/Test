import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {

  /////////////////////// Property ////////////////////////

  isAuthenticated: boolean = false;

  ////////////////////// Constructor //////////////////////
  
  constructor(private router: Router) {}
  
  //////////////////////// Methods ////////////////////////
  
  ngOnInit(): void {
    this.checkAuthentication();
  }
  
  // Check authentication status
  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

}