package com.acad.controller;

import com.acad.entities.Box;
import com.acad.entities.BuildingArea;
import com.acad.entities.ConnectedLine;
import com.acad.entities.InsideBox;
import com.acad.entities.Network;
import com.acad.entities.Schema;
import com.acad.entities.StepPoint;
import com.acad.entities.Walker;
import com.acad.test.DBSimulator;
import com.acad.test.SchemaObjectDB;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@Slf4j
public class MainCadController {

    private Schema schema1 = DBSimulator.createSchema1();
    private SchemaObjectDB<Box> boxesDB = DBSimulator.getBoxesDB();
    private SchemaObjectDB<InsideBox> insideBoxesDB = DBSimulator.getInsideBoxesDB();
    private SchemaObjectDB<BuildingArea> buildingAreasDB = DBSimulator.getAreasDB();
    private SchemaObjectDB<Network> networksDB = DBSimulator.getNetworksDB();
    private SchemaObjectDB<ConnectedLine> connectedLinesDB = DBSimulator.getConnectedLinesDB();
    private SchemaObjectDB<StepPoint> stepPointsDB = DBSimulator.getStepPointsDB();
    private SchemaObjectDB<Walker> walkersDB = DBSimulator.getWalkersDB();

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        return "home";
    }

    @RequestMapping(value = "/enter-edit-schema/{id}", method = RequestMethod.GET)
    public ModelAndView enterSchemaEditor(@PathVariable Integer id) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("schemaId", id);
        modelAndView.setViewName("editor");
        return modelAndView;
    }

    @RequestMapping(value = "/api/getSchema/{id}", method = RequestMethod.GET)
    public Schema getSchema(@PathVariable Integer id) throws Exception {
        if (id == null || id < 1 || id > 2) {
            throw new Exception(String.format("No schema with such id '%d'", id));
        }
        if (id == 1) {
            return schema1;
        }
        throw new Exception("Schema 2 in TODO state");
    }

    @RequestMapping(value = "/api/saveSchema/{id}", method = RequestMethod.POST)
    public Schema saveBox(@PathVariable Integer id, @RequestBody Schema schema) throws Exception {
        if (id == 1) {
            schema1 = schema;
            return schema1;
        }
        throw new Exception("Schema 2 in TODO state");
    }

    @RequestMapping(value = "/api/getBox/{schemaId}/{id}", method = RequestMethod.GET)
    public Box getBoxById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return boxesDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getBoxes/{id}", method = RequestMethod.GET)
    public List<Box> getBoxesBySchemaId(@PathVariable Integer id) {
        return boxesDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveBox/{id}", method = RequestMethod.POST)
    public Box saveBox(@PathVariable Integer id, @RequestBody Box box) {
        box.setSchemaId(id);
        return boxesDB.updateOrSaveEntity(box);
    }

    @RequestMapping(value = "/api/getInsideBox/{schemaId}/{id}", method = RequestMethod.GET)
    public InsideBox getInsideBoxById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return insideBoxesDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getInsideBoxes/{id}", method = RequestMethod.GET)
    public List<InsideBox> getInsideBoxesBySchemaId(@PathVariable Integer id) {
        return insideBoxesDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveInsideBox/{id}", method = RequestMethod.POST)
    public InsideBox saveInsideBox(@PathVariable Integer id, @RequestBody InsideBox box) {
        box.setSchemaId(id);
        return insideBoxesDB.updateOrSaveEntity(box);
    }

    @RequestMapping(value = "/api/getBuildingArea/{schemaId}/{id}", method = RequestMethod.GET)
    public BuildingArea getBuildingAreaById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return buildingAreasDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getBuildingAreas/{id}", method = RequestMethod.GET)
    public List<BuildingArea> getBuildingAreasBySchemaId(@PathVariable Integer id) {
        return buildingAreasDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveBuildingArea/{id}", method = RequestMethod.POST)
    public BuildingArea saveBuildingArea(@PathVariable Integer id, @RequestBody BuildingArea area) {
        area.setSchemaId(id);
        return buildingAreasDB.updateOrSaveEntity(area);
    }

    @RequestMapping(value = "/api/getNetwork/{schemaId}/{id}", method = RequestMethod.GET)
    public Network getNetworkById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return networksDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getNetworks/{id}", method = RequestMethod.GET)
    public List<Network> getNetworkBySchemaId(@PathVariable Integer id) {
        return networksDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveNetwork/{id}", method = RequestMethod.POST)
    public Network saveNetwork(@PathVariable Integer id, @RequestBody Network net) {
        net.setSchemaId(id);
        return networksDB.updateOrSaveEntity(net);
    }

    @RequestMapping(value = "/api/getConnectedLine/{schemaId}/{id}", method = RequestMethod.GET)
    public ConnectedLine getConnectedLinesById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return connectedLinesDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getConnectedLines/{id}", method = RequestMethod.GET)
    public List<ConnectedLine> getConnectedLinesBySchemaId(@PathVariable Integer id) {
        return connectedLinesDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveConnectedLine/{id}", method = RequestMethod.POST)
    public ConnectedLine saveConnectedLine(@PathVariable Integer id, @RequestBody ConnectedLine line) {
        line.setSchemaId(id);
        return connectedLinesDB.updateOrSaveEntity(line);
    }

    @RequestMapping(value = "/api/getStepPoint/{schemaId}/{id}", method = RequestMethod.GET)
    public StepPoint getStepPointById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return stepPointsDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getStepPoints/{id}", method = RequestMethod.GET)
    public List<StepPoint> getStepPointsBySchemaId(@PathVariable Integer id) {
        return stepPointsDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveStepPoint/{id}", method = RequestMethod.POST)
    public StepPoint saveStepPoint(@PathVariable Integer id, @RequestBody StepPoint point) {
        point.setSchemaId(id);
        return stepPointsDB.updateOrSaveEntity(point);
    }

    @RequestMapping(value = "/api/getWalker/{schemaId}/{id}", method = RequestMethod.GET)
    public Walker getWalkerById(@PathVariable Integer schemaId, @PathVariable Integer id) {
        return walkersDB.getEntityById(schemaId, id);
    }

    @RequestMapping(value = "/api/getWalkers/{id}", method = RequestMethod.GET)
    public List<Walker> getWalkersBySchemaId(@PathVariable Integer id) {
        return walkersDB.getAllEntitiesBySchemaId(id);
    }

    @RequestMapping(value = "/api/saveWalker/{id}", method = RequestMethod.POST)
    public Walker saveWalker(@PathVariable Integer id, @RequestBody Walker walker) {
        walker.setSchemaId(id);
        return walkersDB.updateOrSaveEntity(walker);
    }
}
