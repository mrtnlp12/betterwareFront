import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions({ skipInitialTransition: true })), importProvidersFrom(HttpClientModule, BrowserAnimationsModule, BrowserModule)],
};
