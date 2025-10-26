# Tema 1

## Javascript

### Objective: Modify the [main.js](./src/main.js) file in the marked location to make the   [tests](./src/test/) pass

### 1. Given that:
- the program must manage, simultaneously, the implementation of two different algorithms, the selection being determined by the input values:
    - algo: the algorithm used
    - operation: operation mode
        - boolean value: true - compression/encryption, false - decompression/decryption
    - input: the input value that will be processed by the algorithm
    - options: object containing configuration options, required for the Caesar cipher

- RLE (Run-length encoding) implementation:
    - functionality
        - the algorithm compresses/decompresses a string primitive or a String object
        - RLE compression involves transforming a string into another string
        - consecutive characters are replaced with the number of occurrences followed by a single character (example: `AAAAVVVSSSS` becomes `4A3V4S`)
    - validation
        - if the parameters are not string primitives/String objects or boolean, an exception will be thrown (`InvalidType`)
        - if the input value contains numbers (compression) / incomplete values (decompression), an exception will be thrown (`InvalidInput`)

- Caesar cipher implementation:
    - functionality
        - the algorithm encrypts/decrypts a string primitive or a String object
        - encryption using the Caesar cipher involves transforming a string into another string
        - the new string is obtained by replacing each letter with a substitute letter
        - the value of a substitute letter is calculated by shifting the numeric values associated with the standard English alphabet by a fixed number of positions
        - in the standard alphabet, letter numbering starts from 0, as follows: A = 0, B = 1, C = 3, etc.
        - the shift number can be changed for each encryption
        - example
            - after a shift of 2 positions, the new values associated with the numbers will be: A = 2, B = 3, C = 4
            - to obtain the cipher, letters from the initial input value are replaced with letters from the standard alphabet associated with the new values
            - thus, using the Caesar cipher and a shift of 2 positions, the string ABCD will become CDEF
        - to correctly decrypt a cipher, the shift value must be known
    - validation
        - if the parameters are not string primitives/String objects, boolean or Object an exception will be thrown (`InvalidType`)
        - if the input value contains anything other than letters and spaces, throw an exception (`InvalidInput`)
        - if the configuration object (options) does not contain a valid **shift** property, throw an exception (`InvalidInput`)

### 2. Complete the following requirements:
 - the program returns the correct result for compressing a string using RLE (25%)
 - the program returns the correct result for decompressing a string using RLE (25%)
 - the program returns the correct result for encrypting a string using the Caesar cipher (25%)
 - the program returns the correct result for decrypting a string using the Caesar cipher (25%)
 - modifying the tests is not allowed!

### 3. Steps to run the tests and submit the assignment:
1. Accept the assignment received on the GitHub Classroom platform
2. Download the personal repository created on the platform
3. In the root directory, run the `npm install` command to install the modules needed to run the tests
4. Add your solution in the main.js file in the root directory
5. In the root directory, run the `npm test` command to run the tests
    - you can use a partial test command for each requirement: `npm run test-rle-comp`
6. Check the test results
    - Failed tests
        ![Test execution](./assets/teste-bad.png)
    - Valid tests
        ![Test execution](./assets/teste-good.png)
7. After solving the requirements, create a commit and use the push command to upload the changes to GitHub (details in the first lab)
