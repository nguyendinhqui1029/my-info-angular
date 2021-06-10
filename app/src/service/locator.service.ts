import { Inject, Injectable, Injector } from '@angular/core';
import { COMPONENT_CONFIG_TOKEN, SERVICE_CONFIG_TOKEN } from 'src/config/injection-token';
import { TypeConfig } from 'src/config/type-config';
/////////////////////////////////
//   Config locator service   
//  1. tao inteface TypeConfig property key:string, type:Type<nay>
//  2. inject-token const export key = new injectionToken<[TypeConfig[]]>(key)
//  3. index service export allService kieu TypeCofig
@Injectable()
export class LocatorService {

  constructor(private inject: Injector,
    @Inject(SERVICE_CONFIG_TOKEN) protected allServiceTypeCofig: [TypeConfig[]],
    @Inject(COMPONENT_CONFIG_TOKEN) protected allComponentTypeCofig: [TypeConfig[]]
  ) {
  }

  private getConfigType(keyService: string, allTypeConfig: [TypeConfig[]]) {
    const listTypeConfig = [].concat(...allTypeConfig);
    const configType = listTypeConfig.find((configType: TypeConfig) => {
      return configType.key === keyService
    });
    return configType ? configType.type : null;
  }

  getService<T>(name: string) {
    const type = this.getConfigType(name, this.allServiceTypeCofig);
    return this.inject.get<T>(type);
  }

  getComponent<T>(name: string) {
    return this.getConfigType(name, this.allComponentTypeCofig);
  }
}