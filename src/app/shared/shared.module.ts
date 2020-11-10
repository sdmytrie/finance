import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropdownDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent],
  providers: [],
})
export class SharedModule {}
