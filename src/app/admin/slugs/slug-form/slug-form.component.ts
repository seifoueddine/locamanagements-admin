import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SlugsService } from 'src/app/services/slugs.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { wilayasCommunes } from 'src/environments/wilayasCommunes';

@Component({
  selector: 'app-slug-form',
  templateUrl: './slug-form.component.html',
  styleUrls: ['./slug-form.component.scss']
})
export class SlugFormComponent implements OnInit {
  slug: any;
  slugFormGroup: FormGroup;
  slugId: any;
  wilayas: any;
  communes: any;
  communesSelected;
  constructor(private router: Router, private slugService: SlugsService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, public dialogRef: MatDialogRef<SlugFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.slugId = data.id;
      this.slug = data.attributes;
    }
    this.wilayas = wilayasCommunes.WILAYAS;
    this.communes = wilayasCommunes.COMMUNES;
  }

  ngOnInit(): void {
    this.createSlugForm();
  }



  createSlugForm() {
    this.communesSelected = this.communes.filter(
      x => x.wilaya_id ===  this.slug.Wilaya
    )
    this.slugFormGroup = this.formBuilder.group({
      name: [this.slug.Name, Validators.required],
      wilaya: [this.slug.Wilaya, Validators.required],
      city: [this.slug.City, Validators.required],
      subscription_type: [this.slug.SubscriptionType, Validators.required],
      subscription_end: [new Date(this.slug.SubscriptionEnd), Validators.required],
    });
  }


  updateSlug(event) {
    event.preventDefault();
    if (this.slugFormGroup.valid) {
      if (this.slug) {
        const object: any = {};
        object.id = this.slugId;
        object.name = this.slugFormGroup.value.name;
        object.wilaya = this.slugFormGroup.value.wilaya;
        object.city = this.slugFormGroup.value.city;
        object.subscription_type = this.slugFormGroup.value.subscription_type;
        object.subscription_end = this.slugFormGroup.value.subscription_end;
        this.slugService.updateSlug(object).subscribe(res => {
          if (res) {
            this.dialogRef.close(res);
          }
        }, error => {
  
            this.snackBar.open(error.error.errors, 'close', { verticalPosition: 'top', panelClass: ['error-snackbar'] });
         
        });
      }
    }
  }

  get name() {
    return this.slugFormGroup.get('name') as FormControl;
  }

  get wilaya() {
    return this.slugFormGroup.get('name') as FormControl;
  }

  get city() {
    return this.slugFormGroup.get('name') as FormControl;
  }


  
  selectWilaya(wilaya) {
    const wilayaId = wilaya.id
    this.communesSelected = this.communes.filter(
      x => x.wilaya_id === wilayaId
    );
  }

  selectCommune(commune) {
    const codeP = commune.code_postal;
    this.slugFormGroup.value.wilaya = commune.id;
  }
  

}
