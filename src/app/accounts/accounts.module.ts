import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsRouterModule } from './accounts-router.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent],
  imports: [SharedModule, AccountsRouterModule],
})
export class AccountsModule {}
