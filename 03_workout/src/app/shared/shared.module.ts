import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterLayoutComponent } from './layouts/center-layout/center-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

@NgModule({
  declarations: [CenterLayoutComponent, DefaultLayoutComponent],
  imports: [CommonModule],
  exports: [CenterLayoutComponent, DefaultLayoutComponent]
})
export class SharedModule {}
