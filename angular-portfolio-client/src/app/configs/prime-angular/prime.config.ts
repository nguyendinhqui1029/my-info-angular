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
import { LabelWrapperComponent } from "@app/components/common/label-wrapper/label-wrapper.component";
import { VideoCardComponent } from "@app/components/common/card/video-card/video-card.component";
import { LeftContentCardComponent } from "@app/components/common/card/left-content-card/left-content-card.component";
import { VideoComponent } from "@app/components/common/video/video.component";
import { CircleImageCardComponent } from "@app/components/common/card/circle-image-card/circle-image-card.component";
import { ImageAroundComponent } from "@app/components/common/image-around/image-around.component";

export const PrimeComponent = [
    //Custom component
    LabelWrapperComponent,
    VideoCardComponent,
    LeftContentCardComponent,
    VideoComponent,
    CircleImageCardComponent,
    ImageAroundComponent,
    
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