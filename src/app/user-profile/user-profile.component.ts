import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US'
      );
      return this.user;
    });
  }

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      if (
        this.user.Username !== result.Username ||
        this.user.Password !== result.Password
      ) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Account has been updated, please log in again',
          'OK',
          { duration: 2000 }
        );
      } else {
        this.snackBar.open('Account has been updated', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  deleteUserInfo(): void {
    if (confirm('Are you sure to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  }
}
