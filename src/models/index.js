import createUserSchema from "./user";

const schemaMap = {};

const setSchema = () => {
  schemaMap.user = createUserSchema();
};

const getSchemaMap = () => schemaMap;

// API
module.exports = {
  setSchema,
  getSchemaMap
};
