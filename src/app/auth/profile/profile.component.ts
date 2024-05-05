import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {}

  closeSession() {
    this.authService.logout();
    location.reload();
    console.log('Sesión cerrada');
  }
}
