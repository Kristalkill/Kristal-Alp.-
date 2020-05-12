User.__efinedGetter__("promise", function(){
  return {
  findOne : (obj) => new Promise((res,rej)=>{
    this.findOne(obj,(err,data)=>{
     if(err) rej(err)
     res(data)
    })
  })
  }
})
Guild.__efinedGetter__("promise", function(){
  return {
  findOne : (obj) => new Promise((res,rej)=>{
    this.findOne(obj,(err,data)=>{
     if(err) rej(err)
     res(data)
    })
  })
  }
})
