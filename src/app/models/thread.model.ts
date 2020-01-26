import { Message } from './message.model';

export class Thread {
    constructor(
        public id: string,
        public snippet: string,
        public historyId: string,
        public messages: Array<Message>
    ) {}
}
