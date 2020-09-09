package server

import (
	"log"
	"net/http"
	"os"
	"fmt"

	"github.com/shortintern2020-B-frontier/TeamD/db"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
    "github.com/shortintern2020-B-frontier/TeamD/controller"
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
        w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("pong"))
	})

	r.Methods(http.MethodOptions).HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, access-control-allow-origin")
		w.WriteHeader(http.StatusOK)
	})
	
	r.Methods(http.MethodOptions).Path("/api/room/{room_id}/feeling").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, access-control-allow-origin")
		w.WriteHeader(http.StatusOK)
	})
	
    room_controller := controller.NewRoom(s.db)
	r.Methods(http.MethodGet).Path("/api/room").Handler(AppHandler{room_controller.FindAllRooms})
	
	feelingController := controller.NewFeeling(s.db)
	r.Methods(http.MethodPost).Path("/api/room/{id:[0-9]+}/feeling").Handler(AppHandler{feelingController.CreateFeeling})

	stamp_controller := controller.NewStamp(s.db)
	r.Methods(http.MethodGet).Path("/api/room/{room_id}/feeling").Queries("ellapsed_time", "{[0-9]+?}").Handler(AppHandler{stamp_controller.FindStamps})
	
	audienceController := controller.NewAudience(s.db)
	r.Methods(http.MethodGet).Path("/api/room/{room_id}/audience").Queries("ellapsed_time", "{[0-9]+?}").Handler(AppHandler{audienceController.FindAudience})

	info_controller := controller.NewRoomInfo(s.db)
  r.Methods(http.MethodGet).Path("/api/room/{room_id}").Handler(AppHandler{info_controller.ShowRoomInfo})
	return r

}
