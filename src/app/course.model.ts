export interface Course {
  _id?: string; // Optional if it might not be present in some contexts
  university: string;
  city: string;
  country: string;
  coursename: string;
  coursedescription: string;
  startdate: Date;
  enddate: Date;
  price: number;
  currency: string;
}
