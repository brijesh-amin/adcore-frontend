import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { routes } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseEditComponent,
    CourseDetailsComponent,
    CustomPaginatorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Configure routing
    HttpClientModule, // Import HttpClientModule here
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule,
    MatIcon,
    MatSelect,
    MatTooltipModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
