import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RootRouter } from './router/router.js';

import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './redux/app.reducers';
// import { reducer } from './app.state'
import { RangePipe, ToArrPipe } from './pipe/user-default.pipe';

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
import { CustomUlComponent } from './components/public/custom-ul/custom-ul.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/public/spinner/spinner.component';
import { AdvertisingComponent } from './components/public/advertising/advertising.component';
import { RulesComponent } from './components/rules/rules.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { TrainClassComponent } from './components/train-class/train-class.component';
import { ApplytrainComponent } from './components/applytrain/applytrain.component';
import { TrainListComponent } from './components/train-list/train-list.component';
import { CollectionComponent } from './components/collection/collection.component';
import { UnfinishedCourseComponent } from './components/unfinished-course/unfinished-course.component';
import { ExamcenterComponent } from './components/examcenter/examcenter.component';
import { StudyRecordComponent } from './components/study-record/study-record.component';
import { RetrievePasswordComponent } from './components/retrieve-password/retrieve-password.component';
import { SurveyComponent } from './components/survey/survey.component';


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
    CustomUlComponent,
    SearchComponent,
    SpinnerComponent,
    AdvertisingComponent,
    RulesComponent,
    UserInfoComponent,
    CourseDetailComponent,

    RangePipe,
    ToArrPipe,
    TrainClassComponent,
    ApplytrainComponent,
    TrainListComponent,
    CollectionComponent,
    UnfinishedCourseComponent,
    ExamcenterComponent,
    StudyRecordComponent,
    RetrievePasswordComponent,
    SurveyComponent,
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
