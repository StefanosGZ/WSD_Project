import { executeQuery } from "../database/database.js";

const count_lists = async () => {
  let result = await executeQuery(
    "SELECT COUNT (*) FROM shopping_lists",
  );
  return result.rows[0].count;
};

const count_items = async () => {
  let result = await executeQuery(
    "SELECT COUNT (*) FROM shopping_list_items",
  );
  return result.rows[0].count;
};

export { count_items, count_lists };
