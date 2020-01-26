import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'mail', pathMatch: 'full' }, // Redirect only if the full path is empty
    { path: 'login', component: LoginComponent },
    {
        path: 'mail',
        loadChildren: () =>
            import('./modules/mail/mail.module').then(
                m => m.MailModule
            ),
        data: { preload: false },
        canActivate: [AuthGuard]
    },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
