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
import { SlugFormComponent } from './slug-form/slug-form.component';
import * as moment from 'moment';
import { wilayasCommunes } from 'src/environments/wilayasCommunes';
//import wilayas from 'src/app/shared/json-data/wilayas.json';
@Component({
  selector: 'app-slugs',
  templateUrl: './slugs.component.html',
  styleUrls: ['./slugs.component.scss']
})
export class SlugsComponent implements OnInit {
  active = 'id';
  direction = 'desc';
  pageIndex = 1;
  displayedColumns = ['id', 'name', 'wilaya', 'city', 'subscription_type', 'subscription_end', 'action'];
  dataSource = new MatTableDataSource<Slugs>();
  elementsLength = 0;
  pageSize = 10;
  wilayasList: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  communesList: any;

  openDialogForConfirmation(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  constructor(private router: Router, private slugsService: SlugsService, private snackBar: MatSnackBar,
    private dialog: MatDialog) {
      this.wilayasList = wilayasCommunes.WILAYAS;
      this.communesList = wilayasCommunes.COMMUNES;
     }



  ngOnInit() {
    this.getSlugs();
  }


  getSlugs = () => {
    this.slugsService.getSlugs(undefined, undefined, undefined, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp = res.body;
        this.dataSource.data = resp.data;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      });
  }

  sortData(event) {
    this.active = event.active;
    this.direction = event.direction;
    this.pageIndex = 1;
    this.slugsService.getSlugs(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp = res.body;
        this.dataSource.data = resp.data;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      });

  }

  getUpdate(event) {
    this.pageIndex = event.pageIndex + 1;
    this.slugsService.getSlugs(this.pageIndex, this.active, this.direction, undefined)
      .subscribe((res: HttpResponse<any>) => {
        this.elementsLength = +res.headers.get('X-Total-Count');
        const resp = res.body;
        this.dataSource.data = resp.data;
      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      });
  }

  viewSlug(slugs: Slugs) {
    // console.log(user.id);

    // this.router.navigate(this.userViewRoute, { queryParams: { id: user.id } });

  }

  deleteSlug(slug: Slugs) {
    this.slugsService.deleteSlug(slug.id).subscribe(() => {
      this.snackBar.open('Delete slug', '', { verticalPosition: 'top', horizontalPosition: 'right', duration: 4000 });
      this.getSlugs();
    }, err => {

      this.snackBar.open(err, 'close', { verticalPosition: 'top', horizontalPosition: 'right' });

    });
  }


  getSubType(type) {
    switch (type) {
      case '1':
        return 'Free trailer'
      case '2':
        return 'Silver'
      case '3':
        return 'Gold'
      default:
        break;
    }

  }


  EditSlug(slug) {
    const dialogResp = this.dialog.open(SlugFormComponent  , {data: slug});
    dialogResp.afterClosed().subscribe(res => {
      this.getSlugs();
    });
  }


  getValue(subscriptionEnd){
    const date =  new Date();
    const subscription_end = new Date( subscriptionEnd);
    let m = moment(subscription_end);
    let days = m.diff(date, 'days');
    return  +days;
  }


  getWilayaName(wilaya_id){
    if(wilaya_id){
      let type = this.wilayasList.find(x => x.id === wilaya_id);
      return type.name
    }

  }

  getCommuneName(commune_id){
    if(commune_id){
      let type = this.communesList.find(x => x.id === commune_id);
      return type.name
    }

  }

}
