import { TranslateModule } from "@ngx-translate/core";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { TooltipModule } from "primeng/tooltip";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputOtpModule } from 'primeng/inputotp';
import { ScrollPanelModule } from 'primeng/scrollpanel';

export const PrimeComponent = [
    // Translate Module
    TranslateModule,
    // Prime Component
    SidebarModule,
    AvatarModule,
    ButtonModule,
    TooltipModule,
    DynamicDialogModule,
    RadioButtonModule,
    TabViewModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    InputOtpModule,
    ScrollPanelModule
];