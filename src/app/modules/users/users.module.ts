import { NumericDirective } from './../../directives/numeric-input.directive';
import { UsersAddComponent } from './../../components/users/users-add/users-add.component';
import { UsersTableComponent } from './../../components/users/users-table/users-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../../components/users/users.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    RouterModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersAddComponent,
    NumericDirective,
  ],
  entryComponents: [UsersAddComponent],
  providers: [],
})
export class UsersModule {}
