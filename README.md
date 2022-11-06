# library sign in backend

backend for sign in [frontend](https://github.com/AHSPC/library-sign-in-system)

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

**[GET]** `/api/v1/admin` - admin branch

```
Authorization: Bearer <token>
```

**[GET]** /api/v1/admin/list
<br /><br /> **JSON:**

```json
{
	"student": {
		"firstname": "john",
		"lastname": "appleseed"
	},
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
