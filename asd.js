const inputArray = ["aaa/abc", "aaa/asd", "bbb/asdd", "bbb/werf"];

// Extract the first part of each element before the slash
const extractedElements = inputArray.map((element) => element.split("/")[0]);

// Remove duplicates using a Set
const uniqueElements = [...new Set(extractedElements)];

// Display the unique elements in the desired format
console.log(uniqueElements);
