import Subcategory from "./types/Subcategory";

export async function getSubcategories(): Promise<{ subcategories: Subcategory[] }> {
    const result = await fetch('/api/subcategories');
  return result.json();
}