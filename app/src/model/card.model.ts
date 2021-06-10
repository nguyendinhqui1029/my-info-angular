export class CardModel {
  public readonly title: string;
  public readonly date: string;
  public readonly organization: string;
  public readonly address: string;
  public readonly descriptive: string;
  public readonly classTitle?: string;
  public readonly classOrganization?: string;
  public readonly classDate?: string;
  public readonly classDescriptive?: string;
  public readonly classAddress?: string;
  public readonly image?: string = null;
}