package main

import (
	"flag"
	"html/template"
	"log"
	"net"
	"net/http"
	"strconv"

	"github.com/GeertJohan/go.rice"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {
	var port int

	flag.IntVar(&port, "port", 8080, "Port to run this service on")
	flag.Parse()

	box := rice.MustFindBox("resources").HTTPBox()

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.New("index").Parse(box.MustString("index.tmpl"))
		t.Execute(w, nil)
	})

	r.Get("/proxy-checker", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.New("proxy-checker").Parse(box.MustString("proxy-checker.tmpl"))
		t.Execute(w, nil)
	})

	r.Get("/dist/*", func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("/dist/", http.FileServer(rice.MustFindBox("dist").HTTPBox())).ServeHTTP(w, r)
	})

	if err := http.ListenAndServe(net.JoinHostPort("0.0.0.0", strconv.Itoa(port)), r); err != nil {
		log.Fatal(err)
	}
}
