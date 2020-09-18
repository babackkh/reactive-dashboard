import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private dialog: MatDialog) {}

  // MAT DIALOG FUNCS
  openDialog(
    componentRef: ComponentType<any> | TemplateRef<any>,
    config: MatDialogConfig<any>
  ): Observable<any> {
    const dialogRef = this.dialog.open(componentRef, config);
    return dialogRef.afterClosed();
  }
}
