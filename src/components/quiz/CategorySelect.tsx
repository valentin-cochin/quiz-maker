// src/components/quiz/CategorySelect.tsx
import { useQuery } from "@tanstack/react-query";
import { CategoriesApiResponse } from "../../types/TriviaTypes.ts";

const fetchCategories = async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: CategoriesApiResponse = await response.json();
  return data.trivia_categories;
};

export default function CategorySelect({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (value: string) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <select
      id="categorySelect"
      className="border p-2 rounded"
      value={category}
      onChange={e => setCategory(e.target.value)}
    >
      <option value="">Select a category</option>
      {data?.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
