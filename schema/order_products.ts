import { ordersTypes } from "./orders";
import { productsTypes } from "./products";
import { productColorsTypes } from "./product_colors";
import { productMaterialsTypes } from "./product_materials";

export interface orderProductsTypes {
  id: string;
  collectionId: string;
  created: string;
  updated: string;
  order_id: string;
  prod_id: string;
  prod_color_id: string;
  prod_material_id: string;
  system: string;
  hook: string;
  open_control: string;
  prod_qty: number;
  isAvailable: number;
  expand: {
    order_id: ordersTypes;
    prod_id: productsTypes;
    prod_color_id: productColorsTypes;
    prod_material_id: productMaterialsTypes;
  };
}
