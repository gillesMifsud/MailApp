import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';

const mailRoutes: Routes = [
    { path: '/mail-list', component: ListComponent },
    { path: 'mail/:id', component: ListItemComponent }
];

@NgModule({
    imports: [RouterModule.forChild(mailRoutes)],
    exports: [RouterModule]
})
export class MailRoutingModule {}
