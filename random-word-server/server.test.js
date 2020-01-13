// test-wrapper for http
// https://www.npmjs.com/package/supertest
const request = require("supertest");
const app = require("./server");

describe("root path", () => {
  test("responds with status 200 on GET", () => {
    // wait for async call
    return request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
  test("response is a five-letter word", () => {
    return request(app)
      .get("/")
      .then(res => {
        expect(res.text.length).toBe(5);
      });
  });
});
