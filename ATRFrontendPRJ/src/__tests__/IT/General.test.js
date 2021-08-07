import React from 'react';
import { mount ,shallow ,render } from '../../../enzymeConfig';
import OutcomeBar2 from "@irisa/components-Boot-v.5/lib/OutcomeBar2";
import Outcome2 from "@irisa/components-Boot-v.5/lib/Outcome2";

export function testOutComBar2(inputComp){

    const mountedComp = mount(inputComp);
    expect(mountedComp.find(OutcomeBar2).prop('buttons')).not.toBeUndefined();
    //------------------------------------------------------------------------------------------
    expect(typeof mountedComp.find(OutcomeBar2).prop('buttons') === 'object').toBeTruthy();
    const mButtons = mountedComp.find(OutcomeBar2).prop('buttons');
    //------------------------------------------------------------------------------------------
    let res = true;
    mButtons.forEach(item=>{
            try{
                const type = item.type;
                const onClick1 = item.onClick;
            }
            catch(e){
                res = false;
            }
        }
    );
    expect(res).toBeTruthy();
    //------------------------------------------------------------------------------------------
    const set1 = new Set();
    res = true;
    mButtons.forEach(item=>{
            try{
                set1.add(item.type);
            }
            catch(e){
                res = false;
            }
        }
    );

    expect(res && set1.size === mButtons.length).toBeTruthy();

    //------------------------------------------------------------------------------------------

}

export function testOutcome2(inputComp){
    const foundComp = mount(inputComp).find(Outcome2);

    if(foundComp) {
        foundComp.forEach(elem=>{

            // not going to be undefined

            expect(elem.prop('type')).not.toBeUndefined();

            expect(elem.prop('onClick')).not.toBeUndefined();

            //datatype props

            expect(typeof elem.prop('type') === 'string').toBeTruthy();
            expect(typeof elem.prop('onClick') === 'function').toBeTruthy();

            //check props values

            expect(
                elem.prop('type') === 'SUBMIT' ||
                elem.prop('type') === 'NO' ||
                elem.prop('type') === 'APPROVE' ||
                elem.prop('type') === 'REJECT' ||
                elem.prop('type') === 'OK' ||
                elem.prop('type') === 'COMPLETED' ||
                elem.prop('type') === 'ACCEPT' ||
                elem.prop('type') === 'DEFER' ||
                elem.prop('type') === 'SENDTOEXPERT' ||
                elem.prop('type') === 'DEFERFORCOMPLETING'
            ).toBeTruthy();



        });
    }
    else
        expect(false).toBeFalsy();
}

describe('IT UI tests',()=>{
    it('test case 1',()=>{
        expect(true).toBeTruthy();
    })
})