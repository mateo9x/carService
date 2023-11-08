export class Attachment {
  id: string;
  file: File;

  constructor(id: string, file: File) {
    this.id = id;
    this.file = file;
  }
}
