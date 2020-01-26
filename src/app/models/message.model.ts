import { Attachment } from './attachment.model';

export class Message {
        id: string;
        threadId: string;
        labelIds: [
          string
        ];
        snippet: string;
        historyId: string;
        internalDate: string;
        payload: {
          partId: string,
          mimeType: string,
          filename: string,
          headers: [
            {
              name: string;
              value: string;
            }
          ];
          body: Attachment,
          parts: []
        };
        sizeEstimate: number;
        raw: string;
}