import { entity } from "@xul/data";
import { id } from "@xul/data";

export type NodeStatus = "initializing" | "ready" | "busy";

@entity({
  schema: `
CREATE TABLE IF NOT EXISTS automation_node (
  id nvarchar(128) PRIMARY KEY,
  friendlyName nvarchar(128) UNIQUE KEY,
  status nvarchar(128) NOT NULL,
  address nvarchar(128) NOT NULL,
  url nvarchar(128) NOT NULL,
  port int NOT NULL,
  updated bigint NOT NULL
)
    `,
  table: "automation_node"
})
export class AutomationNode {
  @id()
  public id: string;
  public friendlyName: string;
  public status: NodeStatus;
  public address: string;
  public port: number;
  public updated: number;
  public url:string;
}
