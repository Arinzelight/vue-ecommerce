import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default {
  async getCategories() {
    try {
      const response = await apiClient.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async getProductsByCategory(category) {
    try {
      const response = await apiClient.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  async getAllProducts() {
    try {
      const response = await apiClient.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  async searchProducts(query) {
    try {
      const response = await apiClient.get("/products");
      return response.data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};
