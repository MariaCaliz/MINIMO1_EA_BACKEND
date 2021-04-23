import { Request, Response } from "express";
import Colectivo from "../models/Colectivo";


class ColectivoController {

    public async getColectivos(req: Request, res: Response) {
        //Nos devuelve la lista de colectivos
        try {
          let colectivos = await Colectivo.find();
          res.status(200).json(colectivos); //Si la lista está vacia tambien es valido
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      public async getColectivo(req: Request, res: Response) {
        //Nos devuelve un colectivo
        try {
          let colectivo = await Colectivo.findById(req.params.colectivoid);
          if (!colectivo) {
            console.log(`\nColectivo con id ${req.params.colectivoid} no encontrado`);
            res
              .status(404)
              .json(`Colectivo con id ${req.params.colectivoid} no encontrado`);
          } else res.status(200).json(colectivo);
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      public async addColectivo(req: Request, res: Response) {
        try {
          let { name, description, vacuna } = req.body;
          let newColectivo = new Colectivo({ name, description, vacuna });
          await newColectivo.save();
          console.log(`\nColectivoañadido:\n ${newColectivo}`);
          res.status(201).json(newColectivo);
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      

      public async deleteColectivo(req: Request, res: Response) {
        try {
          let delColectivo = await Colectivo.findByIdAndDelete(req.params.colectivoid);
          if (delColectivo) {
            await Colectivo.findOne({ _id: req.params.colectivoid },
              { new: true }
            ).then((deletedColectivo) => {
              console.log(
                `Colectivo con id ${req.params.colectivoid} eliminado: ${deletedColectivo}`
              );
              res.status(201).json(deletedColectivo);
            });
          } else {
            console.log(`Colectivo con id ${req.params.colectivoid} no encontrado`);
            res
              .status(404)
              .json(`Colectivo con id ${req.params.colectivoid} no ecnotrado`);
          }
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }
}
const controller: ColectivoController = new ColectivoController();
export default controller;