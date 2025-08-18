import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../api/axios";

const SegmentPage = () => {
  const { segmentName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products2/all");
        const filtered = res.data.filter(
          (p) => p.segment?.toLowerCase() === segmentName.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching segment products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [segmentName]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (products.length === 0) return <p>No products in this segment.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{segmentName} Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border rounded p-3 hover:shadow-lg transition"
          >
            <img
              src={product.productImage}
              alt={product.name}
              className="h-32 w-full object-cover rounded"
            />
            <p className="mt-2 font-medium">{product.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SegmentPage;
