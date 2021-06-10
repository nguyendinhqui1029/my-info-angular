import { TypeConfig } from "src/config/type-config";
import { AdminContainerComponent } from "./admin-container.component";
import { AddAccountComponent } from "./account/add/add.component";
import { DeleteAccountComponent } from "./account/delete/delete.component";
import { UpdateAccountComponent } from "./account/update/update.component";
import { FooterAminComponent } from "./footer/footer.component";
import { AddMenuComponent } from "./menu/add/add.component";
import { DeleteMenuComponent } from "./menu/delete/delete.component";
import { UpdateMenuComponent } from "./menu/update/update.component";
import { OverviewComponent } from "./overview/overview.component";
import { AddPostComponent } from "./post/add/add.component";
import { DeletePostComponent } from "./post/delete/delete.component";
import { UpdatePostComponent } from "./post/update/update-post.component";

export const allComponentAdmin = [
  FooterAminComponent,
  AdminContainerComponent,

  AddAccountComponent,
  DeleteAccountComponent,
  UpdateAccountComponent,

  AddMenuComponent,
  DeleteMenuComponent,
  UpdateMenuComponent,

  AddPostComponent,
  DeletePostComponent,
  UpdatePostComponent,
  OverviewComponent
];

export const allComponentAdminTypeConfig: TypeConfig[] = [
  {
    key: 'footerAminComponent',
    type: FooterAminComponent
  },
  {
    key: 'adminContainerComponent',
    type: AdminContainerComponent
  },
  {
    key: 'addAccountComponent',
    type: AddAccountComponent
  },
  {
    key: 'deleteAccountComponent',
    type: DeleteAccountComponent
  },
  {
    key: 'updateAccountComponent',
    type: UpdateAccountComponent
  },
  {
    key: 'addMenuComponent',
    type: AddMenuComponent
  },
  {
    key: 'deleteMenuComponent',
    type: DeleteMenuComponent
  },
  {
    key: 'updateMenuComponent',
    type: UpdateMenuComponent
  },
  {
    key: 'overviewComponent',
    type: OverviewComponent
  },
  {
    key: 'addPostComponent',
    type: AddPostComponent
  },
  {
    key: 'deletePostComponent',
    type: DeletePostComponent
  },
  {
    key: 'updatePostComponent',
    type: UpdatePostComponent
  }
];
export * from "./footer/footer.component";
export * from "./admin-container.component";
export * from "./account/add/add.component";
export * from "./account/delete/delete.component";
export * from "./account/update/update.component";
export * from "./menu/add/add.component";
export * from "./menu/delete/delete.component";
export * from "./menu/update/update.component";
export * from "./overview/overview.component";
export * from "./post/add/add.component";
export * from "./post/delete/delete.component";
export * from "./post/update/update-post.component";
