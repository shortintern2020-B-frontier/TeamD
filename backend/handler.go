package server

import (
	"net/http"
	"github.com/shortintern2020-B-frontier/TeamD/httputil"
)

// この形式で値を返すようにする
type AppHandler struct {
	h func(http.ResponseWriter, *http.Request) (int, interface{}, error)
}

//JSONで返す
func (a AppHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	status, res, err := a.h(w, r)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:1234")
	if err != nil {
		httputil.RespondJSON(w, status, err)
		return
	}
	httputil.RespondJSON(w, status, res)
	return
}