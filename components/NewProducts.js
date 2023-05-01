import ProductCard from "./ProductCard";

export default function NewProducts({ newProducts }) {
  return (
    <div className="flex gap-5">
      {newProducts?.length > 0 &&
        newProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
    </div>
  );
}
