const success=(statusCode,result)=>{
    return{
        status:"ok",
        statusCode:statusCode,
        result:result
    }
}

const error=(statusCode,result)=>{
    return{
        status:"error",
        statusCode:statusCode,
        result:result
    }
}

module.exports={
    success,
    error
}