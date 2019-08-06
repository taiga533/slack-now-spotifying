import * as functionsTestDriver from "firebase-functions-test"
export function initialize() {
    const testDriver = functionsTestDriver()
    testDriver.mockConfig({
        spotify: {
            secret: "foo",
            client_id: "bar",
            redirect_url: "http://test.com/auth_redirect"
        },
        slack: {
            token: "test-token"
        }
    })
}