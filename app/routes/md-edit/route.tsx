import { useState } from 'react'
import MarkdownEditor from '~/components/ui/MarkdownEditor'

export interface routeProps {}

const mc = `# 介绍 
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

这是一篇指导你如何使用Vue3进行开发的规范化指南，我将使用我多年开发vue3总结的经验来指导你如何进行大型vue3开发的规范化。 更多信息查阅[引导文章](https://juejin.cn/post/7306028952613929011)

## Setup

在Vue3项目中，应始终使用Setup+TypeScript的方案来编写代码。

在\`script\`中，应遵循如下的顺序编写代码。

\`\`\`ts
 // 导入语句 import from
 // 数据流输入语句 defineProps、defineEmits、inject、useStore
 // 业务逻辑 ref、methods、lifecycle
 // 数据流输出语句 defineExpose、 provide
\`\`\`

- 导入语句

应包含import

- 数据流输入语句

应包含\`props\`的定义，\`emit\`的定义，依赖注入\`inject\`，和状态管理的导入。

- 业务逻辑

主要包含响应式变量和方法的定义。实际上除了其他部分的代码都需要写在这里。

这部分代码不应该像Vue2一样使用\`data => methods => lifecycle\`的顺序。而是应该将属于同一个功能点的代码聚集到一起。

\`\`\`ts
// 控制Dialog窗口显示
const showDialog = ref(false)

function show() {
    showDialog.value = true
    // 显示时需要的其他逻辑
}

function close() {
    showDialog.value = false
    // 清除校验的代码
    // 关闭时需要的其他逻辑
}
onMounted(() => {
    show() // 默认打开
    // 对Dialog窗口做一些操作
})
// 表单相关逻辑
const formData = reactive({
    name: '',
    signature: ''
})
const formEl = ref<InstanceType<typeof HTMLFormElement>>()
const inputEl = ref<InstanceType<typeof HTMLInputElement>>()
const rule = [
    // 表单校验规则...
]
onMounted(() => {
    // 对表单做一些操作
})
\`\`\`

尽管我们可以通过这种方式在同一个组件中包含多个功能点还能保持较高的可读性，但仍然建议将不同的功能拆分到其他组件中，即使不需要复用。除非多个功能点的逻辑之间存在较大的耦合关系，比如在以上例子中，我们可能需要在Dialog窗口显示时默认获取焦点；在Dialog窗口关闭时清除表单的校验，这样的耦合关系使得拆分组件的成本骤升，并且不需要复用逻辑，那么就没有必要拆分组件。

一个良好的Vue3组件的\`script\`部分应不超过300行。如果超过了，你应该考虑将部分繁杂的逻辑转移到其他文件。

## 响应式代理的选择

\`ref\`、\`reactive\`、\`readonly\`都是声明响应式的方法。

> 将所有的变量储存在一个\`reactive\`中，这种做法类似于Vue2，实际上非常不推荐使用，因为这违反了\`Composition\`设计的初衷。

避免使用\`reactive\`来将不相关的变量整合为一个对象。正如上面所述，你应该像正常写\`js\`的\`let\`、\`const\`一样去定义每一个变量，而不是为了图方便将不相关的变量整合进一个对象里。

使用\`ref\`来储存单一个变量，例如控制\`Dialog\`显示的\`boolean\`变量；储存来自服务器的数据等等，在多数时候应优先考虑使用\`ref\`。

\`reactive\`的应用场景多数在于表单数据，这样方便我们将数据打包发送给\`api\`，并不是所有的对象类型都适合使用\`reactive\`，因为覆盖\`reactive\`变量相当麻烦。在\`ref\`变量中只需要使用\`state.value = {}\`就能完成的操作，在\`reactive\`变量中需要手动清除每一个属性，因此只在你的对象键名始终不变的时候使用\`reactive\`，在其他情况下优先使用\`ref\`。

\`readonly\`的使用与\`reactive\`相似，区别是它不允许修改。但它与\`const\`不同，它可以将原本的\`reactive\`对象转换成\`readonly\`对象，然后通过\`defineExpose\`、\`provide\`或者\`pinia\`等方式抛出给其他组件使用，这样有助于防止其他人修改其中的值。

> \`readonly\`的应用场景在于封装，防止其他人例如你的同事修改你的变量。因此只在你需要阻止他人修改的时候使用，而不是在所有不需要修改的变量上使用。例如某变量只在组件内部使用，其他人不会获取到这个变量，则可以不使用\`readonly\`。

## shallow

\`shallow\`的作用非常大，尤其是对于部分从服务器返回的数据，我们只需要展示而不需要修改的时候，使用\`shallowRef\`能提升运行效率，在大型项目中优化非常明显。在其他地方，比如需要传递给\`echarts\`的\`option\`这样的变量，也可以使用\`shallowRef\`来提升运行效率。

## v-if/v-show

如何选择\`v-if\`和\`v-show\`一直是一个很困扰的问题。在大多数时候，优先选择\`v-show\`，它会有相当好的表现。下文将演示一些需要用到\`v-if\`的场景。

**什么时候使用v-if**

-   独立于组件视图存在、很少被渲染时时，例如作为悬浮窗口(如\`Dialog\`)，通常需要配合\`defineAsyncComponent\`使用，大大提升首次加载的速度，在大型项目中的优化效果非常明显。
-   用于控制显示的变量在整个组件的生命周期都不会改变时。例如用于控制适配不同屏幕的变量，屏幕大小一般在组件加载后就不会再改变了，因此可以看作在整个组件的生命周期都不会改变。
-   在\`v-for\`之中时，如果在一个没有唯一的\`key\`的\`v-for\`元素中时，应始终使用\`v-if\`，因为一旦数据发生改变，DOM一定会重新渲染，这使得\`v-show\`的优势完全无法发挥。
-   需要大量流程控制时。如果你需要大量的\`else-if\`、\`v-else\`时，使用\`v-show\`会非常不方便，其实在视图量小的时候，使用\`v-if\`和\`v-show\`的性能差距可以忽略不计，因此在考虑到可读性的情况下，可以使用\`v-if/v-else\`来简化代码。

> 如果你需要对显示的元素使用无缝动画，那么应该始终使用\`v-show\`，因为\`v-if\`在显示的时候需要等待组件渲染完全，会有明显的卡顿，更适合使用加载动画。

**术语**

> 在切换显示的过程中需要同时显示旧视图和新视图，营造平滑切换的视觉效果，称为**无缝动画**
>
> 在切换显示的过程中，需要等待新视图加载完成，并渲染一段加载动画，称为**加载动画**

## v-for

### key

使用\`v-for\` 时，应始终定义\`key\`。除非你的结构非常简单，元素的顺序和内容不会改变，那么你可以省略\`key\`，Vue3会自动分配一个唯一的随机\`key\`，并在数据发生改变时始终重新渲染，你无需使用\`index\`。

如果你没有好的\`key\`，但又必须需要一个\`key\`，可以为每一条数据生成一个唯一的随机值用作\`key\`。 注意，此处的随机\`key\`与Vue3自动分配的不同，它应与数据保持同步，只在数据发生新增操作时重新渲染。它的作用通常在于使没有唯一值的数据的视图也正常播放过渡动画，id可以只在需要的时候临时生成而不需要同步到数据库。

### v-for+template

#### v-if

在使用了\`v-for\`元素上不应该使用\`v-if\`，如果有需要，应该使用\`template\`包裹元素来实现。

\`\`\`vue
<template v-if="show">
  <div v-for="(item, index) in list" :key="index">
    //...
  </div>
</template>
\`\`\`

> 如果你需要筛选遍历的数据，应该使用\`computed\`+\`filter\`去实现，而不是使用\`template\`+\`v-if\`。

\`\`\`ts
const filteredList = computed(() => list.filter(item => item/* 过滤器 */))
\`\`\`

#### group

如果你需要使用\`v-for\`遍历一组元素，而没有一个根元素，你可以使用\`template\`包裹你需要的所有元素，然后在\`template\`元素上使用\`v-for\`。


\`\`\`vue
<template v-for="(item, index) in list" :key="index">
  <div>1</div>
  <div>2</div>
</template>
\`\`\`

> Vue3已经支持将\`key\`设置在\`template\`元素上，因此不要再将\`key\`设置在子元素上，这已经不被支持。

## defineProps

使用ts的泛型来定义\`Props\`类型，而不是使用传统的\`option object\`。自Vue@3.3起，已经支持大部分的TypeScript泛型到运行时的解析，最重要的是，他能为编辑器提供最精准的类型提示，尤其是**枚举**，这使用传统的\`option object\`很难定义。

参考[Vue3官网-为组件的 props 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)

参考[Vue3官网-Props 解构默认值](https://cn.vuejs.org/guide/typescript/composition-api.html#props-default-values)


## defineEmits

使用ts的泛型来定义\`Emits\`类型，而不是使用传统的\`option object\`。

参考[Vue3官网-为组件的 emits 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-emits)

## Ref模板引用

使用\`Ref\`来引用DOM或者组件，应在变量名上与其他代理数据区分开。

\`\`\`ts
// 输入内容
const input = ref('')
// input元素
const inputEle = ref<HTMLInputElement>()
// input组件
const inputCom = ref<InstanceType<typeof MyInpyt>>()
\`\`\`

由于模板引用不能自动推断类型，你应该手动为每一个模板引用显式声明类型。

参考[Vue3官网-为模板引用标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-template-refs)

参考[Vue3官网-为组件模板引用标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)

## 监听器

### computed

\`\`\`mermaid
graph LR
源数据1 --> computed
源数据2 --> computed
computed --> 新数据
\`\`\`

\`computed\`适用于依赖一个或多个源数据生成的新数据

### watch

\`\`\`mermaid
graph LR
源数据1 --> watch
源数据2 --> watch
watch --> 操作DOM
watch --> 修改数据
watch --> 发送请求
\`\`\`

\`watch\`适用于需要在数据发生改变时产生的一个或多个副作用。副作用需要在数据发生改变时执行，但并不一定需要依赖数据的内容。

### watchEffect

\`\`\`mermaid
graph LR
源数据1 --> watch
源数据2 --> watch
watch --> 操作DOM
watch --> 发送请求
\`\`\`

\`watchEffect\`的使用比\`watch\`更加方便。当操作需要依赖数据内容进行，比如将表单数据同步上传等，使用\`watchEffect\`更加方便。但以下情况请转而使用\`watch\`。

- 副作用需要在数据改变的时候运行，但并不需要使用数据内容。
- 副作用的执行过程中修改了其他代理数据。

> Vue无法准确区分get和set操作，因此如果你在副作用中修改了其他数据，可能导致该数据被Vue认为是需要监听的依赖，导致副作用被多次执行，这可能会影响性能并导致结果难以预测，出现奇怪的bug。

\`watchEffect\`需要对监听的使用非常熟练，甚至是了解数据代理的底层逻辑，否则可能产生难以预料的Bug。并且\`watch\`可以包含\`watchEffect\`的所有功能，所以如果你没有把握，或者已经发生了诡异的Bug，请转而使用\`watch\`。

> 部分开发者试图使用防抖函数（debounce）来解决\`watchEffect\`的副作用被重复触发的问题，这是一个非常不好的做法。因为——
> 1. 这并没有解决根本问题，副作用依然在重复触发，只是打一个补丁试图强行掩盖代码流程上的缺点。
> 1. \`debounce\`的时机难以把握且行为难以预测，可能由此产生新的Bug。
>
> 一个优秀的开发者应始终秉持根治策略，而不是堆积新的难以维护的代码。

##  在哪一步发送请求

在setup顶级作用域中发送请求。

---

专栏正在更新中，欢迎订阅！
`

export default function mdEdit() {
  const [value, setValue] = useState(mc)

  return <MarkdownEditor className="h-screen" content={value} onChangeContent={setValue} />
}
