# Skrblikoid
### by Milan Jiříček
## Popis
Tento projekt byl vytvořen v rámci předmětu "Klienské aplikace v JavaScriptu" na Fakultě elektrotechnické ČVUT v Praze.  
Cílem bylo vytvořit aplikaci, do které si uživatel může zaznamenávat své platby a sledovat svou finanční situaci.
### Použité technologie
- React
- Next.js
- TypeScript
- Tailwind CSS  

Tyto technologie byly zvoleny z důvodu jejich popularitě a rozsáhlé dokumentace.
Při vývoji jsem se snažil vyhýbat využívání komponent abych si procvičil práci s Reactem s kterým nemám žádné předchozí zkušenosti.
### Jak to funguje
Aplikace nabízí vytvoření rozpočtů, které lze pojmenovat, určit v jaké měně se budou platby zaznamenávat a zvolit barvu.  
Měnu uživatel může specificky vytvořit v záložce "Currencies" a následně ji použít při vytváření rozpočtu.
Měně lze nastavit symbol, který se bude používat při zobrazování částek a také nabízí možnost zvolit zda symbol bude před měnou (např. $100) nebo za měnou (např. 100 Kč).
Proto je možné vést rozpočty v libovolné měně. Například v CZK, EUR, USD nebo i v kryptoměnách jako např. Bitcoin či Monero.
Měně lze nastavit kurz vůči dolaru, který bude používán při statistikách.  
  
Pro zaznamenání platby uživatel klikne na rozpočet a přejde na stránku kde vidí seznam všech zaznamenaných plateb.
Zde může přidat novou platbu, upravit ji nebo smazat.
Při přidání platby uživatel vyplní formulář, kde zvolí částku, datum, nazev a kategorii.  
Kategorie lze vytvářet a upravovat v záložce "Categories".

### Vývoj
Všechny komponenty jsou vytvořeny v souborech v adresáři `components`.
Všechny stránky jsou vytvořeny v souborech v adresáři `pages` (routování).
Vývoj mi zjednodušil React a Tailwind, kde jsem vždy vytvořil komponentu např. bloku s informacemi a následně ji použil na více místech.
  
Vytvořil jsem různé animace hlavně tlačítek, které se zobrazují při najetí myší. Pro nějaké funkcionality jako například vyjížděcí menu jsem uskutečnil pomocí React Hook `useState`.
Toto jsem také použil pro modální okna, která se zobrazují při vytváření nové platby nebo nové kategorie. Tyto okna mají Hook kde při kliknutí tlačítka se
změní stav a okno se zobrazí a po submitnutí formuláře se zavře pokud nedojde k špatnému vylnění.
  
Celý projekt využívá LocalStorage pro ukládání dat, takže není potřeba žádný backend. Původně jsem chtěl využít GIN framework v Go a databázi Postgres, ale nakonec jsem se rozhodl pro jednodušší řešení
protože cílem předmětu byl vývoj frontendu. Nicméně do budoucna bych si pro osobní potřebu chtěl vytvořit backend v Go a připojit ho k této aplikaci.
Do localStorage lze importovat a exportovat data, což je užitečné pro zálohu dat nebo pro přenesení dat na jiné zařízení.
  
Aplikace je responzivní a měla by být použitelná na všech zařízeních. Například generovaná tabulka s transakcemi některé sloupce schová
a zobrazí je pomocí modal okna při kliknutí na jméno transakce.
  
V aplikaci běží service worker, který umožňuje offline použití aplikace. Použil jsem pro to `next-PWA`.
  
Pro generování grafů jsem použil klasické HTML SVG elementy, které jsem vykreslil pomocí React komponent.
Nějakou dobu jsem bojoval s responzivitou grafů, nicméně poté se mi podařilo zajistit aby to bylo čitelné i na mobilu.
Grafy jsou k nalezení v záložce.

### Závěr
Jelikož jsem neměl žádné zkušenosti s Reactem, pokud se teď na konci kouknu zpět, tak bych některé věci udělal jinak.
Například bych více rozděloval do komponent nebo používal specialní nástroje pro nějaké věci.
Nicméně jsem se naučil mnoho nových věcí, které mohu využít v budoucnu.

### Test data
v rootu projektu je soubor `localstorage.csv` který obsahuje testovací data, která lze importovat do aplikace.




