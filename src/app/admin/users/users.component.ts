import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from 'src/app/shared/models/users.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  active = 'id';
  direction = 'desc';
  pageIndex = 1;
  displayedColumns = ['id', 'name', 'email', 'created_at','slug_id'];
  dataSource = new MatTableDataSource<Users>();
  elementsLength = 0;
  pageSize = 10;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  
  constructor(private router: Router, private usersService: UsersService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers = () => {
    this.usersService.getUsers(undefined, undefined, undefined, undefined)
      .subscribe((res: HttpResponse<Users[]>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        this.dataSource.data = res.body;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right' });
      });
  }

  sortData(event) {
    this.active = event.active;
    this.direction = event.direction;
    this.pageIndex = 1;
    this.usersService.getUsers(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<Users[]>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        this.dataSource.data = res.body;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      });

  }

  getUpdate(event) {
    this.pageIndex = event.pageIndex + 1;
    this.usersService.getUsers(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<Users[]>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        this.dataSource.data = res.body;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right'});
      });
  }


  
  viewUser(user: Users) {
    // console.log(user.id);

    // this.router.navigate(this.userViewRoute, { queryParams: { id: user.id } });

  }


  goToNewUser() {
    this.dialog.open(UserFormComponent);
  }

  goToUser(){

  }


}
