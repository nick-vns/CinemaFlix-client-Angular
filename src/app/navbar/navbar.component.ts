import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to movies
   * @function ToMovies
   */

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to user's profile
   * @function ToProfile
   */

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out user, clears token and username from local storage
   * @function logout
   */

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
