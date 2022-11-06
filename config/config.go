package config

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Server struct {
	Port   int64  `yaml:"port"`
	Domain string `yaml:"domain"`
}

type Config struct {
	Debug    bool   `yaml:"debug"`
	Timezone string `yaml:"timezone"`
	Server   Server `yaml:"server"`
	Database string `yaml:"database"`
}

func NewConfig(path string) (*Config, error) {
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	config := &Config{}

	err = yaml.Unmarshal(bytes, config)
	if err != nil {
		return nil, err
	}

	return config, nil
}
