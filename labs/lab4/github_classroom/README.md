[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vpmyTAB2)

# Tema 1

[instructions in English available here](./README-EN.md)

## Javascriptm

### Obiectiv: să se modifice în locul marcat fișierul [main.js](./src/main.js) astfel încât să fie verificate [testele](./src/test/)

### 1. Știind că:

- programul trebuie să gestioneze, siultan, implementarea a doi algoritmi diferiți, execuția fiind determinată de valorile de intrare:

  - algo: algoritmul utilizat
  - operation: mod de operare
    - valoare booleană: true - compresie/criptare, false - decompresie/decriptare
  - input: valoarea de intrare ce va fi prelucrată de către algoritm
  - options: obiect ce conține opțiuni de configurare, necesare în cazul cifrului Caesar

- implementarea RLE (Run-length encoding):
<<<<<<< HEAD

  - funcționalitate
    - algoritmul comprimă/decomprimă o primitivă string sau un obiect String
    - compresia RLE presupune transformarea unui string într-un alt string
    - caracterele consecutive sunt înlocuite cu un singur caracter urmat de numărul de apariții (exemplu: `aaaavvvssss` va deveni `a4v3s4`)
  - validare
    - dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)
    - dacă valoarea de intrare conține numere se va arunca o excepție (`InvalidInput`)
=======
    - funcționalitate
        - algoritmul comprimă/decomprimă o primitivă string sau un obiect String
        - compresia RLE presupune transformarea unui string într-un alt string
        - caracterele consecutive sunt înlocuite cu numărul de apariții urmat de un singur caracter (exemplu: `AAAAVVVSSSS` va deveni `4A3V4S`)
    - validare
        - dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)
        - dacă valoarea de intrare conține valori numerice (compresie) / valori incomplete (decompresie) se va arunca o excepție (`InvalidInput`)
>>>>>>> e2172111d2fa710a03fac98469717cda6187679b

- implementarea cifrului Caesar:
  - funcționalitate
    - algoritmul criptează/decriptează o primitivă string sau un obiect String
    - criptarea folosind cifrul Caesar presupune transformarea unui string într-un alt string
    - noul string este obținut prin înlocuirea fiecărei litere cu o literă substitut
    - valoarea unei litere substitut se calculează prin deplasarea valorilor numerice asociate alfabetului englez standard cu un număr fix de poziții
    - în alfabetul standard, numerotarea literelor începe de la 0, astfel: A = 0, B = 1, C = 3, etc.
    - la fiecare aplicare a algoritmului se poate alege o valoare diferită pentru numărul de deplasare
    - exemplu
      - după o deplasare de 2 poziții, noile valori asociate numerelor vor fi: A = 2, B = 3, C = 4
      - pentru obținerea cifrului, se înlocuiesc literele din valoarea inițială de intrare cu litere din alfabetul standard asociate noilor valori obținute
      - astfel, folosind cifrul Caesar și o deplasare de 2 poziții, string-ul ABCD va deveni CDEF
    - pentru a putea decripta corect un cifru trebuie cunoscută valoarea de deplasare
  - validare
    - dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)
    - dacă valoarea de intrare conține altceva decât litere și spații, se va arunca o excepție (`InvalidInput`)
    - dacă obiectul de configurare (options) nu conține o proprietate validă **shift**, se va arunca o excepție (`InvalidInput`)

### 2. Completați următoarele cerințe:

- programul returnează rezultatul corect pentru compresia unui string folosind RLE (25%)
- programul returnează rezultatul corect pentru decompresia unui string folosind RLE (25%)
- programul returnează rezultatul corect pentru criptarea unui string folosind cifrul Caesar (25%)
- programul returnează rezultatul corect pentru decriptarea unui string folosind cifrul Caesar (25%)
- modificarea testelor nu este permisă!

### 3. Pași pentru a rula testele și a trimite tema:

1. Acceptă assignment-ul primit pe platforma GitHub Classroom
2. Descarcă repository-ul personal creat în cadrul platformei
3. În directorul principal rulează comanda `npm install` pentru a instala modulele necesare executării testelor
4. Adaugă implementarea necesară rezolvării cerințelor în fișierul main.js din directorul principal
5. În directorul principal rulează comanda `npm test` pentru a rula testele
   - poți folosi o comandă de testare parțială pentru fiecare clear
     cerință: `npm run test-rle-comp`
6. Verifică rezultatul testelor
   - Teste picate
     ![Rulare teste](./assets/teste-bad.png)
   - Teste valide
     ![Rulare teste](./assets/teste-good.png)
7. După rezolvarea cerințelor creează un commit și folosește comanda push pentru a încărca modificările pe GitHub (detalii în primul seminar)
