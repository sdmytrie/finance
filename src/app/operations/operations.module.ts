import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OperationsComponent],
  imports: [FormsModule, SharedModule, OperationsRoutingModule],
})
export class OperationsModule {}
