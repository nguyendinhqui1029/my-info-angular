import { TypeConfig } from "src/config/type-config";
import { AuthService } from "./auth.service";
import { CategoryService } from "./category.service";
import { CommentService } from "./comment.service";
import { DynamicComponentService } from "./dynamic-component.service";
import { ImageService } from "./image.service";
import { JsonService } from "./json.service";
import { LocatorService } from "./locator.service";
import { MailerService } from "./mailer.service";
import { MediaScreenService } from "./media-screen.service";
import { MenuService } from "./menu.service";
import { NavigationService } from "./navigation.service";
import { PaginatorService } from "./paginator.service";
import { PostService } from "./post.service";
import { UploadVideoService } from "./upload-video.service";

export const allService = [
  LocatorService,
  JsonService,
  MediaScreenService,
  NavigationService,
  PaginatorService,
  DynamicComponentService,
  ImageService,
  MenuService,
  AuthService,
  UploadVideoService,
  MailerService,
  PostService,
  CommentService,
  CategoryService
];
export const allServiceTypeConfig: TypeConfig[] = [
  {
    key: "jsonService",
    type: JsonService
  },
  {
    key: "mediaScreenService",
    type: MediaScreenService
  },
  {
    key: "navigationService",
    type: NavigationService
  },
  {
    key: "paginatorService",
    type: PaginatorService
  },
  {
    key: "dynamicComponentService",
    type: DynamicComponentService
  },
  {
    key: "imageService",
    type: ImageService
  },
  {
    key: "menuService",
    type: MenuService
  },
  {
    key: "authService",
    type: AuthService
  },
  {
    key: "uploadVideoService",
    type: UploadVideoService
  },
  {
    key: "mailerService",
    type: MailerService
  },
  {
    key: "postService",
    type: PostService
  },
  {
    key: "commentService",
    type: CommentService
  },
  {
    key: "categoryService",
    type: CategoryService
  }
];

export * from "./json.service";
export * from "./media-screen.service";
export * from "./navigation.service";
export * from "./paginator.service";
export * from "./dynamic-component.service";
export * from "./image.service";
export * from "./menu.service";
export * from "./auth.service";
export * from "./upload-video.service";
export * from "./mailer.service";
export * from "./comment.service";
export * from "./category.service";