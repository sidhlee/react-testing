import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getSecretWord, getSecretWordDispatch } from "./index";

describe("getSecretWord action creator", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("add response word to state", () => {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });
    // this function will wait for the returning value to resolve
    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
  describe("updates serverError state to 'true'", () => {
    // NOTE: there's currently no way to simulate server no-response with moxios
    test("when server returns 4xx status", () => {
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404
        });
      });

      // updates serverError state to true
      // when axios responds with 4xx status
      return store.dispatch(getSecretWord()).then(() => {
        const newState = store.getState();
        expect(newState.serverError).toBe(true);
      });
    });
    test("when server returns 5xx status", () => {
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          stats: 500
        });
      });

      return store.dispatch(getSecretWord()).then(() => {
        const newState = store.getState();
        expect(newState.serverError).toBe(true);
      });
    });
  });
});
