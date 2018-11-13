import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RjxFunModule } from './rjx-fun/rjx-fun.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperTableModule } from './super-table/super-table.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RjxFunModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    SuperTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
