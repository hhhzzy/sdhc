<template>
    <div class="form-box">
        <div class="sub-box">
            <div class="title-box">
                {{ DataInfo.mineName+'-'+DataInfo.checkTypeDesc }}
            </div>
            <div class="btn-box">
                <Button v-if="$route.query.boolEdit" class="save-clk" type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button class="sub-clk" type="primary" @click="handleSubmit('formValidate')">提交</Button>
            </div>
        </div>
        <Form :label-width="120" class="sub-form">
            <Card dis-hover>
                <p slot="title" class="card-title">一、核查单位和人员情况</p>
                <Row :gutter="16">
                    <i-col span="12">
                        <FormItem label="报告名称：">
                            <Input v-model="DataInfo.reportName" placeholder="请输入报告名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="组织单位：">
                            <Input v-model="DataInfo.organizationalUnit" placeholder="请输入组织单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查单位：">
                            <Input v-model="DataInfo.checkUnit" placeholder="请输入核查单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="统一社会信用代码：">
                            <Input v-model="DataInfo.checkUnitCode" placeholder="请输入核查单位统一社会信用代码" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="营业执照：">
                            <Input v-model="DataInfo.checkUnitBusinessLicense" placeholder="请输入核查单位营业执照" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="核查类型：">
                            {{ DataInfo.checkTypeDesc }}
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="项目负责人是否培训：">
                            <RadioGroup v-model="DataInfo.isProjectLeaderTrain" placeholder="请输入项目负责人是否培训">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="培训证书：">
                            <div v-for="(item,index) in uploadList" :key="index" class="demo-upload-list">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url" />
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)" />
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)" />
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info />
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="(value)=> handleFormatError('1', value)"
                                :before-upload="(value)=> handleBeforeUpload('1', value)"
                                :data="uploadData"
                                :headers="uploadHeader"
                                multiple
                                type="drag"
                                :action="actionUrl"
                                style="display: inline-block;width:58px;"
                            >
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20" />
                                </div>
                            </Upload>
                            <Modal v-model="visible" title="View Image">
                                <img v-if="visible" :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" style="width: 100%" />
                            </Modal>
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <FormItem label="核查人员：">
                            <Row v-for="(item,index) in DataInfo.createMembers" :key="'create'+index" type="flex" justify="space-between" class="code-row-bg">
                                <i-col span="3">
                                    <Input v-model="item.memberName" placeholder="请输入核查人员姓名" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.major" placeholder="请输入核查人员专业" />
                                </i-col>
                                <i-col span="3">
                                    <Input v-model="item.memberTitle" placeholder="请输入核查人员职称" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.phoneNum" placeholder="请输入核查人员联系电话" />
                                </i-col>
                                <i-col span="5">
                                    <Input v-model="item.memberRemark" placeholder="请输入项目中作用" />
                                </i-col>
                                <i-col span="2">
                                    <Button type="error" @click="delMemebers(index,'create')">删除</Button>
                                </i-col>
                            </Row>
                            <Row v-for="(item,index) in DataInfo.updateMembers" :key="'update'+index" type="flex" justify="space-between" class="code-row-bg">
                                <i-col span="3">
                                    <Input v-model="item.memberName" placeholder="请输入核查人员姓名" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.major" placeholder="请输入核查人员专业" />
                                </i-col>
                                <i-col span="3">
                                    <Input v-model="item.memberTitle" placeholder="请输入核查人员职称" />
                                </i-col>
                                <i-col span="4">
                                    <Input v-model="item.phoneNum" placeholder="请输入核查人员联系电话" />
                                </i-col>
                                <i-col span="5">
                                    <Input v-model="item.memberRemark" placeholder="请输入项目中作用" />
                                </i-col>
                                <i-col span="2">
                                    <Button type="error" @click="delMemebers(index,'update')">删除</Button>
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
                        <FormItem label="是否进场：">
                            <RadioGroup v-model="DataInfo.isApproach" placeholder="请选择是否进场">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="野外调查结束时间：">
                            <DatePicker v-model="DataInfo.fieldInvestTime" type="date" placeholder="请选择野外调查结束时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告编制结束时间：">
                            <DatePicker v-model="DataInfo.reportEditTime" type="date" placeholder="请选择报告编制结束时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="外审完成时间：">
                            <DatePicker v-model="DataInfo.externalAuditEditTime" type="date" placeholder="请选择外审完成时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="报告提交主管部门时间：">
                            <DatePicker v-model="DataInfo.reportSubmitTime" type="date" placeholder="请选择报告提交主管部门时间" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="数据库提交时间：">
                            <DatePicker v-model="DataInfo.dbSubmitTime" type="date" placeholder="请选择数据库提交时间" />
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">二、项目基本信息</p>
                <Row>
                    <i-col span="6">
                        <FormItem label="勘查项目名称：">
                            <Input v-model="DataInfo.prospectingProjectName" placeholder="请输入勘查项目名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="探矿权人：">
                            <Input v-model="DataInfo.exploreMinePerson" placeholder="请输入探矿权人" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="许可证号：">
                            <Input v-model="DataInfo.licenseKey" placeholder="请输入许可证号" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证机关：">
                            <Input v-model="DataInfo.licenseOrg" placeholder="请输入发证机关" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="勘查单位：">
                            <Input v-model="DataInfo.prospectingUnit" placeholder="请输入勘查单位" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="矿区面积：">
                            <i-input v-model="DataInfo.mineZoneArea" placeholder="请输入项目负责人是否培训">
                                <span slot="append">km2</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="发证时间：">
                            <DatePicker v-model="DataInfo.issueTime" type="date" placeholder="请选择发证时间" style="width: 100%" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="有效期限：">
                            <Row>
                                <i-col span="11">
                                    <DatePicker v-model="DataInfo.beginTime" type="date" placeholder="开始时间" />
                                </i-col>
                                <i-col span="2" style="text-align: center">-</i-col>
                                <i-col span="11">
                                    <DatePicker v-model="DataInfo.endTime" type="date" placeholder="结束时间" />
                                </i-col>
                            </Row>
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">三、履行义务情况</p>
                <Row>
                    <i-col span="12">
                        <FormItem label="登记勘查矿种：" :label-width="180">
                            <Input v-model="dutyVerify.registerMinerals" placeholder="请输入勘查矿种" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="实际勘查矿种：" :label-width="200">
                            <Input v-model="dutyVerify.actualMinerals" placeholder="请输入实际勘查矿种" />
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划总投资：" :label-width="180">
                            <i-input v-model="dutyVerify.projectPlanTotal" placeholder="请输入勘查实施方案计划总投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查实施方案计划当年投资：" :label-width="200">
                            <i-input v-model="dutyVerify.projectPlanTotalThatYear" placeholder="请输入勘查实施方案计划当年投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="当年实际勘查投资：" :label-width="180">
                            <i-input v-model="dutyVerify.projectActualTotalThatYear" placeholder="请输入当年实际勘查投资">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="规定年度最低勘查投资额：" :label-width="200">
                            <i-input v-model="dutyVerify.projectMinTotal" placeholder="请输入规定年度最低勘查投资额">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否完成勘查进度：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isComplete" placeholder="请选择是否完成勘查进度">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在越界勘查：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isCrosstheborder" placeholder="请选择是否存在越界勘查">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否在当地主管部门报告开工情况或项目报备：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isReport" placeholder="请选择是否在当地主管部门报告开工情况或项目报备">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否存在以采代探：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isCollected" placeholder="请选择是否存在以采代探">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="是否对共伴生矿产综合勘查、综合评价：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isEvaluate" placeholder="请选择是否对共伴生矿产综合勘查、综合评价">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="勘查作业完毕后是否及时封、填探矿作业遗留的井、硐：" :label-width="280">
                            <RadioGroup v-model="dutyVerify.isCloseOnComplete" placeholder="请选择勘查作业完毕后是否及时封、填探矿作业遗留的井、硐">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="24">
                        <Divider style="margin-top:0;" orientation="center">受到规划自然资源主管部门行政处罚及整改情况</Divider>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="是否受到行政处罚：">
                            <RadioGroup v-model="dutyVerify.isGtPunish" placeholder="请选择是否受到行政处罚">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col v-if="dutyVerify.isGtPunish == 'true'" span="9">
                        <FormItem label="没收和罚款应交金额：" :label-width="180">
                            <i-input v-model="dutyVerify.forfeitureAndFineAmount" placeholder="请输入没收和罚款应交金额">
                                <span slot="append">万元</span>
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col v-if="dutyVerify.isGtPunish == 'true'" span="9">
                        <FormItem label="没收和罚款实交金额：" :label-width="180">
                            <i-input v-model="dutyVerify.forfeitureAndFineActualAmount" placeholder="请输入没收和罚款实交金额">
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
                                    <FormItem label="年度应缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.payable" placeholder="请输入年度应缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="实缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.paidIn" placeholder="请输入实缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="欠缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.arrears" placeholder="请输入欠缴">
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
                                    <FormItem label="总额：" :label-width="180">
                                        <i-input v-model="dutyVerify.total" placeholder="请输入总额">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期已缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.expirePaidIn" placeholder="请输入到期已缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="到期欠缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.expireArrears" placeholder="请输入到期欠缴">
                                            <span slot="append">万元</span>
                                        </i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem label="未到期待缴：" :label-width="180">
                                        <i-input v-model="dutyVerify.toBePaid" placeholder="请输入未到期待缴">
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
                <FormItem label="问题及建议：">
                    <Input v-model="DataInfo.questionsAndSuggestions" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="问题及建议" /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">六、附件</p>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">正文</p>
                    <Upload
                        :on-success="handleSuccess"
                        :format="['doc','docx']"
                        :on-format-error="(value)=> handleFormatError('2', value)"
                        :before-upload="(value)=> handleBeforeUpload('2', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传正文</Button>
                    </Upload>
                </Card>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">附表</p>
                    <Upload
                        :on-success="handleSuccess"
                        :format="['doc','docx']"
                        :on-format-error="(value)=> handleFormatError('3', value)"
                        :before-upload="(value)=> handleBeforeUpload('3', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传附表</Button>
                    </Upload>
                </Card>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">附件</p>
                    <Upload
                        :on-success="handleSuccess"
                        :format="['rar','zip']"
                        :on-format-error="(value)=> handleFormatError('4', value)"
                        :before-upload="(value)=> handleBeforeUpload('4', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传附件</Button>
                    </Upload>
                </Card>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">外审评审意见</p>
                    <Upload
                        :on-success="handleSuccess"
                        :format="['pdf']"
                        :on-format-error="(value)=> handleFormatError('5', value)"
                        :before-upload="(value)=> handleBeforeUpload('5', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传外审评审意见</Button>
                    </Upload>
                </Card>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">附图和测量总结</p>
                    <Upload
                        :on-success="handleSuccess"
                        :on-format-error="(value)=> handleFormatError('6', value)"
                        :before-upload="(value)=> handleBeforeUpload('6', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传附图和测量总结</Button>
                    </Upload>
                </Card>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">现场照片</p>
                    <Upload
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="(value)=> handleFormatError('7', value)"
                        :before-upload="(value)=> handleBeforeUpload('7', value)"
                        :data="uploadData"
                        :headers="uploadHeader"
                        multiple
                        :action="actionUrl"
                    >
                        <Button icon="ios-cloud-upload-outline">上传现场照片</Button>
                    </Upload>
                </Card>
            </Card>
        </Form>
    </div>
</template>
<script>
import { GetProjectDetail, SaveProject } from '@/api/form'
import url from '@/libs/url'
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
                createMembers: []
            },
            dutyVerify: {},
            defaultList: [[], [], [], [], [], [], [], []],
            imgName: '',
            visible: false,
            uploadList: [
                // {
                //     'name': '',
                //     'url': url + encodeURI('E:/data/attachfiles/2020_10_31/405ba8f28b0c2eb0.jpg')
                // }
            ],
            actionUrl: url + '/api/MineCheck/Upload',
            uploadData: {},
            uploadHeader: {}

        }
    },
    mounted() {
        this.DataInfo.id = this.$route.query.id
        this.GetProjectDetail()
    },
    methods: {
        handleView(name) {
            this.imgName = name
            this.visible = true
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        },
        handleSuccess(res, file) {
            console.log(res, file)
            this.GetProjectDetail()
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
            file.name = '7eb99afb9d5f317c912f08b5212fd69a'
        },
        // 上传文件类型
        handleFormatError(type, file) {
            console.log(type)
            if (type === '1') {
                this.$Message.error('只能上传图片')
            } else if (type === '2' || type === '3') {
                this.$Message.error('只能上传Word')
            } else if (type === '4') {
                this.$Message.error('只能上传压缩包')
            } else if (type === '5') {
                this.$Message.error('只能上传PDF')
            } else if (type === '7') {
                this.$Message.error('只能上传图片')
            }
        },
        // 上传之前
        // type：上传的类型
        // 探矿表：1: 培训证书（照片） 2.正文 3.附表 4.附件 5.外审评审意见 6.附图和测量总结 7.现场照片
        // 采矿表：8.持过期采矿许可证采矿区域现场照片 9.界外区域现场照片 10.标识牌设置情况插入照片
        handleBeforeUpload(type, file) {
            console.log(file, type)
            // 附件上传
            this.uploadData = { 'projectIdString': this.DataInfo.id, 'fileCatalog': type, 'FileFirstLevelType': 1 }
            this.uploadHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('hzy_admin') }
            const promise = new Promise((resolve, reject) => {
                this.$nextTick(function() {
                    resolve(true)
                })
            })
            console.log(file)
            return promise
        },
        // 添加项目组成员
        handleAdd() {
            this.DataInfo.createMembers.push({})
        },
        // 删除项目组成员
        delMemebers(index, type) {
            console.log(index, type)
            if (type === 'create') {
                this.DataInfo.createMembers.splice(index, 1)
            } else {
                this.DataInfo.deleteMembers.push(this.DataInfo.updateMembers[index].idString)
                this.DataInfo.updateMembers.splice(index, 1)
            }
            this.DataInfo = Object.assign({}, this.DataInfo)
            console.log(this.DataInfo.updateMembers)
        },
        // 获取详情
        GetProjectDetail() {
            GetProjectDetail(this.DataInfo.id).then(res => {
                console.log(res, '55')
                this.DataInfo = Object.assign({}, this.DataInfo, res[0])
                this.DataInfo.deleteMembers = []
                this.DataInfo.createMembers = []
                // 格式化数据
                this.dutyVerify = this.DataInfo.dutyVerify ? this.DataInfo.dutyVerify[0] : {}
                this.dutyVerify.projectIdString = this.$route.query.id

                this.DataInfo.isProjectLeaderTrain = this.DataInfo.isProjectLeaderTrain ? 'true' : this.DataInfo.isProjectLeaderTrain == null ? null : 'false'
                this.DataInfo.isApproach = this.DataInfo.isApproach ? 'true' : this.DataInfo.isApproach == null ? null : 'false'

                this.dutyVerify.isComplete = this.dutyVerify.isComplete ? 'true' : this.dutyVerify.isComplete == null ? null : 'false'
                this.dutyVerify.isCrosstheborder = this.dutyVerify.isCrosstheborder ? 'true' : this.dutyVerify.isCrosstheborder == null ? null : 'false'
                this.dutyVerify.isReport = this.dutyVerify.isReport ? 'true' : this.dutyVerify.isReport == null ? null : 'false'
                this.dutyVerify.isCollected = this.dutyVerify.isCollected ? 'true' : this.dutyVerify.isCollected == null ? null : 'false'
                this.dutyVerify.isEvaluate = this.dutyVerify.isEvaluate ? 'true' : this.dutyVerify.isEvaluate == null ? null : 'false'
                this.dutyVerify.isCloseOnComplete = this.dutyVerify.isCloseOnComplete ? 'true' : this.dutyVerify.isCloseOnComplete == null ? null : 'false'
                this.dutyVerify.isGtPunish = this.dutyVerify.isGtPunish ? 'true' : this.dutyVerify.isGtPunish == null ? null : 'false'
                this.DataInfo.suggestedEntry = this.DataInfo.suggestedEntry ? 'true' : this.DataInfo.suggestedEntry == null ? null : 'false'

                this.DataInfo.updateMembers = this.DataInfo.members.map(item => {
                    item.idString = item.id
                    return item
                })

                // 格式化图片
                if (this.DataInfo.attachFiles && this.DataInfo.attachFiles.length) {
                    this.DataInfo.attachFiles.forEach((item, index) => {
                        console.log((item.fileCatalog - 1), item.fileCatalog, index)
                        if ((item.fileCatalog - 2) === index) {
                            this.defaultList[index].push(item)
                        }
                    })
                }

                console.log(this.defaultList, this.DataInfo, '66')
            })
        },
        handleSubmit() {
            console.log(this.DataInfo)
            this.DataInfo.idString = this.DataInfo.id
            this.DataInfo.regionIdString = this.DataInfo.regionId
            this.DataInfo.dutyVerify = []
            this.DataInfo.dutyVerify.push(Object.assign({}, this.dutyVerify))
            // 格式化时间
            this.DataInfo.fieldInvestTime = this.DataInfo.fieldInvestTime ? this.$moment(this.DataInfo.fieldInvestTime).format('YYYY-MM-DD') : null
            this.DataInfo.reportEditTime = this.DataInfo.reportEditTime ? this.$moment(this.DataInfo.reportEditTime).format('YYYY-MM-DD') : null
            this.DataInfo.externalAuditEditTime = this.DataInfo.externalAuditEditTime ? this.$moment(this.DataInfo.externalAuditEditTime).format('YYYY-MM-DD') : null
            this.DataInfo.reportSubmitTime = this.DataInfo.reportSubmitTime ? this.$moment(this.DataInfo.reportSubmitTime).format('YYYY-MM-DD') : null
            this.DataInfo.dbSubmitTime = this.DataInfo.dbSubmitTime ? this.$moment(this.DataInfo.dbSubmitTime).format('YYYY-MM-DD') : null
            this.DataInfo.issueTime = this.DataInfo.issueTime ? this.$moment(this.DataInfo.issueTime).format('YYYY-MM-DD') : null
            this.DataInfo.beginTime = this.DataInfo.beginTime ? this.$moment(this.DataInfo.beginTime).format('YYYY-MM-DD') : null
            this.DataInfo.endTime = this.DataInfo.endTime ? this.$moment(this.DataInfo.endTime).format('YYYY-MM-DD') : null

            SaveProject(this.DataInfo).then(res => {
                console.log(res)
                if (res) {
                    this.$Message.success('保存成功！')
                    this.GetProjectDetail()
                }
            })
        }
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
.sub-box{
    position: fixed;
    top: 52px;
    width: calc(100% - 10px);
    background-color: #f2f2f2;
    height: 80px;
    left: 0;
    z-index: 999;
    overflow: hidden;
    .btn-box{
        float: right;
        margin-top: 20px;
        button{
            margin-right: 5px;
        }
    }
    .title-box{
        float: left;
        font-size: 18px;
        color: #000;
        margin-left: 20px;
        height: 80px;
        line-height: 80px;
    }
}
.sub-form{
    padding-top: 45px;
}
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
