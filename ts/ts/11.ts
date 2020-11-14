
//声明文件
export {};
// declare const $:(selector: string) => {
//     click(): void
// }
$('#root').click();
declare let name: string;
declare let age: number;
declare function  getName():string;
declare class Animal {naem: string};
interface Person6 {
    name: string
}
type Student = Person6 | string;
declare enum Seasons {
    Seasons,
    Summer,
    Autumn,
    Winter
}
let seasons: Seasons[] = [
    Seasons.Seasons,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]