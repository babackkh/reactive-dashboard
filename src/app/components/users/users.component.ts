import { MaterialService } from './../../services/material.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersModel } from 'src/app/models/users.model';
import { UsersAddComponent } from './users-add/users-add.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  usersData: UsersModel[];
  usersSubs: Subscription;

  constructor(
    private usersService: UsersService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.usersSubs = this.usersService
      .usersUpdateListener()
      .subscribe((usersData) => {
        this.usersData = usersData;
      });
  }

  addNewUser(): void {
    this.materialService
      .openDialog(UsersAddComponent, { data: {} })
      .subscribe((dialogData: UsersModel) => {
        if (!dialogData) {
          return;
        }
        this.usersService.addNewUser(dialogData);
      });
  }

  ngOnDestroy(): void {
    this.usersSubs.unsubscribe();
  }
}
