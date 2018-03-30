import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RootRouter } from './router/router.js'

import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './redux/app.reducers'
// import { reducer } from './app.state'

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeadComponent } from './components/public/head/head.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { ClassifyComponent } from './components/classify/classify.component';
import { CartComponent } from './components/cart/cart.component';
import { MineComponent } from './components/mine/mine.component';
import { CarouselComponent } from './components/public/carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    HeadComponent,
    FooterComponent,
    ClassifyComponent,
    CartComponent,
    MineComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    // StoreModule.provideStore(reducer),
    FormsModule,
    HttpModule,
    RootRouter,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
