export const convertDateToUnixTimestamp = (dateString: string) => {
    const dateArr = dateString.split('-');
    return new Date(Date.UTC(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]))).getTime()            
}

export const convertDateToYYMMDD = (dateString: string) => {
    const dateArr = dateString.split('-');
    dateArr[0] = dateArr[0].substring(2)
    if (dateArr[1].length === 1) dateArr[1] = '0' + dateArr[1];
    if (dateArr[2].length === 1) dateArr[2] = '0' + dateArr[2];
    return (`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`)        
}

