import {entity} from "../../core/persistence/GridPersistenceManager";
import {id} from "../../core/persistence/GridPersistenceManager";

@entity({
    table: "automation_node",
    schema: `
CREATE TABLE IF NOT EXISTS automation_node (
  id nvarchar(128) PRIMARY KEY,
  friendlyName nvarchar(128) UNIQUE KEY,
  status nvarchar(128) NOT NULL,
  address nvarchar(128) NOT NULL,
  updated bigint NOT NULL 
)   
    `
})
export class AutomationNode {
    @id()
    public id: string;
    public friendlyName: string;
    public status: string;
    public address: string;
}