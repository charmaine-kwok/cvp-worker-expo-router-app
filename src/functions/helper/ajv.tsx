import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/core";

const ajv = new Ajv({ allErrors: true });

const ScannedFieldsSchema = {
  type: "object",
  properties: {
    selectedFields: {
      type: "array",
      items: {
        type: "string",
      },
    },
    date: { type: "string" },
    timeStamp: { type: "integer" },
  },
  required: ["selectedFields", "date", "timeStamp"],
  additionalProperties: false,
} as const;

const ScannedUUIDsSchema = {
  type: "object",
  properties: {
    UUIDs: {
      type: "array",
      items: {
        type: "string",
      },
    },
    workerId: { type: "string" },
    date: { type: "string" },
    timeStamp: { type: "number" },
  },
  required: ["UUIDs", "workerId", "date", "timeStamp"],
  additionalProperties: false,
} as const;

type ScannedCertField = JTDDataType<typeof ScannedFieldsSchema>;

type ScannedUUIDsField = JTDDataType<typeof ScannedUUIDsSchema>;

export const validateScannedFields =
  ajv.compile<ScannedCertField>(ScannedFieldsSchema);

export const validateScannedUUIDs =
  ajv.compile<ScannedUUIDsField>(ScannedUUIDsSchema);
