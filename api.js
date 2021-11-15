const logger = require('./util/logger');
const express = require("express");
const app = express();
app.use(express.json());

let customers = [{
    "customerID": "12345",
    "customerName": "Hyma",
    " Age": "27",
    "Location": "nellore",
    "PhoneNumber": 9857462468
},
{
    "customerID": "12346",
    "customerName": "Prathap",
    " Age": "25",
    "Location": "kota",
    "PhoneNumber": "7893536187",

},
{
    "customerID": "12347",
    "customerName": "Haritha",
    " Age": "22",
    "Location": "hyderabad",
    "PhoneNumber": "7660985681",

},
];
app.post('/customer', (req, res) => {
    const customer = req.body;
    customers.push(customer);
    res.json({
        status: 'added',
        result: customer
    })
    logger.info("new customer added");
});

app.get('/customer', (req, res) => {
    res.json({
        status: "success",
        result: customers
    })
    logger.info("all customers are present");
});

app.get('/customer/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    for (let customer of customers) {
        if (customer.customerID === customerID) {
            res.json(customer);
            logger.info("we get particular  customer details");
        }
    };
    res.status(404).send("customer not found");
    logger.error("customer not found");


});
app.put('/customer/:custID', (req, res) => {
    const customerID = req.params.customerID;
    const newCustomer = req.body;
    for (let i = 0; i < customers.length; i++) {
        let customer = customers[i]
        if (customer.customerID === customerID) {
            customers[i] = newCustomer;
        }
    }
    res.json(newCustomer);
    logger.info("customer updated")
});
app.delete('/customer/:customerID', (req, res) => {
    
    const customerID = req.params.customerID;
    for (let i = 0; i < customers.length; i++) {
        let customer = customers[i]
        if (customer.customerID === customerID) {
            customers.splice(i, 1);
            res.send("success");
            logger.info("customer deleted")
        }
    }
    
res.status(404).send("customerId is not found")
logger.error("customerId is not found");
});
const port = 3000;
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

module.exports = app;