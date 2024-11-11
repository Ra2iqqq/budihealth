import PocketBase, {RecordModel} from "pocketbase";
import { productColorsTypes } from "@/schema/product_colors";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const fetchColors = async () : Promise<RecordModel[]>=> {

try{
    const records = await pb.collection('product_colors').getFullList<RecordModel>({
        sort: '-created',
    });

    return records
}catch(error){
throw error
}

}
