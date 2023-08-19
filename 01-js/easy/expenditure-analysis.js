/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];
  let categorySeen = new Set();

  for (let i = 0; i< transactions.length; i++) {
    let category = transactions[i].category;
    
    if (categorySeen.has(category)) {
      continue;
    }

    let totalSpent = 0;
    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].category === category) {
        totalSpent += transactions[j].price;
      }
    }

    result.push({'category':category,'totalSpent': totalSpent});
    categorySeen.add(category);
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
