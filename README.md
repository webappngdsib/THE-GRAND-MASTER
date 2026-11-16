# THE-GRAND-MASTER

Κεντρικό portal με συνδέσμους προς τις εφαρμογές και τα βοηθητικά εργαλεία του
Μεγάλου Διδασκάλου.

## Ζωντανή σελίδα

[Άνοιγμα του Grand Master's Portal](https://webappngdsib.github.io/THE-GRAND-MASTER/)

Για να δημοσιευτεί η σελίδα, ενεργοποίησε το GitHub Pages από τις ρυθμίσεις του
repository: **Settings → Pages → Deploy from a branch → `main` → `/(root)`**.
Το Pages δεν είναι ακόμη ενεργό, οπότε ο παραπάνω σύνδεσμος θα λειτουργήσει μετά
την ενεργοποίηση και την ολοκλήρωση του πρώτου deployment.

## Τοπική προβολή

Άνοιξε το `index.html` σε browser ή δημοσίευσε το repository ως στατικό site. Δεν απαιτούνται build steps ή dependencies.

## Ενημέρωση εργαλείων

Όλα τα έργα βρίσκονται στον πίνακα `WORKS` μέσα στο `index.html`. Για νέο έργο
πρόσθεσε μία γραμμή, π.χ.:

```js
{ g:"craft", t:"Τίτλος", d:"Περιγραφή.", repo:"webappngdsib/ONOMA-REPO", u:"2026-11-16" }
```

- `g`: ενότητα (`craft`, `beyond`, `web`, `tools`)
- `repo`: το αποθετήριο στο GitHub (κουμπί «Κώδικας»)
- `live`: προαιρετικός ζωντανός σύνδεσμος· αν λείπει, χρησιμοποιείται το GitHub Pages του repo
- `u`: ημερομηνία τελευταίας ενημέρωσης