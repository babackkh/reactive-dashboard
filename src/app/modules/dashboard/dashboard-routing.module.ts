import { TeamsComponent } from './../../components/dashboard/teams/teams.component';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{ path: ':teamId', component: TeamsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class DashboardRoutingModule {}
