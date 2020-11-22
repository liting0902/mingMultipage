
class UniqueId{
    setup(target){
        this.reactComponent = target;
        return this;
    }
    get(childId){
        let result=`${this.reactComponent.constructor.name}-${childId}`
        
        let pointFiberNode = this.reactComponent._reactInternalFiber
        //console.log(pointFiberNode._debugOwner.type.name)
        while(pointFiberNode._debugOwner){//上一層parent若存在
            result = pointFiberNode._debugOwner.type.name + `-${result}`
            pointFiberNode = pointFiberNode._debugOwner//往上爬
        }
        //console.log(this.reactComponent._reactInternalFiber)
        return result;
    }
    log(){

        console.log(this.reactComponent._reactInternalFiber._debugOwner)
        console.log(this.reactComponent._reactInternalFiber)
        // console.log(this.reactComponent._reactInternalFiber._debugOwner.type.name)
        // console.log(this.reactComponent.constructor.name)
    }
}
export default (function(){
    //console.log(window.a)
    return new UniqueId();
})();
// export function aa(){
//     return 5
// }
export function UID(childId){
    let result=`${this._reactInternalFiber.type.name}-${childId}`
        
    let pointFiberNode = this._reactInternalFiber
    //console.log(pointFiberNode._debugOwner.type.name)
    while(pointFiberNode._debugOwner){//上一層parent若存在
        result = pointFiberNode._debugOwner.type.name + `-${result}`
        pointFiberNode = pointFiberNode._debugOwner//往上爬
    }
    //console.log(this.reactComponent._reactInternalFiber)
    return result;
}
// class{
//     log(){
//         console.log(this._reactInternalFiber._debugOwner.type.name)
//         console.log(this.constructor.name)
//     }
// }