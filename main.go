package main

import (
   "fmt"
	"log"
   "flag"
   
   "library-backend/config"
   "library-backend/routes"
)

var configPath string

func init() {
	flag.StringVar(&configPath, "config", "config.yml", "path to the config file")
	flag.Parse()
}

func main() {
	cfg, err := config.NewConfig(configPath)
	if err != nil {
		log.Fatal(err)
	}
   
   router := routes.NewApi(cfg)
	router.Logger.Fatal(router.Start(fmt.Sprintf(":%d", cfg.Server.Port)))
}