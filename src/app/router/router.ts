import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ClassifyComponent } from '../components/classify/classify.component';
import { CartComponent } from '../components/cart/cart.component';
import { MineComponent } from '../components/mine/mine.component';

const appRoutes: Routes = [
    { path:'',component:HomeComponent },
    { path:'home',component:HomeComponent },
    { path:'classify',component:ClassifyComponent },
    { path:'cart',component:CartComponent },
    { path:'mine',component:MineComponent },
    { path:'login',component:LoginComponent },
    { path:'**',component:NotFoundComponent },
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    { enableTracing: false }
)