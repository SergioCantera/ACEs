import { BaseWebQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import {
  IHtmlTestAdaptiveCardExtensionProps,
  IHtmlTestAdaptiveCardExtensionState
} from '../HtmlTestAdaptiveCardExtension';
//import { escape } from '@microsoft/sp-lodash-subset';
//import styles from './QuickView.module.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Main} from './components/Main'

export class QuickView extends BaseWebQuickView<
  IHtmlTestAdaptiveCardExtensionProps,
  IHtmlTestAdaptiveCardExtensionState
> {
  public get data(): any {
    return this.state.data
  }

  render(): void {
    const _data = this.data;
    const App: React.ReactElement<{}> = React.createElement(
      Main, [_data]
    )
    
    ReactDOM.render(App, this.domElement)
  }
  public onDispose():void{
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.dispose()
  }
}
