import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamsModel } from './../models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  teams: TeamsModel[];
  teamsSub$ = new ReplaySubject<TeamsModel[]>();
  callsNumberSub$ = new Subject<number>();

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  teamsUpdateListener(): Observable<TeamsModel[]> {
    return this.teamsSub$.asObservable();
  }

  callsUpdateListener(): Observable<number> {
    return this.callsNumberSub$.asObservable();
  }

  getTeams(): void {
    this.http
      .get<TeamsModel[]>('assets/data/teams.json')
      .subscribe((responseData) => {
        this.updateTeams(responseData);
      });
  }

  callsNumberGenerator(): Observable<number> {
    return interval(2000).pipe(map((num) => this.generateRandomNum(0, 100)));
  }

  timeStamps(): Observable<string[]> {
    return timer(0, 61000).pipe(map((num) => this.generateDates()));
  }

  private updateTeams(updatedTeams: TeamsModel[]): void {
    this.teams = updatedTeams;
    this.teamsSub$.next([...this.teams]);
  }

  private generateDates(): string[] {
    const result: string[] = [];
    const length = 30;
    for (let i = 0; i < length; i++) {
      const now = new Date().getTime();
      const oneSecondLater = new Date(now + i * 2000);
      const timeString: string = this.datePipe.transform(
        oneSecondLater,
        'hh:mm:ss'
      );

      result.push(timeString);
    }
    return result;
  }

  private generateRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (1 + max - min)) + min;
  }
}
