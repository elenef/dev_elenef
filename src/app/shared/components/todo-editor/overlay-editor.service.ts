import { Injectable, Injector, ElementRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { TodoEditorComponent, TODO } from './todo-editor.component';
import { Todo } from '../../../api/contracts/todo';

@Injectable({
  providedIn: 'root'
})
export class OverlayEditorService {
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {
  }

  public openEditor(todo: Todo, origin: ElementRef) {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    const strategy = this.overlay.position().flexibleConnectedTo(origin)
      .withPositions(this.getOverlayPositions);

    this.overlayRef = this.overlay.create(this.getOverlayConfig(strategy));

    const injector = this.createEditorInjector(this.overlayRef, todo);
    const componentPortal = new ComponentPortal(TodoEditorComponent, null, injector);

    this.overlayRef.backdropClick().subscribe(_ => this.overlayRef.detach());

    this.overlayRef.attach(componentPortal);
  }


  private get getOverlayPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start', originY: 'top',
        overlayX: 'start', overlayY: 'top',
      }];
  }

  getOverlayConfig(strategy: FlexibleConnectedPositionStrategy): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: strategy,
      hasBackdrop: true,
    });
  }

  private createEditorInjector(overlayRef: OverlayRef, todo: Todo): PortalInjector {
    const injectorTokens = new WeakMap();

    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(TODO, todo);

    return new PortalInjector(this.injector, injectorTokens);
  }
}
