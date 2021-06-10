import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'src/model/menu.model';
import { DynamicComponentService, MediaScreenService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpandsionPanelComponent implements OnInit {
  @Input("containe") containe: ViewContainerRef;
  @Input("dataExpandsion") dataExpandsion: MenuItem;
  @Input("color") color: string;
  @Input("background") background: string;
  @Input("index") index: number;
  @ViewChild("panelH") panelH: ElementRef;
  iconName: string = "keyboard_arrow_right";
  isDeviceXS: boolean = false;
  dynamicComponentService: DynamicComponentService;
  mediaScreenService: MediaScreenService;

  constructor(private ls: LocatorService, private cd: ChangeDetectorRef) {
    this.dynamicComponentService = this.ls.getService<DynamicComponentService>("dynamicComponentService");
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
  }

  ngOnInit(): void {
    this.changeIconName();
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
      if (this.isDeviceXS) {
        (this.panelH as any).panel.close();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.index === 0) {
      this.markActionForTabParent(this.dataExpandsion.id);
      if (!this.dataExpandsion.url && this.dataExpandsion.children.length > 0) {
        this.dynamicComponentService.renderComponent(this.ls.getComponent(this.dataExpandsion.children[0].url), this.containe, this.dataExpandsion.children[0]);
        this.markActionForTab(this.dataExpandsion.children[0].id);
      } else {
        this.dynamicComponentService.renderComponent(this.ls.getComponent(this.dataExpandsion.url), this.containe, this.dataExpandsion);
      }

    }
  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  clickExpandsion(event) {
    this.changeIconName();
    if (!this.dataExpandsion.children || this.dataExpandsion.children.length === 0) {
      this.markActionForTabParent(this.dataExpandsion.id);
      if (document.querySelector(".active-child")) {
        while (document.querySelector(".active-child")) {
          document.querySelector(".active-child").classList.remove('active-child');
        }
      }
      this.getComponent(this.dataExpandsion)
      event._toggle();
    }
  }

  changeIconName() {
    if (this.dataExpandsion.children && this.dataExpandsion.children.length > 0) {
      if (this.iconName === "keyboard_arrow_up") {
        this.iconName = "keyboard_arrow_down";
      } else {
        this.iconName = "keyboard_arrow_up";
      }
    }
  }

  markActionForTab(id) {
    if (document.querySelector(".active-child")) {
      while (document.querySelector(".active-child")) {
        document.querySelector(".active-child").classList.remove('active-child');
      }
    }
    document.querySelector(`#${id}`).classList.add('active-child');
  }

  markActionForTabParent(id) {
    if (document.querySelector(".active-parent")) {
      while (document.querySelector(".active-parent")) {
        document.querySelector(".active-parent").classList.remove('active-parent');
      }
    }
    document.querySelector(`#${id}`).classList.add('active-parent');
  }
  getComponent(object) {
    this.dynamicComponentService.renderComponent(this.ls.getComponent(object.url), this.containe, object);
  }

  autoCloseExpandsionMobile(event) {
    if (this.isDeviceXS) {
      event._toggle();
    }
  }
}
