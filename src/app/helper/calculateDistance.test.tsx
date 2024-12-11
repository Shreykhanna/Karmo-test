import { calculateDistance } from "./calculateDistance";
import {describe, expect, test} from '@jest/globals';

describe("calculate distance test",()=>{
 test("Should return total distance",()=>{
    const list1 = [14,3,2,1]
    const list2 =[7,6,5,4]
    const result  = calculateDistance(list1,list2)
    expect(result).toBe(16)
 })
})