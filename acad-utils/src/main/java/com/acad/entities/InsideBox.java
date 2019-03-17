package com.acad.entities;

import com.sun.istack.internal.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.Entity;

/**
 * Object, which represent small box, inside of {@link Box}.
 * Always exist and placed automatically only with parent {@link Box} object.
 */
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @Entity
public class InsideBox extends SchemaObject {
    /**
     * Used to link object to schema, hidden property on UI.
     */
    private Integer schemaId;

    /**
     * Id of {@link Box}, to which current inside box object belongs.
     */
    private int parentBoxId;

    /**
     * Used to link objects, unmodifiable and only visible (non-editable) on UI.
     */
    private Integer id;

    /**
     * Just modification and view at UI side panel.
     */
    private int boxTypeId;

    /**
     * If current option is 'true', then {@code boxTypeId} can't be changed from UI, only view,
     * otherwise - can be changed.
     */
    private boolean isTypeChangeable;

    /**
     * Just modification and view at UI side panel.
     */
    @Nullable
    private String text;

    /**
     * View only on UI side panel.
     */
    private float posX;
    /**
     * View only on UI side panel.
     */
    private float posY;
    /**
     * View only on UI side panel.
     */
    private float posZ;
    /**
     * View only on UI side panel.
     */
    private float sizeX;
    /**
     * View only on UI side panel.
     */
    private float sizeY;
    /**
     * View only on UI side panel.
     */
    private float sizeZ;

    /**
     * Color of object body.
     */
    @Nullable
    private String bodyColor;
    /**
     * Color of object borders.
     */
    @Nullable
    private String borderColor;

    /**
     * Define if object is filled with color fully or not, 'true' - fully,
     * 'false' - make transparency 90 %.
     */
    private boolean solid;

    /**
     * Define count of rectangles, that should be drawn in scope of inside box.
     * Each rectangle should be light grey color with text 'p{x}', where {x} - changeable in range
     * [1, numberOfPackets].
     */
    private int numberOfPackets;
}