# 📘 Task: Backend Application with 3 CRUD Modules (NestJS sau alt framework pentru backend + PostgreSQL/MySQL)

## 🎯 Obiectiv
Implementarea unui backend modular în NestJS (sau alt framework backend), cu **3 entități legate prin 2 relații One-to-Many**.

Exemplu conceptual: **Country → Region → Location**  
(Doar pentru exemplificare — fiecare student va primi o variantă din lista de mai jos.)

---

## 🔹 1. Creați un repository privat
- **Nume recomandat:** `web2-exam`
- Acordați acces utilizatorilor:
  - `sergiuchilat`

**Punctaj:** *5p*

---

## 🔹 2. Creare și configurare proiect NestJS
- Inițializați un proiect NestJS nou (`nest new ...`)
- Adăugați ORM la alegere:
  - TypeORM (`@nestjs/typeorm`)
  - Sequelize (`sequelize-typescript`)
  - Prisma (dacă preferați)
- Configurați conexiunea la PostgreSQL sau MySQL
- Separați proiectul în module, servicii, controllere, DTO-uri și entități

**Punctaj:** *10p*

---

## 🔹 3. Entități + 2 relații One-to-Many
Cele trei entități trebuie să fie structurate astfel:

### ✦ Entitatea părinte (Level 1)
- `id` — PK
- alte câmpuri relevante

### ✦ Entitatea intermediară (Level 2)
- `id` — PK
- FK → Level 1  
  Relație: **1 Level1 → multe Level2**

### ✦ Entitatea copil (Level 3)
- `id` — PK
- FK → Level 2  
  Relație: **1 Level2 → multe Level3**

Relațiile trebuie implementate în ORM.

**Punctaj:** *30p total*  
(10p pentru entități + 20p pentru ambele FK)

---

## 🔹 4. CRUD complet pentru toate cele 3 entități

| Operație | Endpoints | Puncte |
|----------|-----------|--------|
| Creare | `POST /lvl1`, `POST /lvl2`, `POST /lvl3` | 10p |
| Afișare după ID | `GET /lvl1/:id`, `GET /lvl2/:id`, `GET /lvl3/:id` | 10p |
| Afișare toate | `GET /lvl1`, `GET /lvl2`, `GET /lvl3` | 10p |
| Modificare | `PUT /lvl1/:id`, `PUT /lvl2/:id`, `PUT /lvl3/:id` | 15p |
| Ștergere | `DELETE /lvl1/:id`, `DELETE /lvl2/:id`, `DELETE /lvl3/:id` | 10p |

---

## 🔹 4b. Endpoints pentru afișarea copiilor fiecărui părinte (exemplu concret)

### Concept: Country → Region → Location

| Operație | Endpoint | Descriere | Puncte |
|-----------|---------|-----------|--------|
| Afișare toate regiuni pentru un country | `GET /countries/:id/regions` | Returnează toate regiunile asociate țării cu ID-ul specificat | 5p |
| Afișare toate locațiile pentru un region | `GET /regions/:id/locations` | Returnează toate locațiile asociate regiunii cu ID-ul specificat | 5p |
| Afișare toate locațiile pentru un country (join) | `GET /countries/:id/locations` | Returnează toate locațiile din toate regiunile țării cu ID-ul specificat | 5p |

**Exemple concrete de request-uri:**

```http
# Toate regiunile din țara cu id=1
GET /countries/1/regions

# Toate locațiile din regiunea cu id=10
GET /regions/10/locations

# Toate locațiile din țara cu id=1
GET /countries/1/locations
```

> Total puncte CRUD: *70p* (55p CRUD standard + 15p endpoints copii)

---

## 🔹 5. Swagger (OpenAPI)
- Documentați API-ul la ruta: `/api/docs`
- Folosiți:
  - `@ApiTags`
  - `@ApiOperation`
  - `@ApiResponse`
  - `@ApiBody`
  - `@ApiParam`

**Punctaj:** *5p*

---

## 🔹 6. Docker
Creați:

### `Dockerfile` pentru aplicația NestJS  
### `docker-compose.yml` cu:
- backend
- baza de date (PostgreSQL/MySQL)

### `.env` cu variabile:
```
DB_HOST=db
DB_PORT=5432
DB_USER=appuser
DB_PASS=apppass
DB_NAME=appdb
PORT=3000
```

**Punctaj:** *5p*

---

## 🔹 7. Commituri curate și semnificative
Exemple:

1. `chore(repo): initialize private repository`
2. `feat(app): setup nestjs project`
3. `feat(level1): add entity + CRUD`
4. `feat(level2): add entity + FK to level1 + CRUD`
5. `feat(level3): add entity + FK to level2 + CRUD`
6. `docs(swagger): add swagger documentation`
7. `chore(docker): add docker files`

**Punctaj:** *5p*

---

# 📚 20 Variante de entități + lista de câmpuri

Fiecare variantă are 3 entități (Level1 → Level2 → Level3) și 2 relații One-to-Many.

1. **Continent → Country → City**  
   - Continent: `id`, `name`, `population`  
   - Country: `id`, `name`, `code`, `continentId`  
   - City: `id`, `name`, `population`, `countryId`  

2. **Company → Division → Team**  
   - Company: `id`, `name`, `website`  
   - Division: `id`, `name`, `manager`, `companyId`  
   - Team: `id`, `name`, `lead`, `divisionId`  

3. **University → Department → Course**  
   - University: `id`, `name`, `location`  
   - Department: `id`, `name`, `head`, `universityId`  
   - Course: `id`, `title`, `credits`, `departmentId`  

4. **Brand → ProductLine → Product**  
   - Brand: `id`, `name`, `founded`  
   - ProductLine: `id`, `name`, `brandId`  
   - Product: `id`, `name`, `price`, `productLineId`  

5. **Airline → FlightRoute → Flight**  
   - Airline: `id`, `name`, `country`  
   - FlightRoute: `id`, `origin`, `destination`, `airlineId`  
   - Flight: `id`, `flightNumber`, `departureTime`, `routeId`  

6. **Publisher → Collection → Book**  
   - Publisher: `id`, `name`, `founded`  
   - Collection: `id`, `title`, `publisherId`  
   - Book: `id`, `title`, `author`, `collectionId`  

7. **Hospital → Ward → Patient**  
   - Hospital: `id`, `name`, `location`  
   - Ward: `id`, `name`, `capacity`, `hospitalId`  
   - Patient: `id`, `name`, `diagnosis`, `wardId`  

8. **Cinema → Hall → Seat**  
   - Cinema: `id`, `name`, `location`  
   - Hall: `id`, `name`, `capacity`, `cinemaId`  
   - Seat: `id`, `number`, `row`, `hallId`  

9. **Factory → AssemblyLine → Machine**  
   - Factory: `id`, `name`, `location`  
   - AssemblyLine: `id`, `name`, `factoryId`  
   - Machine: `id`, `serialNumber`, `type`, `assemblyLineId`  

10. **Restaurant → MenuSection → Dish**  
    - Restaurant: `id`, `name`, `location`  
    - MenuSection: `id`, `name`, `restaurantId`  
    - Dish: `id`, `name`, `price`, `menuSectionId`  

11. **MusicLabel → Artist → Album**  
    - MusicLabel: `id`, `name`, `founded`  
    - Artist: `id`, `name`, `genre`, `labelId`  
    - Album: `id`, `title`, `releaseYear`, `artistId`  

12. **School → Class → Pupil**  
    - School: `id`, `name`, `address`  
    - Class: `id`, `name`, `teacher`, `schoolId`  
    - Pupil: `id`, `name`, `age`, `classId`  

13. **SportsClub → Team → Player**  
    - SportsClub: `id`, `name`, `founded`  
    - Team: `id`, `name`, `coach`, `clubId`  
    - Player: `id`, `name`, `position`, `teamId`  

14. **TVNetwork → Channel → Show**  
    - TVNetwork: `id`, `name`, `headquarters`  
    - Channel: `id`, `name`, `networkId`  
    - Show: `id`, `title`, `airTime`, `channelId`  

15. **Marketplace → Seller → Listing**  
    - Marketplace: `id`, `name`, `country`  
    - Seller: `id`, `name`, `rating`, `marketplaceId`  
    - Listing: `id`, `title`, `price`, `sellerId`  

16. **Bank → Branch → Account**  
    - Bank: `id`, `name`, `headquarters`  
    - Branch: `id`, `name`, `address`, `bankId`  
    - Account: `id`, `number`, `balance`, `branchId`  

17. **RetailChain → Store → Employee**  
    - RetailChain: `id`, `name`, `country`  
    - Store: `id`, `name`, `location`, `chainId`  
    - Employee: `id`, `name`, `position`, `storeId`  

18. **Zoo → Enclosure → Animal**  
    - Zoo: `id`, `name`, `location`  
    - Enclosure: `id`, `name`, `type`, `zooId`  
    - Animal: `id`, `name`, `species`, `enclosureId`  

19. **Museum → Exhibit → Artifact**  
    - Museum: `id`, `name`, `location`  
    - Exhibit: `id`, `title`, `museumId`  
    - Artifact: `id`, `name`, `age`, `exhibitId`  

20. **SoftwareCompany → Project → Task**  
    - SoftwareCompany: `id`, `name`, `industry`  
    - Project: `id`, `name`, `deadline`, `companyId`  
    - Task: `id`, `title`, `status`, `projectId`  

---

# 🧮 Barem (100 puncte)

| Cerință | Puncte |
|--------|--------|
| Repository privat | 5 |
| Inițializare + configurare proiect | 10 |
| Entități + relații FK | 30 |
| CRUD complet 3 entități + endpoints copii | 70 |
| Swagger | 5 |
| Docker | 5 |
| Commituri clare | 5 |
| **Total** | **100** |

---

# 📝 Interpretarea notei

| Puncte | Notă |
|--------|------|
| 95–100 | 10 |
| 83–95  | 9 |
| 65–82  | 8 |
| 48–64  | 7 |
| 38–47  | 6 |
| 30–37  | 5 |
| 21–29  | 4 |
| 13–20  | 3 |
| 6–12   | 2 |
| 0–5    | 1 |