import * as admin from 'firebase-admin';
import SpotifyToken from 'src/objects/SpotifyToken';

export default class TokenDAO {
    private static COLLECTION_NAME = 'tokens'

    static async addToken(token: SpotifyToken) {
        console.log(JSON.stringify(token))
        await admin.firestore().collection(this.COLLECTION_NAME).add({
            access_token: token.accessToken,
            refresh_token: token.refreshToken
        });
    }

    static async getTokens(): Promise<SpotifyToken[]> {
        const snapshots = await admin.firestore().collection(this.COLLECTION_NAME).get()
        return snapshots.docs.map((document: FirebaseFirestore.QueryDocumentSnapshot) => {
            return new SpotifyToken(
                    document.data().access_token,
                    document.data().refresh_token,
                    document.id);
        });
    }

    static async updateToken(token: SpotifyToken) {
        const storedToken = admin.firestore().collection(this.COLLECTION_NAME).doc(token.id);
        await storedToken.update({
            access_token: token.accessToken,
            refresh_token: token.refreshToken
        })

    }
}