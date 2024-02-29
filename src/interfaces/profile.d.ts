interface IUserAddress {
    id_enderecoUsuarcio: number;
    vc_lougradouro: string;
    in_numero: number;
    vc_complemento: string;
    vc_bairro: string;
    vc_cidade: string;
    vc_estado: string;
}

interface IUserProfile {
    id_usuario: number;
    vc_nome: string;
    in_cpf: number;
    in_celular: number;
    in_idade: number;
    vc_email: string;
    bo_ativo: boolean;
}

interface IUserReview {
    qt_trocasSucedidas: number;
    qt_trocasRecebidas: number;
    qt_trocasAceitas: number;
    qt_trocasRecusadas: number;
    qt_trocasEnviadas: number;
    tx_avaliacaoGeral: number;
    bo_seloAtivo: boolean
}

interface IUserData extends IUserProfile {
    enderecoUsuario: IUserAddress;
    avaliacaoUsuario: IUserReview 
}

export {IUserAddress, IUserProfile, IUserReview, IUserData}