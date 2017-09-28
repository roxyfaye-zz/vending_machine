const express = require('express');
const data = require('./data.js');
const application = express();
const bodyParser = require('body-parser');
// const fs = require('file-system');
const moment = require('moment');
// const filepath = require('./data.js');

application.use(bodyParser.json());

var items = {
    "status": "success",
    "data": [

        {
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
        },

    ]
}



application.get('/api/customer/items', function (request, response) {
    var model = {
        status: 'success',
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
    }
    response.json(model);
});


application.post('/api/customer/items/:itemId/purchases', function (request, response) {
    var description = request.body.description;
    var cost = request.body.cost;
    var quantity = request.body.quantity;
    console.log(description);
    console.log(cost);
    console.log(quantity);
    var newItem = [{
        id: request.body.id,
        description: description,
        cost: cost,
        quantity: quantity
    }]

    if (request.body.cost >= newItem[0].cost) {
        var sufficiantFunds = {

            "status": "passed",
            "data": [{
                "money_given": 65,
                "money_required": 65
            }]
        }
        return response.json(sufficiantFunds);
    } else {
        var insufficiantFunds = {
            "status": "fail",
            "data": [{
                "money_given": 50,
                "money_required": 65
            }]
        }
    }

    return response.json(insufficiantFunds);
});

var purchases = {
    status: "success",
    data: [

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
}
application.get('/api/vendor/purchases', (request, response) => {
    response.json(purchases);
});

var vendingMoney = 25.00;

application.get('/api/vendor/money', function (request, response) {
    response.json(vendingMoney);
});


application.post('/api/vendor/items', function (request, response) {
    // var newSnack = {};
    var id = request.body.id;
    var description = request.body.description;
    var cost = request.body.cost;
    var quantity = request.body.quantity;
    console.log(id);
    console.log(quantity);
    var newSnack = {
        id: id,
        description: description,
        cost: cost,
        quantity: quantity
    }
    // console.log(newSnack);
    // newSnack.push(newSnack);
    response.json(newSnack);

});

application.put('/api/vendor/items/:itemId',function (request, response) {
        var newSnack = request.body.id;
        var item = items.data.filter(function (snack) {
            return snack.id === newSnack;
        })

        console.log(request.body.description);
        console.log(request.body.cost);
        console.log(newSnack);
        console.log(item);

        var Snack = {
            status: "success",
            data: {
                id: newSnack,
                description: request.body.description,
                quantity: request.body.quantity,
                cost: request.body.cost,
            }

        };
        console.log(Snack)
        response.json(Snack);
    });


module.exports = application;