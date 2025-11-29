import { CategoriesServices } from "../servicios/categories.servicios.js";

export class CategoriesController {
    constructor () {}

    getAll = async (req,res) => {
        const {message, status, data} = await CategoriesServices.getAll();

    
        return res.status(status).json({
            message,
            data
        });
    };

    getOne = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await CategoriesServices.getById(Number(id));
        return res.status(status).json({
            message,
            data
        });
    };

    getByName = async (req,res) => {
        const {name} = req.params;
        const {message,status,data} = await CategoriesServices.getByName(name);
        return res.status(status).json({
            message,
            data
        });
    };

    create = async (req,res) => {
        const categoryData = req.body;
        const {message,status,data} = await CategoriesServices.create(categoryData);
        return res.status(status).json({
            message,
            data
        });
    };

    update = async (req,res) => {
        const {id} = req.params;
        const categoryData = req.body;
        const {message,status,data} = await CategoriesServices.update(Number(id), categoryData);
        return res.status(status).json({
            message,
            data
        });
    };

    delete = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await CategoriesServices.delete(Number(id));
        return res.status(status).json({
            message,
            data
        });
    };


}