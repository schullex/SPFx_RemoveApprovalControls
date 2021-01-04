import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HideApprovalControlsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HideApprovalControlsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHideApprovalControlsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HideApprovalControlsApplicationCustomizer
  extends BaseApplicationCustomizer<IHideApprovalControlsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    var style = document.createElement('style');
    style.innerHTML =
      'button[name="Approve/Reject"] {' +
        'display: none;' +
      '}';
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);

    /* let approveRejectButton: Element = document.getElementsByName('Approve/Reject')[0];
    if (approveRejectButton !== null) 
      approveRejectButton.setAttribute('display', 'none'); */
   
    return Promise.resolve();
  }
}
