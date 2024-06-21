export class User {
  constructor(
    public username: string,
    // public homePage: string,
    // private _role: string,
    private _token: string,
    private _pages: string[],
    private _tokenExpirationDate: Date,
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return "";
    }
    return this._token;
  }

  get expireAt(): Date | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._tokenExpirationDate;
  }

  // get role(): string | null {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return null
  //   }
  //   return this._role
  // }

  get pages(): string[] {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return [];
    }
    return this._pages;
  }
}

export interface UserToken {
  Login: string;
  expire_at: string;
  id: number;
  IsActive: string;
}
