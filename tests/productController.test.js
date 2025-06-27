const Product = require("../models/product.model");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

jest.mock("../models/product.model");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // for chaining
  res.json = jest.fn();
  return res;
};

describe("Product Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts should return all products", async () => {
    const req = {};
    const res = mockRes();
    const mockData = [{ name: "Test", price: 1, description: "desc" }];
    Product.find.mockResolvedValue(mockData);

    await getProducts(req, res);

    expect(Product.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("getProduct should return a product by ID", async () => {
    const req = { params: { id: "123" } };
    const res = mockRes();
    const mockProduct = { name: "Test", price: 1, description: "desc" };
    Product.findById.mockResolvedValue(mockProduct);

    await getProduct(req, res);

    expect(Product.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  test("createProduct should create and return a product", async () => {
    const req = {
      body: { name: "New", price: 10, description: "new desc" },
    };
    const res = mockRes();
    Product.create.mockResolvedValue(req.body);

    await createProduct(req, res);

    expect(Product.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test("updateProduct should update and return a product", async () => {
    const req = {
      params: { id: "abc" },
      body: { price: 99 },
    };
    const res = mockRes();
    const updated = { name: "Test", price: 99, description: "desc" };
    Product.findByIdAndUpdate.mockResolvedValue(updated);

    await updateProduct(req, res);

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith("abc", req.body, {
      new: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("deleteProduct should delete and return a product", async () => {
    const req = { params: { id: "xyz" } };
    const res = mockRes();
    const deleted = { name: "Deleted", price: 0, description: "gone" };
    Product.findByIdAndDelete.mockResolvedValue(deleted);

    await deleteProduct(req, res);

    expect(Product.findByIdAndDelete).toHaveBeenCalledWith("xyz");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });
});
