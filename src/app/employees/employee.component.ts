import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { Department } from '../model/department';
import { Employee } from '../model/employee';
import { CustomValidator } from 'src/shared/customvalidator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 2 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be dell.com'
    },
    'ConfirmEmail': {
      'required': 'Email is required.',
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'emailGroup':{
      'matchEmail':'Email and Confirm Email do not match',

    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };
  formErrors = {
    'fullName': '',
    'email': '',
    'ConfirmEmail': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': '',
    'emailGroup': ''
  };
  employeeForm: FormGroup;
  employee: Employee = {
    Id: null,
    Name: null,
    deptId: null,
    LastName: null,
    MiddleName: null
  };
  gender = 'male';
  isActive = true;
  depttype = '2';
  previewphoto = false;
  constructor(private fb: FormBuilder) { }
  department: Department[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Sales' },
    { id: 3, name: 'HR' },
  ];
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      ContactPreference: ['email'],
      emailGroup : this.fb.group({
        email: ['',[ Validators.required,CustomValidator.emailDomain('dell.com')]],
        ConfirmEmail: ['', Validators.required],
      },{validator: CustomValidator.matchEmail}),
      phone: ['', Validators.required],
      skills: this.fb.group(
        {
          skillName: ['', Validators.required],
          experienceInYears: ['', Validators.required],
          Proficiency: ['', Validators.required],
        }
      )

    });
    this.employeeForm.valueChanges.subscribe(e => {
      this.logkeyvaluepairs(this.employeeForm);
    });

    this.employeeForm.get('ContactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    })

    // this.employeeForm.get('fullName').valueChanges.subscribe(e => {console.log(e); } );
  }

  // tslint:disable-next-line: no-shadowed-variable

  // tslint:disable-next-line: no-shadowed-variable
  logkeyvaluepairs(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach(key => {
      const control = group.get(key);
      this.formErrors[key] = '';
      if (control && !control.valid && (control.touched || control.dirty)) {
        const msg = this.validationMessages[key];
        for (const errorKey in control.errors) {
          if (errorKey) {
            this.formErrors[key] += msg[errorKey];
          }
        }
      }
      if (control instanceof FormGroup) {
        this.logkeyvaluepairs(control);
      } 
    });
  }
  LoadData(): void {
    this.logkeyvaluepairs(this.employeeForm);
  }
  onContactPreferenceChange(selectedvalue: string): void {
    const control = this.employeeForm.get('phone');
    if (selectedvalue === 'phone') {
      control.setValidators(Validators.required);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }
  ShowPreview() {
    this.previewphoto = !this.previewphoto;
  }
  saveEmployee(employeeForm: FormGroup): void {
    console.log(employeeForm.value);
  }
};
