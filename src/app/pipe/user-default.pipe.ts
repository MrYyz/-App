import { Pipe, PipeTransform } from '@angular/core';

/**
 * 例子：参考course-detail.component.html
 * @export 自定义管道，实现*ngFor时能循环数字（已在app.module.ts中引入）
 * @class RangePipe 自定义管道名
 * @implements {PipeTransform} @angular/core
 */
@Pipe({name:'range'}) export class RangePipe implements PipeTransform {
    transform(value:Array<any>, range:Number):Array<Number> {
        for ( var i = 0; i < range; i++ ) {
            value.push(i);
        }
        return value;
    }
}
/**
 * 例子：参考course-detail.component.html
 * @export 自定义管道，实现*ngFor时能正常循环number/string/object/array（已在app.module.ts中引入）
 * @class ToArrPipe 自定义管道名
 * @implements {PipeTransform}
 */
@Pipe({name:'toArr'}) export class ToArrPipe implements PipeTransform {
    transform(value:Array<any>,toArr:any):Array<any> {
        var res:any[];
        var _type:string = Object.prototype.toString.call(toArr).match(/^\[object\s(.*)]/)[1];
        switch (_type){
            case 'Null':
                res = ['Null'];
                break;
            case 'undefined':
                res = ['undefined'];
                break;
            case 'Number':
                    var arr = [];
                    for(var i=0;i<toArr;i++){
                        arr.push(i);
                    }
                    res = arr;
                    break;
            case 'String':
                res = [toArr];
                break;
            case 'Object':
                res = [toArr];
                break;
            case 'Array':
                res = toArr;
                break;
            default:
                res = [];
        }
        return res;
    }
}