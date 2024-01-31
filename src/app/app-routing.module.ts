import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { EditbillComponent } from './component/editbill/editbill.component';
import { TambahtemanComponent } from './component/tambahteman/tambahteman.component';
import { SummarybillComponent } from './component/summarybill/summarybill.component';
import { PilihitemComponent } from './component/pilihitem/pilihitem.component';
import { ScanbillComponent } from './component/scanbill/scanbill.component';
import { RiwayatbillComponent } from './component/riwayatbill/riwayatbill.component';
import { AdjustqtyComponent } from './component/adjustqty/adjustqty.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent},
  { path: 'splitbill', component: SplitbillComponent, canActivate:[AuthGuard]},
  { path: 'pembayaran', component: PembayaranComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomescreenComponent, canActivate: [AuthGuard]},
  { path: 'hasilscan', component: HasilscanComponent, canActivate: [AuthGuard]},
  { path: 'coba', component: CobacobaComponent, canActivate: [AuthGuard]},
  { path: 'pln', component: PlnComponent, canActivate: [AuthGuard]},
  { path: 'summarypln', component: SummaryplnComponent, canActivate: [AuthGuard]},
  { path: 'buktibayar', component: BuktibayarComponent, canActivate: [AuthGuard]},
  { path: 'editbill', component: EditbillComponent, canActivate: [AuthGuard]},
  { path: 'buktibayar', component: BuktibayarComponent, canActivate: [AuthGuard]},
  { path: 'summarypln', component: SummaryplnComponent, canActivate: [AuthGuard]},
  { path: 'summarypln/:idpel', component: SummaryplnComponent, canActivate: [AuthGuard] },
  { path: 'buktibayar/:idpel', component: BuktibayarComponent, canActivate: [AuthGuard] },
  { path : 'tambahteman', component:TambahtemanComponent, canActivate: [AuthGuard]},
  { path : 'summarybill', component:SummarybillComponent, canActivate: [AuthGuard]},
  { path : 'pilihitem', component:PilihitemComponent, canActivate: [AuthGuard]},
  { path : 'scanbill', component:ScanbillComponent, canActivate: [AuthGuard]},
  { path : 'riwayatbill', component:RiwayatbillComponent, canActivate: [AuthGuard]},
  { path : 'adjustqty', component:AdjustqtyComponent, canActivate: [AuthGuard]},
  { path: 'adjustqty/:idItem', component: BuktibayarComponent , canActivate: [AuthGuard]},
  { path: 'summarypln/:idpel/:rekening', component: SummaryplnComponent , canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
