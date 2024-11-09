import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'WorkAnniversaryAdaptiveCardExtensionStrings';

export class WorkAnniversaryPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('iconProperty', {
                  label: strings.IconFieldLabel
                }),
                PropertyPaneTextField('imageUrl', {
                  label: strings.ImageFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
