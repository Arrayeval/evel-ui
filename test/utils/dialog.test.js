import { createTest, createVue, destroyVM } from './utils';
import ElDialog from "../../packages/dialog"
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
})