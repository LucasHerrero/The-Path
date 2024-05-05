import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';
import { IntJwtPayload } from '../IntJwtPayload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  User: IntJwtPayload = {} as IntJwtPayload;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.User = decodedToken;
        });
      }
    });
  }

  closeSession() {
    this.authService.logout();
    location.reload();
    console.log('Sesión cerrada');
  }
}
