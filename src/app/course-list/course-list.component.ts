import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = [
    'edit',
    'delete',
    'course_name',
    'location',
    'start_date',
    'course_length',
    'price',
  ];
  dataSource = new MatTableDataSource<Course>();
  pageIndex = 0;
  pageSize = 10;
  totalCourses = 0;
  search = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(
    pageIndex: number = 1,
    pageSize: number = 10,
    search: string = '',
  ): void {
    this.courseService
      .getCourses(pageIndex, pageSize, search)
      .subscribe((response) => {
        this.dataSource.data = response.courses.map((course: Course) => ({
          ...course,
          Location: `${course.country}, ${course.city}, ${course.university}`,
        }));
        this.totalCourses = response.total;
      });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.search = input.value;
      this.loadCourses(this.pageIndex + 1, this.pageSize, this.search);
    }
  }
  updatePagination(): void {
    if (this.paginator) {
      this.paginator.length = this.totalCourses;
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.pageIndex;
    }
  }
  onPageChanged(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadCourses(this.pageIndex + 1, this.pageSize, this.search);
  }

  onAddNewCourse() {
    // Navigate to the "Add New Course" page
    this.router.navigate(['/courses/create']);
  }

  deleteCourse(course: Course) {
    if (course._id) {
      this.courseService.deleteCourse(course._id).subscribe(() => {
        this.loadCourses(); // Refresh the list
      });
    } else {
      console.error('Course ID is undefined');
    }
  }

  editCourse(course: Course) {
    this.router.navigate(['/courses/edit/', course._id]);
  }

  calculateCourseLength(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const lengthInDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
    );
    return `${lengthInDays} days`;
  }
}
