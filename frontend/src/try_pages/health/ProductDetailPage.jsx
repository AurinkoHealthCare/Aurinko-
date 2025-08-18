import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import SingleProductCard from "../../../utils/SingleProductCard";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products2/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product detail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6">
      <SingleProductCard product={product} theme={product.segment} />
    </div>
  );
};

export default ProductDetailPage;
