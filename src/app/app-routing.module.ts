import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

export const routes: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/create', component: CourseCreateComponent },
  { path: 'courses/edit/:id', component: CourseEditComponent },
  { path: 'courses/details/:id', component: CourseDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
