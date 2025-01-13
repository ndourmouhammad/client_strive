import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee, ClientProject } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../resuableComponent/alert/alert.component";
import { MyButtonComponent } from "../../resuableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AlertComponent, MyButtonComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit{

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  })

  clientService = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];
  clientProjectList = signal<ClientProject[]>([])

  firstName = signal("Angular 18");


  ngOnInit(): void {
    const name = this.firstName();
    this.getAllClients();
    this.getAllEmployees();
    this.getAllClientProjects();
  }

  changeFirstName() {
    this.firstName.set("React JS");
  }

  getAllEmployees() {
    this.clientService.getAllEmployees().subscribe((result: APIResponseModel) => {
      this.employeeList = result.data
    });
  }


  getAllClients() {
    this.clientService.getAllClients().subscribe((result: APIResponseModel) => {
      this.clientList = result.data
    });
  }

  getAllClientProjects() {
    this.clientService.getAllClientsProjects().subscribe((result: APIResponseModel) => {
      this.clientProjectList.set(result.data);
    })
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    this.clientService.addClientProjectUpdate(formValue).subscribe((result: APIResponseModel) => {
      if(result.result) {
        alert("Project Created Successfully");
      } else {
        alert(result.message);
      }
    })
  }

}
