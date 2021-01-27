import config from "../config/config";
import AxiosService from "./AxiosService";


const service = new AxiosService();
export default class EmployeeService {
    baseUrl = config.baseUrl;
    addEmployee(requestData) {
        return service.Post('/create', requestData);
    }

    getAllEmployeeData() {
        return service.get();
    }

    updateEmployeeData(requestData) {
        return service.put('/update/', requestData)
    }

    deleteEmployeeData(data) {
        return service.delete('/delete/' + data)
    }
}