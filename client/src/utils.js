export function abbreviateNumber(value) {
    let newVal = value.toFixed(2);
    if (value >= 1000000000000) {
        newVal = (value / 1000000000000).toFixed(2) + "T";
    } else if (value >= 1000000000) {
        newVal = (value / 1000000000).toFixed(2) + "B";
    } else if (value >= 1000000) {
        newVal = (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
        newVal = (value / 1000).toFixed(2) + "K";
    }
    return newVal;
}

export const MOBILE_SIZE = '(max-width: 768px)';
