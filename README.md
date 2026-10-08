# Schronisko dla Bobrów Oli

Statyczna strona internetowa Schroniska dla Bobrów Oli (Ola's Beaver Shelter) w języku polskim.

## Struktura

- `index.html` – cała strona (O nas, Podopieczni, Jak pomóc, Wizyty, FAQ, Kontakt)
- `styles.css` – style, responsywne na telefonach i komputerach
- `script.js` – menu mobilne, filtr podopiecznych, liczniki, walidacja formularza
- `assets/logo.svg` – logo bobra

## Uruchomienie lokalne

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000
```

Stronę można opublikować bez budowania, np. przez GitHub Pages (Settings → Pages → branch `main`, folder `/`).

## Do uzupełnienia

Dane kontaktowe (adres, telefon, e-mail, numer konta) oraz statystyki to wartości przykładowe –
podmień je na prawdziwe. Formularz kontaktowy działa tylko po stronie przeglądarki; aby wysyłał
wiadomości, podłącz usługę typu Formspree lub własny backend.
