export class Account {
  constructor(
    public name: string,
    public bank: string,
    public iban?: string,
    public bic?: string,
    public balance?: number,
    public id?: number,
  ) {}
}
