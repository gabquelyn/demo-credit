import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;
// Define the knex configuration
const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: DATABASE_HOST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

// Initialize knex with the configuration
const db = knex(config);

export default async () => {
  try {
    // Create user table if it doesn't exist
    if (!(await db.schema.hasTable("users"))) {
      await db.schema.createTable("users", (table) => {
        table.increments("id").unsigned().unique();
        table.string("email").unique();
        table.string("name");
      });
    }

    // Create wallet table if it does not exist and use the user_id as a foreign key
    if (!(await db.schema.hasTable("wallet"))) {
      await db.schema.createTable("wallet", (table) => {
        table.increments("id");
        table.integer("balance").defaultTo(0);
        table.integer("user_id").unsigned().references("id").inTable("users");
      });
    }
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    // Close the connection if necessary
    await db.destroy();
  }
};
