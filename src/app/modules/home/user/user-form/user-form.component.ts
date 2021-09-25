import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup;
  firstNameField: any;
  passwordField: any;
  userNameField: any;
  lastNameField: any;
  titleField: any;
  emailField: any;
  mobileField: any;
  dateField: any;
  gender: any;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildFields();
  }

  buildFields() {
    this.gender = 'male';
    this.buildUserNameField();
    this.buildUserNameField();
    this.buildFirstNameField();
    this.buildLastNameField();
    this.buildFatherNameField();
    this.buildEmailField();
    this.buildMobileField();
    this.buildDateField();
    this.buildPasswordField();
  }

  buildPasswordField(){
    this.passwordField = {
      fieldName: 'password',
      value: '',
      type: 'password',
      displayLabel: 'Password',
      placeholder: 'Enter your password'
    }
  }

  buildDateField(){
    this.dateField = {
      fieldName: 'dob',
      value: '',
      type: 'date',
      displayLabel: 'DOB',
      placeholder: 'Enter your Date of birth'
    }
  }

  buildFirstNameField(){
    this.firstNameField = {
      fieldName: 'first',
      value:  '',
      type: 'Text',
      displayLabel: 'First',
      placeholder: 'Enter your first name'
    }
  }

  buildUserNameField(){
    this.userNameField = {
      fieldName: 'username',
      value:  '',
      type: 'Text',
      displayLabel: 'User Name',
      placeholder: 'Enter your user name'
    }
  }

  buildLastNameField(){
    this.lastNameField = {
      fieldName: 'last',
      value:  '',
      type: 'Text',
      displayLabel: 'Last',
      placeholder: 'Enter your last name'
    }
  }

  buildFatherNameField(){
    this.titleField = {
      fieldName: 'title',
      value:  '',
      type: 'Text',
      displayLabel: 'Title',
      placeholder: 'Enter your title'
    }
  }

  buildEmailField(){
    this.emailField = {
      fieldName: 'email',
      value: '',
      type: 'Email',
      displayLabel: 'Email',
      placeholder: 'Enter your email'
    }
  }

  buildMobileField(){
    this.mobileField = {
      fieldName: 'phone',
      value: '',
      type: 'Mobile',
      displayLabel: 'Phone',
      placeholder: 'Enter your mobile number'
    }
  }


  // Calling from the parent component
  isFormValid(){
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
    }
    return this.formGroup.valid && this.gender;
  }

  // to reset form

  resetForm(){
    this.formGroup.reset();
    this.gender = 'male';
  }

  getValues(){
    const valuesObject = this.formGroup.value;
    const values  = {
      username: valuesObject.username,
      name: {title: valuesObject.title, first: valuesObject.first, last: valuesObject.last},
      email: valuesObject.email,
      phone: valuesObject.phone,
      password: valuesObject.password,
      dob: valuesObject.dob
    }
    return {...values, gender: this.gender}
  }

}
