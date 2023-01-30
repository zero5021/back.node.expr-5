//shopModel.js
const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getJoyas = async ({ limits = 5, order_by = "id_ASC", page = 1 }) => {
  try {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      limits,
      offset
    );
    pool.query(formattedQuery);
    const { rows: joyas } = await pool.query(formattedQuery);
    return joyas;
  } catch (error) {
    console.log(error);
  }
};

const prepareHATEOAS = (joyas) => {
  let stockTotal = 0;
  const results = joyas
    .map((j) => {
      stockTotal += j.stock;
      return {
        name: j.nombre,
        href: `/joyas/joya/${j.id}`,
      };
    })
    .slice(0, 4);
  console.log(joyas);
  const totalJoyas = joyas.length;
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

const getFilter = async ({ precio_max, precio_min, categoria, metal }) => {
  try {
    let filtros = [];
    const values = [];
    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor);
      const { length } = filtros;
      filtros.push(`${campo} ${comparador} $${length + 1}`);
    };
    if (precio_max) agregarFiltro("precio", "<=", precio_max);
    if (precio_min) agregarFiltro("precio", ">=", precio_min);
    if (categoria) agregarFiltro("categoria", "=", categoria);
    if (metal) agregarFiltro("metal", "=", metal);
    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
    }
    const { rows: joyas } = await pool.query(consulta, values);
    return joyas;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las joyas");
  }
};

module.exports = {
  getJoyas,
  prepareHATEOAS,
  getFilter,
};
