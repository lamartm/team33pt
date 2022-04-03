const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const server = require("../server");
let chai = require("chai");
let should = chai.should();
let chaiHttp = require("chai-http");
const dotenv = require("dotenv");

chai.use(chaiHttp);

dotenv.config();

const tempUser = {
  username: process.env.USER_TEST,
  password: process.env.USER_TEST_PASSWORD,
};

const tempNewUser = {
  _id: "rolo",
  username: "rolo",
  password: "rolo",
  name: "rolo",
  likes: "Natuur",
  email: "rolo@gmail.com",
  favourites: [],
};

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("/POST home", () => {
  it("should get correct credentials", (done) => {
    request(server)
      .post("/")
      .send(tempUser)
      .expect(302)
      .then((res) => {
        expect(res.request._data.username).to.be.eql(process.env.USER_TEST);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/POST new users", () => {
  it("should register new user", (done) => {
    request(server)
      .post("/signup")
      .send(tempNewUser)
      .expect(302)
      .then((res) => {
        expect(res.request._data.username).to.be.eql("rolo");
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't accept the username that already exists in the database", (done) => {
    request(server)
      .post("/signup")
      .send(tempNewUser)
      .expect(302)
      .then((res) => {
        expect(res.res.text).to.be.eql("Found. Redirecting to /error/email");
        done();
      })
      .catch((err) => done(err));
  });
});
