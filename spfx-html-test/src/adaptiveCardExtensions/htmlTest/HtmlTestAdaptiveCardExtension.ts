import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HtmlTestPropertyPane } from './HtmlTestPropertyPane';

export interface IHtmlTestAdaptiveCardExtensionProps {
  title: string;
}

export interface IHtmlTestAdaptiveCardExtensionState {
  data:any
}

const CARD_VIEW_REGISTRY_ID: string = 'HtmlTest_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HtmlTest_QUICK_VIEW';

export default class HtmlTestAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHtmlTestAdaptiveCardExtensionProps,
  IHtmlTestAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HtmlTestPropertyPane;
  
  public async onInit(): Promise<void> {
    this.state = {
      data: []
    };
    
    //Mock data from json
    const tabsData: any = require('./models/courses-sample-data.json')
    const filteredCourses: any = tabsData.filter((course:{title:string}) => course.title)
    this.setState({
      data: filteredCourses
    })

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'HtmlTest-property-pane'*/
      './HtmlTestPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.HtmlTestPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
