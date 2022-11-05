# library-auth

backend for sign on [frontend](https://github.com/AHSPC/library-sign-in-system)

## Build

### three simple steps

- `git clone https://github.com/AHSPC/library_backend`
- `go mod tidy`
- `go build .`

## Configuration

Move `config.example.yml` to `config.yml` in the working directory. Edit this file accordingly.

## Routes

**[GET]** `/api` - uri (redir to /)

**[GET]** `/api/v1` - main branch (redir to /)

**[GET]**  `/api/v1/health` - status

**[POST]**  `/api/v1/student/auth` - login
<br /><br /> **JSON:**
```json
{
  "student": {
     "firstname": "example",
     "lastname": "student",
  },
  "period": 1,
  "reason": 1,
}
```
<br/> **INTERFACE:**
```ts
interface Response {
  student: {
    firstname: string;
    lastname: string;
  };
  period: int;
  reason: enum;
}
```

**[GET]** `/api/v1/admin` - admin branch
```
Authorization: Bearer <token>
```

**[GET]** /api/v1/admin/view
params `[reason, time, name, period]`
```
Authorization: Bearer <token>
```
<hr />

###### more routes can be added on request
