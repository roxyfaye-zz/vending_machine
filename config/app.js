const express = require('express');
const data = require('./data.js');
const application =express();
const bodyParser = require('body-parser');
const fs = require('fs');
const moment = require('moment');

application.use(bodyParser.json());


application.get('/api/customer/items', function (request,response) {
    for (var i = 0; i < data.data.length; i++){
        var description = data.data[i].description;
        var cost = data.data[i].cost;
        var quanity = data.data[i].quanity;
        var combined = "There are" + quanity + " " + description + "remaining for" + cost + ".";

    }
   response.json(data);
});

function CalChange (payment,cost){
    var change = payment - cost;
    return change;
}

application.post('/api/customer/items/:itemsId/purchases', function (request,response){
    
    function filterbyId(item, index, array){
        return item.id === request.body.id;
    };
    var result = data.data.find(filterById);

    change = calculateChange(request.body.payment, result.cost);
    var remaining = result.quanity -1;
    var model = {change: change, quanity: remaining};

    response.json(model);

application.get()



if (require.main === "module") {
  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/.')
  });
}

module.exports = application;