/**
 * Created by yuliang on 2017/8/16.
 */

'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const toObjectOptions = {
        transform: function (doc, ret, options) {
            return {
                contractId: ret._id.toString(),
                targetId: ret.targetId,
                resourceId: ret.resourceId,
                partyOne: ret.partyOne,
                partyTwo: ret.partyTwo,
                segmentId: ret.segmentId,
                policySegment: ret.policySegment,
                contractType: ret.contractType,
                createDate: ret.createDate,
                languageType: ret.languageType,
                policyCounterpart: ret.policyCounterpart,
                status: ret.status,
                fsmState: ret.fsmState,
            }
        }
    }

    const ContractSchema = new mongoose.Schema({
        targetId: {type: String, required: true}, //目标ID,当为资源时是资源策略ID,为消费方案时是presentableId
        partyOne: {type: Number, required: true}, //甲方
        partyTwo: {type: Number, required: true}, //乙方
        contractType: {type: Number, required: true}, //合约类型
        resourceId: {type: String, required: true},
        segmentId: {type: String, required: true},
        policySegment: {  //预览策略
            users: {type: Array, required: true},
            segmentText: {type: String, required: false},
            fsmDescription: {type: Array, required: true},
            initialState: {type: String, required: true},
            terminateState: {type: String, required: true},
            activatedStates: {type: [String], required: true}
        },
        policyCounterpart: {type: String, required: true},
        languageType: {type: String, required: true},
        status: {type: Number, required: true, default: 1}, //默认未开始执行
        fsmState: {type: String, required: true, default: 'none'},
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
        toJSON: toObjectOptions,
        toObject: toObjectOptions
    })

    ContractSchema.index({targetId: 1});

    return mongoose.model('contract', ContractSchema)
}