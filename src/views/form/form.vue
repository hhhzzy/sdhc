<template>
    <div class="form-box">
        <Form :label-width="120">
            <Card dis-hover>
                <p slot="title" class="card-title">一、核查单位和人员情况</p>
                <Row :gutter="16">
                    <i-col span="12">
                        <FormItem label="报告名称">
                            <Input v-model="DataInfo.reportName" placeholder="请输入报告名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="组织单位">
                            <Input v-model="DataInfo.organizationalUnit" placeholder="请输入组织单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查单位">
                            <Input v-model="DataInfo.checkUnit" placeholder="请输入核查单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="统一社会信用代码">
                            <Input v-model="DataInfo.checkUnitCode" placeholder="请输入核查单位统一社会信用代码" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="营业执照">
                            <Input v-model="DataInfo.checkUnitBusinessLicense" placeholder="请输入核查单位营业执照" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查类型">
                            <Input v-model="DataInfo.input" placeholder="请输入核查类型" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="项目负责人是否培训">
                            <RadioGroup v-model="DataInfo.isProjectLeaderTrain" placeholder="请输入项目负责人是否培训">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="培训证书">
                            <Input v-model="DataInfo.input" placeholder="请输入核查类型" />
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="核查人员">
                            <Row v-for="(item,index) in DataInfo.createMembers" :key="index" type="flex" justify="space-between" class="code-row-bg">
                                <i-col span="4">
                                    <Input v-model="item.memberName" placeholder="请输入核查人员姓名" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.major" placeholder="请输入核查人员专业" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.memberTitle" placeholder="请输入核查人员职称" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.tel" placeholder="请输入核查人员联系电话" />
                                </i-col>
                                <i-col span="5">
                                    <Input v-model="item.memberRemark" placeholder="请输入项目中作用" />
                                </i-col>
                            </Row>
                            <Row v-for="(item,index) in DataInfo.updateMembers" :key="index" type="flex" justify="space-between" class="code-row-bg">
                                <i-col span="4">
                                    <Input v-model="item.memberName" placeholder="请输入核查人员姓名" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.major" placeholder="请输入核查人员专业" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.memberTitle" placeholder="请输入核查人员职称" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.tel" placeholder="请输入核查人员联系电话" />
                                </i-col>
                                <i-col span="5">
                                    <Input v-model="item.memberRemark" placeholder="请输入项目中作用" />
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
                            <RadioGroup v-model="DataInfo.isApproach" placeholder="请选择是否进场">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="野外调查结束时间">
                            <DatePicker v-model="DataInfo.fieldInvestTime" type="date" placeholder="请选择野外调查结束时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告编制结束时间">
                            <DatePicker v-model="DataInfo.reportEditTime" type="date" placeholder="请选择报告编制结束时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="外审完成时间">
                            <DatePicker v-model="DataInfo.externalAuditEditTime" type="date" placeholder="请选择外审完成时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告提交主管部门时间">
                            <DatePicker v-model="DataInfo.reportSubmitTime" type="date" placeholder="请选择报告提交主管部门时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="数据库提交时间">
                            <DatePicker v-model="DataInfo.dbSubmitTime" type="date" placeholder="请选择数据库提交时间" />
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">二、项目基本信息</p>
                <Row>
                    <i-col span="6">
                        <FormItem label="勘查项目名称">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="探矿权人">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="许可证号">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证机关">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="勘查单位">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="矿区面积（km2）">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证时间">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="有效期限">
                            <Input v-model="DataInfo.input" placeholder="请输入项目负责人是否培训" />
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">三、履行义务情况</p>
                <Row>
                    <i-col span="12">
                        <FormItem label="登记勘查矿种" :label-width="180">
                            <Input v-model="DataInfo.registerMinerals" placeholder="请输入勘查矿种" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="实际勘查矿种" :label-width="200">
                            <Input v-model="DataInfo.actualMinerals" placeholder="请输入实际勘查矿种" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划总投资" :label-width="180">
                            <i-input v-model="DataInfo.projectPlanTotal" placeholder="请输入勘查实施方案计划总投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划当年投资" :label-width="200">
                            <i-input v-model="DataInfo.projectPlanTotalThatYear" placeholder="请输入勘查实施方案计划当年投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="当年实际勘查投资" :label-width="180">
                            <i-input v-model="DataInfo.projectActualTotalThatYear" placeholder="请输入当年实际勘查投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="规定年度最低勘查投资额" :label-width="200">
                            <i-input v-model="DataInfo.projectMinTotal" placeholder="请输入规定年度最低勘查投资额">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否完成勘查进度" :label-width="280">
                            <RadioGroup v-model="DataInfo.isComplete" placeholder="请选择是否完成勘查进度">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在越界勘查" :label-width="280">
                            <RadioGroup v-model="DataInfo.isCrosstheborder" placeholder="请选择是否存在越界勘查">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否在当地主管部门报告开工情况或项目报备" :label-width="280">
                            <RadioGroup v-model="DataInfo.isReport" placeholder="请选择是否在当地主管部门报告开工情况或项目报备">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在以采代探" :label-width="280">
                            <RadioGroup v-model="DataInfo.isCollected" placeholder="请选择是否存在以采代探">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否对共伴生矿产综合勘查、综合评价" :label-width="280">
                            <RadioGroup v-model="DataInfo.isEvaluate" placeholder="请选择是否对共伴生矿产综合勘查、综合评价">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查作业完毕后是否及时封、填探矿作业遗留的井、硐" :label-width="280">
                            <RadioGroup v-model="DataInfo.isCloseOnComplete" placeholder="请选择勘查作业完毕后是否及时封、填探矿作业遗留的井、硐">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <Divider style="margin-top:0;" orientation="center">受到规划自然资源主管部门行政处罚及整改情况</Divider>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="是否受到行政处罚">
                            <RadioGroup v-model="DataInfo.isGtPunish" placeholder="请选择是否受到行政处罚">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col v-if="DataInfo.isGtPunish == 'true'" span="9">
                        <FormItem label="没收和罚款应交金额" :label-width="180">
                            <i-input v-model="DataInfo.forfeitureAndFineAmount" placeholder="请输入没收和罚款应交金额">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col v-if="DataInfo.isGtPunish == 'true'" span="9">
                        <FormItem label="没收和罚款实交金额" :label-width="180">
                            <i-input v-model="DataInfo.forfeitureAndFineActualAmount" placeholder="请输入没收和罚款实交金额">
                                <span slot="append">万元</span>
                            </i-input>
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
                                        <i-input v-model="DataInfo.payable" placeholder="请输入年度应缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="实缴" :label-width="180">
                                        <i-input v-model="DataInfo.paidIn" placeholder="请输入实缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="欠缴" :label-width="180">
                                        <i-input v-model="DataInfo.arrears" placeholder="请输入欠缴">
                                            <span slot="append">万元</span>
                                        </i-input>
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
                                        <i-input v-model="DataInfo.total" placeholder="请输入总额">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期已缴" :label-width="180">
                                        <i-input v-model="DataInfo.expirePaidIn" placeholder="请输入到期已缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期欠缴" :label-width="180">
                                        <i-input v-model="DataInfo.expireArrears" placeholder="请输入到期欠缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem label="未到期待缴" :label-width="180">
                                        <i-input v-model="DataInfo.toBePaid" placeholder="请输入未到期待缴">
                                            <span slot="append">万元</span>
                                        </i-input>
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
                    <RadioGroup v-model="DataInfo.suggestedEntry" style="float:left;">
                        <Radio label="true">建议列入异常名录管理</Radio>
                        <Radio label="false">建议不列入异常名录</Radio>
                    </RadioGroup>
                </div>
                <FormItem v-if="DataInfo.suggestedEntry == 'true'" label="列入情形">
                    <Input v-model="DataInfo.inclusion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="列入情形" /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">五、存在问题及建议</p>
                <FormItem label="问题及建议">
                    <Input v-model="DataInfo.questionsAndSuggestions" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="问题及建议" /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">六、附件</p>
                <FormItem label="问题及建议">
                    <Input v-model="DataInfo.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /></Input>
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
            DataInfo: {
                createMembers: [{}]
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
.ivu-radio-group{
    text-align: left;
}
.ivu-col{
    min-height: 45px;
}
</style>
