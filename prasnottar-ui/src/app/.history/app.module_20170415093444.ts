// external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule, PopoverModule,TabsModule  } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AlertService } from "./services/index";
import { QuillEditorModule } from 'ng2-quill-editor';
import { DataTableModule } from "angular2-datatable";
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '../public/assets/i18n', '.json');
}

let modules = [
    AlertModule.forRoot(),
    MaterialModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserModule,
    QuillEditorModule,
    TabsModule.forRoot(),
    FormsModule,
    DataTableModule,
    HttpModule,
    RouterModule,
    BootstrapModalModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule,

    ModalModule.forRoot(),
];

import { AppComponent } from './app.component';

import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';
import { AlertComponent } from "./_directives/alert.component";
let widgets = [
    AppComponent,
    BreadcrumbComponent,
    AppHeaderComponent,
    AppFooterComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent,
    AlertComponent
];

import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AdminLTETranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';
import { GenericService } from './services/generic.service';
import { TruncatePipe } from "./widgets/questions-box/truncate-pipes";

import { SplitCategory } from './widgets/questions-box/split.category.pipe';
let services = [
    UserService,
    BreadcrumbService,
    MessagesService,
    CanActivateGuard,
    NotificationService,
    AdminLTETranslateService,
    LoggerService,
    GenericService, AlertService
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
        LoginComponent
    ],
    imports: [
        ...modules,
        ModalModule.forRoot(),
        routing
    ],
    providers: [
        ...services
    ]
})
export class AppModule { }
