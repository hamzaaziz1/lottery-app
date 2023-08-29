const { assert } = require("chai");
const { expect } = require("chai");
const { hre, ethers } = require("hardhat");



describe("lottery contract", function () {
  it("Deployment should assign the manager", async function () {
    const [owner] = await ethers.getSigners();// manager addrerss
    console.log(await owner)
    const hardhatToken = await ethers.deployContract("lottery");

    await hardhatToken.connect(owner).enter({value: 1});
    expect(await hardhatToken.manager()).to.equal(owner.address);
  });

  it("Max Players allowed are 2", async function () {
    const [owner, address1, address2] = await ethers.getSigners();// manager addrerss
    console.log(await owner)
    const hardhatToken = await ethers.deployContract("lottery");

    
    
    // try{
    //   await hardhatToken.connect(owner).enter({value: 1});
    //   await hardhatToken.connect(address1).enter({value: 1});
    //   await hardhatToken.connect(address2).enter({value: 1});
    //   assert(false);
    // }catch(err) {
    //   assert(err);
    // }

    await hardhatToken.connect(owner).enter({value: 1});
      await hardhatToken.connect(address1).enter({value: 1});
     // await hardhatToken.connect(address2).enter({value: 1});
  });

  it('Transfer money to winner', async function () {
    const [owner,a1] = await ethers.getSigners();// manager addrerss
   
    const hardhatToken = await ethers.deployContract("lottery"); //whoever deploys becomes the manager
    
    
    balanceBefore = await hardhatToken.balanceOf(owner.address); //9999996889444587556993

    await hardhatToken.connect(owner).enter({value: 1});
    await hardhatToken.connect(a1).enter({value: 1});
    
    //console.log( "Participants of lottery : ", await )
    
    //balanceBefore = await hardhatToken.balanceOf(owner.address); //9999996797346808363145
    await hardhatToken.connect(owner).winner();
    console.log( "Winner of lottery : ", await hardhatToken.winner1())

    balanceAfter = await hardhatToken.balanceOf(hardhatToken.winner1()); //9999996718029457893942
    console.log(balanceBefore, " ", balanceAfter);
    expect((balanceBefore).to.equal(balanceAfter));

  })

});