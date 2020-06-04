import { ComponentType } from 'react';

export type CellComponentDef = {
  type: ComponentType<any>;
  ownProps?: any;
};