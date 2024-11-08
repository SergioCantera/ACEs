import {
  //ICardBarParameters,
  IImageCardParameters,
  BaseImageCardView,
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HappyBirthdayAdaptiveCardExtensionStrings';
import {
  IHappyBirthdayAdaptiveCardExtensionProps,
  IHappyBirthdayAdaptiveCardExtensionState,
  //QUICK_VIEW_REGISTRY_ID
} from '../HappyBirthdayAdaptiveCardExtension';


export class CardView extends BaseImageCardView<
  IHappyBirthdayAdaptiveCardExtensionProps,
  IHappyBirthdayAdaptiveCardExtensionState
> {
  /*public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
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
  }*/

  public get data():IImageCardParameters {
    const _givenName = this.state.givenName;
    const _birthday = this.state.birthday;
    const date = new Date(_birthday);
    const now = new Date();
    const edad =  now.getFullYear() - date.getFullYear()
    
    return {
      primaryText: `¡Feliz ${edad} cumpleaños, ${_givenName}!`,
      iconProperty: this.properties.iconProperty,
      imageUrl: this.properties.imageUrl || require('../assets/cumple-imagen.jpg'),
      title: this.properties.title || strings.TitleFieldLabel
    };
  }

  /*public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: '#'
      }
    };
  }*/
}
