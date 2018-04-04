import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Models
import { Schema } from '../../../models/schema.model';
import { Box } from './../../../models/box/box.model';
import { BuildingArea } from './../../../models/building-area/building-area.model';

// Services
import { SchemasService } from './../../../shared/services/schemas/schemas.service';
import { RightSidebarService } from './../../../shared/services/right-sidebar/right-sidebar.service';
import { BuildingAreasService } from './../../../shared/services/building-areas/building-areas.service';
import { BoxesService } from './../../../shared/services/boxes/boxes.service';
import { SidebarPropType } from '../../../models/right-sidebar/right-sidebar-props.model';

@Component({
  selector: 'app-schema-view-component',
  templateUrl: './schema-view.component.html',
  styleUrls: ['./schema-view.component.scss'],
})
export class SchemaViewComponent implements OnInit, OnDestroy {
  schema: Schema;
  boxes$: Observable<Box[]>;
  buildingAreas$: Observable<BuildingArea[]>;

  sidebarProps: { key: string, value: any }[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly schemasService: SchemasService,
    private readonly boxesService: BoxesService,
    private readonly buildingAreasService: BuildingAreasService,
    private readonly rhsService: RightSidebarService,
  ) { }

  ngOnInit() {
    // set current schema data to service and subscribe for changes to stay synced with service
    this.schemasService.schema = new BehaviorSubject(this.route.snapshot.data['schema']);
    this.subscriptions.push(this.schemasService.schema.subscribe((storedSchema) => this.schema = storedSchema));

    // fetch boxes and building areas
    Promise.all([
      this.schemasService.getSchemaBoxes(this.route.snapshot.data['schema'].id).toPromise(),
      this.schemasService.getSchemaBuildingAreas(this.route.snapshot.data['schema'].id).toPromise()
    ])
    .then(([boxes, areas]) => {
      // create subscriptions for boxes and building areas to stay synced with services
      this.boxes$ = this.boxesService.boxes;
      this.buildingAreas$ = this.buildingAreasService.buildingAreas;

      // set initial boxes and building areas props to services
      this.boxesService.boxes.next(boxes);
      this.buildingAreasService.buildingAreas.next(areas);
    });
  }

  ngOnDestroy() {
    // destroy all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * @description
   * Drop props to create form and display schema on right sidebar
   *
   * @param e click event
   *
   * @memberof SchemaViewComponent
   */
  showSchemaOnSidebar(e: any): void {
    if (!e.target.dataset.id && this.rhsService.getProps().value.type !== SidebarPropType.schema) {
      this.rhsService.nextProps({
        type: SidebarPropType.schema,
        value: this.schema
      });
    }
  }
}
