import 'module-alias/register';
import * as functions from 'firebase-functions';
import AccountService from 'src/services/AccountService';
import SlackStatusService from 'src/services/SlackStatusService';
import * as admin from 'firebase-admin';
admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const auth_spotify = functions.https.onRequest((request, response) => {
    const accountService = new AccountService();
    response.send(`<a href="${accountService.authUrl}">click here</a>`);
});

export const auth_redirect = functions.https.onRequest(async (request, response) => {
    const accountService = new AccountService();
    const authCode = request.query['code'];
    const res = await accountService.fetchToken(authCode);
    await accountService.storeToken(res.data.access_token, res.data.refresh_token)
    await response.send(res.data);
});

export const refreshTokenPubSub = functions.pubsub.schedule('50 * * * *').onRun(async context => {
    const accountService = new AccountService();
    return await accountService.refreshTokens();
})

export const updateSlackStatusPubSub = functions.pubsub.schedule('1-59/2 9-19 * * 1-5').onRun(async context => {
    const slackStatusService = new SlackStatusService();
    return await slackStatusService.setNowPlayingToStatus();
})

export const refresh_token = functions.https.onRequest(async (request, response) => {
    const accountService = new AccountService();
    response.send(await accountService.refreshTokens());
});

export const update_slack_status = functions.https.onRequest(async (request, response) => {
    const slackStatusService = new SlackStatusService();
    response.send(await slackStatusService.setNowPlayingToStatus());
});
