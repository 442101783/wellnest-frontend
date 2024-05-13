import { User } from "./user";

export interface Patient extends User {
    patientID:string,
    age:string,
    bloodType:string


    
}
