export interface MailModel {
  to: string;
  title: string;
  content: string;
  fileAttachment?: any[];
  cc?: string;
  bcc?: string;
}