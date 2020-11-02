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
                                :default-file-list="defaultList[1]"
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
            <!--  采矿权人 mineType：1 -->
            <Card v-if="mineType == 1" dis-hover style="margin-top:10px;">
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
            <!-- 探矿权人 mineType：2  矿山：mineType == 3-->
            <Card v-else-if="mineType == 2 || mineType == 3" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">二、项目基本信息</p>
                <Row>
                    <i-col span="6">
                        <FormItem label="采矿权人：">
                            <Input v-model="DataInfo.miningName" placeholder="请输入采矿权人" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="矿山名称：">
                            <Input v-model="DataInfo.mineName" placeholder="请输入矿山名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="许可证号：">
                            <Input v-model="DataInfo.licenseKey" placeholder="请输入许可证号" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="开采矿种：">
                            <Input v-model="DataInfo.exploitMine" placeholder="请输入开采矿种" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="生产规模：">
                            <Input v-model="DataInfo.productionScale" placeholder="请输入生产规模" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="开采方式：">
                            <Select v-model="DataInfo.exploitMethod" placeholder="请输入开采方式">
                                <Option value="1">露采</Option>
                                <Option value="2">地采</Option>
                                <Option value="3">联合</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="开采深度：">
                            <Input v-model="DataInfo.exploitDeep" placeholder="请输入开采深度" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="矿区面积：">
                            <i-input v-model="DataInfo.mineZoneArea" placeholder="请输入矿区面积">
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
            <!-- 探矿权人 mineType：2  矿山：mineType == 3-->
            <Card v-if="mineType == 2 || mineType == 3" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">三、开采情况</p>
                <Row>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">持过期采矿许可证采矿情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="采矿情况：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <RadioGroup v-model="developUse.isOverdue" style="float:left;">
                                            <Radio label="false">不存在持过期采矿许可证采矿</Radio>
                                            <Radio label="true">存在持过期采矿许可证采矿</Radio>
                                        </RadioGroup>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isOverdue == 'true'" span="6">
                                <FormItem label="采矿位置：">
                                    <Input v-model="developUse.miningAddress" type="text" placeholder="采矿位置" />
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isOverdue == 'true'" span="6">
                                <FormItem label="采矿时间：">
                                    <Row>
                                        <i-col span="11">
                                            <DatePicker v-model="developUse.miningBeginDate" type="date" placeholder="开始时间" />
                                        </i-col>
                                        <i-col span="2" style="text-align: center">-</i-col>
                                        <i-col span="11">
                                            <DatePicker v-model="developUse.miningEndDate" type="date" placeholder="结束时间" />
                                        </i-col>
                                    </Row>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isOverdue == 'true'" span="6">
                                <FormItem label="采矿量：">
                                    <i-input v-model="developUse.miningAmount" placeholder="请输入采矿量">
                                        <span slot="append">吨、立方米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isOverdue == 'true'" span="6">
                                <FormItem label="动用平面积：">
                                    <i-input v-model="developUse.miningArea" placeholder="请输入动用平面积">
                                        <span slot="append">立方米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isOverdue == 'true'" span="24">
                                <FormItem label="持过期采矿许可证采矿区域现场照片：">
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
                                        :default-file-list="defaultList[8]"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :on-format-error="(value)=> handleFormatError('8', value)"
                                        :before-upload="(value)=> handleBeforeUpload('8', value)"
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
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">界外情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="界外情况：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <Checkbox v-model="developUse.isCrossTheBorder" :disabled="developUse.isStripPositions || developUse.isRoadway || developUse.isSuperHigh || developUse.islastYearRegion">不存在越界行为</Checkbox>
                                        <Checkbox v-model="developUse.isStripPositions" :disabled="developUse.isCrossTheBorder">存在疑似越界剥离表土行为</Checkbox>
                                        <Checkbox v-model="developUse.isRoadway" :disabled="developUse.isCrossTheBorder">存在疑似越界布置井巷工程行为</Checkbox>
                                        <Checkbox v-model="developUse.isSuperHigh" :disabled="developUse.isCrossTheBorder">井口标高超过许可证标高</Checkbox>
                                        <Checkbox v-model="developUse.islastYearRegion" :disabled="developUse.isCrossTheBorder">上年度至核查时界外动用矿产资源区域</Checkbox>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isStripPositions" span="12">
                                <FormItem label="剥离位置：">
                                    <Input v-model="developUse.stripPositions" type="text" placeholder="剥离位置" />
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isStripPositions" span="12">
                                <FormItem label="疑似越界剥离表土面积：" :label-width="160">
                                    <i-input v-model="dutyVerify.projectPlanTotal" placeholder="请输入疑似越界剥离表土面积">
                                        <span slot="append">㎡</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isRoadway" span="12">
                                <FormItem label="巷道位置：">
                                    <Input v-model="developUse.tunnelAddress" type="text" placeholder="巷道位置" />
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isRoadway" span="12">
                                <FormItem label="在界外布置井巷长度：" :label-width="160">
                                    <i-input v-model="developUse.tunelLength" placeholder="请输入在界外布置井巷长度">
                                        <span slot="append">m</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isSuperHigh" span="12">
                                <FormItem label="井口名称：">
                                    <Input v-model="developUse.wellheadName" type="text" placeholder="井口名称" />
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isSuperHigh" span="12">
                                <Checkbox v-model="developUse.isSuperHighUp" style="margin-left:10px;margin-right:10px;">高于矿区范围上标高</Checkbox>
                                <Checkbox v-model="developUse.isSuperHighDown">高于矿区范围下标高</Checkbox>
                            </i-col>
                            <i-col v-if="developUse.islastYearRegion" span="6">
                                <FormItem label="界外区域位置：">
                                    <Input v-model="developUse.outOfBounds" type="text" placeholder="界外区域位置" />
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.islastYearRegion" span="6">
                                <FormItem label="动用量：" :label-width="160">
                                    <i-input v-model="developUse.toUseAmount" placeholder="请输入动用量">
                                        <span slot="append">吨、立方米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.islastYearRegion" span="12">
                                <FormItem label="形成时间：" :label-width="160">
                                    <Row>
                                        <i-col span="6">
                                            <DatePicker v-model="developUse.formationBegionTime" type="date" placeholder="开始时间" />
                                        </i-col>
                                        <i-col span="2" style="text-align: center">-</i-col>
                                        <i-col span="6">
                                            <DatePicker v-model="developUse.formationEndTime" type="date" placeholder="结束时间" />
                                        </i-col>
                                    </Row>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.islastYearRegion" span="6">
                                <FormItem label="动用面积：">
                                    <i-input v-model="developUse.toUseArea" placeholder="请输入动用面积">
                                        <span slot="append">平方米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.islastYearRegion" span="6">
                                <Checkbox v-model="developUse.isCross" style="margin-left:10px;margin-right:10px;">越界采矿</Checkbox>
                                <Checkbox v-model="developUse.isOther">其他</Checkbox>
                            </i-col>
                            <i-col v-if="developUse.isOther" span="24">
                                <FormItem label="其他">
                                    <Input v-model="developUse.other" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="其他" /></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="24">
                                <FormItem label="界外区域现场照片：">
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
                                        :default-file-list="defaultList[8]"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :on-format-error="(value)=> handleFormatError('8', value)"
                                        :before-upload="(value)=> handleBeforeUpload('8', value)"
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
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">越界预警级别</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="越界预警级别：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <RadioGroup v-model="developUse.isCrossWarnning" style="float:left;">
                                            <Radio label="不纳入越界预警">不纳入越界预警</Radio>
                                            <Radio label="蓝色">蓝色</Radio>
                                            <Radio label="橙色">橙色</Radio>
                                            <Radio label="红色">红色</Radio>
                                        </RadioGroup>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isCrossWarnning == '蓝色' || developUse.isCrossWarnning == '橙色' || developUse.isCrossWarnning == '红色'" span="6">
                                <FormItem label="预警位置：">
                                    <Row>
                                        <i-col span="11">
                                            <Input v-model="developUse.address_X" type="text" placeholder="X" />
                                        </i-col>
                                        <i-col span="2" style="text-align: center" />
                                        <i-col span="11">
                                            <Input v-model="developUse.address_Y" type="text" placeholder="Y" />
                                        </i-col>
                                    </Row>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isCrossWarnning == '蓝色' || developUse.isCrossWarnning == '橙色' || developUse.isCrossWarnning == '红色'" span="6">
                                <FormItem label="距离：">
                                    <Row>
                                        <i-col span="11">
                                            <i-input v-model="developUse.startNum" placeholder="请输入距离">
                                                <span slot="append">号</span>
                                            </i-input>
                                        </i-col>
                                        <i-col span="2" style="text-align: center" />
                                        <i-col span="11">
                                            <i-input v-model="developUse.endNum" placeholder="请输入距离">
                                                <span slot="append">号</span>
                                            </i-input>
                                        </i-col>
                                    </Row>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isCrossWarnning == '蓝色' || developUse.isCrossWarnning == '橙色' || developUse.isCrossWarnning == '红色'" span="6">
                                <FormItem label="拐点连线平面距离：">
                                    <i-input v-model="developUse.distance" placeholder="请输入拐点连线平面距离">
                                        <span slot="append">米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isCrossWarnning == '蓝色' || developUse.isCrossWarnning == '橙色' || developUse.isCrossWarnning == '红色'" span="6">
                                <FormItem label="距离下标高：">
                                    <i-input v-model="developUse.high" placeholder="请输入距离下标高">
                                        <span slot="append">米</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">开发利用方案执行情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="开发利用方案执行情况：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <RadioGroup v-model="developUse.isAccordingPlan" style="float:left;">
                                            <Radio label="不纳入越界预警">基本按方案开展工作</Radio>
                                            <Radio label="未严格按方案开展工作">未严格按方案开展工作</Radio>
                                        </RadioGroup>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="developUse.isAccordingPlan == '未严格按方案开展工作'" span="24">
                                <FormItem label="">
                                    <CheckboxGroup v-model="checkItems">
                                        <Checkbox label="未自上而下分台阶开采" />
                                        <Checkbox label="有大于30m的台阶" />
                                        <Checkbox label="最终边坡高度、宽度、角度明显不符合要求" />
                                        <Checkbox label="开采了最终边坡" />
                                        <Checkbox label="开采矿区范围内未经出让资源" />
                                        <Checkbox label="开采保安矿柱" />
                                        <Checkbox label="未按设计规定，在禁采区（压覆区）内采矿" />
                                        <Checkbox label="井巷布置与开发利用方案或开采设计明显不符" />
                                        <Checkbox label="其他" />
                                    </CheckboxGroup>
                                </FormItem>
                            </i-col>
                            <i-col v-if="checkItems && checkItems.indexOf('其他') >= 0" span="24">
                                <FormItem label="其他：">
                                    <Input v-model="developUse.otherRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="其他" /></Input>
                                </FormItem>
                            </i-col>

                        </Row>
                    </Card>
                </Row>
            </Card>
            <!--   探矿权人：mineType:1   -->
            <Card v-if="mineType == 1" dis-hover style="margin-top:10px;">
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
            <!--   采矿权人：mineType:2   -->
            <Card v-if="mineType == 2" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">四、履行义务情况</p>
                <Row>
                    <Divider style="margin-top:0;" orientation="center">标识制度落实</Divider>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">界桩设立情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="界桩设立情况：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <RadioGroup v-model="dutyVerify.isPassMuster_Boundary" style="float:left;">
                                            <Radio label="true">符合要求</Radio>
                                            <Radio label="false">不符合要求</Radio>
                                        </RadioGroup>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPassMuster_Boundary == 'false'" span="6">
                                <FormItem label="界桩缺失：">
                                    <i-input v-model="dutyVerify.defectNum" placeholder="请输入界桩缺失号">
                                        <span slot="append">号</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPassMuster_Boundary == 'false'" span="6">
                                <FormItem label="界桩位置偏移：">
                                    <i-input v-model="dutyVerify.deviationNum" placeholder="请输入界桩位置偏移号">
                                        <span slot="append">号</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPassMuster_Boundary == 'false'" span="6">
                                <FormItem label="界桩损坏：">
                                    <i-input v-model="dutyVerify.damageNum" placeholder="请输入界桩损坏号">
                                        <span slot="append">号</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">标识牌设置情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="标识牌设置情况：">
                                    <div style="overflow:hidden;margin-bottom:5px;">
                                        <RadioGroup v-model="dutyVerify.isPassMuster_Signboard" style="float:left;">
                                            <Radio label="true">符合要求</Radio>
                                            <Radio label="false">不符合要求</Radio>
                                        </RadioGroup>
                                    </div>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPassMuster_Signboard == 'false'" span="24">
                                <FormItem label="">
                                    <CheckboxGroup v-model="checkSignboardItems">
                                        <Checkbox label="缺采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌" />
                                        <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌内容未及时更新" />
                                        <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌破损" />
                                        <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌位置不符合要求" />
                                    </CheckboxGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Divider orientation="center">生态修复情况（只统计，不展示）</Divider>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">治理恢复情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="治理恢复情况：">
                                    <RadioGroup v-model="dutyVerify.recovery_Check" style="float:left;">
                                        <Radio label="1">基本按方案开展了当年年度工作</Radio>
                                        <Radio label="2">未严格按方案开展当年年度工作</Radio>
                                        <Radio label="3">当年年度内无需开展</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">土地复垦情况</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="土地复垦情况：">
                                    <RadioGroup v-model="dutyVerify.land_Check" style="float:left;">
                                        <Radio label="1">基本按方案开展了当年年度工作</Radio>
                                        <Radio label="2">未严格按方案开展当年年度工作</Radio>
                                        <Radio label="3">当年年度内无需开展</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">治理恢复基金和土地复垦费</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="治理恢复基金和土地复垦费：">
                                    <RadioGroup v-model="dutyVerify.recoveryAndLand_Money" style="float:left;">
                                        <Radio label="1">足额计提了治理恢复基金和土地复垦费</Radio>
                                        <Radio label="2">未足额计提了治理恢复基金和土地复垦费</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Divider orientation="center">费用缴纳情况</Divider>
                    <i-col span="24">
                        <Card dis-hover class="content-card">
                            <p slot="title" style="text-align:left;">采矿权占用费（万元）</p>
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
                    <i-col span="24" style="margin-top:5px;margin-bottom:10px;">
                        <Card dis-hover class="content-card">
                            <p slot="title" style="text-align:left;">采矿权出让收益（万元）</p>
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
                    <Divider orientation="center">统计制度落实情况（只统计，不展示）</Divider>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">提交储量年报</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="提交储量年报：">
                                    <RadioGroup v-model="dutyVerify.subReserves" style="float:left;">
                                        <Radio label="1">已提交</Radio>
                                        <Radio label="2">未提交</Radio>
                                        <Radio label="3">主管部门未要求提交（附未要求报送佐证复印件）</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">报送统计报表</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="报送统计报表：">
                                    <RadioGroup v-model="dutyVerify.subReport" style="float:left;">
                                        <Radio label="1">已报送</Radio>
                                        <Radio label="2">未报送</Radio>
                                        <Radio label="3">主管部门不要求报送（附未要求报送佐证复印件）</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                    <Divider orientation="center">受到规划自然资源主管部门行政处罚及整改情况</Divider>
                    <Card dis-hover style="margin-top:10px;">
                        <p slot="title" class="card-title">是否受到行政处罚</p>
                        <Row class="overflow:hidden;">
                            <i-col span="24">
                                <FormItem label="是否受到行政处罚：">
                                    <RadioGroup v-model="dutyVerify.isPunish" style="float:left;">
                                        <Radio label="1">是</Radio>
                                        <Radio label="2">否</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPunish == 1" span="6">
                                <FormItem label="没收和罚款应交金额：" :label-width="180">
                                    <i-input v-model="dutyVerify.finePayable" placeholder="请输入没收和罚款应交金额">
                                        <span slot="append">万元</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPunish == 1" span="6">
                                <FormItem label="没收和罚款实交金额：" :label-width="180">
                                    <i-input v-model="dutyVerify.finePaidIn" placeholder="请输入没收和罚款实交金额">
                                        <span slot="append">万元</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                            <i-col v-if="dutyVerify.isPunish == 1" span="6">
                                <FormItem label="没收和罚款欠交金额：" :label-width="180">
                                    <i-input v-model="dutyVerify.fineArrears" placeholder="请输入没收和罚款欠交金额">
                                        <span slot="append">万元</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Card>
                </Row>
            </Card>
            <!--   采矿权人：mineType:2   -->
            <!-- <Card v-if="mineType == 2" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">上年度至核查时动用范围</p>
                <div style="overflow:hidden;margin-bottom:5px;">
                    <RadioGroup v-model="DataInfo.suggestedEntry" style="float:left;">
                        <Radio label="true">建议列入异常名录管理</Radio>
                        <Radio label="false">建议不列入异常名录</Radio>
                    </RadioGroup>
                </div>
                <FormItem v-if="DataInfo.suggestedEntry == 'true'" label="列入情形">
                    <Input v-model="DataInfo.inclusion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="列入情形" /></Input>
                </FormItem>
            </Card> -->
            <!--   探矿权人：mineType:1   -->
            <Card v-if="mineType == 1" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">四、异常名录建议</p>
                <div style="overflow:hidden;margin-bottom:5px;">
                    <FormItem label="异常名录建议：">
                        <RadioGroup v-model="DataInfo.suggestedEntry" style="float:left;">
                            <Radio label="true">建议列入异常名录管理</Radio>
                            <Radio label="false">建议不列入异常名录</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
                <FormItem v-if="DataInfo.suggestedEntry == 'true'" label="列入情形">
                    <Input v-model="DataInfo.inclusion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="列入情形" /></Input>
                </FormItem>
            </Card>
            <!--   采矿权人：mineType:2   -->
            <Card v-if="mineType == 2" dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">六、异常名录建议</p>
                <div style="overflow:hidden;margin-bottom:5px;">
                    <FormItem label="异常名录建议：">
                        <RadioGroup v-model="DataInfo.suggestedEntry" style="float:left;">
                            <Radio label="true">建议列入异常名录管理</Radio>
                            <Radio label="false">建议不列入异常名录</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
                <Row>
                    <i-col span="24">
                        <FormItem v-if="DataInfo.suggestedEntry == 'true'" label="">
                            <CheckboxGroup v-model="inclusion">
                                <Checkbox label="缺采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌" />
                                <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌内容未及时更新" />
                                <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌破损" />
                                <Checkbox label="采矿权标识牌/矿山开采信息公示牌/矿山开采现状公示牌/绿色矿山建设公示牌位置不符合要求" />
                            </CheckboxGroup>
                        </FormItem>
                    </i-col>
                </Row>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">{{ mineType == 1?'五、存在问题及建议':mineType == 2?'七、存在问题及建议':'五、存在问题及建议' }}</p>
                <FormItem label="问题及建议：">
                    <Input v-model="DataInfo.questionsAndSuggestions" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="问题及建议" /></Input>
                </FormItem>
            </Card>
            <Card dis-hover style="margin-top:10px;">
                <p slot="title" class="card-title">{{ mineType == 1?'六、附件':mineType == 2?'八、附件':'六、附件' }}</p>
                <Card dis-hover style="margin-top:10px;">
                    <p slot="title" class="card-title">正文</p>
                    <Upload
                        :default-file-list="defaultList[2]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
                        :default-file-list="defaultList[3]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
                        :default-file-list="defaultList[4]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
                        :default-file-list="defaultList[5]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
                        :default-file-list="defaultList[6]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
                        :default-file-list="defaultList[7]"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
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
import { GetProjectDetail, SaveProject, DeleteAttach } from '@/api/form'
import url from '@/libs/url'
export default {
    props: {
        // mineType: {
        //     type: String,
        //     default: 'ck'
        // }
    },
    data() {
        return {
            DataInfo: {
                createMembers: []
            },
            mineType: null,
            dutyVerify: {}, // 履行义务
            developUse: {}, // 开采情况
            checkItems: [],
            checkSignboardItems: [],
            inclusion: [],
            defaultList: {},
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
        // this.$route.query.type：1：探矿权人 2.采矿权人 3.矿山
        this.mineType = this.$route.query.type
        this.DataInfo.id = this.$route.query.id
        this.GetProjectDetail()
    },
    methods: {
        handleView(name) {
            this.imgName = name
            this.visible = true
        },
        handleRemove(file) {
            console.log(file)
            DeleteAttach(file.code).then(res => {
                console.log(res)
                if (res) {
                    this.$Message.success('删除成功！')
                    this.GetProjectDetail()
                }
            })
            // const fileList = this.$refs.upload.fileList
            // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        },
        handleSuccess(res, file) {
            console.log(res, file)
            if (res) {
                this.$Message.success('上传成功！')
            }
            this.GetProjectDetail()
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
                this.developUse = this.DataInfo.developUse ? this.DataInfo.developUse[0] : {}
                console.log(this.developUse)
                this.dutyVerify.projectIdString = this.$route.query.id
                this.developUse.projectIdString = this.$route.query.id

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

                this.DataInfo.exploitMethod = String(this.DataInfo.exploitMethod)

                // 开采情况
                this.developUse.isCrossTheBorder = this.developUse.isCrossTheBorder ? this.developUse.isCrossTheBorder : false
                this.developUse.isStripPositions = this.developUse.isStripPositions ? this.developUse.isStripPositions : false
                this.developUse.isRoadway = this.developUse.isRoadway ? this.developUse.isRoadway : false
                this.developUse.isSuperHigh = this.developUse.isSuperHigh ? this.developUse.isSuperHigh : false
                this.developUse.islastYearRegion = this.developUse.islastYearRegion ? this.developUse.islastYearRegion : false
                this.developUse.isSuperHighUp = this.developUse.isSuperHighUp === 'true'
                this.developUse.isSuperHighDown = this.developUse.isSuperHighDown === 'true'
                this.developUse.isCross = this.developUse.isCross === 'true'
                this.developUse.isOther = this.developUse.isOther === 'true'
                if (this.DataInfo.developUse && this.DataInfo.developUse[0].checkItems) {
                    this.$nextTick(() => {
                        this.checkItems = this.DataInfo.developUse[0].checkItems.split(',')
                    })
                }
                if (this.DataInfo.dutyVerify && this.DataInfo.dutyVerify[0].checkSignboardItems) {
                    this.checkSignboardItems = this.DataInfo.dutyVerify[0].checkSignboardItems.split(',')
                }
                if (this.DataInfo.inclusion) {
                    this.inclusion = this.DataInfo.inclusion.split(',')
                }
                this.DataInfo.updateMembers = this.DataInfo.members.map(item => {
                    item.idString = item.id
                    return item
                })

                // 格式化图片
                if (this.DataInfo.attachFiles && this.DataInfo.attachFiles.length) {
                    const tmp = []
                    var aa = this.DataInfo.attachFiles.reduce((sum, item) => {
                        const ind = tmp[item.fileCatalog]
                        console.log(ind, item.fileCatalog)
                        if (ind !== undefined) {
                            sum[ind].push(item)
                        } else {
                            sum.push([item])
                            tmp[item.fileCatalog] = sum.length - 1
                        }
                        return sum
                    }, [])
                    var obj = {}
                    aa.forEach(item => {
                        console.log(item)
                        if (item[0]) {
                            obj[item[0].fileCatalog] = item
                        }
                    })
                    this.defaultList = obj
                    console.log(obj)
                }
            })
        },
        handleSubmit() {
            console.log(this.DataInfo)
            this.DataInfo.idString = this.DataInfo.id
            this.DataInfo.regionIdString = this.DataInfo.regionId
            this.DataInfo.dutyVerify = []
            this.DataInfo.dutyVerify.push(Object.assign({}, this.dutyVerify))
            this.DataInfo.developUse = []
            this.DataInfo.developUse.push(Object.assign({}, this.developUse))
            // 格式化时间
            this.DataInfo.fieldInvestTime = this.DataInfo.fieldInvestTime ? this.$moment(this.DataInfo.fieldInvestTime).format('YYYY-MM-DD') : null
            this.DataInfo.reportEditTime = this.DataInfo.reportEditTime ? this.$moment(this.DataInfo.reportEditTime).format('YYYY-MM-DD') : null
            this.DataInfo.externalAuditEditTime = this.DataInfo.externalAuditEditTime ? this.$moment(this.DataInfo.externalAuditEditTime).format('YYYY-MM-DD') : null
            this.DataInfo.reportSubmitTime = this.DataInfo.reportSubmitTime ? this.$moment(this.DataInfo.reportSubmitTime).format('YYYY-MM-DD') : null
            this.DataInfo.dbSubmitTime = this.DataInfo.dbSubmitTime ? this.$moment(this.DataInfo.dbSubmitTime).format('YYYY-MM-DD') : null
            this.DataInfo.issueTime = this.DataInfo.issueTime ? this.$moment(this.DataInfo.issueTime).format('YYYY-MM-DD') : null
            this.DataInfo.beginTime = this.DataInfo.beginTime ? this.$moment(this.DataInfo.beginTime).format('YYYY-MM-DD') : null
            this.DataInfo.endTime = this.DataInfo.endTime ? this.$moment(this.DataInfo.endTime).format('YYYY-MM-DD') : null

            this.DataInfo.developUse[0].miningBeginDate = this.DataInfo.developUse[0].miningBeginDate ? this.$moment(this.DataInfo.developUse[0].miningBeginDate).format('YYYY-MM-DD') : null
            this.DataInfo.developUse[0].miningEndDate = this.DataInfo.developUse[0].miningEndDate ? this.$moment(this.DataInfo.developUse[0].miningEndDate).format('YYYY-MM-DD') : null
            this.DataInfo.developUse[0].formationBegionTime = this.DataInfo.developUse[0].formationBegionTime ? this.$moment(this.DataInfo.developUse[0].formationBegionTime).format('YYYY-MM-DD') : null
            this.DataInfo.developUse[0].formationEndTime = this.DataInfo.developUse[0].formationEndTime ? this.$moment(this.DataInfo.developUse[0].formationEndTime).format('YYYY-MM-DD') : null

            // 格式化
            this.DataInfo.developUse[0].checkItems = this.checkItems.toString()
            this.DataInfo.dutyVerify[0].checkSignboardItems = this.checkSignboardItems.toString()
            this.DataInfo.inclusion = this.inclusion.toString()

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
