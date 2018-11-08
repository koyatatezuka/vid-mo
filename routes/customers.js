const express = require('express');

const validate = require('../lib/validate');
const Customer = require('../models/customer');

const router = express.Router();

// get all customers
router.get('/', async (req, res) => {
	const customer = await Customer.find();

	res.send(customer);
});

// get customer by id
router.get('/:id', async (req, res) => {
	const customer = await Customer.find({ _id: req.params.id });

	return customer ? res.send(customer) : res.status(404).send('Customer does not exist.');
});

// post customer
router.post('/', async (req, res) => {
	const { error } = validate.customer(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold
	});

	customer = await customer.save();

	res.send(customer);
});

// update customer
router.put('/:id', async (req, res) => {
	const { error } = validate.customer(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findOneAndUpdate(
		{ _id: req.params.id },
		{
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		},
		{
			new: true
		}
	);

	if (!customer) return res.status(404).send('Could not update customer');

	res.send(customer);
});

router.delete('/:id', async (req, res) => {

  const customer = await Customer.findOneAndRemove({ _id: req.params.id })

  if (!customer) return res.status(404).send('Customer does not exist');

  res.send(customer)

})

module.exports = router;
