import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ClassifyComponent } from '../components/classify/classify.component';
import { CartComponent } from '../components/cart/cart.component';
import { MineComponent } from '../components/mine/mine.component';
import { SearchComponent } from '../components/search/search.component';
import { CourseDetailComponent } from '../components/course-detail/course-detail.component';
import { SpinnerComponent } from '../components/public/spinner/spinner.component';
import { AdvertisingComponent } from '../components/public/advertising/advertising.component';
import { RulesComponent } from '../components/rules/rules.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { TrainClassComponent } from '../components/train-class/train-class.component';
import { ApplytrainComponent } from '../components/applytrain/applytrain.component';
import {TrainListComponent } from '../components/train-list/train-list.component';
import {CollectionComponent} from '../components/collection/collection.component'
import {UnfinishedCourseComponent} from '../components/unfinished-course/unfinished-course.component'
import {ExamcenterComponent} from '../components/examcenter/examcenter.component'
import {StudyRecordComponent} from '../components/study-record/study-record.component'

const appRoutes: Routes = [
    { path:'',component:HomeComponent },
    { path:'home',component:HomeComponent },
    { path:'classify',component:ClassifyComponent },
    { path:'cart',component:CartComponent },
    { path:'mine',component:MineComponent },
    { path:'login',component:LoginComponent },
    { path:'search',component:SearchComponent },
    { path:'spinner',component:SpinnerComponent },
    { path:'coursedetail/:id/:name',component:CourseDetailComponent },
    { path:'advertising',component:AdvertisingComponent },
    { path:'rules',component:RulesComponent },
    { path:'userinfo',component:UserInfoComponent },
    { path:'trainclass/:id/:title',component:TrainClassComponent },
    { path:'applytrain/:id',component:ApplytrainComponent },
    { path:'trainlist',component:TrainListComponent },
    { path:'collection',component:CollectionComponent },
    { path:'unfinishedcourse',component:UnfinishedCourseComponent },
    { path:'examcenter',component:ExamcenterComponent },
    { path:'studyrecord',component:StudyRecordComponent },
    { path:'**',component:NotFoundComponent },
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    { enableTracing: false }
)