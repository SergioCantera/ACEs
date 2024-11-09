import {
  BaseImageCardView,
  IImageCardParameters
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'WorkAnniversaryAdaptiveCardExtensionStrings';
import {
  IWorkAnniversaryAdaptiveCardExtensionProps,
  IWorkAnniversaryAdaptiveCardExtensionState,
  //QUICK_VIEW_REGISTRY_ID
} from '../WorkAnniversaryAdaptiveCardExtension';

export class CardView extends BaseImageCardView<
  IWorkAnniversaryAdaptiveCardExtensionProps,
  IWorkAnniversaryAdaptiveCardExtensionState
> {
    public get data():IImageCardParameters{
      const _givenName = this.state.givenName;
      const _employeeHireDate = this.state.employeeHireDate;
      const date = new Date(_employeeHireDate);
      const now = new Date();
      const years =  now.getFullYear() - date.getFullYear() 


      return {
        primaryText: `¡Feliz ${years}º aniversario, ${_givenName}!`,
        iconProperty: this.properties.iconProperty,
        imageUrl: this.properties.imageUrl || require('../assets/anniversary-image.jpg'),
        title: this.properties.title || strings.TitleFieldLabel
      }
    }
  /*public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }*/
}
