import { ClientService } from './../../services/client.service';
import { Component, OnInit, inject } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { APIResponseModel } from './../../model/interface/role';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AlertComponent } from "../../resuableComponent/alert/alert.component";
import { MyButtonComponent } from "../../resuableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, AlertComponent, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  currentDate:Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[] = [];

  ClientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.ClientService.getAllClients().subscribe((result: APIResponseModel) => {
      this.clientList = result.data;
    })
  }

  onSaveClient(data: string) {
    this.ClientService.addUpdate(this.clientObj).subscribe(((res:APIResponseModel) => {
      if(res.result) {
        alert("Client Created Successfully");
        this.loadClient();
        this.clientObj = new Client();
      } else {
        alert(res.message);
      }
    }))
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete) {
      this.ClientService.deleteClientById(id).subscribe(((res:APIResponseModel) => {
        if(res.result) {
          alert("Client Deleted Successfully");
          this.loadClient();
        } else {
          alert(res.message);
        }
      }))
    }
  }


}
