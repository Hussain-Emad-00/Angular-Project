import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

import {Cart} from './cart';
import {HeaderComponent} from '../shared/header/header';


@NgModule({
  declarations: [Cart],
  imports: [CommonModule, RouterLink, HeaderComponent]
})
export class CartModule {
}
