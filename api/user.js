import { network } from '@/plugins/request.js'
export const login = function (params) {
    return network.post("/api/users/login", params);
}
export const register = function (params) {
    return network.post("/api/users", params);
}