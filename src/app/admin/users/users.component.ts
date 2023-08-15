import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Users } from 'src/app/shared/models/users.model';

import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpResponse } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  active = 'id';
  direction = 'desc';
  pageIndex = 1;
  displayedColumns = ['avatar', 'name', 'email', 'created_at', 'slug_id', 'role', 'action'];
  dataSource = new MatTableDataSource<Users>();
  elementsLength = 0;
  pageSize = 10;
  urlForAvatar = environment.URL_PATH;
  slugs: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  openDialogForConfirmation(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  
  constructor(private router: Router, private usersService: UsersService, private snackBar: MatSnackBar, private dialog: MatDialog) { }
  
  ngOnInit() {
    this.getUsers();
  }


  getUsers = () => {
    this.usersService.getUsers(undefined, undefined, undefined, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp =  res.body;
        this.dataSource.data = resp.data;
        console.log(this.dataSource.data );
        
        this.slugs = resp.included;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right' });
      });
  }

  sortData(event) {
    this.active = event.active;
    this.direction = event.direction;
    this.pageIndex = 1;
    this.usersService.getUsers(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp =  res.body;
        this.dataSource.data = resp.data;
        this.slugs = resp.included;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      });

  }

  getUpdate(event) {
    this.pageIndex = event.pageIndex + 1;
    this.usersService.getUsers(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp =  res.body;
        this.dataSource.data = resp.data;
        this.slugs = resp.included;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right'});
      });
  }


  
  viewUser(user: Users) {
    // console.log(user.id);

    // this.router.navigate(this.userViewRoute, { queryParams: { id: user.id } });

  }


  goToNewUser() {
    const dialogResp = this.dialog.open(UserFormComponent);
    dialogResp.afterClosed().subscribe(res => {
      this.getUsers();
    });
  }

  goToUser(){

  }


  deleteUser(user: Users) {
    this.usersService.deleteUser(user.id).subscribe(() => {
      this.snackBar.open('Delete user', '', { verticalPosition: 'top',  horizontalPosition: 'right', duration: 4000});
      this.getUsers();
    }, err => {
     
        this.snackBar.open(err, 'close', { verticalPosition: 'top',  horizontalPosition: 'right'});
     
    });
  }


  getSlugName(slug_id){
    let slug = this.slugs.find(x => +x.id === slug_id);
    return slug.attributes.Name
    
  }


}
