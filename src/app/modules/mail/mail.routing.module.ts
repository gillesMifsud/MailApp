import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { SendComponent } from './send/send.component';

const mailRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: 'new', component: SendComponent }
];

@NgModule({
    imports: [RouterModule.forChild(mailRoutes)],
    exports: [RouterModule]
})
export class MailRoutingModule {}
