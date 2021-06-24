import { AbstractControl, FormGroup } from '@angular/forms';

export class MyValidators {

  static validPassword(control: AbstractControl){
    const value = control.value;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex =/\d/;
    if( !( (upperCaseRegex.test(value) || lowerCaseRegex.test(value)) && (numberRegex.test(value)) ) ){
        return {invalid_password: true}
    }
    return null;
  }
}