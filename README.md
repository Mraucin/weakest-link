# Najsłabsze Ogniwo — gra online (GitHub Pages)

Prosta, w pełni statyczna implementacja gry towarzyskiej w stylu **Weakest Link** /
**Najsłabsze Ogniwo**. Działa jako zwykła strona HTML/CSS/JS — bez backendu,
bez bazy danych, bez kosztów serwera. Host tworzy pokój, gracze dołączają z
telefonów/komputerów (do 10 osób), a cała komunikacja idzie **bezpośrednio
między przeglądarkami przez WebRTC** (biblioteka [PeerJS](https://peerjs.com/)).

## Jak to działa (architektura)

GitHub Pages potrafi serwować tylko statyczne pliki — nie da się tam uruchomić
własnego serwera gry. Dlatego sieciowanie oparte jest o PeerJS:

- Host otwiera `host.html` i tworzy pokój. Jego przeglądarka staje się
  "serwerem" — trzyma cały stan gry i rozgłasza go do wszystkich graczy.
- Każdy gracz otwiera `player.html`, wpisuje kod pokoju i łączy się
  bezpośrednio z hostem (peer-to-peer, kanał danych WebRTC).
- PeerJS korzysta z darmowego, publicznego serwera "sygnalizacyjnego"
  (peerjs.com) tylko po to, żeby dwie przeglądarki mogły się odnaleźć —
  same dane gry (pytania, wyniki, rysunki na tabliczkach) nie przechodzą
  przez żaden serwer trzeci.

**Ograniczenie:** jeśli host zamknie/odświeży kartę, gra na chwilę się
zatrzymuje. Host.html próbuje zapisywać stan w `localStorage` i oferuje
wznowienie po ponownym otwarciu strony, ale połączenia graczy trzeba
wtedy nawiązać na nowo (gracze automatycznie próbują dołączyć ponownie
pod tym samym pseudonimem). W rzadkich przypadkach kod pokoju po
wznowieniu może się zmienić — wtedy trzeba go graczom podać ponownie.

## Struktura plików

```
index.html          strona startowa (wybór: Host / Gracz)
host.html            panel prowadzącego (lobby, sterowanie grą, edytor pytań)
player.html           ekran gracza (dołączanie + widok gry)
css/style.css         style całej gry
js/common.js           stałe gry, formatowanie, generator awatarów SVG
js/network.js          cienka warstwa nad PeerJS (host = serwer gwiazdy, gracze = klienci)
js/questions.js        bank pytań (localStorage) + edytor CRUD + import/eksport JSON
js/host.js             cała logika/maszyna stanów gry + panel prowadzącego
js/player.js           renderowanie ekranu gracza, tabliczka do rysowania, przycisk BANK
```

## Wdrożenie na GitHub Pages

1. Utwórz nowe repozytorium na GitHub (np. `weakest-link`).
2. Wrzuć do niego całą zawartość tego folderu (musi zostać zachowana
   struktura — `index.html` w katalogu głównym).
3. W ustawieniach repozytorium: **Settings → Pages → Build and deployment
   → Source: Deploy from a branch**, wybierz branch `main` i folder `/ (root)`.
4. Po chwili strona będzie dostępna pod adresem
   `https://<twoja-nazwa-uzytkownika>.github.io/<nazwa-repo>/`.
5. Host otwiera `.../host.html`, gracze `.../player.html` (albo po prostu
   `index.html` i wybierają swoją rolę).

Grę można też przetestować lokalnie bez wgrywania na GitHub — wystarczy
otworzyć `index.html` w przeglądarce (najlepiej przez lokalny serwer,
np. `npx serve .`, żeby uniknąć ograniczeń `file://`) i otworzyć drugą
kartę/przeglądarkę jako gracza.

## Jak grać

### Host

1. Zakładka **Lobby** → *Utwórz pokój* → pojawi się kod pokoju i link do
   wysłania graczom.
2. Gdy dołączy co najmniej 2 graczy → *Rozpocznij grę*.
3. Zakładka **Gra**: losuj pytania (albo wybierz konkretne z listy),
   czytaj je na głos, klikaj **Dobrze (A)** / **Źle (D)** — skróty
   klawiszowe `A` i `D` działają przez całą rundę pytań i rzutów karnych.
4. Gdy kolejny gracz ma odpowiadać, otwiera się 2,5-sekundowe okno, w
   którym **tylko ten gracz** może kliknąć **BANK** na swoim ekranie i
   zabezpieczyć aktualną kwotę łańcucha w banku całej gry.
5. Po zakończeniu czasu rundy gra automatycznie przechodzi do
   głosowania — awatary graczy przesuwają się na górę, a na środku
   pojawia się tabliczka do rysowania. Po 30 sekundach host klika
   *Pokaż kolejną tabliczkę* dla każdego gracza i przypisuje głos z
   listy rozwijanej, a na końcu *Zakończ głosowanie i wyeliminuj*.
   W razie remisu gra automatycznie wskazuje gracza z największą liczbą
   poprawnych odpowiedzi jako decydującego.
6. Gdy zostanie dwóch graczy — finał: **rzuty karne** (5 pytań na
   gracza, różne pytania, seria kończy się wcześniej przy nieodrabialnej
   przewadze). Remis po 5 rundach → **dogrywka szacowania** (gracze
   piszą liczbę na tabliczce, wygrywa bliższy prawidłowej wartości).
7. Po zakończeniu gry można kliknąć *Nowa gra w tym pokoju*, aby zagrać
   ponownie z tymi samymi graczami (wyniki i eliminacje są zerowane).

### Gracz

Wpisuje kod pokoju i pseudonim (może wylosować sobie awatar), po czym
widzi ekran zgodny ze szkicem: drabinkę **RUNDA** po lewej (bieżący
łańcuch punktowy), drabinkę **CAŁA GRA** po prawej (suma zbankowanych
pieniędzy, wypełniana proporcjonalnie), a na środku siebie i innych
graczy dookoła przycisku **BANK** — pod każdym awatarem liczba
poprawnych (zielono) i błędnych (czerwono) odpowiedzi.

## Edytor pytań

Zakładka **Edytor pytań** w panelu hosta (działa też bez tworzenia
pokoju). Pytania trzymane są w `localStorage` przeglądarki hosta —
można je dodawać, edytować, usuwać, filtrować po kategorii, importować
i eksportować jako JSON (przydatne do przygotowania własnego zestawu
pytań przed grą lub przeniesienia banku na inne urządzenie). Pytania
typu **Szacowanie** (z wartością liczbową) są używane wyłącznie w
dogrywce finałowej — warto mieć ich co najmniej kilka.

## Znane ograniczenia

- To gra "salonowa" wspomagana cyfrowo — pytania host czyta na głos
  (np. siedząc z graczami przy stole albo przez rozmowę głosową);
  aplikacja celowo nie pokazuje treści pytań graczom, tylko prowadzącemu.
- Rysunki na tabliczkach to zwykłe bitmapy — aplikacja ich nie
  odczytuje automatycznie, dlatego to host "czyta" wynik i przypisuje
  głos/wartość ręcznie (dokładnie jak w telewizyjnym pierwowzorze, gdzie
  widzowie i prowadzący odczytują tabliczki wzrokiem).
- Bardzo restrykcyjne sieci firmowe/szkolne czasem blokują połączenia
  WebRTC peer-to-peer — w większości domowych sieci i przez LTE/5G
  działa to bez problemu.
