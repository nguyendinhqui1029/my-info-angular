import { CardComponent } from './card/card.component';
import { DialogCustomComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { GridCardComponent } from './grid-card/grid-card.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CVComponent } from './pages/cv/cv.component';
import { TemplateComponent } from './pages/template/template.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RatingComponent } from './rating/rating.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TitleComponent } from "./title/title.component";
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LoginContainerComponent } from './pages/login/login-container/login-container.component';
import { ForgetPasswordComponent } from './pages/login/forget-password/forget-password.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { InputComponent } from './input/input.component';
import { TypeConfig } from 'src/config/type-config';
import { allComponentAdminTypeConfig } from './admin';
import { DetailComponent } from './pages/detail/detail.component';
import { VideoCustomComponent } from './video/video.component';
import { ImageCustomComponent } from './image/image.component';
import { GridImageThumnailComponent } from './grid-image-thumnail/grid-image-thumnail.component';
import { LanguageComponent } from './language/language.component';
import { DialogSelectLanguageComponent } from './dialog/dialog-select-language/dialog-select-language.component';
import { ExpandsionPanelComponent } from './expansion-panel/expansion-panel.component';
import { CommentSectionComponent } from './comment/comment.component';
import { DialogSelectIconComponent } from './dialog/dialog-select-icon/dialog-select-icon.component';
import { MyLifePageComponent } from './pages/my-life/my-life.component';
import { SourceComponent } from './pages/source/source.component';
import { DetailSourceComponent } from './pages/source/detail/detail-source.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SendContactComponent } from './send-contact/send-contact.component';
import { FanpageFacebookComponent } from './fanpage/fanpage.component';
import { CkeditorCustomComponent } from './ckeditor-custom/ckeditor-custom.component';
import { SearchVideoComponent } from './search-video/search-video.component';
import { DialogUpdateComponent } from './dialog/dialog-update/dialog-update.component';
import { HeaderCommentComponent } from './comment/header-comment/header-comment.component';
import { FooterCommentComponent } from './comment/footer-comment/footer-comment.component';
import { AddCommentComponent } from './comment/add-comment/add-comment.component';


export const allComponent = [
  TitleComponent,
  CardComponent,
  InfoCardComponent,
  RatingComponent,
  CVComponent,
  NavigationComponent,
  GridCardComponent,
  TemplateComponent,
  DialogCustomComponent,
  PageNotFoundComponent,
  HomeComponent,
  FooterComponent,
  ScrollTopComponent,
  PaginatorComponent,
  PersonalInfoComponent,
  LoginComponent,
  LoginContainerComponent,
  ForgetPasswordComponent,
  RegisterComponent,
  InputComponent,
  DetailComponent,
  VideoCustomComponent,
  ImageCustomComponent,
  GridImageThumnailComponent,
  LanguageComponent,
  DialogSelectLanguageComponent,
  ExpandsionPanelComponent,
  CommentSectionComponent,
  DialogSelectIconComponent,
  MyLifePageComponent,
  SourceComponent,
  DetailSourceComponent,
  LoginPageComponent,
  CustomCarouselComponent,
  UploadVideoComponent,
  SendContactComponent,
  FanpageFacebookComponent,
  CkeditorCustomComponent,
  SearchVideoComponent,
  DialogUpdateComponent,
  HeaderCommentComponent,
  FooterCommentComponent,
  AddCommentComponent
];

export const allComponentTypeConfig: TypeConfig[] = [
  ...allComponentAdminTypeConfig,
  {
    key: 'titleComponent',
    type: TitleComponent
  },
  {
    key: 'cardComponent',
    type: CardComponent
  },
  {
    key: 'infoCardComponent',
    type: InfoCardComponent
  },
  {
    key: 'ratingComponent',
    type: RatingComponent
  },
  {
    key: 'cVComponent',
    type: CVComponent
  },
  {
    key: 'navigationComponent',
    type: NavigationComponent
  },
  {
    key: 'gridCardComponent',
    type: GridCardComponent
  },
  {
    key: 'templateComponent',
    type: TemplateComponent
  },
  {
    key: 'dialogCustomComponent',
    type: DialogCustomComponent
  },
  {
    key: 'pageNotFoundComponent',
    type: PageNotFoundComponent
  },
  {
    key: 'homeComponent',
    type: HomeComponent
  },
  {
    key: 'footerComponent',
    type: FooterComponent
  },
  {
    key: 'scrollTopComponent',
    type: ScrollTopComponent
  },
  {
    key: 'paginatorComponent',
    type: PaginatorComponent
  },
  {
    key: 'personalInfoComponent',
    type: PersonalInfoComponent
  },
  {
    key: 'loginComponent',
    type: LoginComponent
  },
  {
    key: 'loginContainerComponent',
    type: LoginContainerComponent
  },
  {
    key: 'forgetPasswordComponent',
    type: ForgetPasswordComponent
  },
  {
    key: 'registerComponent',
    type: RegisterComponent
  },
  {
    key: 'inputComponent',
    type: InputComponent
  },
  {
    key: 'detailComponent',
    type: DetailComponent
  },
  {
    key: 'videoCustomComponent',
    type: VideoCustomComponent
  },
  {
    key: 'imageCustomComponent',
    type: ImageCustomComponent
  },
  {
    key: 'gridImageThumnailComponent',
    type: GridImageThumnailComponent
  },
  {
    key: 'languageComponent',
    type: LanguageComponent
  },
  {
    key: 'dialogSelectLanguageComponent',
    type: DialogSelectLanguageComponent
  },
  {
    key: 'expandsionPanelComponent',
    type: ExpandsionPanelComponent
  }, {
    key: 'commentSectionComponent',
    type: CommentSectionComponent
  },
  {
    key: 'dialogSelectIconComponent',
    type: DialogSelectIconComponent
  }, {
    key: 'myLifePageComponent',
    type: MyLifePageComponent
  }, {
    key: 'sourceComponent',
    type: SourceComponent
  },
  {
    key: 'detailSourceComponent',
    type: DetailSourceComponent
  },
  {
    key: 'loginPageComponent',
    type: LoginPageComponent
  },
  {
    key: 'customCarouselComponent',
    type: CustomCarouselComponent
  },
  {
    key: 'uploadVideoComponent',
    type: UploadVideoComponent
  },
  {
    key: 'sendContactComponent',
    type: SendContactComponent
  },
  {
    key: 'fanpageFacebookComponent',
    type: FanpageFacebookComponent
  },
  {
    key: 'ckeditorCustomComponent',
    type: CkeditorCustomComponent
  },
  {
    key: 'searchVideoComponent',
    type: SearchVideoComponent
  },
  {
    key: 'dialogUpdateComponent',
    type: DialogUpdateComponent
  },
  {
    key: 'headerCommentComponent',
    type: HeaderCommentComponent
  },
  {
    key: 'footerCommentComponent',
    type: FooterCommentComponent
  },
  {
    key: 'addCommentComponent',
    type: AddCommentComponent
  }

];

export * from './pages/page-not-found/page-not-found.component';
export * from './pages/cv/cv.component';
export * from './pages/template/template.component';
export * from './paginator/paginator.component';
export * from './rating/rating.component';
export * from './scroll-top/scroll-top.component';
export * from './title/title.component';
export * from './pages/personal-info/personal-info.component';
export * from './pages/login/login/login.component';
export * from './pages/login/login-container/login-container.component';
export * from './pages/login/forget-password/forget-password.component';
export * from './pages/login/register/register.component';
export * from './input/input.component';
export * from './pages/detail/detail.component';
export * from './video/video.component';
export * from './image/image.component';
export * from './grid-image-thumnail/grid-image-thumnail.component';
export * from './language/language.component';
export * from './dialog/dialog-select-language/dialog-select-language.component';
export * from './expansion-panel/expansion-panel.component';
export * from './comment/comment.component';
export * from './dialog/dialog-select-icon/dialog-select-icon.component';
export * from './pages/my-life/my-life.component';
export * from './pages/source/source.component';
export * from './pages/source/detail/detail-source.component';
export * from './pages/login/login-page.component';
export * from './custom-carousel/custom-carousel.component'
export * from './upload-video/upload-video.component';
export * from './send-contact/send-contact.component';
export * from './fanpage/fanpage.component';
export * from './ckeditor-custom/ckeditor-custom.component';
export * from './search-video/search-video.component';
export * from './dialog/dialog-update/dialog-update.component';
export * from './comment/header-comment/header-comment.component';
export * from './comment/footer-comment/footer-comment.component';
export * from './comment/add-comment/add-comment.component';