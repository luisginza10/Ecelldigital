import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCurrencyFormatModule} from 'mat-currency-format';

import {
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatDialogModule,
  MatSnackBarModule,
  MatGridListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatCheckboxModule
  } from '@angular/material';


const myModule = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatGridListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatCurrencyFormatModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule]
})
export class MaterialModule { }
