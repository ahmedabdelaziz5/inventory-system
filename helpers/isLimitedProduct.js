exports.checkIslimited = (limit,productQuantity )=>{
    if(limit >= productQuantity) return 1 ;
    return 0 ;
}