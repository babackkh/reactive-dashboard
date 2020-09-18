import { errorMessages } from './../../../form-validators/error-messages';
import { regExps } from './../../../form-validators/regExps';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';
import { UsersModel } from 'src/app/models/users.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  addUserForm: FormGroup;
  regExps = regExps;
  errorMessages = errorMessages;
  userRoles = ['Admin', 'Berater', 'Agent'];

  constructor(
    public dialogRef: MatDialogRef<UsersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsersModel
  ) {}

  get formControl(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSaveData(): void {
    if (this.addUserForm.invalid) {
      return;
    }
    const userPhone: string = this.addUserForm.value.phone;
    this.data = {
      ...this.addUserForm.value,
      phone: `030 ${userPhone.slice(0, 4)} ${userPhone.slice(4, 8)}`,
    };

    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.addUserForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(this.regExps.email),
        ],
      }),
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(1000000),
          Validators.max(9999999),
        ],
      }),
      role: new FormControl(null, Validators.required),
    });
  }
}
