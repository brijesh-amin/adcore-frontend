import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { Course } from '../course.model'; // Adjust the path as needed
import { dateComparatorValidator } from '../date-comparator.validator';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit {
  courseForm: FormGroup;
  course: Course | null = null;
  universities: string[] = [];
  cities: string[] = [];
  countries: string[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.courseForm = this.fb.group(
      {
        university: [{ value: '', disabled: true }, Validators.required],
        city: [{ value: '', disabled: true }, Validators.required],
        country: [{ value: '', disabled: true }, Validators.required],
        coursename: [{ value: '', disabled: true }, Validators.required],
        coursedescription: ['', Validators.required],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        currency: ['', Validators.required],
      },
      { validator: dateComparatorValidator('startdate', 'enddate') },
    );
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  loadCourse(id: string): void {
    this.courseService.getCourse(id).subscribe(
      (course: Course) => {
        this.course = course;
        this.courseForm.patchValue(course);
      },
      (error) => {
        console.error('Error loading course:', error);
      },
    );
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
  onSubmit(): void {
    if (this.courseForm.valid && this.course) {
      const updatedCourse: Course = {
        ...this.course,
        ...this.courseForm.value,
      };
      this.courseService
        .updateCourse(this.course._id!, updatedCourse)
        .subscribe(
          () => {
            this.router.navigate(['/courses']);
          },
          (error) => {
            console.error('Error updating course:', error);
          },
        );
    }
  }
}
