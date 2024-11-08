import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HappyBirthdayPropertyPane } from './HappyBirthdayPropertyPane';
import {MSGraphClientV3} from '@microsoft/sp-http';

export interface IHappyBirthdayAdaptiveCardExtensionProps {
  title: string;
  iconProperty: string;
  imageUrl: string;
}

export interface IHappyBirthdayAdaptiveCardExtensionState {
  givenName: string;
  birthday: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'HappyBirthday_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HappyBirthday_QUICK_VIEW';

export default class HappyBirthdayAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHappyBirthdayAdaptiveCardExtensionProps,
  IHappyBirthdayAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HappyBirthdayPropertyPane;

  

  public async onInit(): Promise<void> {
    this.state = { 
      givenName:"",
      birthday: "",
    };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView())

    

    return this._fetchData();
  }

  private _fetchData() {
    this.context.msGraphClientFactory.getClient("3").then((client:MSGraphClientV3): void => {
      client.api("/me")
      .select(["displayName","givenname","birthday"])
      .get((error, response:any) => {
        this.setState({
          givenName: response.givenName,
          birthday: response.birthday
        })
      })
    })
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'HappyBirthday-property-pane'*/
      './HappyBirthdayPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.HappyBirthdayPropertyPane();
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
