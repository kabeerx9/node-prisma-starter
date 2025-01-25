import { prismaClient } from "..";
import { Request, Response } from "express";
export const createProduct = async (req: Request, res: Response) => {

    // crate a validator for the request body
    

    const product = await prismaClient.product.create({
        data : {
            ...req.body,
            tags : req.body.tags.join(",")
        }
    })

    res.status(201).json({message: "Product created successfully", product: product});
}
