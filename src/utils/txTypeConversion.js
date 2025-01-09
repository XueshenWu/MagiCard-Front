import { i18n } from "../main";



const typeToImg = (txType) => {

    switch (txType) {
        case 'TransferIn':
            return 'transaction/move-in.svg';
        case 'TransferOut':
            return 'transaction/move-out.svg';
        case 'Consumption':
            return 'transaction/consume.svg';
        default:
            return '';
    }
}



const typeToString = (txType) => {
    switch (txType) {
        case 'TransferIn':
            return i18n.global.t('message.transactionHistory.types.transferIn');
        case 'TransferOut':
            return i18n.global.t('message.transactionHistory.types.transferOut');
        case 'Consumption':
            return i18n.global.t('message.transactionHistory.types.consumption');
        default:
            return '';
    }
}

const typeToSign = (txType) => {
    switch (txType) {
        case 'TransferIn':
            return '+';
        case 'TransferOut':
            return '-';
        case 'Consumption':
            return '-';
        default:
            return '';
    }

}

const typeToColor = (txType) => {
    switch (txType) {
        case 'TransferIn':
            return '#5daca1';
        default:
            return '#000000'
    }
}


export { typeToImg, typeToString, typeToSign, typeToColor };