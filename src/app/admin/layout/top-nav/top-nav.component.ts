import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user_creds');
    localStorage.removeItem('client');
    localStorage.removeItem('accessToken');

    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
    localStorage.removeItem('tokenType');

    this.router.navigate(['/login']);
  }
}
