import { ProductServices } from "../servicios/product.servicios.js";

export class ProductController {
    constructor () {}

    getAll = async (req,res) => {
        const {message, status, data} = await ProductServices.getAll();

    
        return res.status(status).json({
            message,
            data
        });
    };

    getOne = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await ProductServices.getById(Number(id));
        return res.status(status).json({
            message,
            data
        });
    };

    getByName = async (req,res) => {
        const {name} = req.params;
        const {message,status,data} = await ProductServices.getByName(name);
        return res.status(status).json({
            message,
            data
        });
    };

    create = async (req,res) => {
        const productData = req.body;
        const {message,status,data} = await ProductServices.create(productData);
        return res.status(status).json({
            message,
            data
        });
    };

    update = async (req,res) => {
        const {id} = req.params;
        const productData = req.body;
        const {message,status,data} = await ProductServices.update(Number(id), productData);
        return res.status(status).json({
            message,
            data
        });
    };

    delete = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await ProductServices.delete(Number(id));
        return res.status(status).json({
            message,
            data
        });
    };


}