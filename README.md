# library sign in backend

This is the backend for AHSPC's Library Sign-In project, soon to be used at our school library! More info coming soon to our [website](https://ahspc.github.io).

[(frontend)](https://github.com/AHSPC/library-sign-in-system)

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

**[GET]** `/api/v1/health` - status

**[POST]** `/api/v1/student/login` - login
<br /><br /> **JSON:**

```json
{
	"student": {
		"firstname": "john",
		"lastname": "appleseed"
	},
	"period": 1,
	"reason": 1
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

<br/> **REASONS:**

```go
const (
   LUNCH = 0
   SENT_BY_TEACHER = 1
   FREE_PERIOD = 2
   BEFORE_OR_AFTER_SCHOOL = 3
)
```

**[GET]** /api/v1/admin/list
<br /><br /> **JSON:**

```json
{
	"student": {
		"firstname": "john",
		"lastname": "appleseed"
	},
	"date": "2022-11-05T20:05:52-07:00",
	"period": 1,
	"reason": "lunch"
}
```

<br/> **INTERFACE:**

```ts
interface Response {
	student: {
		firstname: string;
		lastname: string;
	};
	date: string;
	period: int;
	reason: string;
}
```

```
Authorization: Bearer <token>
```

## License

This project is licensed under the terms of the GPL-3.0 license. See
[LICENSE](LICENSE.md) for details.
