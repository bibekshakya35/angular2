import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { HomeComponent } from './pages/home/home.component';
import { StarterComponent } from './pages/starter/starter.component';
import { ShowQuestionComponent } from './pages/show-question/show-question.component';
import { LoginComponent } from "./pages/login/login.component";
import { BloodDonarComponent } from './pages/blood-donar/blood-donar.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ApNearbytravelComponent } from './pages/ap-nearbytravel/ap-nearbytravel.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NearbyTravellerComponent } from './pages/nearby-traveller/nearby-traveller.component';
import { ChatRoomComponent } from "./pages/chat-room/chat-room.component";
import { ChatWidgetComponent } from "./widgets/chat-widget/chat-widget.component";
import { ExchangeComponent } from "./pages/exchange/exchange.component";
import { BloodMgmtComponent } from "./pages/blood-mgmt/blood-mgmt.component";
import { BloodShowComponent } from "./pages/blood-show/blood-show.component";
const routes: Routes = [
  // logged routes
  {

    component: HomeComponent,
    path: 'prasna'
  },
  {

    component: AddQuestionComponent,
    path: 'sodumprasna'
  },
  {

    component: ShowQuestionComponent,
    path: 'prasna/uttar/:id'
  },
  {
    component: BloodShowComponent,
    path: 'raktadan'
  },
  {
    component: LoginComponent,
    path: "login",
  },

  {
    component: RegistrationComponent,
    path: "registration",
  },
  {
    component: StarterComponent,
    path: ''
  },
  {
    component: NearbyTravellerComponent,
    path: "nearby"
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: "chatroom/:id",
    component: ChatRoomComponent
  },
  {
    path: "chatrooms",
    component: ChatWidgetComponent
  },
  {
    path: "exchange",
    component: ExchangeComponent
  },
  {
    path:
  }
  {
    path: '**',
    pathMatch: 'prefix',
    redirectTo: ""
  }


  // not logged routes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
