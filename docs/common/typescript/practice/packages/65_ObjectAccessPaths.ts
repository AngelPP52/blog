export default {}

/*type JoinString<T extends string, K extends string, Separator extends string> = T extends '' ? K extends '' ? never : K : (K extends '' ? T : `${T}${Separator}${K}`)
type js1 = JoinString<'top', 'title', '.'>      // top.title
type js2 = JoinString<'', 'title', '.'>         // title
type js3 = JoinString<'top', '', '.'>           // top
type js4 = JoinString<'', '', '.'>              // never

type ObjectAccessPaths<T extends Record<string, any>, Prev extends string = '', K = keyof T> = K extends keyof T ? (K extends string ? ((T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], JoinString<Prev, K, '.'>> : JoinString<Prev, K, '.'>)) : never) : never*/

type ObjectAccessPaths<T, Prev extends string = '', K = keyof T> =
    K extends keyof T ? (
            K extends string ? (
                T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], `${Prev}.${K}`> : (
                    `${Prev}.${K}` extends `.${infer L}` ? L : `${Prev}.${K}`
                    )
                ) : never
            ) :
        never

// 简单来说，就是根据如下对象类型：
/*
{
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
}
*/
// 得到联合类型：
/*
home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
*/

// 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}

// i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
const i18n = createI18n({
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
})

i18n('home.topBar.title')           // correct
i18n('home.topBar.welcome')         // correct
i18n('home.bottomBar.notes')        // correct

// i18n('home.login.abc')              // error，不存在的属性
// i18n('home.topBar')                 // error，没有到最后一个属性
