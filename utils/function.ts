import moment from "moment";

export const extractFormDate = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedDate
}

export const extractFormDate_2 = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0
    const day = currentDate.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year.toString().slice(2, 4)}`;
    return formattedDate
}


export const isNumeric = (string: string) => /^[+-]?\d+(\.\d+)?$/.test(string)
export const addSpaceBeforeUppercase = (text: string) => {
    return text.replace(/([A-Z])/g, ' $1');
};


export function convertAfterSpaceToUpper(text: string): string {
    let result = '';
    let convertNext = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            result += ' ';
            convertNext = true;
        } else {
            if (convertNext) {
                result += text[i].toUpperCase();
                convertNext = false;
            } else {
                result += text[i];
            }
        }
    }

    return result.replaceAll(' ', '');
}

export const TimestampConverter = (timestamp: number): Date => {
    const date = new Date(timestamp * 1000);
    return date
    const formattedDate = date.toUTCString();
}


export const displayDateOfMatch = ({ startTimestamp }: { startTimestamp: number }) => {
    if (moment(Math.floor((new Date()).getTime() / 1000) * 1000).format("YYYY:MM:DD") == moment(startTimestamp * 1000).format("YYYY:MM:DD"))
        return moment(startTimestamp * 1000).format("hh:mm A")
    return moment(startTimestamp * 1000).format("M/D/YY")
}

export const getRatingColor = (type: string, rating: number | string): string => {
    rating = Number(rating)
    if (type == 'text')
        return rating > 9 ? 'text-blue-600' : rating > 8 ? ' text-[#00adc4]' : rating > 7 ? ' text-[#00c424]' : rating > 6.5 ? ' text-[#d9af00]' : rating > 6 ? 'bg-score-rating-s60' : ' text-[#dc0c00] '
    return rating > 9 ? 'bg-blue-600' : rating > 8 ? ' bg-[#00adc4]' : rating > 7 ? ' bg-[#00c424]' : rating > 6.5 ? ' bg-[#d9af00]' : rating > 6 ? 'bg-score-rating-s60' : ' bg-[#dc0c00] '
}
