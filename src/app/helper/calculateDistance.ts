export const calculateDistance =(list1:number[],list2:number[]): number =>{
    list1 = list1.map((item) => Number(item));
    list2 = list2.map((item) => Number(item));
    list1.sort((a:number, b:number) => a - b);
    list2.sort((a:number, b:number) => a - b);
    let totalDistance = 0;
    for (let i = 0; i < list1.length; i++) {
        totalDistance += Math.abs(list1[i] - list2[i]);
    }
    return totalDistance;
}