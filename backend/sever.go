package server

import (
	"log"
	"net/http"
	"os"
	"fmt"

	"github.com/shortintern2020-B-frontier/TeamD/db"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type Server struct {
	db         *sqlx.DB
	router     *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(datasource string) error {
	cs := db.NewDB(datasource)
	dbcon, err := cs.Open()
	if err != nil {
		return fmt.Errorf("failed db init. %s", err)
	}
	s.db = dbcon
	s.router = s.Route()
	return nil
}

func (s *Server) Run(port int) {
	log.Printf("Listening on port %d", port)

	err := http.ListenAndServe(
		fmt.Sprintf(":%d", port),
		handlers.CombinedLoggingHandler(os.Stdout, s.router),
	)
	if err != nil {
		panic(err)
	}
}

func (s *Server) Route() *mux.Router {
	r := mux.NewRouter()
	r.Methods(http.MethodGet).Path("/ping").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("pong"))
	})

	return r
}
