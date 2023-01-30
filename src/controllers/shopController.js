//shopController
const { getJoyas, prepareHATEOAS, getFilter } = require("../models/shopModel");

const getJoyasByPage = async (req, res) => {
  const queryStrings = req.query;
  const joyas = await getJoyas(queryStrings);
  const HATEOAS = prepareHATEOAS(joyas);
  res.json(HATEOAS);
};

const getJoyasByFilter = async (req, res) => {
  const queryStrings = req.query;
  const joyas = await getFilter(queryStrings);
  res.json(joyas);
};

module.exports = {
  getJoyasByPage,
  getJoyasByFilter,
};
