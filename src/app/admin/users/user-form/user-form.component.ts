import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from 'src/app/shared/models/users.model';
import { SlugsService } from 'src/app/services/slugs.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  user: Users;

  isLinear = true;
  slugFormGroup: FormGroup;
  userFormGroup: FormGroup;
  
  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private slugsService: SlugsService) {
    if (data) {
      this.user = data;
    }
  }

  ngOnInit(): void {

    this.createSlugForm();
    this.createUserForm({})
  }


  createSlugForm() {
    this.slugFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
}


addNewSlug(event) {
  event.preventDefault();
  if (this.slugFormGroup.valid) {

    this.slugsService.addSlug({
      name: this.slugFormGroup.value.name
  
  }).subscribe(
    res =>  {console.log(res)
      this.createUserForm(res);
       this.isLinear = false;
        this.snackBar.open('new slug added ' , '', { verticalPosition: 'top', horizontalPosition: 'right',duration: 4000, });
     
      } ,
      error => { console.log(error)
        if(error.status = 422){
          this.isLinear = true;
          this.snackBar.open('This slug has already been taken', 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
        }
      }
  );

  }
}


createUserForm(slug) {
  this.userFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    slug_id: [slug.id]
  });
}


addNewUser(event) {
  event.preventDefault();
  if (this.userFormGroup.valid) {

    this.userService.addUser({
      name: this.userFormGroup.value.name,
      email: this.userFormGroup.value.email,
      password: this.userFormGroup.value.password,
      slug_id: this.userFormGroup.value.slug_id
  
  }).subscribe(
    res =>  {console.log(res)

        this.snackBar.open('new user added ' , '', { verticalPosition: 'top', horizontalPosition: 'right',duration: 4000, });
        this.dialogRef.close()
      } ,
      error => { console.log(error)

          this.snackBar.open('error user', 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
        
      }
  );

  }
}


}
