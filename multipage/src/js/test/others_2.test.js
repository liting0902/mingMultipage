//@ts-check
let chai = require('chai')

describe('others_2.test', () => {

    it('Array Group 3 items', () => {
        let array1 = [1,3,5,6,7,8,13,15,17,22,24,27] //12
        let newGroupedArray = getGroupedArray_ByTimes(array1, 3)
        console.log("LOG:: newGroupedArray", newGroupedArray)
        function getGroupedArray_ByTimes(TargetArray, eachGroupCount){
            let rtnGroupedArray = []
            // loop times
            let doTimes = Math.ceil(TargetArray.length/eachGroupCount)//4
            for(let i=0;i<doTimes;i++){
                let newGroup = TargetArray.splice(0,eachGroupCount)
                //console.log("LOG:: newGroup", newGroup)
                rtnGroupedArray.push(newGroup)
            }
            return rtnGroupedArray
        }
    })
    it('tttt 2', () => {
        let arry = [1,3,5,7]
        
        let node1 = arry.shift()
        //arry.unshift(9)
        console.log("LOG:: arry", arry)
        console.log("LOG:: node1", node1)
        

    })
    it('tttt 3', () => {
        

    })
    
})