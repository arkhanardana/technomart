import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (
  name: string,
  path: "brands" | "products" = "brands"
) => {
  const { data } = supabase.storage
    .from("technomart")
    .getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
};

export const uploadImage = async (
  file: File,
  path: "brands" | "products" = "brands"
) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  await supabase.storage
    .from("technomart")
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return fileName;
};

export const deleteFile = async (
  filename: string,
  path: "brands" | "products" = "brands"
) => {
  await supabase.storage
    .from("technomart")
    .remove([`public/${path}/${filename}`]);
};
