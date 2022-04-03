const expect = require("chai").expect;
const request = require("supertest");
const server = require("../server");
const dotenv = require("dotenv");

dotenv.config();

const newUser = {
  username: process.env.TEST_USER,
  password: process.env.TEST_USER_PASSWORD,
};

const newAddedUser = {
  _id: "rolo",
  username: "rolo",
  password: "rolo",
  name: "rolo",
  likes: "Natuur",
  email: "rolo@gmail.com",
  favourites: [],
};

before(function (done) {
  this.timeout(2000);
  setTimeout(done, 1000);
});

describe("/POST home", () => {
  it("should get correct credentials", (done) => {
    request(server)
      .post("/")
      .send(newUser)
      .expect(302)
      .then((res) => {
        expect(res.request._data.username).to.be.eql(process.env.TEST_USER);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/POST new users", () => {
  it("should register new user", (done) => {
    request(server)
      .post("/signup")
      .send(newAddedUser)
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
      .send(newAddedUser)
      .expect(302)
      .then((res) => {
        expect(res.res.text).to.be.eql("Found. Redirecting to /error/email");
        done();
      })
      .catch((err) => done(err));
  });
});
