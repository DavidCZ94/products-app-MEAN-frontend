# Products app MEAN Frontend

This repository is part of an application created with MEAN stack , this is the front end. You can see the other parts of the complete project in the next links [proxy server](https://github.com/DavidCZ94/products-app-mean-proxy-server) and [API server](https://github.com/DavidCZ94/products-app-MEAN-api-server) . 

This project has been created with educational purposes and the objective is to achieve a complete web application using technologies based on JavaScript such as Mongodb, expressJs, Angular and nodeJs ( MEAN ). 

The front end has been developed with good practices on security implementing a modern modern security stack. In this implementation when the user sing-in in the application the front end send an authorization request with the user data waiting for a response from back end , if the user has access permissions to the database the front end will receive an authorization token which will be stored. From here the front end should send the authorization token in every request waiting for the response from the back end.


I hope that you enjoy the application and feel free to mention if the code has any errors I will gladly correct them.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
