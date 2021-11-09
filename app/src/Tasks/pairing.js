let cohort = [
  "Elizabeth",
  "Jen",
  "Malika",
  "Natalie",
  "Sarah G",
  "Serena",
  "Shaylan",
  "Tabitha",
  "Tara",
  "Xiao",
  "Zelma",
];

//shuffle the array
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

// Will create 2x groups of 4 and 2x groups of 3
// good for 14 person cohort
function createPairs() {
  let shuffledArray = shuffle(cohort);
  console.log(
    "Group 1:",
    shuffledArray[0],
    shuffledArray[1],
    shuffledArray[2],
    shuffledArray[3],
  );
  console.log(
    "Group 2:",
    shuffledArray[4],
    shuffledArray[5],
    shuffledArray[6],
    shuffledArray[7],
  );
  console.log(
    "Group 3:",
    shuffledArray[8],
    shuffledArray[9],
    shuffledArray[10],
    shuffledArray[11],
  );
}

createPairs();
