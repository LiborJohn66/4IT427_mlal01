# EventMaster - podklady k obhajobe

Tento soubor slouzi jako priprava na semestralni praci a obhajobu. Je napsany tak, aby se podle nej dalo projekt samostatne predstavit zhruba za 10 minut a zaroven rychle ukazat, kde jsou v kodu pouzite hlavni koncepty z Reactu.

## 1. Strucne predstaveni aplikace

EventMaster je mala React aplikace pro planovani eventu a spravu ukolu. Cilem aplikace je ukazat, jak by organizacni tym mohl sledovat vice eventu, jejich ukoly, terminy, priority a zodpovedne osoby.

Aplikace neni jen obycejny todo list. Ukoly jsou zasazene do konkretni domeny event managementu:

- kazdy ukol patri ke konkretnimu eventu,
- ukoly maji kategorii, deadline, prioritu a stav,
- ukoly maji zodpovednou osobu,
- aplikace ma dashboard se statistikami,
- existuje seznam eventu, detail eventu, seznam ukolu, detail ukolu a tymova stranka.

## 2. Hlavni funkcionalita

Aktualne aplikace obsahuje:

- dashboard s prehledem poctu ukolu,
- seznam eventu,
- detail eventu vcetne ukolu pro dany event,
- seznam vsech ukolu,
- filtrovani ukolu podle stavu,
- detail konkretniho ukolu,
- tymovou stranku se zodpovednymi osobami,
- status a priority badge komponenty,
- loading a error stavy,
- mockovana data v `public/db.json`,
- unit test pomocne funkce,
- integracni test filtrovani ukolu.

## 3. Routing

Routing je reseny pres `react-router-dom`.

Hlavni soubory:

- `src/main.tsx` - obaluje aplikaci do `BrowserRouter`.
- `src/App.tsx` - definuje routes.
- `src/layout/MainLayout.tsx` - obsahuje spolecny layout a `Outlet`.
- `src/components/Navbar.tsx` - navigace pomoci `NavLink`.

Pouzite routes:

- `/` - Dashboard
- `/events` - seznam eventu
- `/events/:id` - detail eventu
- `/tasks` - seznam vsech ukolu
- `/tasks/:id` - detail konkretniho ukolu
- `/team` - tym a zodpovedne osoby
- `/about` - informace o projektu

Na obhajobe je dobre ukazat:

1. `App.tsx`, kde jsou definovane cesty.
2. `MainLayout.tsx`, kde je spolecny layout a `Outlet`.
3. `Navbar.tsx`, kde `NavLink` nastavuje aktivni styl navigace.
4. `EventDetailPage.tsx` nebo `TaskDetailPage.tsx`, kde se pouziva `useParams`.

## 4. Struktura projektu

Projekt je rozdeleny podle odpovednosti:

```text
src/
  components/   znovupouzitelne UI komponenty
  pages/        stranky napojene na routing
  layout/       hlavni layout aplikace
  types/        TypeScript typy
  utils/        pomocne funkce
  hooks/        pripraveny prostor pro vlastni hooky
  api/          pripraveny prostor pro API logiku
  context/      pripraveny prostor pro globalni state
  styles/       pripraveny prostor pro dalsi styly
```

Nejdulezitejsi komponenty:

- `Navbar` - hlavni navigace.
- `EventCard` - karta eventu v seznamu eventu.
- `TaskCard` - karta ukolu pouzivana v detailu eventu i v seznamu ukolu.
- `StatusBadge` - vizualni zobrazeni stavu ukolu.
- `PriorityBadge` - vizualni zobrazeni priority ukolu.
- `LoadingState` - znovupouzitelny loading stav.
- `ErrorState` - znovupouzitelny error stav.

Nejdulezitejsi stranky:

- `DashboardPage` - pocita a zobrazuje statistiky.
- `EventsPage` - nacita a zobrazuje eventy.
- `EventDetailPage` - nacita konkretni event a ukoly k nemu.
- `TasksPage` - nacita vsechny ukoly a filtruje je podle stavu.
- `TaskDetailPage` - nacita detail konkretniho ukolu.
- `TeamPage` - nacita zodpovedne osoby a pocita jejich ukoly.

## 5. TypeScript typy

Typy jsou ulozene v `src/types`.

### Event

`src/types/event.types.ts`

```ts
export type Event = {
  id: string
  name: string
  date: string
  location: string
  description: string
}
```

### Task

`src/types/task.types.ts`

```ts
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  eventId: string
  title: string
  category: string
  assigneeId: string
  status: TaskStatus
  priority: Priority
  deadline: string
}
```

### User

`src/types/user.types.ts`

```ts
export type User = {
  id: string
  name: string
  role: string
  email: string
}
```

Na obhajobe je dobre rict, ze TypeScript pomaha hlavne u:

- props komponent,
- response objektu z `db.json`,
- filtrovani tasku podle presne definovaneho stavu,
- badge komponent, ktere prijimaji jen povolene hodnoty.

## 6. Data fetching

Data jsou ulozena v `public/db.json`. Aplikace je nacita pres `fetch('/db.json')`.

Soubor obsahuje:

- `events`,
- `tasks`,
- `users`,
- `categories`.

Proc tento pristup:

- neni potreba zavislet na externim API,
- data jsou stabilni a jednoduse kontrolovatelna,
- chova se to podobne jako jednoduche API,
- pro semestralni projekt je to dostatecne a prehledne.

Priklady stranek s data fetchingem:

- `EventsPage` nacita seznam eventu.
- `EventDetailPage` nacita eventy i tasky a filtruje tasky podle `eventId`.
- `TasksPage` nacita vsechny tasky.
- `TaskDetailPage` nacita task, jeho event a assignee.
- `TeamPage` nacita uzivatele a tasky.

Kazda datova stranka pracuje s:

- loading stavem,
- error stavem,
- stavem s nactenymi daty.

## 7. State management

V aplikaci je pouzity hlavne lokalni state pomoci `useState`.

Priklady:

- `DashboardPage` drzi `tasks`, `isLoading`, `error`.
- `EventsPage` drzi `events`, `isLoading`, `error`.
- `TasksPage` drzi `tasks`, `activeFilter`, `isLoading`, `error`.
- `TaskDetailPage` drzi `task`, `event`, `assignee`, `isLoading`, `error`.

Globalni state jsem v aktualni verzi zamerne nepouzil, protoze data nejsou potreba sdilet napric mnoha vzdalenymi castmi aplikace. Kazda stranka si nacita vlastni data a stav je tim padem jednodussi. Slozka `src/context` je pripravena pro pripadne rozsireni, napr. kdyby se pozdeji pridavalo prihlaseni uzivatele, globalni nastaveni aplikace nebo sdileny filtr.

Na obhajobe je dobre rict:

> Lokalni state pouzivam pro stav konkretni stranky, napr. aktivni filtr v `TasksPage`. Globalni state jsem zamerne nepridaval, protoze by v teto velikosti aplikace pridal slozitost bez realne potreby.

## 8. Hooks

Pouzite hooks:

- `useState` - lokalni stav stranky.
- `useEffect` - nacteni dat po renderu komponenty.
- `useMemo` - odvozene hodnoty, napr. dashboard statistiky nebo filtrovane tasky.
- `useParams` - ziskani `id` z URL u detailu eventu a detailu ukolu.

Priklady:

- `TasksPage` pouziva `useMemo` pro `filteredTasks`.
- `DashboardPage` pouziva `useMemo` pro vypocet statistik.
- `EventDetailPage` pouziva `useParams` pro `events/:id`.
- `TaskDetailPage` pouziva `useParams` pro `tasks/:id`.

## 9. Komponenty

Komponenty jsou rozdelene tak, aby kazda mela jasnou odpovednost.

### `TaskCard`

Zobrazuje jeden ukol:

- title,
- category,
- status badge,
- priority badge,
- deadline,
- odkaz na detail.

Pouziva se na vice mistech, coz ukazuje znovupouzitelnost komponent.

### `StatusBadge`

Prevadi technicky stav na citelny text:

- `todo` -> Todo
- `in-progress` -> In progress
- `done` -> Done

### `PriorityBadge`

Prevadi prioritu na citelny text:

- `low` -> Low priority
- `medium` -> Medium priority
- `high` -> High priority

### `LoadingState` a `ErrorState`

Tyto komponenty snizuji duplicitu. Misto opakovanych odstavcu s textem ma aplikace jednotny zpusob, jak ukazat loading a chybu.

## 10. Dashboard statistiky

Dashboard zobrazuje:

- celkovy pocet ukolu,
- pocet hotovych ukolu,
- pocet rozpracovanych ukolu,
- pocet urgentnich ukolu,
- nejblizsi deadline.

Logika je v `DashboardPage`.

Pouziva se `useMemo`, aby se statistiky prepocitaly jen pri zmene seznamu ukolu.

## 11. Filtrovani ukolu

Filtrovani je v `TasksPage`.

Filtry:

- All
- Todo
- In progress
- Done

Aktivni filtr je ulozen v lokalnim state:

```ts
const [activeFilter, setActiveFilter] = useState<TaskFilter>('all')
```

Filtrovany seznam je odvozena hodnota:

```ts
const filteredTasks = useMemo(() => {
  if (activeFilter === 'all') {
    return tasks
  }

  return tasks.filter((task) => task.status === activeFilter)
}, [activeFilter, tasks])
```

Tohle je dobra cast pro obhajobu, protoze ukazuje `useState`, `useMemo`, event handling a rendering seznamu.

## 12. Testy

Projekt obsahuje dva typy testu.

### Unit test

Soubor:

- `src/utils/taskUtils.test.ts`

Testovana funkce:

- `getCompletionPercentage`

Funkce vraci procento hotovych ukolu. Testuje se:

- priklad `2/3 done = 67`,
- prazdne pole vraci `0`.

Proc je to unit test:

- testuje izolovanou pomocnou funkci,
- nerenderuje React komponentu,
- nepracuje s DOM.

### Integracni test

Soubor:

- `src/pages/TasksPage.test.tsx`

Testuje se:

- render `TasksPage`,
- mock `fetch`,
- zobrazeni nactenych tasku,
- klik na filtr `Done`,
- overeni, ze zustane videt jen hotovy task.

Proc je to integracni test:

- renderuje React komponentu,
- pracuje s DOM,
- simuluje interakci uzivatele,
- overuje spolupraci fetch logiky, state, filtru a komponent `TaskCard`.

Testy se spousti:

```bash
npm test
```

## 13. Stylovani

Stylovani je resene klasickym CSS:

- `src/index.css` - globalni zaklad, typografie, barvy, root styly.
- `src/App.css` - layout, navigace, karty, badge, responsive styly.

Proc tento pristup:

- pro rozsah projektu je jednoduchy,
- neni nutna dalsi knihovna,
- CSS zustava citelne a snadno dohledatelne.

Responsive design:

- navigace se na mobilu zalamuje,
- obsah ma responzivni padding,
- dashboard pouziva responzivni grid,
- karty a filtry se prizpusobuji male sirce.

## 14. README a odevzdani

README obsahuje:

- popis projektu,
- seznam features,
- routes,
- datovy model,
- skripty,
- tech stack.

Pro odevzdani je potreba:

- mit projekt na GitHubu,
- poslat odkaz vyucujicimu,
- na obhajobu mit projekt spusteny na notebooku,
- umet projit kod a vysvetlit pouzite koncepty.

Spusteni projektu:

```bash
npm install
npm run dev
```

Kontrola pred obhajobou:

```bash
npm test
npm run lint
npm run build
```

## 15. Navrh 10min prezentace

### 0:00 - 1:00 Predstaveni projektu

> Vytvoril jsem aplikaci EventMaster pro planovani eventu a spravu ukolu. Aplikace resi event management: mam zde vice eventu, ukoly v kategoriich, priority, stavy, deadliny a zodpovedne osoby.

Ukazat v prohlizeci:

- dashboard,
- eventy,
- tasky,
- tym.

### 1:00 - 2:00 Struktura projektu

Ukazat `src/`.

Rict:

> Projekt jsem rozdelil podle odpovednosti. Komponenty jsou v `components`, routovane stranky v `pages`, typy v `types`, pomocne funkce v `utils` a layout v `layout`.

### 2:00 - 3:00 Routing

Ukazat:

- `src/App.tsx`,
- `src/layout/MainLayout.tsx`,
- `src/components/Navbar.tsx`.

Rict:

> Routing je pres React Router. V `App.tsx` definuji jednotlive route a `MainLayout` pouziva `Outlet`, aby vsechny stranky mely spolecnou hlavicku a navigaci.

### 3:00 - 4:00 Komponenty

Ukazat:

- `TaskCard`,
- `StatusBadge`,
- `PriorityBadge`,
- `EventCard`.

Rict:

> TaskCard je znovupouzitelna komponenta. Pouziva se jak v detailu eventu, tak v seznamu vsech ukolu. Status a priorita jsou oddelene do vlastnich badge komponent.

### 4:00 - 5:00 Data fetching

Ukazat:

- `public/db.json`,
- `EventsPage`,
- `EventDetailPage`,
- `TaskDetailPage`.

Rict:

> Data ziskavam pres `fetch('/db.json')`. Pouzivam mock API data, abych nebyl zavisly na externi sluzbe. Stranky maji loading i error state.

### 5:00 - 6:00 State a hooks

Ukazat:

- `TasksPage`,
- `DashboardPage`.

Rict:

> Lokalni state pouzivam pro data, loading, error a aktivni filtr. `useEffect` pouzivam pro nacteni dat, `useMemo` pro odvozene hodnoty jako filtrovane tasky nebo statistiky.

### 6:00 - 7:00 TypeScript

Ukazat:

- `task.types.ts`,
- `event.types.ts`,
- `user.types.ts`.

Rict:

> TypeScript pouzivam pro domenove typy. Task ma pevne definovane stavy a priority, takze komponenty nemohou dostat libovolny string.

### 7:00 - 8:00 Testy

Ukazat:

- `taskUtils.test.ts`,
- `TasksPage.test.tsx`.

Rict:

> Mam unit test pomocne funkce `getCompletionPercentage` a integracni test filtrovani tasku. Integracni test mockuje fetch, renderuje stranku a simuluje kliknuti na filtr Done.

### 8:00 - 9:00 Stylovani a responzivita

Ukazat:

- `App.css`,
- aplikaci zmensit v prohlizeci.

Rict:

> Stylovani je pres klasicke CSS. Dashboard pouziva responzivni grid, navigace a filtry se na mobilu zalamuji.

### 9:00 - 10:00 Shrnuti

Rict:

> Projekt splnuje hlavni pozadavky: komponenty, hooks, routing, data fetching, TypeScript, unit test a integracni test. Git historii jsem vedl po mensich krocich, aby bylo videt postupny vyvoj.

## 16. Otazky, ktere muzou prijit

### Proc mock `db.json` a ne verejne API?

Protoze projekt neni zavisly na dostupnosti cizi sluzby. Data mam pod kontrolou a muzu jednoduse ukazat data fetching i vztahy mezi entitami.

### Proc neni pouzity globalni state?

Protoze aplikace zatim nema stav, ktery by bylo nutne sdilet napric mnoha nezavislymi castmi. Lokalni state je jednodussi a citelnejsi. Globalni state by daval smysl treba pro prihlaseneho uzivatele, theme, nebo sdileny filtr napric strankami.

### Co by slo rozsirit?

- pridani formulare pro vytvoreni eventu,
- pridani formulare pro vytvoreni tasku,
- editace stavu tasku,
- ulozeni do localStorage nebo realneho backendu,
- pokrocile filtrovani podle priority, eventu nebo assignee,
- globalni state pro prihlaseneho uzivatele,
- detailnejsi testy loading a error stavu.

### Kde je unit test?

`src/utils/taskUtils.test.ts`

### Kde je integracni test?

`src/pages/TasksPage.test.tsx`

### Kde je routing?

`src/App.tsx`

### Kde je data fetching?

V datovych strankach:

- `DashboardPage`,
- `EventsPage`,
- `EventDetailPage`,
- `TasksPage`,
- `TaskDetailPage`,
- `TeamPage`.

## 17. Checklist pred obhajobou

- Spustit `npm install`.
- Spustit `npm test`.
- Spustit `npm run lint`.
- Spustit `npm run build`.
- Spustit `npm run dev`.
- Otevrit aplikaci v prohlizeci.
- Projit routes:
  - `/`,
  - `/events`,
  - `/events/event-1`,
  - `/tasks`,
  - `/tasks/task-1`,
  - `/team`,
  - `/about`.
- Pripravit si GitHub odkaz.
- Zkontrolovat, ze README je aktualni.
- Mit pripraveny notebook s rozbehnutym projektem.

## 18. Shrnovaci veta

EventMaster je React TypeScript aplikace pro event management, ktera ukazuje praci s komponentami, routingem, hooky, data fetchingem, TypeScriptem, testovanim, loading/error stavy a responzivnim UI.
