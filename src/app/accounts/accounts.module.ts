import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsRouterModule } from './accounts-router.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent],
  imports: [FormsModule, SharedModule, AccountsRouterModule],
})
export class AccountsModule {}
