export class Account {
  constructor(
    public name: string,
    public bank?: string,
    public balance?: number,
    public id?: number,
    public iban?: string,
    public bic?: string
  ) {}
}
