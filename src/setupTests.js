// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import nock from "nock";

beforeEach(() => {
  nock.disableNetConnect();
  nock.load(__dirname + "/tests/recordings/search.json");
});

afterEach((done) => {
  nock.restore();
  nock.cleanAll();
  nock.enableNetConnect();
  nock.activate();
  done();
});
