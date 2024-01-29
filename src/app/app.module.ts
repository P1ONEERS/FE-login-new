import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomescreenComponent } from './component/homescreen/homescreen.component';
import { SplitbillComponent } from './component/splitbill/splitbill.component';
import { PembayaranComponent } from './component/pembayaran/pembayaran.component';
import { LoginComponent } from './component/login/login.component';
import { HasilscanComponent } from './component/hasilscan/hasilscan.component';
import { LandingComponent } from './component/landing/landing.component';
import { CobacobaComponent } from './component/cobacoba/cobacoba.component';
import { PlnComponent } from './component/pln/pln.component';
import { SummaryplnComponent } from './component/summarypln/summarypln.component';
import { BuktibayarComponent } from './component/buktibayar/buktibayar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';
import { EditbillComponent } from './component/editbill/editbill.component';
import { TambahtemanComponent } from './component/tambahteman/tambahteman.component';
import { SummarybillComponent } from './component/summarybill/summarybill.component';
import { TemanService } from './services/teman.service';
import { PilihitemComponent } from './component/pilihitem/pilihitem.component';
import { RiwayatbillComponent } from './component/riwayatbill/riwayatbill.component';
import { AdjustqtyComponent } from './component/adjustqty/adjustqty.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    SplitbillComponent,
    PembayaranComponent,
    LoginComponent,
    HasilscanComponent,
    LandingComponent,
    CobacobaComponent,
    PlnComponent,
    SummaryplnComponent,
    BuktibayarComponent,
    EditbillComponent,
    TambahtemanComponent,
    SummarybillComponent,
    PilihitemComponent,
    RiwayatbillComponent,
    AdjustqtyComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [DataService, TemanService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
