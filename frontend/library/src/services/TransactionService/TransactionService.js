import {$api} from "../../http/http";

export class TransactionService {

    static async getAll() {
        return $api.get('api/transactions/transactions/')
    }

    static async post(body) {
        return $api.post('api/transactions/transactions/', body)
    }

    static async getOne(pk) {
        return $api.get('api/transactions/detail/' + pk)
    }

    static async patch(pk, body) {
        return $api.patch('api/transactions/detail/' + pk, body)
    }

    static async delete(pk) {
        return $api.delete('api/transactions/detail/' + pk)
    }
}