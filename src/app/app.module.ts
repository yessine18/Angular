import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MemberFormComponent } from './member-form/member-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TemplateComponent } from './template/template.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { PublicationComponent } from './publication/publication.component';
import { EventsComponent } from './events/events.component';
import { ToolsComponent } from './tools/tools.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts'; // Import ng2-charts
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { EventsFormComponent } from './events-form/events-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    PublicationComponent,
    EventsComponent,
    ToolsComponent,
    LoginComponent,
    ModalEventComponent,
    DashboardComponent,
    PublicationFormComponent,
    EventsFormComponent
  ],
  imports: [
    MatCardModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule // Add NgChartsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }