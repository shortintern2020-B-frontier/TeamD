package server

import (
	"net/http"
)

type AppHandler struct {
	h func(http.ResponseWriter, *http.Request) (int, interface{}, error)
}