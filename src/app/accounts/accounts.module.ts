import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccountComponent } from './account/account.component';
import { AccountsRouterModule } from './accounts-router.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent, AccountComponent],
  imports: [FormsModule, SharedModule, AccountsRouterModule],
})
export class AccountsModule {}
