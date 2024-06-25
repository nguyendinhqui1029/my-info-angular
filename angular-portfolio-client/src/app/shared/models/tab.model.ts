import { Component, Type } from '@angular/core';
export interface TabItem {
    id: string;
    name: string;
    icon?: string;
    component: Type<Component>;
}