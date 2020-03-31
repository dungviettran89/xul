import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize("sqlite::memory:", {
  logging: false,
  define: {
    freezeTableName: true
  }
});
