const app = require("../api");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("check the get  api", done => {
    chai
      .request(app)
      .get("/customer")
      .send({customerName:"Hyma"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.result[0].customerName).to.equals("Hyma");
        done();
      });
  });
  it(" negative case", done => {
    chai
      .request(app)
      .get("/customer")
      .send({customerName:"Hyma"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.result[0].customerName).to.equals("Hima");
        done();
      });
  });
  it("check get api", done => {
    chai
      .request(app)
      .get("/customer")
      .send({Location:"kota"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.result[1].Location).to.equals("kota");
        done();
      });
  });
  it("check the post api", done => {
    chai
      .request(app)
      .post("/customer")
      .send({customerId:12346,customerName:"ramesh"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("added");
      expect(res.body.result.customerId).to.equals(12346);
      expect(res.body.result.customerName).to.equals("ramesh");
        done();
      });
  });
  it("negative case of post api", done => {
    chai
      .request(app)
      .post("/customer")
      .send({customerId:12345})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("added");
      expect(res.body.result.customerId).to.equals(12346);
      
        done()
      });
  });
    
});
