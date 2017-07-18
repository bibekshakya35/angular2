import { Response } from "../models/response";

export class PreCondition {
    isObjectEmpty(obj: any): boolean {
        if (obj == null) {
            return true;
        }
        if (obj == undefined) {
            return true;
        }
        console.log("Is Object ok", Object.keys(obj).length === 0 && obj.constructor === Object);
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    checkResponseValid(res: Response): boolean {
        let status: boolean;
        if (res.code !== null && res !== null) {
            switch (res.code) {
                case 200: {
                    status = true;
                    break;
                }
                case 201: {
                    status = true;
                    break;
                }
                case 401: {
                    status = false;
                    break;
                }
                default: {
                    status = false;
                    break;
                }
            }

        }
        else {
            status = false;
        }

        return status;
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    hasWhiteSpace(s) {
        return /\s/g.test(s);
    }
} 