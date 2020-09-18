import { UsersModel } from './../models/users.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: UsersModel[];
  newUserSub$ = new ReplaySubject<UsersModel>();
  usersSub$ = new ReplaySubject<UsersModel[]>();

  constructor(private http: HttpClient) {}

  usersUpdateListener(): Observable<UsersModel[]> {
    return this.usersSub$.asObservable();
  }

  newUserUpdateListener(): Observable<UsersModel> {
    return this.newUserSub$.asObservable();
  }

  getUsersData(): void {
    this.http
      .get<UsersModel[]>('assets/data/users.json')
      .subscribe((usersData) => {
        this.updateUsers(usersData);
      });
  }

  addNewUser(newUser: UsersModel): void {
    this.users.push(newUser);
    this.newUserSub$.next(newUser);
    this.usersSub$.next([...this.users]);
  }

  updateUsers(updatedUsers: UsersModel[]): void {
    this.users = updatedUsers;
    this.usersSub$.next([...this.users]);
  }
}
