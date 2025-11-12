const validateInput = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string") {
    throw new Error("InvalidType");
  }
};

const displayMatrix = (matrix, a, b) => {
  console.log("    " + a.split("").join(" "));

  for (let i = 0; i < matrix.length; i++) {
    let letter = i === 0 ? " " : b[i - 1];
    let row = letter + " ";

    for (let j = 0; j < matrix[i].length; j++) {
      row += matrix[i][j] + " ";
    }

    console.log(row);
  }

  console.log("\n------------------\n");
};

/*
	--	''	b		r		i		n		g
	''	0		1		2		3		4		5
	f		1		1		2		3		4		5
	r		2		2		1		2		3		4	
	i		3		3		2		1		2		3
	n		4		4		3		2		1		2
	g		5		5		4		3		2		1
	e		6		6		5		4		3		2
*/

const distance = (a, b) => {
  validateInput(a, b);

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  displayMatrix(matrix, a, b);

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      // same letter, do nothing
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      }

      // different letter, an operation is needed
      // add 1 to the smalled neighbour
      else {
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) +
          1;
      }
    }
  }

  displayMatrix(matrix, a, b);

  return matrix[b.length][a.length];
};

distance("bring", "fringe");

module.exports.distance = distance;
