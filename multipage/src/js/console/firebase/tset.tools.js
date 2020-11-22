import firebaseConfig from '../../../src/lib/firebaseConfig.mjs'
console.log(firebaseConfig)

describe('測試add函數', () => {
    it('測試5+5預期10', () => {
        let aa = 10
        if (aa !== 10) {
            throw new Error("兩數相加結果不為兩數和");
        }

        chai.expect(aa).to.be.equal(10);
    });

    // it('-----', done => {
    //     let result = 1
    //     //result.should.be(1)
    //     done()
    // })
})

mocha.run();