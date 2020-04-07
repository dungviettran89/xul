import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/DatabaseConfig";

export type NodeStatus = "initializing" | "ready" | "busy";

export class AutomationNode extends Model {
  public id: string;
  public friendlyName: string;
  public status: NodeStatus;
  public address: string;
  public port: number;
  public updated: number;
  public url: string;
}

AutomationNode.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    friendlyName: DataTypes.STRING,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    port: DataTypes.NUMBER,
    updated: DataTypes.NUMBER,
    url: DataTypes.STRING
  },
  { sequelize }
);
