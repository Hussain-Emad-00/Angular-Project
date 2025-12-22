import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
})
export class SidebarComponent {
  isOpen = input.required();
  categories = [
    {path: '/admin/customers/list', name: 'Customers'},
    {path: '/admin/products/list', name: 'Products'},
  ];
}
