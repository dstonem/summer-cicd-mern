const mocha = require('mocha')
const chai = require('chai')
const mongoose = require('mongoose')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const restaurantController = require('../../controllers/restaurantController')

const expect = chai.expect
chai.use(sinonChai)

//DESCRIBE BLOCK
describe("",() => {
    //IT BLOCK
    it("", () => {

    })
})

describe("restaurantController",() => {
    describe("findById", () => {
        const sandbox = sinon.createSandbox()

        afterEach(() => {
            sinon.restore()
            sandbox.restore()
        })

        const req = {
            params: {
                id: 1
            }
        }

        const statusJsonSpy = sinon.spy()
            
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        }

        it("should return a model if found", async () => {
            mongoose.Model.findById = sandbox.stub().returns(Promise.resolve("banana"))

            await restaurantController.findById(req,res)

            expect(res.json).to.have.been.calledWith("banana")
        })
        it("should return an error message if an error occurs", async () => {
            mongoose.Model.findById = sandbox.stub().returns(Promise.reject("error message"))

            await restaurantController.findById(req,res)
            await console.log("---")//adding one more await allows enough processing time for this test to pass

            expect(res.status).to.have.been.calledWith(422)
            expect(statusJsonSpy).to.have.been.calledWith("error message")//this tests the json at the end of the error's promise chain 
        })
    })
})