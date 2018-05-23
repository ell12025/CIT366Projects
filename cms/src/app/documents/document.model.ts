export class Document {
  public documentId: string;
  public documentName: string;
  public description: string;
  public fileUrl: string;
  public children: any;

  constructor (documentId: string, documentName: string, description: string, fileUrl: string, children: any) {
    this.documentId = documentId;
    this.documentName = documentName;
    this.description = description;
    this.fileUrl = fileUrl;
    this.children = children;
  }
}
