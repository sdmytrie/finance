import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { AccountStoreService } from './store/account-store.service';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent],
  // providers: [AccountStoreService],
})
export class SharedModule {}
