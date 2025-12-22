import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
  imports: [RouterLink],
})
export class NotfoundComponent {}
