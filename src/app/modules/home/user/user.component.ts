import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {NgModel} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  showLoader: boolean = true;
  constructor(private userService: UserService, private toastrService: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getList()
      .subscribe((data: any) => {
        this.users = data;
        this.showLoader = false;
      }, (error: any) => {
        this.showLoader = false;
        this.toastrService.error('Having some error');
        console.log('Error::::', error);
      })
  }

  addUser(modal: any){
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result: any) => {
      console.log('Result::::', result);
    });
  }

  closeDialog(modal: any, data: any){
    modal.dismiss();
    if(typeof data != 'string'){
     this.toastrService.success('Added success fully!')
      this.loadUsers();
    }
  }

  logout(){

    this.userService.logout();
  }
}
