import { NgModule } from "@angular/core";

import {
    MatCommonModule,
    MatLineModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPseudoCheckboxModule,
    MatRippleModule
} from '@angular/material/core';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    exports:[
        MatCommonModule,
        MatLineModule,
        MatNativeDateModule,
        MatOptionModule,
        MatPseudoCheckboxModule,
        MatRippleModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ]
})

export class MaterialModule {}