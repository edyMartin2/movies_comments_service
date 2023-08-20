import { ObjectId } from "mongodb";
import CommentRepository from "../infrastructure/CommentRepository";
import CommentModel from "../models/CommentModel";
import tablesFilter from "../types/tablesFilter";
const commentRp = new CommentRepository()

const Filters: tablesFilter = {
    'M': 'movie',
    'P': 'platform'
}


class CommentApplication {

    /**
     * get all Comments with this
     * @returns Comments[]
     */
    async findAll(): Promise<CommentModel> {
        const Comments: CommentModel = await commentRp.get()
        return Comments
    }

    /**
     * get one movie with this
     * @param id UUID  PlatformId
     * @returns Comments
     */
    async findByPlatformId(id: string, movieId: string) {
        let paramFilter = Filters.P as string
        let movieFilter = Filters.M as string
        const Comments = await commentRp.get(id, paramFilter, movieFilter, movieId)
        return Comments
    }

    /**
     * get one movie with this
     * @param id UUID findByMovieId
     * @returns Comments
     */
    async findByMovieId(id: string) {
        let paramFilter = Filters.M as string
        const Comments = await commentRp.get(id, paramFilter)
        return Comments
    }

    /**
     * create one movie with this
     * @param Movie 
     * @returns 
     */
    async create(Comment: CommentModel) {
        const save_movie = await commentRp.post(Comment)
        return save_movie
    }

    /**
     * 
     * @param id 
     * @param Movie 
     * @returns 
     */
    async update(id: ObjectId, Comment: CommentModel) {
        const update_movie = await commentRp.update(id, Comment)
        return update_movie
    }

    async delete(id: ObjectId) {
        const delete_movie = await commentRp.delete(id)
        return delete_movie
    }
}

export default CommentApplication