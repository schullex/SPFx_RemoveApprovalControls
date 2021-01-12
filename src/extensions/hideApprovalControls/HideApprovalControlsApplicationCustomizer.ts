import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HideApprovalControlsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HideApprovalControlsApplicationCustomizer';

export interface IHideApprovalControlsApplicationCustomizerProperties {
  debugMessage: string;
}

export default class HideApprovalControlsApplicationCustomizer
  extends BaseApplicationCustomizer<IHideApprovalControlsApplicationCustomizerProperties> {
  
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}. Version is ${this.manifest.version}`);

    // Comment in for debugging.

    // let message: string = this.properties.debugMessage;
    // Dialog.alert(`Debug ${strings.Title}:\n\n${message}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top
      );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
  
      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML = '<style>button[data-automationid="approveRejectCommand"] {display: none;}</style>';
      }
    }
  }
}

