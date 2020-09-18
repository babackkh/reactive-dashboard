import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CallService } from 'src/app/services/call.service';

@Component({
  selector: 'app-calls-widget',
  templateUrl: './calls-widget.component.html',
  styleUrls: ['./calls-widget.component.scss'],
})
export class CallsWidgetComponent implements OnInit, OnDestroy {
  status: string;
  callsCount: number;
  callsNumberSubs: Subscription;

  constructor(private callService: CallService) {}

  ngOnInit(): void {
    this.callsNumberSubs = this.callService
      .callsUpdateListener()
      .subscribe((value) => {
        this.callsCount = value;
        if (value === 0) {
          this.status = 'idle';
        } else if (value !== 0 && value <= 30) {
          this.status = 'free';
        } else if (value > 30 && value <= 70) {
          this.status = 'busy';
        } else if (value > 70 && value <= 100) {
          this.status = 'stumped';
        }
      });
  }

  ngOnDestroy(): void {
    this.callsNumberSubs.unsubscribe();
  }
}
