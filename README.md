# api-students
## Teoretisk del:
**Hur används HTTP-protokollet när du surfar in på en websida? Beskriv vilken metod, path, URI, response code och body som skickas in och svarar. Om du har svårt att bestämma dig för en url, ta ex. (http://www.smp.se/kultur-noje/) ?**
* Metod som används är GET.
* Path är /kultur-noje.
* URI (Uniform Resource Identifier) är http://www.smp.se/kultur-noje/
* Body är html

**Beskriv HTTP-protokollets vanligaste metoder och vad de gör?**
* GET - Begär fil eller data.
* POST - Lägger till data som skickas in.
* PUT - Ersätter utvald data med ny data som skickas med (all data måste ändras).
* PATCH - Modifierar utvalda delar av data, där till skillnad från PUT inte hela objectet måste ändras.
* DELETE - Raderar specifik data.

**"http://localhost:3000/users?username=something" är en URI, beskriv vilka delar den består av och vad de kallas.**
* http:// <--Scheme
* localhost:3000 <--Authority / port
* /users <-- Path
* ?username=something <-- Query

**På vilka tre sätt kan man skicka in parametrar i en HTTP-request? Ge exempel med curl.**
* curl "https://jsonplaceholder.typicode.com/users?id=2" <-- query
* curl "https://jsonplaceholder.typicode.com/users/"  -H "Content-Type: application/json; charset=utf-8" <-- Beskriver hur jag skickar min förfrågan och hur jag vill ha den tillbaka.
* curl "https://jsonplaceholder.typicode.com/users/1" <-- Path paramters

# Feedback på kursen
Har ingen vidare feedback då jag gör kursen själv i efterhand.

# Praktisk del:
## Installation:
1. git clone git@github.com:Marcus556/api-uppg-1.git
2. cd /api-uppg-1/
3. npm install
4. npm start

### GET /api/students
req:
```
curl localhost:3001/api/students | jq
```
res: 
```
200 ok
  {
    "student": {
      "address": {
        "street": "gatan 22",
        "zipCode": "21313",
        "city": "lessebo"
      },
      "email": "student@mail.se",
      "name": "Nisse bus"
    },
    "_id": "5eb341797853cc16bcbd9665",
    "__v": 0
  },
  {
    "student": {
      "address": {
        "street": "skolgatan 1",
        "zipCode": "11313",
        "city": "växjö"
      },
      "email": "student@mail.se",
      "name": "ingrid studentsson"
    },
    "_id": "5eb3b1a02b32fb53a073b423",
    "__v": 0
  }
```
### GET /api/students?name='name'
req:
```
curl localhost:3001/api/students?name=ingrid+studentsson
```
res: 
```
200 ok
  {
    "student": {
      "address": {
        "street": "skolgatan 1",
        "zipCode": "11313",
        "city": "växjö"
      },
      "email": "student@mail.se",
      "name": "ingrid studentsson"
    },
    "_id": "5eb3b1a02b32fb53a073b423",
    "__v": 0
  }
```
### GET /api/students/'id'
req:
```
curl localhost:3001/api/students/5eb3b1a02b32fb53a073b423
```
res: 
```
200 ok
  {
    "student": {
      "address": {
        "street": "skolgatan 1",
        "zipCode": "11313",
        "city": "växjö"
      },
      "email": "student@mail.se",
      "name": "ingrid studentsson"
    },
    "_id": "5eb3b1a02b32fb53a073b423",
    "__v": 0
  }
```
### POST /api/students
req:
```
curl -X POST localhost:3001/api/students -H "Content-Type: application/json" -d '{"student":{ "email": "ny email", "name": "new name", "address": { "street": "gatan 23", "zipCode": "2113", "city": "lysekil" }}}'
```
res: 
```
200 ok
{
    "student": {
        "address": {
            "street": "gatan 23",
            "zipCode": "2113",
            "city": "lysekil"
        },
        "email": "ny email",
        "name": "new name"
    },
    "_id": "5eb3b98e27dc5e4eeca5fe06",
    "__v": 0
}

```
### PUT /api/students/'id'
req:
```
curl -X PUT localhost:3001/api/students/5eb3b98e27dc5e4eeca5fe06 -H "Content-Type: application/json" -d
```
res: 
```
200 ok - uppdaterad
201 created - ny skapad
204 no change - inga ändringar
{
    "student": {
        "address": {
            "street": "gatan 23",
            "zipCode": "2113",
            "city": "lysekil"
        },
        "email": "ny email",
        "name": "new name"
    },
    "_id": "5eb3b98e27dc5e4eeca5fe06",
    "__v": 0
}

```

### DELETE /api/students/'id'
req:
```
curl -X DELETE localhost:3001/students/5eb3b98e27dc5e4eeca5fe06
```
res: 
```
200 ok - raderad
204 no change - inga ändringar
{
    "student": {
        "address": {
            "street": "gatan 23",
            "zipCode": "2113",
            "city": "lysekil"
        },
        "email": "ny email",
        "name": "new name"
    },
    "_id": "5eb3b98e27dc5e4eeca5fe06",
    "__v": 0
}

```





