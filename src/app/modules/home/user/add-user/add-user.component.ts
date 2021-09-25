import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../../../../services/user.service";


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('userFormComponent', {static: false}) userFormComponent: UserFormComponent | undefined;
  @Input() student: any;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter<any>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('Student:::', this.student);
  }

  saveStudent(){
    if(this.userFormComponent && typeof this.userFormComponent.isFormValid == 'function' && this.userFormComponent.isFormValid()){
      console.log(this.userFormComponent.getValues());
      this.userService.add(this.userFormComponent.getValues())
        .subscribe((data: any) => {
          this.closeModal(data);
          console.log('Data: ', data);
        });
    }
  }

  closeModal(value: any){
    console.log('data');
      this.closeDialog.emit(value);
  }


}
