# Palindromi — imordnilaP

Una versione statica della raccolta di palindromi che era disponibile sul sito
`plgrs.lacab.it/palindromi/`, recuperata da una [cattura Wayback del 31 marzo
2019](https://web.archive.org/web/20190331173205/http://plgrs.lacab.it/palindromi/).
Il sito pubblicato è disponibile su [GitHub Pages](https://alsd4git.github.io/palindromi/).

## Struttura

- `docs/` è il sito corrente: HTML, CSS e JavaScript senza dipendenze esterne.
  `docs/data/palindromes.txt` è l'unica raccolta canonica servita dalla pagina.
- `archive/` conserva la cattura Wayback e i passaggi di estrazione. È materiale
  storico, non parte del sito da pubblicare; vedi [`archive/README.md`](archive/README.md).
- `test/` contiene i controlli Node.js per il parsing e la ricerca della raccolta.

La pagina crea i nodi del DOM con `textContent`, senza concatenare i dati in
HTML: le voci della raccolta restano quindi testo, anche quando contengono
caratteri speciali.

## Sviluppo

Non sono necessarie dipendenze da installare. Con Node.js 20+:

```sh
npm test
python3 -m http.server --directory docs 8080
```

Apri poi <http://localhost:8080>. Un server HTTP è necessario perché il browser
deve caricare la raccolta di testo con `fetch`.

## Pubblicazione

La configurazione GitHub Pages esistente usa il branch `gh-pages`. Il sorgente
da pubblicare è il contenuto di `docs/`, non l'intero repository.

Per semplificare la manutenzione futura, nelle impostazioni Pages si può cambiare
una sola volta la sorgente in `main` / `/docs`. Se si mantiene `gh-pages`,
pubblicare solo dopo aver verificato i test e sincronizzare il contenuto di
`docs/` nella radice di quel branch. Nessuna delle due operazioni è automatica
da questo repository, così le pubblicazioni restano revisionabili.

## Diritti e privacy

Il codice del sito e gli strumenti di estrazione sono distribuiti con licenza
MIT; vedi [LICENSE](LICENSE). Il testo della raccolta e il materiale in
`archive/` sono recuperati da un sito di terzi e i relativi diritti non sono
stati chiariti: la licenza non si estende a quel materiale. Richieste dei
titolari possono essere inviate all'autore del repository per correzione o
rimozione.

Il sito in `docs/` non include analytics, cookie, font, script o richieste a
terzi: carica soltanto i propri file statici. Il provider di hosting (GitHub
Pages) può comunque trattare dati tecnici di accesso secondo la propria privacy
policy. La cattura Wayback storica include risorse di terze parti, ma non viene
pubblicata insieme al sito corrente.
