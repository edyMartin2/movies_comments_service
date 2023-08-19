import { ObjectId } from "mongodb";
import Movie from "./MovieModel";
import Plataform from "./PlataformModel";

export default interface CommentModel {
    id: ObjectId, // ID de la reseña.
    movie: Movie, // ID de la película sobre la que se va a reseñar.
    platform: Plataform, // ID de la plataforma sobre la que se va a reseñar.
    author: string, // Nombre del autor o usuario que está creando la reseña.
    body: string, // Texto de la reseña.
    score: number, // Calificación 0 a 5 de la reseña.
    createdAt: Date, // Fecha de creación de la reseña.
    updatedAt: Date, // Fecha de actualización de la reseña.
}