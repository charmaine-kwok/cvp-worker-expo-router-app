import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/core";

const ajv = new Ajv({ allErrors: true });

const ScannedCertFieldSchema = {
  type: "object",
  properties: {
    selectedCredentials: {
      type: "array",
      items: {
        type: "string",
      },
    },
    date: { type: "string" },
    timeStamp: { type: "integer" },
  },
  required: ["selectedCredentials", "date", "timeStamp"],
  additionalProperties: false,
} as const;

type ScannedCertField = JTDDataType<typeof ScannedCertFieldSchema>;

export const validateScannedCert = ajv.compile<ScannedCertField>(
  ScannedCertFieldSchema,
);
