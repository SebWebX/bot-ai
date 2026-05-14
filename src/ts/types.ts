export type MessageRole = 'user' | 'bot';

 export interface Message{
  role: MessageRole;
  content: string;
  time: string;
}