package main

import (
	"flag"
	"log"
	"os"

	server "github.com/shortintern2020-B-frontier/TeamD" // need to change
)

// Written by Taishi Hosokawa
func main() {
	var databaseDatasource string
	var port int
	flag.StringVar(&databaseDatasource, "databaseDatasource", "root:password@tcp(localhost:3306)/db_name", "Should looks like root:password@tcp(hostname:port)/dbname")
	flag.IntVar(&port, "port", 1996, "Web server port")
	flag.Parse()

	log.SetFlags(log.Ldate + log.Ltime + log.Lshortfile)
	log.SetOutput(os.Stdout)

	s := server.NewServer()
	if err := s.Init(databaseDatasource); err != nil {
		log.Fatal(err)
	}
	s.Run(port)
}
