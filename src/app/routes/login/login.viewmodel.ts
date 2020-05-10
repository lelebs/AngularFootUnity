export class LoginModel {
    Email: string;
    Password: string;
}

export class AuthModel {
    id: number;
    email: string;
    nome: string;
    tipoAcesso: TipoAcesso
}

export enum TipoAcesso {
    Usuario = 1,
    Admin = 2,
    Mod = 3,
}