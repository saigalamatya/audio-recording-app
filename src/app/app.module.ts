import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ButtonAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ChartAllModule,
    RangeNavigatorAllModule,
    GridAllModule,
    ButtonAllModule,
    SwitchAllModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
