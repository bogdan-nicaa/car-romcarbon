# CAR Romcarbon - Arhitectura Tehnică a Site-ului

Acest document descrie arhitectura tehnică, fluxul de date și componentele dezvoltate pentru site-ul de prezentare **CAR Romcarbon Buzău**.

## 1. Stack Tehnologic

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Design System:** Bazat pe stilul editorial *Stitch*, bazat exclusiv pe `src/style.css` cu o cromatică strictă de *Forest Green, Earthy Clay și Warm Ivory*. Toate marginile (border-urile) sunt subtile sau omise ("The No-Line Rule"), utilizând umbre moi pentru efect 3D (glassmorphism).
- **Backend / CMS:** Static. Funcționează fără server Node.js/PHP. Se bazează 100% pe fișiere pre-existente, iar actualizarea lor se face prin programul **GitHub Actions**.

## 2. Structura de Fișiere

```text
/CAR/
├── index.html                           # Pagina principală (Prezentare, Simulator, etc)
├── src/
│   ├── style.css                        # Design token-uri, CSS layout, butoane, animations
│   └── main.js                          # Logica de UI (Scroll, Animații, Generare Carduri)
├── data/
│   └── config.json                      # Sursa de Adevăr (Single Source of Truth) pentru tipurile de împrumut
├── admin/
│   └── index.html                       # Panoul de Control vizual (CMS)
└── .github/workflows/update-rates.yml   # Scriptul GitHub Actions care face salvarea
```

## 3. Sistemul de Administrare (CMS) și Fluxul de Date

Pentru a evita costurile și vulnerabilitățile unui server clasic, a fost creată o arhitectură **"Serverless Static CMS"**:

1. **Panoul de Admin (`admin/index.html`):** Este pur vizual. Citește datele curente din `data/config.json`. Conține macheta pentru toate "Cardurile de Credit", permițând adăugarea, modificarea și ștergerea lor (Nume, Dobândă, Iconiță, Highlight, Caracteristici bullet-point).
2. **Autorizarea (PAT):** Administratorul folosește un Token API generat din contul GitHub, care se lipește în panou cu permisiuni de citire/scriere (repo-level).
3. **Pachetul de Date (`workflow_dispatch`):** Când Administratorul dă Salvare, fișierul `admin.html` trimite un API POST silențios către serverele GitHub având ca `payload` un pachet JSON (toți parametrii din ecran).
4. **Executorul (`update-rates.yml`):** GitHub Actions captează cererea, pornește un mediu virtual Ubuntu invizibil, injectează conținutul (JSON-ul proaspăt) direct în `data/config.json` și generează automat comanda de `git commit & push`.
5. **Afișajul Public:** Odată ce GitHub actualizează fișierul, orice utilizator care intră pe site va descărca din server noul pachet `config.json`.

## 4. Generarea Dinamică a Interfeței (JavaScript)

Nu există cod HTML "hardcoded" (implantat fix) pentru cutiile de Oferte Credit în `index.html`.

Fișierul `src/main.js` este programat ca un "Builder". Când un vizitator accesează `index.html`:
- JS descarcă și transformă în array obiectul aflat în `config.json`.
- Funcția `populateRatesAndCalculate()` șterge conținuturile din containerul de oferte (`#dynamicLoanCards`).
- Printr-un `map`, se iterează lista array-ului și se construiesc module HTML (`div class="loan-card"`) pe loc, adăugându-le iconițele (`opt.icon`), array-urile interne de bullet-points (`opt.features`) și chiar banderole / prezența în header (`opt.is_promo`).
- De asemenea, `<select>` dropdown-ul din Simulatorul financiar este instanțiat direct cu aceste elemente, neafectând niciodată codul de funcționare matriceală al aplicației. 

### Fallback Local (Offline)
Pentru randare locală vizuală *fără web server* (adică rularea fișierului `file:///...`), browserul blochează preluarea fișierului `.json` extern din cauza politicilor CORS. Din această cauză s-a introdus matricea fixă de siguranță `defaultOptions` ca variabilă JavaScript care este identică din punct de vedere arhitectural (în interiorul `.catch()`).

## 5. Deployment & Setări Viitoare

* **Domeniul personalizat** (ex: carromcarbon.ro) necesită rutarea DNS spre host-ul serverului static final (recomandat: Netlify sau GitHub Pages).
* Administratorul nu va avea niciodată nevoie de a accesa codul sursă. Pentru actualizarea parametrilor, i se oferă tokenul și accesează formularul `/admin`.
