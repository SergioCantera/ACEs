import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HappyBirthdayAdaptiveCardExtensionStrings';
import {
  IHappyBirthdayAdaptiveCardExtensionProps,
  IHappyBirthdayAdaptiveCardExtensionState
} from '../HappyBirthdayAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IHappyBirthdayAdaptiveCardExtensionProps,
  IHappyBirthdayAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
