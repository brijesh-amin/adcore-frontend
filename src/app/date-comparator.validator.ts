import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateComparatorValidator(
  startDateControlName: string,
  endDateControlName: string,
): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const startDateControl = formGroup.get(startDateControlName);
    const endDateControl = formGroup.get(endDateControlName);

    if (startDateControl && endDateControl) {
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);

      if (
        startDateControl.value &&
        endDateControl.value &&
        endDate < startDate
      ) {
        return { dateInvalid: true };
      }
    }

    return null;
  };
}
