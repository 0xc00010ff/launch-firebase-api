import { NextFunction, Request, Response } from "express";
import HTTPError from "../utils/httpError";
import Widget from "../models/widget";

export default class WidgetsController {
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      // find the item by id
      const items = await Widget.find();

      // return the item json
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { title = "Untitled", description = "Secret widget" } = req.body;
    console.log(`Creating item with ${req.body}`);

    try {
      // create the item
      const item = await Widget.create({
        title,
        description,
      });

      // return the item json
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  static async read(req: Request, res: Response, next: NextFunction) {
    const { itemId } = req.params;

    try {
      // find the item by id
      const item = await Widget.findById(itemId);
      // missing environemnt is a 404 error
      if (!item) {
        throw new HTTPError({
          statusCode: 404,
          publicMessage: "Widget not found",
        });
      }

      // return the item json
      res.json(item);
    } catch (error) {
      // forward the error
      next(error);
    }
  }

  static async update(req: Request, res: Response) {
    res.json({
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    });
  }

  static async destroy(req: Request, res: Response) {
    res.json({
      method: req.method,
      query: req.query,
      params: req.params,
    });
  }
}
