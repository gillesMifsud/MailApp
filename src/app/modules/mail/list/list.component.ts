import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
import { UserService } from '../../../services/user.service';
import { forkJoin } from 'rxjs';
import { Thread } from 'src/app/models/thread.model';
import { finalize } from 'rxjs/operators';
import { Message } from 'src/app/models/message.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    threads = new Array();
    user;
    isLoading: boolean;
    private messages = [];

    constructor(private mailService: MailService) {}

    ngOnInit() {
        this.getThreads();
        this.getMailById('16f4d3f8cdf78dd8');
    }

    /**
     * Get latest threads with their messages
     */
    getThreads() {
        this.isLoading = true;
        return this.mailService
            .getThreadsList()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(
                response => {
                    const threadList = response;
                    console.log(
                        'TCL: ListComponent -> getAllThreadsWithDetail -> threadList',
                        threadList
                    );

                    const threadObsArray = [];

                    for (let i = 0; i <= threadList.length; i++) {
                        if (threadList[i] && threadList[i].id) {
                            threadObsArray.push(
                                this.mailService.getThreadDetail(response[i].id)
                            );
                        }
                    }
                    forkJoin(...threadObsArray).subscribe(results => {
                        results.map((thread, index) => {
                            // Get labelIds [string]
                            const labelsId = thread.messages[0].labelIds;
                            const threadId = thread.id;
                            // ['Subject', 'From', 'To', 'Date']
                            const headers = thread.messages[0].payload.headers;
                            const subject = headers.filter(
                                v => v.name === 'Subject'
                            );
                            const fromexp = headers.filter(
                                v => v.name === 'From'
                            );
                            const to = headers.filter(v => v.name === 'To');
                            const date = headers.filter(v => v.name === 'Date');

                            const bodyParts = thread.messages[0].payload.parts;

                            const bodyResponse =
                                bodyParts !== undefined
                                    ? bodyParts
                                          .filter(
                                              part =>
                                                  part.mimeType === 'text/html'
                                          )
                                          .map(part =>
                                              this.parseMail(part.body.data)
                                          )
                                    : '';

                            const item$ = {
                                id: threadId,
                                labelsId,
                                subject: subject[0] ? subject[0].value : '',
                                fromexp: fromexp[0] ? fromexp[0].value : '',
                                to: to[0] ? to[0].value : '',
                                date: date[0] ? date[0].value : '',
                                bodyResponse
                            };

                            this.threads = this.threads.concat([item$]);
                            // console.log(item$);
                        });
                        // console.log(this.$threadList);
                    });
                },
                error => console.log(error)
            );
    }

    // var part = message.parts.filter(function(part) {
    //     return part.mimeType == 'text/html';
    // });
    // var html = urlSafeBase64Decode(part.body.data);

    private parseMail(content) {
        return atob(content.replace(/-/g, '+').replace(/_/g, '/'));
    }

    private getMailById(id) {
        return this.mailService
            .getThreadDetail(id)
            .subscribe(res => console.log(res));
    }
}
