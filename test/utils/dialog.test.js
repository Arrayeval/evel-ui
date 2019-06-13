import { createTest, createVue, destroyVM } from './utils';
import ElDialog from "../../packages/dialog"
// import { read } from 'fs';
var expect = require('chai').expect;
describe("ElDialog", () => {
    let vm
    afterEach(() => {
     destroyVM(vm)   
    })

    // 验证创建
    it("create ElDialog", () => {
        vm = createTest(ElDialog, {
            isShow: true,
            type: 0,
            textOptions: {
                content: 'this is test demo',
                leftBtn: 'cancel',
                rightBtn: 'sure'
            }
        }, true)
        expect(vm.$el.querySelector('.content  .text').textContent).to.equal('this is test demo')
        expect(vm.$el.querySelector('.tip-div').classList.contains("tip-div")).to.true
    })

    // 验证插槽
    it ("content slot", () => {
        vm = createVue(
            `<el-dialog> 
              <span class="slot-text">this is slot content</span>
             </el-dialog>
            `,
            {
                isShow: true,
                type: -1,
            }, 
        true)
        expect(vm.$el.querySelector('.slot-text').textContent).to.equal('this is slot content');
    })

    // 验证事件
    it ('ElDialog Click Event', (done) => { // 验证事件，需要使用done配合
        vm = createVue({
            template: `<div class="test-dialog-event">
                <el-dialog @okClick="dialogOkClick" :type="type" :textOptions="textOptions"></el-dialog>
                <span class="test-dialog-text">{{testText}}</span>
            </div>  `,
            data () {
                return {
                    testText: '',
                    type: 0,
                    textOptions: {
                        content: 'content',
                        leftBtn: 'cancel',
                        rightBtn: 'sure'
                    }
                }
            },
            methods: {
                dialogOkClick () {
                    this.testText = this.textOptions.content
                }
            }
        })
        vm.$el.querySelector('.test-dialog-event .content .btn').click()
        setTimeout(() => {
            expect(vm.$el.querySelector('.test-dialog-event .test-dialog-text').textContent).to.equal('content');
            done()
        }, 0)
    })
})