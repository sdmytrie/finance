export class User {
    constructor(
        public username: string,
        public id: string,
        private tokenExpires: number,
        private _token: string
    ) { }

    get token() {
        if (!this.tokenExpires || new Date().getTime() > this.tokenExpires) {
            return null;
        }
        return this._token;
    }
}
