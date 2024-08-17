import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourse(courseId).subscribe(
        (course) => {
          this.course = course;
        },
        (error) => {
          this.snackBar.open('Failed to load course details.', 'Close', {
            duration: 3000,
          });
          console.error('Error:', error);
        },
      );
    }
  }

  deleteCourse(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.deleteCourse(courseId).subscribe(
        () => {
          this.snackBar.open('Course deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/courses']);
        },
        (error) => {
          this.snackBar.open(
            'Failed to delete course. Please try again.',
            'Close',
            {
              duration: 3000,
            },
          );
          console.error('Error:', error);
        },
      );
    }
  }
}
