import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { WorkAnniversaryPropertyPane } from './WorkAnniversaryPropertyPane';
import {MSGraphClientV3} from '@microsoft/sp-http';
import {ICardView} from './models/ICardView'

export interface IWorkAnniversaryAdaptiveCardExtensionProps {
  title: string;
  iconProperty: string;
  imageUrl: string;
}

export interface IWorkAnniversaryAdaptiveCardExtensionState {
  givenName:string;
  employeeHireDate:string;
}

const CARD_VIEW_REGISTRY_ID: string = 'WorkAnniversary_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'WorkAnniversary_QUICK_VIEW';

export default class WorkAnniversaryAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IWorkAnniversaryAdaptiveCardExtensionProps,
  IWorkAnniversaryAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: WorkAnniversaryPropertyPane;

  public async onInit(): Promise<void> {
    this.state = { 
      givenName:"",
      employeeHireDate:"",
    };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return this.getMeData();
  }

  private getMeData() {
    this.context.msGraphClientFactory.getClient("3").then((client:MSGraphClientV3): void => {
      client.api("/me")
      .select(["givenname","employeehiredate"])
      .get((error, response:ICardView) => {
        this.setState({
          givenName: response.givenName,
          employeeHireDate: response.employeeHireDate
        })
      })
    })
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'WorkAnniversary-property-pane'*/
      './WorkAnniversaryPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.WorkAnniversaryPropertyPane();
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
