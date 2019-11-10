import {entity} from "../../core/persistence/GridPersistenceManager";
import {id} from "../../core/persistence/GridPersistenceManager";

export type NodeStatus = "initializing" | "ready" | "busy";

@entity({
    table: "automation_node",
    schema: `
CREATE TABLE IF NOT EXISTS automation_node (
  id nvarchar(128) PRIMARY KEY,
  friendlyName nvarchar(128) UNIQUE KEY,
  status nvarchar(128) NOT NULL,
  address nvarchar(128) NOT NULL,
  port int NOT NULL,
  updated bigint NOT NULL 
)   
    `
})
export class AutomationNode {
    @id()
    public id: string;
    public friendlyName: string;
    public status: NodeStatus;
    public address: string;
    public port: number;
    public updated:number;
}