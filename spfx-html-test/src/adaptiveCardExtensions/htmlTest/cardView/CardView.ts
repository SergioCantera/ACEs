import {
  IExternalLinkCardAction,
  IQuickViewCardAction,
  BaseImageCardView,
  IImageCardParameters,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HtmlTestAdaptiveCardExtensionStrings';
import {
  IHtmlTestAdaptiveCardExtensionProps,
  IHtmlTestAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../HtmlTestAdaptiveCardExtension';

export class CardView extends BaseImageCardView<
  IHtmlTestAdaptiveCardExtensionProps,
  IHtmlTestAdaptiveCardExtensionState
> {

  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: "QuickView",
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ]
  }

  public get data():IImageCardParameters {

    const filteredCourses = this.state.data
    const expiran: string = strings.MsgExpiresSoon.toLowerCase()
    const vencidos: string = strings.ExpiredCourseHeader.toLowerCase()
    return {
      primaryText: `${filteredCourses.filter((course:{daysRemaining:number}) => course.daysRemaining >= 0 && course.daysRemaining < 7).length} ${expiran}\n
      ${filteredCourses.filter((course:{daysRemaining:number}) => course.daysRemaining < 0).length} ${vencidos}`,
      imageUrl: require('../assets/welcome-light.png'),
      title: this.properties.title || strings.TitleFieldLabel
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
