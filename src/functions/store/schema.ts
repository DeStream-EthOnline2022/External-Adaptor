export const newStoreSchema = {
  type: "object",
  properties: {
    squareId: { type: "string" },
    storeName: { type: "string" },
    addressLine1: { type: "string" },
    country: { type: "string" },
    postalCode: { type: "string" },

  },
  required: ["squareId", "storeName", "addressLine1", "country", "postalCode"],
} as const;
