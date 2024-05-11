import {$api} from "../../http/http";

export class BookService {

    static async getAll(params) {
        return $api.get('api/transactions/books/', {params: params})
    }

    static async post(body) {
        return $api.post('api/transactions/books/', body)
    }

    static async getOne(pk) {
        return $api.get('api/transactions/books/' + pk)
    }
}