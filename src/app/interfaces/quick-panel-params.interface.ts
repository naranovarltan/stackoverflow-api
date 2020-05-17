import { QuickPanelType } from '../types/quick-panel.type';

export interface QuickPanelParamsInterface {
  type: QuickPanelType;
  info: string;
  userId?: number;
  tag?: string;
}
