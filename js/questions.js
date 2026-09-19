/* ==========================================================================
   Weakest Link (PL) — questions.js
   Question bank: storage (localStorage), default seed data, CRUD helpers
   and a self-contained editor UI you can mount into any container element.
   ========================================================================== */

(function (global) {
  'use strict';

  var STORAGE_KEY = 'wl_question_bank_v1';

  var DEFAULT_QUESTIONS = [
    // --- Wiedza ogólna ---
    { category: 'Wiedza ogólna', question: 'Ile dni ma zwykły rok kalendarzowy?', answer: '365', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile dni ma rok przestępny?', answer: '366', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile godzin ma doba?', answer: '24', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile minut ma godzina?', answer: '60', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile miesięcy ma rok?', answer: '12', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaki jest symbol chemiczny wody?', answer: 'H2O', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile stron ma sześcian?', answer: '6', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jakiego koloru jest chlorofil?', answer: 'Zielony', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile kolorów ma tęcza (tradycyjnie wymienianych)?', answer: '7', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaki jest najwyższy szczyt świata?', answer: 'Mount Everest', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaka jest stolica Polski?', answer: 'Warszawa', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaka jest stolica Francji?', answer: 'Paryż', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaka jest stolica Włoch?', answer: 'Rzym', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile continent(ów) liczy Ziemia (w powszechnym podziale)?', answer: '7', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Jaki jest największy ocean na Ziemi?', answer: 'Spokojny (Pacyfik)', type: 'normal', difficulty: 'e' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi temperatura wrzenia wody przy ciśnieniu normalnym?', answer: '100°C', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi temperatura zamarzania wody?', answer: '0°C', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najmniejsza planeta Układu Słonecznego?', answer: 'Merkury', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największa planeta Układu Słonecznego?', answer: 'Jowisz', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile kontynentów ma na sobie pustynię Sahara?', answer: '1 (Afryka)', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się układ pisma używany przez osoby niewidome?', answer: 'Alfabet Braille\'a', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'W jakim kraju znajduje się Wielki Mur?', answer: 'Chiny', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaka jest najwyższa możliwa ocena w polskim systemie szkolnym (skala 1-6)?', answer: '6', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się waluta obowiązująca w Japonii?', answer: 'Jen', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się waluta obowiązująca w Wielkiej Brytanii?', answer: 'Funt szterling', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba Pi w zaokrągleniu do dwóch miejsc po przecinku?', answer: '3,14', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największa pustynia gorąca świata?', answer: 'Sahara', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi normalna temperatura ciała człowieka w stopniach Celsjusza?', answer: 'Ok. 36,6°C', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba dni tygodnia?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się organ odpowiedzialny za pompowanie krwi w organizmie?', answer: 'Serce', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najbardziej wysunięty na południe kontynent?', answer: 'Antarktyda', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'W którym kraju leży Statua Wolności?', answer: 'USA', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jakiego koloru flagę ma Japonia (główny motyw)?', answer: 'Biało-czerwona z czerwonym kołem', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka masy w układzie SI?', answer: 'Kilogram', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki jest oficjalny język Meksyku (de facto)?', answer: 'Hiszpański', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba planet w Układzie Słonecznym (od 2006 r.)?', answer: '8', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najbliższa Ziemi gwiazda?', answer: 'Słońce', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba dni w lutym w roku przestępnym?', answer: '29', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaka jest najdłuższa rzeka świata?', answer: 'Nil (lub Amazonka, zależnie od źródła)', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka natężenia prądu elektrycznego?', answer: 'Amper', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka siły w układzie SI?', answer: 'Niuton', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile liter ma polski alfabet?', answer: '32', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile dni trwa przeciętnie ciąża u człowieka?', answer: 'Ok. 280 dni (40 tygodni)', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jakiego koloru jest krew żylna w porównaniu do tętniczej — ciemniejsza czy jaśniejsza?', answer: 'Ciemniejsza', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile zębów ma dorosły człowiek (bez zębów mądrości usuniętych)?', answer: '32', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się bojaźń wysokości?', answer: 'Akrofobia', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się bojaźń zamkniętych przestrzeni?', answer: 'Klaustrofobia', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki jest najtwardszy naturalny minerał na Ziemi?', answer: 'Diament', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki jest najmniejszy kraj świata pod względem powierzchni?', answer: 'Watykan', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi prędkość światła w próżni w przybliżeniu (km/s)?', answer: 'Ok. 300 000 km/s', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki gaz stanowi największy procent atmosfery ziemskiej?', answer: 'Azot', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile procent powierzchni Ziemi zajmują oceany w przybliżeniu?', answer: 'Ok. 71%', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki metal jest ciekły w temperaturze pokojowej?', answer: 'Rtęć', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najdłuższy dzień w roku na półkuli północnej?', answer: 'Przesilenie letnie', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile komór ma ludzkie serce?', answer: '4', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki jest symbol chemiczny soli kuchennej?', answer: 'NaCl', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba stanów USA?', answer: '50', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko powstawania tęczy?', answer: 'Załamanie i rozszczepienie światła w kroplach wody', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Ile lat trwa ludzkie pokolenie w przybliżeniu?', answer: 'Ok. 25-30 lat', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jaki jest oficjalny język Brazylii?', answer: 'Portugalski', type: 'normal', difficulty: 'm' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko braku grawitacji odczuwanej w kosmosie?', answer: 'Nieważkość (mikrograwitacja)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jaki jest najstarszy zachowany do dziś cud starożytnego świata?', answer: 'Piramida Cheopsa', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jaki jest symbol pierwiastka chemicznego żelazo?', answer: 'Fe', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jaki jest symbol pierwiastka chemicznego złoto?', answer: 'Au', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największa wyspa świata?', answer: 'Grenlandia', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba Avogadra w przybliżeniu?', answer: 'Ok. 6,022 × 10^23', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile kości ma noworodek (więcej niż dorosły)?', answer: 'Ok. 270-300', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największa pustynia świata (uwzględniając zimne)?', answer: 'Antarktyda', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi ciśnienie atmosferyczne na poziomie morza w przybliżeniu (hPa)?', answer: 'Ok. 1013 hPa', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba klawiszy na standardowym pianinie?', answer: '88', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najgłębszy punkt oceanu na Ziemi?', answer: 'Rów Mariański', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba żeber u dorosłego człowieka (par)?', answer: '12 par (24 żebra)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się choroba wywołana niedoborem witaminy C?', answer: 'Szkorbut', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi standardowa temperatura pasteryzacji mleka w przybliżeniu?', answer: 'Ok. 72-75°C', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka odległości w astronomii równa odległości Ziemia-Słońce?', answer: 'Jednostka astronomiczna (AU)', type: 'normal', difficulty: 'h' },

    // --- Historia ---
    { category: 'Historia', question: 'W którym roku wybuchła II wojna światowa?', answer: '1939', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku zakończyła się II wojna światowa?', answer: '1945', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku wybuchła I wojna światowa?', answer: '1914', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku zakończyła się I wojna światowa?', answer: '1918', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku Polska wstąpiła do Unii Europejskiej?', answer: '2004', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku upadł mur berliński?', answer: '1989', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Jak nazywało się powstanie w Warszawie w 1944 roku?', answer: 'Powstanie Warszawskie', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku wybuchło Powstanie Warszawskie?', answer: '1944', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Kto odkrył Amerykę w 1492 roku?', answer: 'Krzysztof Kolumb', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Kto był władcą Polski w momencie chrztu Polski?', answer: 'Mieszko I', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Jak nazywał się statek, który zderzył się z górą lodową w 1912 roku?', answer: 'Titanic', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Kto był cesarzem Francji na początku XIX wieku, podbijającym Europę?', answer: 'Napoleon Bonaparte', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'W którym roku Polska ostatecznie odzyskała niepodległość po zaborach?', answer: '1918', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Jak nazywał się marszałek, który odegrał kluczową rolę w odzyskaniu niepodległości w 1918 roku?', answer: 'Józef Piłsudski', type: 'normal', difficulty: 'e' },
    { category: 'Historia', question: 'Jak nazywał się obóz koncentracyjny i zagłady założony przez Niemców w okupowanej Polsce, symbol Holocaustu?', answer: 'Auschwitz-Birkenau', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się starożytna cywilizacja budująca piramidy nad Nilem?', answer: 'Egipt (starożytny)', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku wylądowano na Księżycu po raz pierwszy?', answer: '1969', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się pierwszy człowiek, który stanął na Księżycu?', answer: 'Neil Armstrong', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był królem Polski, który wygrał bitwę pod Grunwaldem?', answer: 'Władysław Jagiełło', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był pierwszym prezydentem Stanów Zjednoczonych?', answer: 'George Washington', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się zimna wojna toczona między USA a ZSRR po II wojnie światowej (nazwa zjawiska)?', answer: 'Zimna wojna', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się ruch społeczny w Polsce z 1980 roku, prowadzony przez Lecha Wałęsę?', answer: 'Solidarność', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się okres w historii sztuki i nauki, następujący po średniowieczu?', answer: 'Renesans', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był autorem dzieła "O obrotach sfer niebieskich"?', answer: 'Mikołaj Kopernik', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był pierwszym prezydentem III RP wybranym w wyborach powszechnych?', answer: 'Lech Wałęsa', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się pierwszy król Polski?', answer: 'Bolesław Chrobry', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku Polska przyjęła chrzest?', answer: '966', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku zatonął Titanic?', answer: '1912', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku odbyła się bitwa pod Waterloo?', answer: '1815', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się dynastia panująca w Polsce jako pierwsza?', answer: 'Piastowie', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Ile było rozbiorów Polski?', answer: '3', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku miała miejsce Bitwa Warszawska ("Cud nad Wisłą")?', answer: '1920', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Z jakim krajem Polska stoczyła wojnę w 1920 roku?', answer: 'Rosja Radziecka (Związek Sowiecki)', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był królem Anglii, który zerwał z Kościołem katolickim w XVI wieku?', answer: 'Henryk VIII', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku rozpoczęła się rewolucja francuska?', answer: '1789', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywało się więzienie zdobyte przez lud paryski w 1789 roku, symbol rewolucji francuskiej?', answer: 'Bastylia', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się słynny wódz Kartaginy, który przekroczył Alpy ze słoniami?', answer: 'Hannibal', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się pierwszy człowiek w kosmosie?', answer: 'Jurij Gagarin', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku odbyła się bitwa pod Grunwaldem?', answer: '1410', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Z kim Polska i Litwa walczyły pod Grunwaldem?', answer: 'Zakon Krzyżacki', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku podpisano Deklarację Niepodległości USA?', answer: '1776', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był 16. prezydentem USA, znanym ze zniesienia niewolnictwa?', answer: 'Abraham Lincoln', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku rozpadł się Związek Radziecki?', answer: '1991', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był ostatnim przywódcą Związku Radzieckiego?', answer: 'Michaił Gorbaczow', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku powstał związek zawodowy "Solidarność"?', answer: '1980', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto wprowadził w Polsce stan wojenny w 1981 roku?', answer: 'Wojciech Jaruzelski', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku wprowadzono w Polsce stan wojenny?', answer: '1981', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku odbyły się wybory czerwcowe w Polsce?', answer: '1989', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się starożytna grecka budowla poświęcona bogini Atenie na Akropolu?', answer: 'Partenon', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym mieście odbyły się pierwsze nowożytne igrzyska olimpijskie?', answer: 'Ateny', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się słynny wódz mongolski, twórca największego imperium lądowego w historii?', answer: 'Czyngis-chan', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się epidemia dżumy, która zdziesiątkowała Europę w XIV wieku?', answer: 'Czarna śmierć', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto namalował strop Kaplicy Sykstyńskiej?', answer: 'Michał Anioł', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywał się słynny podróżnik, który jako pierwszy Europejczyk opisał Chiny w XIII wieku?', answer: 'Marco Polo', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Kto był królem Francji ściętym podczas rewolucji francuskiej?', answer: 'Ludwik XVI', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'Jak nazywała się ostatnia dynastia panująca w Polsce?', answer: 'Wazowie (lub elekcyjni królowie po Wazach)', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku miały miejsce pierwsze rozbiory Polski?', answer: '1772', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku wybuchło Powstanie Styczniowe?', answer: '1863', type: 'normal', difficulty: 'm' },
    { category: 'Historia', question: 'W którym roku wybuchło Powstanie Listopadowe?', answer: '1830', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się królowa Anglii panująca najdłużej przed Elżbietą II?', answer: 'Wiktoria', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był pierwszym cesarzem Rzymu?', answer: 'Oktawian August', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku upadło Cesarstwo Zachodniorzymskie?', answer: '476', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku Jurij Gagarin poleciał w kosmos?', answer: '1961', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się unia łącząca Polskę i Litwę w 1569 roku?', answer: 'Unia lubelska', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku zamordowano Abrahama Lincolna?', answer: '1865', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywały się pierwsze częściowo wolne wybory w powojennej Polsce?', answer: 'Wybory czerwcowe 1989', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyły się pierwsze nowożytne igrzyska olimpijskie?', answer: '1896', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym wieku miała miejsce epidemia "czarnej śmierci" w Europie?', answer: 'XIV wiek', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku zmarł Mikołaj Kopernik?', answer: '1543', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się żona Ludwika XVI, również stracona podczas rewolucji?', answer: 'Maria Antonina', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miał miejsce zamach na arcyksięcia Franciszka Ferdynanda, bezpośrednia przyczyna I wojny światowej?', answer: '1914', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym mieście dokonano zamachu na arcyksięcia Franciszka Ferdynanda?', answer: 'Sarajewo', type: 'normal', difficulty: 'h' },

    // --- Geografia ---
    { category: 'Geografia', question: 'Jaka jest stolica Polski?', answer: 'Warszawa', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Niemiec?', answer: 'Berlin', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Hiszpanii?', answer: 'Madryt', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Portugalii?', answer: 'Lizbona', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Grecji?', answer: 'Ateny', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Rosji?', answer: 'Moskwa', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Chin?', answer: 'Pekin', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Japonii?', answer: 'Tokio', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Egiptu?', answer: 'Kair', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Norwegii?', answer: 'Oslo', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Szwecji?', answer: 'Sztokholm', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Finlandii?', answer: 'Helsinki', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Danii?', answer: 'Kopenhaga', type: 'normal', difficulty: 'e' },
    { category: 'Geografia', question: 'Jaka jest stolica Czech?', answer: 'Praga', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Węgier?', answer: 'Budapeszt', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Austrii?', answer: 'Wiedeń', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Ukrainy?', answer: 'Kijów', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Na jakim kontynencie leży Egipt?', answer: 'Afryka', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Na jakim kontynencie leży Brazylia?', answer: 'Ameryka Południowa', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest najdłuższa rzeka w Polsce?', answer: 'Wisła', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jakie jest najwyższe pasmo górskie na świecie?', answer: 'Himalaje', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Nad jakim morzem leży Gdańsk?', answer: 'Bałtyk', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Ile jest kontynentów na Ziemi (typowy podział)?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest najwyższa góra świata?', answer: 'Mount Everest', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki kraj ma największą powierzchnię na świecie?', answer: 'Rosja', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Na jakim kontynencie leży Sahara?', answer: 'Afryka', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest największa pustynia gorąca świata?', answer: 'Sahara', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jakie miasto we Włoszech zbudowane jest na wodzie, znane z kanałów?', answer: 'Wenecja', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'W jakim kraju leży Wieża Eiffla?', answer: 'Francja', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'W jakim kraju leży Koloseum?', answer: 'Włochy', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'W jakim mieście znajduje się Wawel?', answer: 'Kraków', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jak nazywa się linia umowna dzieląca Ziemię na półkulę północną i południową?', answer: 'Równik', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki ocean jest największy na Ziemi?', answer: 'Spokojny (Pacyfik)', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Australii?', answer: 'Canberra', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Kanady?', answer: 'Ottawa', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Brazylii?', answer: 'Brasília', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Argentyny?', answer: 'Buenos Aires', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Turcji?', answer: 'Ankara', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Szwajcarii?', answer: 'Berno', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest stolica Islandii?', answer: 'Reykjavik', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Na jakim kontynencie leży Indonezja?', answer: 'Azja', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest najdłuższa rzeka świata?', answer: 'Nil (lub Amazonka)', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jak nazywa się najwyższy szczyt Polski?', answer: 'Rysy', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'W którym paśmie górskim leży Mount Everest?', answer: 'Himalaje', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki kraj ma najwięcej mieszkańców na świecie (2024)?', answer: 'Indie', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki kraj ma najmniejszą powierzchnię na świecie?', answer: 'Watykan', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaka jest największa wyspa świata?', answer: 'Grenlandia', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki kanał łączy Morze Śródziemne z Morzem Czerwonym?', answer: 'Kanał Sueski', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki kanał łączy Ocean Atlantycki z Oceanem Spokojnym w Ameryce Środkowej?', answer: 'Kanał Panamski', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jakie państwo znane jest jako "kraj tysiąca jezior"?', answer: 'Finlandia', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jakie miasto nazywane jest "Wiecznym Miastem"?', answer: 'Rzym', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki jest największy kraj Ameryki Południowej pod względem powierzchni?', answer: 'Brazylia', type: 'normal', difficulty: 'm' },
    { category: 'Geografia', question: 'Jaki ocean jest najmniejszy na Ziemi?', answer: 'Arktyczny', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jakie państwo jest największą wyspiarską monarchią w Europie?', answer: 'Wielka Brytania', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka rzeka przepływa przez Paryż?', answer: 'Sekwana', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka rzeka przepływa przez Londyn?', answer: 'Tamiza', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najwyższy szczyt Tatr?', answer: 'Gerlach', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest najniżej położona depresja lądowa na Ziemi?', answer: 'Morze Martwe', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się cieśnina oddzielająca Europę od Afryki w rejonie Hiszpanii?', answer: 'Cieśnina Gibraltarska', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest najbardziej wysunięta na południe stolica świata?', answer: 'Wellington (Nowa Zelandia)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się archipelag wysp, na którym leży Indonezja (typ geograficzny)?', answer: 'Archipelag', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Ile wynosi w przybliżeniu obwód Ziemi po równiku (km)?', answer: 'Ok. 40 075 km', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się umowna linia zmiany daty na Pacyfiku?', answer: 'Linia zmiany daty', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'W jakim kraju leżą Alpy w największej części?', answer: 'Austria (i Szwajcaria, Włochy, Francja)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka rzeka przepływa przez Rzym?', answer: 'Tyber', type: 'normal', difficulty: 'h' },

    // --- Matematyka ---
    { category: 'Matematyka', question: 'Ile to jest 7 razy 8?', answer: '56', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile to jest 12 plus 15?', answer: '27', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile to jest 100 minus 37?', answer: '63', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile to jest 9 do kwadratu?', answer: '81', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile to jest połowa ze 100?', answer: '50', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile wynosi pierwiastek kwadratowy z 64?', answer: '8', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile kątów ma trójkąt?', answer: '3', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Ile kątów ma kwadrat?', answer: '4', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Czy liczba 2 jest liczbą pierwszą?', answer: 'Tak', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Jak nazywa się wynik dodawania?', answer: 'Suma', type: 'normal', difficulty: 'e' },
    { category: 'Matematyka', question: 'Jak nazywa się wynik odejmowania?', answer: 'Różnica', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi liczba Pi w zaokrągleniu do dwóch miejsc po przecinku?', answer: '3,14', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile boków ma sześciokąt?', answer: '6', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile boków ma pięciokąt?', answer: '5', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi 10 do potęgi 3?', answer: '1000', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba niepodzielna przez 2 bez reszty?', answer: 'Liczba nieparzysta', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi pole kwadratu o boku 5?', answer: '25', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi pole prostokąta o bokach 4 i 6?', answer: '24', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba przeciwna do liczby dodatniej?', answer: 'Liczba ujemna', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi najmniejsza liczba naturalna dodatnia?', answer: '1', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile to jest 144 podzielone przez 12?', answer: '12', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się figura geometryczna o nieskończonej liczbie boków, okrągła?', answer: 'Koło / okrąg', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się dział matematyki zajmujący się figurami i bryłami?', answer: 'Geometria', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi 1000 gramów w kilogramach?', answer: '1 kg', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile centymetrów ma metr?', answer: '100', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile metrów ma kilometr?', answer: '1000', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi suma kątów w trójkącie (w stopniach)?', answer: '180°', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi suma kątów w czworokącie (w stopniach)?', answer: '360°', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba, która dzieli się tylko przez 1 i przez samą siebie?', answer: 'Liczba pierwsza', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi 15% ze 200?', answer: '30', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się wynik dzielenia?', answer: 'Iloraz', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się wynik mnożenia?', answer: 'Iloczyn', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się trójkąt, który ma wszystkie boki równe?', answer: 'Trójkąt równoboczny', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się trójkąt z kątem prostym?', answer: 'Trójkąt prostokątny', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak brzmi twierdzenie łączące boki trójkąta prostokątnego (nazwisko)?', answer: 'Twierdzenie Pitagorasa', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile to jest 1/2 + 1/4 (jako ułamek)?', answer: '3/4', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile to jest 3/4 wyrażone jako procent?', answer: '75%', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi wartość bezwzględna liczby -7?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi 0 do dowolnej dodatniej potęgi?', answer: '0', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Ile wynosi dowolna liczba do potęgi 0 (poza zerem)?', answer: '1', type: 'normal', difficulty: 'm' },
    { category: 'Matematyka', question: 'Jak nazywa się zbiór liczb: 1, 2, 3, 4, 5...?', answer: 'Liczby naturalne', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi 25% z 400?', answer: '100', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile to jest 13 razy 13?', answer: '169', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi 5 do potęgi 3?', answer: '125', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile to jest 6 silnia (6!)?', answer: '720', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się najdłuższy bok trójkąta prostokątnego?', answer: 'Przeciwprostokątna', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi 2 do potęgi 10?', answer: '1024', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi obwód koła o promieniu r (wzór - podaj słownie)?', answer: '2 razy pi razy promień (2πr)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma liczb od 1 do 10?', answer: '55', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się dział matematyki zajmujący się prawdopodobieństwem?', answer: 'Rachunek prawdopodobieństwa (statystyka)', type: 'normal', difficulty: 'h' },

    // --- Język polski ---
    { category: 'Język polski', question: 'Kto napisał "Pana Tadeusza"?', answer: 'Adam Mickiewicz', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się pierwszy przypadek w polskiej deklinacji?', answer: 'Mianownik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się część mowy odmieniająca się przez osoby i czasy?', answer: 'Czasownik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się część mowy nazywająca cechę rzeczownika?', answer: 'Przymiotnik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się część mowy nazywająca przedmioty, osoby, zjawiska?', answer: 'Rzeczownik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Ile sylab ma wyraz "kot"?', answer: '1', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się znak interpunkcyjny "?"', answer: 'Pytajnik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się znak interpunkcyjny "!"', answer: 'Wykrzyknik', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Kto jest autorem "Wiedźmina"?', answer: 'Andrzej Sapkowski', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak ma na imię Wiedźmin, główny bohater sagi Sapkowskiego?', answer: 'Geralt (z Rivii)', type: 'normal', difficulty: 'e' },
    { category: 'Język polski', question: 'Jak nazywa się krótki utwór z morałem, często z udziałem zwierząt?', answer: 'Bajka', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się zbiór wyrazów o podobnym znaczeniu?', answer: 'Synonimy', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się para wyrazów o przeciwnym znaczeniu?', answer: 'Antonimy', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Mały Książę" (choć nie po polsku, powszechnie znany w Polsce)?', answer: 'Antoine de Saint-Exupéry', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Lalkę"?', answer: 'Bolesław Prus', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Quo vadis"?', answer: 'Henryk Sienkiewicz', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Wesele"?', answer: 'Stanisław Wyspiański', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Dziady"?', answer: 'Adam Mickiewicz', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto jest autorem "Potopu"?', answer: 'Henryk Sienkiewicz', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się główny bohater "Pana Tadeusza"?', answer: 'Tadeusz Soplica', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Ile wynosi liczba przypadków w języku polskim?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Ile liter ma polski alfabet?', answer: '32', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Krzyżaków"?', answer: 'Henryk Sienkiewicz', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się rodzaj literacki, do którego należą wiersze?', answer: 'Liryka', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się rodzaj literacki, do którego należą dramaty i sztuki teatralne?', answer: 'Dramat', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Balladynę"?', answer: 'Juliusz Słowacki', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się utwór literacki opisujący czyjeś życie napisany przez inną osobę?', answer: 'Biografia', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się utwór, w którym autor opisuje własne życie?', answer: 'Autobiografia', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Która polska noblistka napisała "Wieszczka Kraju" i wiele innych wierszy, laureatka z 1996 roku?', answer: 'Wisława Szymborska', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Która polska pisarka otrzymała Nagrodę Nobla w 2018 roku?', answer: 'Olga Tokarczuk', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Solaris"?', answer: 'Stanisław Lem', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jakim gatunkiem literackim zajmował się głównie Stanisław Lem?', answer: 'Fantastyka naukowa (science fiction)', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się nauka o poprawności językowej?', answer: 'Gramatyka / ortografia (zależnie od kontekstu)', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Ile podstawowych czasów gramatycznych ma język polski (teraźniejszy, przeszły, przyszły)?', answer: '3', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się zdanie zawierające tylko jedno orzeczenie?', answer: 'Zdanie pojedyncze', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Zemstę"?', answer: 'Aleksander Fredro', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jaki gatunek literacki reprezentuje "Zemsta" Fredry?', answer: 'Komedia', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto napisał "Ferdydurke"?', answer: 'Witold Gombrowicz', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się znak diakrytyczny nad literą "ó"?', answer: 'Kreska (akcent)', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Kto jest autorem "Chłopów", za które otrzymał Nagrodę Nobla?', answer: 'Władysław Reymont', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Ilu polskich pisarzy/poetów otrzymało literacką Nagrodę Nobla (do 2023 r.)?', answer: '5 (Sienkiewicz, Reymont, Miłosz, Szymborska, Tokarczuk)', type: 'normal', difficulty: 'm' },
    { category: 'Język polski', question: 'Jak nazywa się rodzaj literacki, do którego należą powieści i opowiadania?', answer: 'Epika', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Nad Niemnem"?', answer: 'Eliza Orzeszkowa', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał wiersz "Katarynka"? (Podpowiedź: noblistka)', answer: 'Wisława Szymborska (różne utwory - akceptowalne przybliżenie)', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał bajki "Wilk i Baranek", "Żółw i Zając" (rodzaj literacki: bajka)?', answer: 'Ignacy Krasicki (polski bajkopisarz)', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się zestawienie dwóch przeciwstawnych pojęć w literaturze?', answer: 'Kontrast / antyteza', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się porównanie bez użycia "jak" lub "jakby"?', answer: 'Metafora', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się ożywienie przedmiotów nieożywionych w literaturze?', answer: 'Personifikacja', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Ile wersów ma tradycyjny sonet?', answer: '14', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się zestaw głosek tworzących wyraz?', answer: 'Fonetyka (dział o głoskach)', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Kamieni na szaniec"?', answer: 'Aleksander Kamiński', type: 'normal', difficulty: 'h' },

    // --- Biologia ---
    { category: 'Biologia', question: 'Jak nazywa się podstawowa jednostka budująca organizmy żywe?', answer: 'Komórka', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym rośliny wytwarzają energię ze światła?', answer: 'Fotosynteza', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jaki gaz rośliny pochłaniają podczas fotosyntezy?', answer: 'Dwutlenek węgla', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jaki gaz rośliny wydzielają podczas fotosyntezy?', answer: 'Tlen', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jak nazywa się zielony barwnik roślin odpowiedzialny za fotosyntezę?', answer: 'Chlorofil', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Ile komór ma ludzkie serce?', answer: '4', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jaki narząd odpowiada za oczyszczanie krwi z toksyn?', answer: 'Wątroba', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jak nazywa się cząsteczka przenosząca informację genetyczną?', answer: 'DNA', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Kto sformułował teorię ewolucji poprzez dobór naturalny?', answer: 'Karol Darwin', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Ile nóg ma owad?', answer: '6', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Ile nóg ma pająk?', answer: '8', type: 'normal', difficulty: 'e' },
    { category: 'Biologia', question: 'Jaki jest największy narząd ludzkiego ciała?', answer: 'Skóra', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaki narząd odpowiada za pompowanie krwi w organizmie?', answer: 'Serce', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaki jest największy ssak na świecie?', answer: 'Płetwal błękitny', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaki organ zmysłu odpowiada za węch?', answer: 'Nos', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Ile zmysłów podstawowych wyróżnia się klasycznie u człowieka?', answer: '5', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym gąsienica zmienia się w motyla?', answer: 'Metamorfoza', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się nauka o zwierzętach?', answer: 'Zoologia', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się nauka o roślinach?', answer: 'Botanika', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaki pierwiastek jest głównym budulcem materii organicznej?', answer: 'Węgiel', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się najmniejsze naczynia krwionośne?', answer: 'Naczynia włosowate (kapilary)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaki narząd produkuje insulinę?', answer: 'Trzustka', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Ile chromosomów ma zdrowy człowiek?', answer: '46', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces podziału komórki na dwie identyczne komórki potomne?', answer: 'Mitoza', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się organizm zdolny do samodzielnego wytwarzania pokarmu?', answer: 'Producent (autotrof)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywają się organizmy odżywiające się innymi organizmami?', answer: 'Konsumenci (heterotrofy)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Czy pająk jest owadem?', answer: 'Nie, jest pajęczakiem', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Ile kości ma dorosły człowiek?', answer: '206', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się najdłuższa kość w ludzkim ciele?', answer: 'Kość udowa', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się podstawowa jednostka dziedziczności?', answer: 'Gen', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces przystosowania organizmów do środowiska w toku ewolucji?', answer: 'Adaptacja', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Ile jest grup krwi w układzie AB0?', answer: '4', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się białko czerwonych krwinek przenoszące tlen?', answer: 'Hemoglobina', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jaka witamina powstaje w skórze pod wpływem światła słonecznego?', answer: 'Witamina D', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się największy organ wewnętrzny człowieka?', answer: 'Wątroba', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się gruczoł wydzielający hormony regulujące metabolizm, znajdujący się w szyi?', answer: 'Tarczyca', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Ile lat może żyć przeciętnie żółw słoniowy?', answer: 'Ponad 100 lat', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się zjawisko zmiany koloru u kameleona jako reakcja na otoczenie?', answer: 'Mimikra (kamuflaż)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces wymiany gazowej w płucach?', answer: 'Wymiana gazowa (oddychanie)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się roślina mięsożerna łapiąca owady w "paszczę"?', answer: 'Muchołówka amerykańska', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces podziału prowadzący do powstania komórek rozrodczych?', answer: 'Mejoza', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się nauka zajmująca się klasyfikacją organizmów?', answer: 'Taksonomia (systematyka)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się proces oddychania komórkowego wytwarzający energię?', answer: 'Oddychanie komórkowe (respiracja)', type: 'normal', difficulty: 'm' },
    { category: 'Biologia', question: 'Jak nazywa się najmniejsza kość w ludzkim ciele?', answer: 'Strzemiączko (w uchu)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Kto odkrył prawa dziedziczenia cech, badając groch?', answer: 'Gregor Mendel', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces oddawania wody przez liście rośliny?', answer: 'Transpiracja', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jaki jest najmniejszy ssak na świecie?', answer: 'Ryjówka etruska (lub nocek karliczek)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Ile serc ma ośmiornica?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się choroba wywołana niedoborem witaminy C?', answer: 'Szkorbut', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Ile płatów ma ludzkie płuco prawe?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się jednostka funkcjonalna nerki?', answer: 'Nefron', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jakie zwierzę jest największym gadem na świecie?', answer: 'Krokodyl różańcowy (grzebieniasty)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Ile komór ma żołądek krowy?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywają się zwierzęta wykluwające się z jaj, ale karmiące młode mlekiem (jak dziobak)?', answer: 'Stekowce', type: 'normal', difficulty: 'h' },

    // --- Chemia ---
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny wody?', answer: 'H2O', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny tlenu?', answer: 'O', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny węgla?', answer: 'C', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny wodoru?', answer: 'H', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Ile pierwiastków chemicznych ma cząsteczka wody?', answer: '2 (wodór i tlen)', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jak nazywa się tablica porządkująca pierwiastki chemiczne?', answer: 'Układ okresowy pierwiastków', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaki gaz stanowi ok. 21% atmosfery Ziemi?', answer: 'Tlen', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaka jest chemiczna nazwa soli kuchennej?', answer: 'Chlorek sodu (NaCl)', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jak nazywa się substancja o pH poniżej 7?', answer: 'Kwas', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jak nazywa się substancja o pH powyżej 7?', answer: 'Zasada (baza)', type: 'normal', difficulty: 'e' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny helu?', answer: 'He', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki gaz szlachetny wypełnia balony unoszące się w powietrzu?', answer: 'Hel', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Ile stanów skupienia materii wyróżnia się klasycznie?', answer: '3 (stały, ciekły, gazowy)', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki wzór chemiczny ma dwutlenek węgla?', answer: 'CO2', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek jest podstawą chemii organicznej?', answer: 'Węgiel', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się najmniejsza część pierwiastka zachowująca jego właściwości?', answer: 'Atom', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się szkło powiększające używane do obserwacji bardzo małych obiektów, oparte na soczewkach?', answer: 'Mikroskop (to przyrząd, nie szkło, ale odpowiedź: lupa/mikroskop)', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny złota?', answer: 'Au', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny srebra?', answer: 'Ag', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny żelaza?', answer: 'Fe', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny sodu?', answer: 'Na', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Kto stworzył układ okresowy pierwiastków?', answer: 'Dmitrij Mendelejew', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki gaz jest najbardziej powszechny w atmosferze Ziemi?', answer: 'Azot', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jakie pH ma czysta woda destylowana?', answer: '7 (obojętne)', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny neonu?', answer: 'Ne', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki wzór chemiczny ma metan?', answer: 'CH4', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma symbol K?', answer: 'Potas', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma symbol Cu?', answer: 'Miedź', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Ile elektronów ma obojętny atom wodoru?', answer: '1', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się proces łączenia się dwóch lub więcej atomów w cząsteczkę?', answer: 'Wiązanie chemiczne', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki jest najlżejszy pierwiastek chemiczny?', answer: 'Wodór', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki metal jest ciekły w temperaturze pokojowej?', answer: 'Rtęć', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się kwas znajdujący się w occie?', answer: 'Kwas octowy', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się kwas znajdujący się w żołądku?', answer: 'Kwas solny', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się proces oczyszczania cieczy przez podgrzewanie i skraplanie pary?', answer: 'Destylacja', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się połączenie dwóch lub więcej pierwiastków chemicznych?', answer: 'Związek chemiczny', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki gaz używany jest do gaszenia niektórych pożarów, ten sam, który wydychamy?', answer: 'Dwutlenek węgla', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma symbol Cl?', answer: 'Chlor', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek chemiczny jest głównym składnikiem diamentu?', answer: 'Węgiel', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jak nazywa się przejście ze stanu stałego bezpośrednio w gazowy?', answer: 'Sublimacja', type: 'normal', difficulty: 'm' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma symbol Pb?', answer: 'Ołów', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma symbol Sn?', answer: 'Cyna', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się reakcja chemiczna wydzielająca ciepło?', answer: 'Reakcja egzotermiczna', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się reakcja chemiczna pochłaniająca ciepło?', answer: 'Reakcja endotermiczna', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki gaz powstaje podczas rdzewienia żelaza w reakcji z tlenem?', answer: 'Nie gaz - powstaje tlenek żelaza (rdza)', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki wzór chemiczny ma amoniak?', answer: 'NH3', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Ile neutronów ma typowy atom węgla-12?', answer: '6', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaka jest wartość liczby Avogadra w przybliżeniu (rząd wielkości)?', answer: '6,022 × 10^23', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki gaz nadaje charakterystyczny zapach zgniłym jajom?', answer: 'Siarkowodór', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki jest wzór chemiczny kwasu siarkowego?', answer: 'H2SO4', type: 'normal', difficulty: 'h' },

    // --- Fizyka ---
    { category: 'Fizyka', question: 'Kto sformułował teorię względności?', answer: 'Albert Einstein', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Kto sformułował prawa ruchu i prawo powszechnego ciążenia?', answer: 'Isaac Newton', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się siła przyciągania między masami?', answer: 'Grawitacja', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się zmiana stanu skupienia z cieczy w gaz?', answer: 'Parowanie', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'W jakiej temperaturze (°C) woda zamarza pod normalnym ciśnieniem?', answer: '0°C', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'W jakiej temperaturze (°C) woda wrze pod normalnym ciśnieniem?', answer: '100°C', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka elementarna o ładunku ujemnym krążąca wokół jądra atomu?', answer: 'Elektron', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka elementarna o ładunku dodatnim w jądrze atomu?', answer: 'Proton', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka elementarna bez ładunku w jądrze atomu?', answer: 'Neutron', type: 'normal', difficulty: 'e' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie do pomiaru temperatury?', answer: 'Termometr', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się siła oporu działająca przeciw ruchowi dwóch powierzchni stykających się?', answer: 'Tarcie', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jaka jest jednostka masy w układzie SI?', answer: 'Kilogram (kg)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jaka jest jednostka długości w układzie SI?', answer: 'Metr (m)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jaka jest jednostka czasu w układzie SI?', answer: 'Sekunda (s)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko odbicia fali od przeszkody?', answer: 'Odbicie (refleksja)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie wykorzystujące soczewki do powiększania odległych obiektów?', answer: 'Teleskop (lub luneta)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka siły w układzie SI?', answer: 'Niuton (N)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka energii w układzie SI?', answer: 'Dżul (J)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka mocy w układzie SI?', answer: 'Wat (W)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jaka jest w przybliżeniu prędkość światła w próżni (km/s)?', answer: 'Ok. 300 000 km/s', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jaka jest w przybliżeniu wartość przyspieszenia ziemskiego (m/s²)?', answer: 'Ok. 9,8 m/s²', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się zmiana stanu skupienia z gazu w ciecz?', answer: 'Skraplanie (kondensacja)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka natężenia prądu elektrycznego?', answer: 'Amper (A)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka napięcia elektrycznego?', answer: 'Wolt (V)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka oporu elektrycznego?', answer: 'Om (Ω)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Ile podstawowych barw tworzy tęczę (klasycznie)?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się fala elektromagnetyczna widzialna dla ludzkiego oka?', answer: 'Światło widzialne', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie do pomiaru ciśnienia atmosferycznego?', answer: 'Barometr', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się energia związana z ruchem ciała?', answer: 'Energia kinetyczna', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się energia związana z położeniem ciała?', answer: 'Energia potencjalna', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Kto sformułował słynny wzór E=mc²?', answer: 'Albert Einstein', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie zamieniające energię mechaniczną w elektryczną?', answer: 'Generator (prądnica)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko wzajemnego przyciągania lub odpychania ładunków elektrycznych?', answer: 'Elektryczność (siła elektrostatyczna)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się fala dźwiękowa o częstotliwości powyżej progu słyszalności człowieka?', answer: 'Ultradźwięk', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka częstotliwości?', answer: 'Herc (Hz)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Jak nazywa się stan, w którym ciało nie doświadcza siły grawitacji odczuwalnej (np. w kosmosie)?', answer: 'Nieważkość', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Kto skonstruował pierwszy praktyczny żarowy telefon i żarówkę (w kontekście wynalazków)?', answer: 'Thomas Edison (żarówka)', type: 'normal', difficulty: 'm' },
    { category: 'Fizyka', question: 'Kto sformułował prawo opisujące zależność między napięciem, prądem i oporem?', answer: 'Georg Ohm', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko rozszczepienia światła białego na barwy przez pryzmat?', answer: 'Dyspersja światła', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko uginania się fal na przeszkodach?', answer: 'Dyfrakcja', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się gałąź fizyki zajmująca się zjawiskami w skali atomowej?', answer: 'Fizyka kwantowa (mechanika kwantowa)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się proces rozpadu jądra atomowego z wydzieleniem energii?', answer: 'Rozszczepienie jądrowe', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się proces łączenia lekkich jąder atomowych w cięższe z wydzieleniem energii (np. w Słońcu)?', answer: 'Fuzja jądrowa (synteza termojądrowa)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka ciśnienia w układzie SI?', answer: 'Paskal (Pa)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Ile wynosi prędkość dźwięku w powietrzu w przybliżeniu (m/s)?', answer: 'Ok. 340 m/s', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko załamania światła przy przejściu między ośrodkami?', answer: 'Refrakcja (załamanie)', type: 'normal', difficulty: 'h' },

    // --- Informatyka ---
    { category: 'Informatyka', question: 'Co oznacza skrót CPU?', answer: 'Central Processing Unit (procesor)', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Co oznacza skrót RAM?', answer: 'Random Access Memory (pamięć operacyjna)', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Kto jest współzałożycielem firmy Microsoft?', answer: 'Bill Gates (i Paul Allen)', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Kto jest współzałożycielem firmy Apple?', answer: 'Steve Jobs (i Steve Wozniak)', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Co oznacza skrót AI w informatyce?', answer: 'Artificial Intelligence (sztuczna inteligencja)', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Jak nazywa się przeglądarka internetowa stworzona przez Google?', answer: 'Google Chrome', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Jak nazywa się język programowania stworzony przez Guido van Rossuma?', answer: 'Python', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Jaka firma stworzyła system operacyjny Windows?', answer: 'Microsoft', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Jak nazywa się skrót od "Wireless Fidelity" oznaczający bezprzewodowy internet?', answer: 'Wi-Fi', type: 'normal', difficulty: 'e' },
    { category: 'Informatyka', question: 'Kto jest twórcą Facebooka?', answer: 'Mark Zuckerberg', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się urządzenie przechowujące dane trwale w komputerze (dysk)?', answer: 'Dysk twardy (HDD/SSD)', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się sieć komputerowa obejmująca cały świat?', answer: 'Internet', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się prosty program pozwalający na czatowanie z AI, stworzony przez OpenAI?', answer: 'ChatGPT', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jaka firma stworzyła model językowy Claude?', answer: 'Anthropic', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się format kompresji plików bardzo popularny w Windows?', answer: 'ZIP', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się skrót klawiszowy do kopiowania w większości systemów?', answer: 'Ctrl+C', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się skrót klawiszowy do wklejania w większości systemów?', answer: 'Ctrl+V', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się rodzina języków znaczników do tworzenia stron internetowych wraz z CSS i JS?', answer: 'HTML', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się urządzenie wejściowe do wskazywania punktów na ekranie, popularne przy komputerach stacjonarnych?', answer: 'Mysz komputerowa', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót HTML?', answer: 'HyperText Markup Language', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót URL?', answer: 'Uniform Resource Locator', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się system liczbowy używający tylko cyfr 0 i 1?', answer: 'System binarny (dwójkowy)', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się złośliwe oprogramowanie szyfrujące pliki dla okupu?', answer: 'Ransomware', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się podstawowy system operacyjny stworzony przez Linusa Torvaldsa?', answer: 'Linux', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót Wi-Fi (potocznie)?', answer: 'Bezprzewodowa sieć lokalna (technologia bezprzewodowa)', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się jednostka informacji przyjmująca wartość 0 lub 1?', answer: 'Bit', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Ile bitów ma jeden bajt?', answer: '8', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót USB?', answer: 'Universal Serial Bus', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się złośliwy program podszywający się pod legalne oprogramowanie?', answer: 'Koń trojański (trojan)', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót PDF?', answer: 'Portable Document Format', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się protokół używany do przesyłania stron internetowych?', answer: 'HTTP', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się bezpieczna wersja protokołu HTTP?', answer: 'HTTPS', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się firma, która stworzyła procesory Pentium i Core?', answer: 'Intel', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Co oznacza skrót GPU?', answer: 'Graphics Processing Unit (procesor graficzny)', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się atak polegający na wysyłaniu fałszywych wiadomości w celu wyłudzenia danych?', answer: 'Phishing', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się popularny język programowania używany głównie do stylizacji stron internetowych?', answer: 'CSS', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się firma produkująca procesory Ryzen?', answer: 'AMD', type: 'normal', difficulty: 'm' },
    { category: 'Informatyka', question: 'Jak nazywa się popularna platforma do hostowania kodu źródłowego oparta na Git?', answer: 'GitHub', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się rodzaj pamięci ulotnej tracącej dane po wyłączeniu zasilania?', answer: 'RAM', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się format pliku graficznego wspierający przezroczystość, popularny w internecie?', answer: 'PNG', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się skrócony zapis "Internet of Things" po polsku?', answer: 'Internet rzeczy', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się firma będąca właścicielem wyszukiwarki Google?', answer: 'Alphabet Inc.', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się popularny system kontroli wersji kodu stworzony przez Linusa Torvaldsa?', answer: 'Git', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się pamięć komputera, która trwale przechowuje dane nawet po wyłączeniu zasilania?', answer: 'Pamięć nieulotna (np. dysk)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Ile lat (w przybliżeniu) istnieje internet w formie publicznej (od wczesnych lat 90.)?', answer: 'Ponad 30 lat', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się oprogramowanie antywirusowe stworzone m.in. przez firmę z Krakowa?', answer: 'Np. Comodo lub inne - w Polsce znany np. mks_vir/Arcabit', type: 'normal', difficulty: 'h' },

    // --- Gry planszowe ---
    { category: 'Gry planszowe', question: 'Ile pól ma szachownica?', answer: '64', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Ile figur ma jeden gracz na początku partii szachów?', answer: '16', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Jak nazywa się najsilniejsza figura w szachach?', answer: 'Hetman (królowa)', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Ile pionków ma gracz na początku partii szachów?', answer: '8', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Ile oczek maksymalnie można wyrzucić na jednej standardowej kostce do gry?', answer: '6', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa, w której gracze kupują nieruchomości i dążą do bankructwa przeciwników?', answer: 'Monopoly', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra karciana z kolorowymi kartami i zasadą "Uno" przy ostatniej karcie?', answer: 'Uno', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Ile jest kolorów w klasycznym chińczyku (zazwyczaj)?', answer: '4', type: 'normal', difficulty: 'e' },
    { category: 'Gry planszowe', question: 'Jak nazywa się ruch w warcabach polegający na przeskoczeniu pionka przeciwnika?', answer: 'Bicie', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile pól przesuwa się pionek gracza, który rzuci na kostce 6 w klasycznej grze "Chińczyk"?', answer: '6', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra, w której gracze zgadują rysunki przeciwników (kalambury rysunkowe)?', answer: 'Kalambury (Pictionary)', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra kart z liczbami i akcjami w kolorach, gdzie trzeba pozbyć się wszystkich kart?', answer: 'Uno', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile ścianek ma standardowa kostka do gry?', answer: '6', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra karciana z Polski, w której gra się "w wojnę" o karty?', answer: 'Wojna', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się japońska gra logiczna z liczbami 1-9 wpisywanymi do siatki 9x9?', answer: 'Sudoku', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się ruch specjalny w szachach polegający na jednoczesnym przesunięciu króla i wieży?', answer: 'Roszada', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile graczy standardowo może grać w klasyczne Monopoly?', answer: '2-8 (zwykle do 6)', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa osadzona w średniowiecznej Europie, gdzie gracze budują miasta i drogi z kafelków?', answer: 'Carcassonne', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra strategiczna, w której gracze budują osady i miasta na heksagonalnej wyspie surowców?', answer: 'Osadnicy z Catanu (Catan)', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa detektywistyczna, w której trzeba odgadnąć mordercę, broń i miejsce zbrodni?', answer: 'Cluedo', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra słowna, w której układa się słowa z liter na planszy z polami punktowymi?', answer: 'Scrabble', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra, w której gracze zbierają karty kolejowe, by budować trasy między miastami?', answer: 'Wsiąść do pociągu (Ticket to Ride)', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile pionków ma każdy gracz na początku gry w warcaby (na planszy 8x8)?', answer: '12', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra karciana, w której trzeba unikać czarnej damy (królowej pik)?', answer: 'Czarny Piotruś', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra RPG typu "fabularna" z kośćmi wielościennymi, popularna od lat 70.?', answer: 'Dungeons & Dragons', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile ścianek ma kostka "k20", popularna w grach RPG?', answer: '20', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra kooperacyjna, w której gracze walczą z rozprzestrzeniającymi się epidemiami?', answer: 'Pandemic', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra strategiczna wojenna z heksagonalną mapą świata i podbojem terytoriów, klasyk od 1957?', answer: 'Risk', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile kart otrzymuje każdy gracz na start w klasycznym pokerze (Texas Hold\'em, karty własne)?', answer: '2', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra logiczna z kolorowymi kołkami, gdzie jeden gracz układa kod, a drugi go odgaduje?', answer: 'Mastermind', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra w kości, w której trzeba zebrać określone układy, jak "strit" czy "full"?', answer: 'Yahtzee (Kości)', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Ile liter potrzeba w Scrabble, by ułożyć "bingo" (użyć wszystkich liter z rączki)?', answer: '7', type: 'normal', difficulty: 'm' },
    { category: 'Gry planszowe', question: 'Jak nazywa się starożytna chińska gra strategiczna z czarnymi i białymi kamieniami na planszy?', answer: 'Go', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jaka jest liczba domków w klasycznym Monopoly, po których buduje się hotel?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się polska gra planszowa o podboju kosmosu/przygodzie, autorstwa Ignacego Trzewiczka?', answer: 'Robinson Crusoe / 51st State (jedna z gier)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra karciana, w której trzeba zbierać zestawy kart tego samego koloru unikając "czarnej Marii"?', answer: 'Czarna Maria (Hearts - odmiana)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile kart wspólnych (flop, turn, river razem) odkrywa się w Texas Hold\'em?', answer: '5', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się najwyższy układ w pokerze, pięć kart tego samego koloru w kolejności od 10 do asa?', answer: 'Poker królewski (royal flush)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa symulująca budowę cywilizacji od starożytności po nowoczesność (na bazie gry komputerowej)?', answer: 'Cywilizacja (Civilization) - planszowa adaptacja', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile pól ma plansza do gry w chińczyka wokół całej trasy (typowo, wliczając bazy)?', answer: 'Zależy od wariantu, zwykle 40+ pól na trasie głównej', type: 'normal', difficulty: 'h' },

    // --- Gry komputerowe ---
    { category: 'Gry komputerowe', question: 'Jak nazywa się najpopularniejsza gra typu "battle royale" stworzona przez Epic Games?', answer: 'Fortnite', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra o budowaniu z klocków, stworzona przez Markusa Perssona (Notcha)?', answer: 'Minecraft', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła serię gier "The Witcher" (Wiedźmin)?', answer: 'CD Projekt RED', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Kto jest głównym bohaterem serii gier "Wiedźmin"?', answer: 'Geralt z Rivii', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier o hydrauliku w czerwonej czapce od Nintendo?', answer: 'Mario (Super Mario)', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier o niebieskim jeżu od Sega?', answer: 'Sonic the Hedgehog', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła konsolę PlayStation?', answer: 'Sony', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła konsolę Xbox?', answer: 'Microsoft', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła konsolę Switch?', answer: 'Nintendo', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra logiczna z kolorowymi klockami spadającymi w dół, klasyk z lat 80.?', answer: 'Tetris', type: 'normal', difficulty: 'e' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna platforma cyfrowej dystrybucji gier PC stworzona przez Valve?', answer: 'Steam', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier akcji-przygodowych o poszukiwaczce skarbów Larze Croft?', answer: 'Tomb Raider', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się księżniczka, którą trzeba ratować w serii "The Legend of Zelda"?', answer: 'Zelda', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra typu "life simulation" od Electronic Arts, gdzie tworzy się wirtualne życie postaci?', answer: 'The Sims', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra logiczna 2D o fizyce ptaków strzelanych z procy w świnie, hit na smartfony?', answer: 'Angry Birds', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier wyścigowych arcade z pluszakami/kartingiem od Nintendo, z Mario w roli głównej?', answer: 'Mario Kart', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier strzelanek z serii "Call of Duty" - jaka firma ją wydaje?', answer: 'Activision', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra typu MOBA stworzona przez Riot Games?', answer: 'League of Legends', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra strzelanka taktyczna z bombą, część serii Counter-Strike, wydana w 2023?', answer: 'Counter-Strike 2', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier sportowych piłkarskich od EA Sports (dawniej FIFA)?', answer: 'EA Sports FC', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła serię gier "Grand Theft Auto"?', answer: 'Rockstar Games', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra typu "sandbox" o przetrwaniu na bezludnej wyspie z klockami, konkurencja Minecrafta - Roblox to platforma czy gra?', answer: 'Roblox to platforma do tworzenia gier', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra 2022 roku od FromSoftware osadzona w świecie fantasy stworzonym z George\'em R.R. Martinem?', answer: 'Elden Ring', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria strategicznych gier turowych o budowaniu cywilizacji, stworzona przez Sida Meiera?', answer: 'Civilization', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra typu "battle royale" od Krafton, jedna z pierwszych w gatunku?', answer: 'PUBG (PlayerUnknown\'s Battlegrounds)', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra karciana kolekcjonerska online od Blizzard, oparta na uniwersum Warcraft?', answer: 'Hearthstone', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jaka firma stworzyła serię gier "World of Warcraft"?', answer: 'Blizzard Entertainment', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się główny bohater serii gier "The Legend of Zelda"?', answer: 'Link', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polskie studio, które stworzyło grę "Dying Light"?', answer: 'Techland', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria horrorów survivalowych o Leonie Kennedym i Claire Redfield?', answer: 'Resident Evil', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra 2020 roku o wyspie i zwierzątkach-sąsiadach od Nintendo?', answer: 'Animal Crossing: New Horizons', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra bijatyka z Ryu i Ken jako bohaterami?', answer: 'Street Fighter', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra bijatyka z postaciami Scorpion i Sub-Zero?', answer: 'Mortal Kombat', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier platformowych z jeżozwierzem Crashem Bandicootem?', answer: 'Crash Bandicoot', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra typu battle royale wydana przez Respawn Entertainment, osadzona w uniwersum Titanfall?', answer: 'Apex Legends', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polska gra o przetrwaniu w mieście opanowanym przez zombie, stworzona przez studio Techland?', answer: 'Dying Light', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra, w której gracze budują i zarządzają własnym parkiem rozrywki, klasyk lat 90.?', answer: 'RollerCoaster Tycoon', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna strzelanka kosmiczna typu hero-shooter od Blizzard?', answer: 'Overwatch', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polska firma będąca właścicielem platformy GOG.com?', answer: 'CD Projekt', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra o budowaniu farmy, uprawie roślin i relacjach z mieszkańcami wioski, hit indie z 2016?', answer: 'Stardew Valley', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się główny bohater serii gier "Grand Theft Auto V", jeden z trzech protagonistów, były rabuś banków?', answer: 'Michael De Santa (lub Trevor/Franklin)', type: 'normal', difficulty: 'm' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier RPG akcji "Dark Souls" - jakie studio ją stworzyło?', answer: 'FromSoftware', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Kto stworzył grę Tetris?', answer: 'Aleksiej Pażitnow', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier o skradaniu się agenta Solid Snake\'a?', answer: 'Metal Gear Solid', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polska gra survivalowa o przetrwaniu w postapokaliptycznym Polsce, stworzona przez studio Vile Monarch?', answer: 'SCUM', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się popularna gra kosmiczna o eksploracji i przetrwaniu, stworzona przez Hello Games?', answer: 'No Man\'s Sky', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra typu "rougelike" o ucieczce z podziemi Podziemnego Świata, stworzona przez Supergiant Games?', answer: 'Hades', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się japońskie studio odpowiedzialne za serię "Final Fantasy"?', answer: 'Square Enix', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Ile numerowanych głównych części ma seria "Final Fantasy" (do 2023, w przybliżeniu)?', answer: '16', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria survival-horrorów o dziewczynce imieniem Clementine, epizodyczna gra Telltale?', answer: 'The Walking Dead (gra Telltale)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra platformowa 2D o robaczku odkrywającym podziemne królestwo, hit indie 2017?', answer: 'Hollow Knight', type: 'normal', difficulty: 'h' },

    // --- Motoryzacja ---
    { category: 'Motoryzacja', question: 'Jaka firma produkuje model samochodu "Golf"?', answer: 'Volkswagen', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Ferrari?', answer: 'Włochy', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Porsche?', answer: 'Niemcy', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Peugeot?', answer: 'Francja', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jak nazywa się najbardziej znany model polskiego samochodu z PRL, tzw. "Maluch"?', answer: 'Fiat 126p', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Ile kół ma standardowy samochód osobowy?', answer: '4', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jak nazywa się urządzenie w samochodzie zmniejszające prędkość pojazdu?', answer: 'Hamulec', type: 'normal', difficulty: 'e' },
    { category: 'Motoryzacja', question: 'Jak nazywa się paliwo używane w silnikach Diesla?', answer: 'Olej napędowy (diesel)', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jaka firma produkuje motocykle Harley-Davidson - z jakiego kraju pochodzi?', answer: 'USA', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się urządzenie mierzące prędkość pojazdu?', answer: 'Prędkościomierz', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jaka amerykańska firma jest liderem produkcji samochodów elektrycznych, założona przez Elona Muska?', answer: 'Tesla', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Lamborghini?', answer: 'Włochy', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Ile kół ma typowy motocykl?', answer: '2', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się urządzenie bezpieczeństwa nadmuchujące się w razie kolizji w samochodzie?', answer: 'Poduszka powietrzna (airbag)', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jaka firma produkuje popularny model "Model 3"?', answer: 'Tesla', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się dokument uprawniający do prowadzenia pojazdów?', answer: 'Prawo jazdy', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jaka firma produkuje model samochodu "Corolla"?', answer: 'Toyota', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Volvo?', answer: 'Szwecja', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Kto był mistrzem świata Formuły 1 siedem razy, obok Lewisa Hamiltona (rekordzista tytułów)?', answer: 'Michael Schumacher (i Lewis Hamilton)', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system napędu, w którym silnik napędza wszystkie cztery koła?', answer: 'Napęd na cztery koła (4x4 / AWD)', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się rodzaj silnika łączący silnik spalinowy i elektryczny?', answer: 'Silnik hybrydowy', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się największa niemiecka firma motoryzacyjna, właściciel marek Audi, Porsche, Skoda?', answer: 'Volkswagen Group', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką są samochody Skoda?', answer: 'Czechy', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny wyścig 24-godzinny odbywający się we Francji?', answer: '24h Le Mans', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się paliwo alternatywne, gaz stosowany w niektórych samochodach zamiast benzyny (skrót LPG)?', answer: 'Autogaz (LPG)', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się japońska firma motoryzacyjna, producent modeli Civic i Accord?', answer: 'Honda', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jakiego kraju marką jest Hyundai?', answer: 'Korea Południowa', type: 'normal', difficulty: 'm' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny amerykański producent muskularnych aut typu "muscle car", twórca Mustanga?', answer: 'Ford', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się kultowy niemiecki model samochodu, tzw. "garbus"?', answer: 'Volkswagen Garbus (Beetle)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile pasów ruchu ma standardowo autostrada w jednym kierunku (minimum)?', answer: '2', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się seria wyścigów samochodowych Formuła 1 - ile jest zazwyczaj bolidów na starcie (dwóch na zespół, ile zespołów w 2024)?', answer: '10 zespołów, 20 bolidów', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile tytułów mistrzowskich w Formule 1 zdobył Lewis Hamilton (do 2020)?', answer: '7', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jaki kraj ma najwięcej zwycięstw w rajdzie Dakar wśród producentów ciężarówek (dominująca marka)?', answer: 'Rosja (KAMAZ)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny tor wyścigowy we Włoszech, jeden z najstarszych w Formule 1?', answer: 'Monza', type: 'normal', difficulty: 'h' },

    // --- Technika ---
    { category: 'Technika', question: 'Kto wynalazł żarówkę (powszechnie przypisywany wynalazca)?', answer: 'Thomas Edison', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Kto wynalazł telefon?', answer: 'Alexander Graham Bell', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywał się serbsko-amerykański wynalazca prądu przemiennego?', answer: 'Nikola Tesla', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie umożliwiające drukowanie trójwymiarowych obiektów?', answer: 'Drukarka 3D', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca na komunikację bezprzewodową krótkiego zasięgu między urządzeniami?', answer: 'Bluetooth', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie transportu pionowego w budynkach?', answer: 'Winda', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca na określenie pozycji geograficznej za pomocą satelitów?', answer: 'GPS', type: 'normal', difficulty: 'e' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie do robienia zdjęć?', answer: 'Aparat fotograficzny', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie umożliwiające oglądanie ruchomych obrazów w domu?', answer: 'Telewizor', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się rodzaj energii odnawialnej pozyskiwanej z wiatru?', answer: 'Energia wiatrowa', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się rodzaj energii odnawialnej pozyskiwanej ze słońca za pomocą paneli?', answer: 'Energia słoneczna (fotowoltaika)', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie do chłodzenia żywności w domu?', answer: 'Lodówka', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca łączyć się z internetem bez kabli w budynku?', answer: 'Wi-Fi', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy samolot zdolny do lotu z napędem, razem z bratem?', answer: 'Bracia Wright (Orville i Wilbur)', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto wynalazł prasę drukarską z ruchomą czcionką?', answer: 'Johannes Gutenberg', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie zamieniające energię cieplną w mechaniczną, kluczowe dla rewolucji przemysłowej?', answer: 'Silnik parowy', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie do komunikacji bezprzewodowej na odległość za pomocą fal radiowych, wynalazek Marconiego?', answer: 'Radio', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto jest uznawany za wynalazcę radia (obok Nikoli Tesli)?', answer: 'Guglielmo Marconi', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się most, na którym jezdnia zawieszona jest na linach/kablach, np. Golden Gate?', answer: 'Most wiszący', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się najwyższa budowla świata (do 2024), znajdująca się w Dubaju?', answer: 'Burdż Chalifa', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto zaprojektował Wieżę Eiffla?', answer: 'Gustave Eiffel', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie mierzące odległość i wysokość za pomocą fal radiowych, używane m.in. w lotnictwie?', answer: 'Radar', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się pierwszy sztuczny satelita Ziemi, wystrzelony przez ZSRR w 1957?', answer: 'Sputnik 1', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się elektrownia wykorzystująca energię spadku wody do produkcji prądu?', answer: 'Elektrownia wodna', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie zamieniające energię słoneczną bezpośrednio w elektryczną?', answer: 'Panel fotowoltaiczny (ogniwo słoneczne)', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'W którym roku bracia Wright wykonali pierwszy lot samolotem?', answer: '1903', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny silnik parowy udoskonalający wcześniejsze konstrukcje?', answer: 'James Watt', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'Kto skonstruował pierwszą windę z hamulcem bezpieczeństwa, umożliwiając budowę wieżowców?', answer: 'Elisha Otis', type: 'normal', difficulty: 'm' },
    { category: 'Technika', question: 'W którym roku oddano do użytku Wieżę Eiffla?', answer: '1889', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny aparat fotograficzny (dagerotyp)?', answer: 'Louis Daguerre', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia bezprzewodowego ładowania telefonów, oparta na indukcji?', answer: 'Ładowanie indukcyjne', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się rodzaj mostu wykorzystujący łuk jako główny element nośny?', answer: 'Most łukowy', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się największa zapora wodna świata pod względem mocy, znajdująca się w Chinach?', answer: 'Zapora Trzech Przełomów', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy komputer mechaniczny (maszynę różnicową/analityczną)?', answer: 'Charles Babbage', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywała się pierwsza programistka komputerów, współpracująca z Babbage\'em?', answer: 'Ada Lovelace', type: 'normal', difficulty: 'h' },

    // --- Sport ---
    { category: 'Sport', question: 'Ile zawodników liczy drużyna piłkarska na boisku (bez rezerwowych)?', answer: '11', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Ile minut trwa standardowy mecz piłki nożnej (bez doliczonego czasu)?', answer: '90', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Co ile lat odbywają się letnie igrzyska olimpijskie?', answer: 'Co 4 lata', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'W którym mieście odbyły się letnie igrzyska olimpijskie w 2024 roku?', answer: 'Paryż', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Ile piłkarzy jest wyznaczonych jako bramkarz w drużynie na boisku?', answer: '1', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Ile zawodników liczy drużyna koszykarska na boisku?', answer: '5', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Kto jest uznawany za jednego z najlepszych piłkarzy w historii, Argentyńczyk, mistrz świata 2022?', answer: 'Leo Messi', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Kto jest portugalskim piłkarzem, wieloletnim rywalem Messiego, kapitanem reprezentacji Portugalii?', answer: 'Cristiano Ronaldo', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Z jakiego kraju pochodzi Usain Bolt?', answer: 'Jamajka', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Kto jest polskim tenisistą / polską tenisistką, byłą liderką rankingu WTA?', answer: 'Iga Świątek', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowe europejskie rozgrywki klubowe w piłce nożnej?', answer: 'Liga Mistrzów UEFA', type: 'normal', difficulty: 'e' },
    { category: 'Sport', question: 'Ile punktów jest wartych rzut wolny w koszykówce (za jeden trafiony)?', answer: '1', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile punktów wart jest rzut za linię trzech punktów w koszykówce?', answer: '3', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jaki kraj wygrał mistrzostwa świata w piłce nożnej w 2022 roku?', answer: 'Argentyna', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się polski skoczek narciarski, wielokrotny mistrz świata, zdobywca Pucharu Świata (Kamil Stoch lub Adam Małysz)?', answer: 'Kamil Stoch / Adam Małysz', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'W jakiej dyscyplinie sportowej specjalizował się Adam Małysz?', answer: 'Skoki narciarskie', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Kto jest polskim piłkarzem, kapitanem reprezentacji, strzelcem wielu goli dla Barcelony?', answer: 'Robert Lewandowski', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się zawody sportowe dla osób z niepełnosprawnościami odbywające się po igrzyskach olimpijskich?', answer: 'Igrzyska Paraolimpijskie', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się zawody lekkoatletyczne biegowe rozgrywane na dystansie 100 metrów - jak nazywa się taki bieg?', answer: 'Sprint (bieg na 100 m)', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile setów standardowo trzeba wygrać, by zwyciężyć w meczu siatkówki?', answer: '3', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile zawodników liczy drużyna siatkarska na boisku?', answer: '6', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile kwart ma mecz koszykówki NBA?', answer: '4', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy turniej tenisowy rozgrywany na trawie w Londynie?', answer: 'Wimbledon', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile Wielkich Szlemów w tenisie rozgrywanych jest w ciągu roku?', answer: '4', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ilu zawodników gra w drużynie hokeja na lodzie na lodowisku (bez bramkarza)?', answer: '5', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy wyścig kolarski, rozgrywany we Francji?', answer: 'Tour de France', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile wynosi dystans maratonu w kilometrach?', answer: '42,195 km', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'W którym mieście odbywają się coroczne, jedne z najstarszych na świecie, zawody tenisowe Wimbledon?', answer: 'Londyn', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Który klub zdobył najwięcej razy Ligę Mistrzów (do 2024)?', answer: 'Real Madryt', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Kto zdobył najwięcej Złotych Piłek (France Football) w historii (do 2023)?', answer: 'Leo Messi', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jaki kraj był gospodarzem mistrzostw świata w piłce nożnej w 2022 roku?', answer: 'Katar', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się polski siatkarski klub / reprezentacja, wielokrotny mistrz świata w siatkówce mężczyzn?', answer: 'Reprezentacja Polski', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej znany polski żużlowiec, wielokrotny mistrz świata, dominujący w latach 2010-2020?', answer: 'Bartosz Zmarzlik', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jaki kraj zdobył najwięcej medali w historii letnich igrzysk olimpijskich?', answer: 'USA', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy wyścig Formuły 1 rozgrywany w Monako?', answer: 'Grand Prix Monako', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile setów wygrywa się standardowo w meczu tenisowym mężczyzn na Wielkim Szlemie (do zwycięstwa)?', answer: '3 (z 5)', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jaki kraj wygrał najwięcej razy mistrzostwa świata w piłce nożnej mężczyzn (do 2022)?', answer: 'Brazylia', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jak nazywa się dyscyplina olimpijska łącząca pływanie, jazdę na rowerze i bieganie?', answer: 'Triathlon', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile medali złotych zdobył Usain Bolt na igrzyskach olimpijskich (łącznie w karierze)?', answer: '8', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Jaki kraj jest najbardziej utytułowany w hokeju na lodzie (najwięcej złotych medali olimpijskich)?', answer: 'Kanada / Rosja (ZSRR) - zależnie od okresu', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile rund boksuje się standardowo w zawodowej walce o mistrzostwo świata?', answer: '12', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Ile wynosi standardowa długość boiska do piłki nożnej w przybliżeniu (metry)?', answer: 'Ok. 100-110 m', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'Kto zdobył złoty medal olimpijski w skoku o tyczce, wielokrotny rekordzista świata, Szwed?', answer: 'Armand Duplantis', type: 'normal', difficulty: 'm' },
    { category: 'Sport', question: 'W którym roku Polska zdobyła mistrzostwo świata w siatkówce mężczyzn po raz pierwszy w erze nowożytnej (2014)?', answer: '2014', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile zawodników liczy drużyna w meczu żużlowym (typowo na torze jednocześnie)?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile rund liczy standardowo mecz bokserski amatorski (olimpijski)?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile zawodników jest na boisku w meczu rugby (typowa forma, rugby union)?', answer: '15', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile wynosi standardowa wysokość siatki w siatkówce mężczyzn (w metrach, w przybliżeniu)?', answer: '2,43 m', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile bramek strzelił Robert Lewandowski w jednym meczu Bundesligi w rekordowe 9 minut (2015)?', answer: '5', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile wynosi waga standardowej piłki do koszykówki dla mężczyzn (w przybliżeniu, w gramach)?', answer: 'Ok. 600-650 g', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile razy Brazylia zdobyła mistrzostwo świata w piłce nożnej (do 2022)?', answer: '5', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się serbski koszykarz, gwiazda NBA, wielokrotny MVP ligi w latach 2020., grający w Denver Nuggets?', answer: 'Nikola Jokić', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile wynosi standardowy czas jednej połowy w meczu koszykówki NBA w minutach (dwie kwarty)?', answer: '24 minuty', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile medali złotych zdobyła Polska na letnich igrzyskach olimpijskich w Tokio 2020 (rozegranych w 2021)?', answer: '4', type: 'normal', difficulty: 'h' },

    // --- Muzyka ---
    { category: 'Muzyka', question: 'Ile strun ma standardowa gitara klasyczna?', answer: '6', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Który polski kompozytor napisał liczne polonezy i mazurki, uznawany za jednego z największych kompozytorów romantyzmu?', answer: 'Fryderyk Chopin', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Jaki instrument ma klawisze i jest jednym z najbardziej uniwersalnych instrumentów muzycznych?', answer: 'Pianino (fortepian)', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Jak nazywa się brytyjski zespół rockowy z Liverpoolu, jeden z najbardziej wpływowych w historii (John, Paul, George, Ringo)?', answer: 'The Beatles', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Kto jest amerykańskim piosenkarzem, nazywanym "Królem popu", autorem "Thriller"?', answer: 'Michael Jackson', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Jak nazywa się gatunek muzyczny powstały w USA wśród afroamerykańskiej społeczności, z rytmicznym mówionym tekstem?', answer: 'Hip-hop / rap', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Jak nazywa się austriacki kompozytor cudowne dziecko, autor "Wesela Figara" i "Czarodziejskiego fletu"?', answer: 'Wolfgang Amadeusz Mozart', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Kto jest amerykańską piosenkarką, znaną z albumu "1989" i licznych rekordów Grammy, jedną z najbardziej wpływowych artystek 2020s?', answer: 'Taylor Swift', type: 'normal', difficulty: 'e' },
    { category: 'Muzyka', question: 'Jak nazywa się doroczny konkurs muzyczny w Europie, w którym kraje wysyłają swoich reprezentantów, popularny skrót ESC?', answer: 'Eurowizja', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się jamajski gatunek muzyczny spopularyzowany przez Boba Marleya?', answer: 'Reggae', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto jest wokalistą zespołu Queen, autorem "Bohemian Rhapsody"?', answer: 'Freddie Mercury', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się brytyjski zespół rockowy z hitem "Bohemian Rhapsody", 1975?', answer: 'Queen', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się instrument perkusyjny, na którym gra się pałeczkami, składający się z bębnów i talerzy?', answer: 'Perkusja (zestaw perkusyjny)', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Ile klawiszy ma standardowe pianino (fortepian)?', answer: '88', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto skomponował "IX Symfonię" z "Odą do radości"?', answer: 'Ludwig van Beethoven', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto jest amerykańską piosenkarką znaną jako "Królowa popu", z hitami "Like a Virgin"?', answer: 'Madonna', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Ile linii ma standardowa pięciolinia w zapisie nutowym?', answer: '5', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się znak muzyczny na początku pięciolinii określający wysokość dźwięków, najpopularniejszy to wiolinowy?', answer: 'Klucz (klucz wiolinowy)', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jaki instrument dęty drewniany ma charakterystyczny, cienki dźwięk i jest często solistą w orkiestrze, np. w "Piotrusiu i wilku"?', answer: 'Flet', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto skomponował "Cztery pory roku"?', answer: 'Antonio Vivaldi', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się szwedzki zespół popowy z lat 70., autor "Dancing Queen"?', answer: 'ABBA', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się festiwal muzyczny odbywający się cyklicznie w Sopocie od lat 60.?', answer: 'Sopot Festival (dawniej Festiwal Piosenki w Sopocie)', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się gatunek muzyki elektronicznej z mocnym, powtarzalnym beatem, popularny w klubach?', answer: 'Techno / EDM', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Ile strun ma skrzypce?', answer: '4', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się największy instrument smyczkowy w orkiestrze, o najniższym brzmieniu?', answer: 'Kontrabas', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto skomponował muzykę do "Gwiezdnych wojen"?', answer: 'John Williams', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto jest amerykańskim raperem, autorem albumu "The Marshall Mathers LP"?', answer: 'Eminem', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się utwór muzyczny napisany na cześć bohatera, wykonywany zwykle na stojąco, symbol państwa?', answer: 'Hymn', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się austriacki kompozytor, autor IX symfonii, który skomponował ją będąc głuchym?', answer: 'Ludwig van Beethoven', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto jest wokalistą / liderem zespołu Coldplay?', answer: 'Chris Martin', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Kto skomponował operę "Straszny dwór", uznawaną za najważniejszą polską operę narodową?', answer: 'Stanisław Moniuszko', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Jak nazywa się polski zespół disco polo / disco, popularny w latach 90. z hitem "Ona lubi jak"?', answer: 'Boys (przykładowy zespół disco polo)', type: 'normal', difficulty: 'm' },
    { category: 'Muzyka', question: 'Który polski zespół / artysta wygrał Eurowizję (jeśli żaden - podaj najlepszy wynik) - kto zajął 2. miejsce w 2014 z "My Słowianie"?', answer: 'Donatan i Cleo', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski kompozytor filmowy, autor muzyki do wielu filmów Polańskiego i Hollywood, zdobywca Oscara?', answer: 'Jan A. P. Kaczmarek', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski piosenkarz / grupa disco polo z hitem "Przez Twe Oczy Zielone"?', answer: 'Feel', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski zespół rockowy, autor hitu "Chcesz", jeden z najpopularniejszych zespołów lat 2000. w Polsce?', answer: 'Myslovitz', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował polski hymn narodowy "Mazurek Dąbrowskiego"?', answer: 'Melodia ludowa, autor tekstu: Józef Wybicki', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polska piosenkarka, zwyciężczyni Eurowizji Junior 2019, znana z hitu "Anyone I Want to Be"?', answer: 'Viki Gabor', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się gatunek muzyki ludowej góralskiej z Podhala, charakterystyczny dla Polski?', answer: 'Muzyka podhalańska (góralska)', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się utwór muzyczny grany na pogrzebach, powolny i uroczysty?', answer: 'Marsz żałobny', type: 'normal', difficulty: 'h' },

    // --- Sztuka ---
    { category: 'Sztuka', question: 'Kto namalował "Mona Lisę"?', answer: 'Leonardo da Vinci', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto namalował "Gwiaździstą noc"?', answer: 'Vincent van Gogh', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto jest hiszpańskim malarzem, współtwórcą kubizmu, autorem "Guerniki"?', answer: 'Pablo Picasso', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto namalował "Ostatnią Wieczerzę"?', answer: 'Leonardo da Vinci', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto namalował "Krzyk"?', answer: 'Edvard Munch', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Jaki holenderski malarz uciął sobie fragment ucha?', answer: 'Vincent van Gogh', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto namalował plafon Kaplicy Sykstyńskiej?', answer: 'Michał Anioł', type: 'normal', difficulty: 'e' },
    { category: 'Sztuka', question: 'Kto jest autorem rzeźby "Dawid", stojącej we Florencji?', answer: 'Michał Anioł', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się muzeum w Paryżu, w którym znajduje się "Mona Lisa"?', answer: 'Luwr', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się hiszpański malarz, twórca surrealistycznych obrazów z topniejącymi zegarami?', answer: 'Salvador Dalí', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Kto namalował "Damę z gronostajem", znajdującą się w krakowskim muzeum Czartoryskich?', answer: 'Leonardo da Vinci', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz, autor "Bitwy pod Grunwaldem" i "Bitwy pod Racławicami"?', answer: 'Jan Matejko', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się styl architektoniczny charakteryzujący się ostrymi łukami i witrażami, popularny w średniowieczu?', answer: 'Gotyk', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się styl architektoniczny charakteryzujący się kolumnami i symetrią, popularny w starożytnej Grecji i Rzymie?', answer: 'Styl klasyczny (klasycyzm/antyk)', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się francuski ruch malarski XIX wieku kładący nacisk na uchwycenie światła i chwili, np. Monet?', answer: 'Impresjonizm', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Kto jest francuskim malarzem impresjonistą, autorem cyklu "Lilie wodne"?', answer: 'Claude Monet', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się starożytna grecka świątynia na Akropolu poświęcona Atenie?', answer: 'Partenon', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się polski reżyser i scenograf, autor filmowych adaptacji "Pana Tadeusza" i "Ziemi obiecanej"?', answer: 'Andrzej Wajda', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Kto zaprojektował słynną wieżę w Paryżu zbudowaną na Wystawę Światową 1889?', answer: 'Gustave Eiffel', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jaki styl architektoniczny charakteryzuje się przepychem, zdobieniami i asymetrią, popularny w XVII-XVIII wieku?', answer: 'Barok', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się obraz Salvadora Dalego z topniejącymi zegarami?', answer: 'Trwałość pamięci', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jaki styl w sztuce charakteryzuje się ostrymi kątami i geometrycznym rozbiciem form, tworzony m.in. przez Picassa?', answer: 'Kubizm', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się jeden z najsłynniejszych polskich rzeźbiarzy, autor pomników Chopina w Warszawie?', answer: 'Wacław Szymanowski', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz impresjonistyczny, autor pejzaży z Podhala i portretów górali?', answer: 'Leon Wyczółkowski (lub Włodzimierz Tetmajer)', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się rzeźba przedstawiająca kobietę bez rąk, znaleziona na greckiej wyspie, eksponowana w Luwrze?', answer: 'Wenus z Milo', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się technika malarska polegająca na malowaniu na mokrym tynku?', answer: 'Fresk', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się austriacki malarz secesyjny, autor obrazu "Pocałunek"?', answer: 'Gustav Klimt', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Jak nazywa się nurt w sztuce XX wieku odrzucający przedstawianie rzeczywistości na rzecz form abstrakcyjnych?', answer: 'Abstrakcjonizm (sztuka abstrakcyjna)', type: 'normal', difficulty: 'm' },
    { category: 'Sztuka', question: 'Kto jest holenderskim grafikiem, znanym z niemożliwych, optycznych iluzji, np. "Schody"?', answer: 'M.C. Escher', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się rzeźba Michała Anioła przedstawiająca Marię trzymającą ciało Chrystusa?', answer: 'Pieta', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski street-artysta / artysta znany z murali, np. w Łodzi?', answer: 'Np. M-City (przykładowy artysta)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się galeria sztuki nowoczesnej w Nowym Jorku, w skrócie MoMA?', answer: 'Museum of Modern Art', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Wieżę Babel"?', answer: 'Pieter Bruegel starszy', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz i grafik, twórca secesyjnych witraży w kościele Franciszkanów w Krakowie?', answer: 'Stanisław Wyspiański', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się japoński drzeworyt przedstawiający wielką falę, autorstwa Hokusaia?', answer: 'Wielka fala w Kanagawie', type: 'normal', difficulty: 'h' },

    // --- Znane osobistości ---
    { category: 'Znane osobistości', question: 'Kto był pierwszym człowiekiem na Księżycu?', answer: 'Neil Armstrong', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest twórcą teorii względności?', answer: 'Albert Einstein', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest założycielem firmy Tesla i SpaceX?', answer: 'Elon Musk', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest byłym prezydentem RPA, symbolem walki z apartheidem, laureatem Pokojowej Nagrody Nobla?', answer: 'Nelson Mandela', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest papieżem polskiego pochodzenia, wybranym w 1978 roku?', answer: 'Jan Paweł II (Karol Wojtyła)', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjskim fizykiem teoretycznym, autorem "Krótkiej historii czasu", cierpiącym na ALS?', answer: 'Stephen Hawking', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Z jakiego kraju pochodziła Maria Skłodowska-Curie?', answer: 'Polska', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest byłym prezydentem USA, pierwszym afroamerykańskim prezydentem tego kraju?', answer: 'Barack Obama', type: 'normal', difficulty: 'e' },
    { category: 'Znane osobistości', question: 'Kto jest założycielem firmy Amazon?', answer: 'Jeff Bezos', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest indyjskim przywódcą duchowym i politycznym, symbolem biernego oporu, zamordowanym w 1948?', answer: 'Mahatma Gandhi', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim działaczem na rzecz praw obywatelskich, autorem przemówienia "I Have a Dream"?', answer: 'Martin Luther King Jr.', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjskim naukowcem, autorem teorii ewolucji poprzez dobór naturalny?', answer: 'Karol Darwin', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest byłym prezydentem Federacji Rosyjskiej / obecnym prezydentem Rosji od 2000 roku (z przerwą)?', answer: 'Władimir Putin', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest obecnym (2026) prezydentem Stanów Zjednoczonych?', answer: 'Donald Trump', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto był twórcą Apple razem ze Stevem Wozniakiem, zmarły w 2011 roku?', answer: 'Steve Jobs', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest niemieckim dyktatorem odpowiedzialnym za wybuch II wojny światowej i Holocaust?', answer: 'Adolf Hitler', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjską królową panującą najdłużej w historii Wielkiej Brytanii, zmarłą w 2022 roku?', answer: 'Elżbieta II', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest obecnym (2026) królem Wielkiej Brytanii?', answer: 'Karol III', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest twórcą Facebooka i Meta?', answer: 'Mark Zuckerberg', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest francuskim cesarzem, który podbił dużą część Europy na początku XIX wieku?', answer: 'Napoleon Bonaparte', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest polskim marszałkiem, który odegrał kluczową rolę w odzyskaniu niepodległości w 1918 roku?', answer: 'Józef Piłsudski', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest byłym prezydentem RP, elektrykiem, liderem "Solidarności", laureatem Pokojowej Nagrody Nobla?', answer: 'Lech Wałęsa', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest współzałożycielem Microsoftu, filantropem walczącym z chorobami w Afryce?', answer: 'Bill Gates', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto był prezydentem USA podczas wojny secesyjnej i zniósł niewolnictwo?', answer: 'Abraham Lincoln', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Jak nazywał się polski papież przed wyborem na Stolicę Piotrową?', answer: 'Karol Wojtyła', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto był pierwszą kobietą, która otrzymała Nagrodę Nobla, i to dwukrotnie?', answer: 'Maria Skłodowska-Curie', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Za odkrycie jakich pierwiastków Maria Skłodowska-Curie otrzymała Nagrodę Nobla z chemii?', answer: 'Polon i rad', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjskim przedsiębiorcą, założycielem Virgin Group?', answer: 'Richard Branson', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest szwedzką aktywistką klimatyczną, znaną z protestów pod parlamentem od 2018 roku?', answer: 'Greta Thunberg', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest niemieckim kompozytorem uznanym za jednego z największych w historii, głuchy w późniejszych latach życia?', answer: 'Ludwig van Beethoven', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest obecnym (2026) prezydentem Polski?', answer: 'Karol Nawrocki', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest premierem Polski od grudnia 2023 roku?', answer: 'Donald Tusk', type: 'normal', difficulty: 'm' },
    { category: 'Znane osobistości', question: 'Kto jest byłym przywódcą Kuby, prowadzącym rewolucję kubańską razem z Che Guevarą?', answer: 'Fidel Castro', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest argentyńsko-kubańskim rewolucjonistą, ikoną popkultury, obecną na wielu koszulkach?', answer: 'Che Guevara', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest włoskim dyktatorem faszystowskim sprzymierzonym z Hitlerem w czasie II wojny światowej?', answer: 'Benito Mussolini', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest byłym przywódcą ZSRR, który wprowadził politykę pierestrojki i głasnosti?', answer: 'Michaił Gorbaczow', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto zdobył literacką Nagrodę Nobla w 2018 roku, jako druga Polka w historii?', answer: 'Olga Tokarczuk', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim inwestorem, jednym z najbogatszych ludzi świata, znanym jako "Wyrocznia z Omaha"?', answer: 'Warren Buffett', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim aktorem i reżyserem, twórcą serii "Incepcja" i "Oppenheimer"?', answer: 'Christopher Nolan (reżyser, nie aktor)', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest niemiecką kanclerz rządzącą Niemcami w latach 2005-2021?', answer: 'Angela Merkel', type: 'normal', difficulty: 'h' },

    // --- Film i Seriale ---
    { category: 'Film i Seriale', question: 'Kto reżyserował trylogię "Władca Pierścieni"?', answer: 'Peter Jackson', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się główny bohater serii filmów "Władca Pierścieni", hobbit niosący pierścień?', answer: 'Frodo Baggins', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się fikcyjne miasto, w którym rozgrywa się akcja filmów o Batmanie?', answer: 'Gotham City', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Titanic" (1997) jako Jack Dawson?', answer: 'Leonardo DiCaprio', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial o rodzinie prowadzącej imperium narkotykowe, z Walterem White\'em w roli głównej?', answer: 'Breaking Bad', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial fantasy oparty na książkach George\'a R.R. Martina, emitowany przez HBO w latach 2011-2019?', answer: 'Gra o tron (Game of Thrones)', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się saga filmowa o czarodzieju z blizną w kształcie błyskawicy, oparta na książkach J.K. Rowling?', answer: 'Harry Potter', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się szkoła magii, do której uczęszcza Harry Potter?', answer: 'Hogwart', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Kto zagrał Harry\'ego Pottera w serii filmów?', answer: 'Daniel Radcliffe', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się główny antagonista serii "Harry Potter", czarnoksiężnik zwany "Sami-Wiecie-Kto"?', answer: 'Voldemort', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Kto zagrał Iron Mana (Tony\'ego Starka) w filmach Marvela?', answer: 'Robert Downey Jr.', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial animowany o żółtej rodzinie z Springfield, emitowany od 1989 roku?', answer: 'Simpsonowie', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak ma na imię ojciec rodziny Simpsonów?', answer: 'Homer', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial komediowy o szóstce przyjaciół w Nowym Jorku, emitowany w latach 1994-2004?', answer: 'Przyjaciele (Friends)', type: 'normal', difficulty: 'e' },
    { category: 'Film i Seriale', question: 'Jak nazywa się seria filmów o agencie 007 pracującym dla brytyjskiego wywiadu?', answer: 'James Bond', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial animowany dla dzieci o gąbce mieszkającej w ananasie na dnie oceanu?', answer: 'SpongeBob Kanciastoporty', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się seria filmów o dinozaurach odtworzonych z DNA na wyspie, oparta na powieści Michaela Crichtona?', answer: 'Park Jurajski (Jurassic Park)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się animowany film Disneya o lwiątku, które musi odzyskać tron po śmierci ojca?', answer: 'Król Lew', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak ma na imię główny bohater "Króla Lwa"?', answer: 'Simba', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał Neo w filmie "Matrix"?', answer: 'Keanu Reeves', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się kultowy polski serial komediowy o życiu w bloku, emitowany w latach 90. ("Świat według..." postaci Kiepskiego)?', answer: 'Świat według Kiepskich', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Forrest Gump" (1994)?', answer: 'Tom Hanks', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się seria filmów o samochodach-wyścigówkach i nielegalnych wyścigach ulicznych z Vinem Dieselem?', answer: 'Szybcy i wściekli (Fast & Furious)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się bohaterka disneyowskiej "Krainy Lodu", potrafiąca tworzyć lód i śnieg?', answer: 'Elsa', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał Geralta z Rivii w serialu Netflixa "Wiedźmin" (sezony 1-3)?', answer: 'Henry Cavill', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się superbohater Marvela, naukowiec zamieniający się w zielonego olbrzyma pod wpływem gniewu?', answer: 'Hulk', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał Jokera w filmie "Mroczny Rycerz" (2008), za co pośmiertnie otrzymał Oscara?', answer: 'Heath Ledger', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował film "Titanic" z 1997 roku?', answer: 'James Cameron', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto grał Waltera White\'a w serialu "Breaking Bad"?', answer: 'Bryan Cranston', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się stolica Siedmiu Królestw w serialu "Gra o tron"?', answer: 'King\'s Landing (Królewska Przystań)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał Tyriona Lannistera w "Grze o tron"?', answer: 'Peter Dinklage', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się uniwersum filmowe łączące filmy o superbohaterach Marvela, w skrócie MCU?', answer: 'Marvel Cinematic Universe', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się fikcyjny metal, z którego zrobiona jest tarcza Kapitana Ameryki?', answer: 'Wibranium', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się kawiarnia, w której często przesiaduje ekipa z serialu "Przyjaciele"?', answer: 'Central Perk', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował film "Incepcja" (2010) z Leonardo DiCaprio?', answer: 'Christopher Nolan', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto grał Jamesa Bonda w filmach z lat 2006-2021 ("Casino Royale", "Skyfall")?', answer: 'Daniel Craig', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się fikcyjna planeta, na której toczy się większość akcji sagi "Diuna"?', answer: 'Arrakis (Diuna)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował filmową adaptację "Diuny" z 2021 i 2024 roku?', answer: 'Denis Villeneuve', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial o smokach i intrygach politycznych będący prequelem "Gry o tron", opowiadający o rodzie Targaryenów?', answer: 'Ród smoka (House of the Dragon)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się kultowy amerykański serial sci-fi o grupie ocalałych po katastrofie samolotu na tajemniczej wyspie?', answer: 'Lost, Zagubieni', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polska animacja o krecie, klasyczna dla dzieci z Czechosłowacji (produkcja czeska, popularna w Polsce)?', answer: 'Krecik (Krtek)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował film "Pulp Fiction" z 1994 roku?', answer: 'Quentin Tarantino', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się bohater filmów akcji granych przez Bruce\'a Willisa, policjant walczący z terrorystami w wieżowcu?', answer: 'John McClane ("Szklana pułapka")', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował pierwszy film "Park Jurajski" z 1993 roku?', answer: 'Steven Spielberg', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się tabletka, którą Neo wybiera, by poznać prawdę o Matrixie?', answer: 'Czerwona pigułka', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial animowany South Park - z jakiego kraju pochodzą jego twórcy?', answer: 'USA', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się firma producencka odpowiedzialna za wiele hitów Disneya i Pixara, twórca "Toy Story"?', answer: 'Pixar', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Joker" (2019), za co otrzymał Oscara?', answer: 'Joaquin Phoenix', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial komediowy o pracownikach biura sprzedaży papieru w Scranton, amerykański remake brytyjskiego oryginału?', answer: 'The Office', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski serial kryminalny o prawniczce Joannie Chyłce, oparty na książkach Remigiusza Mroza?', answer: 'Chyłka (Wielki Splot)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował film "Oppenheimer" (2023), za który otrzymał Oscara dla najlepszego reżysera?', answer: 'Christopher Nolan', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial animowany o przygodach psotnej dwójki rodzeństwa Ricka i Morty\'ego, podróżujących między wymiarami?', answer: 'Rick i Morty', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się słynna scena z filmu "Titanic", w której bohaterowie stoją na dziobie statku z rozłożonymi rękami?', answer: 'Scena "latania" (I\'m flying)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Który polski film był nominowany do Oscara w kategorii najlepszy film nieanglojęzyczny w 2020 roku (o dwójce kochanków w PRL)?', answer: 'Zimna wojna', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Kto reżyserował "Zimną wojnę" (2018)?', answer: 'Paweł Pawlikowski', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial dokumentalny/reality o rodzinie Kardashian-Jenner, emitowany od 2007 roku?', answer: 'Keeping Up with the Kardashians', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się seria filmów grozy o lalce Chucky, opętanej duszą seryjnego mordercy?', answer: 'Dziecko Chucky (Child\'s Play)', type: 'normal', difficulty: 'm' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski serial kryminalny/sensacyjny o policjancie granym przez Bogusława Lindę, kultowy z lat 90.?', answer: 'Kroll (lub Psy - filmy Pasikowskiego)', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się najdłużej emitowany polski serial obyczajowy, którego akcja toczy się w Grabinie?', answer: 'Klan', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował kultową polską komedię kryminalną "Kiler" (1997)?', answer: 'Juliusz Machulski', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował kultową polską komedię "Sami swoi"?', answer: 'Sylwester Chęciński', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywają się dwie zwaśnione rodziny w filmie "Sami swoi"?', answer: 'Pawlakowie i Kargulowie', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski serial Netflixa o powodzi we Wrocławiu z 1997 roku, wydany w 2022?', answer: 'Wielka Woda', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial o rodzinie mafijnej z New Jersey, uznawany za jeden z najlepszych seriali w historii?', answer: 'Rodzina Soprano (The Sopranos)', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski serial dokumentalny Netflixa "Zjednoczeni w zbrodni" o serii zabójstw kobiet w Polsce?', answer: 'Zjednoczeni w zbrodni', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się kultowy serial sci-fi o doktorze podróżującym w czasie budką telefoniczną TARDIS, produkcji BBC?', answer: 'Doktor Who', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się władczyni Cintry, babka Ciri, w sadze i serialu "Wiedźmin"?', answer: 'Calanthe (Kalanté)', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski aktor, który zagrał główną rolę w filmie "Boże Ciało" (2019), nominowanym do Oscara?', answer: 'Bartosz Bielenia', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Który polski film Pawła Pawlikowskiego otrzymał Oscara dla najlepszego filmu nieanglojęzycznego w 2015 roku?', answer: 'Ida', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się fikcyjny bar w serialu "Świat według Kiepskich", w którym bywa Ferdynand Kiepski?', answer: 'Bar "Pod Żyrafą"', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski serial kryminalny z Bogusławem Lindą jako komisarzem Frankiem Kaminskim, kultowy z lat 90.?', answer: 'Kroll / Psy', type: 'normal', difficulty: 'h' },

    // --- Zwierzęta i przyroda ---
    { category: 'Zwierzęta i przyroda', question: 'Jakie jest największe zwierzę lądowe na świecie?', answer: 'Słoń afrykański', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jakie jest najszybsze zwierzę lądowe na świecie?', answer: 'Gepard', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jakie jest największe zwierzę na świecie (w ogóle, licząc morskie)?', answer: 'Płetwal błękitny', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się król zwierząt, drapieżnik żyjący w Afryce, znany z grzywy?', answer: 'Lew', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest najwyższy żyjący ssak na świecie?', answer: 'Żyrafa', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zwierzę o czarno-białych paskach, przypominające konia, żyjące w Afryce?', answer: 'Zebra', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki ptak jest symbolem Polski, widnieje w godle?', answer: 'Orzeł biały', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest największy ptak lądowy na świecie, nielotny?', answer: 'Struś', type: 'normal', difficulty: 'e' },
    { category: 'Zwierzęta i przyroda', question: 'Ile ramion ma typowa rozgwiazda?', answer: '5', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jakie zwierzę jest najbliższym krewnym człowieka wśród naczelnych?', answer: 'Szympans', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zwierzę marsupialne z Australii, noszące młode w torbie na brzuchu?', answer: 'Kangur', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się największy drapieżnik lądowy Arktyki?', answer: 'Niedźwiedź polarny', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia jest symbolem Chin, zagrożony wyginięciem, żywi się głównie bambusem?', answer: 'Panda wielka', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest największy kot na świecie (dziki, drapieżny)?', answer: 'Tygrys', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zwierzę domowe uznawane za najlepszego przyjaciela człowieka?', answer: 'Pies', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest najpopularniejszy zwierzę domowe na świecie obok psa, znane z mruczenia?', answer: 'Kot', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się polski symbol narodowy, duży ssak kopytny żyjący w Puszczy Białowieskiej?', answer: 'Żubr', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zwierzę morskie, największy drapieżnik oceanów, znany z filmu "Szczęki"?', answer: 'Rekin biały', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się proces, w którym niektóre zwierzęta zapadają w sen zimowy?', answer: 'Hibernacja', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zwierzę morskie o ośmiu mackach i zdolności do zmiany koloru?', answer: 'Ośmiornica', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Ile lat może żyć przeciętnie słoń afrykański w naturze?', answer: '60-70 lat', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki ptak potrafi latać do tyłu jako jedyny?', answer: 'Koliber', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się największa ryba na świecie?', answer: 'Rekin wielorybi', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się największy naczelny na świecie, żyjący w Afryce Środkowej?', answer: 'Goryl', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się jedyny ssak składający jaja, żyjący w Australii?', answer: 'Dziobak', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Ile nóg ma krab?', answer: '10', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się polska rasa psa pasterskiego, biała, duża, pochodząca z Tatr?', answer: 'Owczarek podhalański', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się gatunek niedźwiedzia żyjący w Polsce, głównie w Bieszczadach i Tatrach?', answer: 'Niedźwiedź brunatny', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest największy drapieżnik żyjący w Polsce (ssak)?', answer: 'Niedźwiedź brunatny (lub wilk)', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest największy ssak lądowy Europy?', answer: 'Żubr', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Który ssak hibernuje w Polsce, mały, latający, owadożerny?', answer: 'Nietoperz', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się największy istniejący gad, żyjący w wodach słonawych Azji i Australii?', answer: 'Krokodyl różańcowy', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest najjadowitszy pająk / wąż - jaki wąż jest uznawany za najbardziej jadowitego na świecie (LD50)?', answer: 'Taipan pustynny (wąż wewnątrzlądowy)', type: 'normal', difficulty: 'm' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się proces zmiany koloru futra zwierzęcia zależnie od pory roku, np. u zająca bielaka?', answer: 'Linienie (zmiana ubarwienia sezonowego)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się najmniejszy ptak na świecie?', answer: 'Koliber pszczeli', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile serc ma dżdżownica?', answer: '5 par (10 "serc")', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile zębów ma dorosły pies (przeciętnie)?', answer: '42', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko masowej migracji zwierząt, np. gnu, w Afryce Wschodniej?', answer: 'Wielka migracja', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile lat może żyć papuga ara w niewoli (przeciętnie)?', answer: '50-60 lat', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki jest najbardziej jadowity płaz na świecie, mała żaba z Ameryki Południowej?', answer: 'Drzewołaz ulotny (żaba strzałowa)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się największy wąż świata pod względem długości?', answer: 'Pyton siatkowany (lub anakonda pod względem masy)', type: 'normal', difficulty: 'h' },

    // --- Astronomia ---
    { category: 'Astronomia', question: 'Ile planet znajduje się w Układzie Słonecznym (po 2006 roku)?', answer: '8', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Jaka jest najbliższa Słońcu planeta?', answer: 'Merkury', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Jaka jest największa planeta w Układzie Słonecznym?', answer: 'Jowisz', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Która planeta nazywana jest "Czerwoną Planetą"?', answer: 'Mars', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Ile księżyców ma Ziemia?', answer: '1', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Jaka jest nazwa galaktyki, w której znajduje się Układ Słoneczny?', answer: 'Droga Mleczna', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Jak nazywa się gwiazda znajdująca się w centrum Układu Słonecznego?', answer: 'Słońce', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Która planeta znana jest ze spektakularnych pierścieni złożonych z lodu i skał?', answer: 'Saturn', type: 'normal', difficulty: 'e' },
    { category: 'Astronomia', question: 'Ile lat trwa jeden obieg Ziemi wokół Słońca?', answer: '1 rok (365 dni)', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Kto jako pierwszy człowiek postawił stopę na Księżycu, w misji Apollo 11?', answer: 'Neil Armstrong', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'W którym roku miało miejsce pierwsze lądowanie człowieka na Księżycu?', answer: '1969', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się agencja kosmiczna Stanów Zjednoczonych?', answer: 'NASA', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się prywatna firma kosmiczna założona przez Elona Muska?', answer: 'SpaceX', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się obiekt kosmiczny o tak silnej grawitacji, że nic, nawet światło, nie może z niego uciec?', answer: 'Czarna dziura', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Który polski astronom sformułował heliocentryczną teorię budowy Układu Słonecznego?', answer: 'Mikołaj Kopernik', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jaka jest najmniejsza planeta w Układzie Słonecznym?', answer: 'Merkury', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko przechodzenia Ziemi między Słońcem a Księżycem, gdy Ziemia zasłania Słońce Księżycowi?', answer: 'Zaćmienie Księżyca', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko, gdy Księżyc zasłania Słońce, widziane z Ziemi?', answer: 'Zaćmienie Słońca', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko eksplozji gwiazdy pod koniec jej życia?', answer: 'Supernowa', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się teoria opisująca powstanie wszechświata z pojedynczego punktu, ok. 13,8 mld lat temu?', answer: 'Teoria Wielkiego Wybuchu', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się skała kosmiczna wpadająca w atmosferę Ziemi i widoczna jako "spadająca gwiazda"?', answer: 'Meteor', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się fragment skały kosmicznej, który spadł na powierzchnię Ziemi?', answer: 'Meteoryt', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się planeta karłowata, która do 2006 roku była uznawana za dziewiątą planetę Układu Słonecznego?', answer: 'Pluton', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się teleskop kosmiczny wystrzelony przez NASA w 1990 roku, powszechnie znany z pięknych zdjęć kosmosu?', answer: 'Teleskop Hubble\'a', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się najnowszy teleskop kosmiczny NASA, wystrzelony w 2021 roku, następca Hubble\'a?', answer: 'Teleskop Jamesa Webba', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko świecenia nieba w pobliżu biegunów, spowodowane wiatrem słonecznym?', answer: 'Zorza polarna', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się gwiazdozbiór przypominający kształtem duży czerpak, pomocny w znalezieniu Gwiazdy Polarnej?', answer: 'Wielka Niedźwiedzica (Wielki Wóz)', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko sezonowej zmiany długości dnia i nocy z powodu nachylenia osi Ziemi?', answer: 'Pory roku', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się pierwszy sztuczny satelita wystrzelony w kosmos, przez ZSRR w 1957 roku?', answer: 'Sputnik 1', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się stacja kosmiczna, na której od 2000 roku nieprzerwanie przebywają astronauci, wspólny projekt kilku krajów?', answer: 'Międzynarodowa Stacja Kosmiczna (ISS)', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko, w którym planeta krąży wokół własnej osi, powodując dzień i noc?', answer: 'Rotacja (obrót własny)', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Jak nazywa się najjaśniejsza gwiazda na nocnym niebie (widziana z Ziemi)?', answer: 'Syriusz', type: 'normal', difficulty: 'm' },
    { category: 'Astronomia', question: 'Ile planet w Układzie Słonecznym jest planetami skalistymi (Merkury, Wenus, Ziemia, Mars)?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się pas skalistych obiektów znajdujący się między orbitami Marsa i Jowisza?', answer: 'Pas planetoid (asteroid)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Która planeta Układu Słonecznego jest najgorętsza, mimo że nie jest najbliżej Słońca?', answer: 'Wenus', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile czasu potrzebuje światło słoneczne, by dotrzeć do Ziemi (w przybliżeniu)?', answer: 'Ok. 8 minut', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile wynosi w przybliżeniu odległość Ziemi od Słońca w milionach kilometrów?', answer: 'Ok. 150 mln km', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile planet Układu Słonecznego można zobaczyć gołym okiem z Ziemi (bez teleskopu)?', answer: '5 (Merkury, Wenus, Mars, Jowisz, Saturn)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się pierwsza kobieta w kosmosie, radziecka kosmonautka?', answer: 'Walentina Tierieszkowa', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile wynosi w przybliżeniu wiek Wszechświata?', answer: 'Ok. 13,8 miliarda lat', type: 'normal', difficulty: 'h' },
    // --- Dodatkowe pytania trudne (różne kategorie) ---
    // --- Chemia (trudne) ---
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny wolframu?', answer: 'W', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny rtęci?', answer: 'Hg', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki jest symbol chemiczny antymonu?', answer: 'Sb', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma liczbę atomową 1?', answer: 'Wodór', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki pierwiastek ma liczbę atomową 79?', answer: 'Złoto', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się proces utraty elektronów przez atom lub jon?', answer: 'Utlenianie', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się proces przyłączania elektronów przez atom lub jon?', answer: 'Redukcja', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się teoria opisująca wiązania chemiczne jako uwspólnienie par elektronowych?', answer: 'Teoria wiązań kowalencyjnych (Lewisa)', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się grupa pierwiastków w układzie okresowym o podobnych właściwościach chemicznych, w tej samej kolumnie?', answer: 'Grupa', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Ile grup głównych wyróżnia się w klasycznym układzie okresowym (numeracja 1-18)?', answer: '18', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się reakcja chemiczna, w której jeden związek rozkłada się na dwa lub więcej prostszych?', answer: 'Reakcja rozkładu (analizy)', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się zjawisko, w którym te same atomy tworzą różne struktury krystaliczne (np. grafit i diament z węgla)?', answer: 'Alotropia', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się kwas znajdujący się w akumulatorach samochodowych?', answer: 'Kwas siarkowy', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się jednostka używana do wyrażania ilości substancji w chemii?', answer: 'Mol', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Ile elektronów walencyjnych ma atom węgla?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się proces łączenia się monomerów w długie łańcuchy polimerowe?', answer: 'Polimeryzacja', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się teoria opisująca kwasy jako donory protonów, a zasady jako akceptory protonów?', answer: 'Teoria Broensteda-Lowry\'ego', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się związek chemiczny powstały z połączenia metalu z niemetalem w reakcji jonowej?', answer: 'Sól (lub tlenek, zależnie od kontekstu)', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jaki pierwiastek chemiczny ma najwyższą temperaturę topnienia spośród metali?', answer: 'Wolfram', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się zjawisko fizykochemiczne polegające na przenikaniu cząsteczek rozpuszczalnika przez błonę półprzepuszczalną?', answer: 'Osmoza', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się związek organiczny zbudowany wyłącznie z węgla i wodoru?', answer: 'Węglowodór', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się reakcja między kwasem a zasadą, w wyniku której powstaje sól i woda?', answer: 'Reakcja zobojętniania', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się liczba określająca ilość protonów w jądrze atomowym?', answer: 'Liczba atomowa', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się liczba określająca sumę protonów i neutronów w jądrze atomowym?', answer: 'Liczba masowa', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się odmiana atomowa pierwiastka o tej samej liczbie protonów, ale różnej liczbie neutronów?', answer: 'Izotop', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się związek chemiczny powstały z połączenia tlenu z metalem?', answer: 'Tlenek metalu', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się proces, w którym substancja stała przechodzi bezpośrednio w gaz z pominięciem stanu ciekłego?', answer: 'Sublimacja', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się gaz szlachetny o liczbie atomowej 18, stosowany w oświetleniu?', answer: 'Argon', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się związek chemiczny o wzorze NaOH?', answer: 'Wodorotlenek sodu (soda kaustyczna)', type: 'normal', difficulty: 'h' },
    { category: 'Chemia', question: 'Jak nazywa się dział chemii zajmujący się związkami zawierającymi węgiel?', answer: 'Chemia organiczna', type: 'normal', difficulty: 'h' },
    // --- Fizyka (trudne) ---
    { category: 'Fizyka', question: 'Jak nazywa się jednostka indukcyjności elektrycznej?', answer: 'Henr (H)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka pojemności elektrycznej?', answer: 'Farad (F)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zasada zachowania mówiąca, że energia nie może być tworzona ani niszczona, jedynie przekształcana?', answer: 'Zasada zachowania energii', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Ile wynosi stała grawitacji (w przybliżeniu, rząd wielkości), oznaczana literą G?', answer: 'Ok. 6,674 × 10^-11 N·m²/kg²', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko, w którym cząstka wykazuje jednocześnie właściwości fali i cząstki?', answer: 'Dualizm korpuskularno-falowy', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Kto sformułował zasadę nieoznaczoności w mechanice kwantowej?', answer: 'Werner Heisenberg', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka elementarna przenosząca oddziaływanie elektromagnetyczne?', answer: 'Foton', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Ile wynosi prędkość ucieczki (druga prędkość kosmiczna) z powierzchni Ziemi w przybliżeniu?', answer: 'Ok. 11,2 km/s', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko polaryzacji światła?', answer: 'Polaryzacja', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się prawo opisujące zależność między ciśnieniem, objętością i temperaturą gazu doskonałego?', answer: 'Równanie Clapeyrona (równanie stanu gazu doskonałego)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko przepływu prądu elektrycznego bez oporu w niskich temperaturach?', answer: 'Nadprzewodnictwo', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka aktywności promieniotwórczej w układzie SI?', answer: 'Bekerel (Bq)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Kto odkrył zjawisko promieniotwórczości?', answer: 'Henri Becquerel', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka α (alfa) pod względem budowy?', answer: 'Jądro helu (2 protony i 2 neutrony)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się prawo opisujące siłę oddziaływania między dwoma ładunkami elektrycznymi?', answer: 'Prawo Coulomba', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko emisji elektronów z powierzchni metalu pod wpływem światła?', answer: 'Zjawisko fotoelektryczne', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Kto wyjaśnił zjawisko fotoelektryczne, za co otrzymał Nagrodę Nobla?', answer: 'Albert Einstein', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka używana do pomiaru dawki promieniowania pochłoniętej przez organizm?', answer: 'Grej (Gy) lub siwert (Sv)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zasada mówiąca, że każde działanie wywołuje równe i przeciwnie skierowane przeciwdziałanie?', answer: 'Trzecia zasada dynamiki Newtona', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie wykorzystujące zjawisko rezonansu magnetycznego do obrazowania wnętrza ciała?', answer: 'Rezonans magnetyczny (MRI)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka pędu w układzie SI (wyrażona w podstawowych jednostkach)?', answer: 'Kilogram razy metr na sekundę (kg·m/s)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko rozpraszania światła na cząsteczkach powietrza, odpowiedzialne za niebieski kolor nieba?', answer: 'Rozpraszanie Rayleigha', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się teoria opisująca oddziaływania między cząstkami elementarnymi, obejmująca wszystkie znane siły poza grawitacją?', answer: 'Model Standardowy', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się cząstka odpowiedzialna za nadawanie masy innym cząstkom, odkryta w 2012 roku w CERN?', answer: 'Bozon Higgsa', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie przyspieszające cząstki do bardzo dużych prędkości w celu badania ich zderzeń, znajdujące się w CERN?', answer: 'Wielki Zderzacz Hadronów (LHC)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko przesunięcia widma światła w stronę czerwieni z powodu oddalania się źródła (np. galaktyk)?', answer: 'Przesunięcie ku czerwieni (redshift)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka używana do pomiaru natężenia oświetlenia?', answer: 'Luks (lx)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się prawo opisujące zależność między indukcją elektromagnetyczną a zmianą strumienia magnetycznego?', answer: 'Prawo indukcji Faradaya', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się teoria grawitacji sformułowana przez Einsteina, opisująca grawitację jako zakrzywienie czasoprzestrzeni?', answer: 'Ogólna teoria względności', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko, w którym fala dźwiękowa przekracza prędkość dźwięku, tworząc głośny efekt akustyczny?', answer: 'Bum dźwiękowy (fala uderzeniowa)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko fizyczne polegające na oderwaniu się elektronu od atomu pod wpływem promieniowania jonizującego?', answer: 'Jonizacja', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się jednostka używana do pomiaru jasności gwiazd?', answer: 'Magnitudo (wielkość gwiazdowa)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zasada mówiąca, że ciało pozostaje w spoczynku lub porusza się ruchem jednostajnym, dopóki nie podziała na nie siła?', answer: 'Pierwsza zasada dynamiki Newtona (zasada bezwładności)', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się zjawisko rozprzestrzeniania się fali dźwiękowej szybciej w wodzie niż w powietrzu - jak nazywa się prędkość dźwięku w wodzie w przybliżeniu (m/s)?', answer: 'Ok. 1480 m/s', type: 'normal', difficulty: 'h' },
    { category: 'Fizyka', question: 'Jak nazywa się urządzenie mierzące natężenie pola magnetycznego?', answer: 'Magnetometr', type: 'normal', difficulty: 'h' },
    // --- Wiedza ogólna (trudne) ---
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba Avogadra w zaokrągleniu do trzech cyfr znaczących?', answer: '6,02 × 10^23', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko, w którym ciecz przechodzi bezpośrednio w gaz z powierzchni, poniżej temperatury wrzenia?', answer: 'Parowanie (odparowanie powierzchniowe)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba dni w roku żydowskim (przybliżenie, rok zwykły)?', answer: '354', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka odległości astronomicznej równa odległości Ziemi od Słońca?', answer: 'Jednostka astronomiczna (AU)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jaki kraj jako pierwszy wprowadził powszechne prawo wyborcze dla kobiet (1893)?', answer: 'Nowa Zelandia', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba Eulera (e) w zaokrągleniu do trzech miejsc po przecinku?', answer: '2,718', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najstarszy uniwersytet na świecie działający nieprzerwanie, założony w Maroku w 859 roku?', answer: 'Uniwersytet Al-Karaouine w Fezie', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi w przybliżeniu głębokość Rowu Mariańskiego, najgłębszego miejsca na Ziemi?', answer: 'Ok. 11 000 m', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko optyczne polegające na powstawaniu wielobarwnego kręgu wokół Słońca lub Księżyca z powodu kryształków lodu?', answer: 'Halo', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi standardowa liczba klatek na sekundę w filmie kinowym (tradycyjny standard)?', answer: '24', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najdłuższy most na świecie, znajdujący się w Chinach (kolejowy, Danyang–Kunshan)?', answer: 'Wiadukt Danyang-Kunshan', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba stron szachownicy (kolorów pól)?', answer: '2', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zasada ekonomiczna mówiąca, że 80% skutków wynika z 20% przyczyn?', answer: 'Zasada Pareto', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba faz Księżyca wyróżnianych klasycznie w jednym cyklu?', answer: '8', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najmniejsze państwo świata pod względem liczby ludności (poza Watykanem)?', answer: 'Nauru (lub Watykan, jeśli liczony)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi temperatura zera absolutnego w stopniach Celsjusza?', answer: '-273,15°C', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko psychologiczne polegające na przekonaniu, że posiadana wiedza była oczywista od początku, po poznaniu wyniku?', answer: 'Efekt wiedzy po fakcie (hindsight bias)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba kręgów w kręgosłupie dorosłego człowieka?', answer: '33-34', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najbardziej rozpowszechniony język programowania webowy uruchamiany w przeglądarce?', answer: 'JavaScript', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi w przybliżeniu masa Ziemi w kilogramach (rząd wielkości)?', answer: 'Ok. 5,97 × 10^24 kg', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się efekt ekonomiczny, w którym wzrost dochodu prowadzi do zmniejszenia popytu na dane dobro (dobro niższego rzędu)?', answer: 'Efekt Giffena (lub dobro niższego rzędu)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba przykazań w Dekalogu?', answer: '10', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najstarsza zachowana konstytucja świata wciąż obowiązująca (od 1600 roku, San Marino)?', answer: 'Konstytucja San Marino (Leges Statutae)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi standardowa liczba klawiszy oktawy na fortepianie?', answer: '12', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko powolnego przesuwania się kontynentów po powierzchni Ziemi?', answer: 'Dryf kontynentalny (tektonika płyt)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Kto sformułował teorię dryfu kontynentów w 1912 roku?', answer: 'Alfred Wegener', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba warstw skóry człowieka?', answer: '3 (naskórek, skóra właściwa, tkanka podskórna)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najwyższy wodospad świata, znajdujący się w Wenezueli?', answer: 'Salto Ángel (Angel Falls)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi w przybliżeniu prędkość obrotowa Ziemi na równiku (km/h)?', answer: 'Ok. 1670 km/h', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się efekt, w którym większa grupa ludzi jest mniej skłonna pomóc ofierze, bo każdy liczy na innych?', answer: 'Efekt widza (bystander effect)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba Pi w zaokrągleniu do 5 miejsc po przecinku?', answer: '3,14159', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największe na świecie słone jezioro bezodpływowe, dzielone przez kilka krajów Azji?', answer: 'Morze Kaspijskie', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba lat świetlnych do najbliższej gwiazdy poza Słońcem (Proxima Centauri)?', answer: 'Ok. 4,2 roku świetlnego', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najgłębsze jezioro świata, znajdujące się w Rosji?', answer: 'Bajkał', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba stopni w kącie pełnym?', answer: '360', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się polska rzeka o najdłuższym biegu poza Wisłą, druga co do długości?', answer: 'Odra', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba klatek DNA (nukleotydów) kodujących jeden aminokwas (kodon)?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko ekonomiczne masowego, gwałtownego wzrostu cen?', answer: 'Hiperinflacja', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba dni potrzebnych Księżycowi na pełny obrót wokół Ziemi (miesiąc syderyczny)?', answer: 'Ok. 27,3 dnia', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najstarsza zachowana drukowana książka na świecie, chińska sutra buddyjska z 868 roku?', answer: 'Sutra Diamentowa', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba warstw atmosfery Ziemi wyróżnianych klasycznie?', answer: '5 (troposfera, stratosfera, mezosfera, termosfera, egzosfera)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko fizyczne polegające na przenoszeniu ciepła przez promieniowanie elektromagnetyczne?', answer: 'Promieniowanie cieplne (radiacja)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba klatek szachowych, w których może znaleźć się skoczek szachowy, licząc ze środkowego pola?', answer: '8', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się największa pustynia lodowa na świecie?', answer: 'Antarktyda', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi w przybliżeniu wiek najstarszego znanego drzewa na świecie (sosna szczecinkowa)?', answer: 'Ponad 4800 lat', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się efekt fizyczny polegający na zmianie częstotliwości fali w zależności od ruchu źródła względem obserwatora?', answer: 'Efekt Dopplera', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba kontynentów uznawanych w modelu siedmiokontynentalnym najmniejszym pod względem powierzchni?', answer: 'Australia (jako kontynent)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się teoria matematyczna badająca zbiory nieskończone, stworzona przez Georga Cantora?', answer: 'Teoria mnogości', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi standardowe ciśnienie atmosferyczne na poziomie morza w hektopaskalach?', answer: '1013 hPa', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najstarsza zachowana mapa świata, babilońska tabliczka gliniana?', answer: 'Imago Mundi (babilońska mapa świata)', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się zjawisko, w którym ciało zanurzone w cieczy doznaje siły wyporu równej ciężarowi wypartej cieczy?', answer: 'Prawo Archimedesa', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba dni tygodnia w kalendarzu żydowskim i chrześcijańskim (te same 7)?', answer: '7', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się najstarsza zachowana olimpijska dyscyplina, rozgrywana od czasów antycznych?', answer: 'Bieg (stadion) / zapasy - klasycznie bieg na jeden stadion', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Ile wynosi liczba klawiszy białych na standardowym pianinie 88-klawiszowym?', answer: '52', type: 'normal', difficulty: 'h' },
    { category: 'Wiedza ogólna', question: 'Jak nazywa się jednostka używana do pomiaru twardości minerałów, w skali od 1 do 10?', answer: 'Skala Mohsa', type: 'normal', difficulty: 'h' },
    // --- Historia (trudne) ---
    { category: 'Historia', question: 'W którym roku podpisano traktat westfalski kończący wojnę trzydziestoletnią?', answer: '1648', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był ostatnim carem Rosji, obalonym w 1917 roku?', answer: 'Mikołaj II', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce bitwa pod Termopilami, w której 300 Spartan broniło przełęczy?', answer: '480 p.n.e.', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się traktat kończący I wojnę światową, podpisany w 1919 roku?', answer: 'Traktat wersalski', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbył się Kongres Wiedeński ustalający nowy porządek w Europie po epoce napoleońskiej?', answer: '1815', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był faraonem, za którego panowania miał miejsce Exodus (wg tradycji biblijnej, hipotetycznie)?', answer: 'Ramzes II (hipoteza najpopularniejsza)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się dynastia panująca w Chinach do 1912 roku, ostatnia cesarska dynastia?', answer: 'Dynastia Qing', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce unia w Krewie łącząca Polskę i Litwę?', answer: '1385', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był królem Polski w czasie potopu szwedzkiego?', answer: 'Jan II Kazimierz', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyła się konferencja jałtańska ustalająca powojenny podział Europy?', answer: '1945', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się plan odbudowy gospodarczej Europy po II wojnie światowej, sfinansowany przez USA?', answer: 'Plan Marshalla', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku wybuchło powstanie w getcie warszawskim?', answer: '1943', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był ostatnim królem elekcyjnym Polski przed rozbiorami?', answer: 'Stanisław August Poniatowski', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku uchwalono Konstytucję 3 maja?', answer: '1791', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się bitwa morska w 480 p.n.e., w której Grecy pokonali Persów?', answer: 'Bitwa pod Salaminą', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miał miejsce najazd Mongołów na Polskę (bitwa pod Legnicą)?', answer: '1241', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był papieżem w czasie wielkiej schizmy zachodniej (kiedy było kilku papieży jednocześnie)?', answer: 'Kilku (m.in. Urban VI, Klemens VII) - okres 1378-1417', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku upadło Cesarstwo Bizantyjskie (zdobycie Konstantynopola)?', answer: '1453', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się sułtan turecki, który zdobył Konstantynopol w 1453 roku?', answer: 'Mehmed II Zdobywca', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce bitwa pod Wiedniem, gdzie Jan III Sobieski pokonał Turków?', answer: '1683', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był twórcą Kodeksu Napoleona, francuskiego systemu prawa cywilnego?', answer: 'Napoleon Bonaparte (komisja prawników pod jego nadzorem)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyła się rewolucja bolszewicka w Rosji?', answer: '1917', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się traktat między Hitlerem a Stalinem z 1939 roku, dzielący Europę Środkową na strefy wpływów?', answer: 'Pakt Ribbentrop-Mołotow', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku ogłoszono niepodległość Stanów Zjednoczonych?', answer: '1776', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był pierwszym cesarzem zjednoczonych Niemiec w 1871 roku?', answer: 'Wilhelm I', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce Wiosna Ludów, fala rewolucji w Europie?', answer: '1848', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się epoka w historii Japonii charakteryzująca się izolacją od świata, trwająca do połowy XIX wieku?', answer: 'Okres Edo (sakoku - polityka izolacji)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku Japonia zaatakowała amerykańską bazę Pearl Harbor?', answer: '1941', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był przywódcą Chin podczas rewolucji kulturalnej w latach 60. i 70. XX wieku?', answer: 'Mao Zedong', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku zakończyła się wojna w Wietnamie (upadek Sajgonu)?', answer: '1975', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się polska organizacja podziemna, największa armia podziemna okupowanej Europy w czasie II wojny światowej?', answer: 'Armia Krajowa', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyła się bitwa pod Kircholmem, wielkie zwycięstwo polskiej husarii nad Szwedami?', answer: '1605', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto dowodził husarią w bitwie pod Kircholmem?', answer: 'Jan Karol Chodkiewicz', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miał miejsce Wielki Głód w Irlandii?', answer: '1845-1852 (szczyt 1847)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się starożytna droga handlowa łącząca Chiny z Europą przez Azję Środkową?', answer: 'Jedwabny Szlak', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyła się bitwa pod Hastings, w której Wilhelm Zdobywca podbił Anglię?', answer: '1066', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był królem Anglii pokonanym w bitwie pod Hastings?', answer: 'Harold II', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce Wielka Wojna Północna, w której Polska brała udział?', answer: '1700-1721', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się traktat kończący wojnę siedmioletnią w 1763 roku?', answer: 'Traktat paryski (1763)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyło się powstanie Kościuszkowskie?', answer: '1794', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto dowodził powstaniem kościuszkowskim?', answer: 'Tadeusz Kościuszko', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku Polska odzyskała Gdańsk i dostęp do morza po I wojnie światowej (traktat wersalski)?', answer: '1919-1920 (na mocy traktatu z 1919)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się dokument z 1215 roku ograniczający władzę króla Anglii, fundament prawa konstytucyjnego?', answer: 'Wielka Karta Swobód (Magna Carta)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku podpisano traktat w Tordesillas dzielący nowo odkryte ziemie między Hiszpanię a Portugalię?', answer: '1494', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był pierwszym cesarzem rzymskim koronowanym przez papieża w roku 800?', answer: 'Karol Wielki', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miał miejsce Sobór Trydencki, ważny dla kontrreformacji?', answer: '1545-1563', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywała się dynastia panująca w Anglii podczas wojny dwóch róż?', answer: 'Lancasterowie i Yorkowie (walka o tron)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku zakończyła się wojna secesyjna w USA?', answer: '1865', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był generałem armii Konfederacji podczas wojny secesyjnej, poddał się pod Appomattox?', answer: 'Robert E. Lee', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce Rewolucja Październikowa w Rosji (wg kalendarza gregoriańskiego)?', answer: 'Listopad 1917 (7 listopada)', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku podpisano Akt Nawigacyjny Anglii, który doprowadził do wojen z Holandią?', answer: '1651', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Kto był ostatnim cesarzem rzymskim na Zachodzie, obalonym w 476 roku?', answer: 'Romulus Augustulus', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku miała miejsce bitwa pod Borodino między Napoleonem a Rosją?', answer: '1812', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'Jak nazywał się traktat kończący wojnę polsko-bolszewicką w 1921 roku?', answer: 'Traktat ryski', type: 'normal', difficulty: 'h' },
    { category: 'Historia', question: 'W którym roku odbyła się konferencja poczdamska ustalająca powojenne granice Niemiec?', answer: '1945', type: 'normal', difficulty: 'h' },
    // --- Geografia (trudne) ---
    { category: 'Geografia', question: 'Jaka jest stolica Kazachstanu (od 2019 roku pod obecną nazwą)?', answer: 'Astana', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest stolica Mjanmy (Birmy)?', answer: 'Naypyidaw', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest stolica Boliwii (siedziba rządu, nie konstytucyjna)?', answer: 'La Paz (konstytucyjna: Sucre)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest stolica Sri Lanki?', answer: 'Sri Jayawardenapura Kotte', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najdłuższą linię brzegową na świecie?', answer: 'Kanada', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się cieśnina oddzielająca Azję od Ameryki Północnej?', answer: 'Cieśnina Beringa', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaka jest najniżej położona stolica świata (poniżej poziomu morza lub blisko niego)?', answer: 'Baku (Azerbejdżan) - poniżej poziomu morza', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najwyżej położone jezioro żeglowne świata, na granicy Peru i Boliwii?', answer: 'Jezioro Titicaca', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najwięcej stref czasowych na swoim terytorium?', answer: 'Francja (ze względu na terytoria zamorskie)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się największa na świecie delta rzeczna, w Bangladeszu i Indiach?', answer: 'Delta Gangesu-Brahmaputry (Sundarbany)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj afrykański jako jedyny nigdy nie był skolonizowany przez mocarstwo europejskie (poza krótkim okresem)?', answer: 'Etiopia', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najstarsza republika świata, mały kraj otoczony przez Włochy?', answer: 'San Marino', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki jest najbardziej wysunięty na wschód punkt Europy (kontynentalnej, umownie)?', answer: 'Góry Ural (lub przylądek na Nowej Ziemi, zależnie od definicji)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się pustynia w południowo-zachodniej Afryce, jedna z najstarszych na świecie?', answer: 'Pustynia Namib', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najwyższą gęstość zaludnienia na świecie (pomijając miasta-państwa)?', answer: 'Bangladesz (pomijając Monako/Singapur jako miasta-państwa)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najgłębsza depresja lądowa Afryki, w Dżibuti?', answer: 'Jezioro Assal', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj graniczy z największą liczbą innych państw na świecie (razem z Chinami)?', answer: 'Chiny i Rosja (po 14)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się archipelag Ekwadoru słynny z unikalnej fauny badanej przez Darwina?', answer: 'Wyspy Galapagos', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma trzy stolice: administracyjną, sądowniczą i legislacyjną?', answer: 'Republika Południowej Afryki', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najwyższy czynny wulkan Europy, znajdujący się na Sycylii?', answer: 'Etna', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj Ameryki Południowej nie ma dostępu do morza obok Boliwii?', answer: 'Boliwia i Paragwaj (dwa kraje śródlądowe)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najdłuższy łańcuch górski na świecie (licząc również podmorski)?', answer: 'Grzbiet Śródatlantycki (podmorski) / Andy (lądowy)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najwięcej aktywnych wulkanów na świecie?', answer: 'Indonezja', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się cieśnina łącząca Morze Czarne z Morzem Marmara, dzieląca Stambuł?', answer: 'Bosfor', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki jest najmniej zaludniony kontynent na świecie?', answer: 'Antarktyda', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najwyższy wodospad Europy, znajdujący się w Norwegii?', answer: 'Vinnufossen', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj był kiedyś nazywany Rodezją, przed uzyskaniem niepodległości?', answer: 'Zimbabwe', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się region autonomiczny Chin, w którym leży Lhasa, stolica dawnego państwa buddyjskiego?', answer: 'Tybet', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najwyższy punkt na świecie, mierzony od środka Ziemi (nie od poziomu morza)?', answer: 'Ekwador (wulkan Chimborazo)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najbardziej na południe wysunięty punkt Afryki?', answer: 'Przylądek Igielny', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj Europy ma najwięcej jezior na swoim terytorium?', answer: 'Finlandia', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się rów tektoniczny ciągnący się przez wschodnią Afrykę, gdzie znajdują się liczne jeziora i wulkany?', answer: 'Wielki Rów Afrykański', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj Azji Środkowej jest największy pod względem powierzchni?', answer: 'Kazachstan', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najstarsze stałe miasto europejskie założone w obu Amerykach, obecna stolica Dominikany?', answer: 'Santo Domingo', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najdłuższy mur graniczny na świecie, biegnący przez pustynię?', answer: 'Maroko (mur w Saharze Zachodniej)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się najbardziej suchy zamieszkany region na Ziemi, w Chile?', answer: 'Pustynia Atakama', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj ma najwyższą średnią wysokość nad poziomem morza na świecie?', answer: 'Bhutan (lub Lesotho, zależnie od metody liczenia)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się cieśnina łącząca Morze Bałtyckie z Morzem Północnym, między Danią a Szwecją?', answer: 'Cieśnina Sund (Öresund)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jaki kraj Europy nie ma dostępu do morza, a jego stolica to Bratysława?', answer: 'Słowacja (Bratysława leży nad Dunajem, kraj śródlądowy)', type: 'normal', difficulty: 'h' },
    { category: 'Geografia', question: 'Jak nazywa się największa wyspa na Morzu Śródziemnym?', answer: 'Sycylia', type: 'normal', difficulty: 'h' },
    // --- Matematyka (trudne) ---
    { category: 'Matematyka', question: 'Ile wynosi pochodna funkcji x² (względem x)?', answer: '2x', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba, która nie może być zapisana jako ułamek dwóch liczb całkowitych?', answer: 'Liczba niewymierna', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma kątów wewnętrznych w pięciokącie foremnym (w stopniach)?', answer: '540°', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się ciąg liczb, w którym każdy kolejny wyraz jest sumą dwóch poprzednich (1,1,2,3,5,8...)?', answer: 'Ciąg Fibonacciego', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi wyznacznik macierzy jednostkowej 2x2?', answer: '1', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się twierdzenie mówiące, że w każdym trójkącie kwadrat długości przeciwprostokątnej równa się sumie kwadratów przyprostokątnych?', answer: 'Twierdzenie Pitagorasa', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi logarytm dziesiętny z liczby 1000?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba zespolona, której kwadrat wynosi -1?', answer: 'Jednostka urojona (i)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma wszystkich kątów zewnętrznych dowolnego wielokąta wypukłego?', answer: '360°', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się dział matematyki zajmujący się badaniem granic, pochodnych i całek?', answer: 'Analiza matematyczna (rachunek różniczkowy i całkowy)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi 2 do potęgi 16?', answer: '65536', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba, która jest sumą swoich właściwych dzielników (np. 6 = 1+2+3)?', answer: 'Liczba doskonała', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi pole koła o promieniu 10 (bez podstawiania wartości Pi, wzorem)?', answer: '100π', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się trójkąt, w którym wszystkie kąty są ostre?', answer: 'Trójkąt ostrokątny', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi objętość sześcianu o boku 3?', answer: '27', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się funkcja matematyczna opisująca stosunek boku przeciwległego do przeciwprostokątnej w trójkącie prostokątnym?', answer: 'Sinus', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi wartość silni z 0 (0!)?', answer: '1', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się zbiór liczb obejmujący liczby wymierne i niewymierne razem?', answer: 'Liczby rzeczywiste', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma szeregu geometrycznego nieskończonego 1 + 1/2 + 1/4 + 1/8 + ...?', answer: '2', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się zbiór liczb naturalnych podzielnych tylko przez 1 i przez samą siebie, większych od 1?', answer: 'Liczby pierwsze', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi pierwiastek sześcienny z liczby 27?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się figura geometryczna będąca zbiorem punktów równoodległych od danego punktu w przestrzeni trójwymiarowej?', answer: 'Kula (sfera)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma miar kątów w sześciokącie foremnym?', answer: '720°', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się metoda rozwiązywania równań kwadratowych za pomocą wzoru z deltą?', answer: 'Wzory Viete\'a / metoda z wyróżnikiem (deltą)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi 3 do potęgi 4?', answer: '81', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba niewymierna oznaczana grecką literą φ, związana ze złotym podziałem?', answer: 'Złota liczba (phi, ok. 1,618)', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi suma pierwszych 100 liczb naturalnych?', answer: '5050', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się dział matematyki badający prawdopodobieństwo zdarzeń losowych?', answer: 'Rachunek prawdopodobieństwa', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Ile wynosi pole trójkąta o podstawie 10 i wysokości 6?', answer: '30', type: 'normal', difficulty: 'h' },
    { category: 'Matematyka', question: 'Jak nazywa się liczba całkowita, która nie jest podzielna przez żadną liczbę poza 1 i sobą samą, poza liczbą 2 - czym różni się od liczby złożonej?', answer: 'Liczba pierwsza (liczba złożona ma więcej dzielników)', type: 'normal', difficulty: 'h' },
    // --- Informatyka (trudne) ---
    { category: 'Informatyka', question: 'Jak nazywa się algorytm szyfrowania asymetrycznego, którego nazwa pochodzi od nazwisk Rivest, Shamir i Adleman?', answer: 'RSA', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót API w informatyce?', answer: 'Application Programming Interface', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się struktura danych działająca na zasadzie "pierwszy wszedł, pierwszy wyszedł"?', answer: 'Kolejka (FIFO)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się struktura danych działająca na zasadzie "ostatni wszedł, pierwszy wyszedł"?', answer: 'Stos (LIFO)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót SQL?', answer: 'Structured Query Language', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się proces zamiany kodu źródłowego na kod maszynowy?', answer: 'Kompilacja', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się algorytm sortowania polegający na wielokrotnym porównywaniu i zamianie sąsiednich elementów?', answer: 'Sortowanie bąbelkowe', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót JSON?', answer: 'JavaScript Object Notation', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się system zarządzania pamięcią, w którym program otrzymuje więcej pamięci niż fizycznie dostępna, dzięki dyskowi?', answer: 'Pamięć wirtualna', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się protokół używany do bezpiecznego logowania się na zdalny serwer?', answer: 'SSH', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót IDE w kontekście programowania?', answer: 'Integrated Development Environment', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się notacja opisująca złożoność obliczeniową algorytmu?', answer: 'Notacja dużego O (Big O)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się model architektury komputerów, w którym dane i instrukcje przechowywane są w tej samej pamięci?', answer: 'Architektura von Neumanna', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót CSS?', answer: 'Cascading Style Sheets', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się rodzaj sztucznej sieci neuronowej szczególnie skuteczny w przetwarzaniu obrazów?', answer: 'Konwolucyjna sieć neuronowa (CNN)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się architektura sieci neuronowych leżąca u podstaw dużych modeli językowych, jak GPT?', answer: 'Transformer', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót VPN?', answer: 'Virtual Private Network', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się jednostka pamięci równa 1024 megabajtom?', answer: 'Gigabajt', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się zjawisko w programowaniu, w którym program wywołuje sam siebie?', answer: 'Rekurencja', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót DNS?', answer: 'Domain Name System', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się atak polegający na przeciążeniu serwera dużą liczbą zapytań w celu uniemożliwienia jego działania?', answer: 'Atak DDoS', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się system operacyjny czasu rzeczywistego stosowany np. w systemach wbudowanych?', answer: 'RTOS (Real-Time Operating System)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Co oznacza skrót ORM w kontekście baz danych?', answer: 'Object-Relational Mapping', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się proces sprawdzania poprawności działania oprogramowania poprzez uruchamianie go i porównywanie wyników z oczekiwaniami?', answer: 'Testowanie oprogramowania', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się algorytm znajdowania najkrótszej ścieżki w grafie ważonym, nazwany od holenderskiego informatyka?', answer: 'Algorytm Dijkstry', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się pierwszy wirus komputerowy rozprzestrzeniający się przez internet, z 1988 roku?', answer: 'Robak Morrisa (Morris Worm)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Kto stworzył język programowania C++?', answer: 'Bjarne Stroustrup', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się pierwsza przeglądarka internetowa z graficznym interfejsem, wydana w 1993 roku?', answer: 'Mosaic', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Kto jest twórcą sieci WWW (World Wide Web)?', answer: 'Tim Berners-Lee', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się algorytm kompresji danych bezstratnej stosowany m.in. w formacie ZIP?', answer: 'Algorytm Deflate (oparty na LZ77 i kodowaniu Huffmana)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się format pliku wektorowego szeroko stosowany w grafice internetowej, oparty na XML?', answer: 'SVG', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się metoda uwierzytelniania dwuskładnikowego, wykorzystująca coś, co użytkownik wie, i coś, co posiada?', answer: 'Uwierzytelnianie dwuskładnikowe (2FA)', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się technika programistyczna polegająca na dzieleniu programu na niezależne, komunikujące się usługi?', answer: 'Architektura mikroserwisów', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się algorytm haszujący powszechnie stosowany do weryfikacji integralności danych, o długości 256 bitów?', answer: 'SHA-256', type: 'normal', difficulty: 'h' },
    { category: 'Informatyka', question: 'Jak nazywa się rodzaj pamięci podręcznej znajdującej się bezpośrednio w procesorze, najszybsza z dostępnych?', answer: 'Cache L1', type: 'normal', difficulty: 'h' },
    // --- Gry planszowe (trudne) ---
    { category: 'Gry planszowe', question: 'Jak nazywa się ruch w szachach, w którym pionek dochodzący do ostatniego rzędu zamienia się w inną figurę?', answer: 'Promocja pionka', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się sytuacja w szachach, gdy król jest atakowany, ale gracz nie ma żadnego ruchu, który by go uratował?', answer: 'Mat', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się sytuacja remisowa w szachach, gdy gracz nie ma żadnego legalnego ruchu, ale jego król nie jest szachowany?', answer: 'Pat', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile punktów wartościowych (umownie) ma hetman w klasycznej wycenie figur szachowych?', answer: '9', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się japońska gra strategiczna, wariant szachów, w której zbite figury można ponownie wprowadzić do gry?', answer: 'Shogi', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile pól ma plansza do gry w Go (standardowy rozmiar)?', answer: '19x19 (361 punktów)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra karciana kolekcjonerska stworzona przez Richarda Garfielda w 1993 roku, pierwsza tego typu na świecie?', answer: 'Magic: The Gathering', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile kart liczy standardowa talia do brydża/pokera (bez jokerów)?', answer: '52', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się układ w pokerze złożony z pary i trójki?', answer: 'Full (full house)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile kart otrzymuje każdy z czterech graczy w klasycznym brydżu?', answer: '13', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa autorstwa Klausa Teubera, wydana w 1995 roku, uznawana za przełom w "euro games"?', answer: 'Osadnicy z Catanu', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra strategiczna z heksagonalnym polem, w której gracze zdobywają terytoria całego świata, wydana pierwotnie w 1957 roku we Francji?', answer: 'Risk (La Conquête du Monde)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się polski wydawca gier planszowych, twórca serii "Robinson Crusoe" i "51st State"?', answer: 'Portal Games', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się mechanika w grach planszowych polegająca na wysyłaniu "pracowników" na pola akcji, które blokują dostęp innym graczom?', answer: 'Worker placement (rozmieszczanie pracowników)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile ścianek ma kostka "k12", stosowana w grach RPG?', answer: '12', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra karciana "tysiąc", popularna w Europie Wschodniej, licząca punkty do tysiąca?', answer: 'Tysiąc (Tysiąc punktów)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się klasyczna chińska gra planszowa dla dwóch graczy, w której celem jest zamknięcie przeciwnika w "matni", grana czarnymi i białymi kamieniami?', answer: 'Go (Weiqi)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile pól ma standardowa plansza do gry w Monopoly?', answer: '40', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się mechanika gier planszowych polegająca na kupowaniu kart rozwoju, które dają trwałe bonusy, popularna w grach typu "deck building"?', answer: 'Budowanie talii (deck-building)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się popularna gra planszowa o zarządzaniu koleją i logistyce, wydana w 2004 roku przez Alana R. Moona?', answer: 'Wsiąść do pociągu (Ticket to Ride)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa oparta na uniwersum "Gry o Tron", w której gracze kontrolują rody Westeros?', answer: 'A Game of Thrones: The Board Game', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się mechanika w grach planszowych polegająca na losowaniu i budowaniu mapy z kafelków w trakcie gry?', answer: 'Tile-laying (układanie kafelków)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Ile pól ma standardowa plansza do warcabów międzynarodowych (100-polowych)?', answer: '100', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra karciana "Bridge", której nazwa pochodzi z rosyjskiego określenia "mostek"?', answer: 'Brydż', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra logiczna z Japonii, w której trzeba wypełnić siatkę zgodnie z liczbami określającymi długość bloków?', answer: 'Nonogram (Picross)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra karciana "Skat", popularna w Niemczech, grana przez trzech graczy?', answer: 'Skat', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się najwyższa możliwa wygrywająca kombinacja w grze Blackjack (21 oczek z asa i figury)?', answer: 'Blackjack (naturalny 21)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się gra planszowa autorstwa Reinera Knizii oparta na starożytnym Egipcie, z piramidami jako punktacją?', answer: 'Ra', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się mechanika w grach karcianych polegająca na licytowaniu punktów lub zasobów przed rozpoczęciem rundy?', answer: 'Licytacja (bidding)', type: 'normal', difficulty: 'h' },
    { category: 'Gry planszowe', question: 'Jak nazywa się klasyczna gra logiczna z kołkami w trójkątnej planszy, w której trzeba zostawić jak najmniej pionków?', answer: 'Warcaby jednoosobowe (Peg Solitaire)', type: 'normal', difficulty: 'h' },
    // --- Gry komputerowe (trudne) ---
    { category: 'Gry komputerowe', question: 'Jak nazywa się silnik graficzny stworzony przez Epic Games, używany w wielu grach AAA?', answer: 'Unreal Engine', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'W którym roku ukazała się pierwsza gra z serii "The Legend of Zelda"?', answer: '1986', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się studio deweloperskie odpowiedzialne za serię "Assassin\'s Creed"?', answer: 'Ubisoft (Ubisoft Montreal)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się fikcyjne miasto, w którym rozgrywa się akcja gry "Grand Theft Auto: Vice City"?', answer: 'Vice City', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Kto jest twórcą gry "Minecraft", sprzedanej później firmie Microsoft?', answer: 'Markus Persson (Notch)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się pierwsza gra z serii "Wiedźmin" wydana przez CD Projekt RED w 2007 roku?', answer: 'Wiedźmin (The Witcher)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się główny antagonista gry "Portal", sztuczna inteligencja kontrolująca laboratorium?', answer: 'GLaDOS', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się silnik fizyki stosowany w wielu grach, opracowany przez firmę Havok?', answer: 'Havok Physics', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'W którym roku ukazała się pierwsza gra z serii "Doom", uznawana za pioniera gatunku FPS?', answer: '1993', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się studio odpowiedzialne za serię gier "Half-Life" i platformę Steam?', answer: 'Valve', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się fikcyjna korporacja w grze "Cyberpunk 2077", jedna z najpotężniejszych megakorporacji?', answer: 'Arasaka', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polskie studio, twórca gry "Cyberpunk 2077"?', answer: 'CD Projekt RED', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się protagonistka serii gier "Metroid"?', answer: 'Samus Aran', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'W którym roku ukazała się pierwsza konsola PlayStation?', answer: '1994', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier wyścigowych symulacyjnych, uznawana za jedną z najbardziej realistycznych, tworzona przez Polyphony Digital?', answer: 'Gran Turismo', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra wydana w 2011 roku przez Bethesda Game Studios, piąta odsłona serii The Elder Scrolls?', answer: 'The Elder Scrolls V: Skyrim', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się główny bohater serii "God of War", wojownik walczący z bogami greckimi?', answer: 'Kratos', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się japońskie studio odpowiedzialne za serię gier "Dark Souls" i "Bloodborne"?', answer: 'FromSoftware', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się reżyser gier, twórczy lider FromSoftware, uznawany za twórcę gatunku "soulslike"?', answer: 'Hidetaka Miyazaki', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się fikcyjny kontynent, na którym rozgrywa się akcja gry "Elden Ring"?', answer: 'Międzyziemie (The Lands Between)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'W którym roku ukazała się pierwsza gra z serii "Diablo", stworzona przez Blizzard North?', answer: '1996', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jakie francuskie studio stworzyło kosmiczną grę strategiczną 4X "Endless Space"?', answer: 'Amplitude Studios', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się mechanika w grach roguelike polegająca na tym, że śmierć bohatera resetuje postęp, generując nowy poziom?', answer: 'Permadeath (proceduralna generacja + permanentna śmierć)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra wydana w 1997 roku, uznawana za pioniera gatunku RTS, autorstwa Westwood Studios?', answer: 'Command & Conquer', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polska firma będąca wydawcą i deweloperem gry "Frostpunk"?', answer: '11 bit studios', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra wydana w 1980 roku, jedna z pierwszych gier typu "labirynt z duchami", stworzona w Japonii?', answer: 'Pac-Man', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Kto stworzył grę "Pac-Man"?', answer: 'Toru Iwatani', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier bijatyk stworzona przez studio NetherRealm, następcy "Mortal Kombat"?', answer: 'Injustice', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się fikcyjna waluta w grze "World of Warcraft"?', answer: 'Złoto (gold)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polska gra RPG akcji z 2011 roku, poprzedzająca "Wiedźmina 3", z otwartym światem?', answer: 'Wiedźmin 2: Zabójcy Królów', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się fikcyjny język, którym posługują się orkowie w grach "Warcraft"?', answer: 'Orczy (Orcish)', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się polskie studio deweloperskie odpowiedzialne za serię "This War of Mine"?', answer: '11 bit studios', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się seria gier survival-horror z Silent Hill jako fikcyjnym miastem?', answer: 'Silent Hill', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się mechanika gier polegająca na losowym generowaniu poziomów przy każdym uruchomieniu?', answer: 'Generowanie proceduralne', type: 'normal', difficulty: 'h' },
    { category: 'Gry komputerowe', question: 'Jak nazywa się gra wydana w 2015 roku przez CD Projekt RED, trzecia część serii Wiedźmin?', answer: 'Wiedźmin 3: Dziki Gon', type: 'normal', difficulty: 'h' },
    // --- Motoryzacja (trudne) ---
    { category: 'Motoryzacja', question: 'Jak nazywa się system bezpieczeństwa zapobiegający blokowaniu kół podczas hamowania, skrót ABS?', answer: 'Antilock Braking System', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system stabilizacji toru jazdy pojazdu, zapobiegający poślizgowi, skrót ESP?', answer: 'Electronic Stability Program', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile cylindrów ma typowy silnik V8?', answer: '8', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się typ nadwozia samochodowego z otwartym dachem?', answer: 'Kabriolet (cabrio)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się proces spalania mieszanki paliwowo-powietrznej w silniku Diesla, bez świec zapłonowych?', answer: 'Samozapłon (zapłon kompresyjny)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się japoński producent samochodów, twórca marki premium Lexus?', answer: 'Toyota', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się niemiecki producent samochodów sportowych, twórca modelu 911?', answer: 'Porsche', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile bolidów startuje w wyścigu Formuły 1 (2024, przy pełnej stawce)?', answer: '20', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny tor wyścigowy w Wielkiej Brytanii, gospodarz Grand Prix Wielkiej Brytanii?', answer: 'Silverstone', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Kto zdobył pierwsze mistrzostwo świata Formuły 1 w historii (1950)?', answer: 'Giuseppe Farina', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system napędu turbodoładowania wykorzystujący energię spalin do zwiększenia mocy silnika?', answer: 'Turbosprężarka (turbo)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się rodzaj skrzyni biegów zmieniającej przełożenia automatycznie, bez udziału kierowcy?', answer: 'Automatyczna skrzynia biegów', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się typ nadwozia samochodowego łączący cechy kombi i SUV-a, popularny od lat 2010?', answer: 'Crossover', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się chiński producent samochodów elektrycznych, jeden z największych na świecie pod względem sprzedaży?', answer: 'BYD', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny rajd samochodowo-terenowy, pierwotnie organizowany z Paryża do Dakaru?', answer: 'Rajd Dakar', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile pełnych sezonów Formuły 1 zdobył tytuł mistrzowski Sebastian Vettel?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się polski rajdowiec, wielokrotny mistrz Polski i Europy w rajdach samochodowych, znany komentator motoryzacyjny?', answer: 'Krzysztof Hołowczyc', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system, który automatycznie wyłącza silnik na postoju, by oszczędzać paliwo (np. na światłach)?', answer: 'System Start-Stop', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się typ zawieszenia samochodowego umożliwiający niezależny ruch każdego koła?', answer: 'Zawieszenie niezależne', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się amerykański producent ciężarówek i aut terenowych, twórca modelu Wrangler?', answer: 'Jeep', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się brytyjska firma motoryzacyjna, producent luksusowych samochodów, symbolizowana przez posążek "Spirit of Ecstasy"?', answer: 'Rolls-Royce', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się najstarsza marka samochodowa na świecie wciąż istniejąca, założona w 1899 roku we Francji?', answer: 'Renault', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system napędu w samochodach wyścigowych F1 odzyskujący energię hamowania, wprowadzony w 2009 roku?', answer: 'KERS (system odzyskiwania energii kinetycznej)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się najbardziej utytułowany zespół w historii Formuły 1 pod względem liczby tytułów konstruktorów?', answer: 'Ferrari', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się polski producent autobusów, jeden z największych w Europie, z siedzibą w Sadach koło Bolechowa?', answer: 'Solaris Bus & Coach', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się japoński producent samochodów, twórca modelu Skyline GT-R?', answer: 'Nissan', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się system umożliwiający autonomiczną jazdę samochodu bez udziału kierowcy, rozwijany m.in. przez Teslę?', answer: 'Autopilot (jazda autonomiczna)', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się szwedzki producent samochodów ciężarowych i autobusów, obok Scanii?', answer: 'Volvo Trucks', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Ile kółek ma standardowy quad?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Motoryzacja', question: 'Jak nazywa się słynny amerykański tor wyścigowy, gospodarz wyścigu Indianapolis 500?', answer: 'Indianapolis Motor Speedway', type: 'normal', difficulty: 'h' },
    // --- Literatura światowa (trudne) ---
    { category: 'Literatura światowa', question: 'Kto napisał "Zbrodnię i karę"?', answer: 'Fiodor Dostojewski', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Wojny i pokoju"?', answer: 'Lew Tołstoj', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Hamleta"?', answer: 'William Shakespeare', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się duński książę, tytułowy bohater dramatu Szekspira?', answer: 'Hamlet', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Stu lat samotności"?', answer: 'Gabriel García Márquez', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się fikcyjne miasto, w którym rozgrywa się akcja "Stu lat samotności"?', answer: 'Macondo', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "1984"?', answer: 'George Orwell', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się totalitarny przywódca w powieści "1984" Orwella?', answer: 'Wielki Brat (Big Brother)', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Buszującego w zbożu"?', answer: 'J.D. Salinger', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Mistrza i Małgorzatę"?', answer: 'Michaił Bułhakow', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się diabeł odwiedzający Moskwę w powieści "Mistrz i Małgorzata"?', answer: 'Woland', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Don Kichota"?', answer: 'Miguel de Cervantes', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się wierny giermek Don Kichota?', answer: 'Sancho Pansa', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Boską komedię"?', answer: 'Dante Alighieri', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Ile części ma "Boska komedia" Dantego?', answer: '3 (Piekło, Czyściec, Raj)', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Ulissesa", jednej z najważniejszych powieści modernizmu?', answer: 'James Joyce', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Proces"?', answer: 'Franz Kafka', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak ma na imię główny bohater "Procesu" Kafki?', answer: 'Josef K.', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Władcy much"?', answer: 'William Golding', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Cierpienia młodego Wertera"?', answer: 'Johann Wolfgang von Goethe', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Fausta"?', answer: 'Johann Wolfgang von Goethe', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Anne Karenine"?', answer: 'Lew Tołstoj', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Sto lat samotności" laureatem literackiej Nagrody Nobla z 1982 roku - z jakiego kraju pochodził?', answer: 'Kolumbia', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Grona gniewu"?', answer: 'John Steinbeck', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Portretu Doriana Graya"?', answer: 'Oscar Wilde', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Podróże Guliwera"?', answer: 'Jonathan Swift', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Iliady" i "Odysei"?', answer: 'Homer', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Notatki z podziemia"?', answer: 'Fiodor Dostojewski', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem cyklu "W poszukiwaniu straconego czasu"?', answer: 'Marcel Proust', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Dumę i uprzedzenie"?', answer: 'Jane Austen', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem "Folwarku zwierzęcego"?', answer: 'George Orwell', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się świnia będąca głównym przywódcą rewolucji w "Folwarku zwierzęcym"?', answer: 'Napoleon', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto jest autorem trylogii "Władca Pierścieni"?', answer: 'J.R.R. Tolkien', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Jak nazywa się fikcyjny język stworzony przez Tolkiena dla elfów w "Władcy Pierścieni"?', answer: 'Quenya (lub Sindarin)', type: 'normal', difficulty: 'h' },
    { category: 'Literatura światowa', question: 'Kto napisał "Kubusia Puchatka"?', answer: 'A.A. Milne', type: 'normal', difficulty: 'h' },
    // --- Podróże i ciekawostki świata (trudne) ---
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najwyżej położone lotnisko cywilne na świecie, znajdujące się w Tybecie/Chinach?', answer: 'Lotnisko Daocheng Yading', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najdłuższa linia kolejowa na świecie, łącząca Moskwę z Władywostokiem?', answer: 'Kolej Transsyberyjska', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Ile dni w przybliżeniu zajmuje przejazd całą Koleją Transsyberyjską bez przystanków?', answer: 'Ok. 7 dni', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najbardziej ruchliwe lotnisko świata pod względem liczby pasażerów (przez wiele lat, USA)?', answer: 'Port lotniczy Atlanta (Hartsfield-Jackson)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się słynny szlak pielgrzymkowy prowadzący do Santiago de Compostela w Hiszpanii?', answer: 'Camino de Santiago', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najwyżej położone miasto świata, stolica administracyjna leżąca w Andach boliwijskich?', answer: 'El Alto (lub La Paz)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się archipelag Filipin, na którym leży stolica kraju, Manila?', answer: 'Luzon', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najdłuższy prosty odcinek autostrady na świecie, znajdujący się w Arabii Saudyjskiej?', answer: 'Autostrada 10 (Highway 10)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najbardziej wysunięty na północ stale zamieszkany punkt świata, osada na Grenlandii?', answer: 'Alert (Kanada) lub Qaanaaq (Grenlandia)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się słynny szlak handlowy łączący Europę z Chinami przez Azję Środkową w średniowieczu?', answer: 'Jedwabny Szlak', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najgłębszy kanion na świecie, znajdujący się w Tybecie, wzdłuż rzeki Yarlung Tsangpo?', answer: 'Wielki Kanion Yarlung Tsangpo', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najstarsze miasto świata zamieszkane nieprzerwanie, kandydat obejmujący Damaszek lub Jerycho?', answer: 'Jerycho (lub Damaszek)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najdłuższy most nad wodą na świecie, znajdujący się w USA (Luizjana)?', answer: 'Lake Pontchartrain Causeway', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się słynna droga łącząca Alaskę z resztą Kanady i USA, zbudowana podczas II wojny światowej?', answer: 'Alaska Highway', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najbardziej odizolowana zamieszkana wyspa na świecie, brytyjskie terytorium na Atlantyku?', answer: 'Tristan da Cunha', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najbardziej na wschód wysunięty punkt kontynentalnej Europy, w Rosji, blisko granicy z Kazachstanem (umownie)?', answer: 'Góry Ural (umowna granica)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się słynna droga widokowa wzdłuż wybrzeża Kalifornii, znana z widoków na Ocean Spokojny?', answer: 'Pacific Coast Highway', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najwyżej położona stolica państwa na świecie?', answer: 'La Paz (Boliwia)', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najstarszy park narodowy świata, utworzony w USA w 1872 roku?', answer: 'Park Narodowy Yellowstone', type: 'normal', difficulty: 'h' },
    { category: 'Podróże i ciekawostki świata', question: 'Jak nazywa się najdłuższa rzeka Europy, płynąca przez Rosję?', answer: 'Wołga', type: 'normal', difficulty: 'h' },
    // --- Muzyka (trudne) ---
    { category: 'Muzyka', question: 'Jak nazywa się forma muzyczna złożona z ekspozycji, przetworzenia i repryzy, popularna w klasycyzmie?', answer: 'Forma sonatowa', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował operę "Halkę", uznawaną za pierwszą polską operę narodową?', answer: 'Stanisław Moniuszko', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się instrument klawiszowy poprzedzający fortepian, o cichszym, bardziej stłumionym dźwięku?', answer: 'Klawesyn', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował "Requiem", pozostawione niedokończone w chwili śmierci w 1791 roku?', answer: 'Wolfgang Amadeusz Mozart', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się technika kompozytorska polegająca na wielokrotnym powtarzaniu krótkiego motywu z niewielkimi zmianami, charakterystyczna dla muzyki minimalistycznej?', answer: 'Minimalizm (repetytywność)', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto jest kompozytorem "Karnawału zwierząt"?', answer: 'Camille Saint-Saëns', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski kompozytor XX-wieczny, autor "Ofiary Hiroszimy" i "Tren"?', answer: 'Krzysztof Penderecki', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował "Święto wiosny", balet, którego premiera w 1913 roku wywołała skandal w Paryżu?', answer: 'Igor Strawiński', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się rosyjski kompozytor, autor baletów "Jezioro łabędzie" i "Dziadek do orzechów"?', answer: 'Piotr Czajkowski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się forma muzyczna oparta na dialogu między solistą (lub grupą solistów) a orkiestrą?', answer: 'Koncert', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto jest kompozytorem cyklu "Obrazki z wystawy"?', answer: 'Modest Musorgski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się niemiecki kompozytor okresu baroku, autor "Pasji według św. Mateusza" i licznych fug?', answer: 'Jan Sebastian Bach', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Ile symfonii skomponował Ludwig van Beethoven?', answer: '9', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski zespół jazzowy / muzyk jazzowy, autor "Astigmatic", uznawanego za kamień milowy europejskiego jazzu?', answer: 'Krzysztof Komeda', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował muzykę do filmu "Dziecko Rosemary" i "Nóż w wodzie" Polańskiego?', answer: 'Krzysztof Komeda', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się austriacki kompozytor okresu klasycyzmu, nauczyciel Beethovena, "ojciec symfonii"?', answer: 'Joseph Haydn', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się rosyjski kompozytor - pianista, autor "Preludium cis-moll", zmarły na emigracji w USA?', answer: 'Siergiej Rachmaninow', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się instrument dęty blaszany o najniższym brzmieniu w orkiestrze?', answer: 'Tuba', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował "Cztery pory roku" na skrzypce i orkiestrę smyczkową?', answer: 'Antonio Vivaldi', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski kompozytor i pianista, autor "Harnasi", baletu inspirowanego folklorem góralskim?', answer: 'Karol Szymanowski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się technika wokalna polegająca na śpiewaniu dwóch dźwięków jednocześnie, praktykowana m.in. przez mnichów tybetańskich?', answer: 'Śpiew alikwotowy (throat singing)', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował operę "Aida", której premiera odbyła się w Kairze w 1871 roku?', answer: 'Giuseppe Verdi', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się niemiecki kompozytor, twórca cyklu operowego "Pierścień Nibelunga"?', answer: 'Richard Wagner', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się forma muzyczna oparta na wariacjach na dany temat, popularna u Bacha (np. "Wariacje Goldbergowskie")?', answer: 'Wariacje', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Kto skomponował "Wariacje Goldbergowskie"?', answer: 'Jan Sebastian Bach', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się instrument perkusyjny strojony, składający się z metalowych płytek uderzanych pałeczkami, popularny w orkiestrach?', answer: 'Ksylofon (lub wibrafon, zależnie od materiału)', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski kompozytor, twórca opery "Król Roger"?', answer: 'Karol Szymanowski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się austriacki kompozytor, autor "Symfonii niedokończonej"?', answer: 'Franz Schubert', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się rosyjski kompozytor, autor opery "Borys Godunow"?', answer: 'Modest Musorgski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się francuski kompozytor impresjonistyczny, autor "Popołudnia fauna" i "La Mer"?', answer: 'Claude Debussy', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się gatunek muzyczny powstały w Nowym Orleanie na przełomie XIX i XX wieku, łączący elementy bluesa i ragtime\'u?', answer: 'Jazz', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się amerykański trębacz jazzowy, jedna z najważniejszych postaci historii jazzu, autor "What a Wonderful World"?', answer: 'Louis Armstrong', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się polski skrzypek i kompozytor, wirtuoz określany "polskim Paganinim"?', answer: 'Henryk Wieniawski', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się niemiecki kompozytor okresu romantyzmu, autor "Symfonii z tysiąca wykonawców"?', answer: 'Gustav Mahler', type: 'normal', difficulty: 'h' },
    { category: 'Muzyka', question: 'Jak nazywa się rosyjski kompozytor, autor baletu "Romeo i Julia" oraz "Piotruś i wilk"?', answer: 'Sergiusz Prokofiew', type: 'normal', difficulty: 'h' },
    // --- Sztuka (trudne) ---
    { category: 'Sztuka', question: 'Kto namalował "Narodziny Wenus"?', answer: 'Sandro Botticelli', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się ruch artystyczny XX wieku odrzucający logikę i racjonalność na rzecz podświadomości i snów, tworzony m.in. przez Dalego?', answer: 'Surrealizm', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Dziewczynę z perłą"?', answer: 'Jan Vermeer', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się holenderski malarz barokowy, autor "Nocnej straży"?', answer: 'Rembrandt', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował katedrę Sagrada Familia w Barcelonie, wciąż niedokończoną?', answer: 'Antoni Gaudí', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się styl architektoniczny charakterystyczny dla twórczości Antoniego Gaudíego, pełen organicznych, płynnych form?', answer: 'Modernizm kataloński (art nouveau/secesja)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Ostatni dzień Pompei", monumentalny obraz z 1833 roku?', answer: 'Karol Briułłow (Karl Bryullov)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się nurt sztuki XX wieku, w którym artyści wykorzystywali elementy popkultury i reklamy, np. Andy Warhol?', answer: 'Pop-art', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto jest autorem "Puszek Campbella", ikonicznego dzieła pop-artu?', answer: 'Andy Warhol', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz, autor "Dziewczyny z chryzantemami" i wielu obrazów przedstawiających Krakowiaków?', answer: 'Józef Mehoffer (lub Włodzimierz Tetmajer)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował Muzeum Guggenheima w Bilbao, przykład architektury dekonstruktywistycznej?', answer: 'Frank Gehry', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się technika graficzna polegająca na wyciskaniu wzoru wyrytego na płycie metalowej lub drewnianej?', answer: 'Sztych (grafika warsztatowa - miedzioryt/drzeworyt)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto jest autorem cyklu obrazów "Nenufary", malowanych w ogrodzie w Giverny?', answer: 'Claude Monet', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się nurt malarstwa, w którym barwa nakładana jest drobnymi, oddzielnymi punktami, tworzącymi obraz z odległości, np. Seurat?', answer: 'Pointylizm (neoimpresjonizm)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto jest autorem "Krzyku" - w jakim kraju działał ten malarz?', answer: 'Norwegia (Edvard Munch)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski rzeźbiarz, twórca warszawskiej Syrenki (pomnika na Rynku Starego Miasta)?', answer: 'Konstanty Hegel (autor jednej z wersji)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował paryską piramidę szklaną przed Luwrem, oddaną do użytku w 1989 roku?', answer: 'Ieoh Ming Pei (I.M. Pei)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się nurt architektoniczny XX wieku dążący do uproszczenia form i funkcjonalności, reprezentowany przez Le Corbusiera?', answer: 'Modernizm (funkcjonalizm)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto jest autorem rzeźby "Myśliciel"?', answer: 'Auguste Rodin', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się japońska technika sztuki składania papieru w trójwymiarowe formy?', answer: 'Origami', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Śniadanie na trawie", obraz wywołujący skandal w Paryżu w 1863 roku?', answer: 'Édouard Manet', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się holenderski malarz barokowy, mistrz światłocienia, autor "Lekcji anatomii doktora Tulpa"?', answer: 'Rembrandt', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował wieżowiec Empire State Building w Nowym Jorku?', answer: 'William F. Lamb (Shreve, Lamb and Harmon)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się ruch artystyczny XX wieku dążący do tworzenia sztuki czysto abstrakcyjnej, oparty na kompozycjach geometrycznych, reprezentowany przez Mondriana?', answer: 'Neoplastycyzm (De Stijl)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Kompozycję w czerwieni, żółci i błękicie"?', answer: 'Piet Mondrian', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się rzeźba przedstawiająca skrzydlatą boginię zwycięstwa, znaleziona na wyspie Samotraka, eksponowana w Luwrze?', answer: 'Nike z Samotraki', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował Operę w Sydney, ikoniczny budynek o kształcie żagli?', answer: 'Jørn Utzon', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz, autor "Wioślarza" i licznych portretów, przedstawiciel koloryzmu?', answer: 'Józef Pankiewicz', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Wolność wiodącą lud na barykady"?', answer: 'Eugène Delacroix', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się styl w architekturze i sztuce popularny na przełomie XIX i XX wieku, w Polsce zwany secesją?', answer: 'Art Nouveau (secesja)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Trzy tancerki" i wiele innych obrazów przedstawiających baletnice?', answer: 'Edgar Degas', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się japoński drzeworyt ukiyo-e, sztuka "obrazów przepływającego świata"?', answer: 'Ukiyo-e', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto zaprojektował wieżowiec Burj Khalifa w Dubaju?', answer: 'Adrian Smith', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Jak nazywa się polski malarz, twórca panoram, autor "Panoramy Racławickiej"?', answer: 'Wojciech Kossak i Jan Styka (współautorzy)', type: 'normal', difficulty: 'h' },
    { category: 'Sztuka', question: 'Kto namalował "Ogrody w Giverny" i inne pejzaże swojego domu we Francji?', answer: 'Claude Monet', type: 'normal', difficulty: 'h' },
    // --- Mitologia (trudne) ---
    { category: 'Mitologia', question: 'Jak nazywał się grecki bóg wojny?', answer: 'Ares', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się grecka bogini mądrości i strategii wojennej?', answer: 'Atena', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bóg mórz i oceanów?', answer: 'Posejdon', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się władca podziemnego świata w mitologii greckiej?', answer: 'Hades', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bohater, który zabił Meduzę?', answer: 'Perseusz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się skrzydlaty koń zrodzony z krwi Meduzy?', answer: 'Pegaz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bohater osłabiony przez ranę w pięcie?', answer: 'Achilles', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się dziesięcioletnia wojna opisana w "Iliadzie" Homera?', answer: 'Wojna trojańska', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się drewniany koń, dzięki któremu Grecy zdobyli Troję?', answer: 'Koń trojański', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bohater, który przechytrzył cyklopa Polifema?', answer: 'Odyseusz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się król bogów w mitologii greckiej?', answer: 'Zeus', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się rzymski odpowiednik greckiego Zeusa?', answer: 'Jowisz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się grecka bogini miłości i piękna?', answer: 'Afrodyta', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się rzymski odpowiednik greckiej Afrodyty?', answer: 'Wenus', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się tytan, który wykradł ogień bogom i podarował go ludziom?', answer: 'Prometeusz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się labirynt, w którym trzymano Minotaura?', answer: 'Labirynt Dedala (na Krecie)', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bohater, który zabił Minotaura?', answer: 'Tezeusz', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się nić, dzięki której Tezeusz odnalazł drogę powrotną z labiryntu?', answer: 'Nić Ariadny', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się skandynawski bóg piorunów i grzmotów, władający młotem Mjolnir?', answer: 'Thor', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się główny bóg w mitologii nordyckiej, ojciec Thora?', answer: 'Odyn', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się skandynawski podstępny bóg ognia i chaosu?', answer: 'Loki', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się mityczna sala w Asgardzie, do której trafiają polegli wojownicy?', answer: 'Walhalla', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się koniec świata w mitologii nordyckiej, wielka bitwa bogów?', answer: 'Ragnarok', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się egipski bóg z głową sokoła, władca nieba?', answer: 'Horus', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się egipski bóg zaświatów, przedstawiany z głową szakala?', answer: 'Anubis', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się egipska bogini płodności i magii, żona Ozyrysa?', answer: 'Izyda', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się egipski bóg słońca, jeden z najważniejszych bóstw panteonu?', answer: 'Ra', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki posłaniec bogów, patron kupców i podróżnych?', answer: 'Hermes', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się grecka bogini zbiorów i urodzaju, matka Persefony?', answer: 'Demeter', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się grecka bogini polowania i księżyca, siostra Apolla?', answer: 'Artemida', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bóg słońca, sztuki i wróżbiarstwa?', answer: 'Apollo', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bóg wina i winorośli, patron teatru?', answer: 'Dionizos', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się dziewięć greckich bogiń opiekujących się sztukami i naukami?', answer: 'Muzy', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się skrzynia, którą otworzyła pierwsza kobieta w mitologii greckiej, wypuszczając zło na świat?', answer: 'Puszka Pandory', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się mityczny król Krety, dla którego wybudowano labirynt?', answer: 'Minos', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się bohater mitów hinduskich, wcielenie boga Wisznu, walczący z demonem Rawaną w "Ramajanie"?', answer: 'Rama', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się hinduski bóg z głową słonia, patron mądrości i powodzenia?', answer: 'Ganesha', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się słowiański bóg piorunów i wojny, główne bóstwo panteonu?', answer: 'Perun', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się słowiańska bogini miłości i urody?', answer: 'Łada', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywa się słowiański bóg podziemi i zaświatów, przeciwstawiany Perunowi?', answer: 'Weles', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się grecki bóg kowalstwa i ognia, mąż Afrodyty?', answer: 'Hefajstos', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się rzeka w mitologii greckiej oddzielająca świat żywych od umarłych?', answer: 'Styks', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się przewoźnik dusz zmarłych przez rzekę Styks?', answer: 'Charon', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywał się trójgłowy pies strzegący bram Hadesu?', answer: 'Cerber', type: 'normal', difficulty: 'h' },
    { category: 'Mitologia', question: 'Jak nazywała się grecka bogini zemsty i sprawiedliwości?', answer: 'Nemezis', type: 'normal', difficulty: 'h' },
    // --- Kuchnia i kulinaria (trudne) ---
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się włoskie danie z ryżu gotowanego powoli w bulionie, często z winem i serem?', answer: 'Risotto', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuska zupa cebulowa zapiekana z serem i grzankami?', answer: 'Zupa cebulowa (soupe à l\'oignon)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się japońskie danie z surowej ryby podawanej na ryżu z octem?', answer: 'Sushi', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się hiszpańskie danie z ryżu z owocami morza, mięsem i szafranem?', answer: 'Paella', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuski sos na bazie masła, żółtek i octu winnego z estragonem, klasyczny dodatek do steków?', answer: 'Sos beárnaise', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się węgierska potrawa, gęsta zupa mięsna z papryką?', answer: 'Gulasz (gulyás)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się polska zupa na zakwasie żytnim, podawana często z jajkiem i kiełbasą?', answer: 'Żurek', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuskie ciasto warstwowe z kremem, popularne jako deser?', answer: 'Napoleonka (mille-feuille)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się japońska technika przyrządzania potraw na gorącej płycie przed gośćmi?', answer: 'Teppanyaki', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się meksykańska potrawa z kukurydzianej tortilli zwiniętej z nadzieniem?', answer: 'Taco (lub burrito, zależnie od wariantu)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuski deser z zapiekanego kremu z warstwą karmelizowanego cukru na wierzchu?', answer: 'Crème brûlée', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się indyjska mieszanka przypraw, podstawa wielu curry?', answer: 'Garam masala', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces powolnego gotowania mięsa w niskiej temperaturze przez wiele godzin, popularny w kuchni francuskiej?', answer: 'Duszenie (braising)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się grecka sałatka z pomidorów, ogórków, oliwek i sera feta?', answer: 'Sałatka grecka', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się japońska zupa na bazie pasty sojowej?', answer: 'Zupa miso', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuskie ciasto z cienkich, delikatnych warstw, znane jako naleśnik francuski?', answer: 'Crêpe', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces fermentacji kapusty z dodatkiem soli, popularny w kuchni polskiej i niemieckiej?', answer: 'Kiszenie', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się włoski deser na bazie mascarpone, biszkoptów nasączonych kawą i kakao?', answer: 'Tiramisu', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się tradycyjna francuska zupa rybna z prowansalskiego wybrzeża?', answer: 'Bouillabaisse', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się koreańska potrawa z kiszonej, ostro przyprawionej kapusty?', answer: 'Kimchi', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces powolnego wędzenia mięsa w niskiej temperaturze, popularny w kuchni amerykańskiej (BBQ)?', answer: 'Wędzenie typu low and slow', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się tradycyjny szwajcarski/francuski posiłek z roztopionego sera, do którego macza się chleb?', answer: 'Fondue', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się polska potrawa wigilijna z suszonych owoców gotowanych w wodzie z przyprawami?', answer: 'Kompot z suszu (napój wigilijny)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się indyjski chleb pieczony w glinianym piecu tandoor?', answer: 'Naan', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się tajska zupa na bazie mleka kokosowego z krewetkami i trawą cytrynową?', answer: 'Tom yum (lub tom kha, zależnie od wariantu)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces powolnego karmelizowania cebuli w tłuszczu, kluczowy dla wielu sosów i zup?', answer: 'Karmelizacja cebuli', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuskie danie z kaczej lub gęsiej wątróbki, tuczonej specjalną metodą?', answer: 'Foie gras', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się chińska metoda smażenia na bardzo gorącym tłuszczu przy ciągłym mieszaniu?', answer: 'Stir-fry (smażenie na woku)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces peklowania mięsa w soli i przyprawach przed wędzeniem lub gotowaniem?', answer: 'Peklowanie', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się austriacki tort czekoladowy z konfiturą morelową, słynący z Wiednia?', answer: 'Tort Sachera (Sachertorte)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces powolnego pieczenia mięsa w niskiej temperaturze przez wiele godzin, popularny w kuchni amerykańskiej (np. brisket)?', answer: 'Low and slow (wolne pieczenie)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się japońska deska do krojenia sushi i sashimi wykonana z drewna hinoki?', answer: 'Deska hinoki (manaita)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się francuska technika przyrządzania mięsa lub warzyw we własnym sosie pod przykryciem?', answer: 'Duszenie (étouffée)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się polska potrawa z ziemniaków, mięsa i warzyw duszonych razem w jednym naczyniu?', answer: 'Bigos (lub gulasz, zależnie od wariantu)', type: 'normal', difficulty: 'h' },
    { category: 'Kuchnia i kulinaria', question: 'Jak nazywa się proces powolnego suszenia mięsa w celu jego konserwacji, popularny np. przy produkcji prosciutto?', answer: 'Suszenie na powietrzu (peklowanie na sucho)', type: 'normal', difficulty: 'h' },
    // --- Znane osobistości (trudne) ---
    { category: 'Znane osobistości', question: 'Kto był pierwszym kanclerzem Republiki Federalnej Niemiec po II wojnie światowej?', answer: 'Konrad Adenauer', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był francuskim generałem i prezydentem, liderem Wolnych Francuzów podczas II wojny światowej?', answer: 'Charles de Gaulle', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był premierem Wielkiej Brytanii podczas II wojny światowej?', answer: 'Winston Churchill', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim inwestorem i filantropem, założycielem funduszu Bridgewater Associates?', answer: 'Ray Dalio', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był pierwszym sekretarzem generalnym ONZ?', answer: 'Trygve Lie', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjskim fizykiem, twórcą praw ruchu i teorii grawitacji, autorem "Principia Mathematica"?', answer: 'Isaac Newton', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był królem Francji nazywanym "Królem Słońce", panującym najdłużej w historii Europy?', answer: 'Ludwik XIV', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest izraelskim politykiem, wieloletnim premierem Izraela w latach 2009-2021 i ponownie od 2022?', answer: 'Benjamin Netanjahu', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był prezydentem Egiptu, który podpisał pokój z Izraelem w 1979 roku (Camp David)?', answer: 'Anwar as-Sadat', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest twórcą filozofii egzystencjalizmu, autorem "Bytu i nicości"?', answer: 'Jean-Paul Sartre', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był pierwszym prezydentem Francji V Republiki?', answer: 'Charles de Gaulle', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim fizykiem, kierownikiem Projektu Manhattan, twórcą bomby atomowej?', answer: 'Robert Oppenheimer', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był austriackim psychiatrą, twórcą psychoanalizy?', answer: 'Zygmunt Freud', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest szwajcarskim psychologiem, twórcą psychologii analitycznej, uczniem Freuda?', answer: 'Carl Gustav Jung', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był królową Egiptu, ostatnią władczynią dynastii ptolemejskiej?', answer: 'Kleopatra VII', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim biznesmenem, twórcą firmy Berkshire Hathaway, partnerem Warrena Buffetta, zmarłym w 2023?', answer: 'Charlie Munger', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był pierwszym premierem niepodległych Indii?', answer: 'Jawaharlal Nehru', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest brytyjskim biologiem ewolucyjnym, autorem "Samolubnego genu"?', answer: 'Richard Dawkins', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był królem Hiszpanii, który abdykował na rzecz syna Filipa VI w 2014 roku?', answer: 'Juan Carlos I', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest francuskim filozofem oświecenia, autorem "Umowy społecznej"?', answer: 'Jan Jakub Rousseau', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był rzymskim politykiem i wodzem, którego zamordowano w Idy Marcowe 44 p.n.e.?', answer: 'Juliusz Cezar', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańską pisarką i aktywistką na rzecz praw kobiet, autorką "Mistyki kobiecości"?', answer: 'Betty Friedan', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Który polski król pokonał Turków pod Wiedniem w 1683 roku?', answer: 'Jan III Sobieski', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest indyjskim politykiem, obecnym (2026) premierem Indii, u władzy od 2014 roku?', answer: 'Narendra Modi', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był pierwszym człowiekiem, który samotnie okrążył kulę ziemską drogą morską (żeglarz)?', answer: 'Ferdynand Magellan (ekspedycja, choć sam zginął w drodze)', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest amerykańskim przedsiębiorcą, twórcą firmy Netflix?', answer: 'Reed Hastings', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto był premierem Wielkiej Brytanii, który ostatecznie wyprowadził kraj z Unii Europejskiej w 2020 roku?', answer: 'Boris Johnson', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest francuskim prezydentem urzędującym od 2017 roku (do 2026)?', answer: 'Emmanuel Macron', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest chińskim przywódcą, sekretarzem generalnym Komunistycznej Partii Chin od 2012 roku?', answer: 'Xi Jinping', type: 'normal', difficulty: 'h' },
    { category: 'Znane osobistości', question: 'Kto jest ukraińskim prezydentem, byłym aktorem, urzędującym od 2019 roku?', answer: 'Wołodymyr Zełenski', type: 'normal', difficulty: 'h' },
    // --- Film i Seriale (trudne) ---
    { category: 'Film i Seriale', question: 'Kto reżyserował film "2001: Odyseja kosmiczna" (1968)?', answer: 'Stanley Kubrick', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się superkomputer/sztuczna inteligencja z filmu "2001: Odyseja kosmiczna"?', answer: 'HAL 9000', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Chinatown" (1974) w reżyserii Romana Polańskiego?', answer: 'Jack Nicholson', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski reżyser, twórca "Nożu w wodzie", "Chinatown" i "Pianisty"?', answer: 'Roman Polański', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Który film zdobył Oscara dla najlepszego filmu w 1994 roku, opowiadający o Oskarze Schindlerze?', answer: 'Lista Schindlera', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował "Listę Schindlera"?', answer: 'Steven Spielberg', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się aktor, który zagrał głównego bohatera w filmie "Pianista" (2002), reżyserowanym przez Polańskiego?', answer: 'Adrien Brody', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował trylogię "Ojciec chrzestny"?', answer: 'Francis Ford Coppola', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak ma na imię główny bohater "Ojca chrzestnego", grany przez Marlona Brando?', answer: 'Vito Corleone', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał rolę Michaela Corleone w "Ojcu chrzestnym"?', answer: 'Al Pacino', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Który reżyser stworzył "Siedem samurajów" i "Rashomon", uznawany za jednego z ojców kina japońskiego?', answer: 'Akira Kurosawa', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się szwedzki reżyser, autor "Siódmej pieczęci" i "Fanny i Aleksander"?', answer: 'Ingmar Bergman', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Kabaret" (1972), za co otrzymała Oscara?', answer: 'Liza Minnelli', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się reżyser filmu "Metropolis" (1927), pioniera kina niemieckiego ekspresjonizmu?', answer: 'Fritz Lang', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto skomponował muzykę do filmu "Nowe Kino Paradiso" i wielu innych filmów Giuseppe Tornatore?', answer: 'Ennio Morricone', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się polski reżyser dokumentalista, twórca "Siedmiu kobiet w różnym wieku" i innych filmów o codzienności PRL?', answer: 'Kazimierz Karabasz', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę żeńską w filmie "Casablanca" (1942)?', answer: 'Ingrid Bergman', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się bar w filmie "Casablanca", prowadzony przez bohatera granego przez Humphreya Bogarta?', answer: 'Rick\'s Café Américain', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował "Osiem i pół" (1963), uznawany za jeden z najważniejszych filmów w historii kina?', answer: 'Federico Fellini', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się francuski reżyser Nowej Fali, twórca "Bez tchu" (À bout de souffle)?', answer: 'Jean-Luc Godard', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zdobył Oscara dla najlepszej reżyserii za film "Parasite" (2019), pierwszy nieanglojęzyczny film z Oscarem dla najlepszego filmu?', answer: 'Bong Joon-ho', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się główny bohater serialu "Peaky Blinders", przywódca gangu z Birmingham?', answer: 'Thomas Shelby', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał Thomasa Shelby\'ego w serialu "Peaky Blinders"?', answer: 'Cillian Murphy', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial dokumentalny BBC o dzikiej przyrodzie, narrowany przez Davida Attenborough, jeden z najbardziej znanych na świecie?', answer: 'Planet Earth (lub Blue Planet)', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Nomadland" (2020), za co zdobyła Oscara dla najlepszej aktorki?', answer: 'Frances McDormand', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował "Interstellar" (2014)?', answer: 'Christopher Nolan', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się fikcyjna planeta z lodowatymi falami w filmie "Interstellar"?', answer: 'Miller\'s Planet', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto zagrał główną rolę w filmie "Requiem dla snu" (2000)?', answer: 'Ellen Burstyn (lub Jared Leto)', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Kto reżyserował "Requiem dla snu"?', answer: 'Darren Aronofsky', type: 'normal', difficulty: 'h' },
    { category: 'Film i Seriale', question: 'Jak nazywa się serial HBO o rodzinie Roy zarządzającej medialnym imperium, emitowany w latach 2018-2023?', answer: 'Sukcesja (Succession)', type: 'normal', difficulty: 'h' },
    // --- Język polski (trudne) ---
    { category: 'Język polski', question: 'Kto napisał "Trans-Atlantyk"?', answer: 'Witold Gombrowicz', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się epoka literacka trwająca w Polsce mniej więcej od 1918 do 1939 roku?', answer: 'Dwudziestolecie międzywojenne', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Ferdydurke", powieści krytykującej formę i konwenanse?', answer: 'Witold Gombrowicz', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się grupa poetycka skupiona wokół czasopisma "Skamander" w dwudziestoleciu międzywojennym?', answer: 'Skamandryci', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Przedwiośnie"?', answer: 'Stefan Żeromski', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się gatunek literacki łączący cechy epiki i liryki, opowiadający zwykle o bohaterskich lub tragicznych wydarzeniach, często w formie wierszowanej?', answer: 'Ballada', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Lalki", której głównym bohaterem jest Stanisław Wokulski?', answer: 'Bolesław Prus', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się nurt literacki nawiązujący do antyku, kładący nacisk na harmonię i umiar, dominujący w Polsce w XVI wieku?', answer: 'Renesans (klasycyzm renesansowy)', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Trenów", cyklu utworów żałobnych po śmierci córki Urszulki?', answer: 'Jan Kochanowski', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się epoka literacka między barokiem a romantyzmem, kładąca nacisk na rozum, w Polsce związana z Sejmem Wielkim?', answer: 'Oświecenie', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Powrotu posła", komedii politycznej z epoki oświecenia?', answer: 'Julian Ursyn Niemcewicz', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się figura stylistyczna polegająca na celowym powtórzeniu tego samego słowa lub zwrotu na początku kolejnych wersów?', answer: 'Anafora', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Chłopów", za które otrzymał Nagrodę Nobla w 1924 roku?', answer: 'Władysław Reymont', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się rodzaj rymu, w którym akcentowana jest ostatnia sylaba wersu?', answer: 'Rym męski', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Kordiana"?', answer: 'Juliusz Słowacki', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się nurt filozoficzny i literacki polskiego romantyzmu, głoszący, że Polska jest "Mesjaszem narodów"?', answer: 'Mesjanizm', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Nie-Boską komedię"?', answer: 'Zygmunt Krasiński', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się utwór literacki, w którym autor w sposób ukryty i aluzyjny krytykuje osoby lub instytucje?', answer: 'Satyra (lub pamflet)', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Wesela", dramatu symbolicznego osnutego wokół wesela Rydla w Bronowicach?', answer: 'Stanisław Wyspiański', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się środek stylistyczny polegający na przedstawieniu jednego zjawiska w kategoriach innego, bez użycia porównania (np. "morze łez")?', answer: 'Metafora', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Granicę", powieść o karierze i moralnym upadku Zenona Ziembiewicza?', answer: 'Zofia Nałkowska', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się epoka literacka po romantyzmie, kładąca nacisk na realizm i pracę organiczną, w Polsce trwająca od ok. 1864?', answer: 'Pozytywizm', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się rodzaj wiersza o stałej, sformalizowanej budowie 14-wersowej, popularny w renesansie?', answer: 'Sonet', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Medaliony", zbiór opowiadań o okrucieństwach II wojny światowej?', answer: 'Zofia Nałkowska', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się gatunek epicki, krótkie utwory prozą, np. "Katarynka" Prusa?', answer: 'Nowela', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto jest autorem "Innego świata", wspomnień z sowieckiego łagru?', answer: 'Gustaw Herling-Grudziński', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się dział wiedzy o języku zajmujący się znaczeniem wyrazów?', answer: 'Semantyka', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Kto napisał "Pamiętnik z powstania warszawskiego"?', answer: 'Miron Białoszewski', type: 'normal', difficulty: 'h' },
    { category: 'Język polski', question: 'Jak nazywa się figura retoryczna, w której zestawia się dwa przeciwstawne pojęcia dla podkreślenia kontrastu?', answer: 'Antyteza', type: 'normal', difficulty: 'h' },
    // --- Biologia (trudne) ---
    { category: 'Biologia', question: 'Jak nazywa się organellum komórkowe odpowiedzialne za produkcję energii (ATP)?', answer: 'Mitochondrium', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces syntezy białek na podstawie informacji zawartej w mRNA?', answer: 'Translacja', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces przepisywania informacji genetycznej z DNA na RNA?', answer: 'Transkrypcja', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Ile par chromosomów ma człowiek?', answer: '23', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się organellum komórkowe zawierające enzymy trawienne, odpowiedzialne za rozkład zbędnych substancji?', answer: 'Lizosom', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się gałąź biologii zajmująca się badaniem grzybów?', answer: 'Mikologia', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym organizm rozpoznaje i niszczy własne patogeny za pomocą przeciwciał?', answer: 'Odpowiedź immunologiczna (odporność humoralna)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się enzym rozkładający skrobię, obecny w ślinie?', answer: 'Amylaza (ptialina)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces łączenia się dwóch gamet w jedną komórkę (zygotę)?', answer: 'Zapłodnienie (fuzja gamet)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się hormon wydzielany przez trzustkę, obniżający poziom glukozy we krwi?', answer: 'Insulina', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się hormon podnoszący poziom glukozy we krwi, antagonista insuliny?', answer: 'Glukagon', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się jednostka strukturalna i funkcjonalna układu nerwowego?', answer: 'Neuron', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się substancja przekazująca sygnały między neuronami w synapsie?', answer: 'Neurotransmiter', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym organizmy o wspólnym pochodzeniu ewoluują w różnych kierunkach pod wpływem różnych środowisk?', answer: 'Radiacja adaptacyjna (lub dywergencja)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się dziedzina biologii badająca wzajemne relacje organizmów ze środowiskiem?', answer: 'Ekologia', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się zjawisko współżycia dwóch organizmów, z którego korzyść czerpią oba (np. mrówki i mszyce)?', answer: 'Mutualizm (symbioza)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces utraty różnorodności genetycznej w małej, izolowanej populacji?', answer: 'Dryf genetyczny', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się jednostka klasyfikacji biologicznej znajdująca się między rodzajem a rzędem?', answer: 'Rodzina', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym roślina reaguje wzrostem w kierunku źródła światła?', answer: 'Fototropizm', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się tkanka roślinna odpowiedzialna za transport wody i soli mineralnych od korzeni do liści?', answer: 'Ksylem (drewno)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się tkanka roślinna transportująca produkty fotosyntezy (np. cukry) w roślinie?', answer: 'Floem (łyko)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces podziału bakterii, w którym jedna komórka dzieli się na dwie identyczne?', answer: 'Podział prosty (rozmnażanie bezpłciowe)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się nauka o budowie i funkcjonowaniu komórek?', answer: 'Cytologia', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się enzym umożliwiający replikację DNA?', answer: 'Polimeraza DNA', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się zjawisko, w którym gen ma więcej niż jeden efekt fenotypowy?', answer: 'Plejotropia', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces gojenia ran u roślin poprzez tworzenie tkanki wtórnej?', answer: 'Kalusogeneza (tworzenie kalusa)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się największa grupa systematyczna w klasyfikacji biologicznej (najwyższa ranga)?', answer: 'Domena (nad królestwem)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Ile domen życia wyróżnia się we współczesnej klasyfikacji?', answer: '3 (bakterie, archeony, eukarionty)', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się choroba genetyczna spowodowana obecnością dodatkowego chromosomu 21?', answer: 'Zespół Downa', type: 'normal', difficulty: 'h' },
    { category: 'Biologia', question: 'Jak nazywa się proces, w którym organizmy jednokomórkowe łączą materiał genetyczny bez rozmnażania?', answer: 'Koniugacja', type: 'normal', difficulty: 'h' },
    // --- Technika (trudne) ---
    { category: 'Technika', question: 'Kto skonstruował pierwszy działający telegraf elektryczny na dużą skalę, wraz z alfabetem nazwanym jego imieniem?', answer: 'Samuel Morse', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się proces produkcji stali z surówki żelaza poprzez wydmuchiwanie powietrza, opracowany przez Henry\'ego Bessemera?', answer: 'Proces bessemerowski', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy silnik spalinowy z zapłonem iskrowym, praktyczny do zastosowań pojazdowych?', answer: 'Nikolaus Otto (cykl Otta)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto był głównym inżynierem projektu mostu Golden Gate w San Francisco?', answer: 'Joseph Strauss', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia druku łącząca warstwy proszku metalowego stapianego laserem, stosowana w przemyśle lotniczym?', answer: 'Druk 3D metodą SLS/DMLS (spiekanie laserowe)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny akumulator elektryczny (stos Volty)?', answer: 'Alessandro Volta', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się jednostka miary używana do określania mocy silników spalinowych, popularna przed wprowadzeniem waty?', answer: 'Koń mechaniczny (KM)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny telefon komórkowy, zaprezentowany w 1973 roku?', answer: 'Martin Cooper (Motorola)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca na przesyłanie danych za pomocą światła w kablach światłowodowych?', answer: 'Transmisja światłowodowa', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy sztuczny rozrusznik serca możliwy do wszczepienia?', answer: 'Rune Elmqvist (razem z Åke Senningiem)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się most w Wenecji łączący dwie części miasta przez Wielki Kanał, jeden z najstarszych mostów miasta?', answer: 'Most Rialto', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny silnik odrzutowy w Wielkiej Brytanii?', answer: 'Frank Whittle', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technika obrazowania medycznego wykorzystująca promieniowanie rentgenowskie do tworzenia przekrojów ciała?', answer: 'Tomografia komputerowa (CT)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto odkrył promieniowanie rentgenowskie w 1895 roku?', answer: 'Wilhelm Röntgen', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się najdłuższy tunel kolejowy świata, przebiegający przez Alpy Szwajcarskie?', answer: 'Tunel bazowy Gotharda', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy sztuczny satelita telekomunikacyjny umieszczony na orbicie geostacjonarnej?', answer: 'Syncom (projekt NASA, Harold Rosen jako główny inżynier)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się rodzaj energii odnawialnej pozyskiwanej z ciepła wnętrza Ziemi?', answer: 'Energia geotermalna', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny silnik elektryczny prądu stałego?', answer: 'Thomas Davenport (lub Michael Faraday jako prekursor)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca komputerom rozpoznawać i przetwarzać ludzką mowę?', answer: 'Rozpoznawanie mowy (speech recognition)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się najwyższy most drogowy świata (do niedawna), znajdujący się w Chinach, nad rzeką Beipan?', answer: 'Most Duge (Beipanjiang)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się pierwszy komputer elektroniczny ogólnego przeznaczenia, zbudowany w USA w 1945 roku?', answer: 'ENIAC', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny mikroprocesor, wprowadzony przez firmę Intel w 1971 roku?', answer: 'Zespół Federico Fagginа (Intel 4004)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia bezprzewodowego przesyłania energii elektrycznej badana już przez Nikolę Teslę?', answer: 'Bezprzewodowy przesył energii', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się pierwszy sztuczny satelita komunikacyjny wystrzelony na orbitę w 1962 roku, umożliwiający pierwszą transmisję TV przez Atlantyk?', answer: 'Telstar 1', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszą praktyczną maszynę parową wykorzystywaną do napędu lokomotyw?', answer: 'George Stephenson', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się najstarsza czynna linia kolejowa na świecie, otwarta w Anglii w 1825 roku?', answer: 'Stockton and Darlington Railway', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca na tworzenie trójwymiarowych obrazów za pomocą interferencji światła laserowego?', answer: 'Holografia', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto opracował pierwszy skuteczny system zapobiegania rdzewieniu żelaza poprzez cynkowanie?', answer: 'Stanislas Sorel (galwanizacja)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie mierzące przyspieszenie, stosowane m.in. w smartfonach?', answer: 'Akcelerometr', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia umożliwiająca płatności zbliżeniowe kartą lub telefonem?', answer: 'NFC (Near Field Communication)', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się urządzenie zamieniające energię mechaniczną wiatru na energię elektryczną?', answer: 'Turbina wiatrowa', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny silnik Diesla, opatentowany w 1892 roku?', answer: 'Rudolf Diesel', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się technologia pozwalająca na przechowywanie energii elektrycznej w bateriach litowo-jonowych?', answer: 'Akumulator litowo-jonowy', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Jak nazywa się pierwszy komercyjny samolot naddźwiękowy, eksploatowany do 2003 roku?', answer: 'Concorde', type: 'normal', difficulty: 'h' },
    { category: 'Technika', question: 'Kto skonstruował pierwszy praktyczny silnik rakietowy na paliwo ciekłe?', answer: 'Robert Goddard', type: 'normal', difficulty: 'h' },
    // --- Sport (trudne) ---
    { category: 'Sport', question: 'Kto zdobył mistrzostwo świata w szachach nieprzerwanie najdłużej w historii (spośród klasycznych mistrzów)?', answer: 'Emanuel Lasker (27 lat)', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy turniej golfowy rozgrywany corocznie w Augusta w USA?', answer: 'The Masters', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ilu zawodników liczy drużyna w meczu baseballu na boisku?', answer: '9', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Kto zdobył najwięcej medali olimpijskich w historii igrzysk (łącznie, pływak amerykański)?', answer: 'Michael Phelps', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile medali olimpijskich zdobył łącznie Michael Phelps w karierze?', answer: '28', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najstarszy klub piłkarski na świecie działający nieprzerwanie, założony w Anglii w 1857?', answer: 'Sheffield FC', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Kto ustanowił rekord świata w biegu na 100 metrów mężczyzn (9,58 s), obowiązujący od 2009 roku?', answer: 'Usain Bolt', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile wynosi rekord świata w biegu na 100 metrów mężczyzn ustanowiony przez Usaina Bolta?', answer: '9,58 s', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Który szwedzki żużlowiec zdobył mistrzostwo świata na żużlu sześciokrotnie, rekordzistą liczby tytułów?', answer: 'Tony Rickardsson', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Który kraj zdobył najwięcej medali złotych w historii zimowych igrzysk olimpijskich?', answer: 'Norwegia', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy klubowy turniej rugby na półkuli południowej?', answer: 'Super Rugby', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile lat trwał najdłuższy mecz tenisowy w historii, rozegrany na Wimbledonie w 2010 roku (John Isner vs Nicolas Mahut)?', answer: 'Mecz trwał ponad 11 godzin, rozłożony na 3 dni', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najstarszy klub koszykarski w Europie z tytułami mistrzowskimi, hiszpański klub z Madrytu?', answer: 'Real Madryt (sekcja koszykówki)', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile złotych medali olimpijskich zdobyła w karierze polska lekkoatletka Irena Szewińska?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się dyscyplina łącząca narciarstwo biegowe ze strzelectwem?', answer: 'Biathlon', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Kto jest rekordzistą świata w skoku wzwyż mężczyzn, Kubańczyk, rekord z 1993 roku (2,45 m)?', answer: 'Javier Sotomayor', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy wyścig konny w Wielkiej Brytanii, rozgrywany w Ascot?', answer: 'Royal Ascot', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile złotych medali olimpijskich zdobyła gimnastyczka Simone Biles do 2024 roku?', answer: '7', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się polski klub piłkarski z Chorzowa, jeden z najbardziej utytułowanych w historii polskiej ligi?', answer: 'Ruch Chorzów', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile razy Legia Warszawa zdobyła mistrzostwo Polski w piłce nożnej (do 2024, w przybliżeniu)?', answer: 'Ponad 15 razy', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najstarsza istniejąca liga piłkarska na świecie, założona w Anglii w 1888 roku?', answer: 'Football League', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Kto zdobył pierwsze mistrzostwo świata w piłce nożnej w 1930 roku (kraj-organizator i zwycięzca)?', answer: 'Urugwaj', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy wyścig żeglarski dookoła świata, rozgrywany samotnie i bez zawijania do portów?', answer: 'Vendée Globe', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Kto był pierwszym człowiekiem, który zdobył wszystkie 14 ośmiotysięczników bez dodatkowego tlenu?', answer: 'Reinhold Messner', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najwyższy szczyt świata poza Mount Everestem, drugi co do wysokości?', answer: 'K2', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Który polski himalaista jako pierwszy zdobył Mount Everest zimą (1980)?', answer: 'Krzysztof Wielicki i Leszek Cichy (Cichy jako pierwszy stanął na szczycie)', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najbardziej prestiżowy maraton na świecie, jeden z tzw. World Marathon Majors, rozgrywany w Bostonie?', answer: 'Boston Marathon', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ilu zawodników liczy drużyna w meczu curlingu?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Która polska oszczepniczka zdobyła srebrny medal olimpijski w Tokio 2020, a wcześniej licytowała medal na cele charytatywne?', answer: 'Maria Andrejczyk', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się dyscyplina sportowa łącząca skoki narciarskie z biegiem narciarskim?', answer: 'Kombinacja norweska', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najstarszy klub tenisowy na świecie, gospodarz Wimbledonu?', answer: 'All England Lawn Tennis and Croquet Club', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile Wielkich Szlemów w singlu wygrał Roger Federer w karierze?', answer: '20', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Który francuski trener poprowadził polskich siatkarzy do złota mistrzostw świata w 2014 roku?', answer: 'Stéphane Antiga', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Jak nazywa się najstarszy klub żużlowy w Polsce, założony w latach 30. XX wieku?', answer: 'Unia Leszno (lub inny historyczny klub)', type: 'normal', difficulty: 'h' },
    { category: 'Sport', question: 'Ile bramek zdobył Pele w oficjalnych meczach w swojej karierze klubowej i reprezentacyjnej (w przybliżeniu)?', answer: 'Ponad 1000 (dokładna liczba sporna)', type: 'normal', difficulty: 'h' },
    // --- Zwierzęta i przyroda (trudne) ---
    { category: 'Zwierzęta i przyroda', question: 'Który powolny, nocny naczelny z Azji Południowo-Wschodniej jest jednym z nielicznych jadowitych ssaków?', answer: 'Lori (wolno chodzący)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko, w którym niektóre gatunki ryb zmieniają płeć z samca na samicę w ciągu życia?', answer: 'Protandroia (protandryczny hermafrodytyzm)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia ma najkrótszy udokumentowany czas ciąży spośród ssaków (ok. 12-13 dni)?', answer: 'Chomik (lub oposum wirginijski)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się jedyny gatunek niedźwiedzia żyjący na półkuli południowej, w Ameryce Południowej?', answer: 'Niedźwiedź okularowy', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko echolokacji stosowane przez nietoperze i delfiny do orientacji w przestrzeni?', answer: 'Echolokacja', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko, w którym samiec niektórych gatunków ptaków buduje skomplikowane konstrukcje, by przyciągnąć samicę?', answer: 'Zachowanie godowe altanników (bower building)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia potrafi przetrwać ekstremalne warunki, w tym próżnię kosmiczną, dzięki kryptobiozie?', answer: 'Niesporczak', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko masowej wędrówki krabów lądowych na Wyspie Bożego Narodzenia?', answer: 'Migracja krabów czerwonych', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się gatunek ptaka niezdolnego do lotu, endemiczny dla Nowej Zelandii, symbol narodowy kraju?', answer: 'Kiwi', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się najstarszy żyjący gatunek żółwia lądowego, znany z bardzo długiego życia (ponad 190 lat)?', answer: 'Żółw olbrzymi (Jonathan, żółw z Seszeli)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się proces, w którym niektóre gatunki zwierząt zmieniają płeć w ciągu życia, np. u niektórych ryb?', answer: 'Hermafrodytyzm sekwencyjny', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek ptaka wykonuje najdłuższą migrację na świecie, docierając z Arktyki do Antarktyki?', answer: 'Rybitwa popielata (rybitwa arktyczna)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile wynosi maksymalna prędkość, jaką może osiągnąć sokół wędrowny podczas lotu nurkowego?', answer: 'Ponad 300 km/h', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko, w którym zwierzę udaje martwe, by uniknąć drapieżnika?', answer: 'Tanatoza', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia ma najdłuższy okres ciąży spośród ssaków lądowych?', answer: 'Słoń afrykański (ok. 22 miesiące)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko biologiczne, w którym organizmy dwóch różnych gatunków wyewoluowały podobne cechy niezależnie od siebie?', answer: 'Konwergencja ewolucyjna', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki ptak jest jedynym zdolnym do lotu wstecz dzięki specjalnej budowie skrzydeł?', answer: 'Koliber', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się gatunek ryby zdolnej do generowania silnego wyładowania elektrycznego, używanego do obrony i polowania?', answer: 'Węgorz elektryczny', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile komór ma serce ptaka?', answer: '4', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko masowego rozmnażania się szarańczy prowadzące do plag?', answer: 'Gradacja (plaga szarańczy)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia jest uważany za najstarszy żyjący gatunek kręgowca (żywa skamielina), ryba z Oceanu Indyjskiego?', answer: 'Latimeria (rybia żywa skamielina)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko biologiczne polegające na okresowej zmianie ubarwienia zwierzęcia w zależności od pory roku?', answer: 'Mimikra sezonowa (linienie sezonowe)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile lat może żyć rekin grenlandzki, uznawany za najdłużej żyjącego kręgowca?', answer: 'Ponad 300-400 lat', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się jedyny ssak zdolny do prawdziwego, aktywnego lotu?', answer: 'Nietoperz', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek zwierzęcia potrafi regenerować całe kończyny, a nawet część mózgu, popularny w badaniach naukowych?', answer: 'Aksolotl', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko wędrówki łososi z morza do rzek w celu rozrodu?', answer: 'Migracja tarłowa (anadromiczna)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Ile serc ma kałamarnica olbrzymia?', answer: '3', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się gatunek meduzy teoretycznie zdolny do "cofania" swojego cyklu życiowego, uznawany za biologicznie nieśmiertelny?', answer: 'Turritopsis dohrnii (meduza nieśmiertelna)', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jaki gatunek ptaka buduje największe gniazdo spośród wszystkich ptaków świata?', answer: 'Orzeł przedni (lub kondor, zależnie od definicji "największe")', type: 'normal', difficulty: 'h' },
    { category: 'Zwierzęta i przyroda', question: 'Jak nazywa się zjawisko, w którym samice niektórych gatunków owadów zjadają samca po kopulacji?', answer: 'Kanibalizm seksualny', type: 'normal', difficulty: 'h' },
    // --- Astronomia (trudne) ---
    { category: 'Astronomia', question: 'Jak nazywa się teoria opisująca, że wszechświat rozszerza się coraz szybciej, napędzana przez tajemniczą siłę?', answer: 'Ciemna energia (przyspieszona ekspansja)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się niewidzialna forma materii stanowiąca większość masy wszechświata, wykrywana tylko poprzez grawitację?', answer: 'Ciemna materia', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się misja kosmiczna, która w 2019 roku wykonała pierwsze zdjęcie horyzontu zdarzeń czarnej dziury?', answer: 'Event Horizon Telescope', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się gwiazdozbiór, w którym leży najjaśniejsza gwiazda nocnego nieba, Syriusz?', answer: 'Wielki Pies', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się egzoplaneta odkryta w 2016 roku, krążąca wokół najbliższej gwiazdy Słońca, w strefie zamieszkiwalnej?', answer: 'Proxima Centauri b', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko, w którym Ziemia znajduje się dokładnie między Słońcem a inną planetą, widoczną wtedy najjaśniej?', answer: 'Opozycja planety', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się misja kosmiczna, która w 2021 roku dostarczyła na Ziemię próbki z asteroidy Ryugu?', answer: 'Hayabusa2', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się gwiazdozbiór zodiakalny, w którym znajduje się środek Drogi Mlecznej?', answer: 'Strzelec', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko rozbłysków słonecznych, mogące zakłócać komunikację radiową na Ziemi?', answer: 'Rozbłysk słoneczny (flara)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się egzoplaneta odkryta w 1995 roku, pierwsza znaleziona wokół gwiazdy podobnej do Słońca?', answer: '51 Pegasi b', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się najbliższa Ziemi galaktyka spiralna, widoczna gołym okiem na półkuli północnej?', answer: 'Galaktyka Andromedy', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile lat świetlnych dzieli Ziemię od Galaktyki Andromedy?', answer: 'Ok. 2,5 miliona lat świetlnych', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się teoria opisująca los wszechświata polegający na jego nieskończonej ekspansji i ochłodzeniu?', answer: 'Wielkie Zamrożenie (Big Freeze)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się gwiazda neutronowa emitująca regularne impulsy promieniowania, wykorzystywana jako "kosmiczny zegar"?', answer: 'Pulsar', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile planet karłowatych jest oficjalnie uznanych przez Międzynarodową Unię Astronomiczną (stan na 2024)?', answer: '5 (Pluton, Ceres, Eris, Haumea, Makemake)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się największy księżyc Jowisza i jednocześnie największy księżyc w Układzie Słonecznym?', answer: 'Ganimedes', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się największy księżyc Saturna, jedyny w Układzie Słonecznym z gęstą atmosferą?', answer: 'Tytan', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile wynosi masa Słońca w porównaniu do masy Ziemi (w przybliżeniu, ile razy większa)?', answer: 'Ok. 333 000 razy', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko, w którym gwiazda zmienia jasność w regularnych cyklach z powodu pulsacji?', answer: 'Gwiazda zmienna (cefeida)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się teoria opisująca możliwe istnienie wielu wszechświatów równoległych?', answer: 'Teoria multiwersum', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się misja NASA, która jako pierwsza dostarczyła zdjęcia z powierzchni Marsa w 1976 roku?', answer: 'Viking 1', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się sonda kosmiczna, która jako pierwsza opuściła Układ Słoneczny, wystrzelona w 1977 roku?', answer: 'Voyager 1', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko rezonansu orbitalnego między księżycami Jowisza Io, Europą i Ganimedesem?', answer: 'Rezonans Laplace\'a', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się najjaśniejszy obiekt na nocnym niebie po Księżycu (planeta)?', answer: 'Wenus', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się zjawisko, w którym czarna dziura "paruje", tracąc masę poprzez promieniowanie?', answer: 'Promieniowanie Hawkinga', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się polski astronom, twórca pierwszego katalogu gwiazd południowego nieba, żyjący w XVII wieku?', answer: 'Jan Heweliusz', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się jednostka odległości w astronomii równa odległości, jaką światło przemierza w ciągu roku?', answer: 'Rok świetlny', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się mgławica powstała po eksplozji supernowej w 1054 roku, obserwowanej przez chińskich astronomów?', answer: 'Mgławica Kraba', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Jak nazywa się teoria opisująca ostateczny kolaps wszechświata z powrotem do punktu osobliwości?', answer: 'Wielki Kolaps (Big Crunch)', type: 'normal', difficulty: 'h' },
    { category: 'Astronomia', question: 'Ile wynosi w przybliżeniu liczba gwiazd w Drodze Mlecznej (rząd wielkości)?', answer: 'Ok. 100-400 miliardów', type: 'normal', difficulty: 'h' },

    // --- Szacowanie (dogrywka) ---
    { category: 'Szacowanie', question: 'Jaka jest wysokość Mount Everestu w metrach?', answer: 'Ok. 8849 m', type: 'estimate', numericAnswer: 8849 },
    { category: 'Szacowanie', question: 'Ile kilometrów liczy Wisła (długość w km)?', answer: 'Ok. 1047 km', type: 'estimate', numericAnswer: 1047 },
    { category: 'Szacowanie', question: 'W którym roku urodził się Mikołaj Kopernik?', answer: '1473', type: 'estimate', numericAnswer: 1473 },
    { category: 'Szacowanie', question: 'Ile mieszkańców ma (w przybliżeniu, w milionach) Warszawa?', answer: 'Ok. 1,86 mln', type: 'estimate', numericAnswer: 1.86 },
    { category: 'Szacowanie', question: 'Jaka jest odległość Ziemi od Księżyca w tysiącach km?', answer: 'Ok. 384 tys. km', type: 'estimate', numericAnswer: 384 },
    { category: 'Szacowanie', question: 'Ile metrów ma najwyższy budynek świata (Burj Khalifa)?', answer: 'Ok. 828 m', type: 'estimate', numericAnswer: 828 }
  ];


  function withIds(list) {
    return list.map(function (q) {
      var copy = Object.assign({}, q);
      if (!copy.id) copy.id = WL.uid('q');
      if (!copy.type) copy.type = 'normal';
      if (!copy.difficulty) copy.difficulty = 'm';
      if (copy.used === undefined) copy.used = false;
      return copy;
    });
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var seeded = withIds(DEFAULT_QUESTIONS);
        save(seeded);
        return seeded;
      }
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        var seeded2 = withIds(DEFAULT_QUESTIONS);
        save(seeded2);
        return seeded2;
      }
      return withIds(parsed);
    } catch (e) {
      console.warn('Nie udało się wczytać banku pytań, ładuję domyślne.', e);
      var fallback = withIds(DEFAULT_QUESTIONS);
      save(fallback);
      return fallback;
    }
  }

  function save(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { console.warn(e); }
  }

  function resetToDefaults() {
    var seeded = withIds(DEFAULT_QUESTIONS);
    save(seeded);
    return seeded;
  }

  // ------------------------------------------------------------------
  // QuestionBank: a tiny stateful wrapper with change notifications and
  // "used" tracking (so a game doesn't repeat questions within a session).
  // ------------------------------------------------------------------
  function QuestionBank() {
    this.items = load();
    this._listeners = [];
    this._decks = {}; // draw() cache — see draw() below
  }

  QuestionBank.prototype.onChange = function (fn) { this._listeners.push(fn); };
  QuestionBank.prototype._fire = function () { this._listeners.forEach(function (fn) { fn(); }); };

  QuestionBank.prototype.all = function () { return this.items; };

  QuestionBank.prototype.categories = function () {
    var set = {};
    this.items.forEach(function (q) { set[q.category] = true; });
    return Object.keys(set).sort();
  };

  QuestionBank.prototype.add = function (q) {
    q = Object.assign({ id: WL.uid('q'), type: 'normal', difficulty: 'm', used: false }, q);
    this.items.push(q);
    save(this.items);
    this._decks = {};
    this._fire();
    return q;
  };

  QuestionBank.prototype.update = function (id, patch) {
    var idx = this.items.findIndex(function (q) { return q.id === id; });
    if (idx === -1) return null;
    this.items[idx] = Object.assign({}, this.items[idx], patch);
    save(this.items);
    this._decks = {};
    this._fire();
    return this.items[idx];
  };

  QuestionBank.prototype.remove = function (id) {
    this.items = this.items.filter(function (q) { return q.id !== id; });
    save(this.items);
    this._decks = {};
    this._fire();
  };

  QuestionBank.prototype.resetDefaults = function () {
    this.items = resetToDefaults();
    this._decks = {};
    this._fire();
  };

  QuestionBank.prototype.clearAll = function () {
    this.items = [];
    save(this.items);
    this._decks = {};
    this._fire();
  };

  QuestionBank.prototype.importJson = function (jsonText, mode) {
    var parsed;
    try { parsed = JSON.parse(jsonText); } catch (e) { throw new Error('Nieprawidłowy plik JSON.'); }
    if (!Array.isArray(parsed)) throw new Error('Plik musi zawierać listę pytań (tablicę JSON).');
    var clean = parsed.filter(function (q) { return q && q.question && q.answer; }).map(function (q) {
      return {
        id: WL.uid('q'),
        category: q.category || 'Wiedza ogólna',
        question: q.question,
        answer: q.answer,
        type: q.type === 'estimate' ? 'estimate' : 'normal',
        difficulty: q.difficulty || 'm',
        numericAnswer: q.numericAnswer,
        used: false
      };
    });
    if (mode === 'replace') this.items = clean;
    else this.items = this.items.concat(clean);
    save(this.items);
    this._decks = {};
    this._fire();
    return clean.length;
  };

  QuestionBank.prototype.exportJson = function () {
    return JSON.stringify(this.items, null, 2);
  };

  // ------------------------------------------------------------------
  // Drawing questions — two fairness guarantees stacked on top of each
  // other, both "equal chance", but at different levels:
  //
  //   1. CATEGORY fairness. When no specific category is requested (the
  //      normal "losowa kategoria" case), every category that still has
  //      an eligible question gets an EQUAL chance of being asked next —
  //      regardless of how many questions happen to be typed into it. A
  //      flat draw straight from the whole bank would otherwise let big
  //      categories (100+ questions) drown out small ones (a dozen
  //      questions) almost completely, which is what "nie po równo"
  //      actually looked like in practice.
  //   2. QUESTION fairness within that pool (whichever category got
  //      picked, or the whole matching pool if a category was requested
  //      explicitly): a shuffled "deck" per (type, category, difficulty)
  //      combo, dealt without replacement. Every question in the pool is
  //      guaranteed to come up exactly once before any of them can repeat,
  //      then the deck reshuffles for a fresh lap. This also has the nice
  //      property that the *order* within a lap is a genuine unbiased
  //      shuffle (Fisher–Yates), not just "uniform pick, but recomputed
  //      from scratch every single draw".
  //
  // IMPORTANT: draw() itself no longer flags the question `used`. It only
  // hands one out — the caller (host.js) marks it "Zarchiwizowane" via
  // markUsed() once it's actually been acted on (poprawnie / niepoprawnie /
  // nowe pytanie). That way a question that was merely shown but never
  // graded (host rerolled it away, or the round timer ran out before it
  // was answered) isn't burned from the pool for nothing — only ones that
  // genuinely got used in the game are. The flag itself is still a
  // persisted field on the question (survives reloads; "Przywróć pytania"
  // in the editor resets it for a new game) rather than a session set.
  // ------------------------------------------------------------------
  QuestionBank.prototype._matchesDraw = function (q, opts) {
    if (opts.type && q.type !== opts.type) return false;
    if (!opts.type && q.type === 'estimate') return false; // don't draw estimate qs into normal rounds
    if (opts.category && q.category !== opts.category) return false;
    if (opts.difficulty && (q.difficulty || 'm') !== opts.difficulty) return false;
    return true;
  };

  QuestionBank.prototype._buildDeck = function (opts) {
    var self = this;
    var pool = this.items.filter(function (q) { return self._matchesDraw(q, opts); });
    var fresh = pool.filter(function (q) { return !q.used; });
    var base = fresh.length > 0 ? fresh : pool; // whole pool already asked once → start a fresh lap
    var ids = base.map(function (q) { return q.id; });
    // Fisher–Yates: every ordering (and so every position) is equally likely.
    for (var i = ids.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = ids[i]; ids[i] = ids[j]; ids[j] = t;
    }
    return ids;
  };

  QuestionBank.prototype.draw = function (opts) {
    opts = opts || {};
    var self = this;

    if (opts.excludeIds && opts.excludeIds.length) {
      // Exact-id exclusion doesn't fit a persistent shuffled deck, so this
      // one case falls back to a plain filtered random pick instead.
      var pool = this.items.filter(function (q) {
        return self._matchesDraw(q, opts) && opts.excludeIds.indexOf(q.id) === -1;
      });
      if (pool.length === 0) return null;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    if (!opts.category) {
      var cats = this.categories().filter(function (cat) {
        return self.items.some(function (q) { return q.category === cat && self._matchesDraw(q, opts); });
      });
      if (cats.length > 1) {
        var pickCat = cats[Math.floor(Math.random() * cats.length)];
        var withCat = Object.assign({}, opts, { category: pickCat });
        return this.draw(withCat);
      }
      // 0 categories match (nothing eligible at all) or exactly 1 does —
      // either way there's no "which category" choice to make, so just
      // fall through to a normal pool-wide deck draw below.
    }

    this._decks = this._decks || {};
    var key = (opts.type || 'normal') + '|' + (opts.category || '*') + '|' + (opts.difficulty || '*');
    if (!this._decks[key] || this._decks[key].length === 0) {
      this._decks[key] = this._buildDeck(opts);
    }
    var deck = this._decks[key];
    if (deck.length === 0) return null; // nothing matches these filters at all
    var id = deck.pop();
    var q = this.items.find(function (x) { return x.id === id; });
    if (!q) return this.draw(opts); // id no longer exists (deleted mid-game) — draw again
    return q;
  };

  QuestionBank.prototype.markUsed = function (id) {
    var q = this.items.find(function (x) { return x.id === id; });
    if (q && !q.used) { q.used = true; save(this.items); this._fire(); }
  };

  // Clears the "used / zarchiwizowane" flag on every question, without
  // touching their content — the "Przywróć pytania" button in the editor.
  QuestionBank.prototype.resetUsed = function () {
    this.items.forEach(function (q) { q.used = false; });
    save(this.items);
    this._decks = {};
    this._fire();
  };

  QuestionBank.prototype.toggleUsed = function (id) {
    var q = this.items.find(function (x) { return x.id === id; });
    if (!q) return;
    this._decks = {};
    q.used = !q.used;
    save(this.items);
    this._fire();
  };

  QuestionBank.prototype.usedCount = function () {
    return this.items.filter(function (q) { return q.used; }).length;
  };

  // ------------------------------------------------------------------
  // Editor UI — mounts a full CRUD editor into a container element.
  // ------------------------------------------------------------------
  var DIFF_LABELS = { e: 'Łatwe', m: 'Średnie', h: 'Trudne' };
  var DIFF_RANK = { e: 0, m: 1, h: 2 };

  // Multi-column sort: each field exposes a comparable value getter.
  var SORT_FIELDS = {
    category: { label: 'Kategoria', get: function (q) { return (q.category || '').toLowerCase(); } },
    question: { label: 'Pytanie', get: function (q) { return (q.question || '').toLowerCase(); } },
    answer: { label: 'Odpowiedź', get: function (q) { return (q.answer || '').toLowerCase(); } },
    type: { label: 'Typ', get: function (q) { return q.type === 'estimate' ? 1 : 0; } },
    difficulty: { label: 'Trudność', get: function (q) { return DIFF_RANK[q.difficulty] != null ? DIFF_RANK[q.difficulty] : 1; } },
    status: { label: 'Status', get: function (q) { return q.used ? 1 : 0; } }
  };
  var SORT_FIELD_ORDER = ['category', 'question', 'answer', 'type', 'difficulty', 'status'];

  function mountEditor(container, bank) {
    var state = {
      filterCat: '', filterDiff: '', filterStatus: '', filterText: '', editingId: null,
      sort: [{ key: 'category', dir: 1 }, { key: '', dir: 1 }]
    };

    function compareRows(a, b) {
      for (var i = 0; i < state.sort.length; i++) {
        var s = state.sort[i];
        var field = s.key && SORT_FIELDS[s.key];
        if (!field) continue;
        var va = field.get(a), vb = field.get(b);
        var cmp = (typeof va === 'number' && typeof vb === 'number') ? (va - vb) : String(va).localeCompare(String(vb), 'pl');
        if (cmp !== 0) return s.dir === -1 ? -cmp : cmp;
      }
      return 0;
    }

    function setSort(key, additive) {
      var slot = additive ? 1 : 0;
      if (!additive) {
        // Primary sort: clicking the same key toggles direction; a new key resets to ascending
        // and clears the secondary slot if it now duplicates the primary.
        if (state.sort[0].key === key) {
          state.sort[0].dir = state.sort[0].dir === 1 ? -1 : 1;
        } else {
          state.sort[0] = { key: key, dir: 1 };
        }
        if (state.sort[1].key === key) state.sort[1] = { key: '', dir: 1 };
      } else {
        if (state.sort[1].key === key) {
          state.sort[1].dir = state.sort[1].dir === 1 ? -1 : 1;
        } else {
          state.sort[1] = { key: key, dir: 1 };
        }
      }
      render();
    }

    function render() {
      var cats = bank.categories();
      var rows = bank.all().filter(function (q) {
        if (state.filterCat && q.category !== state.filterCat) return false;
        if (state.filterDiff && (q.difficulty || 'm') !== state.filterDiff) return false;
        if (state.filterStatus === 'used' && !q.used) return false;
        if (state.filterStatus === 'fresh' && q.used) return false;
        if (state.filterText) {
          var t = (q.question + ' ' + q.answer + ' ' + q.category).toLowerCase();
          if (t.indexOf(state.filterText.toLowerCase()) === -1) return false;
        }
        return true;
      });
      rows.sort(compareRows);

      var usedCount = bank.usedCount();

      container.innerHTML =
        '<div class="qe-toolbar">' +
          '<input type="text" id="qeSearch" placeholder="Szukaj..." value="' + WL.escapeHtml(state.filterText) + '"/>' +
          '<select id="qeCatFilter"><option value="">Wszystkie kategorie</option>' +
            cats.map(function (c) { return '<option value="' + WL.escapeHtml(c) + '"' + (state.filterCat === c ? ' selected' : '') + '>' + WL.escapeHtml(c) + '</option>'; }).join('') +
          '</select>' +
          '<select id="qeDiffFilter"><option value="">Wszystkie trudności</option>' +
            Object.keys(DIFF_LABELS).map(function (k) { return '<option value="' + k + '"' + (state.filterDiff === k ? ' selected' : '') + '>' + DIFF_LABELS[k] + '</option>'; }).join('') +
          '</select>' +
          '<select id="qeStatusFilter">' +
            '<option value="">Wszystkie statusy</option>' +
            '<option value="fresh"' + (state.filterStatus === 'fresh' ? ' selected' : '') + '>Tylko dostępne</option>' +
            '<option value="used"' + (state.filterStatus === 'used' ? ' selected' : '') + '>Tylko zarchiwizowane</option>' +
          '</select>' +
          '<span class="qe-count">' + bank.all().length + ' pytań w banku (' + usedCount + ' zarchiwizowanych)</span>' +
          '<div class="qe-toolbar-actions">' +
            '<button class="btn small" id="qeAddBtn">+ Dodaj pytanie</button>' +
            '<button class="btn small ghost" id="qeExportBtn">Eksportuj JSON</button>' +
            '<label class="btn small ghost file-btn">Importuj JSON<input type="file" id="qeImportFile" accept=".json" hidden/></label>' +
            '<button class="btn small ghost" id="qeUnarchiveBtn" title="Zdejmuje oznaczenie \'zarchiwizowane\' ze wszystkich pytań, treść pozostaje bez zmian">↺ Przywróć pytania (' + usedCount + ')</button>' +
            '<button class="btn small danger-ghost" id="qeResetBtn">Przywróć domyślne</button>' +
          '</div>' +
        '</div>' +
        renderSortBar() +
        '<div class="qe-table-wrap"><table class="qe-table"><thead><tr>' +
          SORT_FIELD_ORDER.map(renderSortableHeader).join('') + '<th></th>' +
        '</tr></thead><tbody>' +
        (state.editingId === 'NEW' ? renderInlineFormRow(null, true) : '') +
        rows.map(function (q) {
          if (q.id === state.editingId) return renderInlineFormRow(q, false);
          return '<tr data-id="' + q.id + '">' +
            '<td>' + WL.escapeHtml(q.category) + '</td>' +
            '<td>' + WL.escapeHtml(q.question) + '</td>' +
            '<td>' + WL.escapeHtml(q.answer) + '</td>' +
            '<td>' + (q.type === 'estimate' ? 'Szacowanie' : 'Zwykłe') + '</td>' +
            '<td>' + (DIFF_LABELS[q.difficulty] || 'Średnie') + '</td>' +
            '<td><button class="qe-status-badge ' + (q.used ? 'used' : 'fresh') + '" data-toggle-used="' + q.id + '" title="Kliknij, aby przełączyć">' + (q.used ? '🗄 Zarchiwizowane' : '✅ Dostępne') + '</button></td>' +
            '<td class="qe-row-actions">' +
              '<button class="icon-btn qe-edit" title="Edytuj">✏️</button>' +
              '<button class="icon-btn qe-del" title="Usuń">🗑️</button>' +
            '</td>' +
          '</tr>';
        }).join('') +
        (rows.length === 0 && state.editingId !== 'NEW' ? '<tr><td colspan="7" class="qe-empty">Brak pytań spełniających kryteria.</td></tr>' : '') +
        '</tbody></table></div>';

      bind();
    }

    function sortSlotIndicator(key) {
      for (var i = 0; i < state.sort.length; i++) {
        if (state.sort[i].key === key) {
          var arrow = state.sort[i].dir === 1 ? '▲' : '▼';
          var order = i === 0 ? '' : '<sup>2</sup>';
          return ' <span class="qe-sort-indicator">' + arrow + order + '</span>';
        }
      }
      return '';
    }

    function renderSortableHeader(key) {
      var field = SORT_FIELDS[key];
      var active = state.sort.some(function (s) { return s.key === key; });
      return '<th class="qe-sortable' + (active ? ' qe-sorted' : '') + '" data-sort-key="' + key + '" title="Kliknij: sortuj po tej kolumnie. Shift+klik: dodaj jako drugie kryterium sortowania.">' +
        WL.escapeHtml(field.label) + sortSlotIndicator(key) +
      '</th>';
    }

    function renderSortSelect(idx) {
      var current = state.sort[idx].key;
      return '<select class="qe-sort-select" data-sort-slot="' + idx + '">' +
        '<option value="">' + (idx === 0 ? 'Bez sortowania' : 'Brak') + '</option>' +
        SORT_FIELD_ORDER.map(function (k) {
          return '<option value="' + k + '"' + (current === k ? ' selected' : '') + '>' + SORT_FIELDS[k].label + '</option>';
        }).join('') +
      '</select>';
    }

    function renderSortBar() {
      var hasActive = !!(state.sort[0].key || state.sort[1].key);
      return '<div class="qe-sort-bar">' +
        '<span class="qe-sort-label">Sortuj:</span>' +
        renderSortSelect(0) +
        '<button class="icon-btn qe-sort-dir-btn" data-sort-dir-slot="0" title="Zmień kierunek sortowania"' + (state.sort[0].key ? '' : ' disabled') + '>' + (state.sort[0].dir === 1 ? '↑' : '↓') + '</button>' +
        '<span class="qe-sort-label">a potem po:</span>' +
        renderSortSelect(1) +
        '<button class="icon-btn qe-sort-dir-btn" data-sort-dir-slot="1" title="Zmień kierunek sortowania"' + (state.sort[1].key ? '' : ' disabled') + '>' + (state.sort[1].dir === 1 ? '↑' : '↓') + '</button>' +
        (hasActive ? '<button class="btn small ghost" id="qeSortClear">Wyczyść sortowanie</button>' : '') +
      '</div>';
    }

    function renderInlineFormRow(editing, isNew) {
      var q = isNew ? { category: '', question: '', answer: '', type: 'normal', difficulty: 'm', numericAnswer: '' } : editing;
      return '<tr class="qe-edit-row">' +
        '<td colspan="7">' +
          '<div class="qe-form">' +
            '<div class="qe-form-title">' + (isNew ? '+ Nowe pytanie' : '✏️ Edycja pytania') + '</div>' +
            '<div class="qe-form-grid">' +
              '<label>Kategoria<input type="text" id="qfCategory" list="qeCatList" value="' + WL.escapeHtml(q.category) + '" placeholder="np. Historia"/></label>' +
              '<label>Typ<select id="qfType">' +
                '<option value="normal"' + (q.type !== 'estimate' ? ' selected' : '') + '>Zwykłe (tak/nie)</option>' +
                '<option value="estimate"' + (q.type === 'estimate' ? ' selected' : '') + '>Szacowanie (dogrywka)</option>' +
              '</select></label>' +
              '<label>Trudność<select id="qfDifficulty">' +
                Object.keys(DIFF_LABELS).map(function (k) { return '<option value="' + k + '"' + ((q.difficulty || 'm') === k ? ' selected' : '') + '>' + DIFF_LABELS[k] + '</option>'; }).join('') +
              '</select></label>' +
              '<label class="qe-span2">Treść pytania<textarea id="qfQuestion" rows="2">' + WL.escapeHtml(q.question) + '</textarea></label>' +
              '<label class="qe-span2">Poprawna odpowiedź<input type="text" id="qfAnswer" value="' + WL.escapeHtml(q.answer) + '"/></label>' +
              '<label id="qfNumWrap" style="' + (q.type === 'estimate' ? '' : 'display:none') + '">Wartość liczbowa (do wyłonienia bliższego)<input type="number" step="any" id="qfNumeric" value="' + (q.numericAnswer != null ? q.numericAnswer : '') + '"/></label>' +
            '</div>' +
            '<datalist id="qeCatList">' + bank.categories().map(function (c) { return '<option value="' + WL.escapeHtml(c) + '">'; }).join('') + '</datalist>' +
            '<div class="qe-form-actions">' +
              '<button class="btn small" id="qfSave">Zapisz</button>' +
              '<button class="btn small ghost" id="qfCancel">Anuluj</button>' +
            '</div>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }

    function bind() {
      var searchEl = container.querySelector('#qeSearch');
      if (searchEl) searchEl.addEventListener('input', function (e) { state.filterText = e.target.value; render(); });
      var catEl = container.querySelector('#qeCatFilter');
      if (catEl) catEl.addEventListener('change', function (e) { state.filterCat = e.target.value; render(); });
      var diffEl = container.querySelector('#qeDiffFilter');
      if (diffEl) diffEl.addEventListener('change', function (e) { state.filterDiff = e.target.value; render(); });
      var statusEl = container.querySelector('#qeStatusFilter');
      if (statusEl) statusEl.addEventListener('change', function (e) { state.filterStatus = e.target.value; render(); });

      container.querySelectorAll('.qe-sort-select').forEach(function (sel) {
        sel.addEventListener('change', function (e) {
          var slot = parseInt(sel.getAttribute('data-sort-slot'), 10);
          state.sort[slot] = { key: e.target.value, dir: 1 };
          render();
        });
      });
      container.querySelectorAll('.qe-sort-dir-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var slot = parseInt(btn.getAttribute('data-sort-dir-slot'), 10);
          if (!state.sort[slot].key) return;
          state.sort[slot].dir = state.sort[slot].dir === 1 ? -1 : 1;
          render();
        });
      });
      var sortClearBtn = container.querySelector('#qeSortClear');
      if (sortClearBtn) sortClearBtn.addEventListener('click', function () {
        state.sort = [{ key: '', dir: 1 }, { key: '', dir: 1 }];
        render();
      });
      container.querySelectorAll('th.qe-sortable').forEach(function (th) {
        th.addEventListener('click', function (e) {
          setSort(th.getAttribute('data-sort-key'), e.shiftKey);
        });
      });

      var addBtn = container.querySelector('#qeAddBtn');
      if (addBtn) addBtn.addEventListener('click', function () { state.editingId = 'NEW'; render(); });

      var unarchiveBtn = container.querySelector('#qeUnarchiveBtn');
      if (unarchiveBtn) unarchiveBtn.addEventListener('click', function () { bank.resetUsed(); render(); });

      container.querySelectorAll('[data-toggle-used]').forEach(function (btn) {
        btn.addEventListener('click', function () { bank.toggleUsed(btn.getAttribute('data-toggle-used')); render(); });
      });

      var exportBtn = container.querySelector('#qeExportBtn');
      if (exportBtn) exportBtn.addEventListener('click', function () {
        var blob = new Blob([bank.exportJson()], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'pytania-weakest-link.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      var importFile = container.querySelector('#qeImportFile');
      if (importFile) importFile.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var mode = confirm('Zastąpić obecny bank pytań importowanym plikiem?\nOK = zastąp, Anuluj = dodaj do istniejących') ? 'replace' : 'append';
          try {
            var n = bank.importJson(reader.result, mode);
            alert('Zaimportowano ' + n + ' pytań.');
            render();
          } catch (err) { alert(err.message); }
        };
        reader.readAsText(file);
      });

      var resetBtn = container.querySelector('#qeResetBtn');
      if (resetBtn) resetBtn.addEventListener('click', function () {
        if (confirm('Przywrócić domyślny bank pytań? To usunie Twoje zmiany.')) { bank.resetDefaults(); render(); }
      });

      container.querySelectorAll('.qe-edit').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.editingId = btn.closest('tr').getAttribute('data-id');
          render();
        });
      });
      container.querySelectorAll('.qe-del').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.closest('tr').getAttribute('data-id');
          if (confirm('Usunąć to pytanie?')) { bank.remove(id); render(); }
        });
      });

      var typeSel = container.querySelector('#qfType');
      if (typeSel) typeSel.addEventListener('change', function () {
        container.querySelector('#qfNumWrap').style.display = typeSel.value === 'estimate' ? '' : 'none';
      });

      var saveBtn = container.querySelector('#qfSave');
      if (saveBtn) saveBtn.addEventListener('click', function () {
        var data = {
          category: container.querySelector('#qfCategory').value.trim() || 'Wiedza ogólna',
          question: container.querySelector('#qfQuestion').value.trim(),
          answer: container.querySelector('#qfAnswer').value.trim(),
          type: container.querySelector('#qfType').value,
          difficulty: container.querySelector('#qfDifficulty').value,
          numericAnswer: parseFloat(container.querySelector('#qfNumeric').value)
        };
        if (!data.question || !data.answer) { alert('Podaj treść pytania i odpowiedź.'); return; }
        if (data.type !== 'estimate') delete data.numericAnswer;
        if (state.editingId === 'NEW') bank.add(data);
        else bank.update(state.editingId, data);
        state.editingId = null;
        render();
      });
      var cancelBtn = container.querySelector('#qfCancel');
      if (cancelBtn) cancelBtn.addEventListener('click', function () { state.editingId = null; render(); });

      if (state.editingId) {
        var editRow = container.querySelector('.qe-edit-row');
        if (editRow && editRow.scrollIntoView) editRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    render();
    bank.onChange(render);
    return { refresh: render };
  }

  global.WLQuestions = {
    QuestionBank: QuestionBank,
    mountEditor: mountEditor,
    DEFAULT_QUESTIONS: DEFAULT_QUESTIONS
  };

}(window));
