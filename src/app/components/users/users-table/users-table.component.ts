import { tap } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { UsersModel } from 'src/app/models/users.model';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersService } from 'src/app/services/users.service';
import { SettingsModel } from 'src/app/models/settings.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() usersDataSource: UsersModel[];
  tableDataSource: MatTableDataSource<UsersModel>;
  settingsSubs: Observable<SettingsModel>;
  newUserSubs: Observable<UsersModel>;
  tableSubscription: Subscription;
  showOnlyAdminUsers: boolean;
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'role',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsSubs = this.settingsService.settingsUpdateListener().pipe(
      tap((settingsData) => {
        this.showOnlyAdminUsers = settingsData.showAdminsOnly.checked;
      })
    );
    this.newUserSubs = this.newUserSubs = this.usersService
      .newUserUpdateListener()
      .pipe(
        tap((newUser) => {
          this.tableDataSource.data.push(newUser);
        })
      );
    this.tableSubscription = forkJoin([
      this.settingsSubs,
      this.newUserSubs,
    ]).subscribe();
  }

  ngOnChanges(): void {
    this.cd.detectChanges();
    if (this.usersDataSource) {
      this.tableDataSource = new MatTableDataSource(this.usersDataSource);
      this.tableDataSource.paginator = this.paginator;

      this.tableDataSource.sort = this.sort;
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
      });
    }
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.showOnlyAdminUsers) {
      this.tableDataSource.filter = 'Admin';
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.tableSubscription.unsubscribe();
  }
}
