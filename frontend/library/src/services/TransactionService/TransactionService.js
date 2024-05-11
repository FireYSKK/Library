import {$api} from "../../http/http";

export class TransactionService {

    static async getAll() {
        return $api.get('api/transactions/transactions/')
    }

    static async post(body) {
        return $api.post('api/transactions/transactions/', body)
    }

    static async getOne(pk) {
        return $api.get('api/transactions/transactions/' + pk)
    }

    static async patch(pk, body) {
        return $api.patch('api/transactions/transactions/' + pk, body)
    }

    static async delete(pk) {
        return $api.delete('api/transactions/transactions/' + pk)
    }
}