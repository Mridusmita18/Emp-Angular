import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
EmailForm: FormGroup;
validationmessages={
  'email':{
    'required':'Email is required'
  },
  'confirmemail':{
    'required':'Confirm Email is required'
  }
};
formErrors={
  'email':'',
  'confirmemail':''
};
  constructor(private fb: FormBuilder) { }
logValidationErrors(group: FormGroup=this.EmailForm)
{
  Object.keys(group.controls).forEach( key =>{
    const control= group.get(key);
    if(control instanceof FormGroup)
    this.logValidationErrors(control);
    else {
      const error=this.validationmessages[key];
      for(const errorkey in error.keys)
      this.formErrors[key]+=error[errorkey];
    }

  
    
  })

}
  ngOnInit() {
    this.EmailForm =this.fb.group(
      {
        email:['',Validators.required],
        confirmemail:['',Validators.required],
      }
    );
this.logValidationErrors(this.EmailForm);
  }

}
