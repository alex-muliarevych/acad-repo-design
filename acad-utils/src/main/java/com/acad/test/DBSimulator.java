package com.acad.test;

import com.acad.entities.Box;
import com.acad.entities.BuildingArea;
import com.acad.entities.ConnectedLine;
import com.acad.entities.FrontSide;
import com.acad.entities.InsideBox;
import com.acad.entities.Network;
import com.acad.entities.Schema;
import com.acad.entities.StepPoint;
import com.acad.entities.Walker;
import com.acad.network.HtmlColor;
import javafx.util.Pair;

import java.util.Arrays;
import java.util.List;

/**
 * Helper class for simulation of DB state for schema-1 and schema-2.
 * // TODO add coverage for schema-2.
 */
public class DBSimulator {

    public static SchemaObjectDB<Box> getBoxesDB() {
        return new SchemaObjectDB<>(createSchema1Boxes());
    }

    public static SchemaObjectDB<InsideBox> getInsideBoxesDB() {
        return new SchemaObjectDB<>(getSchema1InsideBoxes());
    }

    public static SchemaObjectDB<BuildingArea> getAreasDB() {
        return new SchemaObjectDB<>(createSchema1Areas());
    }

    public static SchemaObjectDB<ConnectedLine> getConnectedLinesDB() {
        return new SchemaObjectDB<>(getSchema1ConnectedLines());
    }

    public static SchemaObjectDB<Network> getNetworksDB() {
        return new SchemaObjectDB<>(createSchema1Networks());
    }

    public static SchemaObjectDB<StepPoint> getStepPointsDB() {
        return new SchemaObjectDB<>(getSchema1StepPoints());
    }

    public static SchemaObjectDB<Walker> getWalkersDB() {
        return new SchemaObjectDB<>(createSchema1Walkers());
    }

    /*
     * Start of initial generation of schema-1 data.
     */

    public static Schema createSchema1() {
        return Schema.builder()
                .id(1)
                .sizeX(400.0f)
                .sizeY(350.0f)
                .sizeZ(3.0f)
                .gridStepX(2.0f)
                .gridStepY(1.5f)
                .disableDeleting(true)
                .name("Schema 1")
                .build();
    }

    public static Schema createSchema2() {
        return Schema.builder()
                .id(2)
                .sizeX(500.0f)
                .sizeY(1000.0f)
                .sizeZ(5.0f)
                .gridStepX(2.0f)
                .gridStepY(2.0f)
                .name("Schema 2")
                .build();
    }

    public static List<Network> createSchema1Networks() {
        return Arrays.asList(
                Network.builder()
                        .id(1)
                        .name("Network 1")
                        .schemaId(1).build(),
                Network.builder()
                        .id(2)
                        .name("Network 2")
                        .schemaId(1).build());
    }

    public static List<Walker> createSchema1Walkers() {
        return Arrays.asList(
                Walker.builder()
                        .id(1)
                        .schemaId(1)
                        .name("Walker A")
                        .build(),
                Walker.builder()
                        .id(2)
                        .schemaId(1)
                        .name("Walker B")
                        .build());
    }

    public static List<Box> createSchema1Boxes() {
        return Arrays.asList(
                Box.builder()
                        .schemaId(1)
                        .id(1)
                        .buildingAreaId(1)
                        .cols(2)
                        .rows(2)
                        .text("box1-1")
                        .posX(10)
                        .posY(10)
                        .posZ(0)
                        .sizeX(40)
                        .sizeY(95)
                        .sizeZ(2)
                        .solid(true)
                        .bodyColor(HtmlColor.BLUE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .frontSide(FrontSide.RIGHT)
                        .keepArea(true)
                        .build(),
                Box.builder()
                        .schemaId(1)
                        .id(2)
                        .buildingAreaId(1)
                        .cols(1)
                        .rows(1)
                        .text("box1-2")
                        .posX(60)
                        .posY(10)
                        .sizeX(40)
                        .sizeY(95)
                        .sizeZ(2)
                        .solid(true)
                        .bodyColor(HtmlColor.BLUE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .frontSide(FrontSide.LEFT)
                        .keepArea(true)
                        .noBins(true)
                        .build(),
                Box.builder()
                        .schemaId(1)
                        .id(3)
                        .buildingAreaId(1)
                        .cols(1)
                        .rows(1)
                        .text("box1-3")
                        .posX(100)
                        .posY(10)
                        .sizeX(40)
                        .sizeY(95)
                        .sizeZ(2)
                        .solid(false)
                        .bodyColor(HtmlColor.BLUE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .frontSide(FrontSide.RIGHT)
                        .noBins(true)
                        .build(),
                Box.builder()
                        .schemaId(1)
                        .id(4)
                        .buildingAreaId(1)
                        .cols(1)
                        .rows(1)
                        .text("box1-4")
                        .posX(150)
                        .posY(10)
                        .sizeX(40)
                        .sizeY(95)
                        .sizeZ(2)
                        .solid(false)
                        .bodyColor(HtmlColor.GAINSBORO.getIndexKey())
                        .borderColor(HtmlColor.SALMON.getIndexKey())
                        .frontSide(FrontSide.LEFT)
                        .noBins(true)
                        .build());
    }

    public static List<InsideBox> getSchema1InsideBoxes() {
        return Arrays.asList(
                InsideBox.builder()
                        .id(1)
                        .schemaId(1)
                        .parentBoxId(1)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.GREY.getIndexKey())
                        .boxTypeId(2)
                        .isTypeChangeable(false)
                        .numberOfPackets(0)
                        .posX(10)
                        .posY(105)
                        .posZ(0)
                        .sizeX(40)
                        .sizeY(47.5f)
                        .sizeZ(1)
                        .text("ibox1-1")
                        .solid(true)
                        .build(),
                InsideBox.builder()
                        .id(1)
                        .schemaId(1)
                        .parentBoxId(1)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.GREY.getIndexKey())
                        .boxTypeId(2)
                        .isTypeChangeable(false)
                        .numberOfPackets(0)
                        .posX(10)
                        .posY(57.5f)
                        .posZ(0)
                        .sizeX(40)
                        .sizeY(47.5f)
                        .sizeZ(1)
                        .text("ibox1-2")
                        .solid(true)
                        .build(),
                InsideBox.builder()
                        .id(2)
                        .schemaId(1)
                        .parentBoxId(1)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.GREY.getIndexKey())
                        .boxTypeId(3)
                        .isTypeChangeable(true)
                        .numberOfPackets(3)
                        .posX(10)
                        .posY(105)
                        .posZ(1)
                        .sizeX(40)
                        .sizeY(47.5f)
                        .sizeZ(1)
                        .text("ibox1-3")
                        .solid(false)
                        .build(),
                InsideBox.builder()
                        .id(2)
                        .schemaId(1)
                        .parentBoxId(1)
                        .bodyColor(HtmlColor.ORANGE.getIndexKey())
                        .borderColor(HtmlColor.GREY.getIndexKey())
                        .boxTypeId(3)
                        .isTypeChangeable(true)
                        .numberOfPackets(10)
                        .posX(10)
                        .posY(57.5f)
                        .posZ(1)
                        .sizeX(40)
                        .sizeY(47.5f)
                        .sizeZ(1)
                        .text("ibox1-4")
                        .solid(false)
                        .build());
    }

    public static List<BuildingArea> createSchema1Areas() {
        return Arrays.asList(
                BuildingArea.builder()
                        .schemaId(1)
                        .id(1)
                        .name("area1")
                        .posX(5.0f)
                        .posY(5.0f)
                        .sizeX(200)
                        .sizeY(200)
                        .sizeZ(2)
                        .mark("ss")
                        .description("Left oriented area.")
                        .solid(false)
                        .borderColor(HtmlColor.GREEN.getIndexKey())
                        .bodyColor(HtmlColor.GRAY.getIndexKey())
                        .build(),
                BuildingArea.builder()
                        .schemaId(1)
                        .id(2)
                        .name("area2")
                        .posX(250)
                        .posY(10)
                        .sizeX(100)
                        .sizeY(250)
                        .sizeZ(3)
                        .description("Right oriented area.")
                        .solid(true)
                        .borderColor(HtmlColor.YELLOW.getIndexKey())
                        .bodyColor(HtmlColor.WHEAT.getIndexKey())
                        .build()
        );
    }

    public static Pair<List<ConnectedLine>, List<StepPoint>> createSchema1LinesAndPoints() {
        List<StepPoint> stepPoints = getSchema1StepPoints();
        List<ConnectedLine> connectedLines = getSchema1ConnectedLines();
        return new Pair<>(connectedLines, stepPoints);
    }

    private static List<StepPoint> getSchema1StepPoints() {
        return Arrays.asList(
                StepPoint.builder()
                        .schemaId(1)
                        .id(1)
                        .buildingAreaId(1)
                        .keepArea(true)
                        .networkId(1)
                        .posX(7.5f)
                        .posY(7.5f)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.COMMON_STEP)
                        .name("p1")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(2)
                        .buildingAreaId(1)
                        .keepArea(true)
                        .networkId(1)
                        .posX(250)
                        .posY(7.5f)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.COMMON_STEP)
                        .name("p2")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(3)
                        .buildingAreaId(1)
                        .networkId(1)
                        .posX(7.5f)
                        .posY(195)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.COMMON_STEP)
                        .name("p3")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(4)
                        .buildingAreaId(1)
                        .networkId(1)
                        .posX(250)
                        .posY(195)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.COMMON_STEP)
                        .name("p4")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(5)
                        .buildingAreaId(1)
                        .networkId(1)
                        .posX(300)
                        .posY(40)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.STOP_STEP)
                        .name("p5")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(6)
                        .buildingAreaId(1)
                        .networkId(1)
                        .posX(300)
                        .posY(15)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.START_STEP)
                        .name("p6")
                        .build(),
                StepPoint.builder()
                        .schemaId(1)
                        .id(7)
                        .buildingAreaId(1)
                        .networkId(1)
                        .posX(300)
                        .posY(190)
                        .bodyColor(HtmlColor.WHITE.getIndexKey())
                        .borderColor(HtmlColor.BLACK.getIndexKey())
                        .type(StepPoint.StepType.FINISH_STEP)
                        .name("p7")
                        .build()
        );
    }

    private static List<ConnectedLine> getSchema1ConnectedLines() {
        return Arrays.asList(
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(1)
                        .bodyColor(HtmlColor.AZURE.getIndexKey())
                        .startStepPointId(1)
                        .endStepPointId(2)
                        .name("line-1-2")
                        .isDotted(true)
                        .build(),
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(2)
                        .bodyColor(HtmlColor.GREEN.getIndexKey())
                        .startStepPointId(2)
                        .endStepPointId(4)
                        .name("line-2-4")
                        .build(),
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(3)
                        .bodyColor(HtmlColor.GREEN.getIndexKey())
                        .startStepPointId(3)
                        .endStepPointId(4)
                        .name("line-3-4")
                        .distance(11)
                        .lineWidth(2)
                        .load(1000)
                        .skipDirection(true)
                        .build(),
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(4)
                        .bodyColor(HtmlColor.GREEN.getIndexKey())
                        .startStepPointId(4)
                        .endStepPointId(5)
                        .name("line-4-5")
                        .skipDirection(true)
                        .build(),
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(5)
                        .bodyColor(HtmlColor.GREEN.getIndexKey())
                        .startStepPointId(6)
                        .endStepPointId(5)
                        .name("line-6-5")
                        .build(),
                ConnectedLine.builder()
                        .schemaId(1)
                        .networkId(1)
                        .id(6)
                        .bodyColor(HtmlColor.GREEN.getIndexKey())
                        .startStepPointId(5)
                        .endStepPointId(7)
                        .name("line-5-7")
                        .build());
    }
}
