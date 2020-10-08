export class User {
    constructor(
        public username: string,
        public id: string,
        private tokenExpires: number,
        private _token: string
    ) { }

    get token() {
      console.log('Date');
      console.log(this.tokenExpires);
        if (!this.tokenExpires || new Date().getTime() > this.tokenExpires*1000) {
            return null;
        }
        return this._token;
    }
}
