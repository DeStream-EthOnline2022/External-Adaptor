export const newStoreSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
} as const;
