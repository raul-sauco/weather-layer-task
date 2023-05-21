# Building a Weather Layer

We are building a layer that displays weather data in top of the page content.

For the data we will be using the [OpenWeatherMap API][1], the weather layer
will display in a corner of the viewport and will switch corners at a regular
interval.

![screenshot](./res/img/screenshot.png)

## Design decisions

We could have started with something like the [HTML5 Boilerplate][2], or used a
library like Angular or React, but the task is simple enough that using plain
HTML/JS/CSS and starting from scratch is also a good option.

## Viewing the result

The page is accessible in GitHub Pages.

## Local development

Ideally you will have Node, Docker and Docker Compose.

The build step is as simple as calling _Gulp_ from the root of the project. If you have a newer version of node, it will include _npx_ and you can just run `npx gulp`, this will build and start watching your sources for changes.

To deploy, run `docker compose up -d` from the root of the project and then point your browser to `http://localhost:8080`. If you are already using that port, update it inside _docker-compose.yml_.

## TODO

Make units, location and other parameters adjustable.

Add tests, remove secrets from VCS, remove the video and leave the layer by itself.

[1]: https://api.openweathermap.org/data/2.5/weather
[2]: https://github.com/h5bp/html5-boilerplate
