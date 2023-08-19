import { Collection } from 'mongodb';
import Comment from "../models/CommentModel";
import Repository from "./Repository";
import { ObjectId } from 'mongodb';
import tablesFilter from '../types/tablesFilter';




class CommentRepository {
    private db: Repository | undefined;
    private collection: Collection | undefined

    constructor() {
        this.db = undefined
        this.inicializar()
    }

    async inicializar() {
        this.db = await new Repository()
        this.collection = this.db?.getCollection('Comment')
    }

    /**
     * 
     * @param id string UUID
     * @returns if id is´nt empty return one movie else return all movies[]  or return error 
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(id: string = "", filter: string = ''): Promise<any> {
        
        try {
            //const paramFilter: any = Filters[filter]
            
            const ids = id !== "" ? { [filter]: id } : {}

            console.log('......', ids)
            const find = await this.collection?.find(ids).toArray();
            console.log("entramos en try", ids, find, this.collection)
            return find
        } catch (e) {
            console.log("entramos en catch", e)
            return { message: String(e) }
        }

    }


    /**
     * @param Movie movie
     * @returns responseMongoMovie |  error
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post(Comment: Comment): Promise<any> {
        try {
            let commentData = { ...Comment, createdAt: new Date(), updatedAt: new Date() }
            return await this.collection?.insertOne(commentData)
        } catch (e) {
            return { message: String(e) }
        }
    }

    /**
     * @param id 
     * @param Movie 
     */
    async update(id: ObjectId, Comment: Comment) {
        try {
            //{ _id: userID }, { $set: { name: "Nuevo Nombre" } }
            return await this.collection?.updateOne({ _id: id }, { $set: Comment, updatedAt: new Date() })
        } catch (e) {
            return { message: String(e) }
        }
    }


    async delete(id: ObjectId) {
        try {
            return await this.collection?.deleteOne({ _id: new ObjectId(id) })
        } catch (e) {
            return { message: String(e), id }
        }
    }

    // Función para eliminar duplicados basados en la propiedad "_id"
    eliminarDuplicados(arr: Comment[], prop: string): Comment[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return arr.filter((obj: any, index, self) =>
            index === self.findIndex(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (o: any) => o[prop] === obj[prop]
            )
        );
    }
}

export default CommentRepository