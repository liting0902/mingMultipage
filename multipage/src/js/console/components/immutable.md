https://www.php.cn/js-tutorial-400285.html  
React.addons.PureRenderMixin  
redux-immutablejs  


# immutable.js

## $\color{yellow}{使用immutable ~to ~this.state}$  
```js
// At top, import immutable
import { Map } from 'immutable';

// Later, in constructor...
this.state = {
  // Create an immutable map in state using immutable.js
  user: Map({ firstName: 'Cory', lastName: 'House'})
};

updateState({target}) {
 // this line returns a new user object assuming an immutable map is stored in state.
 let user = this.state.user.set(target.name, target.value);
 this.setState({user});
}
```


$\color{red}{节省内存}$  
Immutable.js 使用了 Structure Sharing 会尽量复用内存。没有被引用的对象会被垃圾回收。
```js
import { Map} from 'immutable';
 let a = Map({
 select: 'users',
 filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');
a === b; // false
a.get('filter') === b.get('filter'); // true
```
## $\color{yellow}{容易与原生对象混淆}$
$\color{yellow}{使用 Immutable.fromJS 而不是 Immutable.Map 或 Immutable.List 来创建对象，这样可以避免 Immutable 和原生对象间的混用。}$  

## $\color{lime}{物件比較}$
```js
let map1 = Immutable.Map({a:1, b:1, c:1});
let map2 = Immutable.Map({a:1, b:1, c:1});
map1 === map2;       // false 这样是直接比较内存地址
```
为了直接比较对象的值，immutable.js 提供了 Immutable.is 来做『值比较』，结果如下：
```js
Immutable.is(map1, map2); // true
```

## $\color{yellow}{Cursor 的概念}$
这个 Cursor 和数据库中的游标是完全不同的概念。

由于 Immutable 数据一般嵌套非常深，为了便于访问深层数据，Cursor 提供了可以直接访问这个深层数据的引用。
```js
import Immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';
let data = Immutable.fromJS({ a: { b: { c: 1 } } });
// 让 cursor 指向 { c: 1 }
let cursor = Cursor.from(data, ['a', 'b'], newData => {
// 当 cursor 或其子 cursor 执行 update 时调用
console.log(newData);
});
cursor.get('c'); // 1
cursor = cursor.update('c', x => x + 1);
cursor.get('c'); // 2
```

## $\color{yellow}{修改后的 shouldComponentUpdate 是这样的}$
```js
import { is } from 'immutable';
 shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
   if (thisProps[key] !== nextProps[key] || ！is(thisProps[key],      nextProps[key])) {
   return true;
  }
 }

  for (const key in nextState) {
   if (thisState[key] !== nextState[key] || ！is(thisState[key], nextState[key])) {
    return true;
   }
  }

  return false;
 }
 ```
## $\color{yellow}{setState~的一个技巧}$
使用immutable前
```js
import '_' from 'lodash';
const Component = React.createClass({
getInitialState() {
return {
data: { times: 0 }
}
},

handleAdd() {
let data = _.cloneDeep(this.state.data);
data.times = data.times + 1;
this.setState({ data: data });
// 如果上面不做 cloneDeep，下面打印的结果会是已经加 1 后的值。
console.log(this.state.data.times);
}
}
```
使用immutable後
```js
getInitialState() {
 return {
  data: Map({ times: 0 })
 }
},
handleAdd() {
 this.setState({ data: this.state.data.update('times', v => v + 1) });
 // 这时的 times 并不会改变
 console.log(this.state.data.get('times'));
}
```



## $\color{yellow}{seamless-immutable}$
```js
// 原来的写法

let foo = {a: {b: 1}};

let bar = foo;

bar.a.b = 2;

console.log(foo.a.b); // 打印 2

console.log(foo === bar); // 打印 true

// 使用 immutable.js 后

import Immutable from 'immutable';

foo = Immutable.fromJS({a: {b: 1}});

bar = foo.setIn(['a', 'b'], 2);  // 使用 setIn 赋值

console.log(foo.getIn(['a', 'b'])); // 使用 getIn 取值，打印 1

console.log(foo === bar); // 打印 false

// 使用 seamless-immutable.js 后

import SImmutable from 'seamless-immutable';

foo = SImmutable({a: {b: 1}})

bar = foo.merge({a: { b: 2}})  // 使用 merge 赋值

console.log(foo.a.b); // 像原生 Object 一样取值，打印 1

console.log(foo === bar); // 打印 false
```