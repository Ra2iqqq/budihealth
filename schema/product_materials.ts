import { productsTypes } from "./products";

export interface productMaterialsTypes {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  prod_id: string[];
  prod_materials: string;
  expand: {
    prod_id: productsTypes;
  };
}
