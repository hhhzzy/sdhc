<template>
    <div class="login">
        <div class="login-con">
            <p class="title">重庆市实地核查工作填报系统</p>
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名" />
                            <span slot="prepend">
                                <Icon :size="16" type="ios-person" />
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input v-model="form.password" type="password" placeholder="请输入密码" />
                            <span slot="prepend">
                                <Icon :size="14" type="md-lock" />
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" long @click="handleSubmit">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    components: {
    },
    data() {
        return {
            form: {},
            redirect: null,
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                const query = route.query
                if (query) {
                    console.log(query.redirect)
                    this.redirect = query.redirect
                }
            },
            immediate: true
        }
    },
    methods: {
        handleSubmit() {
            // 登录
            this.$store.dispatch('user/login', this.form)
                .then(res => {
                    this.$router.push({ path: this.redirect || '/home' })
                })
        }
    }
}
</script>
<style lang="less" >
.login{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login-bg.png');
    background-size: cover;
    background-position: center;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        left: 50%;
        margin-left: -450px;
        transform: translateY(-60%);
        width: 900px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
        .ivu-card{
            width: 450px;
            margin-top: 20px;
            transform: translateX(50%);
            // .ivu-card-head{
            //     p{
            //         height: 36px;
            //         margin: 15px 0;
            //         text-align: center;
            //     }
            //     span{
            //         font-size: 24px;
            //         color: #666;
            //         margin: 30px 0;
            //         text-align: center;
            //     }
            // }
        }
    }
 .title{
        font-family: 'Arvo Bold', 'Arvo';
        font-weight: 700;
        font-style: normal;
        font-size: 38px;
        color: #fff;
        text-align: center;
    }
}
</style>
