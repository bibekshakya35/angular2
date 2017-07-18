import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AlertService } from "./services/index";

import { ChatService } from './services/chat.service';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DataTableModule } from "angular2-datatable";
import {
    FieldsetModule
    , EditorModule, SharedModule,
    TabViewModule, ListboxModule,
    OverlayPanelModule,
    DialogModule,
    FileUploadModule,
    GrowlModule,
    LightboxModule,
    AccordionModule,
    StepsModule,
    DataListModule
} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '../public/assets/i18n', '.json');
}

let modules = [
    BrowserModule,
    JsonpModule,
    LightboxModule,
    StepsModule
    , BrowserAnimationsModule,
    DataListModule,
    FormsModule,
    ListboxModule,
    FieldsetModule,
    AccordionModule,
    DataTableModule,
    FileUploadModule,
    HttpModule,
    RouterModule,
    TabViewModule,
    OverlayPanelModule,
    GrowlModule,
    DialogModule,
    Ng2AutoCompleteModule,
    EditorModule, SharedModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule
];

import { AppComponent } from './app.component';

import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { AlertComponent } from "./_directives/alert.component";
let widgets = [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AlertComponent
];

import { UserService } from './services/user.service';
import { AdminLTETranslateService } from './services/translate.service';
import { GenericService } from './services/generic.service';
import { TruncatePipe } from "./widgets/questions-box/truncate-pipes";
import { GlobalService } from './services/global.service';
import { SplitCategory } from './widgets/questions-box/split.category.pipe';
let services = [
    UserService,
    AdminLTETranslateService,
    GenericService, AlertService, GlobalService, ChatService
];

// les pages
import { HomeComponent } from './pages/home/home.component';


let pages = [
    HomeComponent

];

// main bootstrap
import { routing } from './app.routes';
import { QuestionsBoxComponent } from './widgets/questions-box/questions-box.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ShowQuestionComponent } from './pages/show-question/show-question.component';
import { BloodDonarComponent } from './pages/blood-donar/blood-donar.component';
import { DataFilterPipe } from "./pages/blood-donar/blood-donar-pipe";
import { NameFilterPipe } from "./pages/blood-donar/name-pipe";
import { LocationFilterPipe } from "./pages/blood-donar/location-donar-pipe";
import { CategoryComponent } from './widgets/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StarterComponent } from './pages/starter/starter.component';
import { QuickQuestionComponent } from './widgets/quick-question/quick-question.component';
import { FavCategoryComponent } from './widgets/fav-category/fav-category.component';
import { CategoriesPipePipe } from './widgets/fav-category/categories-pipe.pipe';
import { NearbyTravellerComponent } from './pages/nearby-traveller/nearby-traveller.component';
import { PlaesPortfolioComponent } from './pages/plaes-portfolio/plaes-portfolio.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { IntroUserComponent } from './widgets/intro-user/intro-user.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { ChatWidgetComponent } from './widgets/chat-widget/chat-widget.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { ExchangeBookComponent } from './widgets/exchange-book/exchange-book.component';
import { BloodMgmtComponent } from './pages/blood-mgmt/blood-mgmt.component';
import { BloodShowComponent } from './pages/blood-show/blood-show.component';
import { BloodSearchComponent } from './pages/blood-search/blood-search.component';

@NgModule({

    bootstrap: [AppComponent],
    declarations: [
        ...widgets,
        ...pages,
        TruncatePipe,
        DataFilterPipe,
        QuestionsBoxComponent,
        SplitCategory,
        AddQuestionComponent,
        ShowQuestionComponent,
        BloodDonarComponent,
        NameFilterPipe,
        LocationFilterPipe,
        CategoryComponent,
        LoginComponent,
        RegistrationComponent,
        StarterComponent,
        QuickQuestionComponent,
        FavCategoryComponent,
        CategoriesPipePipe,
        NearbyTravellerComponent,
        PlaesPortfolioComponent,
        UserProfileComponent,
        IntroUserComponent,
        ChatRoomComponent,
        ChatWidgetComponent,
        ExchangeComponent,
        ExchangeBookComponent,
        BloodMgmtComponent,
        BloodShowComponent,
        BloodSearchComponent
    ],
    imports: [
        ...modules,

        routing
    ],
    providers: [
        ...services
    ]
})
export class AppModule { }
