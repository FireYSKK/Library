import {$api} from "../../http/http";

export class AuthService {

    static async login(body) {
        return $api.post('api/authentication/login/', body)
    }

    static async registration(body) {
        return $api.post('api/authentication/register/', body)
    }

    static async check() {
        return $api.get('api/authentication/check/')
    }

    static async refresh() {
        return $api.get('api/authentication/refresh/')
    }

    static async logout() {
        return $api.get('api/authentication/logout/')
    }
}