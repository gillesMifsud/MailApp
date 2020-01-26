import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { SendComponent } from './send/send.component';
import { DecodeHtmlStringPipe } from '../../pipes/decode-html-string.pipe';
import { RmBtwChevronsPipe } from '../../pipes/rm-btw-chevrons.pipe';
import { SanitizeHtmlPipePipe } from '../../pipes/sanitize-html-pipe.pipe';
import {
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MailRoutingModule } from './mail.routing.module';

@NgModule({
    imports: [
        CommonModule,
        MailRoutingModule,
        MatDialogModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        MatDialogModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        DeleteDialogComponent,
        DetailComponent,
        ListComponent,
        ListItemComponent,
        SendComponent,
        SanitizeHtmlPipePipe,
        RmBtwChevronsPipe,
        DecodeHtmlStringPipe
    ],
    entryComponents: [DeleteDialogComponent]
})
export class MailModule {}
