import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { dateComparatorValidator } from '../date-comparator.validator';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;
  universities: string[] = [];
  cities: string[] = [];
  countries: string[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
  ) {
    this.courseForm = this.fb.group(
      {
        university: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        coursename: ['', Validators.required],
        coursedescription: ['', Validators.required],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(1)]],
        currency: ['', Validators.required],
      },
      { validator: dateComparatorValidator('startdate', 'enddate') },
    );
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.courseService.getUniversities().subscribe((data: any) => {
      this.universities = data.universities;
    });

    this.courseService.getCities().subscribe((data: any) => {
      this.cities = data.cities;
    });

    this.courseService.getCountries().subscribe((data: any) => {
      this.countries = data.countries;
    });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }
}
