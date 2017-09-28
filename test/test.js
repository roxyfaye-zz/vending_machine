const assert = require("assert");
const request = require('supertest');
const application = require("../app")
const express = require('express');
const assertions = require('mocha').it;
const chai = require('chai').assert;





describe('GET/api/customer/items', function (done) {
    it("should return all the items in the vending machine successfully", function (done) {
        request(application)
            .get("/api/customer/items")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, {
                    "status": "success",
                    "data": [{
                            "id": 1,
                            "description": "Corn chips",
                            "cost": 65,
                            "quantity": 4
                        },
                        {
                            "id": 2,
                            "description": "Gum",
                            "cost": 35,
                            "quantity": 10
                        }
                    ]
                })
            })
            .end(done);
    })
})



describe('POST /api/customer/items/:itemId/purchases', function (done) {
    it("should successfully return the purchase from the machine", function (done) {
        request(application)
            .post("/api/customer/items/:itemId/purchases")
            .send({
                id: 2,
                description: 'Gum',
                cost: 65,
                quantity: 1

            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, {
                    "status": "passed",
                    "data": [{
                        "money_given": 65,
                        "money_required": 65
                    }]
                })
            })
            .end(done);
    })
})



describe('GET/api/vendor/purchases', function (done) {
    it("get a list of all purchases with their item and date/time", function (done) {
        request(application)
            .get("/api/vendor/purchases ")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, {

                    "status": "success",
                    "data": [

                        {
                            "timeOfPurchase": "2017-08-28 12:30:00",
                            "description": "corn chips",
                            "quantity": 1,
                            "cost": 80
                        },
                        {
                            "timeOfPurchase": "2017-08-30 12:30:00",
                            "description": "gum",
                            "quantity": 1,
                            "cost": 50
                        }
                    ]

                })
            })
            .end(done);
    })

})

describe('GET /api/vendor/money', function (done) {
    it('get a total amount of money accepted by the machine. A vendor should be able to see total amount of money in machine', function (done) {
        request(application)
            .get("/api/vendor/money ")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, 25.00)
            })
            .end(done);
    })

})



describe('POST /api/vendor/items', function (done) {
    it('A vendor should be able to add a new item to the machine', function (done) {
        request(application)
            .post("/api/vendor/items ")
            .set('Accept', 'application/json')
            .send({
                id: 3,
                description: 'trail mix',
                cost: 1.50,
                quantity: 10
            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, {
                    id: 3,
                    description: 'trail mix',
                    cost: 1.50,
                    quantity: 10
                })
            })
            .end(done);
    })
})

describe('PUT/api/vendor/items/:itemId', function (done) {
    it("A vendor should be able to update item quantity, description, and cost", function (done) {
        request(application)
            .put("/api/vendor/items/:itemId")
            .set('Accept', 'application/json')
            .send({
                id: 3,
                description: 'granola bar',
                cost: 100,
                quantity: 4
            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(function (response) {
                assert.deepEqual(response.body, {
                    "status": "success",
                    "data": 
                    {
                        "id": 3,
                        "description": "granola bar",
                        "cost": 100,
                        "quantity": 4
                        
                      }
                     })        
                 })
                    .end(done);
              })
          
            })
          