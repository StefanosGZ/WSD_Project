import { executeQuery } from "../database/database.js";

const inputItem = async (id, name) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (shopping_list_id,name) VALUES ($1, $2)",
    id,
    name,
  );
};

const collected = async (ItemId) => {
  await executeQuery(
    "UPDATE shopping_list_items SET collected = TRUE WHERE id = ($1)",
    ItemId,
  );
};

const findbyIDItem = async (id) => {
  let result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $1 ORDER BY collected ASC, name ASC;",
    id,
  );
  return result.rows;
};

export { collected, findbyIDItem, inputItem };
