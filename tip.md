1、Karma is essentially a simple open source tool that allows you to execute javascript code in multiple browsers.
2、The main point is that if you have something quite complex and you make changesthat might end up affecting several other functions, Jasmine and Karma are basically a way of verifying everything still works after a code update or restructuring.
3、test doubles: 测试替身（mock, stub, spy）
4、es6中的getter,将对象属性绑定到一个函数，当查询该属性时，实际上是调用绑定的该函数。eg: 类的静态属性。 class A {static get props(){return 'aa'}}; console.log(A.props) -> 'aa'
5、setter, 将对象属性绑定到一个函数上，当尝试设置该属性时。反过来说，当要为一个setter过的对象属性赋值时，会调用该对象通过setter绑定的函数。
6、同一个对象属性只能有一个getter和setter。setter时必须有一个明确的参数。
