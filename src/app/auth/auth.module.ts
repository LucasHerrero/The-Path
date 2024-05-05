import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [AuthComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    IonicStorageModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AuthModule {}
