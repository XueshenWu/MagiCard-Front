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
            return '充值';
        case 'TransferOut':
            return '提现';
        case 'Consumption':
            return '消费';
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