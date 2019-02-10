package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/GeertJohan/go.rice"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {
	box := rice.MustFindBox("resources").HTTPBox()

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.New("index").Parse(box.MustString("index.tmpl"))
		t.Execute(w, nil)
	})

	r.Get("/checker", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.New("checker").Parse(box.MustString("checker.tmpl"))
		t.Execute(w, nil)
	})

	r.Get("/dist/*", func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("/dist/", http.FileServer(rice.MustFindBox("dist").HTTPBox())).ServeHTTP(w, r)
	})

	if err := http.ListenAndServe(":8086", r); err != nil {
		log.Fatal(err)
	}
}
