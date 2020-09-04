package httputil

import (
	"encoding/json"
	"net/http"
)

// JSONでレスポンスを返すようにする
func RespondJSON(w http.ResponseWriter, status int, payload interface{}) {
    response, err := json.MarshalIndent(payload, "", "    ")
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(err.Error()))
        return
    }
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    w.Write([]byte(response))
}