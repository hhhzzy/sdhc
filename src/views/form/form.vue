<template>
    <div class="form-box">
        <Form :model="formItem" :label-width="120">
            <Card dis-hover>
                <p slot="title" class="card-title">一、核查单位和人员情况</p>
                <Row :gutter="16">
                    <i-col span="12">
                        <FormItem label="报告名称">
                            <Input v-model="formItem.input" placeholder="请输入报告名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="组织单位">
                            <Input v-model="formItem.input" placeholder="请输入组织单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查单位">
                            <Input v-model="formItem.input" placeholder="请输入核查单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="统一社会信用代码">
                            <Input v-model="formItem.input" placeholder="请输入核查单位统一社会信用代码" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="营业执照">
                            <Input v-model="formItem.input" placeholder="请输入核查单位营业执照" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查类型">
                            <Input v-model="formItem.input" placeholder="请输入核查类型" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="项目负责人是否培训">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="培训证书">
                            <Input v-model="formItem.input" placeholder="请输入核查类型" />
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="核查人员">
                            <Row type="flex" justify="space-between" class="code-row-bg">
                                <i-col span="4">
                                    <Input v-model="formItem.input" placeholder="请输入核查人员姓名" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="formItem.input" placeholder="请输入核查人员专业" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="formItem.input" placeholder="请输入核查人员职称" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="formItem.input" placeholder="请输入核查人员联系电话" />
                                </i-col>
                                <i-col span="5">
                                    <Input v-model="formItem.input" placeholder="请输入项目中作用" />
                                </i-col>
                            </Row>
                            <Row style="margin-top:15px;">
                                <i-col span="12">
                                    <Button type="dashed" long icon="md-add" @click="handleAdd">添加项目成员</Button>
                                </i-col>
                            </Row>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="是否进场">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="野外调查结束时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告编制结束时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="外审完成时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告提交主管部门时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="数据库提交时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">二、项目基本信息</p>
                <Row>
                    <i-col span="6">
                        <FormItem label="勘查项目名称">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="探矿权人">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="许可证号">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证机关">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="勘查单位">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="矿区面积（km2）">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证时间">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="有效期限">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">三、履行义务情况</p>
                <Row>
                    <i-col span="12">
                        <FormItem label="登记勘查矿种">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="实际勘查矿种">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划总投资(万元)" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划当年投资(万元)" :label-width="200">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="当年实际勘查投资(万元)" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="规定年度最低勘查投资额(万元)" :label-width="200">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否完成勘查进度" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在越界勘查" :label-width="200">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否在当地主管部门报告开工情况或项目报备" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在以采代探" :label-width="200">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <Divider style="margin-top:0;" orientation="center">受到规划自然资源主管部门行政处罚及整改情况</Divider>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="是否受到行政处罚">
                            <RadioGroup v-model="animal">
                                <Radio label="金斑蝶" />
                                <Radio label="爪哇犀牛" />
                                <Radio label="印度黑羚" />
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="9">
                        <FormItem label="没收和罚款应交金额（万元）" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="9">
                        <FormItem label="没收和罚款实交金额（万元）" :label-width="180">
                            <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <Divider style="margin-top:0;" orientation="center">费用缴纳情况</Divider>
                    </i-col>
                    <i-col span="24">
                        <Card dis-hover class="content-card">
                            <p slot="title" style="text-align:left;">探矿权占用费（万元）</p>
                            <Row>
                                <i-col span="6">
                                    <FormItem label="年度应缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="年度应缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="年度应缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Card>
                    </i-col>
                    <i-col span="24" style="margin-top:5px;">
                        <Card dis-hover class="content-card">
                            <p slot="title" style="text-align:left;">探矿权出让收益（万元）</p>
                            <Row>
                                <i-col span="6">
                                    <FormItem label="总额" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期已缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期欠缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem label="未到期待缴" :label-width="180">
                                        <Input v-model="formItem.input" placeholder="请输入项目负责人是否培训" />
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Card>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">四、异常名录建议</p>
                <div style="overflow:hidden;margin-bottom:5px;">
                    <RadioGroup v-model="animal" style="float:left;">
                        <Radio label="建议列入异常名录管理" />
                        <Radio label="建议不列入异常名录" />
                    </RadioGroup>
                </div>
                <FormItem label="列入情形">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">五、存在问题及建议</p>
                <FormItem label="问题及建议">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">六、附件</p>
                <FormItem label="问题及建议">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /></Input>
                </FormItem>
            </Card>
        </Form>
    </div>
</template>
<script>
export default {
    props: {
        mineType: {
            type: String,
            default: 'ck'
        }
    },
    data() {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            }

        }
    },
    mounted() {
        console.log(this.$route.query)
    }
}
</script>
<style lang="less" >
.card-title{
   text-align: left;
}
.ivu-form-item{
    margin-bottom: 10px;
}
.content-card{
    .ivu-card-body{
        padding:8px 0;
    }
    .ivu-form-item{
        margin-bottom: 0;
    }
}
</style>
