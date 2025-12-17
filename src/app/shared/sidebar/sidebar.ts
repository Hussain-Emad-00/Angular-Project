import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserInfoComponent} from '../user-info/user-info';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  imports: [RouterLink, UserInfoComponent]
})
export class SidebarComponent {
  isOpen = input.required()
  categories = [
    {path: '/admin/customers', name: 'Customers'},
    {path: '/admin/products', name: 'Products'},
  ]
}
