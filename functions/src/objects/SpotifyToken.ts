export default class SpotifyToken {
    constructor(
            private _accessToken: string,
            private _refreshToken: string,
            private _id: string = "") {}

    public get accessToken():string {
        return this._accessToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }

    public get id(): string {
        return this._id;
    }
}