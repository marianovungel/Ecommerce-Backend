const Product = require("../models/Product")

module.exports={
    createProduct: async (req, res)=>{
        const newProduct = new Product(req.body)
        try {
            await newProduct.save()
            res.status(200).json("Product Created Successfully")
        } catch (error) {
            res.status(500).json("Failed to create the Product")
        }
    },

    getAllProduct: async (req, res)=>{
        try {
            const produts = await Product.find().sort({createdAt: -1})
            res.status(200).json(produts)
        } catch (error) {
            res.status(500).json("Failed to get the Product")
        }
    },

    getProduct: async (req, res)=>{
        try {
            const produts = await Product.findById(req.params.id)
            res.status(200).json(produts)
        } catch (error) {
            res.status(500).json("Failed to get the Product")
        }
    },

    searchProduct: async (req, res)=>{
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "mobileecommerce",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("Failed to get the Product")
        }
    },
}