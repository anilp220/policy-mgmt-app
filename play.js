var unsortedObject = {
  "March": 3,
  "January": 1,
  "August": 8,
  "May": 5,
  "December": 12,
  "April": 4,
};

// Get an array of keys (month names)
var keys = Object.keys(unsortedObject);

// Sort the keys based on the month order
keys.sort((a, b) => {
  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(a) - months.indexOf(b);
});

// Create a new object with sorted keys
var sortedObject = {};
for (var key of keys) {
  sortedObject[key] = unsortedObject[key];
}

console.log(sortedObject);
