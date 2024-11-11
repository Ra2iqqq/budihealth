import { usersTypes } from "./users";

export interface ordersTypes {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  created_by: string;
  installer_by: string[];
  installer_at: string;
  client_name: string;
  client_address: string;
  client_source: string;
  payment_total: number;
  payment_status: string;
  installation_type: string;
  order_type: number;
  order_status: number;
  expand: {
    created_by: usersTypes;
    installer_by: usersTypes;
  };
}
