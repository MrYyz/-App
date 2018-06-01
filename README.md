<!-- # NgProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->


## 请先在终端输入npm i 安装所要的模块，然后再再终端输入npm start运行。
## `备注：`
    项目里面除备注了`暂未开发`之外，其他如课件、培训班、考试、个人信息、调用设备硬件...都未完善，若后续有时间再补上。
    
## angular4.0 配置打包路径以及资源文件404问题
    
    一、配置打包路径

    配置打包路径，便于提交到SVN,不用每次都复制粘贴

    在.angular-cli.json文件中修改"outDir"的路径，打包后的项目将发布到修改后的路径。

    二、解决打包后资源文件404问题

    打包完成后，运行打包文件，报错404，js，css未找到。

    解决办法：修改index.html中的<base href='/'>,改成<base href='./'>

参考:
    [angular4.0 配置打包路径以及资源文件404问题](https://www.cnblogs.com/minigrasshopper/p/7692888.html)
    [angular2 ng build部署后base文件路径问题详细解答](http://www.jb51.net/article/118763.htm)
    [NgRx/Store 4 + Angular 5使用教程](https://www.jianshu.com/p/c2d61fc76128)
    [swiper中文网](http://www.swiper.com.cn/)
    [用于 JavaScript 的 ReactiveX 库](https://cn.rx.js.org/)

`最后：建议使用：Visual Studio Code编辑器。`
