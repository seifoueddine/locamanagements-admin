import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Slugs } from 'src/app/shared/models/slugs.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SlugsService } from 'src/app/services/slugs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-slugs',
  templateUrl: './slugs.component.html',
  styleUrls: ['./slugs.component.scss']
})
export class SlugsComponent implements OnInit {
  active = 'id';
  direction = 'desc';
  pageIndex = 1;
  displayedColumns = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Slugs>();
  elementsLength = 0;
  pageSize = 10;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  openDialogForConfirmation(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  
  constructor(private router: Router, private slugsService: SlugsService, private snackBar: MatSnackBar,
              private dialog: MatDialog) { }


  
              ngOnInit() {
                this.getSlugs();
              }
            
            
              getSlugs = () => {
                this.slugsService.getSlugs(undefined, undefined, undefined, undefined)
                  .subscribe((res: HttpResponse<Slugs[]>) => {
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
                this.slugsService.getSlugs(this.pageIndex, this.active, this.direction, undefined)
                  .subscribe((res: HttpResponse<Slugs[]>) => {
                    this.elementsLength = +res.headers.get('X-Total-Count');
                    this.dataSource.data = res.body;
                  }, error => {
                    this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
                  });
            
              }
            
              getUpdate(event) {
                this.pageIndex = event.pageIndex + 1;
                this.slugsService.getSlugs(this.pageIndex, this.active, this.direction, undefined)
                  .subscribe((res: HttpResponse<Slugs[]>) => {
                    this.elementsLength = +res.headers.get('X-Total-Count');
                    this.dataSource.data = res.body;
                  }, error => {
                    this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right'});
                  });
              }

              viewSlug(slugs: Slugs) {
                // console.log(user.id);
            
                // this.router.navigate(this.userViewRoute, { queryParams: { id: user.id } });
            
              }

              deleteSlug(slug: Slugs) {
                this.slugsService.deleteSlug(slug.id).subscribe(() => {
                  this.snackBar.open('Delete slug', '', { verticalPosition: 'top',  horizontalPosition: 'right', duration: 4000});
                  this.getSlugs();
                }, err => {
                 
                    this.snackBar.open(err, 'close', { verticalPosition: 'top',  horizontalPosition: 'right'});
                 
                });
              }

}
