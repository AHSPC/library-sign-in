package handler

type JsonStatus struct {
	Status  int64  `json:"status"`
	Message string `json:"message"`
}

type student struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

type loginBody struct {
	Student student `json:"student"`
	Period  int64   `json:"period"`
	Reason  int64   `json:"reason"`
}

type JsonList struct {
	Id      string  `json:"id"`
	Student student `json:"student"`
	Date    string  `json:"date"`
	Period  int64   `json:"period"`
	Reason  string  `json:"reason"`
}

type AdminList struct {
	Data []JsonList `json:"data"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
