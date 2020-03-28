import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from 'src/app/shared/models/users.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  user: Users;

  editable: boolean;
  formGroup: FormGroup;
  
  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.user = data;
    }
  }

  ngOnInit(): void {
  }

}
