import { executeQuery } from "../database/database.js";

const input = async (name) => {
  await executeQuery(
    "INSERT INTO shopping_lists (name) VALUES ($1)",
    name,
  );
};

const findbyIDList = async (id) => {
  let result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE id = $1;",
    id,
  );

  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return false;
};

const deactivate = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = FALSE WHERE id = ($1)",
    id,
  );
};

const fetch_all = async () => {
  let result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE active = TRUE",
  );
  return result.rows;
};

export { deactivate, fetch_all, findbyIDList, input };
