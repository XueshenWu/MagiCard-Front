const typeToImg = (txType) => {
    switch (txType) {
        case 1:
            return '/transaction/move-in.svg';
        case 8:
            return '/transaction/move-out.svg';
        case 3:
            return '/transaction/consume.svg';
        default:
            return '';
    }
}

const typeToString = (txType) => {
    switch (txType) {
        case 1:
            return '充值';
        case 8:
            return '提现';
        case 3:
            return '消费';
        default:
            return '';
    }
}

const typeToSign = (txType) => {
    switch (txType) {
        case 1:
            return '+';
        case 8:
            return '-';
        case 3:
            return '-';
        default:
            return '';
    }

}

const typeToColor = (txType) => {
    switch (txType) {
        case 1:
            return '#5daca1';
        default:
            return 'rgb(245, 34, 84)'
    }
}

export { typeToImg, typeToString, typeToSign, typeToColor };