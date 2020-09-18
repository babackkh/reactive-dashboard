import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from '../../components/settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [SettingsComponent],
  providers: [],
})
export class SettingsModule {}
