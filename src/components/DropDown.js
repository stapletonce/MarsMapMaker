import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

const FORMAT_121 = "one2one";
const FORMAT_CONV = "conversion";
const FORMAT_DATE = "dateFormat";

const sesarOptions =
    [
        {
            disabled: false,
            key: "original_archive",
            value: "original_archive",
            text: "original_archive",
            "message": "Name of institution",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "current archive",
            value: "current archive",
            text: "current archive",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "platform_name",
            value: "platform_name",
            text: "platform_name",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "cruise_field_prgrm",
            value: "cruise_field_prgrm",
            text: "cruise_field_prgrm",
            "message": "Name or identifier of the field program during which the sample was collected.",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "name",
            value: "name",
            text: "name",
            "message": "The Name of the sample.",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "collection_method",
            value: "collection_method",
            text: "collection_method",
            "message": "Method by which the sample was collected",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "collection_start_date",
            value: "collection_start_date",
            text: "collection_start_date",
            "message": "Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
            "format": FORMAT_DATE
        },
        {
            disabled: false,
            key: "collection_end_date",
            value: "collection_end_date",
            text: "collection_end_date",
            "message": "Date when the sample collection was finished",
            "format": FORMAT_DATE
        },
        {
            disabled: false,
            key: "latitude",
            value: "latitude",
            text: "latitude",
            "message": "Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "latitude_end",
            value: "latitude_end",
            text: "latitude_end",
            "message": "End latitude of the location where the sample was collected (WGS84)",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "longitude",
            value: "longitude",
            text: "longitude",
            "message": "Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "longitude_end",
            value: "longitude_end",
            text: "longitude_end",
            "message": "End longitude of the location where the sample was collected (WGS84)",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "elevation",
            value: "elevation",
            text: "elevation",
            "message": "Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "elevation_end",
            value: "elevation_end",
            text: "elevation_end",
            "message": "End elevation at which a sample was collected",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "size",
            value: "size",
            text: "size",
            "message": "Size of the registered object",
            "format": FORMAT_CONV
        },
        {
            disabled: false,
            key: "size_unit CM IS COMMON",
            value: "size_unit CM IS COMMON",
            text: "size_unit CM IS COMMON",
            "format": FORMAT_121
        },

        {
            disabled: false,
            key: "collector",
            value: "collector",
            text: "collector",
            "message": "Name of the person who collected the sample or name of chief scientist for larger field programs",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "primary_location_type",
            value: "primary_location_type",
            text: "primary_location_type",
            "message": "Physiographic feature or type of feture that your sample was collected from",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "igsn",
            value: "igsn",
            text: "igsn",
            "message": "(AUTOMATIC) The 9-digit IGSN of the sample",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "sample_comment",
            value: "sample_comment",
            text: "sample_comment",
            "message": "Any free text comment about the sample",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "original_archive",
            value: "original_archive",
            text: "field_name KEYED LIST",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "sample description",
            value: "sample description",
            text: "sample description",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "geological_age",
            value: "geological_age",
            text: "geological_age",
            "message": "Age of a sample as described by the stratigraphic era",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "age (min)MA",
            value: "age (min)MA",
            text: "age (min)MA",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "age (max)MA",
            value: "age (max)MA",
            text: "age (max)MA",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "classification",
            value: "classification",
            text: "classification",
            "message": "Classification",
            "format": FORMAT_121
        },
        {
            disabled: false,
            key: "sample_type",
            value: "sample_type",
            text: "sample_type",
            "message": "The type of sample which comes from a SESAR controlled list",
            "format": FORMAT_121
        }
    ]


const DropDown = () => (
    <Dropdown
        placeholder='Sesar Select'
        fluid
        selection
        options={sesarOptions}
    />)

export default connect(null)(DropDown)
