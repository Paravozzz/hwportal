import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './_shared/shared.module';

import { ErrorHandlerService } from './_services/errorHandler.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
import { CalcdoComponent } from './calcdo/calcdo.component';
import { CalcwallsComponent } from './calcwalls/calcwalls.component';
import { AboutComponent } from './about/about.component';
import { CreditsComponent } from './credits/credits.component';
import { IdtabComponent } from './calcdo/idtab/idtab.component';
import { LoadstabComponent } from './calcdo/loadstab/loadstab.component';
import { ConstrtabComponent } from './calcdo/constrtab/constrtab.component';
import { LayersTableComponent } from './calcdo/constrtab/layers-table/layers-table.component';
import { LayersControlsComponent } from './calcdo/constrtab/layers-controls/layers-controls.component';
import { PavementVarComponent } from './calcdo/constrtab/pavement-var/pavement-var.component';

import { DataElementDirective } from './_directives/dataElement.directive';
import { RouterLinkActiveDropdownDirective } from './_directives/routerLinkActiveDropdown.directive';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    CalcdoComponent,
    CalcwallsComponent,
    AboutComponent,
    CreditsComponent,
    IdtabComponent,
    LoadstabComponent,
    ConstrtabComponent,
    LayersTableComponent,
    LayersControlsComponent,
    PavementVarComponent,
    DataElementDirective,
    RouterLinkActiveDropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7048"]
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
