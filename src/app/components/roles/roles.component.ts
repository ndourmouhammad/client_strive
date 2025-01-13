import { IRole, APIResponseModel } from './../../model/interface/role';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  roleList: IRole[] = [];
  roleService = inject(RoleService);

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe((result: APIResponseModel) => {
      this.roleList = result.data;
    }, error=> {
      alert("API error / Connexion error");
    }); 
  }
}
