export type ActionResult = {
  error: string;
};

export const initialState: ActionResult = {
  error: "",
};

export type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

export type TCart = TProduct & {
  quantity: number;
};
