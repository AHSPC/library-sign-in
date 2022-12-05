package frontend

import (
   "embed"

   "github.com/labstack/echo/v4"
)

//go:embed all:build
var distDir embed.FS
var DistDirFS = echo.MustSubFS(distDir, "build")
