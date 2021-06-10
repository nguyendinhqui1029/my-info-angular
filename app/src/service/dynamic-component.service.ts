import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { LocatorService } from './locator.service';

@Injectable()
export class DynamicComponentService {
  componentRef: ComponentRef<any>;
  constructor(private ls: LocatorService) {

  }
  renderComponent(component: any, container: ViewContainerRef, data?: any) {
    container.clear();
    const injector = container.injector;
    const crf: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
    const componentFactory = crf.resolveComponentFactory(component);
    const componentRef = container.createComponent(componentFactory, 0, injector);
    componentRef.instance["dataDynamic"] = data;
    componentRef.changeDetectorRef.detectChanges();
    this.componentRef = componentRef;
  }
}