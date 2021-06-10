import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';


@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild("containerInfo", { static: true, read: ViewContainerRef }) containerInfo: ViewContainerRef;
  dynamicComponentService: DynamicComponentService;
  listComponent = ["commentSectionComponent", "languageComponent", "syntaxHighlightComponent", "sourceComponent"];
  loadedComponent: string[] = [];
  locaScroll: number = 0;
  index: number = 0;
  constructor(private ls: LocatorService, private cd: ChangeDetectorRef) {
    this.dynamicComponentService = this.ls.getService<DynamicComponentService>("dynamicComponentService");

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const section = document.querySelector("section");
    const isScrollDown = window.scrollY > this.locaScroll;
    const valueScrollY = window.scrollY % (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight);
    if (valueScrollY > 100 && isScrollDown) {
      if (this.isLoadComponent(isScrollDown, this.listComponent)) {
        this.dynamicComponentService.renderComponent(this.ls.getComponent(this.listComponent[this.loadedComponent.length - 1]), this.containerInfo);
      }
    } else {

    }
    section.style.clipPath = `circle(${valueScrollY}px at center center)`;
    this.locaScroll = window.scrollY;
  }

  isLoadComponent(isScrollDown: boolean, listComponent: string[]) {
    if (isScrollDown) {
      if (this.loadedComponent.length === 0 || this.loadedComponent.indexOf(listComponent[this.index]) < 0) {
        this.loadedComponent.push(listComponent[this.index]);
        return true;
      }
      return false;
    } else {
      if (this.loadedComponent.length > 0 || this.loadedComponent.indexOf(listComponent[this.index]) > 0) {
        this.loadedComponent.pop();
        return true;
      }
      return false;
    }
  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
