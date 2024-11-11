import { productsTypes } from "./products";

export interface productColorsTypes {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  prod_id: string[];
  color_name: string;
  color_code: string;
  expand: {
    prod_id: productsTypes[];
  };
}
