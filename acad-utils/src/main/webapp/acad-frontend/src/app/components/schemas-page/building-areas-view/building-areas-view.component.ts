// Platform imports
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Models
import { BuildingArea } from './../../../models/building-area/building-area.model';
import { SidebarPropType } from '../../../models/right-sidebar/right-sidebar-props.model';

// Services
import { BuildingAreasService } from './../../../shared/services/building-areas/building-areas.service';
import { DragHelperService, InteractType } from './../../../shared/services/drag-helper/drag-helper.service';
import { RightSidebarService } from './../../../shared/services/right-sidebar/right-sidebar.service';

/**
 * @description
 * This component should take care about CRUD boxes options
 */
@Component({
  selector: 'app-building-areas-view',
  template: `
  <app-building-area-component
    *ngFor="let area of buildingAreas"
    (click)="showAreaOnSidebar(area)"
    [area]="area"
    [attr.data-id]="area.id"
    [style.left.px]="area.posX"
    [style.top.px]="area.posY"
    class="interactable-schema-area"
  ></app-building-area-component>
  `,
  styles: [`
    :host {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class BuildingAreasViewComponent implements OnInit {
  @Input() buildingAreas: BuildingArea[] = [];

  sidebarProps: { key: string, value: any }[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly buildingAreasService: BuildingAreasService,
    private readonly dragHelper: DragHelperService,
    private readonly rhsService: RightSidebarService,
  ) { }

  ngOnInit() {
    this.createAreasInteraction();
  }

  showAreaOnSidebar(area: BuildingArea): void {
    this.rhsService.nextProps({
      type: SidebarPropType.buildingArea,
      value: area
    });
  }

  saveBuildingArea() {
    if (this.sidebarProps.length) {
      const payload: BuildingArea = this.sidebarProps.reduce(
        (obj, prop) => ({ ...obj, [prop.key]: prop.value }),
        { } as BuildingArea
      );

      const subscription = this.buildingAreasService
        .saveBuildingArea(payload.id, payload)
        .subscribe((updatedArea: BuildingArea) => {
          this.buildingAreasService.buildingAreas.next(
            this.buildingAreas.map((area) => area.id === updatedArea.id ? updatedArea : area)
          );
          subscription.unsubscribe();
        });
    }
  }

  createAreasInteraction() {
    this.dragHelper.createInteractOptions('.interactable-schema-area', InteractType.buildingArea);

    this.subscriptions.push(this.dragHelper
      .onDragEnd()
      .subscribe((params) => this.dragEndCallback(params)));
  }

  dragEndCallback(params) {
    if (params.id && params.type === InteractType.buildingArea) {
      const payload: BuildingArea = {
        ...this.buildingAreasService.buildingAreas.value.find((area) => area.id === params.id),
        posX: params.x,
        posY: params.y
      };

      const subsription = this.buildingAreasService.saveBuildingArea(params.id, payload)
        .subscribe((savedArea) => {
          this.buildingAreasService.buildingAreas.next(
            this.buildingAreas.map((box) => box.id === savedArea.id ? savedArea : box)
          );
          // trigger event to show synced box on sidebar after dragend
          this.rhsService.nextProps({
            type: SidebarPropType.buildingArea,
            value: savedArea
          });
          subsription.unsubscribe();
        });
    }
  }
}