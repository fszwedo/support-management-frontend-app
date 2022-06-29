const convertDate = (dateString: string) => {
    const dateArr = dateString.split('-');
    return new Date(Date.UTC(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]))).getTime()            
}

export default convertDate;