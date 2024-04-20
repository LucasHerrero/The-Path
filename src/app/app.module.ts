import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MasinfoComponent } from './rutinas/rutinas-creacion/masinfo/masinfo.component';
@NgModule({
  declarations: [AppComponent,
    MasinfoComponent
  ],
  imports: [BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
     IonicModule.forRoot(), AppRoutingModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
