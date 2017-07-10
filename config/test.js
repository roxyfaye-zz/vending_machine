const assert = require("assert");
const request = require('supertest');
const application = require("./app")






describe('GET/api/customer/items/', function () {
    it("should run a JSON file successfully",function (done) {
         request.(application)
         .get("/api/customer/data")
         .expect(200)
         .expect("Content-Type", "application/json; charset=utf-8")
         .end(done);
    })  
 })
// GET /api/customer/items - get a list of items
//A customer should be able to get a list of the current items, their costs, and quantities of those items
 

 describe("POST /api/customer/items/:itemId/purchases", function () {
     it("should return change and a new quanity", function(done){
         request(application)
         .post("/api/customer/items/2/purchases")
         .send({
             id:3,
             payment: 120
         })
         .set('Accept', 'application/json')
         .expect({change:75, quanity: 11})
         .end(done);
     })
 }
//A customer should be able to buy an item using money
//A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.


application.get('/api/vendor/purchases', function(request, response) {
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
//A vendor should be able to see a list of all purchases with their time of purchase
});

application.get('/api/vendor/money', function(request, response) {
// GET /api/vendor/money - get a total amount of money accepted by the machine
//A vendor should be able to see total amount of money in machine
})

application.post('/api/vendor/items', function(request, response) {
// POST /api/vendor/items - add a new item not previously existing in the machine
//A vendor should be able to add a new item to the machine
});

application.post('/api/vendor/items', function(request, response) {
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost
//A vendor should be able to update the description, quantity, and costs of items in the machine
});