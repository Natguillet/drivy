'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
allRentalPrice(rentals); // Exercise 1 - Euro-Kilometers & Exercise 2 - Drive more, pay less
allCommission(rentals); // Exercise 3 - Give me all your money
// ---------- Begining exercise 1 & 2 ------------
function rentalPrice(rental)
{
  var priceDay=0;
  var priceKm=0;

  var dayDiff = diffDate(rental);
  var carID=rental.carId;

  for (var i = 0; i < cars.length; i++) {
    if(carID==cars[i].id)
    {
      priceDay= cars[i].pricePerDay;
      priceKm=cars[i].pricePerKm;
    }
  }
  if(dayDiff > 1 && dayDiff <= 4)
  {
    priceDay = priceDay - priceDay*10/100;
  } else if (dayDiff > 4 && dayDiff <=10) {
    priceDay = priceDay - priceDay*30/100;
  } else if (dayDiff > 10) {
    priceDay = priceDay - priceDay*50/100;
  }
  rental.price = dayDiff*priceDay+rental.distance*priceKm;
  //console.log(rental.price);
}
function diffDate(rental){
  var dayReturn = new Date(rental.returnDate);
  var dayPick = new Date(rental.pickupDate);

  var timeDiff = Math.abs(dayReturn.getTime()-dayPick.getTime());
  var dayDiff = Math.ceil(timeDiff / (1000*3600*24))+1;

  return dayDiff;
}
function allRentalPrice(rentals){
  for (var i = 0; i < rentals.length; i++) {
    rentalPrice(rentals[i]);
  }
}
// ----------- Ending exercise 1 & 2 --------------

// ----------- Begining exercise 3 ---------------
function commission(rental){
  var commission = rental.price - rental.price*70/100;
  rental.commission.insurance = commission/2;
  rental.commission.assistance = diffDate(rental);
  rental.commission.drivy = commission - diffDate(rental) - commission/2;
}

function allCommission(rentals){
  for (var i = 0; i < rentals.length; i++) {
    commission(rentals[i]);
  }
}
// ------------ Ending exercise 3 ---------------
