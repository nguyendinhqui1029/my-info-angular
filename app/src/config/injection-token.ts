import { InjectionToken } from "@angular/core";
import { TypeConfig } from "./type-config";

export const SERVICE_CONFIG_TOKEN = new InjectionToken<TypeConfig>('SERVICE_CONFIG_TOKEN');
export const COMPONENT_CONFIG_TOKEN = new InjectionToken<TypeConfig>('COMPONENT_CONFIG_TOKEN');