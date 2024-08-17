import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiBase = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Observable<any> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search: search,
    };
    return this.http.get<any>(`${this.apiBase}/courses`, { params });
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiBase}/courses/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiBase}/courses`, course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiBase}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/courses/${id}`);
  }

  getUniversities(): Observable<{ universities: string[] }> {
    return this.http.get<{ universities: string[] }>(
      `${this.apiBase}/universities/`,
    );
  }

  getCities(): Observable<{ cities: string[] }> {
    return this.http.get<{ cities: string[] }>(`${this.apiBase}/cities/`);
  }

  getCountries(): Observable<{ countries: string[] }> {
    return this.http.get<{ countries: string[] }>(`${this.apiBase}/countries/`);
  }
}
