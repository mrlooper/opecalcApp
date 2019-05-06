/**
 * Created by DRAGAN on 3/22/2017.
 */
export class ValidationService {

    constructor() {}

    isMail(email:string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    esNumeroTelefonoMovil(numero: string){
        var re = /^[67]\d{8}$/;
        return re.test(numero);
    }
    
    esClaveValidacion(clave: string){
        var re = /^\d{4}$/;
        return re.test(clave);
    }

    esNumero(txt: string){
        var re = /^\d+$/;
        return re.test(txt);
    }
}
